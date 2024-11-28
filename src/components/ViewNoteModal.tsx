import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Note } from '../types';

interface ViewNoteModalProps {
  isOpen: boolean;
  note: Note;
  onClose: () => void;
}

export function ViewNoteModal({ isOpen, note, onClose }: ViewNoteModalProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform rounded-xl bg-white dark:bg-slate-800 shadow-2xl transition-all">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="pr-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-1">
                {note.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {formatDate(note.createdAt)}
              </p>
            </div>
            
            <div className="mt-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}