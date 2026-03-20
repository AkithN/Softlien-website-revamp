export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  createdAt: Date;
  read?: boolean;
}

export interface ProjectFeedback {
  _id?: string;
  projectId: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  status: 'pending' | 'published' | 'rejected';
  createdAt: Date;
}

export const SERVICE_LABELS: Record<string, string> = {
  "web-development": "Web Development",
  "mobile-apps": "Mobile App Development",
  "cloud-solutions": "Cloud Solutions",
  "ui-ux-design": "UI/UX Design",
  consulting: "Consulting",
  other: "Other",
};
