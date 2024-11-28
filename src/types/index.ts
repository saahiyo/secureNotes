export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Folder {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}