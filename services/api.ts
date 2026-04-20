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

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

export const getPostDetail = async (postId: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${postId}`);
  return response.data;
};

export const getUserDetail = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
};

export const postData = async (payload: NewPostPayload): Promise<Post> => {
  const response = await api.post<Post>('/posts', payload);
  return response.data;
};
