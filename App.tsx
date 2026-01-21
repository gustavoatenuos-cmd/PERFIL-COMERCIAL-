import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS, RESULT_PROFILES } from './constants';
import { QuestionType, QuizState, Choice, CandidateRecord } from './types';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck,
  User,
  Briefcase,
  Camera,
  Star,
  Lock,
  Database,
  Trash2,
  Target,
  Trophy,
  CheckCircle2,
  Download,
  LogOut
} from 'lucide-react';

const ADMIN_CREDENTIALS = {
  user: 'admin',
  pass: 'percentfy2025'
};

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: -1, 
    answers: {},
    isFinished: false,
    step: 'landing',
    userName: '',
    userExperience: ''
  });

  const [openAnswer, setOpenAnswer] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('percentfy_database');
    if (saved) {
      try {
        setCandidates(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar banco de dados", e);
      }
    }
  }, []);

  const handleStartRegistration = () => {
    setState(prev => ({ ...prev, step: 'registration' }));
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.userName && state.userExperience) {
      setState(prev => ({ ...prev, step: 'quiz', currentQuestionIndex: 0 }));
    }
  };

  const handleSelectChoice = (questionId: number, choice: Choice) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: choice.id }
    }));

    setTimeout(() => {
      handleNext();
    }, 400);
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < QUESTIONS.length - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    } else {
      finishQuiz();
    }
  };

  const totalScore = useMemo(() => {
    let score = 0;
    Object.entries(state.answers).forEach(([qIdStr, selectedId]) => {
      const qId = parseInt(qIdStr);
      const question = QUESTIONS.find(q => q.id === qId);
      if (question && question.choices) {
        const choice = question.choices.find(c => c.id === selectedId);
        if (choice) {
          score += choice.points;
        }
      }
    });
    return score;
  }, [state.answers]);

  const resultProfile = useMemo(() => {
    const sorted = [...RESULT_PROFILES].sort((a, b) => b.minScore - a.minScore);
    return sorted.find(p => totalScore >= p.minScore) || RESULT_PROFILES[RESULT_PROFILES.length - 1];
  }, [totalScore]);

  const finishQuiz = () => {
    const newRecord: CandidateRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleString('pt-BR'),
      name: state.userName || 'Anônimo',
      experience: state.userExperience || '',
      score: totalScore,
      profileTitle: resultProfile.title,
      openAnswer: openAnswer
    };

    const updatedCandidates = [...candidates, newRecord];
    setCandidates(updatedCandidates);
    localStorage.setItem('percentfy_database', JSON.stringify(updatedCandidates));

    setState(prev => ({ ...prev, isFinished: true, step: 'finished' }));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === ADMIN_CREDENTIALS.user && adminPass === ADMIN_CREDENTIALS.pass) {
      setState(prev => ({ ...prev, step: 'admin_panel' }));
    } else {
      alert('Credenciais Inválidas');
    }
  };

  const exportCSV = () => {
    if (candidates.length === 0) return;
    const headers = ["ID", "Data", "Nome", "Score", "Perfil", "Experiência", "Resposta Aberta"];
    const rows = candidates.map(c => [
      c.id,
      c.date,
      c.name,
      c.score,
      c.profileTitle,
      `"${c.experience.replace(/"/g, '""')}"`,
      `"${c.openAnswer.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `candidatos_percentfy_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteCandidate = (id: string) => {
    if (confirm('Deseja excluir este registro permanentemente?')) {
      const filtered = candidates.filter(c => c.id !== id);
      setCandidates(filtered);
      localStorage.setItem('percentfy_database', JSON.stringify(filtered));
    }
  };

  const handleBack = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    } else if (state.currentQuestionIndex === 0) {
      setState(prev => ({ ...prev, step: 'registration', currentQuestionIndex: -1 }));
    } else {
      setState(prev => ({ ...prev, step: 'landing' }));
    }
  };

  const PercentfyLogo = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] flex-shrink-0">
        <circle cx="12" cy="12" r="6" fill="url(#paint0_linear)" />
        <path d="M34.5 6L10 42" stroke="url(#paint1_linear)" strokeWidth="6" strokeLinecap="round" />
        <path d="M42 12L17.5 48" stroke="url(#paint2_linear)" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
        <circle cx="36" cy="36" r="6" fill="url(#paint3_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="10" y1="6" x2="34.5" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="17.5" y1="12" x2="42" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="paint3_linear" x1="30" y1="30" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0891B2" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-black tracking-[-0.05em] text-white flex items-center">
        PERCE<span className="text-cyan-400">N</span>TFY
      </span>
    </div>
  );

  if (state.step === 'admin_panel') {
    return (
      <div className="min-h-screen bg-[#020617] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <PercentfyLogo />
              <div className="mt-4 flex items-center gap-3 text-cyan-400">
                <Database size={20} />
                <h1 className="text-xl font-black uppercase tracking-tighter">Banco de Talentos Capturados</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={exportCSV}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-cyan-500/20 shadow-lg shadow-cyan-500/10 transition-all"
              >
                <Download size={16} /> Exportar CSV
              </button>
              <button 
                onClick={() => setState(prev => ({ ...prev, step: 'landing' }))}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-700"
              >
                <LogOut size={16} /> Sair
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {candidates.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-20 text-center">
                <p className="text-slate-500 font-bold">Nenhum candidato registrado até o momento.</p>
              </div>
            ) : (
              [...candidates].reverse().map((c) => (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 hover:border-cyan-500/30 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400 font-black border border-slate-700">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-white uppercase tracking-tight">{c.name}</h3>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{c.date}</p>
                        </div>
                        <div className="ml-auto md:ml-4 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                          <span className="text-cyan-400 font-black text-xs">Score: {c.score}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-[10px] text-cyan-500/60 font-black uppercase tracking-widest">Resumo da Experiência</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{c.experience}</p>
                      </div>

                      {c.openAnswer && (
                        <div className="space-y-2 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                          <p className="text-[10px] text-blue-500/60 font-black uppercase tracking-widest">Resposta Aberta (Organização)</p>
                          <p className="text-slate-400 text-xs italic">"{c.openAnswer}"</p>
                        </div>
                      )}
                    </div>

                    <div className="md:text-right space-y-4 flex flex-col items-end min-w-[200px]">
                      <div className="w-full px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700 text-center md:text-right">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Perfil Resultante</p>
                        <p className="text-white font-black uppercase text-xs">{c.profileTitle}</p>
                      </div>
                      
                      <button 
                        onClick={() => deleteCandidate(c.id)}
                        className="text-red-500/40 hover:text-red-500 transition-colors p-2 flex items-center gap-2 text-[10px] font-black uppercase"
                        title="Excluir Registro"
                      >
                        <Trash2 size={16} /> Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (state.step === 'admin_login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617]">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[3rem] p-12 shadow-2xl">
          <div className="text-center mb-10">
            <PercentfyLogo className="justify-center mb-8" />
            <div className="flex items-center justify-center gap-3 text-cyan-400 mb-2">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-tighter">Área de Acesso Restrito</h2>
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Apenas para Gestores Percentfy</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="text"
                placeholder="Usuário"
                autoComplete="username"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <input 
                type="password"
                placeholder="Senha"
                autoComplete="current-password"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-widest text-[10px] shadow-lg"
            >
              Autenticar Acesso
            </button>
            <button 
              type="button"
              onClick={() => setState(prev => ({ ...prev, step: 'landing' }))}
              className="w-full text-slate-600 font-black text-[8px] uppercase tracking-widest py-2"
            >
              Voltar ao Início
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (state.step === 'finished') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#020617]">
        <div className="max-w-2xl w-full bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(6,182,212,0.1)] border border-slate-800 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-10">
             <PercentfyLogo className="scale-90 opacity-90" />
          </div>
          
          <div className="text-center mb-8">
            <div className="mb-4 inline-block px-4 py-1 bg-slate-800 rounded-full text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Candidato: {state.userName}
            </div>
            <span className="text-8xl mb-6 block leading-none drop-shadow-2xl">{resultProfile.icon}</span>
            <h2 className={`text-3xl font-black mb-3 uppercase tracking-tighter ${resultProfile.color}`}>{resultProfile.title}</h2>
            <div className="h-1.5 w-20 bg-cyan-600/30 mx-auto rounded-full mb-8"></div>
            <p className="text-slate-300 text-lg leading-relaxed px-4 font-medium italic mb-10">
              "{resultProfile.description}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {resultProfile.pillars.map((pillar, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-slate-800/50 p-6 rounded-2xl flex flex-col items-center text-center gap-3">
                <Star className="text-cyan-400 w-5 h-5 opacity-50" />
                <span className="text-white font-black text-[11px] uppercase tracking-wider">{pillar}</span>
              </div>
            ))}
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] p-8 text-center relative overflow-hidden group">
            <div className="flex items-center justify-center gap-4 text-cyan-400 mb-2">
              <Camera size={24} className="animate-pulse" />
              <span className="font-black uppercase tracking-[0.2em] text-xs">Ação Necessária</span>
            </div>
            <p className="text-white font-bold text-lg leading-snug">
              TIRE UM PRINT E ENVIE À NOSSA EQUIPE
            </p>
            <p className="text-slate-500 text-[10px] mt-2 font-black uppercase tracking-widest opacity-60">
              O registro do seu perfil está pronto para análise humana.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.step === 'registration') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
        <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-md rounded-[3.5rem] p-10 md:p-14 border border-slate-800 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
          <div className="mb-10 text-center">
            <PercentfyLogo className="justify-center scale-90 mb-8" />
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Identificação Profissional</h2>
            <p className="text-slate-500 text-sm font-medium">Dados obrigatórios para registro no banco de talentos.</p>
          </div>

          <form onSubmit={handleCompleteRegistration} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-4 flex items-center gap-2">
                  <User size={12} className="text-cyan-500" /> Nome Completo
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Ex: João Silva da Costa"
                  className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-800 focus:outline-none focus:border-cyan-500/50 transition-all font-bold"
                  value={state.userName}
                  onChange={(e) => setState(prev => ({ ...prev, userName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-4 flex items-center gap-2">
                  <Briefcase size={12} className="text-cyan-500" /> Experiência Profissional
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Descreva brevemente sua trajetória no mercado comercial ou marketing..."
                  className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-800 focus:outline-none focus:border-cyan-500/50 transition-all font-bold resize-none leading-relaxed"
                  value={state.userExperience}
                  onChange={(e) => setState(prev => ({ ...prev, userExperience: e.target.value }))}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white hover:bg-cyan-50 text-slate-950 font-black py-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
            >
              Confirmar e Iniciar Avaliação
              <ChevronRight size={18} />
            </button>
            
            <button 
              type="button"
              onClick={() => setState(prev => ({ ...prev, step: 'landing' }))}
              className="w-full text-slate-600 hover:text-slate-400 font-black py-2 transition-all uppercase tracking-[0.2em] text-[8px]"
            >
              Cancelar Registro
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (state.step === 'landing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#020617] overflow-hidden relative">
        {/* Admin floating button */}
        <div className="absolute top-8 right-8 z-50">
          <button 
            onClick={() => setState(prev => ({ ...prev, step: 'admin_login' }))}
            className="flex items-center gap-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-500 hover:text-cyan-400 px-4 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <Lock size={12} /> Acesso Gestor
          </button>
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>

        <div className="max-w-7xl w-full grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center relative z-10 flex-1">
          <div className="space-y-10 md:space-y-14">
            <div className="space-y-8 md:space-y-10">
              <PercentfyLogo />
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-white tracking-tighter uppercase">
                  AVALIAÇÃO DE PERFIL PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-blue-500">ALTA PERFORMANCE</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed border-l-4 border-cyan-500/30 pl-6">
                  "Identificamos profissionais com rigor organizacional e foco em resultados. Nosso modelo exige disciplina na gestão da demanda e excelência técnica."
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleStartRegistration}
              className="group relative flex items-center justify-center gap-4 bg-white hover:bg-cyan-50 text-slate-950 px-12 md:px-16 py-6 md:py-8 rounded-full font-black text-xl md:text-2xl transition-all shadow-[0_20px_50px_rgba(6,182,212,0.25)] uppercase tracking-tight overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-4">
                Iniciar Avaliação Técnica
                <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: <Target className="text-cyan-400" />, title: "MÉTODO E DISCIPLINA", desc: "Seguimento rigoroso de processos e cronogramas de retorno." },
              { icon: <ShieldCheck className="text-blue-400" />, title: "RIGOR ORGANIZACIONAL", desc: "Controle absoluto de cada etapa do funil através de métricas." },
              { icon: <Trophy className="text-indigo-400" />, title: "FOCO EM INDICADORES", desc: "Conversão baseada em dados e argumentos técnicos sólidos." },
              { icon: <CheckCircle2 className="text-emerald-400" />, title: "ÉTICA PROFISSIONAL", desc: "Postura séria e orientada a solução de problemas do cliente." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 md:p-10 bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] hover:border-cyan-500/40 transition-all group hover:-translate-y-2">
                <div className="mb-6 p-4 bg-slate-800/50 w-fit rounded-2xl group-hover:bg-cyan-500/10 group-hover:scale-110 transition-all">
                  {item.icon}
                </div>
                <h3 className="font-black text-white text-lg md:text-xl mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold opacity-80">"{item.desc}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 py-10 w-full flex justify-center border-t border-slate-800/50">
          <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">
            Percentfy © 2025 • Todos os direitos reservados
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#020617] font-sans">
      <div className="max-w-4xl w-full flex flex-col min-h-[90vh] py-8">
        <div className="mb-12 flex items-center justify-between px-6">
          <button 
            onClick={handleBack}
            className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors text-[10px] font-black uppercase tracking-[0.2em] group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex-1 mx-12 h-1 bg-slate-900 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-blue-600 transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-slate-600 text-[10px] font-black tracking-widest tabular-nums">
            {state.currentQuestionIndex + 1} / {QUESTIONS.length}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-2">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-[3.5rem] p-10 md:p-14 lg:p-20 border border-slate-800 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="mb-14 relative z-10 space-y-6">
               {currentQuestion.description && (
                <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                  <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">{currentQuestion.description}</p>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tighter uppercase max-w-3xl">
                {currentQuestion.title}
              </h2>
            </div>

            <div className="space-y-4 md:space-y-5 relative z-10">
              {currentQuestion.type === QuestionType.MULTIPLE_CHOICE ? (
                currentQuestion.choices?.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(currentQuestion.id, choice)}
                    className={`w-full p-6 md:p-8 rounded-[2rem] text-left border-2 transition-all flex items-center justify-between group
                      ${state.answers[currentQuestion.id] === choice.id 
                        ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_20px_40px_rgba(6,182,212,0.25)] translate-x-2' 
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:bg-slate-800/80 hover:border-slate-600 hover:text-slate-100'}`}
                  >
                    <span className="text-md md:text-lg font-bold leading-tight pr-10">{choice.text}</span>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0
                      ${state.answers[currentQuestion.id] === choice.id 
                        ? 'border-white bg-white' 
                        : 'border-slate-800 group-hover:border-slate-600'}`}>
                      {state.answers[currentQuestion.id] === choice.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-600"></div>}
                    </div>
                  </button>
                ))
              ) : (
                <div className="space-y-10">
                  <textarea
                    className="w-full h-56 bg-slate-950/50 border-2 border-slate-800 rounded-[3rem] p-10 text-white placeholder-slate-800 focus:outline-none focus:ring-8 focus:ring-cyan-500/10 focus:border-cyan-500/40 transition-all resize-none font-bold text-lg md:text-xl leading-relaxed shadow-inner"
                    placeholder={currentQuestion.placeholder}
                    value={openAnswer}
                    onChange={(e) => setOpenAnswer(e.target.value)}
                  />
                  <button
                    onClick={handleNext}
                    disabled={!openAnswer.trim()}
                    className="w-full bg-white hover:bg-cyan-50 disabled:opacity-5 disabled:grayscale disabled:cursor-not-allowed text-slate-950 font-black py-8 rounded-[2.5rem] transition-all flex items-center justify-center gap-5 shadow-2xl uppercase tracking-[0.2em] text-[10px]"
                  >
                    Finalizar Avaliação Técnica
                    <ChevronRight size={28} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-14 flex flex-col items-center gap-6 opacity-20 hover:opacity-60 transition-all duration-700">
          <PercentfyLogo className="scale-75 grayscale brightness-200" />
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em]">Grupo Percentfy • Unidade de Performance • 2025</p>
        </div>
      </div>
    </div>
  );
};

export default App;