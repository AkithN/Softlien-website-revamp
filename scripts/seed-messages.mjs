/**
 * Seed script: inserts 10 sample contact form submissions into MongoDB.
 * Run: npm run seed   (uses .env for MONGODB_URI)
 * Or:  node --env-file=.env scripts/seed-messages.mjs
 */

import { MongoClient } from "mongodb";

const COLLECTION = "messages";

const sampleMessages = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@techstartup.io",
    company: "TechStartup Inc",
    phone: "+1 (415) 555-0101",
    service: "web-development",
    message: "We need a modern company website with a blog and contact forms. Our budget is flexible and we're looking to launch in Q2. Can you provide a timeline and quote?",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    name: "Marcus Johnson",
    email: "marcus.j@cloudbase.com",
    company: "CloudBase Solutions",
    phone: "+1 (512) 555-0102",
    service: "cloud-solutions",
    message: "Interested in migrating our legacy apps to the cloud. We have about 15 services and need guidance on architecture and cost optimization.",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    name: "Elena Rodriguez",
    email: "elena.rodriguez@designstudio.com",
    company: "",
    phone: "",
    service: "ui-ux-design",
    message: "Looking for UI/UX redesign of our mobile app. We want a fresh look while keeping our brand colors. Happy to share Figma files.",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    name: "David Park",
    email: "david.park@innovate.co",
    company: "Innovate Co",
    phone: "+1 (206) 555-0104",
    service: "mobile-apps",
    message: "We need an iOS and Android app for our fitness platform. Features: workouts, progress tracking, and social sharing. Do you do both platforms?",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    name: "Jennifer Walsh",
    email: "j.walsh@retailplus.com",
    company: "RetailPlus",
    phone: "+1 (303) 555-0105",
    service: "consulting",
    message: "Our e-commerce site is slow and we're not sure where to start. Need a technical audit and roadmap for performance and scalability.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    name: "Alex Turner",
    email: "alex.turner@gmail.com",
    company: "",
    phone: "+1 (617) 555-0106",
    service: "other",
    message: "I have an idea for a SaaS product but need help from concept to MVP. Can we schedule a call to discuss scope and pricing?",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@healthtech.io",
    company: "HealthTech IO",
    phone: "",
    service: "web-development",
    message: "We need a patient portal with appointment booking, medical records access, and secure messaging. HIPAA compliance is required. Please confirm if you have experience in healthcare.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    name: "James Liu",
    email: "james.liu@fintech.com",
    company: "FinTech Partners",
    phone: "+1 (404) 555-0108",
    service: "cloud-solutions",
    message: "Exploring AWS vs GCP for our new data pipeline. Need consulting on architecture, security, and cost. Timeline: next 2 months.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    name: "Rachel Green",
    email: "rachel.g@startup.co",
    company: "Startup Co",
    phone: "+1 (305) 555-0109",
    service: "ui-ux-design",
    message: "Our landing page conversion is low. We'd like a UX review and redesign focused on sign-up and onboarding. Can you share a portfolio of similar work?",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    name: "Michael Brown",
    email: "m.brown@enterprise.com",
    company: "Enterprise Systems Ltd",
    phone: "+1 (214) 555-0110",
    service: "consulting",
    message: "We're planning a digital transformation initiative and need a partner for strategy and implementation. Multiple projects over 12–18 months. Please send your capabilities and case studies.",
    createdAt: new Date(),
    read: false,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || "softlien";

  if (!uri) {
    console.error("Missing MONGODB_URI. Set it in .env or run: node --env-file=.env scripts/seed-messages.mjs");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(COLLECTION);

    const result = await collection.insertMany(sampleMessages);
    console.log(`Inserted ${result.insertedCount} sample contact messages into "${dbName}".${COLLECTION}`);
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
