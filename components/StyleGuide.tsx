
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Star, Palette, Type, LayoutGrid, Zap, 
  ShieldCheck, Terminal, ChevronRight, User, Search, Fingerprint, 
  Book, Award, Shield, Landmark, Bell, Info, 
  Download, Play, Trash2, Plus, X, 
  Sliders, Eye, Lock, FileText, CheckCircle2, 
  AlertTriangle, XCircle, Home, MessageSquare, Archive, 
  ShieldAlert, ChevronDown, BarChart3, ListFilter, 
  UserCircle, Hash, QrCode, Monitor, Command, Edit3, 
  Image as ImageIcon, Mic, Gavel, Scale, Coins, Trophy, Sparkles,
  MousePointer2, Settings, List, Check, Clipboard, Clock, ExternalLink,
  Users, Mail, Phone, Wifi, Target, Flag, Heart, MessageCircle, 
  Share2, Save, Send, ShoppingBag, Speaker, Tool, Volume2, ZapOff,
  Briefcase, MapPin, HelpCircle, Layers, Link, MoreHorizontal,
  ChevronUp, RotateCcw, Database, Menu, Ruler, Cpu, Sparkle, Loader2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, Tooltip, AreaChart, Area } from 'recharts';
import { GoogleGenAI, Type as GenAIType } from "@google/genai";

interface StyleGuideProps {
  onBack: () => void;
}

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-2">
      <div className="bg-slate-900 p-4 font-mono text-[10px] text-slate-400 overflow-x-auto border border-white/5 max-h-40 overflow-y-auto">
        <pre>{code}</pre>
      </div>
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 bg-white/5 hover:bg-nobel-gold hover:text-ui-blue text-[8px] font-bold uppercase tracking-widest transition-all"
      >
        {copied ? 'Copied' : 'Copy JSX'}
      </button>
    </div>
  );
};

const SectionHeader = ({ id, icon: Icon, title, subtitle }: { id: string; icon: any; title: string; subtitle: string }) => (
  <div id={id} className="pt-32 mb-12 border-b border-slate-200 pb-6">
    <div className="flex items-center gap-4 text-ui-blue mb-2">
        <Icon size={24} />
        <h2 className="text-3xl font-serif italic">{title}</h2>
    </div>
    <p className="text-slate-500 font-light tracking-wide">{subtitle}</p>
  </div>
);

const RegistryItem = ({ title, code, children, description }: { title: string; code: string; children?: React.ReactNode; description?: string }) => (
  <div className="mb-12 group">
    <div className="flex justify-between items-end mb-4">
        <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{title}</h4>
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </div>
    </div>
    <div className="p-8 bg-white border border-slate-200 flex items-center justify-center min-h-[160px] relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        {children}
    </div>
    <CodeBlock code={code} />
  </div>
);

// --- AI COMPONENT ARCHITECT ---

