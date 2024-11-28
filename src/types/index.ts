export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Folder {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'url' | 'password' | 'api_key';
  folderId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}