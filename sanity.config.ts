import {
  defineConfig,
  buildLegacyTheme,
  type TemplateItem,
  type DocumentActionComponent,
  type DocumentActionsContext,
} from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./sanity";
import { structure } from "./sanity/structure";
import { SINGLETON_TYPES, isHiddenType } from "./sanity/studio-policy";


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

  plugins: [
    // See sanity/structure.ts — every node needs an explicit id, or a Hebrew
    // title silently derives an empty one and the Studio refuses to render.
    structureTool({ structure }),
    visionTool(),
  ],

  document: {
    // Removes singletons from the global "create new" menu and from the
    // "+" button on any list, so the editor cannot make a second copy.
    newDocumentOptions: (prev: TemplateItem[]) =>
      prev.filter((item) => !isHiddenType(item.templateId)),

    /**
     * Guardrails against mistakes — not a security boundary. An administrator
     * can still delete through the API or the Manage console; this only keeps
     * the destructive buttons out of the everyday editing surface.
     *
     * Deleting a package is unrecoverable from the Studio, while switching
     * "זמין" off takes it off the site and is undoable. So delete is hidden
     * and the toggle is the documented way to retire a package.
     */
    actions: (prev: DocumentActionComponent[], { schemaType }: DocumentActionsContext) => {
      const blocked = SINGLETON_TYPES.has(schemaType)
        // There is exactly one settings document; removing or copying it
        // would leave the site without one.
        ? ["delete", "duplicate", "unpublish"]
        : ["delete"];
      return prev.filter((action) => !blocked.includes(action.action ?? ""));
    },
  },

  theme,
});
