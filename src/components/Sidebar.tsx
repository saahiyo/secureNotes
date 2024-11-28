import React, { useState } from 'react';
import { FolderPlus, Search, LogOut, X, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { useNotesStore } from '../store/notes';
import { useAuthStore } from '../store/auth';
import { AddFolderModal } from './AddFolderModal';
import { useThemeStore } from '../store/theme';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { folders, selectedFolder, setSelectedFolder, addFolder, setFolderSearchQuery, getFilteredFolders } = useNotesStore();
  const { logout } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isAllFoldersExpanded, setIsAllFoldersExpanded] = useState(true);
  const filteredFolders = getFilteredFolders();

  const handleAddFolder = (name: string) => {
    addFolder(name);
    setIsAddFolderModalOpen(false);
  };

  const handleFolderSelect = (folder: typeof folders[0] | null) => {
    setSelectedFolder(folder);
    if (onClose) onClose(); // Close sidebar on mobile when selecting a folder
  };

  return (
    <>
      <div className="h-full bg-white dark:bg-slate-800 flex flex-col shadow-xl transition-colors duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden lg:block tracking-tight">SecureNotes</h1>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={logout}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg lg:hidden transition-all duration-200"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search folders..."
              onChange={(e) => setFolderSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>

        {/* Folders Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setIsAllFoldersExpanded(!isAllFoldersExpanded)}
                className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {isAllFoldersExpanded ? (
                  <ChevronDown className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                All Folders
              </button>
              <button
                onClick={() => setIsAddFolderModalOpen(true)}
                className="p-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-all duration-200"
                aria-label="Add folder"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            </div>

            {isAllFoldersExpanded && (
              <div className="space-y-1">
                <button
                  onClick={() => handleFolderSelect(null)}
                  className={`w-full flex items-center px-2 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                    selectedFolder === null
                      ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Notes
                </button>
                {filteredFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleFolderSelect(folder)}
                    className={`w-full flex items-center px-2 py-1.5 text-sm rounded-lg transition-colors duration-200 ${
                      selectedFolder?.id === folder.id
                        ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Folder className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">{folder.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
        onAdd={handleAddFolder}
      />
    </>
  );
}