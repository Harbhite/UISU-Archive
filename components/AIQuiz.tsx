/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Upload, FileText, ImageIcon, 
  ChevronRight, CheckCircle2, XCircle, Clock, 
  Trophy, RefreshCcw, Download, Loader2, Sparkles, 
  Sliders, Trash2, File as FileIcon, BarChart3
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { extractTextFromFile } from '../lib/file-utils';

const downloadTextFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

interface AIQuizProps {
  onBack: () => void;
}

interface Question {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

type Rigidity = 'Standard' | 'Strict' | 'Rigid';

export const AIQuizPage: React.FC<AIQuizProps> = ({ onBack }) => {
    const [step, setStep] = useState<'upload' | 'generating' | 'quiz' | 'result'>('upload');
    const [rigidity, setRigidity] = useState<Rigidity>('Strict');
    const [inputText, setInputText] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileData, setFileData] = useState<{data: string, mimeType: string} | null>(null);
    const [fileText, setFileText] = useState<string>("");
    const [isExtracting, setIsExtracting] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [loadingMsg, setLoadingMsg] = useState("Initializing Pedagogical Protocol...");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const timerRef = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- FILE HANDLING ---
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setFileData(null);
        setFileText("");
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = (event.target?.result as string).split(',')[1];
                setFileData({ data: base64, mimeType: file.type });
            };
            reader.readAsDataURL(file);
        } else {
            setIsExtracting(true);
            try {
                const text = await extractTextFromFile(file);
                setFileText(text);
            } catch (error) {
                console.error("Text extraction failed", error);
                alert("Failed to read file content. Please try another file.");
                removeFile();
            } finally {
                setIsExtracting(false);
            }
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setFileData(null);
        setFileText("");
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // --- AI LOGIC ---
    const generateQuiz = async () => {
        if (!inputText && !selectedFile) {
            alert("Please provide some study material (text or file) to generate the quiz.");
            return;
        }
        if (isExtracting) {
            alert("Please wait for file analysis to complete.");
            return;
        }

        setStep('generating');
        setLoadingMsg("Synthesizing batch of 25 intellectual queries...");
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let promptParts: any[] = [];
            
            const rigidityPrompt = {
                'Standard': 'Focus on foundational concepts and direct facts.',
                'Strict': 'Focus on application of concepts, critical thinking, and nuanced relationships.',
                'Rigid': 'Focus on advanced synthesis, edge cases, historical context, and highly complex logical deductions.'
            }[rigidity];

            const mainInstruction = `You are an elite professor at the University of Ibadan. Based on the provided study materials, generate an official examination batch of exactly 25 multiple-choice questions.
                
                LEVEL OF RIGIDITY: ${rigidity}
                INSTRUCTION: ${rigidityPrompt}

                IMPORTANT: You MUST generate exactly 25 questions.

                FORMAT:
                Return ONLY a JSON array of objects. Each object MUST have:
                - question (string)
                - options (array of exactly 4 strings)
                - correctIndex (number, 0-3)
                - explanation (string, archival and intellectual tone)
                
                Ensure variety, intellectual depth, and strict adherence to the material.`;

            promptParts.push({ text: mainInstruction });
            
            let combinedInput = "";
            if (inputText) combinedInput += `TEXTUAL MATERIAL:\n${inputText}\n\n`;
            if (fileText) combinedInput += `FILE CONTENT (${selectedFile?.name}):\n${fileText}\n\n`;

            if (combinedInput) {
                promptParts.push({ text: combinedInput });
            }

            if (selectedFile && fileData) { // Only send inlineData for images
                promptParts.push({
                    inlineData: {
                        data: fileData.data,
                        mimeType: fileData.mimeType
                    }
                });
                promptParts.push({ text: `Analyze the attached image: ${selectedFile.name} for quiz content.` });
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash', // Using flash model for speed
                contents: { parts: promptParts },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                options: { 
                                    type: Type.ARRAY, 
                                    items: { type: Type.STRING },
                                    minItems: 4,
                                    maxItems: 4
                                },
                                correctIndex: { type: Type.INTEGER },
                                explanation: { type: Type.STRING }
                            },
                            required: ["question", "options", "correctIndex", "explanation"]
                        }
                    }
                }
            });

            const responseText = response.text;
            let data: Question[];
            try {
                data = JSON.parse(responseText);
                if (!Array.isArray(data) || data.length === 0 || !data.every(item => 
                    typeof item.question === 'string' &&
                    Array.isArray(item.options) && item.options.length === 4 && item.options.every(opt => typeof opt === 'string') &&
                    typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex <= 3 &&
                    typeof item.explanation === 'string'
                )) {
                    throw new Error("Parsed JSON does not match expected Question schema or is empty.");
                }
            } catch (jsonError: any) {
                console.error("Failed to parse or validate quiz data:", jsonError);
                throw new Error(`Invalid protocol response format from AI: ${jsonError.message}. Please try again or refine input. Raw: ${responseText.substring(0, 200)}...`);
            }
            
            setQuestions(data); // Don't slice, assume AI respected the prompt or use what we got.
            setStep('quiz');
            startTimer();
            
        } catch (error: any) {
            console.error(error);
            alert(`AI Sync Failed: ${error.message || "An unknown error occurred. Please check your API key and network connection."}`);
            setStep('upload');
        }
    };

    // --- QUIZ LOGIC ---
    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeElapsed(0);
        timerRef.current = window.setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (idx: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentIdx] = idx;
        setUserAnswers(newAnswers);

        if (currentIdx < questions.length - 1) {
            setTimeout(() => setCurrentIdx(currentIdx + 1), 300);
        } else {
            stopTimer();
            setStep('result');
        }
    };

    const score = userAnswers.reduce((acc, val, i) => (val === questions[i]?.correctIndex ? acc + 1 : acc), 0);

    const exportResults = () => {
        const content = `UISU AI Quiz - Score: ${Math.round((score / questions.length) * 100)}%\nTime: ${formatTime(timeElapsed)}\n\n` + questions.map((q, i) => `Q${i+1}: ${q.question}\nYour Answer: ${q.options[userAnswers[i]] || "None"} (${userAnswers[i] === q.correctIndex ? "Correct" : "Incorrect"})\nCorrect Answer: ${q.options[q.correctIndex]}\nExplanation: ${q.explanation}\n`).join("\n-------------------\n");
        const timestamp = new Date().toISOString().split("T")[0];
        downloadTextFile(content, `UISU_AI_Quiz_Export_${timestamp}.txt`);
    };

    const resetQuiz = () => {
        setStep('upload');
        setQuestions([]);
        setUserAnswers([]);
        setInputText("");
        setFileData(null);
        setSelectedFile(null);
        setFileText("");
        setCurrentIdx(0);
        stopTimer();
        setTimeElapsed(0);
    }

    // --- RENDER HELPERS ---

    const UploadView = () => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 md:px-0"
        >
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
                accept="image/*,application/pdf,.docx,.doc,.txt"
            />

            <div className="mb-8 md:mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <BrainCircuit className="text-nobel-gold" size={24} />
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">Pedagogical Protocol v1.0</span>
                </div>
                <h1 className="text-4xl md:text-8xl font-serif text-ui-blue leading-[0.9] mb-6">
                    AI Quiz <br/> <span className="italic text-slate-300">Matrix</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl leading-relaxed">
                    Upload your lecture notes or documents. The Union's AI will synthesize a custom 25-question examination batch.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
                        <label htmlFor="quiz-input-text" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Material Input Area</label>
                        <textarea 
                            id="quiz-input-text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste lecture transcript, study notes..."
                            className="w-full h-48 md:h-64 bg-slate-50 p-4 md:p-6 border border-slate-100 outline-none font-serif text-base md:text-lg focus:bg-white transition-all resize-none"
                            aria-label="Study material input"
                        />
                        
                        <AnimatePresence>
                            {selectedFile && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 p-4 bg-ui-blue text-white flex items-center justify-between border-l-4 border-nobel-gold"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        {selectedFile.type.startsWith('image/') ? <ImageIcon size={18} className="text-nobel-gold" /> : <FileIcon size={18} className="text-nobel-gold" />}
                                        <div className="overflow-hidden">
                                            <div className="text-[10px] font-bold uppercase tracking-widest">Attached Material</div>
                                            <div className="text-[10px] font-mono truncate">{selectedFile.name}</div>
                                            {isExtracting && <div className="text-[10px] text-nobel-gold animate-pulse mt-1">Extracting...</div>}
                                            {fileText && !isExtracting && <div className="text-[10px] text-green-400 mt-1">Ready</div>}
                                        </div>
                                    </div>
                                    <button onClick={removeFile} className="p-2 hover:bg-red-500 transition-colors text-white/50 hover:text-white" aria-label="Remove attached file">
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-6 flex flex-col md:flex-row gap-3 md:gap-4">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-ui-blue hover:border-ui-blue transition-all"
                                aria-label="Attach image or document"
                            >
                                <ImageIcon size={14} /> <span className="hidden md:inline">Attach</span> File
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-ui-blue text-white p-6 md:p-8 border-l-4 border-nobel-gold shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Sliders size={18} className="text-nobel-gold" />
                            <h3 className="font-serif text-xl italic">Rigidity</h3>
                        </div>
                        <div role="radiogroup" aria-label="Select quiz rigidity level" className="grid grid-cols-1 gap-2">
                            {(['Standard', 'Strict', 'Rigid'] as Rigidity[]).map((level) => (
                                <button 
                                    key={level}
                                    onClick={() => setRigidity(level)}
                                    className={`w-full text-left p-4 border transition-all flex justify-between items-center ${rigidity === level ? 'bg-nobel-gold text-ui-blue border-nobel-gold' : 'border-white/10 hover:bg-white/5'}`}
                                    role="radio"
                                    aria-checked={rigidity === level}
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{level}</span>
                                    {rigidity === level && <CheckCircle2 size={14} fill="currentColor" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={generateQuiz}
                        disabled={(!inputText && !selectedFile) || isExtracting}
                        className="w-full py-6 md:py-8 bg-nobel-gold text-ui-blue font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm shadow-2xl hover:bg-white border border-nobel-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        aria-label="Initialize quiz generation protocol"
                    >
                        {isExtracting ? <Loader2 className="animate-spin" size={18} /> : <>Initialize Protocol <ChevronRight size={18} /></>}
                    </button>
                </div>
            </div>
        </motion.div>
    );

    const GeneratingView = () => (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mb-8 text-nobel-gold"
            >
                <RefreshCcw size={64} md:size={80} strokeWidth={1} />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl text-ui-blue mb-4 leading-tight">Pedagogical Synthesis</h2>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] max-w-xs">{loadingMsg}</p>
            <div className="w-48 md:w-64 h-1 bg-slate-100 mt-12 overflow-hidden relative">
                <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 bg-ui-blue"
                />
            </div>
        </div>
    );

    const QuizView = () => {
        const q = questions[currentIdx];
        const progress = ((currentIdx + 1) / questions.length) * 100;

        return (
            <div className="max-w-4xl mx-auto px-4 md:px-0 pb-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                    <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Examination Node</div>
                        <h2 className="font-serif text-2xl md:text-3xl text-ui-blue">Batch_#25_PROT</h2>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 shrink-0"><Clock size={12}/> Timer</div>
                        <div className="text-xl md:text-2xl font-mono text-ui-blue bg-slate-100 md:bg-transparent px-3 py-1 md:p-0 flex-1 md:flex-none text-center rounded-none" role="timer" aria-label="Time elapsed">
                            {formatTime(timeElapsed)}
                        </div>
                    </div>
                </div>

                <div className="w-full h-1.5 bg-slate-100 mb-12 md:mb-16 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-nobel-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Quiz progress: ${Math.round(progress)}%`}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentIdx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 md:space-y-12"
                                role="group"
                                aria-labelledby={`question-${currentIdx + 1}`}
                            >
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold text-nobel-gold uppercase tracking-[0.4em]">Query {currentIdx + 1} / {questions.length}</span>
                                    <h3 id={`question-${currentIdx + 1}`} className="font-serif text-3xl md:text-4xl text-ui-blue leading-tight italic">"{q.question}"</h3>
                                </div>

                                <div role="radiogroup" aria-label={`Options for question ${currentIdx + 1}`} className="grid grid-cols-1 gap-3 md:gap-4">
                                    {q.options.map((opt, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleAnswer(i)}
                                            disabled={userAnswers[currentIdx] !== undefined} // Disable after answering
                                            className="w-full text-left p-5 md:p-6 bg-white border border-slate-200 hover:border-ui-blue group transition-all flex items-center gap-4 md:gap-6 shadow-sm hover:shadow-md"
                                            role="radio"
                                            aria-checked={userAnswers[currentIdx] === i}
                                            aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                                        >
                                            <div className="w-10 h-10 border border-slate-100 bg-slate-50 flex items-center justify-center font-bold text-xs text-slate-300 group-hover:bg-ui-blue group-hover:text-white group-hover:border-ui-blue transition-colors shrink-0">
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className="text-base md:text-lg text-slate-700 font-light">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-slate-900 text-white p-6 md:p-8 border-l-4 border-ui-blue shadow-2xl relative overflow-hidden h-fit">
                             <div className="absolute top-0 right-0 p-4 opacity-5"><BrainCircuit size={100} /></div>
                             <div className="relative z-10">
                                <h4 className="text-[9px] font-bold text-nobel-gold uppercase tracking-[0.4em] mb-6">Matrix Status</h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-[9px] font-bold uppercase text-slate-500">Rigidity</span>
                                        <span className="text-xs font-bold uppercase text-nobel-gold">{rigidity}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-[9px] font-bold uppercase text-slate-500">Progression</span>
                                        <span className="text-xs font-bold uppercase text-white">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-bold uppercase text-slate-500">Signal</span>
                                        <span className="text-[10px] font-bold uppercase text-green-500 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 animate-pulse" /> OPTIMAL</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ResultView = () => {
        const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
        const rank = percentage >= 80 ? 'Distinction' : percentage >= 60 ? 'Merit' : percentage >= 40 ? 'Pass' : 'Requires Review';

        return (
            <div className="max-w-5xl mx-auto px-4 md:px-0 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
                    {/* Final Grade Plaque */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                        <div className="bg-ui-blue text-white p-8 md:p-10 border-l-8 border-nobel-gold shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={140} /></div>
                            <div className="relative z-10">
                                <div className="text-[9px] font-bold text-nobel-gold uppercase tracking-[0.5em] mb-8">Performance Ledger</div>
                                <div className="text-7xl md:text-8xl font-serif mb-2 leading-none">{percentage}<span className="text-xl md:text-2xl text-nobel-gold/50">%</span></div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-white/10 pt-6 mb-12">Aggregate Score</div>
                                
                                <div className="grid grid-cols-2 gap-4 md:gap-8">
                                    <div>
                                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Rank</div>
                                        <div className="text-lg md:text-xl font-serif text-nobel-gold truncate">{rank}</div>
                                    </div>
                                    <div>
                                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Time Elapsed</div>
                                        <div className="text-lg md:text-xl font-serif text-nobel-gold">{formatTime(timeElapsed)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="w-full py-5 bg-nobel-gold text-ui-blue font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white border border-nobel-gold transition-all shadow-xl" onClick={exportResults} aria-label="Export official quiz slip">
                                <Download size={16} /> Export Official Slip
                            </button>
                            <button 
                                onClick={resetQuiz}
                                className="w-full py-5 border border-slate-200 text-slate-400 hover:text-ui-blue hover:border-ui-blue font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] transition-all"
                                aria-label="Reset quiz and start a new one"
                            >
                                Reset Matrix Loop
                            </button>
                        </div>
                    </div>

                    {/* Detailed Review */}
                    <div className="lg:col-span-8 mt-12 md:mt-0">
                        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-slate-200 pb-6">
                            <h3 className="font-serif text-2xl md:text-3xl text-ui-blue italic">Detailed Review</h3>
                            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">25 Queries Verified</div>
                        </div>

                        <div className="space-y-10 md:space-y-12">
                            {questions.map((q, i) => {
                                const isCorrect = userAnswers[i] === q.correctIndex;
                                return (
                                    <div key={i} className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm group" role="article" aria-labelledby={`review-question-${i+1}`}>
                                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                            <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-xs ${isCorrect ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {isCorrect ? <CheckCircle2 size={32}/> : <XCircle size={32}/>}
                                            </div>
                                            <div className="flex-1 w-full">
                                                <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-3">Query_Artifact_#{i+1}</div>
                                                <h4 id={`review-question-${i+1}`} className="font-serif text-xl md:text-2xl text-ui-blue mb-6 leading-snug">"{q.question}"</h4>
                                                
                                                <div className="space-y-2 mb-8" role="list">
                                                    {q.options.map((opt, optIdx) => {
                                                        const isSelected = userAnswers[i] === optIdx;
                                                        const isTrueCorrect = q.correctIndex === optIdx;
                                                        return (
                                                            <div 
                                                                key={optIdx} 
                                                                className={`p-4 text-sm font-medium flex flex-col md:flex-row justify-between md:items-center gap-2 ${isTrueCorrect ? 'bg-green-50 text-green-800' : isSelected ? 'bg-red-50 text-red-800' : 'text-slate-500'}`}
                                                                role="listitem"
                                                            >
                                                                <span className="flex-1">{String.fromCharCode(65 + optIdx)}. {opt}</span>
                                                                {isTrueCorrect && <span className="w-fit text-[8px] font-bold uppercase tracking-widest bg-green-200 px-2 py-0.5 rounded-full text-green-800 shrink-0">Correct Match</span>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="bg-slate-50 p-5 md:p-6 border-l-4 border-ui-blue" role="region" aria-labelledby={`explanation-${i+1}`}>
                                                    <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2"><Sparkles size={12}/> <span id={`explanation-${i+1}`}>Archival Explanation</span></div>
                                                    <p className="text-sm text-slate-600 leading-relaxed font-light italic">
                                                        {q.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 relative pt-32 px-4 md:px-6 overflow-x-hidden">
            <AnimatePresence mode="wait">
                {step === 'upload' && <UploadView key="upload" />}
                {step === 'generating' && <GeneratingView key="generating" />}
                {step === 'quiz' && <QuizView key="quiz" />}
                {step === 'result' && <ResultView key="result" />}
            </AnimatePresence>
        </div>
    );
};
