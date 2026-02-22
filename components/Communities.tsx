/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Added 'Info' and 'Mail' imports for use in ClubDetailPage
import { ArrowLeft, Search, Users, Star, Globe, BookOpen, Heart, Gavel, Cpu, Palette, X, ExternalLink, Calendar, Award, ChevronRight, ArrowRight, Bell, Info, Mail } from 'lucide-react';

// FIX: Updated ActivityIcon to accept both size and className props
const ActivityIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

interface CommunitiesProps {
  onBack: () => void;
  onClubSelect: (id: string) => void;
}

type Category = 'All' | 'Sociocultural' | 'Academic' | 'Religious' | 'Press' | 'Tech' | 'Sports' | 'Politics';

export interface Club {
    id: string;
    name: string;
    acronym?: string;
    category: Category;
    founded: string;
    motto: string;
    description: string
    // Added for full description in detail view
    mission: string;
    vision: string;
    activities: string[];
    leaders: { role: string; name: string; }[];
    contactEmail: string;
    socialLinks: { platform: string; url: string; }[];
    logoUrl?: string;
}

const clubsData: Club[] = [
    {
        id: 'nujsa',
        name: 'Nigerian Universities Journalism Students Association',
        acronym: 'NUJSA-UI',
        category: 'Press',
        founded: '1975',
        motto: 'Advancing Journalism Excellence',
        description: 'The premier association for aspiring journalists, fostering excellence in campus reportage and media ethics.',
        mission: 'To promote, protect, and defend the rights and interests of journalism students within the university, and to uphold the highest standards of journalistic practice.',
        vision: 'To be the leading student journalism body in Nigeria, producing ethical, professional, and impactful media practitioners.',
        activities: ['Campus Press Conferences', 'Annual Journalism Lecture', 'Media Workshops', 'Publishing the "Campus Reporter" newsletter'],
        leaders: [{ role: 'President', name: 'Ayomide Balogun' }, { role: 'General Secretary', name: 'Chioma Okoro' }],
        contactEmail: 'nujsa.ui@email.com',
        socialLinks: [{ platform: 'Twitter', url: 'https://twitter.com/nujsaui' }],
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/2965/2965874.png',
    },
    {
        id: 'aiesec',
        name: 'AIESEC in UI',
        acronym: 'AIESEC',
        category: 'Sociocultural',
        founded: '1970',
        motto: 'Peace and Fulfillment of Humanikind\'s Potential',
        description: 'An international youth-run organization that provides leadership development and cross-cultural internships.',
        mission: 'To achieve peace and fulfillment of humankind\'s potential by engaging and developing young people.',
        vision: 'To be the global platform for young people to explore and develop their leadership potential.',
        activities: ['Global Volunteer Programs', 'Youth Leadership Summits', 'Professional Internships', 'Talent Recruitment Fairs'],
        leaders: [{ role: 'Local Committee President', name: 'Chisom Nnadi' }, { role: 'VP Talent Management', name: 'Femi Adekunle' }],
        contactEmail: 'aiesec.ui@email.com',
        socialLinks: [{ platform: 'Facebook', url: 'https://facebook.com/aiesecui' }],
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/AIESEC_logo.svg/1200px-AIESEC_logo.svg.png',
    },
    {
        id: 'google-dsc',
        name: 'Google Developers Student Club UI',
        acronym: 'GDSC-UI',
        category: 'Tech',
        founded: '2019',
        motto: 'Learn. Grow. Impact.',
        description: 'A university-based community group for students interested in Google developer technologies.',
        mission: 'To help students bridge the gap between theory and practice, and to empower them to build solutions for local businesses and communities.',
        vision: 'To create a vibrant ecosystem of student developers who are equipped with the skills to innovate and contribute to the tech industry.',
        activities: ['Hackathons', 'Coding Bootcamps', 'Tech Talks', 'Solution Challenge'],
        leaders: [{ role: 'Lead', name: 'Obioma Ebere' }, { role: 'Co-Lead', name: 'David Okafor' }],
        contactEmail: 'gdsc.ui@email.com',
        socialLinks: [{ platform: 'LinkedIn', url: 'https://linkedin.com/company/gdscui' }],
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Developers_logo.svg/2560px-Google_Developers_logo.svg.png',
    },
    {
        id: 'literary-arts',
        name: 'Literary and Debating Society',
        acronym: 'LDS-UI',
        category: 'Academic',
        founded: '1950',
        motto: 'Logos Et Veritas',
        description: 'The hub for intellectual discourse, public speaking, and literary appreciation.',
        mission: 'To cultivate critical thinking, eloquent expression, and a passion for literature and robust debate among students.',
        vision: 'To produce leaders of thought and impactful communicators who can shape national discourse.',
        activities: ['Inter-Faculty Debates', 'Public Speaking Masterclasses', 'Literary Evenings', 'Annual Essay Competition'],
        leaders: [{ role: 'President', name: 'Toluwani Adeniyi' }, { role: 'Debate Secretary', name: 'Ibrahim Sani' }],
        contactEmail: 'lds.ui@email.com',
        socialLinks: [],
    },
    {
        id: 'sjc',
        name: 'Students\' Judicial Council',
        acronym: 'SJC-UI',
        category: 'Politics',
        founded: '1968',
        motto: 'Justice For All',
        description: 'The judicial arm of the Students\' Union, ensuring fair legal processes for students.',
        mission: 'To uphold the rule of law within the Students\' Union, interpret the constitution, and ensure justice and fairness for all students.',
        vision: 'To be an impartial and independent judicial body that instills confidence in the students\' legal framework.',
        activities: ['Mock Trials', 'Constitutional Reviews', 'Legal Aid Clinics', 'Student Arbitration Sessions'],
        leaders: [{ role: 'Chief Justice', name: 'Funke Alabi' }, { role: 'Registrar', name: 'Kunle Hassan' }],
        contactEmail: 'sjc.ui@email.com',
        socialLinks: [],
    },
    {
        id: 'ui-press',
        name: 'University of Ibadan Press Club',
        acronym: 'UIPC',
        category: 'Press',
        founded: '1965',
        motto: 'The Voice of the Campus',
        description: 'The official student press organization, responsible for documenting campus life and events.',
        mission: 'To provide timely, accurate, and unbiased reporting of campus news, events, and issues, and to serve as a platform for student voices.',
        vision: 'To be the most credible and influential student media organization, shaping perceptions and driving positive change.',
        activities: ['News Coverage', 'Interviews with Campus Leadership', 'Documentary Projects', 'Photojournalism Exhibitions'],
        leaders: [{ role: 'Editor-in-Chief', name: 'Ngozi Eze' }, { role: 'Managing Editor', name: 'Tunde Bello' }],
        contactEmail: 'uipc.ui@email.com',
        socialLinks: [],
    },
    {
        id: 'muslim-students',
        name: 'Muslim Students Society of Nigeria UI',
        acronym: 'MSSN-UI',
        category: 'Religious',
        founded: '1954',
        motto: 'Knowledge and Piety',
        description: 'Promoting Islamic values and community welfare among Muslim students.',
        mission: 'To foster spiritual growth, academic excellence, and social responsibility among Muslim students in accordance with Islamic teachings.',
        vision: 'To build a community of exemplary Muslim students who contribute positively to society.',
        activities: ['Jumat Services', 'Islamic Lectures', 'Welfare Outreach Programs', 'Ramadan Tafsir'],
        leaders: [{ role: 'Amir', name: 'Abdullahi Umar' }, { role: 'Amirah', name: 'Fatima Yusuf' }],
        contactEmail: 'mssn.ui@email.com',
        socialLinks: [],
    },
    {
        id: 'nigerian-medical',
        name: 'Nigerian Medical Students Association UI',
        acronym: 'NIMSA-UI',
        category: 'Academic',
        founded: '1960',
        motto: 'Service to Humanity',
        description: 'The representative body for medical students, focusing on academic and professional development.',
        mission: 'To promote the academic, social, and professional welfare of medical students, and to contribute to healthcare development in Nigeria.',
        vision: 'To be the leading voice for medical students, advocating for quality medical education and healthcare access.',
        activities: ['Health Outreach Programs', 'Medical Quizzes', 'Clinical Skills Workshops', 'Annual Health Week'],
        leaders: [{ role: 'President', name: 'Dr. Emeka Obi' }, { role: 'General Secretary', name: 'Dr. Aisha Musa' }],
        contactEmail: 'nimsa.ui@email.com',
        socialLinks: [],
    },
    {
        id: 'chess-club',
        name: 'UI Chess Club',
        acronym: 'UICC',
        category: 'Sports',
        founded: '1980',
        motto: 'Strategy and Intellect',
        description: 'A community for chess enthusiasts to develop strategic thinking and competitive skills.',
        mission: 'To promote the game of chess as a tool for intellectual development and strategic thinking among students.',
        vision: 'To build a vibrant chess community and produce national and international chess champions from the university.',
        activities: ['Weekly Chess Sessions', 'Inter-Hall Chess Tournaments', 'Chess Coaching Clinics', 'Simultaneous Exhibitions'],
        leaders: [{ role: 'President', name: 'Daniel Kalu' }, { role: 'Captain', name: 'Grace Adebayo' }],
        contactEmail: 'chess.ui@email.com',
        socialLinks: [],
    }
];

