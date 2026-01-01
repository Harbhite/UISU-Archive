
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Scale, Landmark, BookOpen } from 'lucide-react';

// --- TIMELINE DIAGRAM ---
export const TimelineDiagram: React.FC = () => {
  const [activeEra, setActiveEra] = useState<string>('1948');
  
  const eras = [
    { id: '1948', title: 'The Foundation', desc: 'The University College Ibadan is established. The Students Union is formed shortly after as the first in Nigeria, setting the precedent for student activism.', icon: <Landmark size={20}/> },
    { id: '1971', title: 'Kunle Adepeju', desc: 'A dark day. Kunle Adepeju becomes the first student martyr in Nigeria during a protest against cafeteria management and poor welfare conditions.', icon: <Users size={20}/> },
    { id: '1978', title: 'Ali Must Go', desc: 'UI students play a central role in the nationwide "Ali Must Go" protests against education commercialization, solidifying the Aluta spirit.', icon: <Scale size={20}/> },
    { id: '2024', title: 'Digital Era', desc: 'The Union evolves, embracing technology for elections (e-voting) and digital archives while maintaining its fierce advocacy for welfare.', icon: <Calendar size={20}/> },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-none shadow-sm border border-stone-200 my-8 w-full relative overflow-hidden">
      <h3 className="font-serif text-2xl mb-2 text-ui-blue relative z-10 uppercase tracking-tighter">Historical Timeline</h3>
      <p className="text-sm text-stone-500 mb-12 text-center max-w-md relative z-10 font-light">
        Chronological milestones of intellectual struggle.
      </p>
      
      <div className="relative w-full max-w-2xl z-10 py-12">
         {/* Line */}
         <div className="absolute top-[4.5rem] left-0 w-full h-[1px] bg-stone-200"></div>
         
         {/* Nodes */}
         <div className="flex justify-between relative z-10 px-2">
             {eras.map((era) => (
                 <motion.button
                    key={era.id}
                    onClick={() => setActiveEra(era.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-4 relative group outline-none"
                 >
                     {/* Active Indicator Glow & Ripple */}
                     <AnimatePresence>
                         {activeEra === era.id && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-24 -z-10 pointer-events-none"
                            >
                                {/* Subtle persistent glow */}
                                <motion.div
                                    className="absolute inset-0 bg-nobel-gold/10 blur-2xl"
                                    animate={{ 
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [0.8, 1, 0.8]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                {/* Soft pulsing ring */}
                                <motion.div
                                    className="absolute inset-4 border border-nobel-gold/20"
                                    animate={{ 
                                        scale: [1, 1.4], 
                                        opacity: [0.5, 0],
                                        rotate: 360
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.div>
                         )}
                     </AnimatePresence>

                     <motion.div 
                        className={`w-20 h-20 flex items-center justify-center border transition-all duration-500 bg-white z-10 ${
                            activeEra === era.id 
                            ? 'border-nobel-gold text-ui-blue shadow-[0_10px_30px_rgba(197,160,89,0.2)]' 
                            : 'border-stone-100 text-stone-300 group-hover:border-ui-blue group-hover:text-ui-blue'
                        }`}
                        animate={{ 
                            scale: activeEra === era.id ? 1.1 : 1
                        }}
                     >
                        {era.icon}
                     </motion.div>
                     
                     <div className="flex flex-col items-center">
                        <span className={`text-xs font-bold transition-colors duration-300 tracking-[0.2em] ${activeEra === era.id ? 'text-ui-blue' : 'text-stone-300'}`}>
                            {era.id}
                        </span>
                     </div>
                 </motion.button>
             ))}
         </div>
      </div>

      {/* Content Display */}
      <div className="mt-12 w-full max-w-xl min-h-[160px] text-center z-10">
         <AnimatePresence mode="wait">
             {eras.map((era) => activeEra === era.id && (
                 <motion.div
                    key={era.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 border border-stone-50 bg-stone-50/50"
                 >
                     <h4 className="font-serif text-2xl text-ui-blue mb-4 tracking-tight">{era.title}</h4>
                     <p className="text-stone-600 leading-relaxed text-sm font-light italic">"{era.desc}"</p>
                 </motion.div>
             ))}
         </AnimatePresence>
      </div>
    </div>
  );
};

// --- STRUCTURE DIAGRAM ---
export const StructureDiagram: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center p-8 bg-slate-50 border border-slate-200 my-8 w-full rounded-none">
      <h3 className="font-serif text-xl mb-4 text-ui-blue uppercase tracking-widest">Structural Integrity</h3>
      <p className="text-xs text-slate-500 mb-12 text-center max-w-md font-light">
        Separation of powers within the student body.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full max-w-4xl bg-slate-200 border border-slate-200">
          {/* CEC */}
          <motion.div 
            className="bg-white p-8 cursor-default relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection('cec')}
            onMouseLeave={() => setHoveredSection(null)}
            whileHover={{ backgroundColor: '#F8FAFC' }}
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-nobel-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
             <div className="mb-6 text-nobel-gold">
                <Landmark size={32}/>
             </div>
             <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-tighter text-lg">CEC</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Executive</p>
             <p className="text-xs text-slate-500 leading-relaxed">Responsible for daily administration, welfare, and implementation of policies.</p>
          </motion.div>

          {/* SRC */}
          <motion.div 
            className="bg-white p-8 cursor-default relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection('src')}
            onMouseLeave={() => setHoveredSection(null)}
            whileHover={{ backgroundColor: '#F8FAFC' }}
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
             <div className="mb-6 text-slate-800">
                <Users size={32}/>
             </div>
             <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-tighter text-lg">SRC</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Legislative</p>
             <p className="text-xs text-slate-500 leading-relaxed">Representing constituencies, making laws and checking the executive arm.</p>
          </motion.div>

          {/* JUDICIARY */}
          <motion.div 
            className="bg-white p-8 cursor-default relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection('judiciary')}
            onMouseLeave={() => setHoveredSection(null)}
            whileHover={{ backgroundColor: '#F8FAFC' }}
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-ui-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
             <div className="mb-6 text-ui-blue">
                <Scale size={32}/>
             </div>
             <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-tighter text-lg">Judiciary</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Interpretation</p>
             <p className="text-xs text-slate-500 leading-relaxed">Settles disputes and interprets the constitution to ensure justice prevails.</p>
          </motion.div>
      </div>
    </div>
  );
};

// --- STATS CHART ---
export const PopulationChart: React.FC = () => {
    const data = [
        { year: 1948, count: 1, label: 'Pioneers' },
        { year: 1960, count: 3, label: 'Independence' },
        { year: 1990, count: 6, label: 'Expansion' },
        { year: 2024, count: 8, label: 'Present Day' }
    ];
    
    return (
        <div className="flex flex-col md:flex-row gap-12 items-center p-12 bg-ui-blue text-stone-100 my-8 border-l-8 border-nobel-gold shadow-2xl w-full">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-3xl mb-4 text-nobel-gold">The Legion</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">
                    Representing over 35,000 intellectual forces. From 104 students in 1948 to a massive community today.
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="p-3 bg-white/5 border border-white/10">
                        <BookOpen className="text-nobel-gold" size={20} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500">Knowledge System</span>
                </div>
            </div>
            
            <div className="relative w-full md:w-96 h-64 bg-black/20 border border-white/5 overflow-hidden p-8 flex items-end justify-between gap-4">
                {data.map((item, i) => (
                    <div key={item.year} className="flex-1 flex flex-col items-center gap-4 group">
                        <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: `${item.count * 10}%` }}
                            transition={{ duration: 1.5, ease: [0.2, 1, 0.3, 1], delay: i * 0.1 }}
                            className={`w-full ${i === 3 ? 'bg-nobel-gold' : 'bg-white/10 group-hover:bg-white/20 transition-colors'}`}
                        ></motion.div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.year}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
