/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Calendar, Users, ChevronDown, ChevronUp, User, Star, Filter, SortAsc, SortDesc } from 'lucide-react';

interface PastLeadersProps {
  onBack: () => void;
}

interface ExecutiveMember {
    role: string;
    name: string;
    alias?: string;
}

interface Administration {
    session: string;
    president: string;
    alias: string;
    motto: string;
    notableEvents: string;
    status: 'Completed' | 'Suspended' | 'Impeached' | 'Active';
    team: ExecutiveMember[];
}

const administrations: Administration[] = [
    {
        session: "2024/2025",
        president: "Aweda Bolaji",
        alias: "Oloye",
        motto: "Team Inclusive",
        notableEvents: "Current administration focusing on inclusivity, digital ID cards, and student welfare amid rising economic costs.",
        status: "Active",
        team: [
            { role: "Vice President", name: "Bolutife", alias: "Abderry" },
            { role: "General Secretary", name: "Ogundipo", alias: "Global" },
            { role: "Asst. Gen. Sec", name: "Elemide Daniel" },
            { role: "House Secretary", name: "Tunde-Ipaye" },
            { role: "Public Relations Officer", name: "Adetona" },
            { role: "Treasurer", name: "Hassan" },
            { role: "Sports Secretary", name: "Olatunji" }
        ]
    },
    {
        session: "2023/2024",
        president: "Samuel Samson Tobiloba",
        alias: "Host",
        motto: "Team Reform",
        notableEvents: "Focused on reforming union processes, constitutional review, and digitalizing the secretariat.",
        status: "Completed",
        team: [
            { role: "Vice President", name: "Ogunsesan Nafisat" },
            { role: "General Secretary", name: "Salami Olufisayo" },
            { role: "Asst. Gen. Sec", name: "Oluwole Ayomide" },
            { role: "House Secretary", name: "Sanjay" },
            { role: "Public Relations Officer", name: "Adeona Tosin" },
            { role: "Treasurer", name: "Busari" },
            { role: "Sports Secretary", name: "Josh" }
        ]
    },
    {
        session: "2021/2022",
        president: "Adewole Adeyinka",
        alias: "Mascot",
        motto: "Team Restoration",
        notableEvents: "Restored the union after a long period of suspension and caretaker committees. Rebuilt student confidence.",
        status: "Completed",
        team: [
            { role: "Vice President", name: "Zainab" },
            { role: "General Secretary", name: "Bamidele Taiwo" },
            { role: "Asst. Gen. Sec", name: "Federal" },
            { role: "House Secretary", name: "Michael" },
            { role: "Public Relations Officer", name: "Jagaban" },
            { role: "Treasurer", name: "Daniel" },
            { role: "Sports Secretary", name: "Felix" }
        ]
    },
    {
        session: "2019/2020",
        president: "Akeju Olusegun",
        alias: "Akeju",
        motto: "Unification",
        notableEvents: "Managed student affairs during the COVID-19 pandemic transition and ASUU strikes.",
        status: "Completed",
        team: [
            { role: "Vice President", name: "Oloyede" },
            { role: "General Secretary", name: "Mustapha" },
            { role: "Public Relations Officer", name: "Ajao" },
            { role: "House Secretary", name: "Elijah" },
            { role: "Sports Secretary", name: "Coach" }
        ]
    },
    {
        session: "2017/2018",
        president: "Ojo Aderemi",
        alias: "Patriotic Intelligentsia",
        motto: "Patriotic Intelligentsia",
        notableEvents: "Historically suspended for leading a protest against ID card fees. Delivered the famous 'Book of Life' budget speech.",
        status: "Suspended",
        team: [
            { role: "Vice President", name: "Oluwafunke" },
            { role: "General Secretary", name: "Iyanuoluwa" },
            { role: "Asst. Gen. Sec", name: "Nifemi" },
            { role: "House Secretary", name: "Pascal", alias: "P. Manager" },
            { role: "Public Relations Officer", name: "Adebayo" },
            { role: "Treasurer", name: "Ajibola" },
            { role: "Sports Secretary", name: "Sporty" }
        ]
    },
    {
        session: "1994/1995",
        president: "Sowore Omoyele",
        alias: "Sowore",
        motto: "Anti-Military",
        notableEvents: "Led fierce anti-military protests during the Abacha regime. Expelled/Suspended multiple times.",
        status: "Suspended",
        team: [
             { role: "Movement", name: "Student Activists Collective" }
        ]
    },
    {
        session: "1978/1979",
        president: "Segun Okeowo",
        alias: "Okeowo",
        motto: "Ali Must Go",
        notableEvents: "Led the nationwide 'Ali Must Go' protests against the commercialization of education.",
        status: "Impeached",
        team: [
            { role: "General Secretary", name: "Comrade Arogundade" },
            { role: "PRO", name: "Comrade Labinjo" }
        ]
    }
];

