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
  comment?: string;
  createdAt?: string;
  author: {
    id?: string;
    firstName?: string;
    lastName?: string;
    profileImgUrl?: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImgUrl: string;
  posts: PostProps[];
  likedPosts: PostProps[];
  bookmarkedPosts: PostProps[];
  recommendedUsers: User[];
  followers: User[];
  following: User[];
}
