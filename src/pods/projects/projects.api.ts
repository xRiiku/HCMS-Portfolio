import client from "../../lib/client";
import type { ProjectItem } from "./projects.model";

export const getProjects = async (): Promise<ProjectItem[]> => {
  const list = await client.getContentList<ProjectItem>({
    contentType: "Projects",
    language: "es",
  });

  return Array.isArray(list) ? list : [];
};
