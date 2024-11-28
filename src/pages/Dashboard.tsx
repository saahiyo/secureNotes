import React, { useState } from 'react';
import { Plus, Search, Folder } from 'lucide-react';
import { useNotesStore } from '../store/notes';
import { AddNoteModal } from '../components/AddNoteModal';
import { EditNoteModal } from '../components/EditNoteModal';
import { ViewNoteModal } from '../components/ViewNoteModal';
import NoteCard from '../components/NoteCard';
import { Note } from '../types';

export function Dashboard() {
  const {
    selectedFolder,
    setNoteSearchQuery,
    setGlobalSearchQuery,
    getFilteredNotes,
    getGlobalSearchResults,
    addNote,
    deleteNote,
    editNote,
  } = useNotesStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchType, setSearchType] = useState<'notes' | 'global'>('notes');

  const filteredNotes = getFilteredNotes();
  const globalResults = getGlobalSearchResults();

  const handleAddNote = (data: { title: string; content: string }) => {
    if (!selectedFolder) return;
    addNote({
      ...data,
      folderId: selectedFolder.id,
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    setSelectedNote(null);
  };

  const handleEditNote = (data: { title: string; content: string }) => {
    if (!selectedNote) return;
    editNote(selectedNote.id, {
      ...data,
      folderId: selectedNote.folderId,
    });
    setIsEditModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {selectedFolder ? selectedFolder.name : 'All Notes'}
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={!selectedFolder}
          className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed w-auto justify-center transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search Type Toggle */}
        <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-1 sm:w-48 bg-white dark:bg-slate-800 shadow-sm">
          <button
            onClick={() => setSearchType('notes')}
            className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
              searchType === 'notes'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setSearchType('global')}
            className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
              searchType === 'global'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Global
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4 transition-colors group-focus-within:text-violet-500" />
          <input
            type="text"
            placeholder={
              searchType === 'notes'
                ? 'Search in current folder...'
                : 'Search all folders and notes...'
            }
            onChange={(e) =>
              searchType === 'notes'
                ? setNoteSearchQuery(e.target.value)
                : setGlobalSearchQuery(e.target.value)
            }
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:border-violet-500 shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* Content Section */}
      {searchType === 'notes' ? (
        // Notes View
        <>
          {selectedFolder ? (
            filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onEdit={() => {
                      setSelectedNote(note);
                      setIsEditModalOpen(true);
                    }}
                    onView={() => {
                      setSelectedNote(note);
                      setIsViewModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
                No notes found in this folder.
              </div>
            )
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
              Please select a folder to view or create notes.
            </div>
          )}
        </>
      ) : (
        // Global Search Results
        <div className="space-y-6">
          {/* Folders Results */}
          {globalResults.folders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight mb-3">Folders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {globalResults.folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-violet-500 transition-all duration-200 shadow-sm hover:shadow group cursor-pointer"
                  >
                    <Folder className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-violet-500 transition-colors" />
                    <span className="text-slate-900 dark:text-white font-medium truncate">
                      {folder.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Results */}
          {globalResults.notes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight mb-3">Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {globalResults.notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onEdit={() => {
                      setSelectedNote(note);
                      setIsEditModalOpen(true);
                    }}
                    onView={() => {
                      setSelectedNote(note);
                      setIsViewModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {globalResults.folders.length === 0 && globalResults.notes.length === 0 && (
            <div className="text-center text-slate-500 dark:text-slate-400 mt-8">
              No results found. Try a different search term.
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <AddNoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNote}
      />

      {selectedNote && (
        <EditNoteModal
          isOpen={isEditModalOpen}
          note={selectedNote}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedNote(null);
          }}
          onSubmit={handleEditNote}
        />
      )}

      {selectedNote && (
        <ViewNoteModal
          isOpen={isViewModalOpen}
          note={selectedNote}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
}