import React, { useState } from 'react';
import { DEFAULT_THEME } from './constants';
import { Theme, TabView } from './types';
import ControlPanel from './components/ControlPanel';
import PreviewContainer from './components/PreviewContainer';
import { Monitor, Smartphone } from 'lucide-react';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const [activeTab, setActiveTab] = useState<TabView>(TabView.PRESETS);
  const [isMobileView, setIsMobileView] = useState(false);

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white overflow-hidden font-sans">
      
      {/* Left Side: Preview Area */}
      <main className="flex-1 relative flex flex-col min-w-0 transition-all duration-300">
        {/* Toolbar */}
        <div className="h-14 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur flex items-center justify-between px-6 z-10">
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-sm text-neutral-400">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Preview Mode
             </div>
           </div>
           <div className="flex bg-neutral-800 rounded-lg p-1 gap-1">
             <button 
               onClick={() => setIsMobileView(false)}
               className={`p-1.5 rounded transition-colors ${!isMobileView ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
               title="Desktop View"
             >
               <Monitor size={16} />
             </button>
             <button 
               onClick={() => setIsMobileView(true)}
               className={`p-1.5 rounded transition-colors ${isMobileView ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
               title="Mobile View"
             >
               <Smartphone size={16} />
             </button>
           </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-neutral-900/30 overflow-hidden relative flex items-center justify-center p-4 md:p-8">
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
                backgroundImage: `radial-gradient(#404040 1px, transparent 1px)`, 
                backgroundSize: '24px 24px' 
             }} 
           />
           
           <div className={`relative w-full h-full bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMobileView ? 'max-w-[390px] h-[844px] rounded-[3rem] border-[8px] border-neutral-800 ring-1 ring-neutral-700' : 'rounded-xl ring-1 ring-white/10'}`}>
             <PreviewContainer theme={currentTheme} isMobileView={isMobileView} />
           </div>
        </div>
      </main>

      {/* Right Side: Controls */}
      <aside className="w-80 md:w-96 flex-shrink-0 h-full z-20">
        <ControlPanel 
          currentTheme={currentTheme} 
          setTheme={setCurrentTheme}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </aside>

    </div>
  );
};

export default App;