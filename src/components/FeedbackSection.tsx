/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FeedbackSubmission, FeedbackCategory } from '../types';
import { 
  MessageSquareQuote, 
  Send, 
  Lightbulb, 
  Sparkles, 
  ThumbsUp, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  HelpCircle,
  BookMarked
} from 'lucide-react';

interface FeedbackSectionProps {
  feedbacks: FeedbackSubmission[];
  onAddFeedback: (feedback: FeedbackSubmission) => void;
}

/**
 * Componente: Formulário de Feedback, Sugestões e Dicas de Estudo
 * Permite que a comunidade escolar envie feedbacks sobre as notícias,
 * compartilhe macetes para provas e sugira pautas para o jornal da escola.
 */
export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  feedbacks,
  onAddFeedback,
}) => {
  const [activeTab, setActiveTab] = useState<'mural' | 'formulario'>('formulario');

  // Estado dos campos do formulário
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [gradeClass, setGradeClass] = useState('');
  const [category, setCategory] = useState<FeedbackCategory>('macete');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Mensagem de confirmação de envio
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Curtidas nos feedbacks do mural
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [likedUserMap, setLikedUserMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    const isLiked = likedUserMap[id];
    setLikedUserMap((prev) => ({ ...prev, [id]: !isLiked }));
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (isLiked ? -1 : 1),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      alert('Por favor, preencha o assunto e a mensagem antes de enviar.');
      return;
    }

    const newSubmission: FeedbackSubmission = {
      id: `fb-${Date.now()}`,
      authorName: isAnonymous ? 'Aluno Anônimo' : authorName.trim() || 'Estudante da Escola',
      gradeClass: isAnonymous ? 'Comunidade Escolar' : gradeClass.trim() || 'Geral',
      category,
      subject: subject.trim(),
      message: message.trim(),
      createdAt: 'Agora mesmo',
      likes: 0,
    };

    onAddFeedback(newSubmission);

    // Resetar campos
    setAuthorName('');
    setIsAnonymous(false);
    setGradeClass('');
    setSubject('');
    setMessage('');

    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setActiveTab('mural');
    }, 1800);
  };

  const getCategoryDetails = (cat: FeedbackCategory) => {
    switch (cat) {
      case 'macete':
        return { label: 'Macete de Prova', color: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800' };
      case 'dica_estudo':
        return { label: 'Dica de Estudo', color: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' };
      case 'sugestao':
        return { label: 'Sugestão de Pauta', color: 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800' };
      case 'feedback':
        return { label: 'Feedback do Portal', color: 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-800' };
    }
  };

  return (
    <section 
      id="feedback-sugestoes" 
      aria-labelledby="heading-feedback" 
      className="scroll-mt-24"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            Voz da Comunidade Escolar
          </span>
          <h2 id="heading-feedback" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center">
            <span className="editorial-bar bg-emerald-800 dark:bg-emerald-500" />
            Feedbacks, Sugestões & Dicas de Estudo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Compartilhe métodos de estudo, envie sugestões de pauta ou mande seu recado à redação.
          </p>
        </div>

        {/* Alternador entre Formulário e Mural */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-md">
          <button
            id="tab-formulario-feedback"
            onClick={() => setActiveTab('formulario')}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'formulario'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar Mensagem</span>
          </button>
          <button
            id="tab-mural-dicas"
            onClick={() => setActiveTab('mural')}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mural'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Mural ({feedbacks.length})</span>
          </button>
        </div>
      </div>

      {/* Notificação Toast de Sucesso */}
      <AnimatePresence>
        {showSuccessToast && (
          <div className="mb-5 p-3.5 rounded-lg bg-emerald-800 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <div>
                <p className="font-bold text-xs">Mensagem enviada com sucesso!</p>
                <p className="text-[11px] text-emerald-100">Sua dica ou sugestão já foi adicionada ao mural da escola.</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Conteúdo: Formulário de Envio OU Mural dos Alunos */}
      <AnimatePresence mode="wait">
        {activeTab === 'formulario' ? (
          <div 
            key="formulario"
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs"
          >
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome do Aluno / Usuário */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Seu Nome ou Apelido:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled={isAnonymous}
                      value={authorName ?? ""}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={isAnonymous ? 'Modo Anônimo Ativado' : 'Ex: Lucas Silva'}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg border ${
                        isAnonymous
                          ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-700 focus:outline-none'
                      }`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="checkbox-anonimo"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                    />
                    <label htmlFor="checkbox-anonimo" className="text-[11px] font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                      Enviar anonimamente
                    </label>
                  </div>
                </div>

                {/* Turma / Série */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Sua Turma / Segmento:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled={isAnonymous}
                      value={gradeClass ?? ""}
                      onChange={(e) => setGradeClass(e.target.value)}
                      placeholder="Ex: 1ª Série Adm, 2ª Série DS, etc."
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg border ${
                        isAnonymous
                          ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-700 focus:outline-none'
                      }`}
                    />
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Categoria da Mensagem */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Tipo de Mensagem:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'macete', label: 'Macete de Prova', icon: Sparkles },
                    { id: 'dica_estudo', label: 'Dica de Estudo', icon: Lightbulb },
                    { id: 'sugestao', label: 'Sugestão de Pauta', icon: Send },
                    { id: 'feedback', label: 'Feedback do Portal', icon: MessageSquareQuote },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.id;

                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id as FeedbackCategory)}
                        className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-700 dark:border-emerald-500 text-emerald-900 dark:text-emerald-300 ring-1 ring-emerald-700 dark:ring-emerald-500'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Título / Assunto */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Título ou Tema Principal: *
                </label>
                <input
                  type="text"
                  required
                  value={subject ?? ""}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Como memorizei a tabela periódica / Ideia para o jornal escolar"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              {/* Mensagem Detalhada */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Sua Mensagem / Dica Completa: *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message ?? ""}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua sugestão, crítica construtiva ou macete que ajuda você nos estudos..."
                  className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              {/* Botão de Envio */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  id="btn-enviar-formulario"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar no Mural Escolar</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Mural de Dicas e Feedbacks dos Alunos */
          <div 
            key="mural"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {feedbacks.map((fb) => {
              const badge = getCategoryDetails(fb.category);
              const totalLikes = fb.likes + (likesMap[fb.id] || 0);
              const isLiked = likedUserMap[fb.id];

              return (
                <div
                  key={fb.id}
                  id={`card-feedback-${fb.id}`}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {fb.createdAt}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                      {fb.subject}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      {fb.message}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate text-xs">{fb.authorName}</span>
                      <span className="text-slate-400 text-[10px]">({fb.gradeClass})</span>
                    </div>

                    <button
                      onClick={() => handleLike(fb.id)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        isLiked
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                      title="Esta dica foi útil"
                    >
                      <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-white' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span>{totalLikes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

