/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Scale, Landmark, BookOpen, ShieldCheck, Gavel, ArrowRight, UserCheck, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- TIMELINE DIAGRAM ---
export const TimelineDiagram: React.FC = () => {
  const [activeEra, setActiveEra] = useState<string>('1948');
  
  const eras = [
    { 
      id: '1948', 
      title: 'The Foundation', 
      date: 'Feb 1948',
      desc: 'The University College Ibadan is established. The Students Union is formed shortly after as the first in Nigeria, setting the precedent for student activism and intellectual unionism in West Africa.', 
      icon: <Landmark size={20}/>,
      milestones: ['First Union Constitution drafted', 'Election of Pioneer President', 'Establishment of the SUB']
    },
    { 
      id: '1971', 
      title: 'The Martyrdom', 
      date: 'Feb 1, 1971',
      desc: 'A dark day. Adekunle Adepeju becomes the first student martyr in Nigeria during a peaceful protest against cafeteria management and poor welfare conditions. His sacrifice fueled the fire of student consciousness forever.', 
      icon: <Users size={20}/>,
      milestones: ['Protest against food quality', 'Police intervention', 'National student mobilization']
    },
    { 
      id: '1978', 
      title: 'Ali Must Go', 
      date: 'April 1978',
      desc: 'UI students play a central role in the nationwide "Ali Must Go" protests against education commercialization and fee increments, led by Union President Segun Okeowo.', 
      icon: <Scale size={20}/>,
      milestones: ['Nationwide strike action', 'Clash with military regime', 'Educational reforms initiated']
    },
    { 
      id: '2024', 
      title: 'Digital Resurgence', 
      date: 'Current Era',
      desc: 'The Union evolves, embracing technology for elections (e-voting) and digital archives while maintaining its fierce advocacy for welfare in a challenging economic climate.', 
      icon: <Calendar size={20}/>,
      milestones: ['Implementation of e-voting', 'Launch of Digital Archive', 'Team Inclusive Administration']
    },
  ];

  return (
    <div className="flex flex-col items-center p-12 bg-white rounded-none shadow-sm border border-stone-200 my-8 w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <BookOpen size={120} className="text-ui-blue" />
      </div>
      
      <h3 className="font-serif text-3xl mb-2 text-ui-blue relative z-10 uppercase tracking-tighter">Historical Path of Glory</h3>
      <p className="text-sm text-stone-500 mb-12 text-center max-w-md relative z-10 font-light italic">
        "Those who do not remember the past are condemned to repeat it."
      </p>
      
      <div className="relative w-full max-w-4xl z-10 py-16">
         {/* Line */}
         <div className="absolute top-[4.5rem] left-0 w-full h-[2px] bg-slate-100"></div>
         
         {/* Nodes */}
         <div className="flex justify-between relative z-10 px-4">
             {eras.map((era) => (
                 <motion.button
                    key={era.id}
                    onClick={() => setActiveEra(era.id)}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-6 relative group outline-none"
                 >
                     <AnimatePresence>
                         {activeEra === era.id && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-28 h-28 -z-10"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-nobel-gold/5 border border-nobel-gold/20"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.div>
                         )}
                     </AnimatePresence>

                     <div 
                        className={`w-16 h-16 flex items-center justify-center border-2 transition-all duration-500 ${
                            activeEra === era.id 
                            ? 'bg-ui-blue border-nobel-gold text-nobel-gold shadow-xl' 
                            : 'bg-white border-slate-100 text-slate-300 group-hover:border-ui-blue group-hover:text-ui-blue'
                        }`}
                     >
                        {era.icon}
                     </div>
                     
                     <div className="text-center">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${activeEra === era.id ? 'text-ui-blue' : 'text-slate-300'}`}>
                            {era.id}
                        </span>
                     </div>
                 </motion.button>
             ))}
         </div>
      </div>

      {/* Content Display */}
      <div className="mt-12 w-full max-w-3xl min-h-[220px] z-10">
         <AnimatePresence mode="wait">
             {eras.map((era) => activeEra === era.id && (
                 <motion.div
                    key={era.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-100 p-8"
                 >
                     <div className="md:col-span-7">
                        <div className="text-[10px] font-bold text-nobel-gold uppercase tracking-[0.4em] mb-2">{era.date}</div>
                        <h4 className="font-serif text-3xl text-ui-blue mb-4 leading-none">{era.title}</h4>
                        <p className="text-slate-600 leading-relaxed text-sm font-light italic mb-6">"{era.desc}"</p>
                     </div>
                     <div className="md:col-span-5 border-l border-slate-200 pl-8">
                        <h5 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-4">Key Milestones</h5>
                        <ul className="space-y-3">
                            {era.milestones.map((m, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-xs text-ui-blue font-medium uppercase tracking-wider">
                                    <div className="w-1.5 h-1.5 bg-nobel-gold"></div> {m}
                                </li>
                            ))}
                        </ul>
                     </div>
                 </motion.div>
             ))}
         </AnimatePresence>
      </div>
    </div>
  );
};

// --- STRUCTURE DIAGRAM ---
export const StructureDiagram: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center p-12 bg-white border border-slate-200 my-8 w-full rounded-none relative overflow-hidden shadow-inner">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ui-blue text-white text-[9px] font-bold tracking-[0.3em] uppercase mb-4">Constitutional Map</div>
          <h3 className="font-serif text-4xl text-ui-blue uppercase tracking-tighter leading-none">Tripartite Structure</h3>
          <p className="text-xs text-slate-500 mt-4 max-w-md font-light tracking-wide">
            The Students' Union operates as a model republic with checks, balances, and distinct jurisdictions.
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full max-w-5xl border border-slate-200 relative z-10">
          {/* CEC */}
          <div 
            className={`p-10 transition-all duration-500 relative group overflow-hidden ${hovered === 'cec' ? 'bg-slate-50' : 'bg-white'}`}
            onMouseEnter={() => setHovered('cec')}
            onMouseLeave={() => setHovered(null)}
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-nobel-gold transform transition-transform duration-700" style={{ transform: hovered === 'cec' ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}></div>
             <div className={`mb-8 transition-colors duration-500 ${hovered === 'cec' ? 'text-nobel-gold' : 'text-slate-300'}`}>
                <Landmark size={48}/>
             </div>
             <h4 className="font-serif text-3xl text-ui-blue mb-2 leading-none uppercase">The CEC</h4>
             <p className="text-[10px] font-bold text-nobel-gold uppercase tracking-[0.4em] mb-6">Central Executive Council</p>
             <p className="text-sm text-slate-500 leading-relaxed font-light mb-8">Primary administrators responsible for the daily management of student welfare and policy execution.</p>
             <div className="space-y-2 border-t border-slate-100 pt-6">
                {['Direct Administration', 'Fund Management', 'Welfare Delivery'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <UserCheck size={10} className="text-nobel-gold"/> {item}
                    </div>
                ))}
             </div>
          </div>

          {/* SRC */}
          <div 
            className={`p-10 border-x border-slate-200 transition-all duration-500 relative group overflow-hidden ${hovered === 'src' ? 'bg-slate-50' : 'bg-white'}`}
            onMouseEnter={() => setHovered('src')}
            onMouseLeave={() => setHovered(null)}
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-ui-blue transform transition-transform duration-700" style={{ transform: hovered === 'src' ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}></div>
             <div className={`mb-8 transition-colors duration-500 ${hovered === 'src' ? 'text-ui-blue' : 'text-slate-300'}`}>
                <Gavel size={48}/>
             </div>
             <h4 className="font-serif text-3xl text-ui-blue mb-2 leading-none uppercase">The SRC</h4>
             <p className="text-[10px] font-bold text-ui-blue uppercase tracking-[0.4em] mb-6">Students' Representative Council</p>
             <p className="text-sm text-slate-500 leading-relaxed font-light mb-8">The supreme legislative body representing all halls and faculties. Vests power in the people.</p>
             <div className="space-y-2 border-t border-slate-100 pt-6">
                {['Law Making', 'Executive Oversight', 'Budget Approval'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <FileText size={10} className="text-ui-blue"/> {item}
                    </div>
                ))}
             </div>
          </div>

          {/* JUDICIARY */}
          <div 
            className={`p-10 transition-all duration-500 relative group overflow-hidden ${hovered === 'jud' ? 'bg-slate-50' : 'bg-white'}`}
            onMouseEnter={() => setHovered('jud')}
            onMouseLeave={() => setHovered(null)}
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-stone-800 transform transition-transform duration-700" style={{ transform: hovered === 'jud' ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}></div>
             <div className={`mb-8 transition-colors duration-500 ${hovered === 'jud' ? 'text-slate-800' : 'text-slate-300'}`}>
                <Scale size={48}/>
             </div>
             <h4 className="font-serif text-3xl text-ui-blue mb-2 leading-none uppercase">The Judiciary</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-6">The Judicial Council</p>
             <p className="text-sm text-slate-500 leading-relaxed font-light mb-8">Custodians of justice. They interpret the constitution and resolve disputes with absolute neutrality.</p>
             <div className="space-y-2 border-t border-slate-100 pt-6">
                {['Constitutional Review', 'Dispute Resolution', 'Impartial Judgment'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <ShieldCheck size={10} className="text-slate-800"/> {item}
                    </div>
                ))}
             </div>
          </div>
      </div>

      {/* Oversight Arrows / Labels */}
      <div className="mt-12 w-full max-w-5xl flex justify-between px-10 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 pointer-events-none">
          <div className="flex items-center gap-2"><ArrowRight size={10}/> Oversight</div>
          <div className="flex items-center gap-2">Checks & Balances <ArrowRight size={10}/></div>
          <div className="flex items-center gap-2">Interpretation <ArrowRight size={10}/></div>
      </div>
    </div>
  );
};

// --- STATS CHART ---
export const PopulationChart: React.FC = () => {
    const data = [
        { year: '1948', count: 104, label: 'Pioneers' },
        { year: '1960', count: 1200, label: 'Independence' },
        { year: '1990', count: 12500, label: 'Expansion' },
        { year: '2024', count: 35000, label: 'Present Day' }
    ];
    
    return (
        <div className="flex flex-col md:flex-row gap-12 items-center p-12 bg-ui-blue text-stone-100 my-8 border-l-8 border-nobel-gold shadow-2xl w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="flex-1 min-w-[240px] relative z-10">
                <h3 className="font-serif text-3xl mb-4 text-nobel-gold uppercase tracking-tighter leading-none">Numerical Strength</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
                    Representing over 35,000 intellectual forces. From 104 students in 1948 to a massive community today.
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="p-3 bg-white/5 border border-white/10">
                        <BookOpen className="text-nobel-gold" size={20} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500">Institutional Growth Matrix</span>
                </div>
            </div>
            
            <div className="relative w-full md:w-[450px] h-72 bg-black/20 border border-white/5 p-8 z-10 shadow-inner">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                        <XAxis 
                            dataKey="year" 
                            stroke="#ffffff40" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ fill: '#ffffff60', fontWeight: 'bold' }} 
                        />
                        <YAxis hide />
                        <Tooltip 
                            cursor={{ fill: 'rgba(197, 160, 89, 0.1)' }}
                            contentStyle={{ backgroundColor: '#003366', border: '1px solid #C5A059', borderRadius: '0px' }}
                            itemStyle={{ color: '#C5A059', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="count" radius={[0, 0, 0, 0]} barSize={50}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 3 ? '#C5A059' : '#ffffff15'} stroke={index === 3 ? '#C5A059' : '#ffffff20'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="absolute top-2 right-4 text-[8px] font-bold uppercase tracking-[0.5em] text-white/20">UISU_DATA_VIS_v2.0</div>
            </div>
        </div>
    )
}
