import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Match the old navbar
pattern = r'<motion\.nav[^>]*initial=\{\{ y: 0 \}\}[^>]*>.*?</motion\.nav>'

new_navbar = """<motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: navVisible ? 20 : -100 }}
                    className="fixed top-0 left-1/2 -translate-x-1/2 z-[100]"
                >
                    <div className={`bg-ui-blue/80 backdrop-blur-2xl text-white px-8 py-3 flex items-center gap-8 rounded-full border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-nobel-gold/50 hover:bg-ui-blue`}>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"
                        >
                            <Menu size={18} />
                            <span className="hidden md:inline">Menu</span>
                        </motion.button>

                        <div className="h-4 w-px bg-white/20"></div>

                        <motion.div whileHover={{ scale: 1.1 }} onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer">
                            <div className="w-8 h-8 bg-nobel-gold flex items-center justify-center text-ui-blue shadow-lg font-serif font-bold italic text-lg rounded-sm">U</div>
                        </motion.div>

                        <div className="h-4 w-px bg-white/20"></div>

                        <div className="flex items-center gap-6">
                            <button onClick={() => setView('ai-explainer')} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"><Sparkles size={14} /> Study</button>
                            <button onClick={() => setView('ai-quiz')} className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-nobel-gold transition-colors"><BrainCircuit size={14} /> Quiz</button>
                        </div>
                    </div>
                </motion.nav>"""

updated_content = re.sub(pattern, new_navbar, content, flags=re.DOTALL)

with open('App.tsx', 'w') as f:
    f.write(updated_content)
