import React, { useState, useEffect } from 'react';
import { Palette, Type, Sliders, Check, RotateCcw, Languages } from 'lucide-react';
import { Language, translations } from '../translations';

interface ThemeSettingsViewProps {
  onShowToast: (title: string, message: string) => void;
  lang: Language;
  onToggleLanguage: (newLang: Language) => void;
}

export interface AppThemeConfig {
  bg: string;
  surface: string;
  text: string;
  border: string;
  fontFamily: string;
  fontSizePercent: number;
}

export const defaultThemeConfig: AppThemeConfig = {
  bg: '#ded5be',
  surface: '#ede5cf',
  text: '#121212',
  border: '#121212',
  fontFamily: "'Playfair Display', 'Kantumruy Pro', Georgia, serif",
  fontSizePercent: 100
};

export const ThemeSettingsView: React.FC<ThemeSettingsViewProps> = ({ 
  onShowToast, 
  lang, 
  onToggleLanguage 
}) => {
  const t = translations[lang];

  const [theme, setTheme] = useState<AppThemeConfig>(() => {
    const saved = localStorage.getItem('pineapple_theme_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultThemeConfig; }
    }
    return defaultThemeConfig;
  });

  const colorPalettes = [
    { name: lang === 'km' ? 'ក្រដាសបូរាណដើម' : 'Original Parchment', bg: '#ded5be', surface: '#ede5cf', text: '#121212', border: '#121212' },
    { name: lang === 'km' ? 'ពណ៌ភ្លុកក្តៅ' : 'Warm Ivory', bg: '#f6ede0', surface: '#fff7ed', text: '#1a1816', border: '#1a1816' },
    { name: lang === 'km' ? 'ក្រណាត់ Kraft' : 'Kraft Linen', bg: '#e8dfca', surface: '#f3ece0', text: '#201e1a', border: '#201e1a' },
    { name: lang === 'km' ? 'ខ្សាច់វាលខ្សាច់' : 'Desert Sand', bg: '#dfd3b7', surface: '#eee4cb', text: '#1f1b14', border: '#1f1b14' },
    { name: lang === 'km' ? 'បៃតងបុរាណ' : 'Vintage Sage', bg: '#dae2d5', surface: '#e8eee5', text: '#192118', border: '#192118' },
    { name: lang === 'km' ? 'កុលាបដីឥដ្ឋ' : 'Rose Terracotta', bg: '#ebdcd5', surface: '#f5ebe6', text: '#261b17', border: '#261b17' },
    { name: lang === 'km' ? 'ផ្ទៃមេឃស្រាល' : 'Muted Slate', bg: '#d7e0e7', surface: '#e6edf2', text: '#141d24', border: '#141d24' },
    { name: lang === 'km' ? 'ខ្មៅរលោង' : 'Obsidian Noir', bg: '#1c1b18', surface: '#282723', text: '#ded5be', border: '#ded5be' },
  ];

  const fontOptions = [
    { name: 'Playfair Display', value: "'Playfair Display', 'Kantumruy Pro', Georgia, serif", label: lang === 'km' ? 'ក្បាលអក្សរទស្សនាវដ្តី' : 'Editorial Headline Serif' },
    { name: 'Kantumruy Pro', value: "'Kantumruy Pro', 'Inter', sans-serif", label: lang === 'km' ? 'ពុម្ពអក្សរខ្មែរទំនើប' : 'Modern Khmer / Latin Sans' },
    { name: 'Bodoni Moda', value: "'Bodoni Moda', 'Kantumruy Pro', Georgia, serif", label: lang === 'km' ? 'ម៉ូដទាន់សម័យ' : 'Modern Vogue Serif' },
    { name: 'Cormorant Garamond', value: "'Cormorant Garamond', 'Kantumruy Pro', Georgia, serif", label: lang === 'km' ? 'បណ្ណសារបុរាណ' : 'Archival Heritage Serif' },
    { name: 'Inter', value: "'Inter', 'Kantumruy Pro', system-ui, sans-serif", label: lang === 'km' ? 'សាមញ្ញ និងច្បាស់' : 'Clean Functional Sans' },
    { name: 'Space Mono', value: "'Space Mono', monospace", label: lang === 'km' ? 'ម៉ាស៊ីនអង្គុលីលេខ' : 'Brutalist Monospace' },
  ];

  const fontSizes = [
    { label: lang === 'km' ? 'តូច' : 'Compact', percent: 90 },
    { label: lang === 'km' ? 'ធម្មតា' : 'Normal', percent: 100 },
    { label: lang === 'km' ? 'មធ្យម' : 'Medium', percent: 110 },
    { label: lang === 'km' ? 'ធំ' : 'Large', percent: 120 },
  ];

  // Apply to document root whenever theme state changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-bg', theme.bg);
    root.style.setProperty('--app-surface', theme.surface);
    root.style.setProperty('--app-text', theme.text);
    root.style.setProperty('--app-border', theme.border);
    root.style.setProperty('--app-font-family', theme.fontFamily);
    document.body.style.setProperty('font-family', theme.fontFamily, 'important');
    root.style.fontSize = `${theme.fontSizePercent}%`;

    localStorage.setItem('pineapple_theme_config', JSON.stringify(theme));
  }, [theme]);

  const handleApplyPalette = (palette: typeof colorPalettes[0]) => {
    setTheme(prev => ({
      ...prev,
      bg: palette.bg,
      surface: palette.surface,
      text: palette.text,
      border: palette.border
    }));
    onShowToast(lang === 'km' ? 'ពណ៌ត្រូវបានអនុវត្ត' : 'PALETTE APPLIED', `${palette.name}`);
  };

  const handleSelectFont = (fontValue: string, fontName: string) => {
    setTheme(prev => ({ ...prev, fontFamily: fontValue }));
    document.documentElement.style.setProperty('--app-font-family', fontValue);
    document.body.style.setProperty('font-family', fontValue, 'important');
    onShowToast(lang === 'km' ? 'ពុម្ពអក្សរត្រូវបានផ្លាស់ប្តូរ' : 'TYPOGRAPHY UPDATED', `${fontName}`);
  };

  const handleFontSizeChange = (delta: number) => {
    setTheme(prev => {
      const nextSize = Math.max(80, Math.min(130, prev.fontSizePercent + delta));
      return { ...prev, fontSizePercent: nextSize };
    });
  };

  const handleReset = () => {
    setTheme(defaultThemeConfig);
    onShowToast(lang === 'km' ? 'បានកំណត់ឡើងវិញ' : 'THEME RESET', 'Default settings restored');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in max-w-4xl" style={{ color: theme.text }}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono opacity-70 uppercase">
            <span>{t.brand}</span>
            <span>/</span>
            <span className="font-bold">{t.nav.settings}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1" style={{ fontFamily: theme.fontFamily }}>
            {t.pages.settingsTitle}
          </h2>
          <p className="font-mono text-xs opacity-70 tracking-wider">
            {t.pages.settingsSub}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-ink text-xs font-mono uppercase tracking-wider hover:bg-black/5 self-start sm:self-auto"
        >
          <RotateCcw size={12} />
          <span>{t.settings.resetDefaults}</span>
        </button>
      </div>

      {/* 0. Language Switcher Card */}
      <div className="border-2 border-ink p-5 sm:p-6 bg-[#ede5cf] shadow-brutal space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink/20">
          <div className="flex items-center gap-2">
            <Languages size={16} />
            <h3 className="font-serif font-bold text-base sm:text-lg">{t.settings.language}</h3>
          </div>
          <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 border border-ink bg-[#ded5be]">
            {lang === 'en' ? 'English (EN)' : 'ភាសាខ្មែរ (KM)'}
          </span>
        </div>

        <p className="font-mono text-xs opacity-80">
          {t.settings.languageDesc}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => {
              onToggleLanguage('en');
              onShowToast('LANGUAGE CHANGED', 'Interface set to English');
            }}
            className={`p-4 border-2 border-ink text-left flex items-center justify-between transition-colors ${
              lang === 'en' ? 'bg-ink text-[#ded5be] font-bold shadow-sm' : 'bg-[#ded5be] hover:bg-black/5 text-ink'
            }`}
          >
            <div>
              <p className="font-serif text-base font-bold">English (US)</p>
              <p className="text-[10px] font-mono opacity-70 mt-0.5">International English</p>
            </div>
            {lang === 'en' && <Check size={18} />}
          </button>

          <button
            onClick={() => {
              onToggleLanguage('km');
              onShowToast('ភាសាត្រូវបានផ្លាស់ប្តូរ', 'ចំណុចប្រទាក់បានប្តូរទៅជាភាសាខ្មែរ');
            }}
            className={`p-4 border-2 border-ink text-left flex items-center justify-between transition-colors ${
              lang === 'km' ? 'bg-ink text-[#ded5be] font-bold shadow-sm' : 'bg-[#ded5be] hover:bg-black/5 text-ink'
            }`}
          >
            <div>
              <p className="font-serif text-base font-bold">ភាសាខ្មែរ (Khmer)</p>
              <p className="text-[10px] font-mono opacity-70 mt-0.5">ភាសាជាតិកម្ពុជា</p>
            </div>
            {lang === 'km' && <Check size={18} />}
          </button>
        </div>
      </div>

      {/* 1. Theme Color Palette Swatches */}
      <div className="border-2 border-ink p-5 sm:p-6 bg-[#ede5cf] shadow-brutal space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink/20">
          <div className="flex items-center gap-2">
            <Palette size={16} />
            <h3 className="font-serif font-bold text-base sm:text-lg">{t.settings.themeColor}</h3>
          </div>
          <span className="text-[10px] font-mono uppercase opacity-70">
            {colorPalettes.find(p => p.bg === theme.bg)?.name || 'Custom'}
          </span>
        </div>

        <p className="font-mono text-xs opacity-80">
          {t.settings.themeDesc}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {colorPalettes.map((palette) => {
            const isSelected = theme.bg === palette.bg;
            return (
              <button
                key={palette.name}
                onClick={() => handleApplyPalette(palette)}
                style={{ backgroundColor: palette.bg, color: palette.text, borderColor: palette.border }}
                className={`p-3 border-2 text-left flex flex-col justify-between h-24 transition-transform hover:-translate-y-0.5 ${
                  isSelected ? 'ring-2 ring-ink ring-offset-2 font-bold shadow-md' : 'shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                    {palette.bg}
                  </span>
                  {isSelected && <Check size={14} className="stroke-[3]" />}
                </div>
                <span className="font-serif text-xs font-bold leading-tight">
                  {palette.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Font Family Selection */}
      <div className="border-2 border-ink p-5 sm:p-6 bg-[#ede5cf] shadow-brutal space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink/20">
          <div className="flex items-center gap-2">
            <Type size={16} />
            <h3 className="font-serif font-bold text-base sm:text-lg">{t.settings.fontFamily}</h3>
          </div>
          <span className="text-[10px] font-mono uppercase opacity-70">
            {fontOptions.find(f => f.value === theme.fontFamily)?.name || 'Custom'}
          </span>
        </div>

        <p className="font-mono text-xs opacity-80">
          {t.settings.fontDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fontOptions.map((font) => {
            const isSelected = theme.fontFamily === font.value;
            return (
              <button
                key={font.name}
                onClick={() => handleSelectFont(font.value, font.name)}
                className={`p-3.5 border-2 border-ink text-left transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-ink text-[#ded5be] font-bold shadow-sm' : 'bg-[#ded5be] hover:bg-black/5 text-ink'
                }`}
              >
                <div>
                  <p className="text-base sm:text-lg leading-tight" style={{ fontFamily: font.value }}>
                    {font.name}
                  </p>
                  <p className="text-[10px] font-mono opacity-70 mt-0.5">
                    {font.label}
                  </p>
                </div>
                {isSelected && <Check size={16} className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Font Size & Scaling Stepper */}
      <div className="border-2 border-ink p-5 sm:p-6 bg-[#ede5cf] shadow-brutal space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink/20">
          <div className="flex items-center gap-2">
            <Sliders size={16} />
            <h3 className="font-serif font-bold text-base sm:text-lg">{t.settings.fontSize}</h3>
          </div>
          <span className="text-xs font-mono font-bold">
            {theme.fontSizePercent}%
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {fontSizes.map((sz) => {
              const isSelected = theme.fontSizePercent === sz.percent;
              return (
                <button
                  key={sz.percent}
                  onClick={() => setTheme(prev => ({ ...prev, fontSizePercent: sz.percent }))}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 border border-ink text-xs font-mono uppercase tracking-wider transition-colors ${
                    isSelected ? 'bg-ink text-[#ded5be] font-bold' : 'bg-[#ded5be] text-ink hover:bg-black/5'
                  }`}
                >
                  {sz.label} ({sz.percent}%)
                </button>
              );
            })}
          </div>

          <div className="flex items-center border-2 border-ink bg-[#ded5be]">
            <button
              onClick={() => handleFontSizeChange(-5)}
              className="px-4 py-1.5 font-mono text-base font-bold hover:bg-black/10 border-r border-ink"
              title="Decrease font size"
            >
              −
            </button>
            <span className="px-4 py-1.5 font-mono text-xs font-bold text-center min-w-[70px]">
              {theme.fontSizePercent}%
            </span>
            <button
              onClick={() => handleFontSizeChange(5)}
              className="px-4 py-1.5 font-mono text-base font-bold hover:bg-black/10 border-l border-ink"
              title="Increase font size"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 4. Live Real-Time Preview Card */}
      <div className="border-2 border-ink p-5 sm:p-6 bg-[#ded5be] shadow-brutal space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">
          {t.settings.previewTitle}
        </span>
        <h4 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: theme.fontFamily }}>
          {lang === 'km' 
            ? 'សួស្តី! សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រង Pineapple Officer' 
            : 'The Quick Brown Fox Jumps Over The Lazy Dog'}
        </h4>
        <p className="text-sm leading-relaxed opacity-85" style={{ fontFamily: theme.fontFamily }}>
          {t.settings.previewDesc}
        </p>
      </div>
    </div>
  );
};
