import { RESTDataSource } from "@apollo/datasource-rest";
import { FilmModel, PeopleModel } from "../models.js";

export class GhibliAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev/"

  getFilms() {
    return this.get<FilmModel[]>('films')
  }

  getPeople() {
    return this.get<PeopleModel[]>('people')
  }

  getPeopleByUrls(urls: string[]) {
    return urls
      .filter(url => url !== `${this.baseURL}people/`)
      .map(url => this.get<PeopleModel>(url))
  }

  getFilmsByUrls(urls: string[]) {
    return urls.map(url => this.get<FilmModel>(url))
  }
}