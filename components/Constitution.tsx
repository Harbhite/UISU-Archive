
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
    ArrowLeft, Scale, BookOpen, Search, ChevronDown, ChevronRight, 
    Star, Bookmark, Share2, Printer, Download, Hash, Clock, 
    Scroll, Feather, Shield, FileText, AlertTriangle, CheckCircle,
    Users, Gavel, Building, Vote, MessageSquare, X, Copy, Check
} from 'lucide-react';

interface ConstitutionProps {
    onBack: () => void;
}

interface Article {
    id: string;
    number: string;
    title: string;
    shortTitle: string;
    icon: React.ReactNode;
    preamble?: string;
    sections: Section[];
    isAmended?: boolean;
    amendmentYear?: number;
}

interface Section {
    id: string;
    number: string;
    title: string;
    content: string;
    subsections?: Subsection[];
}

interface Subsection {
    id: string;
    letter: string;
    content: string;
}

const constitutionArticles: Article[] = [
    {
        id: 'art-1',
        number: 'I',
        title: 'Name, Establishment & Objectives',
        shortTitle: 'Foundation',
        icon: <Building size={24} />,
        preamble: 'Establishing the sovereign authority of the students of the University of Ibadan.',
        sections: [
            {
                id: 's1-1',
                number: '1',
                title: 'Name of the Union',
                content: 'The name of this organization shall be the University of Ibadan Students\' Union, hereinafter referred to as "The Union" or "UISU".',
            },
            {
                id: 's1-2',
                number: '2',
                title: 'Establishment',
                content: 'The Union is hereby established as the sole representative body for all registered students of the University of Ibadan.',
            },
            {
                id: 's1-3',
                number: '3',
                title: 'Objectives',
                content: 'The objectives of the Union shall be:',
                subsections: [
                    { id: 'ss1-3a', letter: 'a', content: 'To promote and protect the welfare and academic interests of all students.' },
                    { id: 'ss1-3b', letter: 'b', content: 'To serve as the official voice of students in all matters concerning their education and welfare.' },
                    { id: 'ss1-3c', letter: 'c', content: 'To foster unity, cooperation, and understanding among students.' },
                    { id: 'ss1-3d', letter: 'd', content: 'To promote intellectual discourse, cultural activities, and social development.' },
                    { id: 'ss1-3e', letter: 'e', content: 'To maintain the proud tradition of intellectual unionism.' },
                ]
            }
        ]
    },
    {
        id: 'art-2',
        number: 'II',
        title: 'Membership & Rights',
        shortTitle: 'Membership',
        icon: <Users size={24} />,
        preamble: 'Defining who constitutes a Uite and the rights attached thereto.',
        sections: [
            {
                id: 's2-1',
                number: '1',
                title: 'Membership',
                content: 'Every student duly registered with the University of Ibadan shall automatically become a member of the Union upon payment of all requisite dues.',
            },
            {
                id: 's2-2',
                number: '2',
                title: 'Rights of Members',
                content: 'Every member shall have the right to:',
                subsections: [
                    { id: 'ss2-2a', letter: 'a', content: 'Vote and be voted for in any Union election.' },
                    { id: 'ss2-2b', letter: 'b', content: 'Participate in all Union activities and programs.' },
                    { id: 'ss2-2c', letter: 'c', content: 'Access Union facilities and services.' },
                    { id: 'ss2-2d', letter: 'd', content: 'Freedom of speech and expression within the Union.' },
                    { id: 'ss2-2e', letter: 'e', content: 'Fair hearing before any disciplinary body.' },
                ]
            },
            {
                id: 's2-3',
                number: '3',
                title: 'Duties of Members',
                content: 'Every member shall be bound by the provisions of this Constitution and shall conduct themselves in a manner befitting the prestigious status of a Uite.',
            }
        ]
    },
    {
        id: 'art-3',
        number: 'III',
        title: 'The Central Executive Council',
        shortTitle: 'Executive',
        icon: <Shield size={24} />,
        preamble: 'The executive arm charged with the administration of Union affairs.',
        isAmended: true,
        amendmentYear: 2019,
        sections: [
            {
                id: 's3-1',
                number: '1',
                title: 'Composition',
                content: 'The Central Executive Council (CEC) shall consist of the President, Vice President, General Secretary, Assistant General Secretary, Treasurer, House Secretary, Public Relations Officer, and Sports Secretary.',
            },
            {
                id: 's3-2',
                number: '2',
                title: 'The President',
                content: 'The President shall be the Chief Executive Officer of the Union, responsible for the general administration and the execution of policies. The President shall:',
                subsections: [
                    { id: 'ss3-2a', letter: 'a', content: 'Preside over all meetings of the CEC and Congress.' },
                    { id: 'ss3-2b', letter: 'b', content: 'Represent the Union in all capacities.' },
                    { id: 'ss3-2c', letter: 'c', content: 'Be the chief signatory to all Union accounts.' },
                    { id: 'ss3-2d', letter: 'd', content: 'Appoint ad-hoc committee members subject to SRC approval.' },
                ]
            },
            {
                id: 's3-3',
                number: '3',
                title: 'Tenure of Office',
                content: 'The tenure of the CEC shall be one academic session, and no member shall serve more than two consecutive terms in the same office.',
            },
            {
                id: 's3-4',
                number: '4',
                title: 'Qualification',
                content: 'Any candidate for the CEC must be a registered student who has spent at least one academic session in the University and is in good academic standing.',
            }
        ]
    },
    {
        id: 'art-4',
        number: 'IV',
        title: 'The Students\' Representative Council',
        shortTitle: 'Legislature',
        icon: <Gavel size={24} />,
        preamble: 'The supreme legislative body of the Union, vested with the power of law-making.',
        sections: [
            {
                id: 's4-1',
                number: '1',
                title: 'Composition',
                content: 'The Students\' Representative Council (SRC) shall consist of elected representatives from all Halls of Residence and Faculty Constituencies.',
            },
            {
                id: 's4-2',
                number: '2',
                title: 'Principal Officers',
                content: 'The Principal Officers of the SRC shall be the Speaker, Deputy Speaker, and Clerk of the House, elected from among its members.',
            },
            {
                id: 's4-3',
                number: '3',
                title: 'Powers of the SRC',
                content: 'The SRC shall have the power to:',
                subsections: [
                    { id: 'ss4-3a', letter: 'a', content: 'Make bye-laws for the governance of the Union.' },
                    { id: 'ss4-3b', letter: 'b', content: 'Approve the annual budget of the Union.' },
                    { id: 'ss4-3c', letter: 'c', content: 'Exercise oversight functions over the CEC.' },
                    { id: 'ss4-3d', letter: 'd', content: 'Impeach any officer of the Union for gross misconduct.' },
                    { id: 'ss4-3e', letter: 'e', content: 'Confirm appointments made by the President.' },
                ]
            },
            {
                id: 's4-4',
                number: '4',
                title: 'Quorum',
                content: 'Two-thirds of the total membership of the SRC shall constitute a quorum for the transaction of business.',
            }
        ]
    },
    {
        id: 'art-5',
        number: 'V',
        title: 'The Judicial Council',
        shortTitle: 'Judiciary',
        icon: <Scale size={24} />,
        preamble: 'The interpreter and guardian of the Constitution, ensuring justice for all Uites.',
        isAmended: true,
        amendmentYear: 2023,
        sections: [
            {
                id: 's5-1',
                number: '1',
                title: 'Establishment',
                content: 'There shall be a Judicial Council of the Union which shall be the final arbiter on all constitutional matters.',
            },
            {
                id: 's5-2',
                number: '2',
                title: 'Composition',
                content: 'The Judicial Council shall consist of a Chief Justice, a Registrar, and five Justices appointed by the President on the recommendation of the SRC.',
            },
            {
                id: 's5-3',
                number: '3',
                title: 'Jurisdiction',
                content: 'The Judicial Council shall have original jurisdiction in:',
                subsections: [
                    { id: 'ss5-3a', letter: 'a', content: 'Interpretation of this Constitution.' },
                    { id: 'ss5-3b', letter: 'b', content: 'Disputes between organs of the Union.' },
                    { id: 'ss5-3c', letter: 'c', content: 'Electoral petitions.' },
                    { id: 'ss5-3d', letter: 'd', content: 'Disciplinary matters referred to it.' },
                ]
            }
        ]
    },
    {
        id: 'art-6',
        number: 'VI',
        title: 'Elections & Electoral Process',
        shortTitle: 'Elections',
        icon: <Vote size={24} />,
        preamble: 'Ensuring free, fair, and credible elections for the peaceful transfer of power.',
        sections: [
            {
                id: 's6-1',
                number: '1',
                title: 'Electoral Commission',
                content: 'There shall be an independent Electoral Commission responsible for the conduct of all Union elections.',
            },
            {
                id: 's6-2',
                number: '2',
                title: 'Election Timeline',
                content: 'General elections shall be held annually in the second semester, not later than eight weeks before the end of the academic session.',
            },
            {
                id: 's6-3',
                number: '3',
                title: 'Voting Rights',
                content: 'Every financial member of the Union shall be entitled to vote. Voting shall be by secret ballot.',
            }
        ]
    },
    {
        id: 'art-7',
        number: 'VII',
        title: 'Finance & Accountability',
        shortTitle: 'Finance',
        icon: <FileText size={24} />,
        preamble: 'Governing the management and transparency of Union funds.',
        sections: [
            {
                id: 's7-1',
                number: '1',
                title: 'Sources of Revenue',
                content: 'The revenue of the Union shall be derived from student dues, levies approved by Congress, donations, and income from Union ventures.',
            },
            {
                id: 's7-2',
                number: '2',
                title: 'Financial Management',
                content: 'All funds of the Union shall be kept in accounts with reputable financial institutions. The President and Treasurer shall be the principal signatories.',
            },
            {
                id: 's7-3',
                number: '3',
                title: 'Annual Audit',
                content: 'The accounts of the Union shall be audited annually by an independent auditor appointed by the SRC.',
            }
        ]
    },
    {
        id: 'art-8',
        number: 'VIII',
        title: 'Amendment of the Constitution',
        shortTitle: 'Amendments',
        icon: <Feather size={24} />,
        preamble: 'The process by which this sacred document may be altered.',
        sections: [
            {
                id: 's8-1',
                number: '1',
                title: 'Amendment Procedure',
                content: 'This Constitution may be amended by a two-thirds majority of the SRC, ratified by a simple majority in a Union-wide referendum.',
            },
            {
                id: 's8-2',
                number: '2',
                title: 'Entrenchment',
                content: 'Articles I, II (Section 2), and this Article VIII shall be entrenched and may only be amended through a Constitutional Convention.',
            }
        ]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ConstitutionPage: React.FC<ConstitutionProps> = ({ onBack }) => {
    const [activeArticle, setActiveArticle] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [bookmarkedSections, setBookmarkedSections] = useState<Set<string>>(new Set());
    const [showTableOfContents, setShowTableOfContents] = useState(true);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: scrollContainerRef });
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const toggleBookmark = (sectionId: string) => {
        setBookmarkedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const copyToClipboard = (text: string, sectionId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(sectionId);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const filteredArticles = constitutionArticles.filter(article => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            article.title.toLowerCase().includes(term) ||
            article.sections.some(s => 
                s.title.toLowerCase().includes(term) ||
                s.content.toLowerCase().includes(term) ||
                s.subsections?.some(ss => ss.content.toLowerCase().includes(term))
            )
        );
    });

    const scrollToArticle = (articleId: string) => {
        setActiveArticle(articleId);
        const element = document.getElementById(articleId);
        if (element && scrollContainerRef.current) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 relative">
            {/* Reading Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 h-1 bg-nobel-gold z-50"
                style={{ width: progressWidth }}
            />

            <div className="container mx-auto px-6">
                {/* Back Navigation */}
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors mb-12"
                >
                    <div className="p-2 rounded-full border border-slate-300 group-hover:border-nobel-gold transition-colors">
                        <ArrowLeft size={14} />
                    </div>
                    <span>Back to Home</span>
                </button>

                {/* Hero Section */}
                <div className="mb-20 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <Scroll className="text-nobel-gold w-6 h-6" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">The Supreme Law</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-serif text-ui-blue leading-[0.9]"
                    >
                        The <br/> <span className="italic text-slate-300">Constitution</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed font-light"
                    >
                        The fundamental charter governing the University of Ibadan Students' Union. 
                        First enacted in 1952, continuously refined through democratic process.
                    </motion.p>

                    {/* Constitution Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                    >
                        {[
                            { label: 'Articles', value: '8', icon: <BookOpen size={16} /> },
                            { label: 'Sections', value: '32', icon: <Hash size={16} /> },
                            { label: 'Last Amended', value: '2023', icon: <Clock size={16} /> },
                            { label: 'Active Since', value: '1952', icon: <Star size={16} /> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 border border-slate-200 group hover:border-nobel-gold transition-colors">
                                <div className="flex items-center gap-2 text-slate-400 mb-2">
                                    {stat.icon}
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                                </div>
                                <div className="text-3xl font-serif text-ui-blue group-hover:text-nobel-gold transition-colors">{stat.value}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Search & Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-200">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            type="text"
                            placeholder="Search articles, sections, keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 focus:border-nobel-gold focus:outline-none transition-colors text-sm"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowTableOfContents(!showTableOfContents)}
                            className={`flex items-center gap-2 px-4 py-3 border text-xs font-bold uppercase tracking-widest transition-all ${showTableOfContents ? 'border-nobel-gold text-nobel-gold bg-nobel-gold/5' : 'border-slate-200 text-slate-500 hover:border-slate-400'}`}
                        >
                            <BookOpen size={14} /> Contents
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 text-slate-500 hover:border-slate-400 text-xs font-bold uppercase tracking-widest transition-all">
                            <Printer size={14} /> Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 text-slate-500 hover:border-slate-400 text-xs font-bold uppercase tracking-widest transition-all">
                            <Download size={14} /> PDF
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Table of Contents Sidebar */}
                    <AnimatePresence>
                        {showTableOfContents && (
                            <motion.aside
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="lg:col-span-3"
                            >
                                <div className="sticky top-40 bg-white border border-slate-200 p-6 max-h-[70vh] overflow-y-auto">
                                    <h3 className="font-serif text-lg text-ui-blue mb-6 flex items-center gap-2">
                                        <Scroll size={18} className="text-nobel-gold" />
                                        Table of Contents
                                    </h3>
                                    <nav className="space-y-1">
                                        {constitutionArticles.map((article) => (
                                            <button
                                                key={article.id}
                                                onClick={() => scrollToArticle(article.id)}
                                                className={`w-full text-left p-3 group transition-all ${activeArticle === article.id ? 'bg-ui-blue text-white' : 'hover:bg-slate-50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-bold ${activeArticle === article.id ? 'text-nobel-gold' : 'text-slate-400'}`}>
                                                        Art. {article.number}
                                                    </span>
                                                    <span className={`text-sm font-medium ${activeArticle === article.id ? 'text-white' : 'text-slate-700 group-hover:text-ui-blue'}`}>
                                                        {article.shortTitle}
                                                    </span>
                                                </div>
                                                {article.isAmended && (
                                                    <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-nobel-gold/20 text-nobel-gold rounded-sm">
                                                        Amended {article.amendmentYear}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Bookmarks Section */}
                                    {bookmarkedSections.size > 0 && (
                                        <div className="mt-8 pt-6 border-t border-slate-200">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                                <Bookmark size={12} /> Your Bookmarks
                                            </h4>
                                            <div className="space-y-2">
                                                {Array.from(bookmarkedSections).map(sectionId => {
                                                    const [articleId, sectionNum] = sectionId.split('-s');
                                                    const article = constitutionArticles.find(a => a.id === `art-${articleId.replace('art-', '')}`);
                                                    const section = article?.sections.find(s => s.id === sectionId);
                                                    if (!section) return null;
                                                    return (
                                                        <div key={sectionId} className="text-xs text-slate-600 flex items-center gap-2">
                                                            <Star size={10} className="text-nobel-gold" fill="currentColor" />
                                                            {article?.number}.{section.number}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Articles Content */}
                    <div 
                        ref={scrollContainerRef}
                        className={`${showTableOfContents ? 'lg:col-span-9' : 'lg:col-span-12'}`}
                    >
                        {/* Preamble Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-ui-blue text-white p-10 md:p-14 mb-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                            <Scale className="absolute -bottom-10 -right-10 text-white/5" size={200} />
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Feather className="text-nobel-gold" size={24} />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Preamble</span>
                                </div>
                                <p className="font-serif text-2xl md:text-3xl leading-relaxed italic text-slate-200 mb-8">
                                    "We, the students of the University of Ibadan, in order to form a more perfect union, 
                                    promote the general welfare, and secure the blessings of education to ourselves and our posterity, 
                                    do ordain and establish this Constitution for the University of Ibadan Students' Union."
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-slate-400">Adopted:</span>
                                    <span className="font-bold text-nobel-gold">15th March, 1952</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Articles */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {filteredArticles.map((article, articleIndex) => (
                                <motion.article 
                                    key={article.id}
                                    id={article.id}
                                    variants={itemVariants}
                                    className="bg-white border border-slate-200 overflow-hidden group"
                                >
                                    {/* Article Header */}
                                    <div 
                                        className="p-8 md:p-10 border-b border-slate-100 cursor-pointer"
                                        onClick={() => setActiveArticle(activeArticle === article.id ? null : article.id)}
                                    >
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="flex items-start gap-6">
                                                <div className="w-16 h-16 bg-ui-blue text-nobel-gold flex items-center justify-center shrink-0">
                                                    {article.icon}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                                            Article {article.number}
                                                        </span>
                                                        {article.isAmended && (
                                                            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-amber-50 text-amber-600 border border-amber-200">
                                                                <AlertTriangle size={10} /> Amended {article.amendmentYear}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h2 className="font-serif text-2xl md:text-3xl text-ui-blue group-hover:text-nobel-gold transition-colors">
                                                        {article.title}
                                                    </h2>
                                                    {article.preamble && (
                                                        <p className="mt-3 text-slate-500 font-light italic">
                                                            {article.preamble}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: activeArticle === article.id ? 180 : 0 }}
                                                className="w-10 h-10 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400"
                                            >
                                                <ChevronDown size={20} />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Article Sections */}
                                    <AnimatePresence>
                                        {activeArticle === article.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-8 md:p-10 pt-0 space-y-6">
                                                    {article.sections.map((section, sectionIndex) => (
                                                        <div 
                                                            key={section.id}
                                                            className="border-l-4 border-slate-100 hover:border-nobel-gold pl-6 py-4 transition-colors group/section"
                                                        >
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <span className="text-xs font-bold text-nobel-gold">
                                                                            § {article.number}.{section.number}
                                                                        </span>
                                                                        <h3 className="font-serif text-lg text-ui-blue">
                                                                            {section.title}
                                                                        </h3>
                                                                    </div>
                                                                    <p className="text-slate-600 leading-relaxed">
                                                                        {section.content}
                                                                    </p>

                                                                    {/* Subsections */}
                                                                    {section.subsections && section.subsections.length > 0 && (
                                                                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-slate-100">
                                                                            {section.subsections.map((sub) => (
                                                                                <div key={sub.id} className="flex gap-3">
                                                                                    <span className="text-xs font-bold text-slate-400 mt-1">
                                                                                        ({sub.letter})
                                                                                    </span>
                                                                                    <p className="text-slate-600 text-sm leading-relaxed">
                                                                                        {sub.content}
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Section Actions */}
                                                                <div className="flex items-center gap-2 opacity-0 group-hover/section:opacity-100 transition-opacity">
                                                                    <button 
                                                                        onClick={() => toggleBookmark(section.id)}
                                                                        className={`p-2 transition-colors ${bookmarkedSections.has(section.id) ? 'text-nobel-gold' : 'text-slate-300 hover:text-slate-500'}`}
                                                                        title="Bookmark"
                                                                    >
                                                                        <Bookmark size={16} fill={bookmarkedSections.has(section.id) ? 'currentColor' : 'none'} />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => copyToClipboard(section.content, section.id)}
                                                                        className="p-2 text-slate-300 hover:text-slate-500 transition-colors"
                                                                        title="Copy"
                                                                    >
                                                                        {copiedSection === section.id ? (
                                                                            <Check size={16} className="text-green-500" />
                                                                        ) : (
                                                                            <Copy size={16} />
                                                                        )}
                                                                    </button>
                                                                    <button 
                                                                        className="p-2 text-slate-300 hover:text-slate-500 transition-colors"
                                                                        title="Share"
                                                                    >
                                                                        <Share2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.article>
                            ))}
                        </motion.div>

                        {/* No Results */}
                        {filteredArticles.length === 0 && (
                            <div className="text-center py-20 bg-white border border-dashed border-slate-300">
                                <Search className="mx-auto text-slate-300 mb-4" size={48} />
                                <p className="font-serif text-xl text-slate-500">No articles match your search.</p>
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 text-sm text-nobel-gold hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}

                        {/* Footer Note */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-16 p-8 bg-slate-100 border-l-4 border-nobel-gold"
                        >
                            <div className="flex items-start gap-4">
                                <CheckCircle className="text-nobel-gold shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-serif text-lg text-ui-blue mb-2">Official Document</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        This is the official digital version of the UISU Constitution as amended in 2023. 
                                        For legal purposes, the signed physical copy held in the Union Secretariat remains 
                                        the authoritative version. Questions regarding interpretation should be directed to 
                                        the Judicial Council.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
