export interface Project {
  id: string;
  name: string;
  role: string | null;
  timeline: string | null;
  year: string | null;
  team: string | null;
  image?: string;
  href?: string;
  coverBackground: string;
  coverForeground: string;
}

export const projects: Project[] = [
  {
    id: "solid",
    name: "Solid",
    role: "Graphic · Web Design · Social Media",
    timeline: "2 years",
    year: "2024 - present",
    team: "Marketing",
    coverBackground: "#202020",
    coverForeground: "#F7F5F0",
  },
  {
    id: "kaledo",
    name: "Kaledo",
    role: "Graphic Design",
    timeline: "1 month",
    year: "2025",
    team: null,
    coverBackground: "#DFD7E8",
    coverForeground: "#35263F",
  },
  {
    id: "kria",
    name: "Kria",
    role: "Graphic Design",
    timeline: "3 month",
    year: "2025",
    team: null,
    coverBackground: "#DDE3D7",
    coverForeground: "#35412E",
  },
  {
    id: "isa",
    name: "Isa",
    role: "Graphic Design",
    timeline: "3 month",
    year: "2025",
    team: null,
    coverBackground: "#EDDDD2",
    coverForeground: "#663A29",
  },
];
