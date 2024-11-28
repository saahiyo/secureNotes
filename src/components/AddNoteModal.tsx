import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { title: string; content: string }) => void;
}

export function AddNoteModal({ isOpen, onClose, onAdd }: AddNoteModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    onAdd({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });
    form.reset();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform rounded-xl bg-white dark:bg-slate-800 shadow-2xl transition-all">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Create New Note
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  autoFocus
                  className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors duration-200"
                  placeholder="Enter note title"
                />
              </div>
              
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={4}
                  className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none transition-colors duration-200"
                  placeholder="Enter note content"
                />
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-violet-600 hover:bg-violet-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow transition-all duration-200"
                >
                  Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}