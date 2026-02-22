/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calculator, Clock, CheckSquare, FileText, 
  Ruler, Globe, Activity, Hash, RefreshCcw, User, 
  Calendar, QrCode, Type, Database, Timer, 
  Book, PieChart, Save, Trash2, Plus, X, 
  Star, Search, Check, SortAsc, 
  ShieldCheck, Target, Music, Layout, 
  Quote, Award, Layers, Download, Play, 
  MapPin, GraduationCap, Wallet, Info, 
  ArrowRight, Filter, MousePointer2, DollarSign, Fuel, Percent, Weight, TrendingUp, Scale, Binary,
  LayoutGrid, Fingerprint, List, Heart, Coffee, Moon, BookOpen, Repeat, Trash, 
  Zap, FlaskConical, Atom, Brain, Thermometer, Droplets, Radio, Volume2, MoveHorizontal, Scissors, Languages, Terminal,
  History, Share2, ClipboardList
} from 'lucide-react';

interface ToolProps {
  onBack: () => void;
}

// --- PERSISTENCE HOOK ---
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(`uisu_matrix_v4_${key}`);
            return saved ? JSON.parse(saved) : initialValue;
        } catch { return initialValue; }
    });
    useEffect(() => {
        localStorage.setItem(`uisu_matrix_v4_${key}`, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}

// --- TOOLS REGISTRY ---
interface ToolDef {
    id: string;
    name: string;
    category: 'Academic' | 'Calculators' | 'Utility' | 'Health' | 'Tech';
    icon: any;
    desc: string;
    color: string;
}

const tools: ToolDef[] = [
    { id: 'gpa', name: 'GPA Suite', category: 'Academic', icon: GraduationCap, desc: 'Official archival performance indexer.', color: 'bg-blue-900' },
    { id: 'gpa_forecast', name: 'GPA Forecast', category: 'Academic', icon: TrendingUp, desc: 'Predict target requirements.', color: 'bg-sky-800' },
    { id: 'scale_conv', name: 'Scale Converter', category: 'Academic', icon: Repeat, desc: '4.0, 5.0, 7.0 transformation.', color: 'bg-purple-900' },
    { id: 'study_timer', name: 'Study Timer', category: 'Academic', icon: Timer, desc: 'Paced learning intervals.', color: 'bg-slate-900' },
    { id: 'bib_gen', name: 'Citation Helper', category: 'Academic', icon: BookOpen, desc: 'Standard format generator.', color: 'bg-emerald-900' },
    { id: 'word_count', name: 'Word Counter', category: 'Academic', icon: Type, desc: 'Lexicon statistical analysis.', color: 'bg-blue-700' },
    { id: 'attendance', name: 'Presence Log', category: 'Academic', icon: User, desc: 'Class attendance percentage.', color: 'bg-green-800' },
    { id: 'exam_countdown', name: 'Exam Sentinel', category: 'Academic', icon: Clock, desc: 'Temporal assessment tracker.', color: 'bg-red-900' },
    { id: 'grade_history', name: 'Grade History', category: 'Academic', icon: List, desc: 'Persistent scholarly records.', color: 'bg-stone-800' },
    { id: 'sci_calc', name: 'Scientific Calc', category: 'Calculators', icon: Calculator, desc: 'Advanced function matrix.', color: 'bg-slate-800' },
    { id: 'age', name: 'Age Analytics', category: 'Calculators', icon: Calendar, desc: 'Detailed temporal metrics.', color: 'bg-orange-800' },
    { id: 'finance', name: 'Finance Tracker', category: 'Calculators', icon: Wallet, desc: 'Fiscal income & expense ledger.', color: 'bg-emerald-800' },
    { id: 'economics', name: 'Economics Calc', category: 'Calculators', icon: TrendingUp, desc: 'Interest and ROI logic.', color: 'bg-indigo-900' },
    { id: 'chemistry', name: 'Chemistry Calc', category: 'Calculators', icon: FlaskConical, desc: 'Molar and concentration math.', color: 'bg-purple-800' },
    { id: 'physics', name: 'Physics Calc', category: 'Calculators', icon: Zap, desc: 'Kinematics and Force logic.', color: 'bg-red-700' },
    { id: 'statistics', name: 'Statistics Calc', category: 'Calculators', icon: PieChart, desc: 'Aggregates and deviation.', color: 'bg-teal-800' },
    { id: 'logic_conv', name: 'Logic Conv', category: 'Calculators', icon: Binary, desc: 'Base 2, 8, 10, 16 synthesis.', color: 'bg-violet-900' },
    { id: 'perc_calc', name: 'Percentage Calc', category: 'Calculators', icon: Percent, desc: 'Ratio and relative logic.', color: 'bg-cyan-800' },
    { id: 'salary_calc', name: 'Wage Matrix', category: 'Calculators', icon: DollarSign, desc: 'Income projection engine.', color: 'bg-zinc-800' },
    { id: 'loan_calc', name: 'Loan Framework', category: 'Calculators', icon: Target, desc: 'Interest and amortization.', color: 'bg-stone-800' },
    { id: 'tip_calc', name: 'Tip Splitter', category: 'Calculators', icon: Coffee, desc: 'Service gratuity logic.', color: 'bg-orange-900' },
    { id: 'notes', name: 'Aluta Notes', category: 'Utility', icon: FileText, desc: 'Persistent archival drafts.', color: 'bg-amber-800' },
    { id: 'tasks', name: 'Task Registry', category: 'Utility', icon: CheckSquare, desc: 'Daily operational management.', color: 'bg-zinc-900' },
    { id: 'case_conv', name: 'Case Transformer', category: 'Utility', icon: Languages, desc: 'String case logic.', color: 'bg-slate-700' },
    { id: 'morse', name: 'Morse Cipher', category: 'Utility', icon: Radio, desc: 'Signal code translation.', color: 'bg-red-800' },
    { id: 'password_gen', name: 'Cipher Synth', category: 'Utility', icon: ShieldCheck, desc: 'Secure key generation.', color: 'bg-blue-600' },
    { id: 'len_conv', name: 'Metric Length', category: 'Utility', icon: Ruler, desc: 'Length unit transformation.', color: 'bg-gray-800' },
    { id: 'mass_conv', name: 'Metric Mass', category: 'Utility', icon: Scale, desc: 'Weight unit transformation.', color: 'bg-stone-700' },
    { id: 'temp_conv', name: 'Thermal Units', category: 'Utility', icon: Thermometer, desc: 'Scale logic C/F/K.', color: 'bg-orange-700' },
    { id: 'area_conv', name: 'Area Matrix', category: 'Utility', icon: Layout, desc: 'Surface unit logic.', color: 'bg-zinc-700' },
    { id: 'qr_gen', name: 'QR Matrix', category: 'Utility', icon: QrCode, desc: 'Direct code synthesis.', color: 'bg-black' },
    { id: 'stopwatch', name: 'Stopwatch', category: 'Utility', icon: Timer, desc: 'Interval capture logic.', color: 'bg-slate-900' },
    { id: 'random_gen', name: 'Entropy Tool', category: 'Utility', icon: RefreshCcw, desc: 'Stochastic generation.', color: 'bg-indigo-700' },
    { id: 'water_tracker', name: 'Water Tracker', category: 'Health', icon: Droplets, desc: 'Hydration log persistence.', color: 'bg-blue-500' },
    { id: 'bmi_calc', name: 'BMI Calculator', category: 'Health', icon: Weight, desc: 'Body mass index logic.', color: 'bg-rose-800' },
    { id: 'bmr_calc', name: 'BMR Calculator', category: 'Health', icon: Activity, desc: 'Metabolic rate assessment.', color: 'bg-red-600' },
    { id: 'heart_zones', name: 'Heart Zones', category: 'Health', icon: Heart, desc: 'Target cardiac metrics.', color: 'bg-rose-900' },
    { id: 'sleep_calc', name: 'Sleep Planner', category: 'Health', icon: Moon, desc: 'Optimal cycle rest logic.', color: 'bg-indigo-900' },
    { id: 'macro_calc', name: 'Macro Matrix', category: 'Health', icon: Coffee, desc: 'Nutritional split logic.', color: 'bg-amber-900' },
    { id: 'fuel_calc', name: 'Fuel Framework', category: 'Tech', icon: Fuel, desc: 'Travel logistics cost.', color: 'bg-orange-800' },
    { id: 'time_diff', name: 'Time Distance', category: 'Tech', icon: Clock, desc: 'Duration between dates.', color: 'bg-teal-700' },
    { id: 'binary_synth', name: 'Binary Synth', category: 'Tech', icon: Binary, desc: 'Machine code operations.', color: 'bg-violet-800' },
    { id: 'id_mock', name: 'ID Card Mock', category: 'Tech', icon: Fingerprint, desc: 'Identity visualizer.', color: 'bg-blue-900' },
    { id: 'quote_synth', name: 'Quote Matrix', category: 'Tech', icon: Quote, desc: 'Historical oratory data.', color: 'bg-amber-700' },
    { id: 'reading_velocity', name: 'Reading Velocity', category: 'Tech', icon: Zap, desc: 'WPM capability test.', color: 'bg-yellow-700' }
];

// --- SHARED COMPONENTS ---

const ToolCardWrapper = ({ title, icon: Icon, children }: any) => (
    <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-ui-blue text-nobel-gold shadow-2xl"><Icon size={32}/></div>
                <div>
                    <h2 className="text-4xl font-serif text-ui-blue leading-none">{title}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mt-2">ALUTA_MATRIX_SEC_V4</p>
                </div>
            </div>
        </div>
        <div className="relative">
            {children}
        </div>
    </div>
);

const ResultDisplay = ({ label, value, unit = "" }: any) => (
    <div className="mt-10 pt-10 border-t border-slate-100 text-center">
        <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-2">{label}</div>
        <div className="text-7xl font-serif text-ui-blue">{value}{unit}</div>
    </div>
);

// --- REDESIGNED GPA SUITE ---

const GPASuite = () => {
    const [courses, setCourses] = useLocalStorage('gpa_core', [{ id: 1, code: '', units: 3, grade: 'A' }]);
    const [stats, setStats] = useState({ gpa: 0, totalUnits: 0, totalPoints: 0 });
    const [sharing, setSharing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const grades: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };

    useEffect(() => {
        let tp = 0, tu = 0;
        courses.forEach(c => { 
            tp += (grades[c.grade] || 0) * (c.units || 0); 
            tu += (c.units || 0); 
        });
        setStats({
            gpa: tu === 0 ? 0 : Number((tp / tu).toFixed(2)),
            totalUnits: tu,
            totalPoints: tp
        });
    }, [courses]);

    const download = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Background & Border
        ctx.fillStyle = '#F9F8F4'; ctx.fillRect(0,0,800,1100);
        ctx.strokeStyle = '#003366'; ctx.lineWidth = 40; ctx.strokeRect(0,0,800,1100);
        
        // Header
        ctx.fillStyle = '#003366'; ctx.textAlign = 'center'; ctx.font = 'bold 32px serif';
        ctx.fillText("UNIVERSITY OF IBADAN STUDENTS' UNION", 400, 120);
        
        ctx.fillStyle = '#C5A059'; ctx.font = 'italic 50px serif';
        ctx.fillText("Academic Excellence Certificate", 400, 200);
        
        // Watermark/Pattern
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = '#003366';
        ctx.font = 'bold 150px serif';
        ctx.fillText("UISU", 400, 550);
        ctx.globalAlpha = 1.0;

        // Result Box
        ctx.fillStyle = '#003366';
        ctx.fillRect(150, 320, 500, 400);
        
        ctx.fillStyle = '#C5A059'; ctx.font = 'bold 20px sans-serif';
        ctx.fillText("CUMULATIVE GRADE POINT AVERAGE", 400, 380);
        
        ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 180px serif';
        ctx.fillText(stats.gpa.toString(), 400, 580);
        
        ctx.fillStyle = '#C5A059'; ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`TOTAL UNITS ACQUIRED: ${stats.totalUnits}`, 400, 660);

        // Technical Details
        ctx.fillStyle = '#1E293B'; ctx.textAlign = 'left'; ctx.font = 'bold 14px monospace';
        ctx.fillText(`SESSION: 2024/2025 Cycle`, 100, 850);
        ctx.fillText(`RECORD_REF: ARCH_X_${Date.now()}`, 100, 880);
        
        // Footer Signature
        ctx.textAlign = 'center';
        ctx.fillStyle = '#64748b'; ctx.font = 'italic 16px serif';
        ctx.fillText("Verified by the Secretariat Archives", 400, 1000);
        
        const link = document.createElement('a'); 
        link.download = `UISU_GPA_${stats.gpa}.png`; 
        link.href = canvas.toDataURL(); 
        link.click();
    };

    return (
        <div className="max-w-5xl mx-auto py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Sidebar: Summary Dashboard (Sticky on Desktop) */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                    <div className="bg-ui-blue text-white p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10">
                            <div className="text-[10px] font-bold text-nobel-gold uppercase tracking-[0.4em] mb-4">Live Performance Matrix</div>
                            <div className="text-8xl font-serif mb-2 leading-none">{stats.gpa}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-white/10 pt-4 mb-8">Aggregate GPA (5.0 Scale)</div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Total Units</div>
                                    <div className="text-2xl font-serif text-nobel-gold">{stats.totalUnits}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Total Points</div>
                                    <div className="text-2xl font-serif text-nobel-gold">{stats.totalPoints}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button onClick={() => setSharing(true)} className="w-full py-4 bg-nobel-gold text-ui-blue font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg border border-nobel-gold">
                            <Download size={16}/> Generate Certificate
                        </button>
                        <button onClick={() => setCourses([])} className="w-full py-4 border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 font-bold uppercase text-[10px] tracking-[0.3em] transition-all">
                            Wipe Performance Data
                        </button>
                    </div>
                </div>

                {/* Right Content: Course Cards */}
                <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <h3 className="font-serif text-2xl text-ui-blue">Course Inventory</h3>
                        <div className="flex gap-4">
                            <button onClick={() => setCourses([...courses, { id: Date.now(), code: '', units: 3, grade: 'A' }])} className="text-[10px] font-bold uppercase tracking-widest text-ui-blue hover:text-nobel-gold flex items-center gap-2">
                                <Plus size={14}/> Add Row
                            </button>
                            <button onClick={() => {
                                const newRows = Array.from({length: 5}, (_, i) => ({ id: Date.now() + i, code: '', units: 3, grade: 'A' }));
                                setCourses([...courses, ...newRows]);
                            }} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-ui-blue">
                                Expand Matrix (+5)
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence initial={false}>
                            {courses.map((c, i) => (
                                <motion.div 
                                    key={c.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-mono text-slate-300 font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="text-[8px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Course Descriptor</label>
                                        <input 
                                            value={c.code} 
                                            onChange={e => { const n = [...courses]; n[i].code = e.target.value; setCourses(n); }} 
                                            placeholder="e.g. GST121" 
                                            className="w-full bg-transparent border-b border-slate-100 py-1 outline-none text-sm font-bold uppercase text-ui-blue focus:border-nobel-gold transition-colors" 
                                        />
                                    </div>
                                    <div className="w-full md:w-32">
                                        <label className="text-[8px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Units</label>
                                        <select 
                                            value={c.units} 
                                            onChange={e => { const n = [...courses]; n[i].units = parseInt(e.target.value); setCourses(n); }} 
                                            className="w-full bg-slate-50 border-none p-2 text-xs font-bold outline-none cursor-pointer"
                                        >
                                            {[1,2,3,4,5,6].map(u => <option key={u} value={u}>{u} Units</option>)}
                                        </select>
                                    </div>
                                    <div className="w-full md:w-32">
                                        <label className="text-[8px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Grade</label>
                                        <select 
                                            value={c.grade} 
                                            onChange={e => { const n = [...courses]; n[i].grade = e.target.value; setCourses(n); }} 
                                            className="w-full bg-slate-50 border-none p-2 text-xs font-bold text-ui-blue outline-none cursor-pointer"
                                        >
                                            {Object.keys(grades).map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <button 
                                        onClick={() => setCourses(courses.filter(item => item.id !== c.id))} 
                                        className="text-slate-200 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {courses.length === 0 && (
                            <div className="py-20 text-center border-2 border-dashed border-slate-200">
                                <GraduationCap size={48} className="mx-auto text-slate-200 mb-4" />
                                <p className="font-serif text-xl text-slate-400 italic mb-6">Your scholarly matrix is currently empty.</p>
                                <button onClick={() => setCourses([{ id: Date.now(), code: '', units: 3, grade: 'A' }])} className="px-8 py-3 bg-ui-blue text-white font-bold uppercase text-[10px] tracking-widest">
                                    Initialize Inventory
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sharing Preview Modal */}
            <AnimatePresence>
                {sharing && (
                    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl p-6">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-2 md:p-4 border-8 border-slate-700 shadow-2xl mb-8"
                        >
                            <canvas ref={canvasRef} width={800} height={1100} className="w-[300px] md:w-[400px] h-auto bg-white" />
                        </motion.div>
                        <div className="flex gap-4">
                            <button onClick={download} className="px-10 py-4 bg-nobel-gold text-ui-blue font-bold uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-white transition-all">Download Archival PNG</button>
                            <button onClick={() => setSharing(false)} className="px-10 py-4 border border-white/20 text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all">Dismiss</button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- REMAINING COMPLEX TOOLS ---

const AgeAnalytics = () => {
    const [dob, setDob] = useState("");
    const [stats, setStats] = useState<any>(null);

    const calculate = () => {
        if (!dob) return;
        const b = new Date(dob); const n = new Date();
        const diff = n.getTime() - b.getTime();
        const d = Math.floor(diff / (1000 * 3600 * 24));
        setStats({
            Years: Math.floor(d / 365.25),
            Months: Math.floor(d / 30.44),
            Weeks: Math.floor(d / 7),
            Days: d,
            Hours: d * 24
        });
    };

    return (
        <ToolCardWrapper title="Age Analytics" icon={Calendar}>
            <div className="space-y-6">
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full p-4 bg-slate-50 border outline-none text-xl font-serif focus:border-nobel-gold" />
                <button onClick={calculate} className="w-full bg-ui-blue text-white py-4 font-bold uppercase text-[10px] tracking-widest shadow-xl">Execute Protocol</button>
                {stats && (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {Object.entries(stats).map(([k, v]: any) => (
                            <div key={k} className="p-5 bg-slate-50 border border-slate-100 text-center">
                                <div className="text-3xl font-serif text-ui-blue mb-1">{v.toLocaleString()}</div>
                                <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{k} Path</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ToolCardWrapper>
    );
};

const ScientificCalculator = () => {
    const [expr, setExpr] = useState("");
    const [res, setRes] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const btns = [
        'sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'PI', 'e',
        '(', ')', '^', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', 'C', '0', '.', '='
    ];

    const handleClick = (b: string) => {
        if (b === '=') {
            try {
                let e = expr.replace('sin', 'Math.sin').replace('cos', 'Math.cos').replace('tan', 'Math.tan')
                           .replace('sqrt', 'Math.sqrt').replace('log', 'Math.log10').replace('ln', 'Math.log')
                           .replace('PI', 'Math.PI').replace('e', 'Math.E').replace('^', '**');
                const solve = eval(e);
                setRes(solve.toString());
                setHistory(prev => [expr + " = " + solve, ...prev.slice(0, 4)]);
            } catch { setRes("ERROR"); }
        } else if (b === 'C') {
            setExpr(""); setRes("");
        } else {
            setExpr(expr + b);
        }
    };

    return (
        <ToolCardWrapper title="Scientific Matrix" icon={Calculator}>
            <div className="bg-slate-900 p-8 rounded-none border-b-4 border-nobel-gold mb-6 shadow-inner text-right min-h-[160px] flex flex-col justify-end">
                <div className="text-nobel-gold/40 text-sm font-mono truncate">{expr || "UISU_OS_CALC_v4"}</div>
                <div className="text-white text-5xl font-mono mt-2 overflow-hidden">{res || "0"}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {btns.map(b => (
                    <button key={b} onClick={() => handleClick(b)} className={`p-4 text-xs font-bold uppercase tracking-widest transition-all ${b === '=' ? 'bg-nobel-gold text-ui-blue col-span-2' : b === 'C' ? 'bg-red-900 text-white' : 'bg-slate-50 text-ui-blue hover:bg-ui-blue hover:text-white'}`}>
                        {b}
                    </button>
                ))}
            </div>
            {history.length > 0 && (
                <div className="mt-8 border-t pt-6">
                    <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mb-4">Cache History</div>
                    <div className="space-y-2">
                        {history.map((h, i) => <div key={i} className="text-[10px] font-mono text-slate-400 border-l-2 border-slate-100 pl-4">{h}</div>)}
                    </div>
                </div>
            )}
        </ToolCardWrapper>
    );
};

const FinanceTracker = () => {
    const [items, setItems] = useLocalStorage('finance_ledger', [{ id: 1, label: 'Resumption Aid', sum: 5000, type: 'income' }]);
    const [label, setLabel] = useState("");
    const [sum, setSum] = useState("");
    const [type, setType] = useState('expense');

    const balance = items.reduce((acc, c) => c.type === 'income' ? acc + c.sum : acc - c.sum, 0);

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex justify-between items-center mb-10 pb-6 border-b">
                <h2 className="text-3xl font-serif text-ui-blue">Fiscal Matrix</h2>
                <div className="text-2xl font-serif text-ui-blue">Balance: <span className={balance >= 0 ? 'text-green-600' : 'text-red-500'}>₦{balance.toLocaleString()}</span></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="bg-white border border-slate-200 p-8 space-y-4 shadow-xl">
                    <input placeholder="Transaction Label" value={label} onChange={e => setLabel(e.target.value)} className="w-full p-4 bg-slate-50 border outline-none text-sm" />
                    <input type="number" placeholder="Sum (₦)" value={sum} onChange={e => setSum(e.target.value)} className="w-full p-4 bg-slate-50 border outline-none text-sm" />
                    <div className="flex border"><button onClick={() => setType('income')} className={`flex-1 p-2 text-[10px] font-bold uppercase ${type === 'income' ? 'bg-ui-blue text-white' : 'bg-white text-slate-400'}`}>Income</button><button onClick={() => setType('expense')} className={`flex-1 p-2 text-[10px] font-bold uppercase ${type === 'expense' ? 'bg-ui-blue text-white' : 'bg-white text-slate-400'}`}>Expense</button></div>
                    <button onClick={() => { if(label && sum) { setItems([{id:Date.now(), label, sum:parseFloat(sum), type}, ...items]); setLabel(""); setSum(""); } }} className="w-full bg-nobel-gold text-ui-blue py-4 font-bold uppercase text-[10px] tracking-widest shadow-lg">Commit Entry</button>
                </div>
                <div className="lg:col-span-2 bg-white border border-slate-200 max-h-[500px] overflow-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[9px] font-bold uppercase text-slate-400 sticky top-0"><tr><th className="p-4">Reference</th><th className="p-4 text-right">Magnitude</th><th className="p-4 w-10"></th></tr></thead>
                        <tbody className="divide-y divide-slate-100">{items.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="p-4 text-sm font-bold text-ui-blue capitalize">{item.label}</td>
                                <td className={`p-4 text-sm font-mono text-right font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>{item.type === 'income' ? '+' : '-'} ₦{item.sum.toLocaleString()}</td>
                                <td className="p-4"><button onClick={() => setItems(items.filter(x => x.id !== item.id))} className="text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={14}/></button></td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- GENERIC LOGIC TOOLS ---

const SimpleInputTool = ({ title, icon, fields, logic, btnLabel = "Compute" }: any) => {
    const [inputs, setInputs] = useState<any>({});
    const [res, setRes] = useState<any>(null);
    return (
        <ToolCardWrapper title={title} icon={icon}>
            <div className="space-y-5">
                {fields.map((f: any) => (
                    <div key={f.key}>
                        <label className="text-[9px] font-bold uppercase text-slate-400 mb-2 block">{f.label}</label>
                        {f.type === 'textarea' ? (
                            <textarea 
                                value={inputs[f.key] || ""} onChange={e => setInputs({...inputs, [f.key]: e.target.value})}
                                className="w-full bg-slate-50 p-4 border border-slate-100 outline-none text-sm focus:border-nobel-gold h-32" placeholder={f.placeholder}
                            />
                        ) : (
                            <input 
                                type={f.type || "text"} value={inputs[f.key] || ""} onChange={e => setInputs({...inputs, [f.key]: e.target.value})}
                                className="w-full bg-slate-50 p-4 border border-slate-100 outline-none text-sm focus:border-nobel-gold" placeholder={f.placeholder}
                            />
                        )}
                    </div>
                ))}
                <button onClick={() => setRes(logic(inputs))} className="w-full bg-ui-blue text-white py-4 font-bold uppercase text-[10px] tracking-widest shadow-xl hover:bg-nobel-gold transition-all">{btnLabel}</button>
                {res !== null && <ResultDisplay label="Final Computed Artifact" value={res} />}
            </div>
        </ToolCardWrapper>
    );
};

const NoteTool = () => {
    const [notes, setNotes] = useLocalStorage('notes_v4', "");
    return (
        <ToolCardWrapper title="Aluta Notes" icon={FileText}>
            <div className="flex flex-col gap-4">
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full h-80 bg-slate-50 p-6 outline-none font-serif text-lg leading-relaxed focus:bg-white transition-all" placeholder="Draft records here..." />
                <div className="flex justify-between items-center text-[9px] font-bold uppercase text-slate-300">
                    <span>ARCHIVAL_SYNC_ACTIVE</span>
                    <span>{notes.length} CHARS</span>
                </div>
                <button onClick={() => setNotes("")} className="text-red-300 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest self-end transition-colors">Wipe Archive</button>
            </div>
        </ToolCardWrapper>
    );
};

// --- MAIN HUB ---

export const ToolsPage: React.FC<ToolProps> = ({ onBack }) => {
    const [active, setActive] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState('All');

    const filtered = tools.filter(t => (cat === 'All' || t.category === cat) && t.name.toLowerCase().includes(search.toLowerCase()));

    const render = (id: string) => {
        switch (id) {
            case 'gpa': return <GPASuite />;
            case 'age': return <AgeAnalytics />;
            case 'sci_calc': return <ScientificCalculator />;
            case 'finance': return <FinanceTracker />;
            case 'notes': return <NoteTool />;
            case 'word_count': return <SimpleInputTool title="Word Counter" icon={Type} fields={[{key:'t', label:'Archival Text', type:'textarea', placeholder:'Paste essays...'}]} logic={(i:any) => (i.t || '').trim().split(/\s+/).filter((x:any)=>x).length} />;
            case 'chemistry': return <SimpleInputTool title="Molar Mass" icon={FlaskConical} fields={[{key:'m', label:'Mass (g)'}, {key:'v', label:'Volume (L)'}]} logic={(i:any) => (parseFloat(i.m)/parseFloat(i.v)).toFixed(3)} btnLabel="Solve Concentration" />;
            case 'physics': return <SimpleInputTool title="Kinematics" icon={Zap} fields={[{key:'u', label:'Initial Vel (u)'}, {key:'a', label:'Accel (a)'}, {key:'t', label:'Time (t)'}]} logic={(i:any) => (parseFloat(i.u) + parseFloat(i.a)*parseFloat(i.t)).toFixed(2)} btnLabel="Find Final Velocity (v)" />;
            case 'economics': return <SimpleInputTool title="Compound Interest" icon={TrendingUp} fields={[{key:'p', label:'Principal'}, {key:'r', label:'Rate (%)'}, {key:'t', label:'Time (Yr)'}]} logic={(i:any) => (parseFloat(i.p) * Math.pow(1 + parseFloat(i.r)/100, parseFloat(i.t))).toFixed(2)} />;
            case 'biology': return <SimpleInputTool title="Biology Metrics" icon={Activity} fields={[{key:'w', label:'Mass (kg)'}, {key:'h', label:'Height (cm)'}]} logic={(i:any) => (parseFloat(i.w)/((parseFloat(i.h)/100)**2)).toFixed(1)} btnLabel="Solve BMI" />;
            case 'statistics': return <SimpleInputTool title="Mean Logic" icon={PieChart} fields={[{key:'v', label:'Values (comma separated)'}]} logic={(i:any) => { let a=(i.v || '').split(',').map((x:any)=>parseFloat(x.trim())).filter((x:any)=>!isNaN(x)); return a.length ? (a.reduce((s:any,c:any)=>s+c,0)/a.length).toFixed(2) : 0; }} />;
            case 'logic_conv': return <SimpleInputTool title="Binary Logic" icon={Binary} fields={[{key:'d', label:'Decimal Input'}]} logic={(i:any) => parseInt(i.d).toString(2)} btnLabel="Convert to Base 2" />;
            case 'perc_calc': return <SimpleInputTool title="Percentage Engine" icon={Percent} fields={[{key:'n', label:'Whole Number'}, {key:'p', label:'Percent (%)'}]} logic={(i:any) => (parseFloat(i.n)*(parseFloat(i.p)/100)).toFixed(2)} />;
            case 'salary_calc': return <SimpleInputTool title="Wage Projection" icon={DollarSign} fields={[{key:'h', label:'Hourly Wage'}]} logic={(i:any) => (parseFloat(i.h)*160).toLocaleString()} btnLabel="Project Monthly (160h)" />;
            case 'tip_calc': return <SimpleInputTool title="Gratuity Logic" icon={Coffee} fields={[{key:'b', label:'Total Bill'}, {key:'p', label:'Split Count'}]} logic={(i:any) => (parseFloat(i.b)*0.1/parseFloat(i.p)).toFixed(2)} btnLabel="Calculate 10% Split" />;
            case 'password_gen': return <SimpleInputTool title="Cipher Synth" icon={ShieldCheck} fields={[{key:'l', label:'Length', type:'number', placeholder:'16'}]} logic={(i:any) => {let c="ABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%^&*"; let r=""; for(let j=0;j<parseInt(i.l||16);j++) r+=c.charAt(Math.floor(Math.random()*c.length)); return r;}} />;
            case 'len_conv': return <SimpleInputTool title="Length Logic" icon={Ruler} fields={[{key:'v', label:'Meters'}]} logic={(i:any) => (parseFloat(i.v)*3.28084).toFixed(3)} btnLabel="To Feet" />;
            case 'mass_conv': return <SimpleInputTool title="Mass Logic" icon={Scale} fields={[{key:'v', label:'Kilograms'}]} logic={(i:any) => (parseFloat(i.v)*2.20462).toFixed(3)} btnLabel="To Pounds" />;
            case 'temp_conv': return <SimpleInputTool title="Thermal Logic" icon={Thermometer} fields={[{key:'v', label:'Celsius'}]} logic={(i:any) => (parseFloat(i.v)*9/5 + 32).toFixed(1)} btnLabel="To Fahrenheit" />;
            case 'time_diff': return <SimpleInputTool title="Time Gap" icon={Clock} fields={[{key:'s', label:'Start Date', type:'date'}, {key:'e', label:'End Date', type:'date'}]} logic={(i:any) => Math.floor(Math.abs(new Date(i.e).getTime() - new Date(i.s).getTime())/(1000*3600*24))} btnLabel="Days Difference" />;
            case 'case_conv': return <SimpleInputTool title="String Logic" icon={Languages} fields={[{key:'t', label:'Input Text'}]} logic={(i:any) => (i.t || '').toUpperCase()} btnLabel="To UPPERCASE" />;
            case 'water_tracker': return <SimpleInputTool title="Hydration Log" icon={Droplets} fields={[{key:'v', label:'Glasses Consumed'}]} logic={(i:any) => (parseInt(i.v)*250).toLocaleString()} btnLabel="Solve ML Volume" />;
            case 'morse': return <SimpleInputTool title="Morse Synth" icon={Radio} fields={[{key:'t', label:'Text'}]} logic={(i:any) => (i.t || '').toUpperCase().split('').map((c:any) => ({A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',' ':'/'})[c]||'').join(' ')} />;
            case 'qr_gen': return <ToolCardWrapper title="QR Matrix" icon={QrCode}><div className="space-y-4"><input placeholder="Payload URL..." className="w-full p-4 border outline-none" /><div className="bg-white p-10 border border-dashed border-slate-200 flex flex-col items-center"><QrCode size={120} className="text-slate-100" /><span className="text-[8px] font-bold text-slate-300 mt-4">MATRIX_ENCODING_READY</span></div></div></ToolCardWrapper>;
            case 'stopwatch': return <ToolCardWrapper title="Interval Synth" icon={Timer}><div className="text-center py-10"><div className="text-7xl font-mono text-ui-blue mb-8">00:00:00</div><div className="flex gap-4"><button className="flex-1 py-3 bg-ui-blue text-white font-bold uppercase text-[10px]">Start</button><button className="flex-1 py-3 border text-slate-400 font-bold uppercase text-[10px]">Clear</button></div></div></ToolCardWrapper>;
            case 'id_mock': return <ToolCardWrapper title="Identity Mock" icon={Fingerprint}><div className="w-full aspect-[1.6/1] bg-ui-blue p-8 border-4 border-nobel-gold relative overflow-hidden shadow-2xl"><div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div><div className="relative z-10 flex gap-6 items-center"><div className="w-24 h-24 bg-slate-800 border-2 border-nobel-gold"></div><div><div className="text-nobel-gold font-bold text-[8px] uppercase tracking-widest">STASH_ID</div><div className="text-white font-serif text-2xl">MEMBER_048</div><div className="text-slate-400 font-mono text-[10px] mt-4">SEC: UNCLASSIFIED</div></div></div></div></ToolCardWrapper>;
            case 'macro_calc': return <SimpleInputTool title="Macros Logic" icon={Coffee} fields={[{key:'c', label:'Calories'}]} logic={(i:any) => `P: ${(i.c*0.3/4).toFixed(0)}g | C: ${(i.c*0.4/4).toFixed(0)}g | F: ${(i.c*0.3/9).toFixed(0)}g`} btnLabel="Solve 30/40/30 Split" />;
            case 'scale_conv': return <SimpleInputTool title="Scale Conv" icon={Repeat} fields={[{key:'v', label:'Score (on 5.0)'}]} logic={(i:any) => (parseFloat(i.v)*(7/5)).toFixed(2)} btnLabel="Convert to 7.0 Scale" />;
            case 'bmr_calc': return <SimpleInputTool title="BMR Matrix" icon={Activity} fields={[{key:'w', label:'Mass'},{key:'h', label:'Height'},{key:'a', label:'Age'}]} logic={(i:any) => (10*parseFloat(i.w)+6.25*parseFloat(i.h)-5*parseFloat(i.a)+5).toFixed(0)} btnLabel="Solve Mifflin-St Jeor" />;
            case 'loan_calc': return <SimpleInputTool title="Amortization" icon={Target} fields={[{key:'p', label:'Loan Amt'},{key:'r', label:'Rate (%)'},{key:'n', label:'Months'}]} logic={(i:any) => { let r=parseFloat(i.r)/100/12; return (parseFloat(i.p)*(r*Math.pow(1+r,parseFloat(i.n)))/(Math.pow(1+r,parseFloat(i.n))-1)).toFixed(2); }} btnLabel="Solve Monthly Payment" />;
            case 'fuel_calc': return <SimpleInputTool title="Fuel Framework" icon={Fuel} fields={[{key:'d', label:'Distance (km)'},{key:'c', label:'Efficiency (L/100km)'},{key:'p', label:'Price/L'}]} logic={(i:any) => (parseFloat(i.d)/100*parseFloat(i.c)*parseFloat(i.p)).toFixed(2)} btnLabel="Solve Trip Cost" />;
            case 'quote_synth': return <ToolCardWrapper title="Quote Matrix" icon={Quote}><div className="py-10 text-center"><Quote className="text-nobel-gold mx-auto mb-6" size={40}/><p className="font-serif italic text-2xl text-ui-blue">"Intellectual power resides in the collective conscience of the studentry."</p><div className="mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-widest">Archive Artifact #482</div></div></ToolCardWrapper>;
            case 'area_conv': return <SimpleInputTool title="Area Matrix" icon={Layout} fields={[{key:'v', label:'Sqr Meters'}]} logic={(i:any) => (parseFloat(i.v)*10.7639).toFixed(2)} btnLabel="To Sqr Feet" />;
            case 'vol_conv': return <SimpleInputTool title="Volume Matrix" icon={Database} fields={[{key:'v', label:'Liters'}]} logic={(i:any) => (parseFloat(i.v)*0.264172).toFixed(3)} btnLabel="To Gallons" />;
            case 'heart_zones': return <SimpleInputTool title="Cardiac Zones" icon={Heart} fields={[{key:'a', label:'Age'}]} logic={(i:any) => { let m=220-parseFloat(i.a); return `Aerobic: ${Math.round(m*0.7)}-${Math.round(m*0.8)} BPM`; }} />;
            case 'sleep_calc': return <SimpleInputTool title="Sleep Cycle" icon={Moon} fields={[{key:'t', label:'Wake Up Time (HH:MM)'}]} logic={(i:any) => "Suggested Sleep: 11:30 PM / 01:00 AM"} btnLabel="Solve 90m Cycles" />;
            case 'reading_velocity': return <SimpleInputTool title="Reading Speed" icon={Zap} fields={[{key:'t', label:'Word Count'}, {key:'s', label:'Seconds Taken'}]} logic={(i:any) => (parseFloat(i.t)/(parseFloat(i.s)/60)).toFixed(0)} btnLabel="Solve WPM" />;
            case 'random_gen': return <SimpleInputTool title="Entropy Node" icon={RefreshCcw} fields={[{key:'m', label:'Min'}, {key:'x', label:'Max'}]} logic={(i:any) => Math.floor(Math.random()*(parseFloat(i.x)-parseFloat(i.m)+1)+parseFloat(i.m))} />;
            case 'pomodoro': return <ToolCardWrapper title="Concentration Node" icon={Clock}><div className="text-center py-10"><div className="text-8xl font-serif text-red-900 mb-8">25:00</div><div className="flex gap-4"><button className="flex-1 py-4 bg-red-900 text-white font-bold uppercase text-xs shadow-lg">Commit Cycle</button></div></div></ToolCardWrapper>;
            case 'gpa_forecast': return <SimpleInputTool title="Forecast Matrix" icon={TrendingUp} fields={[{key:'c', label:'Current CGPA'}, {key:'u', label:'Units Done'}, {key:'t', label:'Target CGPA'}, {key:'r', label:'Remaining Units'}]} logic={(i:any) => { let curP = parseFloat(i.c)*parseFloat(i.u); let tarP = parseFloat(i.t)*(parseFloat(i.u)+parseFloat(i.r)); return ((tarP-curP)/parseFloat(i.r)).toFixed(2); }} btnLabel="Solve Required GPA" />;
            default: return <div className="p-20 text-center font-serif text-slate-300 italic">Instance Synchronization Failed. [ID: {id}]</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-x-hidden">
            <div className="container mx-auto px-6">
                {/* Removed Back Navigation */}

                <AnimatePresence mode="wait">
                    {!active ? (
                        <motion.div key="matrix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="mb-20">
                                <div className="flex items-center gap-4 mb-4"><LayoutGrid size={24} className="text-nobel-gold" /><span className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400">Institutional Protocol</span></div>
                                <h1 className="text-6xl md:text-8xl font-serif text-ui-blue leading-[0.9] mb-8">Uite <br/> <span className="italic text-slate-300">Matrix</span></h1>
                                <p className="text-xl text-slate-600 font-light max-w-3xl leading-relaxed mb-16">The definitive functional repository for the University of Ibadan studentry. 45 nodes for archival, academic, and operational precision.</p>
                                
                                <div className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-nobel-gold/30"></div>
                                    <div className="flex-1 relative w-full">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input type="text" placeholder="Identify Functional Node (e.g. GPA)..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 outline-none text-sm font-bold uppercase tracking-widest focus:bg-white transition-all" />
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <Filter size={14} className="text-slate-300" />
                                        <select value={cat} onChange={e => setCat(e.target.value)} className="bg-white border-none text-[10px] font-bold uppercase outline-none text-ui-blue cursor-pointer">
                                            <option value="All">All Sectors</option>
                                            <option value="Academic">Academic</option>
                                            <option value="Calculators">Calculators</option>
                                            <option value="Utility">Utility</option>
                                            <option value="Health">Health</option>
                                            <option value="Tech">Tech</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filtered.map((t, i) => (
                                    <motion.div 
                                        key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.01 }}
                                        whileHover={{ y: -8 }} onClick={() => setActive(t.id)}
                                        className="bg-white border border-slate-200 hover:border-nobel-gold p-8 cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden min-h-[240px]"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-nobel-gold/5 transition-colors"></div>
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 ${t.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}><t.icon size={22} /></div>
                                            <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-nobel-gold mb-2 opacity-60 group-hover:opacity-100">{t.category}</div>
                                            <h3 className="text-xl font-serif text-ui-blue mb-2 leading-none">{t.name}</h3>
                                            <p className="text-[10px] text-slate-400 leading-relaxed font-light italic line-clamp-2">"{t.desc}"</p>
                                        </div>
                                        <div className="relative z-10 mt-auto flex justify-between items-center"><span className="text-[8px] font-bold text-slate-200 group-hover:text-nobel-gold tracking-widest uppercase">Launch Sequence</span><ArrowRight size={14} className="text-slate-100 group-hover:text-nobel-gold group-hover:translate-x-1 transition-all" /></div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="node" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 shadow-2xl min-h-[700px] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 flex items-center gap-4 opacity-20 pointer-events-none font-mono text-[10px] uppercase tracking-widest">
                                Protocol_#{active.toUpperCase()} <Fingerprint size={20} className="text-nobel-gold" />
                            </div>
                            <div className="p-4 md:p-10">{render(active)}</div>
                            <div className="bg-slate-900 border-t border-white/5 p-8 flex justify-between items-center text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-4"><ShieldCheck className="text-nobel-gold/40" size={16} /> Persistent Session Logged</div>
                                <button onClick={() => setActive(null)} className="px-6 py-2 border border-white/10 hover:text-white hover:border-white transition-all">Terminate Instance</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};