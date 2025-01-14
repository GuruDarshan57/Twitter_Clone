export interface PostProps {
  id: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName?: string | null;
    userName: string;
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
      userName?: string;
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
    userName?: string;
    profileImgUrl?: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  location: string;
  email: string;
  profileImgUrl: string;
  createdAt: string;
  posts: PostProps[];
  likedPosts: PostProps[];
  bookmarkedPosts: PostProps[];
  recommendedUsers: User[];
  followers: User[];
  following: User[];
}
