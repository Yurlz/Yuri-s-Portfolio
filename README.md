# React + TypeScript + Vite

The portfolio's closing sections follow the Yurlz Studio palette: cream, black, and blue (`#283EC9`). The contact section uses the supplied WebGL liquid-metal component, with a static gradient when WebGL is unavailable and reduced-motion support.

The contact form sends messages directly to `yurlzrdf@gmail.com` using [FormSubmit's AJAX endpoint](https://formsubmit.co/ajax-documentation), without leaving the page or opening an email app. It includes the visitor's name, email, optional phone number, reason, and message, with Reply-To set to the visitor's email. The button shows a sending state and prevents duplicate submissions. A success message appears only when FormSubmit confirms acceptance; failures preserve the entered details for another attempt. Requests time out after 30 seconds, and a hidden honeypot field helps filter bots.

Before receiving messages, submit the form once from the website and click **Activate Form** in the confirmation email FormSubmit sends to `yurlzrdf@gmail.com` (check spam too). Activation is required once for each form/address. Until activated, the form reports that activation is pending instead of claiming success. Test again after activation to confirm delivery. See [FormSubmit's activation FAQ](https://formsubmit.co/help). No API key or mail password is needed. The visitor's details are processed by FormSubmit, as described in the site's privacy text.

The footer links to Instagram (`https://www.instagram.com/yuurlz/`) and LinkedIn (`https://www.linkedin.com/in/yurlz`) by default. To change the email or social profiles, copy `.env.example` to `.env.local`, update `VITE_CONTACT_EMAIL`, `VITE_INSTAGRAM_URL`, and `VITE_LINKEDIN_URL`, then restart Vite.

Scrolling uses GSAP ScrollSmoother after the entrance finishes. Its settings live in `src/components/smooth-scroll.tsx`: `smooth: 1.05` on desktop and `smoothTouch: 0.12` on touch devices. Reduced motion uses native scrolling. Menu and policy dialogs pause smoothing, section links use ScrollSmoother navigation, and the About pin and Skillset reveals follow the smoothed position.

Project titles and previews open individual pages at `#/work/<project-id>`. The pages keep the portfolio's header, menu, typography, colours and footer, with pinned information beside a vertical gallery on desktop and a single column on smaller screens. Hash routes support direct links and reloads on static hosting.

Project descriptions, disciplines, colour palettes and galleries live in `src/data/project-case-studies.ts`. Custom galleries display their images in order; projects without one show the cover, palette and detail crop. Project navigation is immediate, and gallery reveals respect reduced motion.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
