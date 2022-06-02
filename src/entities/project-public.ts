export class ProjectPublic {
  public id: string;
  public title: string;
  public description: string;
  public type: string;
  public status: string;
  public cover_url: string;
  public url: string;
  public chapter: string;
  public genres: string[];
  constructor(props: ProjectPublic) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.type = props.type;
    this.status = props.status;
    this.cover_url = props.cover_url;
    this.url = props.url;
    this.chapter = props.chapter;
    this.genres = props.genres;
  }
}
