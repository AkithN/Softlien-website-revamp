import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "View Softlien projects and case studies—successful web, mobile, cloud, and UI/UX solutions delivered for clients.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
