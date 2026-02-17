"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function About() {
  const values = [
    {
      icon: <Target size={32} />,
      title: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge solutions that drive business growth.",
    },
    {
      icon: <Heart size={32} />,
      title: "Quality",
      description:
        "Excellence is our standard. We deliver reliable, scalable, and maintainable software.",
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description:
        "We work closely with our clients as partners to achieve shared success.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Growth",
      description:
        "Your success is our success. We're committed to helping your business thrive.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
    {
      name: "David Park",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    },
  ];

  const achievements = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "15+", label: "Years Experience" },
    { number: "25+", label: "Industry Awards" },
    { number: "98%", label: "Client Satisfaction" },
  ];

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
              About Softlien
            </h1>
            <p className="text-xl text-gray-200">
              Empowering businesses through innovative software solutions since
              2011
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2011, Softlien began with a simple mission: to help
                businesses leverage technology to achieve their goals. What
                started as a small team of passionate developers has grown into
                a full-service software development company.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Over the years, we&apos;ve had the privilege of working with
                startups, enterprises, and everything in between. Our commitment
                to quality, innovation, and client satisfaction has been the
                foundation of our success.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to push boundaries, embrace new technologies,
                and deliver solutions that make a real difference in our
                clients&apos; businesses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#e8272c] rounded-2xl blur-2xl opacity-20" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765561667528-28e39c6174dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NzEyNTIwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Our team"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-[#e8272c] rounded-xl flex items-center justify-center text-white mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600">
                To empower businesses of all sizes with innovative, reliable,
                and scalable software solutions that drive growth and success in
                the digital age.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-[#e8272c] rounded-xl flex items-center justify-center text-white mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
                To be the leading software development partner, known for
                delivering exceptional solutions that transform businesses and
                create lasting value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#e8272c] rounded-xl flex items-center justify-center text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#e8272c] mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate team driving innovation and excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8b0000]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
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
              Join Us on Our Journey
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let&apos;s work together to create something amazing
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#e8272c] rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get In Touch
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
