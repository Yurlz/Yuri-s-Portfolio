import emilyCard from "@/assets/emily-card.png";
import kaledoCard from "@/assets/kaledo-card.png";
import kriaCard from "@/assets/kria-card.png";
import redragonCard from "@/assets/redragon-card.png";
import solidCard from "@/assets/solid-card.png";
import type { Translations } from "@/i18n/translations";

export interface Project {
  id: string;
  name: string;
  role: string | null;
  timeline: string | null;
  year: string | null;
  team: string | null;
  image?: string;
  href?: string;
  hrefLabel?: string;
  coverBackground: string;
  coverForeground: string;
}

const allProjects: Project[] = [
  {
    id: "redragon",
    name: "Redragon",
    role: "Graphic · Web Design · Social Media",
    timeline: "2 years",
    year: "2024 - present",
    team: "Marketing",
    image: redragonCard,
    href: "https://www.redragon.site/",
    hrefLabel: "Ver website da Redragon",
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
    href: "https://novo.redragon.com.br/dragon-soul-redragon-x-kria",
    hrefLabel: "Ver coleção completa",
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
  {
    id: "solid",
    name: "Solid",
    role: "Graphic · Web Design · Social Media",
    timeline: "2 years",
    year: "2024 - present",
    team: "Marketing",
    image: solidCard,
    coverBackground: "#202020",
    coverForeground: "#F7F5F0",
  },
];

// Temporarily hide Solid while keeping its project data available.
export const projects = allProjects.filter((project) => project.id !== "solid");

export function localizeProject(project: Project, t: Translations): Project {
  const copy = t.projectContent[project.id as keyof Translations["projectContent"]];
  if (!copy) return project;
  return {
    ...project,
    role: copy.role,
    timeline: copy.timeline,
    year: copy.year,
    team: copy.team,
    hrefLabel: copy.hrefLabel,
  };
}