const AIComponentArchitect = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'existing' | 'generated' | 'error', content: any } | null>(null);

  const registryMapping = [
    { id: 'cat-1', keywords: ['color', 'blue', 'gold', 'palette', 'chromatic', 'hex'] },
    { id: 'cat-2', keywords: ['font', 'text', 'heading', 'typography', 'serif', 'mono', 'type'] },
    { id: 'cat-3', keywords: ['icon', 'shield', 'gavel', 'star', 'symbol', 'lucide'] },
    { id: 'cat-4', keywords: ['menu', 'nav', 'breadcrumb', 'spatial', 'link', 'sidebar'] },
    { id: 'cat-5', keywords: ['button', 'cta', 'click', 'command', 'action', 'execute'] },
    { id: 'cat-6', keywords: ['profile', 'user', 'id', 'identity', 'auth', 'presence'] },
    { id: 'cat-7', keywords: ['law', 'article', 'constitution', 'clause', 'legal', 'legislative'] },
    { id: 'cat-8', keywords: ['input', 'form', 'select', 'checkbox', 'select', 'switch', 'field'] },
    { id: 'cat-9', keywords: ['chart', 'graph', 'bar', 'line', 'data', 'visualization', 'diagram'] },
    { id: 'cat-10', keywords: ['card', 'box', 'announcement', 'container', 'artifact'] },
    { id: 'cat-11', keywords: ['table', 'list', 'ledger', 'row', 'grid', 'matrix'] },
    { id: 'cat-12', keywords: ['alert', 'toast', 'message', 'feedback', 'notification'] },
    { id: 'cat-13', keywords: ['spinner', 'loading', 'progress', 'activity', 'loader'] },
    { id: 'cat-14', keywords: ['audio', 'player', 'sound', 'voice', 'mic', 'history'] },
    { id: 'cat-15', keywords: ['pattern', 'grain', 'noise', 'mesh', 'texture'] },
    { id: 'cat-16', keywords: ['glass', 'surface', 'backdrop', 'atmospheric', 'scanline'] },
    { id: 'cat-17', keywords: ['modal', 'popup', 'dialog', 'overlay', 'dispatch'] },
    { id: 'cat-18', keywords: ['tabs', 'pill', 'segmented', 'control', 'stack'] },
    { id: 'cat-19', keywords: ['badge', 'label', 'tag', 'medal', 'plate'] },
    { id: 'cat-20', keywords: ['tooltip', 'hint', 'info', 'slate', 'context'] },
    { id: 'cat-21', keywords: ['header', 'branding', 'logo', 'pattern'] },
    { id: 'cat-22', keywords: ['divider', 'line', 'separator', 'layout', 'ruler'] },
    { id: 'cat-23', keywords: ['social', 'twitter', 'share', 'comms', 'matrix'] },
    { id: 'cat-24', keywords: ['martyr', 'tribute', 'legacy', 'flag', 'anthem'] },
  ];

  const handleArchitect = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);

    // 1. Check for existing components
    const searchLower = prompt.toLowerCase();
    const existing = registryMapping.find(cat => 
      cat.keywords.some(k => searchLower.includes(k))
    );

    if (existing) {
      setResult({
        type: 'existing',
        content: existing.id
      });
      setLoading(false);
      const element = document.getElementById(existing.id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 2. Generate new component with AI
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a design engineer for the UISU (University of Ibadan Students' Union). Your task is to generate a React component code snippet (JSX with Tailwind CSS) for a requested UI element: "${prompt}".
        
        Strictly adhere to the "Aluta Protocol" Design System:
        - COLORS: UI Blue (#003366), Nobel Gold (#C5A059), Heritage Slate (#1E293B), Archive Cream (#F9F8F4).
        - RADIUS: Strictly 0px (rounded-none).
        - TYPOGRAPHY: Serif for headings (Playfair Display), Monospace for technical data/IDs (Inter Mono).
        - AESTHETIC: Academic, legislative, authoritative, archival. Use shadows and borders for depth.
        
        Provide response as JSON:
        {
          "name": "Component Name",
          "description": "Brief archival description",
          "code": "Full JSX code snippet using standard Lucide-react icons if needed."
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: GenAIType.OBJECT,
            properties: {
              name: { type: GenAIType.STRING },
              description: { type: GenAIType.STRING },
              code: { type: GenAIType.STRING }
            },
            required: ["name", "description", "code"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setResult({ type: 'generated', content: data });
    } catch (error) {
      console.error(error);
      setResult({ type: 'error', content: "Failed to initialize generator. Check system credentials." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-20 bg-slate-900 border border-nobel-gold/30 p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        <Cpu size={120} className="text-nobel-gold" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-nobel-gold text-ui-blue">
            <Terminal size={18} />
          </div>
          <h3 className="text-xl font-serif italic text-white">AI Component Architect</h3>
        </div>
        
        <p className="text-slate-400 text-xs mb-8 uppercase tracking-widest max-w-xl">
          Protocol: Input your UI requirement. The system will either localized existing assets or synthesize new registry artifacts following the Aluta aesthetic.
        </p>

        <div className="flex gap-4">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleArchitect()}
            placeholder="e.g., Generate a legislative voting ballot..."
            className="flex-1 bg-slate-800 border border-slate-700 px-6 py-4 text-white font-mono text-sm focus:border-nobel-gold outline-none transition-colors"
          />
          <button 
            onClick={handleArchitect}
            disabled={loading}
            className="bg-nobel-gold text-ui-blue px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />} 
            {loading ? 'Synthesizing...' : 'Architect'}
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 border-t border-slate-800 pt-8"
            >
              {result.type === 'existing' && (
                <div className="bg-ui-blue/50 border border-nobel-gold/50 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="text-green-400" />
                    <div>
                      <h4 className="text-white font-serif text-lg">Asset Found in Registry</h4>
                      <p className="text-slate-400 text-xs uppercase tracking-widest">Localized as: {result.content}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => document.getElementById(result.content)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-nobel-gold text-xs font-bold uppercase tracking-widest hover:text-white flex items-center gap-2"
                  >
                    Navigate to Section <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {result.type === 'generated' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-nobel-gold">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">New Registry Artifact Synthesized</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-8 shadow-inner overflow-hidden flex flex-col items-center">
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-8">Structural Preview [MOCKED]</div>
                    <div className="max-w-md text-center p-8 border border-slate-100 italic font-serif text-slate-400">
                      "{result.content.description}"
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="text-white text-xs font-bold uppercase tracking-widest">{result.content.name}</h4>
                    </div>
                    <CodeBlock code={result.content.code} />
                  </div>
                </div>
              )}

              {result.type === 'error' && (
                <div className="bg-red-950 border border-red-500 p-6 flex items-center gap-4">
                  <AlertTriangle className="text-red-500" />
                  <span className="text-red-200 text-xs font-bold uppercase tracking-widest">{result.content}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export const StyleGuidePage: React.FC<StyleGuideProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-nobel-gold selection:text-white">
      {/* Table of Contents Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 p-8 hidden xl:block z-40 overflow-y-auto pt-32">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Archive Index</div>
        <nav className="space-y-2">
          {[
            '01. Colors', '02. Typography', '03. Iconography', '04. Navigation', 
            '05. Buttons', '06. Identity', '07. Legislative', '08. Forms', 
            '09. Diagrams', '10. Cards', '11. Tables', '12. Feedback', 
            '13. Loaders', '14. Audio', '15. Textures', '16. Surfaces', 
            '17. Overlays', '18. Tabs', '19. Badges', '20. Info Slates', 
            '21. Branding', '22. Dividers', '23. Social', '24. Tributes'
          ].map((cat, i) => (
            <a key={i} href={`#cat-${i+1}`} className="block text-[11px] font-medium text-slate-500 hover:text-nobel-gold transition-colors truncate">
              {cat}
            </a>
          ))}
        </nav>
      </aside>

      <main className="xl:pl-64">
        <div className="container mx-auto px-6 md:px-12 py-32 max-w-6xl">
            <button 
                onClick={onBack}
                className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors mb-16"
            >
                <ArrowLeft size={14} /> Back to Matrix
            </button>

            <header className="mb-20">
                <div className="flex items-center gap-4 mb-6">
                    <Palette className="text-nobel-gold" size={32} />
                    <span className="text-sm font-bold tracking-[0.5em] uppercase text-slate-400">The Aluta Protocol</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-serif text-ui-blue leading-none mb-8">Visual <br/> <span className="italic text-slate-300">Registry</span></h1>
                <p className="text-2xl text-slate-600 font-light max-w-3xl leading-relaxed">
                    A definitive design manual for the intellectual vanguard. 24 categories of archival components engineered for legislative clarity and performance.
                </p>

                {/* AI Architect Section */}
                <AIComponentArchitect />
            </header>

            {/* 01. COLORS */}
            <SectionHeader id="cat-1" icon={Palette} title="01. Colour Palette" subtitle="The chromatic DNA of official student representation." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                <ColorBox name="UI Blue" hex="#003366" usage="Primary Framework" />
                <ColorBox name="Nobel Gold" hex="#C5A059" usage="Interactivity & Merit" />
                <ColorBox name="Heritage Slate" hex="#1E293B" usage="System Metadata" />
                <ColorBox name="Archive Cream" hex="#F9F8F4" usage="Tactile Base Canvas" />
            </div>

            {/* 02. TYPOGRAPHY */}
            <SectionHeader id="cat-2" icon={Type} title="02. Typography" subtitle="Standardized font hierarchies for intellectual weight." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <RegistryItem title="Primary Serif (Display)" code="<h1 className='font-serif text-6xl text-ui-blue italic'>...</h1>">
                    <p className="font-serif text-5xl text-ui-blue italic">Intellectualism & Welfare</p>
                </RegistryItem>
                <RegistryItem title="Technical Mono (Labels)" code="<code className='font-mono text-sm bg-slate-900 text-nobel-gold p-2'>...</code>">
                    <code className="font-mono text-sm bg-slate-900 text-nobel-gold p-2">RECORD_REF_#2024_048</code>
                </RegistryItem>
            </div>

            {/* 03. ICONOGRAPHY */}
            <SectionHeader id="cat-3" icon={Sparkles} title="03. Iconography Registry" subtitle="Standard 24px symbols for functional clarity." />
            <div className="bg-white border border-slate-200 p-12">
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-10">
                    {[
                        {i:Shield, n:'Shield'}, {i:Gavel, n:'Gavel'}, {i:Star, n:'Star'}, {i:Award, n:'Award'}, 
                        {i:Book, n:'Archive'}, {i:Landmark, n:'Union'}, {i:Scale, n:'Justice'}, {i:Fingerprint, n:'Auth'},
                        {i:Bell, n:'Notice'}, {i:Search, n:'Query'}, {i:Terminal, n:'Sys'}, {i:Users, n:'Group'},
                        {i:Mail, n:'Post'}, {i:Phone, n:'Comms'}, {i:Flag, n:'Legacy'}, {i:Target, n:'Focus'},
                        {i:Heart, n:'Welfare'}, {i:Database, n:'Data'}, {i:Zap, n:'Action'}, {i:Layers, n:'State'}
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 group">
                            <div className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-300 group-hover:bg-ui-blue group-hover:text-nobel-gold transition-all"><item.i size={20}/></div>
                            <span className="text-[8px] font-bold uppercase text-slate-400">{item.n}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 04. NAVIGATION */}
            <SectionHeader id="cat-4" icon={Zap} title="04. Spatial Navigation" subtitle="Spatial controllers for the archive matrix." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Archive Breadcrumb" code="<div className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400'>...</div>">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span>ROOT</span> <ChevronRight size={10}/> <span>LEGISLATIVE</span> <ChevronRight size={10}/> <span className="text-ui-blue">SECTION_1</span>
                    </div>
                </RegistryItem>
                <RegistryItem title="Vertical Sidebar Link" code="<div className='flex items-center gap-3 border-l-4 border-nobel-gold p-3 bg-slate-50 text-xs font-bold uppercase'>...</div>">
                    <div className="w-full flex items-center gap-3 text-ui-blue border-l-4 border-nobel-gold p-4 bg-slate-50 font-bold text-xs uppercase tracking-widest"><Home size={14}/> Dashboard Root</div>
                </RegistryItem>
            </div>

            {/* 05. COMMAND BUTTONS */}
            <SectionHeader id="cat-5" icon={MousePointer2} title="05. Command Buttons" subtitle="Standardized action triggers." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RegistryItem title="Primary Command" code="<button className='bg-ui-blue text-white px-8 py-3 rounded-none uppercase font-bold tracking-widest'>Execute</button>">
                    <button className="px-8 py-3 bg-ui-blue text-white rounded-none text-xs font-bold uppercase tracking-widest border border-ui-blue hover:bg-nobel-gold transition-all shadow-lg">Execute</button>
                </RegistryItem>
                <RegistryItem title="Merit Highlight" code="<button className='bg-nobel-gold text-ui-blue px-8 py-3 rounded-none uppercase font-bold tracking-widest'>Award</button>">
                    <button className="px-8 py-3 bg-nobel-gold text-ui-blue rounded-none text-xs font-bold uppercase tracking-widest border border-nobel-gold hover:bg-white transition-all shadow-lg">Award</button>
                </RegistryItem>
                <RegistryItem title="Archive FAB" code="<div className='w-14 h-14 bg-nobel-gold flex items-center justify-center shadow-2xl'>...</div>">
                    <div className="w-14 h-14 bg-nobel-gold text-ui-blue flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform"><Plus /></div>
                </RegistryItem>
            </div>

            {/* 06. IDENTITY */}
            <SectionHeader id="cat-6" icon={Fingerprint} title="06. Identity Registry" subtitle="Systems for verified presence." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Verification Seal" code="<div className='p-2 border-2 border-green-500 text-green-500'><CheckCircle2 /></div>">
                    <div className="p-2 border-2 border-green-500 text-green-500 shadow-xl shadow-green-500/10"><CheckCircle2 size={32} /></div>
                </RegistryItem>
                <RegistryItem title="Digital ID Plaque" code="<div className='bg-white p-4 border border-slate-200 flex items-center gap-4'>...</div>">
                    <div className="bg-white p-4 border border-slate-200 flex items-center gap-4 w-full">
                        <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-300"><UserCircle size={24}/></div>
                        <div>
                            <div className="text-[10px] font-bold text-ui-blue uppercase tracking-widest">Global Scribe</div>
                            <div className="text-[8px] text-slate-400 font-mono">ID: UISU/2024/003</div>
                        </div>
                    </div>
                </RegistryItem>
            </div>

            {/* 07. LEGISLATIVE ARTIFACTS */}
            <SectionHeader id="cat-7" icon={Gavel} title="07. Legislative Artifacts" subtitle="Specialized rendering for legal authority." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <RegistryItem title="Constitutional Clause" code="<div className='p-8 bg-slate-50 border-l-4 border-nobel-gold font-serif italic text-lg'>...</div>">
                    <div className="p-8 bg-slate-50 border-l-4 border-nobel-gold w-full italic font-serif text-lg text-slate-700 leading-relaxed">
                        "The intellectual power resides in the collective conscience of the studentry."
                    </div>
                </RegistryItem>
                <RegistryItem title="Law Article Header" code="<div className='text-center border-b-4 border-ui-blue pb-6'>...</div>">
                    <div className="w-full text-center border-b-4 border-ui-blue pb-6">
                        <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-2">Legislative Protocol</div>
                        <h2 className="font-serif text-5xl text-ui-blue">Article IV</h2>
                    </div>
                </RegistryItem>
            </div>

            {/* 08. FORM PROTOCOL */}
            <SectionHeader id="cat-8" icon={Edit3} title="08. Form Protocol" subtitle="Precise inputs for archival ingestion." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RegistryItem title="Standard Query Input" code="<input className='w-full bg-white border border-slate-200 px-4 py-3' />">
                    <input type="text" placeholder="Enter Reference ID..." className="w-full bg-white border border-slate-200 px-4 py-3 outline-none focus:border-nobel-gold transition-colors text-sm font-light" />
                </RegistryItem>
                <RegistryItem title="Legislative Select" code="<select className='w-full bg-white border border-slate-200 px-4 py-3'>...</select>">
                    <select className="w-full bg-white border border-slate-200 px-4 py-3 outline-none focus:border-nobel-gold transition-colors text-sm font-bold uppercase tracking-widest">
                        <option>Executive Council</option>
                        <option>Legislative House</option>
                    </select>
                </RegistryItem>
                <RegistryItem title="Switch Protocol" code="<div className='w-12 h-6 bg-ui-blue p-1'><div className='w-4 h-4 bg-white'></div></div>">
                    <div className="w-14 h-7 bg-ui-blue p-1 flex items-center justify-end shadow-inner cursor-pointer"><div className="w-5 h-5 bg-white shadow-lg"></div></div>
                </RegistryItem>
            </div>

            {/* 09. DIAGRAMS & DATA FLOW */}
            <SectionHeader id="cat-9" icon={BarChart3} title="09. Diagrams & Data Flow" subtitle="Standardized quantitative rendering." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RegistryItem title="Growth Matrix (Bar)" code="<BarChart data={...}><Bar dataKey='v' fill='#003366' /></BarChart>">
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[{n:'1948',v:40},{n:'1960',v:70},{n:'1990',v:35},{n:'2024',v:55}]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="n" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                                <Bar dataKey="v" fill="#003366" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </RegistryItem>
                <RegistryItem title="Activity Trend (Line)" code="<LineChart data={...}><Line type='monotone' stroke='#C5A059' /></LineChart>">
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[{n:'1',v:20},{n:'2',v:60},{n:'3',v:40},{n:'4',v:80}]}>
                                <Line type="monotone" dataKey="v" stroke="#C5A059" strokeWidth={3} dot={{fill:'#003366', strokeWidth:2, r:5}} />
                                <XAxis hide />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </RegistryItem>
            </div>

            {/* 10. ARCHIVAL CARDS */}
            <SectionHeader id="cat-10" icon={LayoutGrid} title="10. Archival Cards" subtitle="System containers for data modules." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Announcement Block" code="<div className='p-8 bg-white border-l-4 border-ui-blue shadow-sm'>...</div>">
                    <div className="bg-white p-8 border border-slate-200 border-l-4 border-ui-blue w-full group">
                        <div className="text-[8px] font-bold text-nobel-gold uppercase tracking-[0.4em] mb-4">Urgent Dispatch</div>
                        <h4 className="font-serif text-2xl text-ui-blue mb-4 group-hover:text-nobel-gold transition-colors">Senate Reform Session</h4>
                        <p className="text-sm text-slate-500 font-light line-clamp-2">Administrative review of the 2024 budgetary framework following the resumption cycle.</p>
                    </div>
                </RegistryItem>
                <RegistryItem title="Personnel Artifact" code="<div className='bg-slate-900 text-white p-6 border-l-4 border-nobel-gold'>...</div>">
                    <div className="bg-slate-900 text-white p-6 border border-white/10 border-l-4 border-nobel-gold w-full flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-800 border border-white/5 flex-shrink-0"></div>
                        <div>
                            <div className="text-[8px] font-bold text-nobel-gold uppercase tracking-widest mb-1">PRESIDENT</div>
                            <h4 className="font-serif text-xl">Aweda Bolaji</h4>
                            <div className="text-[10px] text-slate-500 font-mono mt-2">ID: UISU_2024_001</div>
                        </div>
                    </div>
                </RegistryItem>
            </div>

            {/* 11. TABLES & LEDGERS */}
            <SectionHeader id="cat-11" icon={ListFilter} title="11. Tables & Ledger Matrix" subtitle="Administrative density structures." />
            <RegistryItem title="Ledger Row Archetype" code="<div className='grid grid-cols-12 px-8 py-4 bg-white border-b items-center'>...</div>">
                <div className="w-full grid grid-cols-12 gap-4 px-8 py-4 bg-white border border-slate-200 items-center hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="col-span-1 text-[10px] font-mono text-slate-300">#048</div>
                    <div className="col-span-8 font-serif text-lg text-ui-blue group-hover:text-nobel-gold transition-colors">Constitutional_Amendment_V1_Final.pdf</div>
                    <div className="col-span-3 text-right"><span className="px-2 py-1 bg-green-50 text-green-600 border border-green-200 text-[8px] font-bold uppercase tracking-widest">Verified</span></div>
                </div>
            </RegistryItem>

            {/* 12. SYSTEM FEEDBACK */}
            <SectionHeader id="cat-12" icon={Clock} title="12. System Feedback" subtitle="Visual signals for system states." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Skeleton Media" code="<div className='aspect-video bg-slate-100 animate-pulse'></div>">
                    <div className="w-full aspect-video bg-slate-100 animate-pulse flex items-center justify-center">
                        <ImageIcon className="text-slate-200" size={40} />
                    </div>
                </RegistryItem>
                <RegistryItem title="System Toast" code="<div className='bg-slate-900 text-white p-4 shadow-2xl border-l-4 border-nobel-gold'>...</div>">
                    <div className="bg-slate-900 text-white p-4 shadow-2xl border-l-4 border-nobel-gold flex items-center gap-4 w-full">
                        <CheckCircle2 className="text-green-500" size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Protocol_Synchronized</span>
                    </div>
                </RegistryItem>
            </div>

            {/* 13. ACTIVITY LOADERS */}
            <SectionHeader id="cat-13" icon={RotateCcw} title="13. Activity Loaders" subtitle="Indication of temporal system processing." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Branded Spinner" code="<motion.div animate={{rotate:360}}><Star /></motion.div>">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="text-nobel-gold">
                        <Star size={48} />
                    </motion.div>
                </RegistryItem>
                <RegistryItem title="Processing Strip" code="<div className='h-1 bg-ui-blue relative overflow-hidden'><motion.div /></div>">
                    <div className="w-full h-1 bg-slate-100 overflow-hidden relative">
                        <motion.div 
                            initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-y-0 w-1/3 bg-ui-blue"
                        />
                    </div>
                </RegistryItem>
            </div>

            {/* 14. AUDIO & ORAL HISTORY */}
            <SectionHeader id="cat-14" icon={Mic} title="14. Oral History Artifacts" subtitle="Players for recorded testimony." />
            <RegistryItem title="Audio Archive Player" code="<div className='flex items-center gap-6 bg-slate-900 text-white p-6 border-l-4 border-nobel-gold'>...</div>">
                <div className="w-full flex items-center gap-8 bg-slate-900 text-white p-6 border-l-4 border-nobel-gold shadow-2xl">
                    <div className="w-12 h-12 bg-white/10 flex items-center justify-center cursor-pointer hover:bg-nobel-gold hover:text-ui-blue transition-colors">
                        <Play size={24} fill="currentColor"/>
                    </div>
                    <div className="flex-1">
                        <div className="text-[8px] font-bold text-nobel-gold uppercase tracking-[0.4em] mb-1">RECORD_#1971_ADEPEJU</div>
                        <div className="font-serif text-xl">Oral Testimony: Feb Protest</div>
                        <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden"><div className="w-1/3 h-full bg-nobel-gold"></div></div>
                    </div>
                </div>
            </RegistryItem>

            {/* 15. DECORATIVE TEXTURES */}
            <SectionHeader id="cat-15" icon={Sparkles} title="15. Decorative Textures" subtitle="Atmospheric treatments for layering." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Archival Grain" code="<div className='bg-slate-900'><div className='opacity-10 bg-noise'></div></div>">
                    <div className="w-full h-40 bg-slate-900 relative overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-[1em]">Grain Pattern</span>
                    </div>
                </RegistryItem>
                <RegistryItem title="Branded Mesh" code="<div className='bg-ui-blue'><div className='opacity-20 bg-gradient'></div></div>">
                    <div className="w-full h-40 bg-ui-blue relative overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-nobel-gold/20 to-transparent"></div>
                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-[1em]">Mesh Canvas</span>
                    </div>
                </RegistryItem>
            </div>

            {/* 16. ATMOSPHERIC SURFACES */}
            <SectionHeader id="cat-16" icon={Layers} title="16. Atmospheric Surfaces" subtitle="Standard treatments for background depth." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Glass Registry Overlay" code="<div className='backdrop-blur-xl bg-white/40 border border-white shadow-xl'>...</div>">
                    <div className="w-full h-40 bg-slate-100 relative p-6 flex items-center justify-center overflow-hidden shadow-inner">
                        <div className="absolute top-0 left-0 w-full h-1 bg-nobel-gold"></div>
                        <div className="w-full h-full bg-white/40 backdrop-blur-xl border border-white shadow-xl flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-ui-blue">Glass Surface</div>
                    </div>
                </RegistryItem>
                <RegistryItem title="System Scanline" code="<div className='bg-ui-blue relative'><div className='bg-scanline opacity-10'></div></div>">
                    <div className="w-full h-40 bg-ui-blue relative overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-[1em]">Scanline FX</span>
                    </div>
                </RegistryItem>
            </div>

            {/* 17. OVERLAY PROTOCOLS */}
            <SectionHeader id="cat-17" icon={Monitor} title="17. Overlay Protocols" subtitle="Standard focus and context layers." />
            <RegistryItem title="System Dispatch Modal" code="<div className='bg-white shadow-2xl p-12 max-w-md border border-slate-200'>...</div>">
                <div className="bg-white border border-slate-200 shadow-2xl p-12 flex flex-col items-center text-center max-w-sm">
                    <ShieldAlert className="text-red-500 mb-6" size={48} />
                    <h4 className="font-serif text-2xl text-ui-blue mb-4 leading-tight">Identity Verification Required</h4>
                    <p className="text-xs text-slate-500 mb-8 font-light">Confirm biometric authorization before accessing restricted archives.</p>
                    <button className="w-full py-4 bg-ui-blue text-white text-[10px] font-bold uppercase tracking-widest">Verify_Identity</button>
                </div>
            </RegistryItem>

            {/* 18. TABS & CONTROL STACKS */}
            <SectionHeader id="cat-18" icon={Sliders} title="18. Tab & Control Stacks" subtitle="Standardized state toggles." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Segmented Tab Row" code="<div className='flex border border-slate-200 w-full'><div className='flex-1 bg-ui-blue text-white'>...</div></div>">
                    <div className="flex border border-slate-200 w-full"><div className="flex-1 text-center py-3 bg-ui-blue text-white text-[10px] font-bold uppercase tracking-widest">EXECUTIVE</div><div className="flex-1 text-center py-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-l border-slate-200">LEGISLATIVE</div></div>
                </RegistryItem>
                <RegistryItem title="Active Pill Control" code="<div className='flex gap-2'><div className='px-4 py-1 bg-nobel-gold rounded-full'>...</div></div>">
                    <div className="flex gap-3">
                        <span className="px-4 py-2 bg-ui-blue text-white text-[9px] font-bold uppercase tracking-widest">Active</span>
                        <span className="px-4 py-2 bg-slate-100 text-slate-400 text-[9px] font-bold uppercase tracking-widest">Pending</span>
                    </div>
                </RegistryItem>
            </div>

            {/* 19. BADGE & MEDAL SYSTEMS */}
            <SectionHeader id="cat-19" icon={Award} title="19. Badge & Medal Systems" subtitle="Merit indicators for personnel records." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RegistryItem title="Gold Merit Star" code="<div className='p-2 bg-ui-blue text-nobel-gold shadow-lg'><Star /></div>">
                    <div className="p-3 bg-ui-blue text-nobel-gold shadow-xl shadow-ui-blue/20"><Star size={24} fill="currentColor"/></div>
                </RegistryItem>
                <RegistryItem title="Merit Level Plate" code="<div className='px-3 py-1 bg-red-950 text-red-500 border border-red-500/30 text-[8px] font-bold'>...</div>">
                    <div className="px-4 py-1 bg-red-950 text-red-500 border border-red-500/30 text-[8px] font-bold uppercase tracking-[0.4em] text-center shadow-lg">LEVEL 5 ACCESS</div>
                </RegistryItem>
                <RegistryItem title="Signature Hologram" code="<div className='font-serif italic text-ui-blue border-b border-slate-200'>...</div>">
                    <div className="font-serif italic text-2xl text-ui-blue border-b-2 border-slate-200 pb-2">Wole Soyinka</div>
                </RegistryItem>
            </div>

            {/* 20. TOOLTIP & INFO SLATES */}
            <SectionHeader id="cat-20" icon={Info} title="20. Tooltip & Info Slates" subtitle="Contextual data layers." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Context Tooltip" code="<div className='bg-slate-900 text-white px-3 py-2 text-[8px] font-mono'>...</div>">
                    <div className="bg-slate-900 text-white px-4 py-2 text-[8px] font-mono whitespace-nowrap border border-white/10 shadow-2xl relative">
                        RECORD_ID: ARCH_048_VERIFIED
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-slate-900"></div>
                    </div>
                </RegistryItem>
                <RegistryItem title="Status Information Slate" code="<div className='p-4 bg-blue-50 text-blue-800 border border-blue-100 flex gap-3'>...</div>">
                    <div className="p-6 bg-blue-50 text-blue-800 border border-blue-100 flex items-center gap-4 w-full">
                        <Info size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Protocol currently in read-only mode</span>
                    </div>
                </RegistryItem>
            </div>

            {/* 21. HEADER BRANDING */}
            <SectionHeader id="cat-21" icon={Star} title="21. Header Branding Patterns" subtitle="Top-tier UI framing." />
            <RegistryItem title="Global Navigation Strip" code="<div className='bg-ui-blue text-white p-4 flex justify-between shadow-2xl'>...</div>">
                <div className="w-full bg-ui-blue text-white p-4 flex justify-between items-center shadow-2xl border border-white/10">
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-nobel-gold text-ui-blue flex items-center justify-center font-serif font-bold italic">U</div><span className="font-serif font-bold tracking-tighter">UISU Archive</span></div>
                    <div className="flex gap-4 items-center"><div className="w-8 h-8 border border-white/20 flex items-center justify-center text-nobel-gold"><Bell size={14}/></div><div className="w-8 h-8 bg-white/10 flex items-center justify-center"><Menu size={14}/></div></div>
                </div>
            </RegistryItem>

            {/* 22. GLOBAL LAYOUT DIVIDERS */}
            <SectionHeader id="cat-22" icon={Ruler} title="22. Global Layout Dividers" subtitle="Spatial separation rules." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RegistryItem title="Gold Accent Separator" code="<div className='w-12 h-1 bg-nobel-gold mb-8'></div>">
                    <div className="w-24 h-1 bg-nobel-gold shadow-lg shadow-nobel-gold/20"></div>
                </RegistryItem>
                <RegistryItem title="Technical Record Splitter" code="<div className='w-full h-px bg-slate-200 relative'><div className='bg-slate-200 px-2'>...</div></div>">
                    <div className="w-full h-px bg-slate-200 relative flex items-center justify-center"><span className="bg-slate-50 px-4 text-[8px] font-mono text-slate-300">END_OF_RECORD</span></div>
                </RegistryItem>
            </div>

            {/* 23. SOCIAL MATRICES */}
            <SectionHeader id="cat-23" icon={Share2} title="23. Social Comms Matrix" subtitle="Outbound connectivity patterns." />
            <RegistryItem title="Channel Action Strip" code="<div className='flex gap-4 p-4 border border-slate-200'><Mail /><Twitter />...</div>">
                <div className="flex gap-6 p-4 bg-white border border-slate-200 shadow-sm">
                    <Mail size={20} className="text-slate-300 hover:text-ui-blue cursor-pointer" />
                    <Twitter size={20} className="text-slate-300 hover:text-ui-blue cursor-pointer" />
                    <Linkedin size={20} className="text-slate-300 hover:text-ui-blue cursor-pointer" />
                    <div className="h-6 w-px bg-slate-100"></div>
                    <Share2 size={20} className="text-nobel-gold cursor-pointer" />
                </div>
            </RegistryItem>

            {/* 24. ALUTA TRIBUTES */}
            <SectionHeader id="cat-24" icon={Flag} title="24. Aluta Tributes" subtitle="Historical martyr artifacts." />
            <RegistryItem title="Martyr Tribute Block" code="<div className='bg-slate-900 text-white border-l-8 border-red-600 p-12 shadow-2xl'>...</div>">
                <div className="bg-slate-900 text-white border border-white/10 border-l-8 border-red-600 p-12 w-full shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    <div className="text-[10px] font-bold text-red-600 uppercase tracking-[0.4em] mb-6">Never Forgotten</div>
                    <h4 className="font-serif text-5xl mb-4 leading-none">Kunle Adepeju</h4>
                    <p className="text-slate-400 font-serif italic text-xl">"His sacrifice fueled the fire of student consciousness forever."</p>
                    <Flag className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
                </div>
            </RegistryItem>

            {/* Global Registry Footer */}
            <div className="mt-60 text-center pb-40 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-slate-200"></div>
                <Star size={40} className="mx-auto text-nobel-gold/10 mb-8 mt-20" />
                <p className="text-[10px] font-bold uppercase tracking-[1.5em] text-slate-300">Intellectualism & Welfare Protocol • v2.0.24</p>
                <div className="mt-8 flex justify-center gap-8 text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>EST: 1948</span>
                    <span>LOC: IBADAN, NG</span>
                    <span>SYS: ARCHIVE_LIVE</span>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

const ColorBox = ({ name, hex, usage }: { name: string, hex: string, usage: string }) => (
    <div className="bg-white border border-slate-200 p-6 flex flex-col gap-6 shadow-sm group">
        <div className="w-full h-40 border border-slate-100 group-hover:scale-[1.02] transition-transform duration-500 shadow-inner" style={{ backgroundColor: hex }} />
        <div>
            <span className="font-serif text-2xl text-ui-blue block mb-2">{name}</span>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-6">{usage}</p>
            <div className="bg-slate-900 p-3 flex justify-between items-center text-[10px] font-mono text-nobel-gold shadow-lg">
                <span>{hex}</span>
                <Clipboard size={12} className="cursor-pointer hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(hex)} />
            </div>
        </div>
    </div>
);

// Fallback icons if any missing from previous prompt
const Twitter = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
