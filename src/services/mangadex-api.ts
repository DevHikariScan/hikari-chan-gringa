import axios from "axios";

const mangadexApi = axios.create({
  baseURL: "https://api.mangadex.org",
});

export default mangadexApi;
