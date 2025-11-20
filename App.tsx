
import React, { useState } from 'react';
import { DEFAULT_THEME, PRESET_THEMES } from './constants';
import { Theme, TabView, ColorPalette } from './types';
import ControlPanel from './components/ControlPanel';
import PreviewContainer from './components/PreviewContainer';
import { Monitor, Smartphone } from 'lucide-react';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const [activeTab, setActiveTab] = useState<TabView>(TabView.PRESETS);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Manage the list of available themes (presets + user saved)
  const [allThemes, setAllThemes] = useState<Theme[]>(PRESET_THEMES);

  // Helper to ensure the theme has all standard color keys, even if they were missing in the preset
  const enrichTheme = (theme: Theme): Theme => {
    const defaultStatusColors: Partial<ColorPalette> = {
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
      info: '#3b82f6'
    };
    
    const enrichedColors = { ...defaultStatusColors, ...theme.colors };
    return { ...theme, colors: enrichedColors as ColorPalette };
  };

  const handleSetTheme = (theme: Theme) => {
    setCurrentTheme(enrichTheme(theme));
  };

  const handleAddTheme = (newTheme: Theme) => {
    const enriched = enrichTheme(newTheme);
    setAllThemes([enriched, ...allThemes]);
    // Switch to presets tab to show the new list
    setActiveTab(TabView.PRESETS);
    handleSetTheme(enriched);
  };

  const handleRemoveTheme = (themeId: string) => {
    setAllThemes(allThemes.filter(t => t.id !== themeId));
    // If the deleted theme was selected, revert to default
    if (currentTheme.id === themeId) {
      handleSetTheme(DEFAULT_THEME);
    }
  };

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
          setTheme={handleSetTheme}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allThemes={allThemes}
          addTheme={handleAddTheme}
          removeTheme={handleRemoveTheme}
        />
      </aside>

    </div>
  );
};

export default App;
