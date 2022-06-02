import { ChapterPublic } from "../entities/chapter-public";
import { ProjectPublic } from "../entities/project-public";

export interface IMangaDexRepo {
  getIdByUrlProject(url: string): string;
  getIdByUrlChapter(url: string): string;

  getProjectById(id: string): Promise<ProjectPublic | null>;
  getChapterById(id: string): Promise<ChapterPublic | null>;
  getCoverUrlById(id: string, project_id: string): Promise<string | null>;
}
