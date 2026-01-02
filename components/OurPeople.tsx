
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Star, Shield, Gavel, GraduationCap, Users, Search, Filter, Mail, Linkedin, Twitter, X, ChevronRight, MapPin, Fingerprint } from 'lucide-react';

interface Person {
    id: string;
    name: string;
    role: string;
    constituency?: string;
    category: 'CEC' | 'SRC' | 'Judiciary';
    isPrincipal?: boolean;
    isMajorityLeader?: boolean;
    image?: string;
    bio?: string;
}

const currentPeople: Person[] = [
    // CEC (Executives)
    { id: 'cec-1', name: 'Aweda Bolaji', role: 'Union President', category: 'CEC', isPrincipal: true, bio: "A dedicated advocate for student welfare and intellectual unionism, leading the 2024/2025 administration with transparency and vigor." },
    { id: 'cec-2', name: 'Bolutife (Abderry)', role: 'Vice President', category: 'CEC', isPrincipal: true, bio: "Focusing on academic excellence and ensuring the diverse needs of Uites are met through collaborative policy-making." },
    { id: 'cec-3', name: 'Ogundipo (Global)', role: 'General Secretary', category: 'CEC', isPrincipal: true, bio: "The administrative engine of the union, committed to digitizing records and streamlining communication." },
    { id: 'cec-4', name: 'Elemide Daniel', role: 'Asst. General Secretary', category: 'CEC' },
    { id: 'cec-5', name: 'Tunde-Ipaye', role: 'House Secretary', category: 'CEC' },
    { id: 'cec-6', name: 'Adetona', role: 'Public Relations Officer', category: 'CEC' },
    { id: 'cec-7', name: 'Hassan', role: 'Treasurer', category: 'CEC' },
    { id: 'cec-8', name: 'Olatunji', role: 'Sports Secretary', category: 'CEC' },

    // SRC Principal Officers
    { id: 'src-1', name: 'Rt. Hon. Busari', role: 'Speaker of the House', constituency: 'Independence Hall', category: 'SRC', isPrincipal: true, bio: "Presiding over the sacred chambers of the SRC with impartiality and a deep respect for the union's constitution." },
    { id: 'src-2', name: 'Hon. Adeniyi', role: 'Deputy Speaker', constituency: 'Mellamby Hall', category: 'SRC', isPrincipal: true },
    { id: 'src-3', name: 'Hon. Oluwatobi', role: 'Clerk of the House', constituency: 'Kuti Hall', category: 'SRC', isPrincipal: true },
    
    // Majority Leaders
    { id: 'src-ml-1', name: 'Hon. Adeola', role: 'Majority Leader', constituency: 'Faculty of Arts', category: 'SRC', isMajorityLeader: true },
    { id: 'src-ml-2', name: 'Hon. Chinedu', role: 'Chief Whip', constituency: 'Faculty of Science', category: 'SRC', isMajorityLeader: true },

    // Honourable Members
    { id: 'src-m-1', name: 'Hon. Funke', role: 'Honourable Member', constituency: 'Queen Idia Hall', category: 'SRC', bio: "A passionate representative focusing on female student empowerment and hall development projects." },
    { id: 'src-m-2', name: 'Hon. Ibrahim', role: 'Honourable Member', constituency: 'Sultan Bello Hall', category: 'SRC' },
    { id: 'src-m-3', name: 'Hon. Emeka', role: 'Honourable Member', constituency: 'Nnamdi Azikiwe Hall', category: 'SRC' },
    { id: 'src-m-4', name: 'Hon. Fatima', role: 'Honourable Member', constituency: 'Queen Elizabeth II Hall', category: 'SRC' },
    { id: 'src-m-5', name: 'Hon. Segun', role: 'Honourable Member', constituency: 'Lord Tedder Hall', category: 'SRC' },
    { id: 'src-m-6', name: 'Hon. Aisha', role: 'Honourable Member', constituency: 'Obafemi Awolowo Hall', category: 'SRC' },
    { id: 'src-m-7', name: 'Hon. Samuel', role: 'Honourable Member', constituency: 'Faculty of Law', category: 'SRC' },
    { id: 'src-m-8', name: 'Hon. Joy', role: 'Honourable Member', constituency: 'Faculty of Education', category: 'SRC' },
];

interface OurPeopleProps {
    onBack: () => void;
}

