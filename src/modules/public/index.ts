import { MangaDex } from "../../repositories/implements/manga-dex";

interface PublicModuleProps {
  link: string;
  roles: string;
}

const MangaDexRepository = new MangaDex();

export async function PublicModule({ link, roles }: PublicModuleProps) {
  const id = MangaDexRepository.getIdByUrlChapter(link);
  const chapter = await MangaDexRepository.getChapterById(id);
  if (!chapter) {
    throw new Error("Chapter not found");
  }
  const Project = await MangaDexRepository.getProjectById(chapter.manga_id);
  if (!Project) {
    throw new Error("Project not found");
  }
  Project.chapter = chapter.chapter;
  return Project;
}
