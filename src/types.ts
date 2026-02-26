export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  system: string;
  client: string;
  imageUrl: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

export interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  message: string;
  createdAt: string;
}
