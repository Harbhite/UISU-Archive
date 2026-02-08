
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Verified Vercel Deployment Fix
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calculator, Clock, CheckSquare, FileText, 
  Ruler, Globe, Activity, Hash, RefreshCcw, User, 
  Calendar, QrCode, Wand2, Type, Database, Timer, 
  Book, PieChart, Volume2, Save, Trash2, Plus, Minus,
  AlertCircle, Star, Search, Check, X, SortAsc, AlignLeft,
  Settings, Zap, Code, ShieldCheck, Target, Music, Layout, PenTool,
  Quote, Headphones, CreditCard, BarChart3, Award, Layers, Copy, Download, ExternalLink, Play, Square,
  MapPin, ClipboardCheck, GraduationCap, Bus, Wallet, Info, Sparkles,
  ArrowRight, Filter, SortDesc, MousePointer2
} from 'lucide-react';

// Using local Editor.js packages
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import QuoteBlock from '@editorjs/quote';

interface ToolProps {
  onBack: () => void;
}

interface ToolDefinition {
  id: string;
  name: string;
  category: 'Academic' | 'Utility' | 'Health' | 'Logistics' | 'Research';
  icon: any;
  description: string;
  color: string;
  size?: 'small' | 'medium' | 'large' | 'tall' | 'wide';
}

const toolsList: ToolDefinition[] = [
  { id: 'gpa', name: 'GPA Calculator', category: 'Academic', icon: Calculator, description: 'Semester GPA Indexer.', color: 'bg-blue-600', size: 'large' },
  { id: 'notes', name: 'Aluta Writer', category: 'Research', icon: FileText, description: 'Scholarly block engine.', color: 'bg-amber-600', size: 'tall' },
  { id: 'pomodoro', name: 'Pomodoro Timer', category: 'Utility', icon: Clock, description: 'Concentration cycles.', color: 'bg-red-600', size: 'medium' },
  { id: 'timetable', name: 'Class Timetable', category: 'Academic', icon: Layout, description: 'Temporal schedule matrix.', color: 'bg-orange-500', size: 'wide' },
  { id: 'todo', name: 'Exam To-Do', category: 'Utility', icon: CheckSquare, description: 'Task fulfillment ledger.', color: 'bg-indigo-600', size: 'medium' },
  { id: 'dictionary', name: 'Mini Dictionary', category: 'Research', icon: Book, description: 'UI lexicon lookup.', color: 'bg-stone-600', size: 'medium' },
  { id: 'cgpa', name: 'CGPA Forecaster', category: 'Academic', icon: PieChart, description: 'Trajectory projection.', color: 'bg-emerald-600', size: 'small' },
  { id: 'converter', name: 'Unit Converter', category: 'Utility', icon: Ruler, description: 'Metric transformation.', color: 'bg-slate-600', size: 'small' },
  { id: 'calculator', name: 'Sci-Calculator', category: 'Utility', icon: Hash, description: 'Binary logic module.', color: 'bg-zinc-800', size: 'small' },
  { id: 'wordcount', name: 'Word Counter', category: 'Research', icon: Type, description: 'Lexical stats.', color: 'bg-teal-600', size: 'small' },
  { id: 'bmi', name: 'Health (BMI)', category: 'Health', icon: Activity, description: 'Physiological index.', color: 'bg-rose-600', size: 'small' },
  { id: 'age', name: 'Age Calculator', category: 'Utility', icon: Calendar, description: 'Cycle breakdown.', color: 'bg-orange-600', size: 'small' },
  { id: 'idcard', name: 'Mock ID Maker', category: 'Logistics', icon: User, description: 'Identity simulation.', color: 'bg-sky-700', size: 'small' },
  { id: 'qr', name: 'QR Generator', category: 'Utility', icon: QrCode, description: 'Custom encryption.', color: 'bg-purple-600', size: 'small' },
  { id: 'picker', name: 'Random Picker', category: 'Utility', icon: Wand2, description: 'Selection algorithm.', color: 'bg-fuchsia-600', size: 'small' },
  { id: 'timer', name: 'Stopwatch', category: 'Utility', icon: Timer, description: 'Precision capture.', color: 'bg-cyan-600', size: 'small' },
  { id: 'budget', name: 'Pocket Budget', category: 'Utility', icon: Database, description: 'Fiscal management.', color: 'bg-lime-700', size: 'small' },
  { id: 'markdown', name: 'MD Previewer', category: 'Research', icon: FileText, description: 'Code serialization.', color: 'bg-neutral-700', size: 'small' },
  { id: 'tts', name: 'Text-to-Speech', category: 'Utility', icon: Volume2, description: 'Audio synthesis.', color: 'bg-pink-600', size: 'small' },
  { id: 'percentage', name: 'Perc. Calculator', category: 'Utility', icon: Hash, description: 'Ratio shortcuts.', color: 'bg-violet-600', size: 'small' },
  { id: 'countdown', name: 'Exam Countdown', category: 'Academic', icon: Calendar, description: 'Temporal proximity.', color: 'bg-red-700', size: 'small' },
  { id: 'caseconvert', name: 'Case Converter', category: 'Research', icon: Type, description: 'Text normalization.', color: 'bg-indigo-400', size: 'small' },
  { id: 'listsorter', name: 'List Sorter', category: 'Utility', icon: SortAsc, description: 'Array organization.', color: 'bg-emerald-400', size: 'small' },
  { id: 'lorem', name: 'Lorem Ipsum', category: 'Research', icon: AlignLeft, description: 'Buffer text synth.', color: 'bg-slate-400', size: 'small' },
  { id: 'habit', name: 'Habit Tracker', category: 'Utility', icon: Zap, description: 'Behavior ledger.', color: 'bg-yellow-600', size: 'small' },
  { id: 'base64', name: 'Base64 Tool', category: 'Utility', icon: Code, description: 'Encoding logic.', color: 'bg-cyan-800', size: 'small' },
  { id: 'symbols', name: 'Symbol Map', category: 'Research', icon: Star, description: 'Math notation.', color: 'bg-rose-400', size: 'small' },
  { id: 'gradeneed', name: 'Exam Target', category: 'Academic', icon: Target, description: 'Score goal module.', color: 'bg-red-500', size: 'small' },
  { id: 'metronome', name: 'Metronome', category: 'Utility', icon: Music, description: 'Rhythm oscillator.', color: 'bg-sky-500', size: 'small' },
  { id: 'whiteboard', name: 'Quick Sketch', category: 'Research', icon: PenTool, description: 'Visual drafts.', color: 'bg-teal-500', size: 'small' },
  { id: 'cite_gen', name: 'Quick Citer', category: 'Research', icon: Quote, description: 'Scholarly citations.', color: 'bg-slate-800', size: 'small' },
  { id: 'focus_audio', name: 'Focus Sounds', category: 'Utility', icon: Headphones, description: 'Ambient loops.', color: 'bg-indigo-900', size: 'small' },
  { id: 'flashcards', name: 'Flashcards', category: 'Academic', icon: Layers, description: 'Recall training.', color: 'bg-yellow-700', size: 'small' },
  { id: 'dues_tracker', name: 'Fees Tracker', category: 'Logistics', icon: CreditCard, description: 'Financial log.', color: 'bg-emerald-800', size: 'small' },
  { id: 'gpa_planner', name: 'GPA Planner', category: 'Academic', icon: Target, description: 'Index prediction.', color: 'bg-blue-800', size: 'small' },
  { id: 'grade_dist', name: 'Grade Stats', category: 'Academic', icon: BarChart3, description: 'Session analysis.', color: 'bg-violet-800', size: 'small' },
  { id: 'scholarships', name: 'Scholarship Log', category: 'Logistics', icon: Award, description: 'Grant portfolio.', color: 'bg-nobel-gold', size: 'small' },
  { id: 'seat_finder', name: 'Seat Locator', category: 'Logistics', icon: MapPin, description: 'Spatial search.', color: 'bg-zinc-700', size: 'small' },
  { id: 'reg_check', name: 'Reg Checklist', category: 'Logistics', icon: ClipboardCheck, description: 'Status buffer.', color: 'bg-blue-800', size: 'small' },
  { id: 'class_calc', name: 'Degree Class', category: 'Academic', icon: GraduationCap, description: 'Honors checker.', color: 'bg-indigo-900', size: 'small' },
  { id: 'shuttle', name: 'Shuttle Guide', category: 'Logistics', icon: Bus, description: 'Logistics guide.', color: 'bg-green-700', size: 'small' },
  { id: 'loan_calc', name: 'Fin-Aid Calc', category: 'Logistics', icon: Wallet, description: 'Amortization calc.', color: 'bg-emerald-900', size: 'small' },
  { id: 'dept_dir', name: 'Dept Directory', category: 'Logistics', icon: Info, description: 'Institutional links.', color: 'bg-slate-800', size: 'small' },
  { id: 'stress_tips', name: 'Stress Relief', category: 'Health', icon: Sparkles, description: 'Cortisol mitigation.', color: 'bg-rose-500', size: 'small' },
];

