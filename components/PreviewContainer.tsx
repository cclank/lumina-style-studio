
import React from 'react';
import { Theme } from '../types';
import { 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Menu, 
  Search,
  Shield,
  Zap,
  BarChart
} from 'lucide-react';

interface PreviewContainerProps {
  theme: Theme;
  isMobileView?: boolean;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({ theme, isMobileView = false }) => {
  // Construct CSS variables style object dynamically from all available colors
  const colorVars = Object.fromEntries(
    Object.entries(theme.colors).map(([key, value]) => [`--color-${key}`, value])
  );

  const dynamicStyles = {
    ...colorVars,
    '--font-heading': theme.typography.headingFont,
    '--font-body': theme.typography.bodyFont,
    '--radius': theme.ui.borderRadius,
    '--border-width': theme.ui.borderWidth,
    // Map shadow abstract names to tailwind-like values (simplified for raw CSS var)
    '--shadow': theme.ui.shadow === 'none' ? 'none' : 
                theme.ui.shadow === 'sm' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' :
                theme.ui.shadow === '2xl' ? '0 25px 50px -12px rgb(0 0 0 / 0.25)' :
                '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  } as React.CSSProperties;

  // Helper classes using arbitrary values to hook into CSS variables
  const bgPage = `bg-[var(--color-background)]`;
  const bgSurface = `bg-[var(--color-surface)]`;
  const textMain = `text-[var(--color-text)]`;
  const textMuted = `text-[var(--color-muted)]`;
  
  // Common component classes
  const btnPrimary = `
    bg-[var(--color-primary)] text-white 
    px-6 py-3 font-semibold flex items-center gap-2
    hover:opacity-90 transition-opacity
  `;
  
  const cardStyle = `
    bg-[var(--color-surface)] 
    p-6 
    border-[length:var(--border-width)] border-[var(--color-muted)]/20
    rounded-[var(--radius)] 
    shadow-[var(--shadow)]
    transition-transform hover:-translate-y-1 duration-300
  `;

  const fontHeading = `font-[family-name:var(--font-heading)]`;
  const fontBody = `font-[family-name:var(--font-body)]`;

  return (
    <div 
      className={`w-full h-full overflow-y-auto scrollbar-hide transition-all duration-500 ease-in-out ${isMobileView ? 'max-w-md mx-auto border-x-4 border-neutral-800' : ''}`}
      style={dynamicStyles}
    >
      <div className={`${bgPage} ${textMain} ${fontBody} min-h-full transition-colors duration-500`}>
        
        {/* Navbar */}
        <nav className={`sticky top-0 z-50 ${bgSurface} border-b border-[var(--color-muted)]/20 backdrop-blur-md bg-opacity-90`}>
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className={`${fontHeading} text-2xl font-bold tracking-tight flex items-center gap-2`}>
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-[var(--radius)] flex items-center justify-center">
                 <Star size={16} className="text-white" />
              </div>
              <span>Brand.</span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-medium text-[var(--color-muted)]">
              <a href="#" className={`hover:text-[var(--color-primary)] transition-colors`}>Products</a>
              <a href="#" className={`hover:text-[var(--color-primary)] transition-colors`}>Solutions</a>
              <a href="#" className={`hover:text-[var(--color-primary)] transition-colors`}>Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Search size={20} className="text-[var(--color-muted)] cursor-pointer" />
              <button className={`${btnPrimary} py-2 px-4 text-sm rounded-[var(--radius)]`}>
                Get Started
              </button>
              <Menu className="md:hidden text-[var(--color-muted)]" />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-6xl mx-auto px-6 pt-20 pb-32 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgSurface} border border-[var(--color-muted)]/20 text-sm font-medium text-[var(--color-primary)]`}>
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              v2.0 is now live
            </div>
            <h1 className={`${fontHeading} text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight`}>
              Design without <span className="text-[var(--color-primary)]">limits.</span>
            </h1>
            <p className={`${textMuted} text-lg md:text-xl leading-relaxed max-w-lg`}>
              Create stunning digital experiences with our award-winning platform. 
              Speed, security, and scalability included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className={`${btnPrimary} rounded-[var(--radius)] justify-center`}>
                Start Free Trial <ArrowRight size={18} />
              </button>
              <button className={`px-6 py-3 font-semibold rounded-[var(--radius)] border border-[var(--color-muted)]/30 hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text)]`}>
                View Documentation
              </button>
            </div>
            <div className="pt-8 flex items-center gap-6 text-sm text-[var(--color-muted)] font-medium">
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--color-accent)]" /> No credit card</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--color-accent)]" /> 14-day free trial</div>
            </div>
          </div>
          
          {/* Hero Visual Abstract */}
          <div className="flex-1 w-full relative">
            <div className={`absolute inset-0 bg-[var(--color-primary)] blur-3xl opacity-20 rounded-full`}></div>
            <div className={`${cardStyle} relative z-10 space-y-6`}>
              <div className="flex items-center justify-between border-b border-[var(--color-muted)]/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <div className="text-xs text-[var(--color-muted)] font-mono">dashboard.tsx</div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/3 h-32 bg-[var(--color-muted)]/10 rounded-[var(--radius)] animate-pulse"></div>
                <div className="w-2/3 space-y-3">
                  <div className="w-full h-4 bg-[var(--color-primary)]/20 rounded-[var(--radius)]"></div>
                  <div className="w-5/6 h-4 bg-[var(--color-muted)]/20 rounded-[var(--radius)]"></div>
                  <div className="w-4/6 h-4 bg-[var(--color-muted)]/20 rounded-[var(--radius)]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="h-24 bg-[var(--color-accent)]/10 rounded-[var(--radius)] border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                    <BarChart />
                 </div>
                 <div className="h-24 bg-[var(--color-primary)]/10 rounded-[var(--radius)] border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                    <Zap />
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* Features Grid */}
        <section className={`py-24 ${bgSurface}`}>
          <div className="max-w-6xl mx-auto px-6">
             <div className="mb-16 max-w-2xl">
               <h2 className={`${fontHeading} text-3xl md:text-4xl font-bold mb-4`}>Everything you need to scale.</h2>
               <p className={`${textMuted} text-lg`}>Our platform provides the building blocks for modern applications.</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
               {[
                 { icon: Shield, title: 'Bank-grade Security', desc: 'Enterprise level encryption for all your data.' },
                 { icon: Zap, title: 'Lightning Fast', desc: 'Edge delivery ensures minimal latency worldwide.' },
                 { icon: BarChart, title: 'Real-time Analytics', desc: 'Track your growth with detailed insights.' },
               ].map((feature, idx) => (
                 <div key={idx} className={`${cardStyle} group`}>
                    <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                      <feature.icon size={24} />
                    </div>
                    <h3 className={`${fontHeading} text-xl font-bold mb-3`}>{feature.title}</h3>
                    <p className={`${textMuted}`}>{feature.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className={`max-w-5xl mx-auto rounded-[var(--radius)] bg-[var(--color-primary)] text-white p-12 md:p-20 text-center relative overflow-hidden`}>
             {/* Abstract Background Pattern */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg width="100%" height="100%">
                  <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#pattern-circles)" />
                </svg>
             </div>
             
             <div className="relative z-10">
               <h2 className={`${fontHeading} text-3xl md:text-5xl font-bold mb-6`}>Ready to transform your workflow?</h2>
               <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                 Join 10,000+ developers building the future with our tools.
               </p>
               <button className={`bg-white text-[var(--color-primary)] px-8 py-4 rounded-[var(--radius)] font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}>
                 Get Started Now
               </button>
             </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className={`py-12 border-t border-[var(--color-muted)]/20 ${bgSurface} text-sm ${textMuted}`}>
           <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 font-bold text-[var(--color-text)]">
                <Star size={16} className="text-[var(--color-primary)]" /> Brand.
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[var(--color-primary)]">Privacy</a>
                <a href="#" className="hover:text-[var(--color-primary)]">Terms</a>
                <a href="#" className="hover:text-[var(--color-primary)]">Twitter</a>
              </div>
              <div>© 2024 Brand Inc. All rights reserved.</div>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default PreviewContainer;
