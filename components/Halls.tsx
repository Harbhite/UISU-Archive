/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Building2, Star, Users, User, MapPin, GraduationCap, Info, Music, Shield, Gavel, Award, ChevronRight, Fingerprint, Image as ImageIcon, Ruler, LayoutGrid } from 'lucide-react';

export interface Hall {
  id: string;
  name: string;
  alias: string;
  motto: string;
  desc: string;
  lore: string;
  culture: string;
  notable: string[];
  color: string;
  type: 'male' | 'female' | 'mixed';
  anthem?: string[];
  // New Enhanced Fields
  leaderName: string;
  leaderTitle: string;
  warden: string;
  capacity: string;
  yearFounded: string;
  images: string[]; // Placeholder image URLs
}

export const hallsData: Hall[] = [
  {
    id: 'mellamby',
    name: 'Kenneth Mellamby Hall',
    alias: 'Premier Hall',
    motto: 'Primus Inter Pares',
    desc: 'The first hall of residence, named after the first Principal, Kenneth Mellamby.',
    lore: 'Established in 1948, Mellamby Hall stands as the architectural and historical cornerstone of the University. It was designed by Maxwell Fry and Jane Drew, and its serene courtyards have hosted some of Nigeria\'s most prominent intellectuals.',
    culture: 'Mellambites are regarded as the "Gentlemen" of the university. The hall maintains a culture of academic rigor and quiet dignity, often contrasting with the more boisterous "kingdoms" on campus.',
    notable: ['Wole Soyinka', 'Emeka Anyaoku', 'Gamaliel Onosode'],
    color: '#C5A059',
    type: 'male',
    anthem: ['Mellamby Hall, we hail thee', 'Premier Hall of UI', 'In dignity and honor', 'We shall never die'],
    leaderName: 'Rt. Hon. Adewale',
    leaderTitle: 'Hall Chairman',
    warden: 'Prof. A.B. Olaiya',
    capacity: '450 Students',
    yearFounded: '1948',
    images: ['https://images.unsplash.com/photo-1541339907198-e08756ebafe3', 'https://images.unsplash.com/photo-1523050853064-886915152d1b']
  },
  {
    id: 'bello',
    name: 'Sultan Bello Hall',
    alias: 'The Sultanate',
    motto: 'Nobility',
    desc: 'Named after Sir Ahmadu Bello. The hall prides itself on leadership.',
    lore: 'Founded in 1962 and named after the Sardauna of Sokoto. It is often called the "Sultanate" because of its tradition of electing a "Mayor" who leads with quasi-monarchical grace.',
    culture: 'Bellites are "Nobles". The hall is known for its sophisticated social life and the famous "State of the Nation" address delivered annually by the Mayor.',
    notable: ['Ahmadu Ali', 'Shehu Musa Yar\'Adua'],
    color: '#1e40af',
    type: 'male',
    leaderName: 'His Worship, The Mayor',
    leaderTitle: 'The Mayor',
    warden: 'Dr. Salami T.',
    capacity: '520 Students',
    yearFounded: '1962',
    images: ['https://images.unsplash.com/photo-1592281237990-af321382a39d', 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85']
  },
  {
    id: 'indy',
    name: 'Independence Hall',
    alias: 'Katanga Republic',
    motto: 'Liberty and Service',
    desc: 'The "Headquarters of Aluta". Established in 1961.',
    lore: 'Independence Hall was founded in 1961 to commemorate Nigeria\'s independence. Its nickname, Katanga, comes from the secessionist state of Katanga in Congo—symbolizing its rebellious spirit.',
    culture: 'The Katangese are the fiercest defenders of student rights. The "Republic" has its own unique lexicon and a "Great Council" that deliberates on campus-wide issues.',
    notable: ['Segun Okeowo', 'Sowore Omoyele'],
    color: '#b91c1c',
    type: 'male',
    leaderName: 'H.E. The Administrator',
    leaderTitle: 'Hall Chairman',
    warden: 'Prof. Adebayo O.',
    capacity: '950 Students',
    yearFounded: '1961',
    images: ['https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f0484c']
  },
  {
    id: 'zik',
    name: 'Nnamdi Azikiwe Hall',
    alias: 'Baluba Kingdom',
    motto: 'Zikism',
    desc: 'The largest hall in UI, named after Nigeria\'s first President.',
    lore: 'Named after the Great Zik of Africa. Azikiwe Hall is the most populous hall and a dominant force in all aspects of university life, from sports to politics.',
    culture: 'The "Balubas" are famous for "Aroism"—a unique form of humorous public teasing. Their "Gyration" (traditional singing and dancing) is a legendary campus event.',
    notable: ['Basketmouth', 'Godswill Akpabio'],
    color: '#d97706',
    type: 'male',
    leaderName: 'Chief Baluba',
    leaderTitle: 'Hall Chairman',
    warden: 'Dr. Johnson F.',
    capacity: '1,200 Students',
    yearFounded: '1963',
    images: ['https://images.unsplash.com/photo-1523580494863-6f3031224c94', 'https://images.unsplash.com/photo-1531482615713-2afd69097998']
  }
];

interface HallsPageProps {
  onBack: () => void;
  onHallSelect: (id: string) => void;
}

export const HallsPage: React.FC<HallsPageProps> = ({ onBack, onHallSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<'All' | 'male' | 'female' | 'mixed'>('All');

  const filteredHalls = hallsData.filter(hall => {
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hall.alias.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || hall.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors mb-12">
          <div className="p-2 rounded-full border border-slate-300 group-hover:border-nobel-gold transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Back to Home</span>
        </button>

        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <Building2 className="text-nobel-gold w-6 h-6" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Residential Directory</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-ui-blue leading-[0.9] mb-6">
            The <br/> <span className="italic text-slate-300">Nations</span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl">
            More than just dormitories; they are sovereign republics of character. Explore the halls that shaped the legends of Ibadan.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-8 border-b border-slate-200">
          <div className="flex gap-8">
            {['All', 'male', 'female', 'mixed'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t as any)}
                className={`pb-4 text-xs font-bold tracking-widest uppercase relative transition-colors ${filter === t ? 'text-ui-blue' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t}
                {filter === t && (
                  <motion.div layoutId="hall-tab" className="absolute bottom-0 left-0 w-full h-1 bg-nobel-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Find a hall or alias..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-none text-sm focus:outline-none focus:border-nobel-gold transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHalls.map((hall, i) => (
            <motion.div 
              key={hall.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onHallSelect(hall.id)}
              className="bg-white p-8 border border-slate-200 group relative overflow-hidden flex flex-col justify-between min-h-[300px] cursor-pointer hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-ui-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              
              <div>
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-300 group-hover:text-nobel-gold transition-colors">
                      <Building2 size={24} />
                   </div>
                   <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-1 bg-slate-50">
                      {hall.type}
                   </div>
                </div>
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">{hall.name}</h3>
                <h2 className="text-3xl font-serif text-ui-blue mb-4 group-hover:text-nobel-gold transition-colors">{hall.alias}</h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed italic">"{hall.motto}"</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[1,2,3].map(j => <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center"><User size={10} className="text-slate-300"/></div>)}
                   <div className="text-[9px] font-bold text-slate-300 flex items-center pl-4 uppercase tracking-widest">Notable Living</div>
                </div>
                <ChevronRight size={16} className="text-slate-200 group-hover:text-nobel-gold group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HallDetailPageProps {
  hallId: string;
  onBack: () => void;
}

export const HallDetailPage: React.FC<HallDetailPageProps> = ({ hallId, onBack }) => {
  const hall = hallsData.find(h => h.id === hallId);

  if (!hall) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors mb-12">
          <div className="p-2 rounded-full border border-slate-300 group-hover:border-nobel-gold transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Back to Nations</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end mb-24">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <Star className="text-nobel-gold w-5 h-5" fill="currentColor" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-slate-400">{hall.name}</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif text-ui-blue leading-[0.8] mb-8">
              {hall.alias.split(' ')[0]} <br/> <span className="italic text-slate-300">{hall.alias.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-2xl text-nobel-gold font-serif italic mb-0">"{hall.motto}"</p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
             <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Residency Status</div>
                <div className="text-lg font-serif text-ui-blue capitalize">{hall.type} Students</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-24">
            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <Info size={16} /> The Lore
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed font-light">
                {hall.lore}
              </p>
            </section>

            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <Gavel size={16} /> Cultural Identity
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed font-light italic">
                {hall.culture}
              </p>
            </section>

            {/* Leadership Section */}
            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <Shield size={16} /> Current Hall Directorate
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-slate-200 shadow-sm flex flex-col justify-between group">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-nobel-gold mb-4">Constitutional Head</div>
                        <h4 className="font-serif text-2xl text-ui-blue mb-1">{hall.leaderName}</h4>
                        <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">{hall.leaderTitle}</div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-ui-blue group-hover:text-white transition-colors">
                            <User size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">2024/2025 Cycle</span>
                    </div>
                </div>
                <div className="p-8 bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-4">Staff Administration</div>
                        <h4 className="font-serif text-2xl text-ui-blue mb-1">{hall.warden}</h4>
                        <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">Hall Warden</div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-200 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ui-blue border border-slate-100 shadow-sm">
                            <Shield size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">University Management</span>
                    </div>
                </div>
              </div>
            </section>

            {/* Gallery Section */}
            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <ImageIcon size={16} /> Visual Archive
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hall.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/10] overflow-hidden bg-slate-200 group">
                        <img 
                          src={img} 
                          alt={`${hall.name} Visual ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-ui-blue/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-4 left-4 p-2 bg-white/90 backdrop-blur-sm text-[8px] font-bold uppercase tracking-widest">Archive Record #{idx + 104}</div>
                    </div>
                ))}
                <div className="relative aspect-[16/10] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:text-nobel-gold hover:border-nobel-gold transition-colors cursor-pointer group">
                    <LayoutGrid size={32} className="mb-4 opacity-20 group-hover:opacity-100" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Explore Full Repository</span>
                </div>
              </div>
            </section>

            {hall.anthem && (
              <section className="p-12 bg-ui-blue text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-12 opacity-5 text-nobel-gold group-hover:rotate-12 transition-transform duration-700">
                    <Music size={200} />
                 </div>
                 <h3 className="font-serif text-2xl text-nobel-gold mb-8 uppercase tracking-widest border-b border-white/10 pb-4">The Anthem</h3>
                 <div className="space-y-4">
                    {hall.anthem.map((line, idx) => (
                      <p key={idx} className="font-serif text-xl italic text-slate-300">{line}</p>
                    ))}
                 </div>
              </section>
            )}
          </div>

          <aside className="space-y-12">
             <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Ruler size={14} /> Technical Ledger</h4>
                <div className="space-y-6">
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-1">Population Capacity</div>
                        <div className="font-serif text-xl text-ui-blue">{hall.capacity}</div>
                    </div>
                    <div className="h-px bg-slate-50 w-full"></div>
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-1">Origin Epoch</div>
                        <div className="font-serif text-xl text-ui-blue">{hall.yearFounded}</div>
                    </div>
                    <div className="h-px bg-slate-50 w-full"></div>
                    <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-1">Administrative Type</div>
                        <div className="font-serif text-xl text-ui-blue capitalize">{hall.type} Residential</div>
                    </div>
                </div>
             </div>

             <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><GraduationCap size={14} /> Notable Alumni</h4>
                <div className="space-y-6">
                  {hall.notable.map((person, idx) => (
                    <div key={idx} className="group">
                        <div className="font-serif text-xl text-ui-blue group-hover:text-nobel-gold transition-colors">{person}</div>
                        <div className="h-px w-0 group-hover:w-full bg-slate-100 transition-all duration-500 mt-2"></div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="p-8 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-nobel-gold mb-4">Official Record</div>
                  <p className="text-sm text-slate-400 leading-relaxed">This hall is a recognized constituency of the Students' Representative Council (SRC) under the 2024 Charter.</p>
                </div>
                <div className="relative z-10 flex items-center gap-4 mt-8">
                   <Fingerprint className="text-nobel-gold/30" size={32} />
                   <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Authorized Archive Record</div>
                </div>
                <Building2 className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};