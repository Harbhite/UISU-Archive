import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Match the old menu
# It starts with <motion.div and has initial={{ opacity: 0, x: -50 }}
pattern = r'<motion\.div[^>]*initial=\{\{ opacity: 0, x: -50 \}\}[^>]*>.*?</motion\.div>'

new_menu = """<motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[150] flex items-center justify-center p-6 md:p-20"
                >
                    <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 md:top-12 md:right-12 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all group border border-white/5 hover:border-nobel-gold/50">
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>

                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                        <div className="hidden md:flex md:col-span-5 flex-col justify-center border-r border-white/5 pr-12 py-12 relative">
                            <div className="absolute top-0 left-0 w-20 h-1 bg-nobel-gold"></div>
                            <div>
                                <div className="text-nobel-gold text-xs font-bold uppercase tracking-[0.6em] mb-6">The Registry</div>
                                <h2 className="text-5xl lg:text-7xl font-serif text-white mb-8 italic leading-[0.9]">Union <br/> <span className="text-slate-500">Legacy</span></h2>
                                <p className="text-slate-400 max-w-sm leading-relaxed text-lg font-light">Navigating the intellectual and cultural heritage of the First and Best.</p>
                            </div>
                            <div className="mt-24 flex gap-4">
                                <div className="p-4 rounded-full bg-white/5 border border-white/5"><Star size={20} className="text-nobel-gold" /></div>
                                <div className="p-4 rounded-full bg-white/5 border border-white/5"><Scale size={20} className="text-slate-400" /></div>
                                <div className="p-4 rounded-full bg-white/5 border border-white/5"><Building2 size={20} className="text-slate-400" /></div>
                            </div>
                        </div>

                        <nav className="md:col-span-7 flex flex-col justify-center gap-2">
                            {[
                               { id: 'home', label: 'Archival Home', icon: Star },
                               { id: 'ai-explainer', label: 'StudyBuddy Matrix', icon: Sparkles },
                               { id: 'ai-quiz', label: 'AI Quiz Matrix', icon: BrainCircuit },
                               { id: 'tools', label: 'Uite Matrix', icon: Wrench },
                               { id: 'people', label: 'Executive Registry', icon: Users },
                               { id: 'halls', label: 'The Hall Republics', icon: Building2 },
                               { id: 'announcements', label: 'Official Dispatch', icon: Mail },
                               { id: 'constitution', label: 'Union Constitution', icon: Scale },
                            ].map((v, i) => (
                                <motion.button
                                    key={v.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.2 }}
                                    onClick={() => {setMenuOpen(false); setView(v.id as any)}}
                                    className={`group flex items-center gap-6 p-4 rounded-xl transition-all hover:bg-white/5 text-left w-full`}
                                >
                                    <span className={`text-2xl md:text-4xl font-serif ${view === v.id ? 'text-nobel-gold italic' : 'text-slate-400 group-hover:text-white group-hover:italic'} transition-all duration-300`}>{v.label}</span>
                                    <div className="h-px bg-white/10 flex-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                                    <v.icon size={20} className={`opacity-0 group-hover:opacity-100 text-nobel-gold transition-all duration-300 -translate-x-4 group-hover:translate-x-0`} />
                                </motion.button>
                            ))}
                        </nav>
                    </div>
                </motion.div>"""

updated_content = re.sub(pattern, new_menu, content, flags=re.DOTALL)

with open('App.tsx', 'w') as f:
    f.write(updated_content)
