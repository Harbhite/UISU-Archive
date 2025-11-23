
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Users, Star, Globe, BookOpen, Heart, Gavel, Cpu, Palette, X, ExternalLink, Calendar, Award, ChevronRight, ArrowRight } from 'lucide-react';

// Helper icon component moved up
const ActivityIcon = ({size}: {size: number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

/**
 * Props for the Communities component.
 */
interface CommunitiesProps {
  /** Callback for navigating back to the previous screen. */
  onBack: () => void;
  /** Callback for selecting a specific club to view details. */
  onClubSelect: (id: string) => void;
}

/**
 * Valid categories for classifying clubs and societies.
 */
type Category = 'All' | 'Sociocultural' | 'Academic' | 'Religious' | 'Press' | 'Tech' | 'Sports' | 'Politics';

/**
 * Represents a student club, society, or association.
 */
export interface Club {
    /** Unique identifier for the club. */
    id: string;
    /** Full name of the club. */
    name: string;
    /** Optional acronym or abbreviation. */
    acronym?: string;
    /** The category the club belongs to. */
    category: Category;
    /** The year the club was founded. */
    founded: string;
    /** The club's motto or slogan. */
    motto: string;
    /** A detailed description of the club's mission and activities. */
    description: string;
    /** A list of key activities or events organized by the club. */
    activities: string[];
    /** Name of the current president (optional). */
    president?: string;
    /** Brand color for the club. */
    color: string;
    /** Icon representing the club. */
    icon: React.ReactNode;
}

export const clubsData: Club[] = [
    // Sociocultural & Philanthropic
    {
        id: '1',
        name: 'Sigma Club',
        category: 'Sociocultural',
        founded: '1950',
        motto: 'For All that is Pure',
        description: 'The oldest surviving socio-philanthropic organization in Sub-Saharan Africa. Known for the Havelock Trophy and the admission of men of character and integrity (Loyal Sigmites).',
        activities: ['Havelock Quiz Competition', 'Sigma Chief Scholarship', 'Philanthropic Outreaches'],
        color: '#6d28d9',
        icon: <Award size={24} />
    },
    {
        id: '2',
        name: 'Junior Chamber International (JCI)',
        acronym: 'JCI UI',
        category: 'Sociocultural',
        founded: '1981',
        motto: 'Be Better',
        description: 'A worldwide federation of young leaders and entrepreneurs. JCI UI focuses on individual development, business opportunities, and community impact.',
        activities: ['FOTI (Fifteen Outstanding Persons Awards)', 'Leadership Training', 'I-Care Projects'],
        color: '#0ea5e9',
        icon: <Globe size={24} />
    },
    {
        id: '3',
        name: 'Rotaract Club',
        category: 'Sociocultural',
        founded: '1983',
        motto: 'Service Above Self',
        description: 'The youth wing of Rotary International. Dedicated to community service, professional development, and promoting international understanding.',
        activities: ['Blood Donation Drives', 'Basic Education & Literacy', 'Economic Development Projects'],
        color: '#be123c',
        icon: <Heart size={24} />
    },
    {
        id: '4',
        name: 'AIESEC Ibadan',
        category: 'Sociocultural',
        founded: '1961',
        motto: 'Leadership through Exchange',
        description: 'The world\'s largest youth-run organization. Focused on providing young people with leadership development, cross-cultural internships, and global volunteer exchange experiences.',
        activities: ['Global Volunteer Program', 'Global Talent Internships', 'Youth Speak Forum'],
        color: '#0369a1',
        icon: <Globe size={24} />
    },
    {
        id: '5',
        name: 'The Kegites Club',
        acronym: 'Ilya Du Cactus',
        category: 'Sociocultural',
        founded: '1962',
        motto: 'Unity in Diversity',
        description: 'A socio-cultural club promoting African culture through song, dance, and palm wine. The UI chapter is known as the World Headquarters or Ilya Du Cactus.',
        activities: ['Gyration', 'Cultural Preservation', 'Welfare Support'],
        color: '#166534',
        icon: <Users size={24} />
    },
    {
        id: '6',
        name: 'Leo Club',
        category: 'Sociocultural',
        founded: '1985',
        motto: 'Leadership, Experience, Opportunity',
        description: 'Youth organization of Lions Clubs International. Encourages youth to develop leadership qualities by participating in social service activities.',
        activities: ['Pediatric Cancer Awareness', 'Vision Screening', 'Hunger Relief'],
        color: '#ca8a04',
        icon: <Heart size={24} />
    },
    {
        id: '7',
        name: 'Red Cross Society',
        acronym: 'UI Detachment',
        category: 'Sociocultural',
        founded: '1960',
        motto: 'Through Humanity to Peace',
        description: 'A voluntary humanitarian organization that protects human life and health. They are omnipresent at all major UI sporting and social events.',
        activities: ['First Aid Training', 'Emergency Response', 'Health Education'],
        color: '#dc2626',
        icon: <Heart size={24} />
    },
    {
        id: '8',
        name: 'Enactus UI',
        category: 'Sociocultural',
        founded: '2000',
        motto: 'Entrepreneurial Action Us',
        description: 'A community of student, academic, and business leaders committed to using the power of entrepreneurial action to transform lives and shape a better more sustainable world.',
        activities: ['Social Enterprise Projects', 'National Competition', 'Community Development'],
        color: '#f59e0b',
        icon: <Globe size={24} />
    },

    // Press & Literary
    {
        id: '9',
        name: 'Union of Campus Journalists',
        acronym: 'UCJ UI',
        category: 'Press',
        founded: '1987',
        motto: 'Campus Journalism at its Best',
        description: 'The apex body of all press organizations in the University of Ibadan. Responsible for regulating campus journalism and organizing the annual Induction ceremony.',
        activities: ['Press Night', 'Induction Ceremony', 'Luncheon & Awards'],
        color: '#1e293b',
        icon: <BookOpen size={24} />
    },
    {
        id: '10',
        name: 'The Literary and Debating Society',
        acronym: 'TLDS',
        category: 'Press',
        founded: '1958',
        motto: 'Molding Orators',
        description: 'The premier public speaking body in the university. Organizes the Jaw War, the biggest public speaking competition in Sub-Saharan Africa.',
        activities: ['Jaw War', 'Freshers Oratory Competition', 'Public Speaking Training'],
        color: '#b91c1c',
        icon: <Users size={24} />
    },
    {
        id: '11',
        name: 'Ivory Press Club',
        category: 'Press',
        founded: '1970',
        motto: 'Truth and Objectivity',
        description: 'One of the oldest local press organizations. Known for its investigative journalism and critical analysis of campus politics.',
        activities: ['Editorial Publications', 'Campus News', 'Journalism Workshops'],
        color: '#334155',
        icon: <BookOpen size={24} />
    },
    {
        id: '12',
        name: 'NAMACOS Press',
        category: 'Press',
        founded: '1990',
        motto: 'The Pen is Mightier',
        description: 'The press organization for Communication and Language Arts students, but widely read across campus.',
        activities: ['The Communicator Magazine', 'Weekly Bulletins'],
        color: '#475569',
        icon: <BookOpen size={24} />
    },

    // Religious
    {
        id: '13',
        name: 'Muslim Students Society of Nigeria',
        acronym: 'MSSN UI',
        category: 'Religious',
        founded: '1954',
        motto: 'Service to Allah',
        description: 'The umbrella body for all Muslim students on campus. Organizes prayers, lectures, and welfare activities for the Muslim Ummah.',
        activities: ['Orientation Week', 'Ramadan Lectures', 'Tutorial Classes'],
        color: '#15803d',
        icon: <Users size={24} />
    },
    {
        id: '14',
        name: 'UI Joint Christian Campus Fellowship',
        acronym: 'UIJCCF',
        category: 'Religious',
        founded: '1960',
        motto: 'That they may be one',
        description: 'The coordinating body for all Christian fellowships on campus. Represents Christian interests in the Student Representative Council.',
        activities: ['Joint Services', 'Prayer Rallies', 'Carol Service'],
        color: '#4338ca',
        icon: <Users size={24} />
    },
    {
        id: '15',
        name: 'Newman Society',
        category: 'Religious',
        founded: '1950',
        motto: 'Cor ad cor loquitur',
        description: 'The Catholic students fellowship. Named after Cardinal John Henry Newman. Centers around the Seat of Wisdom Catholic Chapel.',
        activities: ['Mass', 'Rosary Procession', 'Charity Visits'],
        color: '#eab308',
        icon: <Users size={24} />
    },
    {
        id: '16',
        name: 'Baptist Student Fellowship',
        acronym: 'BSF',
        category: 'Religious',
        founded: '1960',
        motto: 'By His Grace',
        description: 'A vibrant Christian community for Baptist students and others. Known for strong musical and drama ministrations.',
        activities: ['Bible Study', 'Drama Night', 'Village Evangelism'],
        color: '#0891b2',
        icon: <Users size={24} />
    },

    // Academic & Faculty
    {
        id: '17',
        name: 'UI Medical Students Association',
        acronym: 'UIMSA',
        category: 'Academic',
        founded: '1960',
        motto: 'Terrorem Afferens',
        description: 'The representative body for medical students. One of the most influential faculty associations, based in UCH.',
        activities: ['Health Week', 'UIMSA Dinner', 'Medical Outreaches'],
        color: '#b91c1c',
        icon: <ActivityIcon size={24} />
    },
    {
        id: '18',
        name: 'Law Students Society',
        acronym: 'LSS',
        category: 'Academic',
        founded: '1981',
        motto: 'Justice and Equity',
        description: 'The association for students of the Faculty of Law. Known for its rigorous moot and mock trials and political vibrancy.',
        activities: ['Law Week', 'Moot Court Competition', 'Chambers Activities'],
        color: '#000000',
        icon: <Gavel size={24} />
    },
    {
        id: '19',
        name: 'Nigerian Economics Students Association',
        acronym: 'NIESA',
        category: 'Academic',
        founded: '1965',
        motto: 'Efficiency and Equity',
        description: 'Represents students of the Department of Economics. Known for organizing economic summits and policy debates.',
        activities: ['Economic Summit', 'Freshers Welcome', 'Academic Tutorials'],
        color: '#0f766e',
        icon: <BookOpen size={24} />
    },
    {
        id: '20',
        name: 'Assoc. of Communication & Language Arts Students',
        acronym: 'ACLAS',
        category: 'Academic',
        founded: '1980',
        motto: 'Effective Communication',
        description: 'The student body for CLA. Famous for its highly active social scene and media-savvy members.',
        activities: ['ACLAS Week', 'Media Tour', 'Speech Contest'],
        color: '#be185d',
        icon: <Users size={24} />
    },
    {
        id: '21',
        name: 'Faculty of Arts Students Association',
        acronym: 'FASSA',
        category: 'Academic',
        founded: '1948',
        motto: 'Premier Faculty',
        description: 'The largest faculty association in terms of diverse departments. The cultural hub of the university.',
        activities: ['FASSA Week', 'Cultural Day', 'Inter-Departmental Sports'],
        color: '#c2410c',
        icon: <Palette size={24} />
    },
    {
        id: '22',
        name: 'Science Students Association',
        acronym: 'SCISA',
        category: 'Academic',
        founded: '1948',
        motto: 'Science for Humanity',
        description: 'Representing the Faculty of Science. Known for rigorous academic competitions and the SCISA Week.',
        activities: ['Science Fair', 'Research Symposium', 'Sports League'],
        color: '#047857',
        icon: <Cpu size={24} />
    },
    {
        id: '23',
        name: 'Technology Students Association',
        acronym: 'TESA',
        category: 'Academic',
        founded: '1970',
        motto: 'Innovation',
        description: 'The body for the Faculty of Technology. Focuses on engineering innovations and technical skills.',
        activities: ['Tech Expo', 'Engineering Design Comp', 'Career Fair'],
        color: '#374151',
        icon: <Cpu size={24} />
    },
    {
        id: '24',
        name: 'National Association of Agric Students',
        acronym: 'NAAS',
        category: 'Academic',
        founded: '1949',
        motto: 'Food for All',
        description: 'Represents the Faculty of Agriculture. Promotes agricultural practices and student welfare.',
        activities: ['Farm Tour', 'Agric Show', 'Farmers Market'],
        color: '#65a30d',
        icon: <BookOpen size={24} />
    },
    {
        id: '25',
        name: 'Nigerian Universities Education Students Assoc.',
        acronym: 'NUESA',
        category: 'Academic',
        founded: '1960',
        motto: 'Builders of the Nation',
        description: 'The association for the Faculty of Education. It has the largest student population.',
        activities: ['Teachers Day', 'Education Summit', 'Teaching Practice Orientation'],
        color: '#1d4ed8',
        icon: <BookOpen size={24} />
    },
    {
        id: '26',
        name: 'Social Sciences Students Association',
        acronym: 'SOSSA',
        category: 'Academic',
        founded: '1960',
        motto: 'Analyzing Society',
        description: 'Represents the Faculty of the Social Sciences. A hotbed for student politics and intellectual debates.',
        activities: ['Social Science Week', 'Political Debates', 'Symposium'],
        color: '#b45309',
        icon: <Users size={24} />
    },
    {
        id: '27',
        name: 'Historical Society of Nigeria',
        acronym: 'HISS',
        category: 'Academic',
        founded: '1955',
        motto: 'History is Life',
        description: 'Student branch of the HSN. Promotes the study of history and heritage.',
        activities: ['Museum Visits', 'Historical Re-enactments', 'Lectures'],
        color: '#78350f',
        icon: <BookOpen size={24} />
    },
    {
        id: '28',
        name: 'Political Science Students Association',
        acronym: 'POSSA',
        category: 'Academic',
        founded: '1962',
        motto: 'Power and Service',
        description: 'The department that often produces many Union leaders. Very active in campus politics.',
        activities: ['Parliamentary Simulation', 'Leadership Summit'],
        color: '#0f172a',
        icon: <Gavel size={24} />
    },

    // Tech & Professional
    {
        id: '29',
        name: 'Google Developer Student Clubs',
        acronym: 'GDSC UI',
        category: 'Tech',
        founded: '2017',
        motto: 'Connect. Learn. Grow.',
        description: 'Community groups for students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome.',
        activities: ['Coding Bootcamps', 'Hackathons', 'Cloud Study Jams'],
        color: '#4285F4',
        icon: <Cpu size={24} />
    },
    {
        id: '30',
        name: 'UI Developers Community',
        category: 'Tech',
        founded: '2015',
        motto: 'Code the Future',
        description: 'A grassroots community of software developers, designers, and tech enthusiasts in UI.',
        activities: ['DevFest', 'Open Source Contribution', 'Tech Talks'],
        color: '#000000',
        icon: <Cpu size={24} />
    },
    {
        id: '31',
        name: 'Data Science Nigeria',
        acronym: 'UI Chapter',
        category: 'Tech',
        founded: '2018',
        motto: 'AI for Development',
        description: 'Community focused on building capacity in Data Science and Artificial Intelligence.',
        activities: ['AI Bootcamp', 'Kaggle Competitions', 'Python Training'],
        color: '#be123c',
        icon: <Cpu size={24} />
    },
    {
        id: '32',
        name: 'Moot and Mock Society',
        category: 'Academic',
        founded: '1985',
        motto: 'In Pursuit of Justice',
        description: 'An exclusive society within the Faculty of Law dedicated to the art of advocacy and court proceedings.',
        activities: ['Internal Moot Competition', 'International Competitions'],
        color: '#000000',
        icon: <Gavel size={24} />
    },

    // Others
    {
        id: '33',
        name: 'UI Chess Club',
        category: 'Sports',
        founded: '1970',
        motto: 'Checkmate',
        description: 'A community for chess enthusiasts. Hosts regular tournaments and training sessions.',
        activities: ['Campus Chess Championship', 'Weekly Blitz'],
        color: '#1f2937',
        icon: <Users size={24} />
    },
    {
        id: '34',
        name: 'UI Quiz Club',
        category: 'Academic',
        founded: '2010',
        motto: 'Knowledge is Power',
        description: 'The intellectual powerhouse that represents UI in inter-varsity quiz competitions.',
        activities: ['Inter-Faculty Quiz', 'Training Sessions'],
        color: '#4f46e5',
        icon: <BookOpen size={24} />
    },
    {
        id: '35',
        name: 'ANUNSA',
        acronym: 'UI Chapter',
        category: 'Sociocultural',
        founded: '1960',
        motto: 'Global Diplomacy',
        description: 'All-Nigeria United Nations Students and Youth Association. Promotes the ideals of the UN.',
        activities: ['Model United Nations', 'SDG Awareness'],
        color: '#0ea5e9',
        icon: <Globe size={24} />
    },
    {
        id: '36',
        name: 'Wildlife Conservation Society',
        category: 'Academic',
        founded: '1990',
        motto: 'Protect Nature',
        description: 'Students dedicated to the preservation of wildlife and the environment, often associated with the UI Zoo.',
        activities: ['Zoo Volunteering', 'Conservation Awareness'],
        color: '#166534',
        icon: <Globe size={24} />
    },
    {
        id: '37',
        name: 'Theatre Arts Student Association',
        acronym: 'TASA',
        category: 'Sociocultural',
        founded: '1965',
        motto: 'Creativity',
        description: 'The heart of entertainment in UI. They manage the Arts Theatre productions.',
        activities: ['Induction Play', 'Final Year Production', 'Dance Drama'],
        color: '#7c3aed',
        icon: <Palette size={24} />
    },
    {
        id: '38',
        name: 'Cell Biology & Genetics Student Assoc.',
        category: 'Academic',
        founded: '2005',
        motto: 'The Code of Life',
        description: 'Academic association for students of genetics.',
        activities: ['DNA Day', 'Lab Workshops'],
        color: '#059669',
        icon: <ActivityIcon size={24} />
    },
    {
        id: '39',
        name: 'National Association of Nigerian Students',
        acronym: 'NANS UI',
        category: 'Politics',
        founded: '1980',
        motto: 'Aluta Continua',
        description: 'The external arm of student unionism, connecting UI with the national body.',
        activities: ['Conventions', 'Solidarity Marches'],
        color: '#15803d',
        icon: <Users size={24} />
    },
    {
        id: '40',
        name: 'The Ibadan Journal of Humanistic Studies',
        acronym: 'Student Wing',
        category: 'Academic',
        founded: '1985',
        motto: 'Scholarship',
        description: 'Student editorial board for the prestigious humanities journal.',
        activities: ['Paper Reviews', 'Writing Workshop'],
        color: '#9a3412',
        icon: <BookOpen size={24} />
    }
];

// --- COMPONENT FOR EXPANDABLE ACTIVITY ITEMS ---
/**
 * A component to display an expandable card for a club activity.
 *
 * @param {object} props - The component props.
 * @param {string} props.activity - The name of the activity.
 * @returns {JSX.Element} The rendered ActivityCard component.
 */
const ActivityCard: React.FC<{ activity: string }> = ({ activity }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-5 bg-white border rounded-xl transition-all cursor-pointer group ${
                isOpen ? 'border-nobel-gold shadow-lg ring-1 ring-nobel-gold/20' : 'border-slate-200 hover:border-nobel-gold hover:shadow-md'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.div 
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                            isOpen ? 'bg-nobel-gold text-white' : 'bg-slate-50 text-nobel-gold group-hover:bg-ui-blue/5'
                        }`}
                    >
                        <ChevronRight size={20} />
                    </motion.div>
                    <h4 className={`font-serif text-lg leading-tight transition-colors ${isOpen ? 'text-ui-blue font-bold' : 'text-slate-800'}`}>
                        {activity}
                    </h4>
                </div>
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-slate-100 pl-[3.5rem]">
                            <p className="text-sm text-slate-600 leading-relaxed font-light mb-4">
                                Participate in the annual {activity}. A cornerstone event that brings together members for professional development, networking, and celebration of our shared values.
                            </p>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-nobel-gold hover:text-ui-blue transition-colors flex items-center gap-2">
                                Learn More <ArrowRight size={12} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- STANDALONE PAGE: CLUB DETAIL ---

interface ClubDetailProps {
    clubId: string;
    onBack: () => void;
}

/**
 * A detailed view component for a specific club.
 * Displays club information, key activities, and contact options.
 *
 * @param {ClubDetailProps} props - The component props.
 * @returns {JSX.Element} The rendered ClubDetailPage component.
 */
export const ClubDetailPage: React.FC<ClubDetailProps> = ({ clubId, onBack }) => {
    const club = clubsData.find(c => c.id === clubId);

    if (!club) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-serif text-slate-800">Club Not Found</h2>
                <button onClick={onBack} className="mt-4 text-ui-blue underline">Go Back</button>
            </div>
        </div>
    );

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
                    <span>Directory</span>
                </button>

                {/* Hero Header */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-12">
                    <div className="h-48 md:h-64 relative bg-slate-900 overflow-hidden">
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 opacity-80" style={{ backgroundColor: club.color }}></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150 text-white">
                            {club.icon}
                        </div>
                    </div>
                    
                    <div className="px-8 pb-8 md:px-12 md:pb-12 -mt-16 relative z-10">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center text-5xl md:text-6xl border-4 border-white"
                                style={{ color: club.color }}
                            >
                                {club.icon}
                            </motion.div>
                            
                            <div className="flex-1 pt-4 md:pt-16">
                                <div className="flex flex-wrap gap-3 mb-3">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-200">
                                        {club.category}
                                    </span>
                                    {club.acronym && (
                                        <span className="px-3 py-1 bg-ui-blue/10 text-ui-blue text-[10px] font-bold uppercase tracking-widest rounded-full border border-ui-blue/20">
                                            {club.acronym}
                                        </span>
                                    )}
                                </div>
                                <h1 className="font-serif text-4xl md:text-6xl text-slate-900 leading-none mb-2">{club.name}</h1>
                                <p className="font-serif text-xl md:text-2xl text-slate-500 italic">"{club.motto}"</p>
                            </div>

                            <div className="pt-4 md:pt-16 flex gap-4">
                                <button className="px-6 py-3 bg-ui-blue text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-nobel-gold hover:text-slate-900 transition-all shadow-md">
                                    Join Club
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                                <BookOpen size={16} /> About The Association
                            </h3>
                            <p className="text-xl text-slate-700 leading-relaxed font-light">
                                {club.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                                <Star size={16} /> Key Activities & Events
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {club.activities.map((activity, idx) => (
                                    <ActivityCard key={idx} activity={activity} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                         <div className="p-6 bg-white border border-slate-200 rounded-xl">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Quick Facts</h4>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Established</div>
                                    <div className="font-serif text-xl text-slate-900">{club.founded}</div>
                                </div>
                                
                                <div className="h-px bg-slate-100 w-full"></div>

                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Membership Status</div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span className="font-serif text-lg text-slate-900">Open for Registration</span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100 w-full"></div>

                                <div>
                                    <div className="text-xs text-slate-500 mb-1">Affiliation</div>
                                    <div className="font-serif text-lg text-slate-900">Registered with Student Affairs</div>
                                </div>
                            </div>
                         </div>

                         <div className="p-6 bg-ui-blue text-white rounded-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Get Involved</h4>
                                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                                    Interested in joining {club.name}? Visit their secretariat or contact the PRO.
                                </p>
                                <button className="w-full py-3 bg-white/10 border border-white/20 hover:bg-white hover:text-ui-blue rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                                    Contact Executive
                                </button>
                            </div>
                            <Users size={100} className="absolute -bottom-4 -right-4 text-white/5 rotate-12" />
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- DIRECTORY LIST ---

/**
 * A directory page for browsing clubs and communities.
 * Includes search and filtering capabilities.
 *
 * @param {CommunitiesProps} props - The component props.
 * @returns {JSX.Element} The rendered CommunitiesPage component.
 */
export const CommunitiesPage: React.FC<CommunitiesProps> = ({ onBack, onClubSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const categories: Category[] = ['All', 'Sociocultural', 'Academic', 'Religious', 'Press', 'Tech', 'Sports', 'Politics'];

    const filteredClubs = clubsData.filter(club => {
        const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (club.acronym && club.acronym.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = activeCategory === 'All' || club.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16">
            <div className="container mx-auto px-6">
                {/* Header Navigation */}
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors mb-12"
                >
                    <div className="p-2 rounded-full border border-slate-300 group-hover:border-nobel-gold transition-colors">
                        <ArrowLeft size={14} />
                    </div>
                    <span>Back to Home</span>
                </button>

                {/* Hero Content */}
                <div className="mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <Users className="text-nobel-gold w-6 h-6" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">Directory</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-serif text-ui-blue leading-[0.9] mb-6"
                    >
                        Clubs & <br/> <span className="italic text-slate-300">Societies</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-slate-600 font-light max-w-2xl leading-relaxed"
                    >
                        The lifeblood of the University. From the ancient traditions of Sigma to the modern innovations of the Developer Clubs.
                    </motion.p>
                </div>

                {/* Search & Filter */}
                <div className="mb-16 space-y-8 py-4 border-b border-slate-200">
                    <div className="relative max-w-2xl">
                        <input 
                            type="text" 
                            placeholder="Find a club, society, or association..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full focus:border-nobel-gold focus:outline-none shadow-sm text-lg font-serif transition-shadow focus:shadow-md text-slate-900"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                    activeCategory === cat 
                                    ? 'bg-ui-blue text-white shadow-md transform scale-105' 
                                    : 'bg-white text-slate-500 border border-slate-200 hover:border-ui-blue'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredClubs.map((club) => (
                            <motion.div
                                layout
                                key={club.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => onClubSelect(club.id)}
                                className="bg-white p-8 rounded-xl border border-slate-200 hover:border-nobel-gold hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[320px]"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-ui-blue group-hover:bg-ui-blue group-hover:text-white transition-colors">
                                            {club.icon}
                                        </div>
                                        <div className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded border border-slate-100">
                                            {club.category}
                                        </div>
                                    </div>

                                    <h3 className="font-serif text-2xl text-ui-blue mb-2 group-hover:text-nobel-gold transition-colors leading-tight">
                                        {club.name}
                                    </h3>
                                    {club.acronym && <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{club.acronym}</div>}
                                    
                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-light">
                                        {club.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <Calendar size={12} /> Est. {club.founded}
                                    </div>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-nobel-gold group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
