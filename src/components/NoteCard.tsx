import React, { useState } from 'react';
import { Note } from '../types';
import { Pencil, Trash2, Eye } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onView: (note: Note) => void;
}

export default function NoteCard({ note, onEdit, onDelete, onView }: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-violet-200 dark:hover:border-violet-500/50 transition-all duration-200 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick action buttons */}
      <div
        className={`absolute right-2 top-2 flex gap-1 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(note);
          }}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-500/20 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200"
          title="Edit note"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-500/20 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
          title="Delete note"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(note);
          }}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-500/20 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200"
          title="View note"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Note content */}
      <div className="p-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors duration-200" onClick={() => onView(note)}>
        <h3 className="font-medium text-slate-900 dark:text-white mb-1 line-clamp-1">
          {note.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">
          {truncateText(note.content, 150)}
        </p>
        <div className="text-xs text-slate-400 dark:text-slate-500">
          {formatDate(note.updatedAt)}
        </div>
      </div>
    </div>
  );
}