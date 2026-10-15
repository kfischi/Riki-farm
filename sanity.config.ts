import {
  defineConfig,
  buildLegacyTheme,
  defineLocaleResourceBundle,
  type TemplateItem,
  type DocumentActionComponent,
  type DocumentActionsContext,
} from "sanity";
import { structureTool } from "sanity/structure";
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

/**
 * Hebrew for the Studio's own buttons.
 *
 * There is no Hebrew language plugin for Sanity Studio — `@sanity/locale-he-il`
 * does not exist on npm — so the whole interface cannot simply be switched over.
 * What does exist is `defineLocaleResourceBundle`, the documented way to replace
 * individual strings, and that is what these two bundles do.
 *
 * The locale stays `en-US` on purpose. Overrides attach to an installed locale,
 * and en-US is the only one here; giving these a `he-IL` code would leave them
 * pointing at a locale nothing can select, and every string would stay English.
 *
 * Only the words an editor actually meets are translated. Anything not listed
 * keeps its English text — the failure mode is "still in English", never a
 * broken or blank label, so an incorrect key costs nothing but the translation.
 *
 * Namespaces are not guesswork: each key below was located inside the
 * `defineLocalesResources("studio" | "structure", {...})` block that declares it.
 */
const heStudio = defineLocaleResourceBundle({
  locale: "en-US",
  namespace: "studio",
  resources: {
    // The image and file field menu — the one an editor opens on every photo.
    "inputs.files.common.actions-menu.upload.label": "העלאת תמונה",
    "inputs.files.common.actions-menu.download.label": "הורדה",
    "inputs.files.common.actions-menu.copy-url.label": "העתקת הכתובת",
    "inputs.files.common.actions-menu.clear-field.label": "ניקוי השדה",
    "input.files.common.upload-placeholder.file-input-button.text": "העלאת תמונה",
    "input.files.common.cancel-upload": "ביטול ההעלאה",

    // Choosing an existing asset instead of uploading a new one.
    "asset-source.browse-button.text": "בחירה מהספרייה",
    "asset-source.dialog.button.select": "בחירה",
    "asset-source.dialog.button.cancel": "ביטול",

    // Document status, shown at the top of every open document.
    "release.chip.draft": "טיוטה",
    "release.chip.published": "מפורסם",
    "document-status.not-published": "לא פורסם",
    "changes.title": "שינויים",

    // The slug field's button, which fills the identifier from the name.
    "inputs.slug.action.generate": "יצירה אוטומטית",

    "new-document.button": "יצירת מסמך חדש",
    "common.dialog.cancel-button.text": "ביטול",
    "inputs.array.action.add-item": "הוספת פריט",
    "inputs.array.action.remove": "הסרה",
  },
});

const heStructure = defineLocaleResourceBundle({
  locale: "en-US",
  namespace: "structure",
  resources: {
    // The publish button and the menu behind the three dots beside it.
    "action.publish.label": "פרסום",
    "action.publish.draft.label": "פרסום",
    "action.discard-changes.label": "ביטול השינויים",
    "action.duplicate.label": "שכפול",
    "action.unpublish.label": "הסרה מהאתר",

    "changes.tab.history": "היסטוריה",
    "changes.tab.review-changes": "מה השתנה",

    "panes.document-list-pane.search-input.placeholder": "חיפוש ברשימה",
    "pane-header.create-menu.label": "יצירת פריט חדש",
  },
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
    // Vision, the GROQ console, is deliberately absent. It is a developer
    // tool, and in the Studio the owner opens it is a query playground in the
    // top bar that she has to learn to ignore.
    //
    // It was first gated behind NODE_ENV instead. That hid the tab but still
    // shipped the plugin — @sanity/vision declares no `sideEffects: false`, so
    // the bundler would not drop the import, and ~115 KB rode along to a
    // Studio that is opened on a phone. The package is still in the
    // dependencies: put `visionTool()` back on this line to develop with it.
  ],

  /**
   * Studio features switched off.
   *
   * Each one costs a control in the top bar or a popup over the content, and
   * none of them does anything this site needs: there is one editor, no
   * approval chain and no release calendar. Everything removed here is a
   * Sanity feature, not a feature of this project — turning it off takes
   * nothing away from the site.
   */
  // Scheduled content releases, and the perspective dropdown they put beside
  // the logo. Publish is immediate here; the site picks it up within a minute.
  releases: { enabled: false },
  // "Publish later" on individual documents. Same reasoning.
  scheduledDrafts: { enabled: false },
  // Sanity's own product announcements, which open over the content.
  announcements: { enabled: false },

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

  i18n: { bundles: [heStudio, heStructure] },

  theme,
});
