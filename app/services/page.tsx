"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Code,
  Smartphone,
  Cloud,
  Palette,
  Database,
  ShoppingCart,
  BarChart,
  Shield,
  ArrowRight,
  CheckCircle,
  Boxes,
  Server,
  Workflow,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function Services() {
  const services = [
    {
      icon: <Code size={40} />,
      title: "Web Development",
      description:
        "Build powerful, scalable web applications with modern frameworks and technologies.",
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "Progressive Web Apps (PWA)",
        "API Development & Integration",
        "CMS Development",
      ],
      image:
        "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxMjg5NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: <Smartphone size={40} />,
      title: "Mobile App Development",
      description:
        "Create stunning mobile experiences for iOS and Android platforms.",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Solutions",
        "Mobile UI/UX Design",
        "App Store Optimization",
        "App Maintenance & Support",
      ],
      image:
        "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzEzMTE4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: <Cloud size={40} />,
      title: "Cloud Solutions",
      description:
        "Leverage cloud infrastructure for scalability, reliability, and performance.",
      features: [
        "Cloud Migration Services",
        "AWS, Azure, Google Cloud",
        "DevOps & CI/CD",
        "Cloud Security",
        "Serverless Architecture",
      ],
      image:
        "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxMzA0NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: <Palette size={40} />,
      title: "UI/UX Design",
      description:
        "Design beautiful, intuitive interfaces that users love to interact with.",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Visual Design",
        "Design Systems",
        "Responsive Design",
      ],
      image:
        "https://images.unsplash.com/photo-1765561667528-28e39c6174dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NzEyNTIwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const additionalServices = [
    {
      icon: <Database size={32} />,
      title: "Database Management",
      description:
        "Design and optimize databases for performance and reliability.",
    },
    {
      icon: <ShoppingCart size={32} />,
      title: "E-commerce Solutions",
      description:
        "Build complete online stores with secure payment integration.",
    },
    {
      icon: <BarChart size={32} />,
      title: "Analytics & Insights",
      description:
        "Data-driven solutions to track and improve business metrics.",
    },
    {
      icon: <Shield size={32} />,
      title: "Security & Compliance",
      description:
        "Protect your applications with advanced security measures.",
    },
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
              Our Services
            </h1>
            <p className="text-xl text-gray-200">
              Comprehensive software solutions designed to help your business
              thrive in the digital age
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-20 h-20 bg-[#e8272c] rounded-2xl flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle
                          className="text-green-500 flex-shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-[#e8272c] text-white rounded-full hover:shadow-lg hover:bg-[#d01f24] transition-all transform hover:scale-105"
                  >
                    Get Started
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#e8272c] rounded-2xl blur-2xl opacity-20" />
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="relative rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
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
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized solutions to complement your digital strategy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#e8272c] rounded-xl flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
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
              Our Tech Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We leverage cutting-edge technologies to build robust and
              scalable solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "React",
                icon: <Code size={40} />,
                color: "from-cyan-400 to-blue-500",
              },
              {
                name: "Node.js",
                icon: <Server size={40} />,
                color: "from-green-500 to-green-600",
              },
              {
                name: "Cloud",
                icon: <Cloud size={40} />,
                color: "from-blue-500 to-cyan-500",
              },
              {
                name: "Database",
                icon: <Database size={40} />,
                color: "from-orange-400 to-blue-600",
              },
              {
                name: "Mobile",
                icon: <Smartphone size={40} />,
                color: "from-purple-600 to-pink-600",
              },
              {
                name: "Docker",
                icon: <Boxes size={40} />,
                color: "from-blue-500 to-blue-700",
              },
              {
                name: "DevOps",
                icon: <Workflow size={40} />,
                color: "from-orange-600 to-red-600",
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white`}
                >
                  {tech.icon}
                </div>
                <p className="text-center font-bold text-gray-900 text-lg">
                  {tech.name}
                </p>
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
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We understand your business goals and requirements",
              },
              {
                step: "02",
                title: "Planning",
                description: "Create a detailed roadmap and strategy",
              },
              {
                step: "03",
                title: "Development",
                description: "Build your solution with agile methodology",
              },
              {
                step: "04",
                title: "Launch",
                description: "Deploy and provide ongoing support",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-[#e8272c] mb-4">
                  {process.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let&apos;s discuss how our services can help your business succeed
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
