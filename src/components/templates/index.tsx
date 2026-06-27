import type { ComponentType } from "react";
import TraditionalTemplate from "./TraditionalTemplate";
import ElegantTemplate from "./ElegantTemplate";
import ModernTemplate from "./ModernTemplate";
import FloralTemplate from "./FloralTemplate";
import RoyalTemplate from "./RoyalTemplate";
import GarlandTemplate from "./GarlandTemplate";
import type { TemplateProps } from "./shared";

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  Component: ComponentType<TemplateProps>;
}

/** All available biodata templates. Add new entries here to expose them. */
export const templates: TemplateMeta[] = [
  {
    id: "traditional",
    name: "Traditional",
    description: "Classic maroon & gold framed design",
    Component: TraditionalTemplate,
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Airy, centered, minimal with gold rules",
    Component: ElegantTemplate,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column with a maroon sidebar",
    Component: ModernTemplate,
  },
  {
    id: "floral",
    name: "Floral",
    description: "Gold filigree corners with an Om motif",
    Component: FloralTemplate,
  },
  {
    id: "royal",
    name: "Royal",
    description: "Navy arch-framed photo with mandala accents",
    Component: RoyalTemplate,
  },
  {
    id: "garland",
    name: "Garland",
    description: "Golden leaf garlands with peach banners",
    Component: GarlandTemplate,
  },
];

export const defaultTemplateId = templates[0].id;

export function getTemplate(id: string): TemplateMeta {
  return templates.find((t) => t.id === id) ?? templates[0];
}
