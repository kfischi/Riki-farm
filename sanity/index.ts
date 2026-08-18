// Schema registry for the embedded Sanity Studio (/studio).
// Import this array in sanity.config.ts — it is the single source of truth
// for which document types the editor can see.
import { packageSchema } from "./schemas/package";
import { boxTypeSchema } from "./schemas/boxType";
import { boxProductSchema } from "./schemas/boxProduct";
import { videoSchema } from "./schemas/video";
import { siteSettingsSchema } from "./schemas/siteSettings";
import { mediaBlockSchema } from "./schemas/mediaBlock";

export { packageSchema, boxTypeSchema, boxProductSchema, videoSchema, siteSettingsSchema, mediaBlockSchema };

export const schemas = [
  siteSettingsSchema,
  packageSchema,
  mediaBlockSchema,
  boxTypeSchema,
  boxProductSchema,
  videoSchema,
];
