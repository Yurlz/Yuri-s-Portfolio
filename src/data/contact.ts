export const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "designer.yki@gmail.com";

export const socialLinks = [
  { label: "INSTAGRAM", href: import.meta.env.VITE_INSTAGRAM_URL?.trim() },
  { label: "LINKEDIN", href: import.meta.env.VITE_LINKEDIN_URL?.trim() },
].filter((link): link is { label: string; href: string } =>
  Boolean(link.href && /^https:\/\//i.test(link.href)),
);
