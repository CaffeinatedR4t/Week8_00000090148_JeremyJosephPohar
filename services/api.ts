import axios from 'axios';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface NewPostPayload {
  title: string;
  body: string;
  userId: number;
}

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const englishPostTitle = (id: number) => `Project Update #${id}`;

const englishPostBody = (id: number, userId: number) =>
  `This is an English summary for post ${id}. It shares progress, key decisions, and next steps for user ${userId}.`;

const englishCommentName = (id: number) => `Feedback Note #${id}`;

const englishCommentBody = (id: number, postId: number) =>
  `This comment gives clear feedback for post ${postId}. Action point ${id}: review the details and apply the update if needed.`;

const toEnglishPost = (post: Post): Post => ({
  ...post,
  title: englishPostTitle(post.id),
  body: englishPostBody(post.id, post.userId),
});

const toEnglishComment = (comment: Comment): Comment => ({
  ...comment,
  name: englishCommentName(comment.id),
  body: englishCommentBody(comment.id, comment.postId),
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data.map(toEnglishPost);
};

export const getPostDetail = async (postId: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${postId}`);
  return toEnglishPost(response.data);
};

export const getUserDetail = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data.map(toEnglishComment);
};

export const postData = async (payload: NewPostPayload): Promise<Post> => {
  const response = await api.post<Post>('/posts', payload);
  return response.data;
};
