import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
  userRole?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, userRole = 'HR Manager' }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-20">
      <div className="flex items-center justify-between h-full px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};
