import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  TrendingUp,
  Building2,
  FileText,
  Settings,
  X,
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/performance', label: 'Performance', icon: TrendingUp },
  { path: '/departments', label: 'Departments', icon: Building2 },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open = true, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 lg:transform-none lg:static ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">PMS</h1>
          {open && onClose && (
            <button onClick={onClose} className="lg:hidden">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="pt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={onClose}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-6">
          <div className="text-xs text-gray-500">
            <p>Performance</p>
            <p>Management System</p>
          </div>
        </div>
      </aside>
    </>
  );
};
