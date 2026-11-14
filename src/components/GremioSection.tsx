/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GremioAction, GremioPoll } from '../types';
import { 
  Sparkles, 
  Megaphone, 
  Award, 
  CheckCircle2, 
  Clock, 
  Vote, 
  Heart,
  Crown
} from 'lucide-react';

interface GremioSectionProps {
  actions: GremioAction[];
  onOpenFeedback: () => void;
  gremioName: string;
  gremioBoard: string;
  gremioQuote: string;
  poll: GremioPoll;
  onVotePoll: (option: string) => void;
}

export const GremioSection: React.FC<GremioSectionProps> = ({ 
  actions, 
  onOpenFeedback, 
  gremioName, 
  gremioBoard, 
  gremioQuote,
  poll,
  onVotePoll
}) => {
  const [userVoted, setUserVoted] = useState<string | null>(() => {
    return localStorage.getItem(`voted_poll_${poll.id}`);
  });
  const [actionLikes, setActionLikes] = useState<Record<string, number>>({
    'gremio-1': 89,
    'gremio-2': 142,
    'gremio-3': 76,
  });
  const [likedActions, setLikedActions] = useState<Record<string, boolean>>({});

  const totalVotes = (Object.values(poll.options || {}) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  const handleVote = (option: string) => {
    if (userVoted || !poll.isActive) return;
    onVotePoll(option);
    setUserVoted(option);
    localStorage.setItem(`voted_poll_${poll.id}`, option);
  };

  const handleLikeAction = (id: string) => {
    const isLiked = likedActions[id];
    setLikedActions((prev) => ({ ...prev, [id]: !isLiked }));
    setActionLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (isLiked ? -1 : 1),
    }));
  };

  const getStatusBadge = (status: GremioAction['status']) => {
    switch (status) {
      case 'Concluído':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'Em andamento':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60';
      case 'Próximo':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
    }
  };

  return (
    <section 
      id="gremio-estudantil" 
      aria-labelledby="heading-gremio" 
      className="scroll-mt-24 rounded-2xl bg-slate-900 text-white p-5 sm:p-7 lg:p-8 border border-slate-800 relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* Cabeçalho da Seção do Grêmio */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  Representação Estudantil • Gestão 2026
                </span>
              </div>
              <h2 id="heading-gremio" className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {gremioName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Ações, projetos, representatividade discente e enquetes da comunidade escolar.
              </p>
            </div>
          </div>

          <button
            id="btn-sugestao-gremio"
            onClick={onOpenFeedback}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors self-start md:self-auto cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            <span>Enviar Ideia ao Grêmio</span>
          </button>
        </div>

        {/* DESTAQUE DA PRESIDÊNCIA */}
        <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-700 text-amber-300 flex items-center justify-center font-bold text-base flex-shrink-0">
                👑
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  Presidência Oficial • Gestão 2026
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {gremioBoard}
                </h3>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 border-slate-700/60 pt-2 sm:pt-0 w-full sm:w-auto">
              <p className="text-xs text-slate-300 italic">
                &ldquo;{gremioQuote}&rdquo;
              </p>
              <p className="text-[11px] font-medium text-amber-400 mt-0.5">
                — {gremioBoard}
              </p>
            </div>
          </div>
        </div>

        {/* Layout em Grid: Ações e Projetos + Enquete Estudantil */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Projetos & Ações</span>
              </h3>
              <span className="text-xs text-slate-500">
                {actions.length} iniciativas
              </span>
            </div>

            <div className="space-y-2.5">
              {actions.map((act) => {
                const isLiked = likedActions[act.id] || false;
                const likesCount = actionLikes[act.id] || 60;

                return (
                  <div
                    key={act.id}
                    id={`card-gremio-${act.id}`}
                    className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/70 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        {act.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(act.status)}`}>
                        {act.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">
                      {act.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                      {act.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-700/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{act.date}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-medium">
                          {act.leader}
                        </span>

                        <button
                          onClick={() => handleLikeAction(act.id)}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-semibold transition-colors cursor-pointer ${
                            isLiked
                              ? 'bg-rose-950 border-rose-800 text-rose-300'
                              : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                          <span>{likesCount}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna 2 (5 colunas): Enquete Estudantil Interativa */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-800/80 rounded-xl p-5 border border-slate-700">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Vote className="w-4 h-4" />
                  <span>Enquete dos Alunos</span>
                </span>
                <span className="text-[11px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono font-medium">
                  {totalVotes} votos
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug mb-1">
                {poll.question}
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {poll.description}
              </p>

              {/* Opções de Voto */}
              <div className="space-y-2">
                {(Object.entries(poll.options || {}) as [string, number][]).map(([option, count]) => {
                  const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                  const isSelected = userVoted === option;
                  const showResults = !!userVoted || !poll.isActive;

                  return (
                    <button
                      key={option}
                      id={`btn-vote-${option.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleVote(option)}
                      disabled={showResults}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all relative overflow-hidden ${
                        isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-white'
                          : showResults
                          ? 'bg-slate-900/60 border-slate-850 text-slate-400'
                          : 'bg-slate-900/80 hover:bg-slate-700/80 border-slate-700 text-white cursor-pointer'
                      }`}
                    >
                      {showResults && (
                        <div
                          style={{ width: `${percentage}%` }}
                          className={`absolute top-0 bottom-0 left-0 ${
                            isSelected ? 'bg-amber-400/25' : 'bg-slate-700/50'
                          }`}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                          <span>{option}</span>
                        </span>
                        {showResults && (
                          <span className="font-bold text-amber-300 font-mono ml-2">
                            {percentage}% ({count})
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/70 text-xs text-center text-slate-400">
              {!poll.isActive ? (
                <p className="text-amber-300 font-medium">Votação encerrada pela administração.</p>
              ) : userVoted ? (
                <p className="text-amber-300 font-medium flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Voto computado com sucesso!</span>
                </p>
              ) : (
                <p className="text-slate-400">
                  Clique em uma opção para votar (1 voto por aluno).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
