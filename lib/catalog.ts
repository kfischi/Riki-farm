import { CONFIG } from "./config";

export interface CatalogEntry {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export function getCatalogEntries(): CatalogEntry[] {
  return [...CONFIG.packages, ...CONFIG.borderPackages].map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    tags: p.tags ?? [],
  }));
}
