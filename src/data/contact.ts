export const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "yurlzrdf@gmail.com";

export const socialLinks = [
  {
    label: "INSTAGRAM",
    href: import.meta.env.VITE_INSTAGRAM_URL?.trim() || "https://www.instagram.com/yuurlz/",
  },
  {
    label: "LINKEDIN",
    href: import.meta.env.VITE_LINKEDIN_URL?.trim() || "https://www.linkedin.com/in/yurlz",
  },
].filter((link): link is { label: string; href: string } =>
  Boolean(link.href && /^https:\/\//i.test(link.href)),
);