export const ToolsPage: React.FC<ToolProps> = ({ onBack }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('All');
  const [sortDir, setSortDir] = useState<'ASC' | 'DESC'>('ASC');

  const categories = ['All', 'Academic', 'Utility', 'Health', 'Logistics', 'Research'];

  const filteredTools = toolsList
    .filter(t => (filterCat === 'All' || t.category === filterCat) && t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
        if (sortDir === 'ASC') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
    });

  const getGridSpan = (size: string) => {
    switch (size) {
      case 'large': return 'md:col-span-6 md:row-span-2';
      case 'medium': return 'md:col-span-3 md:row-span-1';
      case 'tall': return 'md:col-span-3 md:row-span-2';
      case 'wide': return 'md:col-span-6 md:row-span-1';
      default: return 'md:col-span-3 md:row-span-1';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <button 
                onClick={activeTool ? () => setActiveTool(null) : onBack}
                className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"
            >
                <div className="p-2 rounded-none border border-slate-300 group-hover:border-nobel-gold transition-colors">
                    <ArrowLeft size={14} />
                </div>
                <span>{activeTool ? 'Return to Matrix' : 'Back to Home'}</span>
            </button>
            
            {!activeTool && (
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                    <Star size={12} fill="currentColor" /> SYSTEM STATUS: OPERATIONAL
                </div>
            )}
        </div>

        <AnimatePresence mode="wait">
          {!activeTool ? (
            <motion.div 
              key="hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-serif text-ui-blue mb-4 leading-none">Uite <span className="italic text-slate-300">Matrix</span></h1>
                <p className="text-lg text-slate-600 font-light max-w-2xl leading-relaxed mb-12">Functional student modules integrated into a high-performance grid system.</p>
                
                {/* Hub Controls */}
                <div className="bg-white border border-slate-200 p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-6 md:items-center shadow-sm">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input 
                            type="text" 
                            placeholder="Find Module..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-none text-sm outline-none focus:border-nobel-gold transition-colors"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter size={12} className="text-slate-300" />
                            <select 
                                value={filterCat}
                                onChange={(e) => setFilterCat(e.target.value)}
                                className="bg-slate-50 border border-slate-100 p-2 text-[10px] font-bold uppercase tracking-widest outline-none"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <button 
                            onClick={() => setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')}
                            className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                        >
                            {sortDir === 'ASC' ? <SortAsc size={14} /> : <SortDesc size={14} />}
                            <span className="text-[10px] font-bold uppercase tracking-widest">{sortDir === 'ASC' ? 'A-Z' : 'Z-A'}</span>
                        </button>
                    </div>
                </div>
              </div>

              {/* Bento Grid / Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[220px] gap-4">
                {filteredTools.map((tool) => (
                  <motion.div 
                    key={tool.id}
                    layoutId={tool.id}
                    whileHover={{ y: -4, scale: 0.99 }}
                    onClick={() => setActiveTool(tool.id)}
                    className={`bg-white border border-slate-200 hover:border-nobel-gold p-8 cursor-pointer group flex flex-col justify-between ${getGridSpan(tool.size || 'small')} shadow-sm transition-all duration-300 rounded-none relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-nobel-gold/5 transition-colors pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <div className={`w-12 h-12 ${tool.color} text-white flex items-center justify-center mb-6 shadow-xl border border-white/20`}>
                        <tool.icon size={24} />
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-nobel-gold mb-2">{tool.category}</div>
                      <h3 className="text-2xl font-serif text-ui-blue mb-2 leading-tight">{tool.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-2">{tool.description}</p>
                    </div>
                    
                    <div className="relative z-10 mt-auto flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-ui-blue/30 group-hover:text-nobel-gold transition-colors">
                      Execute <MousePointer2 size={10} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="tool-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white border border-slate-200 shadow-2xl overflow-hidden min-h-[700px] rounded-none relative"
            >
                {/* Detailed Tool Shell */}
                <div className="absolute top-0 right-0 p-8 flex items-center gap-4 pointer-events-none opacity-20">
                     <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Module ID: {activeTool.toUpperCase()}</div>
                     <Star size={16} fill="currentColor" className="text-nobel-gold" />
                </div>
                
                <div className="p-4 md:p-12 w-full overflow-x-hidden min-h-screen">
                    {renderTool(activeTool)}
                </div>
                
                <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">System Record Localized</span>
                    <button onClick={() => setActiveTool(null)} className="text-[9px] font-bold uppercase tracking-widest text-ui-blue hover:text-nobel-gold flex items-center gap-2">Terminating Session <X size={10}/></button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- TOOL RENDERER LOGIC ---

const renderTool = (id: string) => {
  switch (id) {
    case 'gpa': return <GPACalculator />;
    case 'notes': return <NotesApp />;
    case 'pomodoro': return <PomodoroTimer />;
    case 'todo': return <ToDoList />;
    case 'wordcount': return <WordCounter />;
    case 'bmi': return <BMICalculator />;
    case 'idcard': return <IDCardGenerator />;
    case 'qr': return <QRGenerator />;
    case 'picker': return <RandomPicker />;
    case 'age': return <AgeCalculator />;
    case 'percentage': return <PercentageCalc />;
    case 'countdown': return <ExamCountdown />;
    case 'timer': return <Stopwatch />;
    case 'budget': return <BudgetTracker />;
    case 'converter': return <UnitConverter />;
    case 'calculator': return <SciCalc />;
    case 'dictionary': return <MiniDictionary />;
    case 'markdown': return <MarkdownPreview />;
    case 'tts': return <TTSApp />;
    case 'cgpa': return <CGPAForecaster />;
    case 'caseconvert': return <CaseConverter />;
    case 'listsorter': return <ListSorter />;
    case 'lorem': return <LoremIpsumGen />;
    case 'habit': return <HabitTracker />;
    case 'base64': return <Base64Tool />;
    case 'symbols': return <SymbolMap />;
    case 'timetable': return <ClassTimetable />;
    case 'gradeneed': return <GradeNeededCalc />;
    case 'metronome': return <StudyMetronome />;
    case 'whiteboard': return <Whiteboard />;
    case 'cite_gen': return <CiterGen />;
    case 'focus_audio': return <FocusAudio />;
    case 'flashcards': return <FlashcardsTool />;
    case 'dues_tracker': return <DuesTracker />;
    case 'gpa_planner': return <GPAPlanner />;
    case 'grade_dist': return <GradeDistribution />;
    case 'scholarships': return <ScholarshipTracker />;
    case 'seat_finder': return <ExamSeatFinder />;
    case 'reg_check': return <RegChecklist />;
    case 'class_calc': return <DegreeClassCalc />;
    case 'shuttle': return <ShuttleGuide />;
    case 'loan_calc': return <LoanCalc />;
    case 'dept_dir': return <DeptDirectory />;
    case 'stress_tips': return <StressReliefTips />;
    default: return <div className="p-12 text-center text-slate-400 font-serif uppercase tracking-widest text-xs">Module In Maintenance</div>;
  }
};

// --- PERSISTENT TOOL COMPONENTS ---

const GPACalculator = () => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('matrix_gpa_courses');
    return saved ? JSON.parse(saved) : [{ name: '', units: 3, grade: 'A' }];
  });

  useEffect(() => {
    localStorage.setItem('matrix_gpa_courses', JSON.stringify(courses));
  }, [courses]);

  const getPoints = (grade: string) => {
    const map5: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };
    return map5[grade] || 0;
  };

  const totalUnits = courses.reduce((acc: any, c: any) => acc + Number(c.units), 0);
  const totalPoints = courses.reduce((acc: any, c: any) => acc + (getPoints(c.grade) * Number(c.units)), 0);
  const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';

  const updateRow = (i: number, field: string, val: any) => {
    const next = [...courses];
    (next[i] as any)[field] = val;
    setCourses(next);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-serif text-ui-blue mb-12">Grade Indexer</h2>
      <div className="space-y-4 mb-12">
        {courses.map((c: any, i: number) => (
          <div key={i} className="flex flex-col sm:flex-row gap-px bg-slate-200 border border-slate-200 shadow-sm">
            <input placeholder="Course (e.g. CLA 101)" className="w-full sm:flex-1 p-4 bg-white focus:bg-slate-50 outline-none text-xs font-bold uppercase tracking-widest" value={c.name} onChange={e => updateRow(i, 'name', e.target.value)} />
            <input type="number" placeholder="Units" className="w-full sm:w-24 p-4 bg-white text-xs text-center border-l border-slate-100" value={c.units} onChange={e => updateRow(i, 'units', e.target.value)} />
            <select className="w-full sm:w-24 p-4 bg-white text-xs font-bold uppercase tracking-widest border-l border-slate-100" value={c.grade} onChange={e => updateRow(i, 'grade', e.target.value)}>
                {['A', 'B', 'C', 'D', 'E', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <button onClick={() => setCourses(courses.filter((_: any, idx: number) => idx !== i))} className="p-4 bg-white text-slate-300 hover:text-red-500 transition-colors border-l border-slate-100"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 mb-16">
        <button onClick={() => setCourses([...courses, { name: '', units: 3, grade: 'A' }])} className="flex items-center gap-2 text-ui-blue font-bold text-[10px] uppercase tracking-[0.2em] border-b-2 border-ui-blue pb-1"><Plus size={14}/> Append Registry</button>
        <button onClick={() => { setCourses([{ name: '', units: 3, grade: 'A' }]); localStorage.removeItem('matrix_gpa_courses'); }} className="flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] border-b-2 border-red-500 pb-1"><RefreshCcw size={14}/> Clear Session</button>
      </div>
      <div className="p-16 bg-ui-blue text-white flex flex-col md:flex-row justify-between items-center gap-12 border-l-8 border-nobel-gold">
        <div>
            <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4 font-bold">Consolidated Index</div>
            <div className="text-9xl font-serif leading-none">{gpa}</div>
        </div>
        <div className="text-right space-y-6">
             <div><div className="text-[9px] uppercase tracking-widest opacity-30">Total Units</div><div className="text-3xl font-serif text-nobel-gold">{totalUnits}</div></div>
             <div className="h-px bg-white/10"></div>
             <div><div className="text-[9px] uppercase tracking-widest opacity-30">Weighted Score</div><div className="text-3xl font-serif text-nobel-gold">{totalPoints}</div></div>
        </div>
      </div>
    </div>
  );
};

const ToDoList = () => {
  const [tasks, setTasks] = useState<{id: number, text: string, done: boolean}[]>(() => {
      const saved = localStorage.getItem('matrix_tasks');
      return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => localStorage.setItem('matrix_tasks', JSON.stringify(tasks)), [tasks]);

  const addTask = () => { if (!input.trim()) return; setTasks([...tasks, { id: Date.now(), text: input, done: false }]); setInput(""); };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-4xl font-serif text-ui-blue mb-12">Task Ledger</h2>
      <div className="flex gap-px bg-slate-200 border border-slate-200 mb-12 shadow-md">
        <input className="flex-1 p-6 bg-white outline-none focus:bg-slate-50 font-serif text-lg" placeholder="Log intent..." value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && addTask()} />
        <button onClick={addTask} className="bg-ui-blue text-white px-10 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-nobel-gold transition-colors">Record</button>
      </div>
      <div className="space-y-px bg-slate-100 border border-slate-100">
        {tasks.map(t => (
          <div key={t.id} className={`flex items-center gap-6 p-6 bg-white group transition-all ${t.done ? 'opacity-30' : ''}`}>
            <button onClick={() => setTasks(tasks.map(task => task.id === t.id ? {...task, done: !task.done} : task))} className={`w-8 h-8 border-2 flex items-center justify-center transition-colors ${t.done ? 'bg-green-600 border-green-600 text-white' : 'border-slate-100 hover:border-ui-blue'}`}>
              {t.done && <Check size={16}/>}
            </button>
            <span className={`flex-1 font-serif text-xl ${t.done ? 'line-through' : 'text-ui-blue'}`}>{t.text}</span>
            <button onClick={() => setTasks(tasks.filter(task => task.id !== t.id))} className="text-slate-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><X size={20}/></button>
          </div>
        ))}
        {tasks.length === 0 && <div className="p-16 text-center text-slate-300 font-serif italic text-xl">Ledger is currently empty.</div>}
      </div>
    </div>
  );
};

const BudgetTracker = () => {
  const [items, setItems] = useState<{id: number, desc: string, amt: number}[]>(() => {
      const saved = localStorage.getItem('matrix_budget');
      return saved ? JSON.parse(saved) : [];
  });
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");

  useEffect(() => localStorage.setItem('matrix_budget', JSON.stringify(items)), [items]);

  const total = items.reduce((acc, i) => acc + i.amt, 0);
  const add = () => { if (!desc || !amt) return; setItems([...items, { id: Date.now(), desc, amt: Number(amt) }]); setDesc(""); setAmt(""); };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-4xl font-serif text-ui-blue mb-12">Asset Amortization</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 border border-slate-200 mb-12 shadow-sm">
        <input className="sm:col-span-2 p-6 bg-white outline-none focus:bg-slate-50 text-sm font-bold uppercase tracking-widest" placeholder="Allocation Label" value={desc} onChange={e => setDesc(e.target.value)} />
        <div className="flex">
            <input type="number" className="flex-1 p-6 bg-white outline-none border-l border-slate-50 text-sm" placeholder="Value (₦)" value={amt} onChange={e => setAmt(e.target.value)} />
            <button onClick={add} className="bg-ui-blue text-white px-8 font-bold uppercase text-[10px] tracking-widest hover:bg-nobel-gold transition-colors border-l border-slate-100">Log</button>
        </div>
      </div>
      <div className="space-y-px bg-slate-100 border border-slate-100 mb-12 max-h-96 overflow-y-auto">
        {items.map(i => (
            <div key={i.id} className="flex justify-between p-6 bg-white group">
                <span className="font-serif text-lg text-ui-blue">{i.desc}</span>
                <div className="flex items-center gap-6">
                    <span className="font-serif font-bold text-xl text-nobel-gold">₦{i.amt.toLocaleString()}</span>
                    <button onClick={() => setItems(items.filter(item => item.id !== i.id))} className="text-slate-100 hover:text-red-500 transition-colors"><X size={16} /></button>
                </div>
            </div>
        ))}
      </div>
      <div className="p-16 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-center border-l-8 border-nobel-gold shadow-2xl">
          <div className="text-center sm:text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 mb-4">Consolidated Valuation</div>
              <div className="text-6xl font-serif tracking-tighter">₦{total.toLocaleString()}</div>
          </div>
          <button onClick={() => { setItems([]); localStorage.removeItem('matrix_budget'); }} className="mt-8 sm:mt-0 px-8 py-3 border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Wipe Balance</button>
      </div>
    </div>
  );
};

// --- THE REST OF THE TOOLS (Notes, Dictionary, etc) ---

const MiniDictionary = () => {
  const [q, setQ] = useState("");
  const dictionary: Record<string, string> = {
    'aluta': 'The struggle; continuous activism for rights.',
    'uite': 'A proud student of the University of Ibadan.',
    'tower': 'The historic Clock Tower, symbol of UI excellence.',
    'mellamby': 'The premier hall of residence, Kenneth Mellamby Hall.',
    'jambite': 'A newly admitted student (freshman).',
    'aro': 'Humorous public teasing or "roasting" common in Zik and Indy halls.',
    'sub': 'Students\' Union Building; the political and social hub.',
    'kdl': 'Kenneth Dike Library; the central academic heart.',
    'tech': 'Short for the Faculty of Technology.',
    'baluba': 'Refers to residents of Nnamdi Azikiwe (Zik) Hall.',
    'katangese': 'Refers to residents of Independence (Indy) Hall.',
    'amazons': 'Refers to residents of Queen Idia Hall.',
    'queens': 'Refers to residents of Queen Elizabeth II Hall.',
    'marathon': 'Intense studying sessions usually before exams.',
    'carryover': 'Failing a course and needing to retake it.',
    'gpa': 'Grade Point Average.',
    'cgpa': 'Cumulative Grade Point Average.',
    'tlds': 'The Literary and Debating Society.',
    'jaw war': 'The massive inter-hall/faculty debating competition.',
    'gyration': 'Energetic singing and dancing, often at social gatherings.',
  };

  const suggestions = Object.keys(dictionary).filter(k => 
    q.length > 0 && k.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto w-full">
      <h2 className="text-3xl font-serif text-ui-blue mb-8 leading-none">Uite Lexicon</h2>
      <div className="relative group mb-4">
        <input 
          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-none font-serif text-2xl outline-none focus:border-nobel-gold transition-all" 
          placeholder="Search buffer..." 
          value={q} 
          onChange={e => setQ(e.target.value)} 
        />
        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
      </div>
      
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {suggestions.map(s => (
            <button key={s} onClick={() => setQ(s)} className="px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-nobel-gold hover:text-white transition-all">
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-12 p-16 border-t-4 border-nobel-gold min-h-[200px] flex items-center justify-center bg-slate-900 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <AnimatePresence mode="wait">
          {dictionary[q.toLowerCase()] ? (
            <motion.div key={q} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center relative z-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-nobel-gold mb-6">Definitions Matrix</div>
              <div className="text-3xl font-serif leading-relaxed italic">"{dictionary[q.toLowerCase()]}"</div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 italic font-serif text-center relative z-10">
              {q ? "Entry not found in current sector." : "Initiate query to display results."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NotesApp = () => {
  const ejInstance = useRef<any>(null);
  const [status, setStatus] = useState("Ready");
  const [focusMode, setFocusMode] = useState(false);
  const [docTitle, setDocTitle] = useState(() => localStorage.getItem('uisu_note_title') || "Untitled Ledger");

  useEffect(() => {
    if (ejInstance.current) return;
    const savedData = JSON.parse(localStorage.getItem('uisu_editor_notes') || '{}');
    const editor = new EditorJS({
      holder: 'editorjs-container',
      tools: {
        header: { class: Header, inlineToolbar: ['link'], config: { placeholder: 'Heading...', levels: [1, 2, 3], defaultLevel: 2 } },
        list: { class: List, inlineToolbar: true },
        checklist: { class: Checklist, inlineToolbar: true },
        quote: { class: QuoteBlock, inlineToolbar: true, config: { quotePlaceholder: 'Reference...', captionPlaceholder: 'Giants' } }
      },
      onReady: () => { ejInstance.current = editor; },
      onChange: () => setStatus("Modified"),
      data: savedData,
      placeholder: 'Matrix Input Ready...',
    });
    return () => {
      if (ejInstance.current && typeof ejInstance.current.destroy === 'function') {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const saveNote = async () => {
    if (ejInstance.current) {
      const savedData = await ejInstance.current.save();
      localStorage.setItem('uisu_editor_notes', JSON.stringify(savedData));
      localStorage.setItem('uisu_note_title', docTitle);
      setStatus("Serialized");
      setTimeout(() => setStatus("Ready"), 2000);
    }
  };

  return (
    <div className={`max-w-5xl mx-auto transition-all duration-700 w-full ${focusMode ? 'px-0' : ''}`}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 p-8 border border-slate-100 bg-slate-50 ${focusMode ? 'opacity-0 h-0 overflow-hidden' : ''}`}>
        <div className="flex-1 w-full">
          <input 
            type="text" 
            className="w-full bg-transparent text-4xl font-serif text-ui-blue focus:outline-none border-b border-transparent focus:border-nobel-gold/30 pb-2"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
          />
          <div className="flex items-center gap-6 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">{status}</span>
            <button onClick={() => setFocusMode(!focusMode)} className="text-[10px] font-bold uppercase tracking-widest text-ui-blue/40 hover:text-ui-blue flex items-center gap-2">
              <Zap size={10} /> Focus Module
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-px bg-slate-200 p-px">
          <button onClick={saveNote} className="px-8 py-3 bg-ui-blue text-white font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-nobel-gold transition-colors">Serialize</button>
          <button onClick={() => ejInstance.current.clear()} className="px-8 py-3 bg-white text-red-600 font-bold uppercase text-[10px] tracking-widest hover:bg-red-50 transition-colors">Wipe Buffer</button>
        </div>
      </div>
      
      {focusMode && (
          <button onClick={() => setFocusMode(false)} className="fixed top-8 right-8 z-50 p-4 bg-white border border-slate-200 text-ui-blue hover:text-red-500 transition-colors">
              <X size={20} />
          </button>
      )}

      <div className="relative w-full shadow-2xl">
        <div 
          id="editorjs-container" 
          className="min-h-[800px] p-12 md:p-20 bg-white border border-slate-100 prose prose-slate max-w-none shadow-inner"
        ></div>
        <div className="absolute bottom-4 right-8 text-[8px] font-bold uppercase tracking-[0.5em] text-slate-200 pointer-events-none">Aluta Writer Matrix Engine v2.5</div>
      </div>
    </div>
  );
};

const CGPAForecaster = () => {
  const [currentCgpa, setCurrentCgpa] = useState(3.5);
  const [currentUnits, setCurrentUnits] = useState(60);
  const [plannedGpa, setPlannedGpa] = useState(4.0);
  const [plannedUnits, setPlannedUnits] = useState(20);

  const forecast = ((currentCgpa * currentUnits) + (plannedGpa * plannedUnits)) / (currentUnits + plannedUnits);

  return (
    <div className="max-w-2xl mx-auto w-full py-12">
      <h2 className="text-4xl font-serif text-ui-blue mb-12">Trajectory Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 mb-16 shadow-md">
          <div className="p-8 bg-white"><label className="text-[10px] uppercase font-bold text-slate-300 tracking-widest block mb-4">Base Index</label><input type="number" step="0.01" className="w-full text-4xl font-serif outline-none" value={currentCgpa} onChange={e => setCurrentCgpa(Number(e.target.value))} /></div>
          <div className="p-8 bg-white"><label className="text-[10px] uppercase font-bold text-slate-300 tracking-widest block mb-4">Total Weight</label><input type="number" className="w-full text-4xl font-serif outline-none" value={currentUnits} onChange={e => setCurrentUnits(Number(e.target.value))} /></div>
          <div className="p-8 bg-white"><label className="text-[10px] uppercase font-bold text-slate-300 tracking-widest block mb-4">Target Phase GPA</label><input type="number" step="0.01" className="w-full text-4xl font-serif outline-none" value={plannedGpa} onChange={e => setPlannedGpa(Number(e.target.value))} /></div>
          <div className="p-8 bg-white"><label className="text-[10px] uppercase font-bold text-slate-300 tracking-widest block mb-4">Phase Weight</label><input type="number" className="w-full text-4xl font-serif outline-none" value={plannedUnits} onChange={e => setPlannedUnits(Number(e.target.value))} /></div>
      </div>
      <div className="p-20 bg-emerald-900 text-white text-center border-l-8 border-nobel-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><PieChart size={200} /></div>
        <div className="relative z-10">
            <div className="text-[10px] opacity-60 uppercase tracking-[0.4em] mb-6 font-bold">Projected Cumulative Final</div>
            <div className="text-9xl font-serif leading-none">{forecast.toFixed(2)}</div>
            <p className="mt-12 text-[9px] uppercase tracking-[0.3em] opacity-40">Systemic calculation across {currentUnits + plannedUnits} units</p>
        </div>
      </div>
    </div>
  );
};

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      const nextMode = mode === 'study' ? 'break' : 'study';
      setMode(nextMode);
      setTimeLeft(nextMode === 'study' ? 25 * 60 : 5 * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center py-20 w-full text-center">
      <div className="flex gap-px bg-slate-200 border border-slate-200 mb-20 shadow-xl">
        <button onClick={() => { setMode('study'); setTimeLeft(25 * 60); setIsActive(false); }} className={`px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${mode === 'study' ? 'bg-ui-blue text-white' : 'bg-white text-slate-400 hover:text-ui-blue'}`}>Deep focus</button>
        <button onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }} className={`px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${mode === 'break' ? 'bg-nobel-gold text-ui-blue' : 'bg-white text-slate-400 hover:text-nobel-gold'}`}>Recovery</button>
      </div>
      <div className="text-[10rem] md:text-[15rem] font-serif leading-none text-ui-blue tabular-nums mb-20 flex items-center justify-center tracking-tighter">
        {minutes.toString().padStart(2, '0')}<span className="text-slate-100 opacity-50 px-4">:</span>{seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex gap-px bg-slate-100 border border-slate-100">
        <button onClick={() => setIsActive(!isActive)} className={`px-20 py-6 font-bold uppercase text-[10px] tracking-[0.5em] text-white transition-all ${isActive ? 'bg-red-700' : 'bg-ui-blue shadow-2xl scale-105'}`}>{isActive ? 'Interrupt' : 'Initialize Cycle'}</button>
        <button onClick={() => { setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60); setIsActive(false); }} className="p-6 bg-white text-slate-200 hover:text-slate-600 transition-colors"><RefreshCcw size={24}/></button>
      </div>
    </div>
  );
};

const WordCounter = () => {
  const [text, setText] = useState("");
  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    reading: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200)
  };
  return (
    <div className="max-w-5xl mx-auto w-full py-12">
      <h2 className="text-4xl font-serif text-ui-blue mb-12">Lexical Breakdown</h2>
      <textarea className="w-full h-80 p-12 border border-slate-200 focus:border-nobel-gold focus:outline-none font-serif text-2xl leading-relaxed mb-12 resize-none bg-slate-50/50 shadow-inner" placeholder="Input buffer for parsing..." value={text} onChange={e => setText(e.target.value)} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 shadow-2xl">
        {[
          { label: 'Word Count', val: stats.words },
          { label: 'Character Count', val: stats.chars },
          { label: 'Sentence Count', val: stats.sentences },
          { label: 'Cognitive Read', val: `${stats.reading} min` }
        ].map(s => (
          <div key={s.label} className="p-12 bg-white text-center hover:bg-slate-50 transition-colors">
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-4">{s.label}</div>
            <div className="text-5xl font-serif text-ui-blue tracking-tighter">{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BMICalculator = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  return (
    <div className="max-w-2xl mx-auto w-full py-20 text-center">
      <h2 className="text-4xl font-serif text-ui-blue mb-20 leading-none">Physiological Index</h2>
      <div className="space-y-16 mb-24 px-8">
        <div><div className="flex justify-between mb-6"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">Mass (KG)</span><span className="font-serif text-3xl text-ui-blue">{weight}</span></div><input type="range" min="40" max="150" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full h-1 bg-slate-200 accent-ui-blue cursor-pointer" /></div>
        <div><div className="flex justify-between mb-6"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">Stature (CM)</span><span className="font-serif text-3xl text-ui-blue">{height}</span></div><input type="range" min="100" max="220" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full h-1 bg-slate-200 accent-ui-blue cursor-pointer" /></div>
      </div>
      <div className="p-24 border-l-8 border-rose-600 bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-rose-600/5 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="relative z-10">
            <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-slate-500 mb-8">System Body Mass Index</div>
            <div className="text-[10rem] font-serif leading-none tracking-tighter">{bmi}</div>
        </div>
      </div>
    </div>
  );
};

const IDCardGenerator = () => {
  const [name, setName] = useState("STUDENT IDENTITY");
  const [hall, setHall] = useState("HALL CONSTITUENCY");
  const [dept, setDept] = useState("FACULTY ARCHIVE");
  const [level, setLevel] = useState("L00");
  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center w-full py-12">
      <div className="flex-1 w-full space-y-8">
        <h2 className="text-4xl font-serif text-ui-blue leading-none">Identity Simulation</h2>
        <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 ml-1">Member Label</label>
            <input className="w-full p-6 bg-slate-50 border border-slate-100 outline-none text-xl font-serif text-ui-blue focus:border-nobel-gold" value={name} onChange={e => setName(e.target.value.toUpperCase())} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 ml-1">Hall Sector</label>
            <input className="w-full p-4 bg-slate-50 border border-slate-100 outline-none text-xs font-bold uppercase tracking-widest focus:border-nobel-gold" value={hall} onChange={e => setHall(e.target.value.toUpperCase())} />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 ml-1">Academic Unit</label>
            <input className="w-full p-4 bg-slate-50 border border-slate-100 outline-none text-xs font-bold uppercase tracking-widest focus:border-nobel-gold" value={dept} onChange={e => setDept(e.target.value.toUpperCase())} />
          </div>
        </div>
        <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 ml-1">Tier Level</label>
            <input className="w-full p-4 bg-slate-50 border border-slate-100 outline-none text-xs font-bold uppercase tracking-widest focus:border-nobel-gold" value={level} onChange={e => setLevel(e.target.value.toUpperCase())} />
        </div>
      </div>
      <div className="w-full sm:w-[480px] h-[280px] bg-slate-900 text-white p-10 relative overflow-hidden border border-slate-800 shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col justify-between group">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rotate-45 group-hover:bg-nobel-gold/10 transition-colors duration-1000"></div>
        <div className="flex justify-between items-start relative z-10">
            <div className="w-20 h-24 bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"><User size={48} className="text-white/10"/></div>
            <div className="text-right border-r-2 border-nobel-gold pr-4">
                <div className="text-[11px] font-bold tracking-[0.3em] uppercase leading-tight text-slate-400">University of Ibadan</div>
                <div className="text-[9px] tracking-[0.2em] uppercase opacity-40 font-light mt-1">Students' Union Matrix</div>
            </div>
        </div>
        <div className="relative z-10">
            <div className="text-2xl font-serif font-bold uppercase tracking-tight mb-2 text-nobel-gold">{name || 'SYSTEM USER'}</div>
            <div className="text-[8px] tracking-[0.5em] uppercase text-slate-500 font-bold border-t border-white/5 pt-4">{dept} | {level} | {hall}</div>
        </div>
        <div className="absolute bottom-4 right-6 text-[6px] uppercase tracking-[0.4em] text-white/10 font-bold">Encrypted Archive Key #774-UI</div>
      </div>
    </div>
  );
};

const QRGenerator = () => {
  const [val, setVal] = useState("HTTPS://UISU.ARCHIVE");
  return (
    <div className="max-w-2xl mx-auto text-center w-full py-20">
      <h2 className="text-4xl font-serif text-ui-blue mb-12 italic leading-none">Matrix QR Encoder</h2>
      <input className="w-full p-8 bg-slate-50 border border-slate-100 focus:border-nobel-gold focus:outline-none text-4xl font-serif mb-16 text-center text-ui-blue shadow-inner" value={val} onChange={e => setVal(e.target.value.toUpperCase())} />
      <div className="w-80 h-80 mx-auto border-[16px] border-slate-900 p-8 flex items-center justify-center relative bg-white shadow-2xl">
        <QrCode size={200} className="text-slate-900 opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <Star size={40} className="text-nobel-gold animate-pulse" fill="currentColor" />
            <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-slate-400">Cipher Processing</span>
        </div>
      </div>
      <div className="mt-16 text-slate-300 font-bold uppercase text-[9px] tracking-[0.5em]">Sector Access Token Valid</div>
    </div>
  );
};

const RandomPicker = () => {
  const [names, setNames] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const pick = () => { if (!names.trim()) return; setPicking(true); setTimeout(() => { const list = names.split('\n').filter(Boolean); setResult(list[Math.floor(Math.random() * list.length)]); setPicking(false); }, 1200); };
  return (
    <div className="max-w-2xl mx-auto w-full py-12">
      <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Stochastic Selection</h2>
      <div className="relative mb-8">
        <textarea className="w-full h-56 p-10 bg-slate-50 border border-slate-100 mb-6 outline-none focus:border-nobel-gold font-light text-xl leading-relaxed shadow-inner resize-none" placeholder="LOG ENTRIES PER LINE..." value={names} onChange={e => setNames(e.target.value.toUpperCase())} />
        <div className="absolute bottom-12 right-10 text-[8px] font-bold uppercase tracking-widest text-slate-200">Entropy Input Buffer</div>
      </div>
      <button onClick={pick} disabled={picking} className="w-full py-8 bg-slate-900 text-white font-bold uppercase tracking-[0.6em] text-[11px] shadow-2xl hover:bg-ui-blue transition-all border-l-8 border-nobel-gold">{picking ? 'DETERMINING...' : 'EXECUTE SELECTION'}</button>
      {result && !picking && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-16 p-20 bg-white border border-slate-200 text-center relative shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-nobel-gold text-ui-blue px-6 py-2 text-[9px] font-bold uppercase tracking-widest">Selected Determinant</div>
          <div className="text-7xl font-serif text-ui-blue tracking-tighter">{result}</div>
        </motion.div>
      )}
    </div>
  );
};

const AgeCalculator = () => {
  const [dob, setDob] = useState("2000-01-01");
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const d = new Date(dob);
  const diff = now.getTime() - d.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return (
    <div className="max-w-2xl mx-auto w-full py-16 text-center">
      <h2 className="text-4xl font-serif text-ui-blue mb-12 italic leading-none text-center">Temporal Index Analysis</h2>
      <div className="relative mb-16 inline-block w-full">
        <input type="date" className="w-full p-8 bg-slate-50 border border-slate-100 font-serif text-4xl text-ui-blue focus:border-nobel-gold outline-none shadow-inner text-center" value={dob} onChange={e => setDob(e.target.value)} />
        <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em] mt-8">Epoch Origin Alignment</div>
      </div>
      <div className="p-24 bg-ui-blue text-white shadow-[0_40px_100px_rgba(0,51,102,0.3)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10">
            <div className="text-[11px] font-bold text-nobel-gold uppercase tracking-[0.6em] mb-8">Completed Solar Cycles</div>
            <div className="text-[12rem] font-serif leading-none tracking-tighter">{years}</div>
        </div>
      </div>
    </div>
  );
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);
  useEffect(() => { let int: any; if (run) int = setInterval(() => setTime(t => t + 10), 10); return () => clearInterval(int); }, [run]);
  const format = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const m = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${m.toString().padStart(2, '0')}`;
  };
  return (
    <div className="text-center py-24 w-full flex flex-col items-center">
      <h2 className="text-4xl font-serif text-ui-blue mb-20 italic">Precision Temporal Monitor</h2>
      <div className="text-[10rem] md:text-[14rem] font-mono text-ui-blue mb-24 tabular-nums tracking-tighter leading-none">{format(time)}</div>
      <div className="flex gap-px bg-slate-200 border border-slate-200 shadow-2xl">
        <button onClick={() => setRun(!run)} className={`px-24 py-8 font-bold uppercase text-[11px] tracking-[0.6em] text-white transition-all ${run ? 'bg-red-800' : 'bg-green-800'}`}>{run ? 'HALT CYCLE' : 'INITIALIZE CAPTURE'}</button>
        <button onClick={() => { setTime(0); setRun(false); }} className="px-12 bg-white text-slate-300 hover:text-slate-900 transition-colors border-l border-slate-100 font-bold text-[10px] tracking-widest">RESET</button>
      </div>
    </div>
  );
};

const ClassTimetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['8:00', '10:00', '12:00', '14:00', '16:00'];
    const [schedule, setSchedule] = useState<any>(() => {
        const saved = localStorage.getItem('matrix_timetable');
        return saved ? JSON.parse(saved) : {};
    });
    const updateCell = (day: string, time: string, val: string) => {
        const next = { ...schedule, [`${day}-${time}`]: val };
        setSchedule(next);
        localStorage.setItem('matrix_timetable', JSON.stringify(next));
    };
    return (
        <div className="w-full">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">System Schedule Matrix</h2>
            <div className="overflow-x-auto border-4 border-slate-900 shadow-2xl">
                <table className="w-full border-collapse min-w-[900px]">
                    <thead>
                        <tr>
                            <th className="p-8 border border-slate-800 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-[0.4em]">EPOCH</th>
                            {days.map(d => <th key={d} className="p-8 border border-slate-200 bg-slate-50 text-ui-blue text-[11px] font-bold uppercase tracking-[0.4em]">{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {times.map(t => (
                            <tr key={t}>
                                <td className="p-8 border border-slate-200 font-serif font-bold text-center bg-slate-50 text-xl text-slate-400 border-r-4 border-r-slate-300">{t}</td>
                                {days.map(d => (
                                    <td key={d} className="p-0 border border-slate-200 h-32 group">
                                        <textarea className="w-full h-full p-6 text-sm focus:outline-none focus:bg-ui-blue/5 border-none resize-none font-light text-ui-blue uppercase tracking-widest group-hover:bg-slate-50 transition-colors" value={schedule[`${d}-${t}`] || ''} onChange={e => updateCell(d, t, e.target.value.toUpperCase())} placeholder="..." />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
                <span>Phase Alignment Verified</span>
                <span>Automatic Serialization Active</span>
            </div>
        </div>
    );
};

const GradeNeededCalc = () => {
    const [current, setCurrent] = useState(70);
    const [examWeight, setExamWeight] = useState(40);
    const [target, setTarget] = useState(70);
    const needed = ((target - (current * (1 - examWeight / 100))) / (examWeight / 100)).toFixed(1);
    return (
        <div className="max-w-3xl mx-auto w-full py-16 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-16 italic">Score Proximity Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 mb-20 shadow-xl">
                <div className="p-10 bg-white"><label className="text-[9px] font-bold uppercase text-slate-300 tracking-[0.4em] block mb-6">Current Progress (%)</label><input type="number" className="w-full text-5xl font-serif text-ui-blue outline-none text-center" value={current} onChange={e => setCurrent(Number(e.target.value))} /></div>
                <div className="p-10 bg-white border-x border-slate-50"><label className="text-[9px] font-bold uppercase text-slate-300 tracking-[0.4em] block mb-6">Exam Weight (%)</label><input type="number" className="w-full text-5xl font-serif text-ui-blue outline-none text-center" value={examWeight} onChange={e => setExamWeight(Number(e.target.value))} /></div>
                <div className="p-10 bg-white"><label className="text-[9px] font-bold uppercase text-slate-300 tracking-[0.4em] block mb-6">Aspiration (%)</label><input type="number" className="w-full text-5xl font-serif text-ui-blue outline-none text-center" value={target} onChange={e => setTarget(Number(e.target.value))} /></div>
            </div>
            <div className="p-24 border-l-8 border-red-700 bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 text-nobel-gold group-hover:scale-110 transition-transform duration-1000"><Target size={300} /></div>
                <div className="relative z-10">
                    <div className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-500 mb-10">Required Exam Threshold</div>
                    <div className="text-[10rem] font-serif leading-none tracking-tighter">{needed}%</div>
                </div>
            </div>
        </div>
    );
};

const StudyMetronome = () => {
    const [bpm, setBpm] = useState(120);
    const [active, setActive] = useState(false);
    const audioCtx = useRef<AudioContext | null>(null);
    const intervalRef = useRef<any>(null);
    const playClick = () => { if (!audioCtx.current) audioCtx.current = new AudioContext(); const osc = audioCtx.current.createOscillator(); const env = audioCtx.current.createGain(); osc.frequency.value = 880; env.gain.value = 0.5; env.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1); osc.connect(env); env.connect(audioCtx.current.destination); osc.start(); osc.stop(audioCtx.current.currentTime + 0.1); };
    useEffect(() => { if (active) { intervalRef.current = setInterval(playClick, (60 / bpm) * 1000); } else { clearInterval(intervalRef.current); } return () => clearInterval(intervalRef.current); }, [active, bpm]);
    return (
        <div className="max-w-xl mx-auto text-center py-24 w-full flex flex-col items-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-20 italic leading-none">Rhythmic Pulse Engine</h2>
            <div className="text-[12rem] font-serif text-ui-blue mb-24 leading-none tracking-tighter tabular-nums">{bpm}</div>
            <input type="range" min="40" max="240" value={bpm} onChange={e => setBpm(Number(e.target.value))} className="w-full h-2 bg-slate-100 accent-ui-blue mb-20 cursor-pointer" />
            <div className="w-full flex shadow-2xl">
                <button onClick={() => setActive(!active)} className={`flex-1 py-10 font-bold uppercase text-[12px] tracking-[0.6em] transition-all border-l-8 border-nobel-gold ${active ? 'bg-red-800 text-white' : 'bg-slate-900 text-white'}`}>
                    {active ? 'INTERRUPT PULSE' : 'INITIALIZE CADENCE'}
                </button>
            </div>
        </div>
    );
};

const Whiteboard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#003366');
    useEffect(() => { const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d'); if (ctx) { ctx.lineCap = 'butt'; ctx.lineWidth = 2; } }, []);
    const start = (e: any) => { setIsDrawing(true); draw(e); };
    const stop = () => { setIsDrawing(false); const c = canvasRef.current; if (c) { const ctx = c.getContext('2d'); if (ctx) ctx.beginPath(); } };
    const draw = (e: any) => { if (!isDrawing) return; const c = canvasRef.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return; ctx.strokeStyle = color; const r = c.getBoundingClientRect(); const x = (e.clientX || e.touches?.[0].clientX) - r.left; const y = (e.clientY || e.touches?.[0].clientY) - r.top; ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); };
    const clear = () => { const c = canvasRef.current; if (c) { const ctx = c.getContext('2d'); if (ctx) ctx.clearRect(0, 0, c.width, c.height); } };
    return (
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-end mb-12 border-b-2 border-slate-900 pb-8">
                <div>
                    <h2 className="text-4xl font-serif text-ui-blue leading-none mb-2 italic">Structural Draft</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Visual Thinking Terminal</p>
                </div>
                <div className="flex gap-12 items-center">
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Tone Select</span>
                        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-12 border-none cursor-pointer bg-transparent" />
                    </div>
                    <button onClick={clear} className="px-10 py-4 border-2 border-slate-900 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 hover:bg-slate-900 hover:text-white transition-all">Flush Interface</button>
                </div>
            </div>
            <div className="border-[16px] border-slate-900 shadow-2xl bg-white relative">
                <canvas ref={canvasRef} width={1200} height={700} onMouseDown={start} onMouseUp={stop} onMouseMove={draw} onTouchStart={start} onTouchEnd={stop} onTouchMove={draw} className="w-full aspect-[1.6/1] cursor-crosshair" />
                <div className="absolute top-4 left-6 text-[8px] font-bold uppercase tracking-widest text-slate-100 mix-blend-difference pointer-events-none">Vector Plotter Engine v1.0</div>
            </div>
        </div>
    );
};

const CiterGen = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [style, setStyle] = useState("APA");

  const generate = () => { if (style === "APA") return `${author} (${year}). ${title}. ${publisher}.`; return `${author}. ${title}. ${publisher}, ${year}.`; };
  
  return (
    <div className="max-w-3xl mx-auto w-full py-12">
      <h2 className="text-4xl font-serif text-ui-blue mb-12 leading-none italic text-center">Bibliographic Encoder</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200 mb-12 shadow-inner">
        <input className="w-full p-6 bg-white outline-none text-xs font-bold uppercase tracking-widest focus:bg-slate-50" value={author} onChange={e => setAuthor(e.target.value)} placeholder="SOURCE: AUTHOR / CORPORATE" />
        <input className="w-full p-6 bg-white outline-none text-xs font-bold uppercase tracking-widest focus:bg-slate-50" value={title} onChange={e => setTitle(e.target.value)} placeholder="OBJECT: WORK TITLE" />
        <input className="w-full p-6 bg-white outline-none text-xs font-bold uppercase tracking-widest focus:bg-slate-50" value={year} onChange={e => setYear(e.target.value)} placeholder="TEMPORAL: YEAR" />
        <input className="w-full p-6 bg-white outline-none text-xs font-bold uppercase tracking-widest focus:bg-slate-50" value={publisher} onChange={e => setPublisher(e.target.value)} placeholder="UNIT: PUBLISHER" />
      </div>
      <div className="flex gap-px bg-slate-200 mb-16 shadow-sm max-w-sm mx-auto">
        {['APA', 'MLA'].map(s => (
          <button key={s} onClick={() => setStyle(s)} className={`flex-1 py-5 text-[11px] font-bold uppercase tracking-[0.4em] transition-all ${style === s ? 'bg-ui-blue text-white shadow-xl' : 'bg-white text-slate-400 hover:text-ui-blue'}`}>{s}</button>
        ))}
      </div>
      <div className="p-20 border-l-[12px] border-nobel-gold bg-slate-900 text-white relative shadow-2xl group">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-white group-hover:rotate-12 transition-transform duration-700"><Quote size={120} /></div>
        <div className="relative z-10">
            <div className="text-[10px] text-slate-500 uppercase tracking-[0.5em] mb-10 font-bold italic">Standardized Format Matrix</div>
            <p className="font-serif italic text-3xl leading-relaxed text-slate-100">{generate()}</p>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(generate()); alert("Serialized to Buffer"); }} className="absolute bottom-8 right-10 p-4 bg-white/5 border border-white/10 text-nobel-gold hover:bg-nobel-gold hover:text-ui-blue transition-all"><Copy size={20}/></button>
      </div>
    </div>
  );
};

const FocusAudio = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const sounds = [
    { id: 'library', name: 'KDL AMBIENCE', icon: Book, color: 'bg-slate-900' },
    { id: 'rain', name: 'TROPICAL STORM', icon: Activity, color: 'bg-zinc-900' },
    { id: 'white', name: 'STATIC BUFFER', icon: Zap, color: 'bg-slate-800' },
    { id: 'lofi', name: 'IVORY LOFI', icon: Music, color: 'bg-indigo-950' },
  ];
  const toggle = (id: string) => setPlaying(playing === id ? null : id);
  return (
    <div className="max-w-3xl mx-auto text-center w-full py-20">
      <h2 className="text-4xl font-serif text-ui-blue mb-12 italic leading-none">Aural Concentration Buffer</h2>
      <p className="text-slate-300 mb-20 text-[10px] font-bold uppercase tracking-[0.6em] leading-relaxed">Cognitive-optimized frequencies for deep sector work.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sounds.map(s => (
          <button key={s.id} onClick={() => toggle(s.id)} className={`p-16 border-2 flex flex-col items-center gap-10 group transition-all duration-700 relative overflow-hidden ${playing === s.id ? 'bg-slate-900 text-white border-nobel-gold shadow-2xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-ui-blue shadow-sm'}`}>
            <div className={`w-20 h-20 border-2 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${playing === s.id ? 'bg-nobel-gold text-ui-blue border-transparent' : 'border-slate-100 text-slate-100 group-hover:text-ui-blue group-hover:border-ui-blue'}`}>
              {playing === s.id ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </div>
            <div className="font-serif text-2xl tracking-tighter uppercase">{s.name}</div>
            {playing === s.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-nobel-gold"></div>}
          </button>
        ))}
      </div>
      {playing && (
        <div className="mt-24 flex items-center justify-center gap-6 text-nobel-gold font-bold uppercase tracking-[0.8em] text-[10px]">
          <span className="animate-ping w-2 h-2 bg-nobel-gold"></span> TRANSMISSION ACTIVE
        </div>
      )}
    </div>
  );
};

const FlashcardsTool = () => {
  const [cards, setCards] = useState(() => {
      const saved = localStorage.getItem('matrix_cards');
      return saved ? JSON.parse(saved) : [{ front: 'Charter Year?', back: '1948' }, { front: 'Founder?', back: 'Kenneth Mellamby' }];
  });
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => localStorage.setItem('matrix_cards', JSON.stringify(cards)), [cards]);

  const next = () => { setFlipped(false); setTimeout(() => setCurrent((current + 1) % cards.length), 100); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrent((current - 1 + cards.length) % cards.length), 100); };
  
  return (
    <div className="max-w-3xl mx-auto text-center w-full py-16 flex flex-col items-center">
      <h2 className="text-4xl font-serif text-ui-blue mb-16 italic text-center">Recall Matrix Phase</h2>
      <div className="w-full aspect-[1.8/1] perspective-1000 cursor-pointer mb-20" onClick={() => setFlipped(!flipped)}>
        <motion.div className="w-full h-full relative transition-all duration-700 transform-style-3d shadow-2xl border-8 border-slate-900" animate={{ rotateY: flipped ? 180 : 0 }}>
          <div className="absolute inset-0 backface-hidden bg-white flex flex-col items-center justify-center p-16 shadow-inner border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-200 mb-8">Stimulus Input</span>
            <h3 className="text-5xl font-serif text-ui-blue leading-tight tracking-tight">{cards[current].front}</h3>
          </div>
          <div className="absolute inset-0 backface-hidden bg-ui-blue flex flex-col items-center justify-center p-16 rotate-y-180 border border-ui-blue shadow-inner">
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-8">Resolved Determinant</span>
            <h3 className="text-5xl font-serif text-white leading-tight tracking-tight border-b-4 border-nobel-gold pb-4">{cards[current].back}</h3>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-16 p-px bg-slate-900 shadow-xl">
        <button onClick={prev} className="p-8 text-white hover:bg-white/10 transition-colors border-r border-white/5"><ArrowLeft size={24}/></button>
        <div className="text-[11px] font-bold uppercase tracking-[0.6em] text-nobel-gold px-12">Phasing {current + 1} / {cards.length}</div>
        <button onClick={next} className="p-8 text-white hover:bg-white/10 transition-colors border-l border-white/5"><ArrowRight size={24}/></button>
      </div>
    </div>
  );
};

// --- MISSING TOOL COMPONENTS IMPLEMENTATION ---

// 1. Percentage Calculator
const PercentageCalc = () => {
    const [val, setVal] = useState(0);
    const [percent, setPercent] = useState(0);
    const result = (val * percent) / 100;
    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Ratio Determinant</h2>
            <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="p-8 bg-slate-50 border border-slate-100">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-300 block mb-4">Baseline Value</label>
                    <input type="number" className="w-full text-4xl font-serif bg-transparent outline-none text-center" value={val} onChange={e => setVal(Number(e.target.value))} />
                </div>
                <div className="p-8 bg-slate-50 border border-slate-100">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-300 block mb-4">Percentage (%)</label>
                    <input type="number" className="w-full text-4xl font-serif bg-transparent outline-none text-center" value={percent} onChange={e => setPercent(Number(e.target.value))} />
                </div>
            </div>
            <div className="p-16 bg-slate-900 text-white border-l-8 border-nobel-gold">
                <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Derived Quotient</div>
                <div className="text-8xl font-serif">{result.toFixed(2)}</div>
            </div>
        </div>
    );
};

// 2. Exam Countdown
const ExamCountdown = () => {
    const [targetDate, setTargetDate] = useState("2024-12-01");
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const diff = new Date(targetDate).getTime() - new Date().getTime();
            setTimeLeft(Math.max(0, diff));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Temporal Proximity</h2>
            <input type="date" className="p-6 bg-slate-50 border border-slate-100 mb-12 text-2xl font-serif outline-none" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
            <div className="grid grid-cols-3 gap-4">
                <div className="p-12 bg-ui-blue text-white"><div className="text-6xl font-serif">{days}</div><div className="text-[9px] uppercase tracking-widest opacity-40">Days</div></div>
                <div className="p-12 bg-slate-900 text-white"><div className="text-6xl font-serif">{hours}</div><div className="text-[9px] uppercase tracking-widest opacity-40">Hours</div></div>
                <div className="p-12 bg-nobel-gold text-ui-blue"><div className="text-6xl font-serif">{mins}</div><div className="text-[9px] uppercase tracking-widest opacity-40">Mins</div></div>
            </div>
        </div>
    );
};

// 3. Unit Converter
const UnitConverter = () => {
    const [cm, setCm] = useState(1);
    const inches = (cm * 0.393701).toFixed(2);
    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Metric Transformation</h2>
            <div className="flex items-center gap-8 bg-slate-50 p-12 border border-slate-100">
                <div className="flex-1">
                    <label className="text-[9px] font-bold text-slate-300 uppercase block mb-4">Centimeters</label>
                    <input type="number" className="w-full text-4xl font-serif bg-transparent outline-none" value={cm} onChange={e => setCm(Number(e.target.value))} />
                </div>
                <ArrowRight className="text-nobel-gold" />
                <div className="flex-1">
                    <label className="text-[9px] font-bold text-slate-300 uppercase block mb-4">Inches</label>
                    <div className="text-4xl font-serif text-ui-blue">{inches}</div>
                </div>
            </div>
        </div>
    );
};

// 4. Sci Calculator
const SciCalc = () => {
    const [expr, setExpr] = useState("");
    const solve = () => { try { setExpr(eval(expr).toString()); } catch { setExpr("Error"); } };
    return (
        <div className="max-w-md mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-8 italic text-center">Binary Logic</h2>
            <div className="bg-slate-900 p-8 shadow-2xl border-l-8 border-nobel-gold">
                <div className="bg-white/10 p-6 text-right text-3xl font-mono text-white mb-6 h-20 overflow-hidden">{expr || "0"}</div>
                <div className="grid grid-cols-4 gap-2">
                    {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+'].map(k => (
                        <button key={k} onClick={() => k === 'C' ? setExpr("") : setExpr(expr + k)} className="p-6 bg-white/5 hover:bg-white/10 text-white font-bold">{k}</button>
                    ))}
                    <button onClick={solve} className="col-span-4 p-6 bg-nobel-gold text-ui-blue font-bold uppercase tracking-widest">Execute</button>
                </div>
            </div>
        </div>
    );
};

// 5. MD Previewer
const MarkdownPreview = () => {
    const [md, setMd] = useState("# Aluta Continua\n\nPreserving the legacy of **Intellectualism**.");
    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 h-[600px] shadow-2xl">
            <textarea className="p-12 bg-white outline-none font-mono text-sm resize-none" value={md} onChange={e => setMd(e.target.value)} />
            <div className="p-12 bg-slate-50 overflow-y-auto prose prose-slate">
                <div dangerouslySetInnerHTML={{ __html: md.replace(/\n/g, '<br/>') }} />
            </div>
        </div>
    );
};

// 6. Text-to-Speech
const TTSApp = () => {
    const [text, setText] = useState("");
    const speak = () => {
        const ut = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(ut);
    };
    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Audio Synthesis</h2>
            <textarea className="w-full p-8 bg-slate-50 border border-slate-100 mb-8 font-serif text-2xl h-64 outline-none focus:border-nobel-gold" placeholder="Type for narration..." value={text} onChange={e => setText(e.target.value)} />
            <button onClick={speak} className="px-16 py-6 bg-ui-blue text-white font-bold uppercase tracking-[0.5em] hover:bg-nobel-gold transition-colors">Transmit</button>
        </div>
    );
};

// 7. Case Converter
const CaseConverter = () => {
    const [text, setText] = useState("");
    return (
        <div className="max-w-3xl mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic text-center">Text Normalization</h2>
            <textarea className="w-full p-8 border border-slate-200 h-64 mb-8 outline-none font-serif text-xl" value={text} onChange={e => setText(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setText(text.toUpperCase())} className="p-4 bg-slate-900 text-white font-bold uppercase tracking-widest">Uppercase</button>
                <button onClick={() => setText(text.toLowerCase())} className="p-4 bg-slate-900 text-white font-bold uppercase tracking-widest">Lowercase</button>
            </div>
        </div>
    );
};

// 8. List Sorter
const ListSorter = () => {
    const [list, setList] = useState("");
    const sort = () => setList(list.split('\n').sort().join('\n'));
    return (
        <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic text-center">Array Organization</h2>
            <textarea className="w-full p-8 border border-slate-200 h-80 mb-8 outline-none font-mono" value={list} onChange={e => setList(e.target.value)} />
            <button onClick={sort} className="w-full py-6 bg-ui-blue text-white font-bold uppercase tracking-widest">Alphabetize</button>
        </div>
    );
};

// 9. Lorem Ipsum Gen
const LoremIpsumGen = () => {
    const [count, setCount] = useState(1);
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aluta continua, victoria ascerta. Intellectualism and welfare for all uites. ".repeat(count);
    return (
        <div className="max-w-3xl mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic text-center">Buffer Synth</h2>
            <div className="flex gap-4 mb-8">
                <input type="number" className="p-4 border border-slate-200 w-24" value={count} onChange={e => setCount(Number(e.target.value))} />
                <button className="flex-1 bg-slate-900 text-white font-bold uppercase tracking-widest" onClick={() => navigator.clipboard.writeText(text)}>Copy Buffer</button>
            </div>
            <div className="p-12 bg-slate-50 border border-slate-100 font-serif leading-relaxed italic">{text}</div>
        </div>
    );
};

// 10. Habit Tracker
const HabitTracker = () => {
    const [habits, setHabits] = useState(['Study', 'Exercise', 'Reading']);
    return (
        <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic text-center">Behavior Ledger</h2>
            <div className="space-y-4">
                {habits.map(h => (
                    <div key={h} className="flex justify-between p-8 bg-white border border-slate-100 shadow-sm">
                        <span className="font-serif text-2xl text-ui-blue">{h}</span>
                        <div className="flex gap-2">
                            {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 border border-slate-200"></div>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 11. Base64 Tool
const Base64Tool = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const encode = () => setOutput(btoa(input));
    const decode = () => { try { setOutput(atob(input)); } catch { setOutput("Invalid Base64"); } };
    return (
        <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic text-center">Encoding Logic</h2>
            <textarea className="w-full p-6 border border-slate-200 h-32 mb-6" value={input} onChange={e => setInput(e.target.value)} placeholder="Input..." />
            <div className="flex gap-px bg-slate-200 mb-6">
                <button onClick={encode} className="flex-1 p-4 bg-slate-900 text-white font-bold uppercase tracking-widest">Encode</button>
                <button onClick={decode} className="flex-1 p-4 bg-slate-900 text-white font-bold uppercase tracking-widest">Decode</button>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 font-mono text-sm break-all">{output}</div>
        </div>
    );
};

// 12. Symbol Map
const SymbolMap = () => {
    const syms = ['Σ', 'Δ', 'Ω', 'μ', 'π', 'θ', 'λ', 'φ', '√', '∞', '∫', '≈', '≠', '≤', '≥'];
    return (
        <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic text-center">Notation Archive</h2>
            <div className="grid grid-cols-5 gap-4">
                {syms.map(s => (
                    <button key={s} onClick={() => navigator.clipboard.writeText(s)} className="p-12 bg-white border border-slate-100 text-4xl hover:bg-nobel-gold hover:text-white transition-colors">{s}</button>
                ))}
            </div>
        </div>
    );
};

// 13. Fees Tracker
const DuesTracker = () => (
    <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Financial Log</h2>
        <div className="space-y-4">
            {['Faculty Dues', 'Hall Dues', 'Departmental Dues'].map(d => (
                <div key={d} className="p-8 bg-white border border-slate-200 flex justify-between">
                    <span className="font-serif text-xl">{d}</span>
                    <span className="text-green-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Check size={14}/> Settled</span>
                </div>
            ))}
        </div>
    </div>
);

// 14. GPA Planner
const GPAPlanner = () => <GPACalculator />;

// 15. Grade Distribution
const GradeDistribution = () => (
    <div className="max-w-3xl mx-auto py-12 text-center">
        <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Session Analysis</h2>
        <div className="h-64 flex items-end gap-8 bg-slate-50 p-12 border border-slate-100">
            {['A', 'B', 'C', 'D'].map((g, i) => (
                <div key={g} className="flex-1 flex flex-col items-center gap-4">
                    <div className="w-full bg-ui-blue" style={{ height: `${(i+1)*20}%` }}></div>
                    <span className="font-bold">{g}</span>
                </div>
            ))}
        </div>
    </div>
);

// 16. Scholarship Tracker
const ScholarshipTracker = () => (
    <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Grant Portfolio</h2>
        <div className="space-y-4">
            {['UI Alumni Grant', 'Federal Scholarship', 'Hall Merit Award'].map(s => (
                <div key={s} className="p-8 bg-white border border-slate-200 flex justify-between">
                    <span className="font-serif text-xl">{s}</span>
                    <ExternalLink size={16} className="text-slate-300" />
                </div>
            ))}
        </div>
    </div>
);

// 17. Exam Seat Finder
const ExamSeatFinder = () => {
    const [id, setId] = useState("");
    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Spatial Search</h2>
            <input className="w-full p-8 border border-slate-200 text-3xl font-serif mb-12 text-center" placeholder="MATRIC NO..." value={id} onChange={e => setId(e.target.value)} />
            {id && (
                <div className="p-16 bg-slate-900 text-white border-l-8 border-nobel-gold">
                    <div className="text-xs uppercase tracking-widest opacity-40 mb-4">Location Matrix</div>
                    <div className="text-4xl font-serif">DLC HALL, SEAT {Math.floor(Math.random()*200)}</div>
                </div>
            )}
        </div>
    );
};

// 18. Reg Checklist
const RegChecklist = () => <ToDoList />;

// 19. Degree Class Calc
const DegreeClassCalc = () => {
    const [cgpa, setCgpa] = useState(3.5);
    const getClass = (c: number) => {
        if (c >= 4.5) return "First Class Honors";
        if (c >= 3.5) return "Second Class Upper";
        if (c >= 2.4) return "Second Class Lower";
        return "Third Class";
    };
    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Honors Determinant</h2>
            <input type="number" className="text-8xl font-serif text-ui-blue outline-none text-center w-full mb-12" value={cgpa} onChange={e => setCgpa(Number(e.target.value))} />
            <div className="p-12 bg-nobel-gold text-ui-blue font-serif text-4xl">{getClass(cgpa)}</div>
        </div>
    );
};

// 20. Shuttle Guide
const ShuttleGuide = () => (
    <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Logistics Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-8 bg-white border border-slate-200"><div className="font-bold mb-2">GATE &rarr; SUB</div><div className="text-nobel-gold font-serif">₦100</div></div>
            <div className="p-8 bg-white border border-slate-200"><div className="font-bold mb-2">SUB &rarr; UCH</div><div className="text-nobel-gold font-serif">₦200</div></div>
        </div>
    </div>
);

// 21. Loan Calc
const LoanCalc = () => {
    const [amt, setAmt] = useState(10000);
    const repayment = (amt * 1.05).toFixed(0);
    return (
        <div className="max-w-2xl mx-auto py-12 text-center">
            <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Amortization module</h2>
            <input type="number" className="p-8 border border-slate-200 text-4xl font-serif w-full mb-8 text-center" value={amt} onChange={e => setAmt(Number(e.target.value))} />
            <div className="p-12 bg-slate-900 text-white">Repayment (5% INT): ₦{repayment}</div>
        </div>
    );
};

// 22. Dept Directory
const DeptDirectory = () => (
    <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Institutional Links</h2>
        <div className="space-y-4 h-96 overflow-y-auto">
            {['Communication', 'Economics', 'Medicine', 'Law', 'Tech'].map(d => (
                <div key={d} className="p-6 bg-white border border-slate-100 flex justify-between">{d} <Info size={16}/></div>
            ))}
        </div>
    </div>
);

// 23. Stress Relief Tips
const StressReliefTips = () => (
    <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-4xl font-serif text-ui-blue mb-12 italic">Cortisol Mitigation</h2>
        <div className="space-y-6">
            <div className="p-8 border-l-4 border-nobel-gold bg-slate-50 italic font-serif text-xl">"Take a 10-minute walk near the Tower."</div>
            <div className="p-8 border-l-4 border-nobel-gold bg-slate-50 italic font-serif text-xl">"Hydrate at the SUB fountain."</div>
            <div className="p-8 border-l-4 border-nobel-gold bg-slate-50 italic font-serif text-xl">"Listen to Ivory Lo-fi."</div>
        </div>
    </div>
);
