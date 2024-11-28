import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesStore {
  folders: Folder[];
  notes: Note[];
  selectedFolder: Folder | null;
  folderSearchQuery: string;
  noteSearchQuery: string;
  globalSearchQuery: string;
  setFolderSearchQuery: (query: string) => void;
  setNoteSearchQuery: (query: string) => void;
  setGlobalSearchQuery: (query: string) => void;
  addFolder: (name: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editNote: (id: string, note: Partial<Omit<Note, 'id'>>) => void;
  deleteNote: (id: string) => void;
  setSelectedFolder: (folder: Folder | null) => void;
  getFilteredFolders: () => Folder[];
  getFilteredNotes: () => Note[];
  getGlobalSearchResults: () => { folders: Folder[]; notes: Note[] };
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  folders: [],
  notes: [],
  selectedFolder: null,
  folderSearchQuery: '',
  noteSearchQuery: '',
  globalSearchQuery: '',

  setFolderSearchQuery: (query) => set({ folderSearchQuery: query }),
  setNoteSearchQuery: (query) => set({ noteSearchQuery: query }),
  setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),

  addFolder: (name) => {
    const newFolder = {
      id: uuidv4(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      folders: [...state.folders, newFolder],
    }));
  },

  addNote: (note) => {
    const newNote = {
      id: uuidv4(),
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      notes: [...state.notes, newNote],
    }));
  },

  editNote: (id, note) => {
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id
          ? {
              ...n,
              ...note,
              updatedAt: new Date().toISOString(),
            }
          : n
      ),
    }));
  },

  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },

  setSelectedFolder: (folder) => {
    set({ selectedFolder: folder });
  },

  getFilteredFolders: () => {
    const { folders, folderSearchQuery } = get();
    if (!folderSearchQuery) return folders;
    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(folderSearchQuery.toLowerCase())
    );
  },

  getFilteredNotes: () => {
    const { notes, selectedFolder, noteSearchQuery } = get();
    let filtered = selectedFolder
      ? notes.filter((note) => note.folderId === selectedFolder.id)
      : notes;

    if (noteSearchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(noteSearchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(noteSearchQuery.toLowerCase())
      );
    }

    return filtered;
  },

  getGlobalSearchResults: () => {
    const { folders, notes, globalSearchQuery } = get();
    if (!globalSearchQuery) return { folders: [], notes: [] };

    const query = globalSearchQuery.toLowerCase();
    const filteredFolders = folders.filter((folder) =>
      folder.name.toLowerCase().includes(query)
    );
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );

    return { folders: filteredFolders, notes: filteredNotes };
  },
}));