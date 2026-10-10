# React + TypeScript + Vite

The portfolio's closing sections follow the Yurlz Studio palette: cream, black, and blue (`#283EC9`). The contact section uses the supplied WebGL liquid-metal component, with a static gradient when WebGL is unavailable and reduced-motion support.

The contact form opens an email draft addressed to `designer.yki@gmail.com`. The visitor sends it from their email app; the site does not claim to have delivered the message. A copy-message option is available after preparing a draft.

To change the email or add social profiles, copy `.env.example` to `.env.local`, fill `VITE_CONTACT_EMAIL`, `VITE_INSTAGRAM_URL`, and `VITE_LINKEDIN_URL`, then restart Vite. Until social URLs are supplied, the footer links to Projects and About.

Scrolling uses GSAP ScrollSmoother after the entrance finishes. Its settings live in `src/components/smooth-scroll.tsx`: `smooth: 1.05` on desktop and `smoothTouch: 0.12` on touch devices. Reduced motion uses native scrolling. Menu and policy dialogs pause smoothing, section links use ScrollSmoother navigation, and the About pin and Skillset reveals follow the smoothed position.

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
