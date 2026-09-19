import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { SINGLETONS, isHiddenType } from "./studio-policy";

/**
 * The Studio's left-hand navigation.
 *
 * Lives here rather than inline in sanity.config.ts so the gate in
 * scripts/check-studio-structure.mjs can serialize the real resolver. A gate
 * that exercises a copy of the structure proves nothing about the one that
 * ships.
 *
 * ## Every node gets an explicit `.id()`, and the reason is not style
 *
 * Sanity derives a missing id from the node's title:
 *
 *   getStructureNodeId(title, id) -> id || camelCase(title), and when that
 *   contains anything outside [A-Za-z0-9-_.], camelCase(speakingurl(title))
 *
 * `speakingurl` has no Hebrew transliteration table, so it returns "" for
 * every Hebrew string. A Hebrew title therefore derives the id "", and
 * ListBuilder.serialize rejects an empty id with "`id` is required for lists".
 *
 * The Studio then renders nothing but "Encountered an error while reading
 * structure" — the whole content interface, gone — while `next build`, tsc and
 * ESLint all pass, because the failure happens when the pane is serialized in
 * the browser. That is what shipped, and what the owner hit on her first
 * login.
 *
 * So: in a Hebrew Studio, `.id()` is not optional on any node, and it is
 * written before `.title()` so the title can never recompute it.
 */
export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .id("root")
    .title("תוכן")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .id(type)
          .title(title)
          .child(S.document().schemaType(type).documentId(type).title(title)),
      ),
      S.divider(),
      // Auto-generated items already carry the type name as their id.
      ...S.documentTypeListItems().filter((item) => !isHiddenType(item.getId() ?? "")),
    ]);
