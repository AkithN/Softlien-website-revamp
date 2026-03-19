"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Loader2, CheckCircle } from "lucide-react";

interface ProjectFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export function ProjectFeedbackModal({
  isOpen,
  onClose,
  projectTitle,
}: ProjectFeedbackModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectTitle,
          name,
          email,
          rating,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset state after closing animation
        setTimeout(() => {
          setSuccess(false);
          setName("");
          setEmail("");
          setRating(0);
          setMessage("");
        }, 300);
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>

            <div className="p-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your feedback for {projectTitle} has been submitted
                    successfully.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Leave Feedback
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We'd love to hear your thoughts on{" "}
                    <span className="font-semibold text-[#e8272c]">
                      {projectTitle}
                    </span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8272c] focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8272c] focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={32}
                              className={`${
                                star <= (hoveredRating || rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              } transition-colors`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8272c] focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Tell us what you think about this project..."
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-medium">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-[#e8272c] text-white rounded-lg font-semibold hover:bg-[#d01f24] transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          Submitting...
                        </>
                      ) : (
                        "Submit Feedback"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
