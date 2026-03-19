"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Building2, Phone, User, Calendar, Trash2, CheckCircle, Circle, LogIn, Loader2, ChevronDown, ChevronUp, MessageSquareHeart, Star, Globe, XCircle } from "lucide-react";
import { SERVICE_LABELS, type ContactMessage, type ProjectFeedback } from "@/lib/types";

const STORAGE_KEY = "softlien_admin_token";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem(STORAGE_KEY);
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function formatDate(d: string | Date) {
  const date = new Date(d);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<"messages" | "feedbacks">("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [feedbacks, setFeedbacks] = useState<ProjectFeedback[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async (authToken?: string) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    
    try {
      const [messagesRes, feedbacksRes] = await Promise.all([
        fetch("/api/admin/messages", { headers }),
        fetch("/api/admin/feedback", { headers })
      ]);

      if (messagesRes.status === 401 || feedbacksRes.status === 401) {
        setNeedsAuth(true);
        return false;
      }
      
      setNeedsAuth(false);
      
      if (!messagesRes.ok || !feedbacksRes.ok) throw new Error("Failed to load data");
      
      const msgData = await messagesRes.json();
      const fbData = await feedbacksRes.json();
      
      setMessages(msgData);
      setFeedbacks(fbData);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token === null && typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setToken(stored);
    }
  }, [token]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const authToken = token ?? (typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null);
        const ok = await fetchData(authToken ?? undefined);
        if (cancelled) return;
        if (!ok) {
          setToken(null);
          setMessages([]);
          setFeedbacks([]);
          if (typeof window !== "undefined") sessionStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [token, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const pw = passwordInput.trim();
    if (!pw) {
      setLoginError("Enter admin password.");
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, pw);
    setToken(pw);
    setLoading(true);
    const ok = await fetchData(pw);
    setLoading(false);
    if (!ok) {
      setLoginError("Invalid password.");
      sessionStorage.removeItem(STORAGE_KEY);
      setToken(null);
    } else {
      setPasswordInput("");
      setLoginError(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setMessages([]);
    setFeedbacks([]);
  };

  const markMessageRead = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ read: true }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, read: true } : m))
        );
      }
    } finally {
      setActionLoading(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) setMessages((prev) => prev.filter((m) => m._id !== id));
    } finally {
      setActionLoading(null);
    }
  };

  const updateFeedbackStatus = async (id: string, status: "published" | "rejected") => {
    setActionLoading(id + status);
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setFeedbacks((prev) =>
          prev.map((f) => (f._id === id ? { ...f, status } : f))
        );
      }
    } finally {
      setActionLoading(null);
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm("Delete this feedback?")) return;
    setActionLoading(id + "delete");
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } finally {
      setActionLoading(null);
    }
  };

  const authenticated = !loading && !error && (token !== null || messages.length > 0 || feedbacks.length > 0);
  const showLogin = needsAuth && !loading;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative pt-28 pb-12 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-200 mt-2">Manage website submissions</p>
            </div>
            {authenticated && token && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
              >
                Log out
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {showLogin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LogIn size={22} />
              Admin access
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-pw" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="admin-pw"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8272c] focus:border-transparent"
                  placeholder="Admin password"
                  autoComplete="current-password"
                />
              </div>
              {loginError && (
                <p className="text-red-600 text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#e8272c] text-white rounded-lg font-semibold hover:bg-[#d01f24] transition-colors"
              >
                Sign in
              </button>
            </form>
          </motion.div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#e8272c] animate-spin" />
          </div>
        )}

        {error && !showLogin && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-center">
            {error}
          </div>
        )}

        {authenticated && (
          <>
            <div className="flex space-x-2 border-b border-gray-200 mb-6">
              <button
                onClick={() => { setActiveTab("messages"); setExpandedId(null); }}
                className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === "messages"
                    ? "border-[#e8272c] text-[#e8272c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Mail size={18} />
                Contact Messages
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {messages.length}
                </span>
              </button>
              <button
                onClick={() => { setActiveTab("feedbacks"); setExpandedId(null); }}
                className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === "feedbacks"
                    ? "border-[#e8272c] text-[#e8272c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <MessageSquareHeart size={18} />
                Project Feedback
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {feedbacks.length}
                </span>
              </button>
            </div>

            {/* MESSAGES TAB CONTENT */}
            {activeTab === "messages" && messages.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm">Submissions from the contact form will appear here.</p>
              </div>
            )}

            {activeTab === "messages" && messages.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {messages.map((msg) => {
                  const id = msg._id!;
                  const isExpanded = expandedId === id;
                  const serviceLabel = SERVICE_LABELS[msg.service] ?? msg.service;
                  return (
                    <motion.div
                      key={id}
                      layout
                      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : id)}
                        className="w-full flex flex-wrap items-center gap-3 sm:gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex-shrink-0">
                          {msg.read ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <Circle className="text-gray-400" size={20} />
                          )}
                        </span>
                        <span className="font-semibold text-gray-900 truncate">{msg.name}</span>
                        <span className="text-gray-500 truncate text-sm">{msg.email}</span>
                        <span className="text-gray-500 text-sm hidden sm:block">{serviceLabel}</span>
                        <span className="text-gray-400 text-sm ml-auto flex-shrink-0">
                          {formatDate(msg.createdAt)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                        )}
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-100 bg-gray-50/80"
                        >
                          <div className="p-4 sm:p-6 grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <User className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Name</p>
                                <p className="text-gray-900">{msg.name}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Mail className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                                <a href={`mailto:${msg.email}`} className="text-[#e8272c] hover:underline">
                                  {msg.email}
                                </a>
                              </div>
                            </div>
                            {msg.company && (
                              <div className="flex items-start gap-3">
                                <Building2 className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                                <div>
                                  <p className="text-xs font-medium text-gray-500 uppercase">Company</p>
                                  <p className="text-gray-900">{msg.company}</p>
                                </div>
                              </div>
                            )}
                            {msg.phone && (
                              <div className="flex items-start gap-3">
                                <Phone className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                                <div>
                                  <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                                  <a href={`tel:${msg.phone}`} className="text-gray-900">{msg.phone}</a>
                                </div>
                              </div>
                            )}
                            <div className="flex items-start gap-3 sm:col-span-2">
                              <Calendar className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Service</p>
                                <p className="text-gray-900">{serviceLabel}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 sm:col-span-2">
                              <MessageSquare className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500 uppercase">Message</p>
                                <p className="text-gray-900 whitespace-pre-wrap">{msg.message}</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 sm:px-6 pb-4 flex flex-wrap gap-2">
                            {!msg.read && (
                              <button
                                type="button"
                                disabled={actionLoading === id}
                                onClick={() => markMessageRead(id)}
                                className="px-3 py-1.5 rounded-lg bg-green-100 text-green-800 text-sm font-medium hover:bg-green-200 disabled:opacity-50 flex items-center gap-1"
                              >
                                {actionLoading === id ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <CheckCircle size={14} />
                                )}
                                Mark read
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={actionLoading === id}
                              onClick={() => deleteMessage(id)}
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-800 text-sm font-medium hover:bg-red-200 disabled:opacity-50 flex items-center gap-1"
                            >
                              {actionLoading === id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* FEEDBACKS TAB CONTENT */}
            {activeTab === "feedbacks" && feedbacks.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No feedback yet</p>
                <p className="text-sm">Submissions from the projects form will appear here.</p>
              </div>
            )}

            {activeTab === "feedbacks" && feedbacks.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {feedbacks.map((fb) => {
                  const id = fb._id!;
                  const isExpanded = expandedId === id;
                  return (
                    <motion.div
                      key={id}
                      layout
                      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : id)}
                        className="w-full flex flex-wrap items-center gap-3 sm:gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex-shrink-0">
                          {fb.status === "published" ? (
                            <span title="Published"><Globe className="text-blue-500" size={20} /></span>
                          ) : fb.status === "rejected" ? (
                            <span title="Rejected"><XCircle className="text-gray-400" size={20} /></span>
                          ) : (
                            <span title="Pending"><Circle className="text-orange-500" size={20} /></span>
                          )}
                        </span>
                        <span className="font-semibold text-gray-900 truncate w-32 hidden sm:block">{fb.projectId}</span>
                        <span className="text-gray-600 truncate flex-1">{fb.name}</span>
                        <span className="hidden sm:flex text-gray-500 text-sm items-center">
                          <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                          {fb.rating}/5
                        </span>
                        <span className="text-gray-400 text-sm ml-auto flex-shrink-0">
                          {formatDate(fb.createdAt)}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                        )}
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-100 bg-gray-50/80"
                        >
                          <div className="p-4 sm:p-6 grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <Building2 className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Project</p>
                                <p className="text-gray-900">{fb.projectId}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <User className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Author</p>
                                <p className="text-gray-900">{fb.name} ({fb.email})</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 sm:col-span-2">
                              <Star className="text-yellow-400 fill-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase">Rating</p>
                                <p className="text-gray-900">{fb.rating} out of 5 stars</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 sm:col-span-2">
                              <MessageSquareHeart className="text-[#e8272c] flex-shrink-0 mt-0.5" size={18} />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500 uppercase">Feedback</p>
                                <p className="text-gray-900 whitespace-pre-wrap">{fb.message}</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 sm:px-6 pb-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4 mt-2">
                            <p className="w-full text-xs font-medium text-gray-500 uppercase mb-2">Actions:</p>
                            {fb.status !== "published" && (
                              <button
                                type="button"
                                disabled={actionLoading === id + "published"}
                                onClick={() => updateFeedbackStatus(id, "published")}
                                className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200 disabled:opacity-50 flex items-center gap-1"
                              >
                                {actionLoading === id + "published" ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <Globe size={14} />
                                )}
                                Publish to Site
                              </button>
                            )}
                            {fb.status !== "rejected" && (
                              <button
                                type="button"
                                disabled={actionLoading === id + "rejected"}
                                onClick={() => updateFeedbackStatus(id, "rejected")}
                                className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
                              >
                                {actionLoading === id + "rejected" ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <XCircle size={14} />
                                )}
                                Reject / Hide
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={actionLoading === id + "delete"}
                              onClick={() => deleteFeedback(id)}
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-800 text-sm font-medium hover:bg-red-200 disabled:opacity-50 flex items-center gap-1 ml-auto"
                            >
                              {actionLoading === id + "delete" ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