export const PastLeadersPage: React.FC<PastLeadersProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortBy, setSortBy] = useState<'session' | 'president'>('session');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Suspended' | 'Impeached' | 'Active'>('All');

  const filteredAdmins = administrations
    .filter(admin => {
        const matchesSearch = admin.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.session.includes(searchTerm) ||
            admin.alias.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || admin.status === statusFilter;
        return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'session') {
            // Sort by session string (e.g., "2024/2025")
            return a.session.localeCompare(b.session) * factor;
        } else {
            // Sort by president name
            return a.president.localeCompare(b.president) * factor;
        }
    });

  const toggleExpand = (session: string) => {
      setExpandedId(expandedId === session ? null : session);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
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

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-12">
            <div>
                <div className="flex items-center gap-4 mb-4">
                   <Star className="text-nobel-gold w-6 h-6" fill="currentColor" />
                   <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Hall of Fame</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-serif text-ui-blue leading-[0.9]">
                    Executive <br/> <span className="italic text-slate-300">Archive</span>
                </h1>
            </div>
            
            <motion.div 
                className="relative w-full md:w-96"
                animate={{ scale: isSearchFocused ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <input 
                    type="text" 
                    placeholder="Search leaders or years..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-4 pr-12 py-4 bg-white border-b-2 border-slate-200 focus:border-nobel-gold focus:outline-none text-slate-900 placeholder-slate-400 text-lg font-serif transition-colors shadow-sm focus:shadow-md"
                />
                <Search className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-nobel-gold' : 'text-slate-400'}`} size={20} />
            </motion.div>
        </div>

        {/* Sorting & Filtering Controls */}
        <div className="flex flex-wrap items-center gap-8 mb-12 py-6 border-y border-slate-200">
            <div className="flex items-center gap-3">
                <Filter size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status:</span>
                <div className="flex gap-2">
                    {['All', 'Active', 'Completed', 'Suspended'].map((s) => (
                        <button 
                            key={s} 
                            onClick={() => setStatusFilter(s as any)}
                            className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest border transition-all ${statusFilter === s ? 'bg-ui-blue text-white border-ui-blue' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <SortAsc size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sort By:</span>
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ui-blue outline-none cursor-pointer hover:border-nobel-gold transition-colors"
                >
                    <option value="session">Session</option>
                    <option value="president">President Name</option>
                </select>
                <button 
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 hover:border-nobel-gold rounded transition-all text-ui-blue group"
                    title={sortOrder === 'asc' ? "Ascending" : "Descending"}
                >
                    {sortOrder === 'asc' ? <SortAsc size={16} className="group-hover:text-nobel-gold" /> : <SortDesc size={16} className="group-hover:text-nobel-gold" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-nobel-gold">{sortOrder === 'asc' ? 'ASC' : 'DESC'}</span>
                </button>
            </div>
        </div>

        <div className="flex flex-col gap-6">
            {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin, index) => (
                    <motion.div 
                        key={admin.session}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white group relative overflow-hidden border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-500 rounded-sm"
                    >
                        <div className={`absolute left-0 top-0 h-full w-1 transition-colors duration-300 ${expandedId === admin.session ? 'bg-nobel-gold' : 'bg-slate-100 group-hover:bg-nobel-gold/50'}`}></div>

                        <div className="p-8 cursor-pointer" onClick={() => toggleExpand(admin.session)}>
                            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                                <div className="min-w-[120px]">
                                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">Session</div>
                                    <div className="font-serif text-2xl text-ui-blue">{admin.session}</div>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-3 mb-2">
                                        <h3 className="font-serif text-3xl text-ui-blue">{admin.president}</h3>
                                        <span className="text-sm font-bold tracking-widest uppercase text-nobel-gold">"{admin.alias}"</span>
                                    </div>
                                    <p className="text-slate-500 leading-relaxed max-w-2xl font-light">{admin.notableEvents}</p>
                                </div>

                                <div className="min-w-[160px] flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-4">
                                    <StatusBadge status={admin.status} />
                                    
                                    <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">
                                        {expandedId === admin.session ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <AnimatePresence>
                            {expandedId === admin.session && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-slate-50"
                                >
                                    <div className="p-8 border-t border-slate-100 ml-1">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <Users size={14} /> The Executive Council
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            {admin.team.map((member, idx) => (
                                                <div key={idx} className="bg-white p-6 border border-slate-100 hover:border-slate-300 transition-colors">
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{member.role}</div>
                                                    <div className="font-serif text-lg text-ui-blue">{member.name}</div>
                                                    {member.alias && <div className="text-xs text-nobel-gold mt-1 italic">"{member.alias}"</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))
            ) : (
                <div className="py-20 text-center text-slate-400">
                    <p className="font-serif text-xl italic">No records found for "{searchTerm}"</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
    let styles = "bg-slate-100 text-slate-500";
    if (status === 'Active') styles = "bg-green-50 text-green-700 border-green-100";
    if (status === 'Suspended') styles = "bg-red-50 text-red-700 border-red-100";
    if (status === 'Impeached') styles = "bg-orange-50 text-orange-700 border-orange-100";

    return (
        <motion.span 
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles} inline-block`}
        >
            {status}
        </motion.span>
    )
}