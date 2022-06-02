import { ProjectPublic } from "../../entities/project-public";
import { IMangaDexRepo } from "../manga-dex-repo";
import MangaDexApi from "../../services/mangadex-api";
import { ChapterPublic } from "../../entities/chapter-public";
export class MangaDex implements IMangaDexRepo {
  getIdByUrlProject(url: string): string {
    return url.replace(/(.*title\/)|(\/.*)/gi, "");
  }
  getIdByUrlChapter(url: string): string {
    return url.replace(/(.*chapter\/)|(\/.*)/gi, "");
  }

  async getProjectById(id: string): Promise<ProjectPublic | null> {
    try {
      const response = await MangaDexApi.get("/manga/" + id);
      const { result, data } = response.data;
      if (result != "ok") {
        throw new Error("MangaDex API error");
      }
      
      const project = new ProjectPublic({
        id: data.id,
        title: data.attributes.title.en,
        description: data.attributes.description.en,
        type: data.type,
        status: data.attributes.status,
        genres: data.attributes.tags.map((tag: any) => tag.attributes.name.en),
        chapter: data.attributes.lastChapter,
        cover_url: data.relationships[2].id,
        url: `${MangaDexApi.getUri()}/title/${data.id}/${data.attributes.links.kt}`,
      });

      const coverUrl = await this.getCoverUrlById(
        project.cover_url,
        project.id
      );
      project.cover_url = coverUrl || "";
      return project;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getChapterById(id: string): Promise<ChapterPublic | null> {
    try {
      const response = await MangaDexApi.get("/chapter/" + id);
      const { result, data } = response.data;
      if (result != "ok") {
        throw new Error("MangaDex API error");
      }
      const chapter = new ChapterPublic({
        id: data.id,
        title: data.attributes.title || "",
        url: `${MangaDexApi.getUri()}/chapter/${data.id}/1`,
        chapter: data.attributes.chapter,
        manga_id: data.relationships[1].id,
      });
      return chapter;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCoverUrlById(
    id: string,
    project_id: string
  ): Promise<string | null> {
    try {
      const response = await MangaDexApi.get("/cover/" + id);
      const { result, data } = response.data;
      if (result != "ok") {
        throw new Error("MangaDex API error");
      }

      const filename = data.attributes.fileName;
      return `https://mangadex.org/covers/${project_id}/${filename}`;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
