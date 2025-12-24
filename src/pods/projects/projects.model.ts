import type { Media } from "@content-island/api-client";

export interface ProjectItem {
  id: string;
  language: "es";
  lastUpdate: string;
  title: string;
  slug: string;
  image: Media;
  link: string;
}

export type Projects = ProjectItem[];
