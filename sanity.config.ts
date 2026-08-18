import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Brand palette for the Studio.
 * Accent is burgundy (#80182c). No yellow or amber anywhere — including the
 * warning state, whose Sanity default is amber and is overridden below.
 */
const BURGUNDY = "#80182c";
const BURGUNDY_DARK = "#5c1120";

const theme = buildLegacyTheme({
  "--font-family-base": "Heebo, Assistant, -apple-system, BlinkMacSystemFont, sans-serif",

  "--black": "#12100f",
  "--white": "#ffffff",
  "--gray-base": "#6b6461",
  "--gray": "#8a8380",

  "--brand-primary": BURGUNDY,
  "--component-bg": "#ffffff",
  "--component-text-color": "#12100f",

  "--default-button-color": "#8a8380",
  "--default-button-primary-color": BURGUNDY,
  "--default-button-success-color": "#2d6a4f",
  // Brown, deliberately not amber — see brand constraint.
  "--default-button-warning-color": "#9a5b2d",
  "--default-button-danger-color": "#b3261e",

  "--focus-color": BURGUNDY,

  "--main-navigation-color": BURGUNDY_DARK,
  "--main-navigation-color--inverted": "#ffffff",

  "--state-info-color": "#3a5a7a",
  "--state-success-color": "#2d6a4f",
  // Sanity's default here is amber. Overridden to brown per brand constraint.
  "--state-warning-color": "#9a5b2d",
  "--state-danger-color": "#b3261e",
});

export default defineConfig({
  name: "meshek-shusterman",
  title: "משק שוסטרמן — ניהול תוכן",
  basePath: "/studio",

  projectId,
  dataset,

  schema: { types: schemas },

  plugins: [structureTool(), visionTool()],

  theme,
});
