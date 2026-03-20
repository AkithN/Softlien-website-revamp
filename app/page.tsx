"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Smartphone,
  Cloud,
  Palette,
  CheckCircle,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { HeroMeshBackground } from "@/components/HeroMeshBackground";
import { Tilt } from "@/components/Tilt";
import { SectionMeshBackdrop } from "@/components/SectionMeshBackdrop";
import { useState, useEffect } from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { ProjectFeedback } from "@/lib/types";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<ProjectFeedback[]>([]);

  useEffect(() => {
    fetch("/api/feedback/published", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setFeedbacks(data);
      })
      .catch((err) => console.error("Failed to load feedback:", err));
  }, []);

  const services = [
    {
      icon: <Code size={32} />,
      title: "Web Development",
      description:
        "Custom web applications built with cutting-edge technologies for optimal performance.",
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile solutions that deliver exceptional user experiences.",
    },
    {
      icon: <Cloud size={32} />,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and migration services to power your business growth.",
    },
    {
      icon: <Palette size={32} />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive designs that engage users and drive conversions.",
    },
  ];

  const stats = [
    { number: "500+", label: "Projects Delivered" },
    { number: "200+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "15+", label: "Years Experience" },
  ];

  const features = [
    "Agile Development Process",
    "24/7 Support & Maintenance",
    "Quality Assurance Testing",
    "On-time Delivery Guarantee",
    "Scalable Architecture",
    "Cost-effective Solutions",
  ];

  return (
    <div className="bg-white">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c]">
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc3MTIzODYwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Technology background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <HeroMeshBackground className="absolute inset-0 pointer-events-none opacity-70 hidden md:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.2]">
                Transform Your
                <span className="block bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent pb-1">
                  Digital Vision
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                We craft innovative software solutions that drive business
                growth and deliver exceptional user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#e8272c] rounded-full hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full border-2 border-white/20 hover:bg-white/20 transition-all"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Tilt className="relative">
                <div className="absolute -inset-4 bg-[#e8272c] rounded-2xl blur-2xl opacity-30" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765561667528-28e39c6174dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NzEyNTIwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Software development"
                  className="relative rounded-2xl shadow-2xl"
                />
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 bg-gray-50">
        <div className="absolute inset-0 pointer-events-none z-0">
          <SectionMeshBackdrop className="absolute -inset-10" intensity={0.6} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
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

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none z-0">
          <SectionMeshBackdrop className="absolute -inset-10" intensity={0.75} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <Tilt>
                  <div className="w-16 h-16 bg-[#e8272c] rounded-xl flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="absolute inset-0 pointer-events-none z-0">
          <SectionMeshBackdrop className="absolute -inset-10" intensity={0.9} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzcxMzQxOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Softlien?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine technical expertise with creative innovation to
                deliver solutions that exceed expectations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle
                      className="text-green-500 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center mt-8 text-[#e8272c] hover:text-[#d01f24] font-semibold"
              >
                Learn More About Us
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 bg-gray-50">
        <div className="absolute inset-0 pointer-events-none z-0">
          <SectionMeshBackdrop className="absolute -inset-10" intensity={0.5} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-red-100 text-[#e8272c] rounded-2xl mb-6">
              <MessageSquareQuote size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Client Feedback
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear what our clients have to say about our projects and services.
            </p>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-3">
              Reviews are submitted from the{" "}
              <Link
                href="/projects"
                className="text-[#e8272c] font-medium hover:underline"
              >
                Projects
              </Link>{" "}
              page; only published testimonials appear here.
            </p>
          </motion.div>

          {feedbacks.length === 0 ? (
            <div className="text-center py-12 px-6 rounded-2xl border border-dashed border-gray-200 bg-white/60">
              <p className="text-gray-600 mb-4">
                No published testimonials yet. Leave feedback on a project, then
                publish it from the admin dashboard if moderation is enabled.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center text-[#e8272c] font-semibold hover:underline"
              >
                Go to Projects
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feedbacks.map((fb, index) => (
                <motion.div
                  key={fb._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative group"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 transition-transform duration-500">
                    <MessageSquareQuote size={100} />
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={`${star <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-8 italic relative z-10 leading-relaxed">
                    &ldquo;{fb.message}&rdquo;
                  </p>

                  <div className="mt-auto relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-lg">
                      {fb.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{fb.name}</h4>
                      <p className="text-sm text-[#e8272c] font-medium">
                        {fb.projectId}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
              Let&apos;s discuss how we can help transform your ideas into
              reality
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#e8272c] rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Contact Us Today
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
