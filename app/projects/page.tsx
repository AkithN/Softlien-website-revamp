"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "Mobile App",
    "E-commerce",
    "Cloud Solutions",
    "UI/UX Design",
  ];

  const projects = [
    {
      title: "E-Shop Platform",
      category: "E-commerce",
      description:
        "A comprehensive e-commerce platform with advanced features including real-time inventory management, AI-powered recommendations, and seamless payment integration.",
      image:
        "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3MTMwMDA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      date: "January 2026",
      link: "#",
    },
    {
      title: "HealthCare Connect",
      category: "Mobile App",
      description:
        "A mobile health platform connecting patients with healthcare providers, featuring telemedicine capabilities, appointment scheduling, and health records management.",
      image:
        "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcHxlbnwxfHx8fDE3NzEzMDk2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React Native", "Firebase", "WebRTC"],
      date: "December 2025",
      link: "#",
    },
    {
      title: "FinanceFlow",
      category: "Web Development",
      description:
        "A modern banking dashboard providing comprehensive financial analytics, transaction tracking, and investment portfolio management with real-time updates.",
      image:
        "https://images.unsplash.com/photo-1681826291722-70bd7e9e6fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYmFua2luZyUyMGFwcHxlbnwxfHx8fDE3NzEzNDUyODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Next.js", "Python", "PostgreSQL", "D3.js"],
      date: "November 2025",
      link: "#",
    },
    {
      title: "EduLearn Platform",
      category: "Web Development",
      description:
        "An interactive online learning platform with live classes, course management, progress tracking, and collaborative tools for students and educators.",
      image:
        "https://images.unsplash.com/photo-1758270704925-fa59d93119c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMHBsYXRmb3JtfGVufDF8fHx8MTc3MTMyMTE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React", "Node.js", "Socket.io", "AWS"],
      date: "October 2025",
      link: "#",
    },
    {
      title: "FoodieExpress",
      category: "Mobile App",
      description:
        "A food delivery application with real-time order tracking, smart recommendations, and seamless payment integration for both customers and restaurants.",
      image:
        "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBhcHB8ZW58MXx8fHwxNzcxMjgwMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Flutter", "Firebase", "Google Maps API"],
      date: "September 2025",
      link: "#",
    },
    {
      title: "PropertyHub",
      category: "Web Development",
      description:
        "A real estate marketplace with advanced search filters, virtual tours, property comparisons, and integrated mortgage calculators.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzcxMzIxOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Vue.js", "Laravel", "MySQL", "Mapbox"],
      date: "August 2025",
      link: "#",
    },
    {
      title: "CloudSync Enterprise",
      category: "Cloud Solutions",
      description:
        "A scalable cloud infrastructure solution enabling seamless data synchronization, automated backups, and enterprise-level security features.",
      image:
        "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxMzA0NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
      date: "July 2025",
      link: "#",
    },
    {
      title: "DesignPro Studio",
      category: "UI/UX Design",
      description:
        "A complete redesign of a design collaboration tool with focus on user experience, featuring intuitive workflows and real-time collaboration.",
      image:
        "https://images.unsplash.com/photo-1765561667528-28e39c6174dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NzEyNTIwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Testing"],
      date: "June 2025",
      link: "#",
    },
    {
      title: "RetailPOS System",
      category: "E-commerce",
      description:
        "A comprehensive point-of-sale system for retail businesses with inventory management, sales analytics, and customer relationship features.",
      image:
        "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxMjg5NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Angular", ".NET", "SQL Server", "Azure"],
      date: "May 2025",
      link: "#",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="bg-white">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-200">
              Explore our portfolio of successful projects that have transformed
              businesses across industries
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  filter === category
                    ? "bg-[#e8272c] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 right-4">
                      <a
                        href={project.link}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-red-50 text-[#e8272c] text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {project.date}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#e8272c] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Project Success Metrics
            </h2>
            <p className="text-xl text-gray-600">
              Our track record speaks for itself
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "2M+", label: "Users Reached" },
              { number: "50+", label: "Industries Served" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#e8272c] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let&apos;s create something amazing together
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#e8272c] rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
