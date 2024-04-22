import { RESTDataSource } from "@apollo/datasource-rest";
import { AuthorModel, TrackModel } from "../models.js";

export class TrackAPI extends RESTDataSource {
  baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

  getTracks() {
    return this.get<TrackModel[]>('tracks')
  }

  getAuthorBy(id: string) {
    return this.get<AuthorModel>(`author/${id}`)
  }

  incrementTrackView(trackId: string) {
    return this.patch<TrackModel>(`track/${trackId}/numberOfViews`)
  }

  incrementLikes(trackId: string) {
    return this.patch<TrackModel>(`track/${trackId}/numberOfLikes`)
  }
}