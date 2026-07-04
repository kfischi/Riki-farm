// Export all schemas for use in Sanity Studio
export { packageSchema }    from "./schemas/package";
export { boxTypeSchema }    from "./schemas/boxType";
export { boxProductSchema } from "./schemas/boxProduct";
export { videoSchema }      from "./schemas/video";
export { siteSettingsSchema } from "./schemas/siteSettings";

// All schemas array — use this in your Sanity Studio config:
// import { schemas } from './sanity'
// defineConfig({ ..., schema: { types: schemas } })
export const schemas = [
  // imported inside Studio project — this file is a reference only
];