export const OurPeoplePage: React.FC<OurPeopleProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'All' | 'CEC' | 'SRC'>('All');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const filteredPeople = currentPeople.filter(person => {
        const matchesTab = activeTab === 'All' || person.category === activeTab;
        const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (person.constituency && person.constituency.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    const principals = filteredPeople.filter(p => p.isPrincipal);
    const majorityLeaders = filteredPeople.filter(p => p.isMajorityLeader);
    const others = filteredPeople.filter(p => !p.isPrincipal && !p.isMajorityLeader);

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-x-hidden">
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

                {/* Hero */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <Users className="text-nobel-gold w-6 h-6" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">The 2024/2025 Administration</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-ui-blue leading-[0.9] mb-6">
                        Our <br/> <span className="italic text-slate-300">People</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-light max-w-2xl">
                        The stewards of the "First and Best". Meet the men and women of character leading the intellectual vanguard.
                    </p>
                </div>

                {/* Search & Tabs */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-8 border-b border-slate-200">
                    <div className="flex gap-8">
                        {['All', 'CEC', 'SRC'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-4 text-sm font-bold tracking-widest uppercase relative transition-colors ${activeTab === tab ? 'text-ui-blue' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab === 'CEC' ? 'Executive (CEC)' : tab === 'SRC' ? 'Legislative (SRC)' : 'Everyone'}
                                {activeTab === tab && (
                                    <motion.div layoutId="people-tab" className="absolute bottom-0 left-0 w-full h-1 bg-nobel-gold" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name or constituency..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-none text-sm focus:outline-none focus:border-nobel-gold transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Grid Sections for Principals & Majority Leaders */}
                <div className="space-y-24 mb-32">
                    {/* Principal Officers */}
                    {principals.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="font-serif text-3xl text-ui-blue">Principal Officers</h2>
                                <div className="h-px flex-1 bg-slate-200"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {principals.map((p, i) => (
                                    <LeaderCard key={p.id} person={p} index={i} isLarge onClick={() => setSelectedPerson(p)} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Majority Leaders */}
                    {majorityLeaders.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="font-serif text-3xl text-ui-blue">Majority Leadership</h2>
                                <div className="h-px flex-1 bg-slate-200"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {majorityLeaders.map((p, i) => (
                                    <LeaderCard key={p.id} person={p} index={i} onClick={() => setSelectedPerson(p)} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* The Assembly - Unique Tabled List for Ordinary Members */}
                {others.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="font-serif text-3xl text-ui-blue">The Assembly</h2>
                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>
                        
                        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 bg-ui-blue text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <div className="col-span-1">Ref ID</div>
                                <div className="col-span-4">Name</div>
                                <div className="col-span-3">Constituency</div>
                                <div className="col-span-3">Role</div>
                                <div className="col-span-1 text-right">Details</div>
                            </div>
                            
                            {/* Table Rows */}
                            <div className="divide-y divide-slate-100">
                                {others.map((p, i) => (
                                    <motion.div 
                                        key={p.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setSelectedPerson(p)}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-slate-50 cursor-pointer transition-colors group relative"
                                    >
                                        {/* Row Decoration */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-nobel-gold transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                                        
                                        <div className="col-span-1 hidden md:block text-[10px] font-mono text-slate-300 font-bold">
                                            #{p.id.split('-')[2]}
                                        </div>
                                        <div className="col-span-1 md:col-span-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-ui-blue group-hover:text-white transition-colors duration-300">
                                                <User size={14} />
                                            </div>
                                            <span className="font-serif text-lg text-ui-blue group-hover:text-nobel-gold transition-colors">
                                                {p.name}
                                            </span>
                                        </div>
                                        <div className="col-span-1 md:col-span-3">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                <MapPin size={12} className="text-slate-200" />
                                                {p.constituency}
                                            </div>
                                        </div>
                                        <div className="col-span-1 md:col-span-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                                {p.role}
                                            </span>
                                        </div>
                                        <div className="col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight size={16} className="ml-auto text-nobel-gold" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {filteredPeople.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="font-serif text-xl text-slate-400 italic">No leaders found matching your search parameters.</p>
                    </div>
                )}
            </div>

            {/* Member Details Pop-up (Modal) */}
            <AnimatePresence>
                {selectedPerson && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPerson(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ui-blue/40 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-2xl relative shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-50 opacity-[0.03] pointer-events-none scale-[3]">
                                {selectedPerson.category === 'CEC' ? <Shield size={200} /> : <Gavel size={200} />}
                            </div>

                            {/* Header */}
                            <div className="bg-ui-blue p-10 md:p-14 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                <button 
                                    onClick={() => setSelectedPerson(null)}
                                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
                                >
                                    <X size={24} />
                                </button>
                                
                                <div className="relative z-10">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-nobel-gold mb-3">
                                        Verified Member Profile
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
                                        {selectedPerson.name}
                                    </h2>
                                    <div className="flex items-center gap-3 text-white/60 text-xs font-bold uppercase tracking-widest mt-6">
                                        <div className={`p-1.5 ${selectedPerson.category === 'CEC' ? 'bg-nobel-gold' : 'bg-slate-500'} text-white`}>
                                            {selectedPerson.category === 'CEC' ? <Shield size={12} /> : <Gavel size={12} />}
                                        </div>
                                        {selectedPerson.role}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-10 md:p-14">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-b border-slate-100 pb-12">
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Constituency</h4>
                                        <div className="font-serif text-xl text-ui-blue flex items-center gap-2">
                                            <GraduationCap size={18} className="text-nobel-gold" />
                                            {selectedPerson.constituency || 'Union Wide Executive'}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Branch of Government</h4>
                                        <div className="font-serif text-xl text-ui-blue">
                                            {selectedPerson.category === 'CEC' ? 'Central Executive Council' : 'Students\' Representative Council'}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Mandate & Bio</h4>
                                    <p className="text-lg text-slate-600 leading-relaxed font-light italic">
                                        "{selectedPerson.bio || "This representative is committed to the values of intellectual unionism and the collective welfare of every Uite within the 2024/2025 legislative session."}"
                                    </p>
                                </div>

                                {/* Social / Action */}
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-slate-50">
                                    <div className="flex gap-4">
                                        <button className="w-10 h-10 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-ui-blue hover:border-ui-blue transition-all">
                                            <Mail size={16} />
                                        </button>
                                        <button className="w-10 h-10 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-ui-blue hover:border-ui-blue transition-all">
                                            <Twitter size={16} />
                                        </button>
                                        <button className="w-10 h-10 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-ui-blue hover:border-ui-blue transition-all">
                                            <Linkedin size={16} />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Fingerprint className="text-nobel-gold/30" size={32} />
                                        <div className="text-right">
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Official Record</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">UISU/24/0{selectedPerson.id.split('-')[2]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LeaderCard: React.FC<{ 
    person: Person; 
    index: number; 
    isLarge?: boolean; 
    onClick?: () => void;
}> = ({ person, index, isLarge, onClick }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={`bg-white border border-slate-200 group relative overflow-hidden flex flex-col transition-all duration-300 cursor-pointer ${isLarge ? 'p-10' : 'p-8'}`}
        >
            {/* Header Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${person.category === 'CEC' ? 'bg-ui-blue' : 'bg-nobel-gold'}`}></div>

            <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-none flex items-center justify-center transition-colors ${person.isPrincipal ? 'bg-ui-blue text-nobel-gold' : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100 group-hover:text-ui-blue'}`}>
                        {person.category === 'CEC' ? <Shield size={24} /> : <Gavel size={24} />}
                    </div>
                    {person.isPrincipal && (
                        <div className="bg-nobel-gold/10 text-nobel-gold p-1">
                            <Star size={14} fill="currentColor" />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                        {person.role}
                    </div>
                    <h3 className={`font-serif leading-tight text-ui-blue group-hover:text-nobel-gold transition-colors ${isLarge ? 'text-3xl' : 'text-2xl'}`}>
                        {person.name}
                    </h3>
                    {person.constituency && (
                        <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-4">
                            <GraduationCap size={12} /> {person.constituency}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-slate-300 hover:text-ui-blue transition-colors"><Mail size={16}/></div>
                    <div className="text-slate-300 hover:text-ui-blue transition-colors"><Twitter size={16}/></div>
                    <div className="text-slate-300 hover:text-ui-blue transition-colors"><Linkedin size={16}/></div>
                </div>
            </div>

            {/* Subtle Decoration */}
            <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {person.category === 'CEC' ? <Shield size={100} /> : <Gavel size={100} />}
            </div>
        </motion.div>
    );
};
