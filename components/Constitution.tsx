/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Scale, Book, Star, 
  ChevronRight, History, Download, X, 
  Gavel, Info, Bookmark, Fingerprint, Shield
} from 'lucide-react';

interface Clause {
    id: string;
    text: string;
    annotation?: string;
    historicalNote?: string;
}

interface Section {
    id: string;
    title: string;
    clauses: Clause[];
}

interface Article {
    id: string;
    title: string;
    sections: Section[];
}

const constitutionData: Article[] = [
    {
        id: "1",
        title: "The Supremacy of the Constitution",
        sections: [
            {
                id: "1.1",
                title: "Supremacy Clause",
                clauses: [
                    { 
                        id: "1.1.1", 
                        text: "This Constitution is supreme and its provisions shall have binding force on all individual members and organs of the Union.",
                        annotation: "This is the 'grundnorm' of student governance at UI. No hall or faculty bye-law can contradict this.",
                        historicalNote: "Strengthened in the 2001 amendment after the union restoration."
                    },
                    { 
                        id: "1.1.2", 
                        text: "The Union shall not be governed, nor shall any person or group of persons take control of the Union government except in accordance with the provisions of this Constitution.",
                        annotation: "Explicitly forbids caretaker committees unless constitutionally mandated."
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        title: "The Executive Council",
        sections: [
            {
                id: "2.1",
                title: "Establishment of the CEC",
                clauses: [
                    { 
                        id: "2.1.1", 
                        text: "There shall be a Central Executive Council (CEC) which shall be the principal executive organ of the Union.",
                        annotation: "Consists of 8 principal officers elected union-wide."
                    }
                ]
            },
            {
                id: "2.2",
                title: "Powers of the President",
                clauses: [
                    { 
                        id: "2.2.1", 
                        text: "The President shall be the Head of the Union and the Chief Executive Officer.",
                        annotation: "Subject to SRC oversight and budgetary approval."
                    }
                ]
            }
        ]
    },
    {
        id: "3",
        title: "The Students' Representative Council",
        sections: [
            {
                id: "3.1",
                title: "Composition",
                clauses: [
                    { 
                        id: "3.1.1", 
                        text: "The SRC shall consist of members elected from recognized constituencies as defined in the electoral code.",
                        annotation: "Currently 109 seats distributed across Halls and Faculties."
                    }
                ]
            }
        ]
    }
];

const glossaryTerms = [
    { term: "Quorum", definition: "The minimum number of members of an assembly that must be present at any of its meetings to make the proceedings of that meeting valid." },
    { term: "Ultra Vires", definition: "Beyond one's legal power or authority." },
    { term: "Sine Die", definition: "With no appointed date for resumption (as in an adjournment)." },
    { term: "Ex-Officio", definition: "By virtue of one's position or status." },
    { term: "Ad Hoc", definition: "Formed, arranged, or done for a particular purpose only." }
];

export const ConstitutionPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeArticle, setActiveArticle] = useState<string>("1");
    const [showGlossary, setShowGlossary] = useState(false);
    const [selectedClause, setSelectedClause] = useState<Clause | null>(null);

    const filteredConstitution = useMemo(() => {
        if (!searchTerm) return constitutionData;
        return constitutionData.map(article => ({
            ...article,
            sections: article.sections.filter(section => 
                section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                section.clauses.some(c => c.text.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        })).filter(article => 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            article.sections.length > 0
        );
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-nobel-cream relative flex flex-col md:flex-row overflow-x-hidden selection:bg-nobel-gold selection:text-white">
            {/* Navigation Sidebar: Archival Registry Style */}
            <aside className="w-full md:w-80 bg-ui-blue border-r border-white/5 h-screen md:sticky top-0 z-40 flex flex-col pt-32 shadow-2xl">
                <div className="px-8 mb-8">
                    <div className="flex items-center gap-3 text-nobel-gold mb-6">
                        <Scale size={20} />
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em]">Index Protocol</h2>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input 
                            type="text" 
                            placeholder="Locate Section..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-[9px] text-white font-bold uppercase tracking-widest focus:border-nobel-gold outline-none transition-all rounded-none"
                        />
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 pb-12 space-y-1 custom-scrollbar">
                    {constitutionData.map((article) => (
                        <button 
                            key={article.id}
                            onClick={() => setActiveArticle(article.id)}
                            className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-l-2 ${activeArticle === article.id ? 'bg-white/10 text-nobel-gold border-nobel-gold' : 'text-white/40 border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            Article {article.id}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5 bg-black/20 mt-auto">
                    <button 
                        onClick={() => setShowGlossary(true)}
                        className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-nobel-gold hover:text-white transition-colors"
                    >
                        <span>Interactive Glossary</span>
                        <Book size={14} />
                    </button>
                </div>
            </aside>

            {/* Main Reading Canvas */}
            <main className="flex-1 min-h-screen pt-32 pb-40 px-6 md:px-12 lg:px-24 max-w-5xl">
                <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b-2 border-slate-200 pb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Star className="text-nobel-gold" size={18} fill="currentColor" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-400">Supreme Charter v2024</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif text-ui-blue leading-none">
                            The <br/> <span className="italic text-slate-300">Constitution</span>
                        </h1>
                    </div>
                    
                    <button 
                        onClick={() => window.print()}
                        className="px-8 py-4 bg-ui-blue text-white flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-nobel-gold hover:text-ui-blue transition-all shadow-2xl rounded-none"
                    >
                        <Download size={14} /> Archival Export
                    </button>
                </div>

                <div className="space-y-32">
                    {filteredConstitution
                        .filter(article => article.id === activeArticle || searchTerm)
                        .map((article) => (
                            <motion.div 
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="article-container"
                            >
                                {/* Law Article Header (Style Guide) */}
                                <div className="text-center border-b-4 border-ui-blue pb-10 mb-20">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.8em] text-slate-400 mb-4">Legislative Protocol</div>
                                    <h2 className="font-serif text-5xl md:text-7xl text-ui-blue italic">Article {article.id}</h2>
                                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.4em] text-nobel-gold">{article.title}</p>
                                </div>

                                <div className="space-y-24">
                                    {article.sections.map((section) => (
                                        <div key={section.id} className="section-block">
                                            <div className="flex items-center gap-6 mb-12">
                                                <div className="h-px flex-1 bg-slate-200"></div>
                                                <h4 className="font-serif text-2xl text-ui-blue italic px-6 uppercase tracking-tighter">
                                                    Section {section.id.split('.')[1]}: {section.title}
                                                </h4>
                                                <div className="h-px flex-1 bg-slate-200"></div>
                                            </div>
                                            
                                            <div className="space-y-12">
                                                {section.clauses.map((clause) => (
                                                    <div key={clause.id} className="relative group">
                                                        {/* Constitutional Clause (Style Guide) */}
                                                        <div className="p-8 md:p-12 bg-white border border-slate-200 border-l-8 border-l-nobel-gold shadow-sm hover:shadow-xl transition-all group-hover:-translate-y-1 duration-500">
                                                            <div className="flex gap-8">
                                                                <span className="font-mono text-[11px] font-bold text-nobel-gold pt-1">({clause.id.split('.')[2]})</span>
                                                                <div className="space-y-6 flex-1">
                                                                    <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-light italic serif-font">
                                                                        "{clause.text}"
                                                                    </p>
                                                                    
                                                                    <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-50">
                                                                        {clause.annotation && (
                                                                            <button 
                                                                                onClick={() => setSelectedClause(clause)}
                                                                                className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-ui-blue hover:text-nobel-gold transition-colors"
                                                                            >
                                                                                <Info size={12} /> Interpretative Annotation
                                                                            </button>
                                                                        )}
                                                                        <button className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-300 hover:text-ui-blue transition-colors">
                                                                            <Bookmark size={12} /> Cite Clause
                                                                        </button>
                                                                        {clause.historicalNote && (
                                                                            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                                                                                <History size={12} /> Record Available
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                    ))}
                </div>
            </main>

            {/* Glossary Side Drawer */}
            <AnimatePresence>
                {showGlossary && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 40, stiffness: 400 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-ui-blue shadow-[-40px_0_80px_rgba(0,0,0,0.4)] z-[150] flex flex-col"
                    >
                        <div className="p-12 border-b border-white/5 flex justify-between items-center bg-black/10">
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-nobel-gold mb-2">Registry</h3>
                                <h4 className="font-serif text-3xl text-white italic">Legislative Glossary</h4>
                            </div>
                            <button onClick={() => setShowGlossary(false)} className="text-white/20 hover:text-white transition-colors p-2">
                                <X size={32} strokeWidth={1} />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                            {glossaryTerms.map((g, i) => (
                                <div key={i} className="group border-b border-white/5 pb-8">
                                    <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-nobel-gold mb-4 group-hover:text-white transition-colors">{g.term}</h4>
                                    <p className="text-white/60 text-lg leading-relaxed font-light italic serif-font">{g.definition}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-black/20 text-[9px] font-bold text-white/20 uppercase tracking-widest text-center">
                            Official Legal Index • UISU Archive Unit
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Annotation Popover */}
            <AnimatePresence>
                {selectedClause && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-ui-blue/80 backdrop-blur-md" onClick={() => setSelectedClause(null)}>
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden rounded-none"
                        >
                            <div className="h-2 bg-nobel-gold"></div>
                            <div className="p-12">
                                <div className="flex items-center gap-3 text-nobel-gold mb-8 text-[10px] font-bold uppercase tracking-[0.4em]">
                                    <Gavel size={16} /> Official Interpretation
                                </div>
                                <h4 className="font-serif text-3xl text-ui-blue mb-6 leading-tight italic">Context of Clause {selectedClause.id}</h4>
                                <p className="text-xl text-slate-700 leading-relaxed font-light italic mb-12 serif-font">
                                    "{selectedClause.annotation}"
                                </p>
                                {selectedClause.historicalNote && (
                                    <div className="mb-12 p-6 bg-slate-50 border-l-4 border-ui-blue flex items-start gap-4">
                                        <History size={20} className="text-ui-blue mt-1" />
                                        <div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Archival Note</div>
                                            <p className="text-sm text-slate-600 font-medium">{selectedClause.historicalNote}</p>
                                        </div>
                                    </div>
                                )}
                                <button 
                                    onClick={() => setSelectedClause(null)}
                                    className="w-full py-5 bg-ui-blue text-white font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-nobel-gold hover:text-ui-blue transition-all"
                                >
                                    Record Acknowledged
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};