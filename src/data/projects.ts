import emilyCard from "@/assets/emily-card.png";
import kaledoCard from "@/assets/kaledo-card.png";
import kriaCard from "@/assets/kria-card.png";
import redragonCard from "@/assets/redragon-card.png";

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
    image: redragonCard,
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
    image: kaledoCard,
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
    image: kriaCard,
    coverBackground: "#DDE3D7",
    coverForeground: "#35412E",
  },
  {
    id: "Emily",
    name: "Emily",
    role: "Graphic Design",
    timeline: "2 month",
    year: "2025",
    team: null,
    image: emilyCard,
    coverBackground: "#EDDDD2",
    coverForeground: "#663A29",
  },
];
