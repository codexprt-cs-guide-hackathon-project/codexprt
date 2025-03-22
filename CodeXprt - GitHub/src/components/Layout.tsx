import React, { useState } from 'react';
import { Menu, Home, BookOpen, Brain, Trophy, Settings, Sun, Moon, BarChart, Code, MessageSquare, Lightbulb, GraduationCap, Calendar, Crown, Users, Code2, Bug, FileCode, FileSearch, FileText, Box as Cube, FileText as FileTextIcon, FilePen } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold dark:text-white flex items-center`}>
                <span className="text-blue-500">{`</>`}</span>
                <span className="text-blue-500 ml-[5px]">Code</span>
                <span className="text-purple-500">Xprt</span>
              </h1>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              <NavItem to="/dashboard" icon={<Home />} text="Dashboard" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard'} />
              <NavItem to="/dashboard/roadmap" icon={<BookOpen />} text="Roadmap" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/roadmap'} />
              <NavItem to="/dashboard/practice" icon={<Brain />} text="Daily Practice" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/practice'} />
              <NavItem to="/dashboard/progress" icon={<Trophy />} text="Progress" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/progress'} />
              <NavItem to="/dashboard/graph" icon={<BarChart />} text="Learning Graph" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/graph'} />
              <NavItem to="/dashboard/skill-analysis" icon={<Lightbulb />} text="Skill Analysis" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/skill-analysis'} />
              <NavItem to="/dashboard/code-checker" icon={<Code />} text="Code Checker" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/code-checker'} />
              <NavItem to="/dashboard/code-converter" icon={<FileCode />} text="Code Converter" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/code-converter'} />
              <NavItem to="/dashboard/code-debugger" icon={<Bug />} text="Code Debugger" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/code-debugger'} />
              <NavItem to="/dashboard/plagiarism-detection" icon={<FileSearch />} text="Plagiarism Detection" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/plagiarism-detection'} />
              <NavItem to="/dashboard/cover-letter" icon={<FileText />} text="Cover Letter" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/cover-letter'} />
              <NavItem to="/dashboard/resume-builder" icon={<FilePen />} text="Resume Builder" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/resume-builder'} />
              <NavItem to="/dashboard/make-your-own-x" icon={<Cube />} text="Make Your Own X" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/make-your-own-x'} />
              <NavItem to="/dashboard/custom-path" icon={<GraduationCap />} text="Custom Path" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/custom-path'} />
              <NavItem to="/dashboard/bookings" icon={<Calendar />} text="Bookings" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/bookings'} />
              <NavItem to="/dashboard/ai" icon={<MessageSquare />} text="CodeXprt AI" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/ai'} />
              <NavItem to="/dashboard/collab" icon={<Users />} text="Collab" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/collab'} />
              <NavItem to="/dashboard/settings" icon={<Settings />} text="Settings" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/settings'} />
              <NavItem to="/dashboard/get-premium" icon={<Crown className="text-yellow-500" />} text="Get Premium" isOpen={isSidebarOpen} isActive={location.pathname === '/dashboard/get-premium'} golden={true} />
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                {isSidebarOpen && (
                  <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
  isActive: boolean;
  golden?: boolean;
}

function NavItem({ to, icon, text, isOpen, isActive, golden }: NavItemProps) {
  const activeClass = isActive ? 'text-yellow-500 dark:text-yellow-500' : '';
  const hoverClass = golden ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700';
  const textColorClass = golden ? 'text-yellow-500 dark:text-yellow-500' : 'text-gray-600 dark:text-gray-300';

  return (
    <Link
      to={to}
      className={`flex items-center w-full p-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/20'
          : hoverClass
      }`}
    >
      <span className={`${golden && isActive ? 'text-yellow-500 dark:text-yellow-500' : textColorClass}`}>
        {icon}
      </span>
      {isOpen && (
        <span className={`ml-3 text-sm font-medium ${golden && isActive ? 'text-yellow-500 dark:text-yellow-500' : textColorClass}`}>
          {text}
        </span>
      )}
    </Link>
  );
}
