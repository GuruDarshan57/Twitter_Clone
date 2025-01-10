export interface PostProps {
  id: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName?: string | null;
    profileImgUrl: string;
  };
  likes: { id: string }[];
  bookmarks: { id: string }[];
  comments: {
    id: string;
    comment?: string;
    createdAt?: string;
    author: {
      id?: string;
      firstName?: string;
      lastName?: string;
      profileImgUrl?: string;
    };
  }[];
}

export interface Comment {
  id: string;
  comment: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    profileImgUrl: string;
  };
}
