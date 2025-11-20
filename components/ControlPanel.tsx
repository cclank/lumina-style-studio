
import React, { useState } from 'react';
import { TabView, Theme } from '../types';
import { DEFAULT_FONTS, PRESET_THEMES } from '../constants';
import { generateThemeFromPrompt } from '../services/geminiService';
import { 
  Palette, 
  Type, 
  BoxSelect, 
  Sparkles, 
  Code, 
  Check, 
  RefreshCw, 
  Loader2,
  Copy,
  Layers,
  Terminal,
  Download,
  Plus,
  Trash2
} from 'lucide-react';

interface ControlPanelProps {
  currentTheme: Theme;
  setTheme: (t: Theme) => void;
  activeTab: TabView;
  setActiveTab: (t: TabView) => void;
}

const STANDARD_COLOR_KEYS = ['primary', 'secondary', 'accent', 'background', 'surface', 'text', 'muted'];

const ControlPanel: React.FC<ControlPanelProps> = ({ currentTheme, setTheme, activeTab, setActiveTab }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHistory, setGeneratedHistory] = useState<Theme[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newColorName, setNewColorName] = useState('');

  const handleColorChange = (key: string, value: string) => {
    setTheme({
      ...currentTheme,
      colors: { ...currentTheme.colors, [key]: value }
    });
  };

  const addCustomColor = () => {
    if (!newColorName.trim()) return;
    // slugify key
    const key = newColorName.trim().toLowerCase().replace(/\s+/g, '-');
    if (currentTheme.colors[key]) return; // already exists

    setTheme({
      ...currentTheme,
      colors: { ...currentTheme.colors, [key]: '#000000' }
    });
    setNewColorName('');
  };

  const removeCustomColor = (key: string) => {
    const newColors = { ...currentTheme.colors };
    delete newColors[key];
    setTheme({ ...currentTheme, colors: newColors });
  };

  const handleFontChange = (key: keyof Theme['typography'], value: string) => {
    setTheme({
      ...currentTheme,
      typography: { ...currentTheme.typography, [key]: value }
    });
  };

  const handleUiChange = (key: keyof Theme['ui'], value: string) => {
    setTheme({
      ...currentTheme,
      ui: { ...currentTheme.ui, [key]: value }
    });
  };

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const newTheme = await generateThemeFromPrompt(aiPrompt);
      setGeneratedHistory([newTheme, ...generatedHistory]);
      setTheme(newTheme);
    } catch (e) {
      alert("Failed to generate theme. Check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Enhanced "Smart Copy" for AI Workflows
  const copyThemeToClipboard = (theme: Theme, e?: React.MouseEvent, customId?: string) => {
    if (e) e.stopPropagation();

    // Generate CSS variables dynamically including custom ones
    const cssVarsBody = Object.entries(theme.colors)
      .map(([k, v]) => `  --color-${k}: ${v};`)
      .join('\n');

    const cssVars = `:root {
${cssVarsBody}
  --font-heading: ${theme.typography.headingFont};
  --font-body: ${theme.typography.bodyFont};
  --radius: ${theme.ui.borderRadius};
  --border-width: ${theme.ui.borderWidth};
}`;

    // Construct a Rich Prompt for AI
    const aiReadyPrompt = `I want you to use the following Design System for the UI generation.

Theme Name: ${theme.name}
Vibe & Description: ${theme.description || 'A custom selected theme.'}

### CSS Variables
Use these for direct styling implementation:
\`\`\`css
${cssVars}
\`\`\`

### Theme Configuration (JSON)
Use this for logic, Tailwind config, or component props:
\`\`\`json
${JSON.stringify(theme, null, 2)}
\`\`\`
`;

    navigator.clipboard.writeText(aiReadyPrompt);
    
    const idToSet = customId || theme.id;
    setCopiedId(idToSet);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Pure Code Copy (for the Export tab)
  const copyRawCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadThemeJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentTheme, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${currentTheme.name.replace(/\s+/g, '_').toLowerCase()}_theme.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Helper to render a theme card
  const renderThemeCard = (theme: Theme) => (
    <div key={theme.id} className="relative group">
      <button
        onClick={() => setTheme(theme)}
        className={`w-full p-4 rounded-lg border text-left transition-all ${
          currentTheme.id === theme.id 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-neutral-800 bg-neutral-800/40 hover:border-neutral-600'
        }`}
      >
        <div className="flex items-center justify-between mb-2 pr-8">
          <span className="font-medium text-neutral-200">{theme.name}</span>
          {currentTheme.id === theme.id && <Check size={16} className="text-indigo-400 absolute top-4 right-4" />}
        </div>
        <p className="text-xs text-neutral-500 mb-3 line-clamp-1">{theme.description}</p>
        <div className="flex gap-1">
          {/* Preview up to 4 main colors */}
          {[theme.colors.primary, theme.colors.secondary, theme.colors.accent, theme.colors.background].map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
      </button>
      
      {/* Floating Copy Button */}
      <button
        onClick={(e) => copyThemeToClipboard(theme, e)}
        title="Copy AI Prompt & Style"
        className={`absolute top-3 right-3 p-2 rounded-md shadow-lg transition-all transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 focus:opacity-100 ${
          copiedId === theme.id ? 'bg-green-500 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-indigo-600 hover:text-white'
        }`}
      >
        {copiedId === theme.id ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );

  // Helper to generate exportable CSS variables code block
  const generateCssVarsCode = () => {
     return `:root {
${Object.entries(currentTheme.colors).map(([k, v]) => `  --color-${k}: ${v};`).join('\n')}
  --font-heading: ${currentTheme.typography.headingFont};
  --font-body: ${currentTheme.typography.bodyFont};
  --radius: ${currentTheme.ui.borderRadius};
  --border-width: ${currentTheme.ui.borderWidth};
}`;
  };
  
  // Helper to generate Tailwind Extend config
  const generateTailwindCode = () => {
    const colorEntries = Object.entries(currentTheme.colors)
      .map(([k, v]) => `      ${k}: '${v}',`)
      .join('\n');

    return `theme: {
  extend: {
    colors: {
${colorEntries}
    },
    borderRadius: {
      DEFAULT: '${currentTheme.ui.borderRadius}',
    },
    fontFamily: {
      heading: [${currentTheme.typography.headingFont}],
      body: [${currentTheme.typography.bodyFont}],
    }
  }
}`;
  };

  return (
    <div className="h-full flex flex-col bg-neutral-900 border-l border-neutral-800 shadow-2xl">
      
      {/* Header */}
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <Palette className="text-indigo-400" size={20}/> Style Studio
        </h2>
        <p className="text-neutral-400 text-xs mt-1">Select a style, Copy, Paste into AI.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800">
        {[
            { id: TabView.PRESETS, icon: BoxSelect, label: 'Themes' },
            { id: TabView.CUSTOMIZE, icon: Palette, label: 'Edit' },
            { id: TabView.AI_GEN, icon: Sparkles, label: 'AI' },
            { id: TabView.EXPORT, icon: Code, label: 'Code' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider font-medium transition-all ${
              activeTab === tab.id 
                ? 'text-indigo-400 bg-neutral-800/50 border-b-2 border-indigo-400' 
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/30'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* PRESETS TAB */}
        {activeTab === TabView.PRESETS && (
          <div className="space-y-6">
            
            {/* Tech Giants */}
            <div>
               <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 sticky top-0 bg-neutral-900 py-2 z-10 flex items-center gap-2">
                  <Layers size={12} /> Tech & Productivity
               </h3>
               <div className="grid grid-cols-1 gap-3">
                  {PRESET_THEMES.filter(t => t.id.startsWith('tech-')).map(renderThemeCard)}
               </div>
            </div>

            {/* Artistic */}
            <div>
               <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 sticky top-0 bg-neutral-900 py-2 z-10 flex items-center gap-2">
                  <Palette size={12} /> Fine Art & Media
               </h3>
               <div className="grid grid-cols-1 gap-3">
                  {PRESET_THEMES.filter(t => t.id.startsWith('art-')).map(renderThemeCard)}
               </div>
            </div>

             {/* Modern & Trendy */}
             <div>
               <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 sticky top-0 bg-neutral-900 py-2 z-10 flex items-center gap-2">
                  <Sparkles size={12} /> Modern & Trendy
               </h3>
               <div className="grid grid-cols-1 gap-3">
                  {PRESET_THEMES.filter(t => !t.id.startsWith('art-') && !t.id.startsWith('tech-')).map(renderThemeCard)}
               </div>
            </div>

          </div>
        )}

        {/* CUSTOMIZE TAB */}
        {activeTab === TabView.CUSTOMIZE && (
          <div className="space-y-8 animate-fade-in">
            {/* Colors Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                  <Palette size={14}/> Color Palette
                </h3>
                {/* COPY BUTTON IN CUSTOMIZE TAB */}
                <button 
                  onClick={(e) => copyThemeToClipboard(currentTheme, e, 'custom-copy')}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium transition-all ${
                    copiedId === 'custom-copy' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-neutral-800 text-neutral-400 hover:bg-indigo-500/20 hover:text-indigo-400'
                  }`}
                  title="Copy full prompt for AI"
                >
                  {copiedId === 'custom-copy' ? <Check size={12}/> : <Terminal size={12}/>}
                  {copiedId === 'custom-copy' ? 'Copied Prompt' : 'Copy AI Prompt'}
                </button>
              </div>

              {/* Standard Colors */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {STANDARD_COLOR_KEYS.map((key) => (
                  <div key={key} className="flex items-center justify-between group">
                    <label className="text-sm text-neutral-400 capitalize group-hover:text-neutral-200 transition-colors">{key}</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={currentTheme.colors[key]}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0"
                      />
                      <input 
                        type="text" 
                        value={currentTheme.colors[key]} 
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-300 font-mono uppercase focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Custom Colors */}
              {Object.keys(currentTheme.colors).filter(k => !STANDARD_COLOR_KEYS.includes(k)).length > 0 && (
                <>
                  <h4 className="text-[10px] font-bold text-neutral-600 uppercase mb-3">Custom Colors</h4>
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {Object.keys(currentTheme.colors).filter(k => !STANDARD_COLOR_KEYS.includes(k)).map((key) => (
                       <div key={key} className="flex items-center justify-between group">
                        <label className="text-sm text-neutral-400 capitalize group-hover:text-neutral-200 transition-colors">{key}</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={currentTheme.colors[key]}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-none p-0"
                          />
                          <input 
                            type="text" 
                            value={currentTheme.colors[key]} 
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="w-20 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-300 font-mono uppercase focus:border-indigo-500 outline-none"
                          />
                          <button onClick={() => removeCustomColor(key)} className="text-neutral-600 hover:text-red-400 p-1">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Add New Color */}
              <div className="flex gap-2 items-center mt-4 pt-4 border-t border-neutral-800">
                <input 
                  type="text" 
                  placeholder="New color name..." 
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomColor()}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm text-neutral-300 placeholder:text-neutral-600 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <button 
                  onClick={addCustomColor}
                  disabled={!newColorName.trim()}
                  className="bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 p-2 rounded border border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="h-px bg-neutral-800" />

            {/* Typography Section */}
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Type size={14}/> Typography
              </h3>
              <div className="space-y-4">
                 <div>
                   <label className="text-xs text-neutral-400 mb-2 block">Headings</label>
                   <select 
                      value={DEFAULT_FONTS.find(f => f.value === currentTheme.typography.headingFont)?.name || 'Inter'}
                      onChange={(e) => {
                        const selected = DEFAULT_FONTS.find(f => f.name === e.target.value);
                        if(selected) handleFontChange('headingFont', selected.value);
                      }}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-200 focus:ring-1 focus:ring-indigo-500 outline-none"
                   >
                      {DEFAULT_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="text-xs text-neutral-400 mb-2 block">Body</label>
                   <select 
                      value={DEFAULT_FONTS.find(f => f.value === currentTheme.typography.bodyFont)?.name || 'Inter'}
                      onChange={(e) => {
                        const selected = DEFAULT_FONTS.find(f => f.name === e.target.value);
                        if(selected) handleFontChange('bodyFont', selected.value);
                      }}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm text-neutral-200 focus:ring-1 focus:ring-indigo-500 outline-none"
                   >
                      {DEFAULT_FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                   </select>
                 </div>
              </div>
            </div>

            <div className="h-px bg-neutral-800" />

            {/* UI Section */}
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BoxSelect size={14}/> Interface
              </h3>
              <div className="space-y-4">
                <div>
                   <div className="flex justify-between mb-2">
                     <label className="text-xs text-neutral-400">Corner Radius</label>
                     <span className="text-xs text-neutral-500 font-mono">{currentTheme.ui.borderRadius}</span>
                   </div>
                   <input 
                    type="range" min="0" max="24" step="2"
                    value={parseInt(currentTheme.ui.borderRadius.replace('rem', '').replace('px', '')) * (currentTheme.ui.borderRadius.includes('rem') ? 16 : 1)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      handleUiChange('borderRadius', val === 0 ? '0px' : `${val/16}rem`);
                    }}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                   />
                </div>
                
                <div>
                  <label className="text-xs text-neutral-400 mb-2 block">Shadow Depth</label>
                   <div className="grid grid-cols-3 gap-2">
                     {['none', 'sm', 'lg', '2xl'].map((s) => (
                       <button 
                        key={s}
                        onClick={() => handleUiChange('shadow', s)}
                        className={`text-xs py-2 rounded border ${currentTheme.ui.shadow === s ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-neutral-800 text-neutral-400 border-neutral-700'}`}
                       >
                         {s}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI GENERATION TAB */}
        {activeTab === TabView.AI_GEN && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-white">Magic Generator</h3>
              </div>
              <p className="text-sm text-neutral-400 mb-4">
                Describe a vibe, a place, or a feeling. Our AI will craft a unique design system for you.
              </p>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., A sunset over a futuristic Tokyo city, cyberpunk but pastel..."
                className="w-full h-32 bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-sm text-neutral-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none mb-4 placeholder:text-neutral-600"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isGenerating ? 'bg-neutral-800 text-neutral-500' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25'
                }`}
              >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                {isGenerating ? 'Dreaming...' : 'Generate Theme'}
              </button>
            </div>

            {/* History */}
            {generatedHistory.length > 0 && (
              <div className="space-y-3">
                 <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Recent Generations</h4>
                 {generatedHistory.map((h, idx) => (
                   <div key={idx} className="relative group">
                    <button onClick={() => setTheme(h)} className="w-full p-3 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:border-neutral-500 flex items-center gap-3 text-left transition-colors">
                        <div className="w-8 h-8 rounded-md" style={{ backgroundColor: h.colors.primary }}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-200 truncate">{h.name}</p>
                          <p className="text-[10px] text-neutral-500 truncate">{h.description}</p>
                        </div>
                    </button>
                    <button
                      onClick={(e) => copyThemeToClipboard(h, e)}
                      className={`absolute top-3 right-3 p-1.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all ${copiedId === h.id ? 'bg-green-500 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-indigo-600 hover:text-white'}`}
                    >
                      {copiedId === h.id ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                   </div>
                 ))}
              </div>
            )}
          </div>
        )}

        {/* EXPORT TAB */}
        {activeTab === TabView.EXPORT && (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-300 mb-4">
               Tip: Use the copy buttons in the "Themes" or "Edit" tab to get a rich prompt designed for AI agents (ChatGPT, Claude, etc). Use the buttons below for raw code.
            </div>

            {/* Download JSON Section */}
            <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-4">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-neutral-500">Full Theme Config (JSON)</span>
                  <button
                    onClick={downloadThemeJson}
                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Download size={12} /> Download JSON
                  </button>
              </div>
              <p className="text-[10px] text-neutral-500 mb-2">
                Save your theme locally to restore it later or share with others.
              </p>
              <pre className="font-mono text-[10px] text-neutral-400 leading-relaxed max-h-24 overflow-hidden relative">
                {JSON.stringify(currentTheme, null, 2)}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
              </pre>
            </div>

            <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-4 overflow-x-auto">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-mono text-neutral-500">CSS Variables</span>
                 <button 
                  onClick={() => copyRawCode(generateCssVarsCode(), 'export-css')}
                  className={`text-xs px-2 py-1 rounded transition-colors ${copiedId === 'export-css' ? 'bg-green-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
                 >
                   {copiedId === 'export-css' ? 'Copied!' : 'Copy Code'}
                 </button>
              </div>
              <pre className="font-mono text-[10px] text-green-400 leading-relaxed">
{`:root {
  --color-primary: ${currentTheme.colors.primary};
  --color-surface: ${currentTheme.colors.surface};
  /* ... + ${Object.keys(currentTheme.colors).length - 2} more */
}`}
              </pre>
            </div>

            <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-4">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-mono text-neutral-500">Tailwind Config (Extend)</span>
                 <button 
                  onClick={() => copyRawCode(generateTailwindCode(), 'export-tw')}
                  className={`text-xs px-2 py-1 rounded transition-colors ${copiedId === 'export-tw' ? 'bg-green-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
                 >
                   {copiedId === 'export-tw' ? 'Copied!' : 'Copy Code'}
                 </button>
               </div>
               <pre className="font-mono text-[10px] text-blue-400 leading-relaxed whitespace-pre-wrap">
{`theme: {
  extend: {
    colors: {
      primary: '${currentTheme.colors.primary}',
      // ...
    }
  }
}`}
               </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
