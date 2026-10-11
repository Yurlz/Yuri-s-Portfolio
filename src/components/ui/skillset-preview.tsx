import graphicDesignImage from "@/assets/graphic-design.png";
import webDesignImage from "@/assets/web-design.png";
import wireframeMediaImage from "@/assets/wireframe-media.png";

export type SkillsetPreviewVariant = "web" | "interface" | "graphic";

const previewImages: Record<SkillsetPreviewVariant, string> = {
  web: webDesignImage,
  interface: wireframeMediaImage,
  graphic: graphicDesignImage,
};

export function SkillsetPreview({ variant }: { variant: SkillsetPreviewVariant }) {
  return (
    <img
      src={previewImages[variant]}
      alt=""
      draggable={false}
      className="h-full w-full object-cover"
    />
  );
}
