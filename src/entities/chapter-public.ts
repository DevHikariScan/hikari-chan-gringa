export class ChapterPublic {
  public id: string;
  public title: string;
  public url: string;
  public chapter: string;
  public manga_id: string;
  constructor(props: ChapterPublic) {
    this.id = props.id;
    this.title = props.title;
    this.url = props.url;
    this.chapter = props.chapter;
    this.manga_id = props.manga_id;
  }
}
