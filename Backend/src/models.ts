export type TrackModel = {
  id: string;
  title: string;
  authorId: string;
  thumbnail: string;
  length: number;
  modulesCount: number;
};

export type AuthorModel = {
  id: string;
  name: string;
  photo: string;
}

export type FilmModel = {
  id: string;
  title: string;
  people: string[];
}

export type PeopleModel = {
  id: string;
  name: string;
  eye_color: string;
  films: string[];
}