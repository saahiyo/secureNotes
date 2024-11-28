import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Note } from '../types';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type NoteForm = z.infer<typeof noteSchema>;

interface EditNoteModalProps {
  isOpen: boolean;
  note: Note | null;
  onClose: () => void;
  onSubmit: (data: NoteForm) => void;
}

export function EditNoteModal({ isOpen, note, onClose, onSubmit }: EditNoteModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  });

  const handleFormSubmit = (data: NoteForm) => {
    onSubmit(data);
  };

  if (!isOpen || !note) return null;

  return createPortal(
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
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
              Edit Note
            </h3>
            
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
                  {...register('title')}
                  className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-colors duration-200"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
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
                  rows={8}
                  {...register('content')}
                  className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none transition-colors duration-200"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.content.message}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                >
                  Save Changes
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