// Reusable Back Button
const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors mb-12">
        <div className="p-2 rounded-full border border-slate-300 group-hover:border-nobel-gold transition-colors">
            <ArrowLeft size={14} />
        </div>
        <span>Back to Communities</span>
    </button>
);

export const CommunitiesPage: React.FC<CommunitiesProps> = ({ onBack, onClubSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<Category>('All');

  const filteredClubs = clubsData.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          club.acronym?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || club.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories: Category[] = ['All', 'Sociocultural', 'Academic', 'Religious', 'Press', 'Tech', 'Sports', 'Politics'];

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
            <Users className="text-nobel-gold w-6 h-6" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Union Sub-Structure</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-ui-blue leading-[0.9] mb-6">
            The <br/> <span className="italic text-slate-300">Communities</span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl">
            The vibrant network of student organizations, clubs, and associations that enrich the intellectual and social fabric of the University of Ibadan.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-ui-blue text-white border-ui-blue' : 'bg-white text-slate-500 border-slate-200 hover:border-ui-blue hover:text-ui-blue'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search clubs or acronyms..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-none text-sm focus:outline-none focus:border-nobel-gold transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club, i) => (
              <motion.div 
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onClubSelect(club.id)}
                className="bg-white p-8 border border-slate-200 group relative overflow-hidden flex flex-col justify-between min-h-[280px] cursor-pointer hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-ui-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                
                <div className="flex justify-between items-start mb-6">
                    {club.logoUrl ? (
                        <img src={club.logoUrl} alt={`${club.name} Logo`} className="w-12 h-12 object-contain" />
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-300 group-hover:text-nobel-gold transition-colors">
                            <ActivityIcon size={24} />
                        </div>
                    )}
                   <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-1 bg-slate-50">
                      {club.category}
                   </div>
                </div>
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">{club.name}</h3>
                <h2 className="text-3xl font-serif text-ui-blue mb-4 group-hover:text-nobel-gold transition-colors">{club.acronym || club.name}</h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed italic line-clamp-2">"{club.description}"</p>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                    <Calendar size={12} className="text-slate-200" /> Founded {club.founded}
                  </div>
                  <ChevronRight size={16} className="text-slate-200 group-hover:text-nobel-gold group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-3 py-20 text-center text-slate-400 border-2 border-dashed border-slate-200">
                <p className="font-serif text-xl italic">No communities found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ClubDetailPageProps {
  clubId: string;
  onBack: () => void;
}

export const ClubDetailPage: React.FC<ClubDetailPageProps> = ({ clubId, onBack }) => {
  const club = clubsData.find(c => c.id === clubId);

  if (!club) return null; // Or render a "Not Found" message

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <BackButton onClick={onBack} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end mb-24">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              {club.logoUrl ? (
                <img src={club.logoUrl} alt={`${club.name} Logo`} className="w-8 h-8 object-contain" />
              ) : (
                // FIX: Pass size prop to ActivityIcon and className for styling
                <ActivityIcon size={32} className="text-nobel-gold w-8 h-8" />
              )}
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-slate-400">{club.category}</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif text-ui-blue leading-[0.8] mb-8">
              {club.acronym || club.name}
            </h1>
            <p className="text-2xl text-nobel-gold font-serif italic mb-0">"{club.motto}"</p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
             <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Established</div>
                <div className="text-lg font-serif text-ui-blue capitalize">{club.founded}</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-24">
            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <Info size={16} /> Overview
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed font-light">
                {club.description}
              </p>
            </section>

            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <BookOpen size={16} /> Mission & Vision
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed font-light mb-8">
                <span className="font-bold text-ui-blue">Mission:</span> {club.mission}
              </p>
              <p className="text-xl text-slate-700 leading-relaxed font-light italic">
                <span className="font-bold text-ui-blue not-italic">Vision:</span> "{club.vision}"
              </p>
            </section>

            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-200">
                <ActivityIcon size={16} /> Key Activities
              </h3>
              <ul className="space-y-4">
                {club.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-nobel-gold mt-2"></div>
                    <p className="text-lg text-slate-700 font-light">{activity}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-12">
             <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Users size={14} /> Current Leadership</h4>
                <div className="space-y-6">
                  {club.leaders.map((leader, idx) => (
                    <div key={idx} className="group">
                        <div className="text-sm font-bold uppercase tracking-widest text-slate-500">{leader.role}</div>
                        <div className="font-serif text-xl text-ui-blue group-hover:text-nobel-gold transition-colors">{leader.name}</div>
                        <div className="h-px w-0 group-hover:w-full bg-slate-100 transition-all duration-500 mt-2"></div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="p-8 bg-white border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Bell size={14} /> Contact & Socials</h4>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-700">
                        <Mail size={18} className="text-nobel-gold" />
                        <span className="text-sm font-medium">{club.contactEmail}</span>
                    </div>
                    {club.socialLinks.map((link, idx) => (
                        <a 
                            key={idx} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-ui-blue hover:text-nobel-gold transition-colors"
                        >
                            <ExternalLink size={18} />
                            <span className="text-sm font-medium">{link.platform}</span>
                        </a>
                    ))}
                    {club.socialLinks.length === 0 && (
                        <p className="text-sm text-slate-500 italic">No social links provided.</p>
                    )}
                </div>
             </div>

             <div className="p-8 bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px]">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-nobel-gold mb-4">Official Record</div>
                  <p className="text-sm text-slate-400 leading-relaxed">This community is a recognized part of the University of Ibadan Students' Union ecosystem, promoting diverse student interests.</p>
                </div>
                <div className="relative z-10 flex items-center gap-4 mt-8">
                   <Award className="text-nobel-gold/30" size={32} />
                   <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Authorized Archive Record</div>
                </div>
                <Users className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};