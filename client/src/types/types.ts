export type Comment = {
    id: string;
    content: string;
    user: {
      id: string;
      username: string;
    };
  };
  
  export type Article = {
    id: string;
    title: string;
    description: string;
    numberOfLikes: number;
    comments: Comment[];
  };
  