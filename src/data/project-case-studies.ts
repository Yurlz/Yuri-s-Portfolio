import { projects, type Project } from "@/data/projects";
import redragonWebsite from "@/assets/tela-1.png";
import redragonWebsiteDetails from "@/assets/tela-2.png";
import redragonCampaigns from "@/assets/tela-3.png";
import redragonMatchMais from "@/assets/tela-4.png";
import kaledoCard from "@/assets/kaledo-card.png";
import kaledoInstagram from "@/assets/tela-5.png";
import kaledoLogo from "@/assets/tela-6.png";
import kaledoTypography from "@/assets/tela-7.png";
import kaledoPhotography from "@/assets/tela-8.png";
import kriaBlackShirt from "@/assets/tela-11.png";
import kriaWhiteShirt from "@/assets/tela-9.png";
import kriaDragonArtwork from "@/assets/tela-10.png";
import kriaShirtDetails from "@/assets/tela-12.png";
import emilyShirt from "@/assets/tela-13.png";
import emilyWebsite from "@/assets/tela-14.png";

export type ProjectCaseStudy = {
  description: string;
  disciplines: string[];
  palette: [string, string, string];
  // A custom gallery displays these original images in order.
  gallery?: { src: string; alt: string }[];
  // Keep the original opening artwork and closing detail around the gallery.
  preserveArtwork?: boolean;
  // Display the colour palette before a custom gallery.
  preservePalette?: boolean;
};

const caseStudies: Record<string, ProjectCaseStudy> = {
  redragon: {
    description: "Graphic design, web design and social media for Redragon. A selection of work connecting the brand's bold visual identity to its gaming world, with dark backgrounds, sharp contrast and red accents.",
    disciplines: ["Graphic design", "Web design", "Social media"],
    palette: ["#CA2027", "#202020", "#F7F5F0"],
    gallery: [
      { src: redragonWebsite, alt: "Redragon website — Flamengo collection" },
      { src: redragonWebsiteDetails, alt: "Redragon website — teams, products and news" },
      { src: redragonCampaigns, alt: "Redragon Spectra Pro and Sparda campaign artwork" },
      { src: redragonMatchMais, alt: "Match Mais login screen and Redragon mascot" },
    ],
  },
  kaledo: {
    description: "Graphic design for Kaledo. A clean visual identity that combines a geometric symbol with a deep green palette. Simple shapes and generous space give the brand its distinctive character.",
    disciplines: ["Graphic design", "Visual identity"],
    palette: ["#4B6039", "#DDE3D7", "#FFFFFF"],
    gallery: [
      { src: kaledoCard, alt: "Kaledo project artwork" },
      { src: kaledoInstagram, alt: "Kaledo photography logo and Instagram profile" },
      { src: kaledoLogo, alt: "Kaledo logo concept, full logo and usage variations" },
      { src: kaledoTypography, alt: "Kaledo typography and colour palette" },
      { src: kaledoPhotography, alt: "Kaledo brand applied to portrait photography" },
    ],
  },
  kria: {
    description: "Graphic design for Kria. Expressive lettering, detailed illustration and warm colours create an identity full of character, with bold contrasts across the artwork and its applications.",
    disciplines: ["Graphic design", "Illustration"],
    palette: ["#D4482D", "#EDCE94", "#121212"],
    preserveArtwork: true,
    gallery: [
      { src: kriaBlackShirt, alt: "Kria black shirt with red dragon artwork, front and back" },
      { src: kriaWhiteShirt, alt: "Kria white shirts with black dragon illustrations" },
      { src: kriaDragonArtwork, alt: "Kria black shirt and red and cream dragon illustration" },
      { src: kriaShirtDetails, alt: "Kria shirt details with embroidered dragon designs" },
    ],
  },
  Emily: {
    description: "Graphic design for Emily. A playful illustrated character comes to life in a light blue and white palette. Soft shapes, expressive details and small star accents bring personality to the artwork.",
    disciplines: ["Graphic design", "Illustration"],
    palette: ["#477FB4", "#D8E4EE", "#F2F2F2"],
    preserveArtwork: true,
    preservePalette: true,
    gallery: [
      { src: emilyShirt, alt: "Emily Carina white shirts with blue flower character illustrations" },
      { src: emilyWebsite, alt: "Emily Carina website featuring the official shirt, paintings and tattoo studio" },
    ],
  },
  solid: {
    description: "Graphic design, web design and social media for Solid. A vivid purple palette and a compact, directional symbol form a recognisable visual foundation across the brand's digital communication.",
    disciplines: ["Graphic design", "Web design", "Social media"],
    palette: ["#51218B", "#211333", "#F7F5F0"],
  },
};

export function projectPath(project: Project) {
  return `#/work/${encodeURIComponent(project.id.toLowerCase())}`;
}

export function projectFromHash(hash: string) {
  const match = /^#\/work\/([^/]+)\/?$/.exec(hash);
  if (!match) return null;
  try {
    const id = decodeURIComponent(match[1]).toLowerCase();
    return projects.find((project) => project.id.toLowerCase() === id) ?? null;
  } catch {
    return null;
  }
}

export function getProjectCaseStudy(project: Project): ProjectCaseStudy {
  return caseStudies[project.id] ?? {
    description: `${project.name} — ${project.role ?? "Selected design work"}.`,
    disciplines: project.role?.split(" · ") ?? ["Design"],
    palette: [project.coverBackground, project.coverForeground, "#283EC9"],
  };
}
