/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyMenu } from '../types';
import { 
  Utensils, 
  Leaf, 
  Info, 
  CalendarDays, 
  Sparkles,
  HeartPulse,
  Smile,
  ThumbsUp
} from 'lucide-react';

interface DailyMenuSectionProps {
  menus: DailyMenu[];
}

/**
 * Componente: Comida do Dia / Cardápio da Merenda Escolar
 * Exibe o cardápio balanceado da alimentação escolar com seleção de dias da semana,
 * animações fluidas com motion e interação de avaliação rápida dos estudantes.
 */
export const DailyMenuSection: React.FC<DailyMenuSectionProps> = ({ menus }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [mealReactions, setMealReactions] = useState<Record<number, { love: number; yummy: number; healthy: number }>>({
    0: { love: 124, yummy: 88, healthy: 95 },
    1: { love: 78, yummy: 64, healthy: 82 },
    2: { love: 105, yummy: 92, healthy: 110 },
    3: { love: 89, yummy: 73, healthy: 90 },
    4: { love: 140, yummy: 118, healthy: 85 },
  });
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({});

  const currentMenu = menus[selectedDayIndex] || menus[0];

  const handleReact = (type: 'love' | 'yummy' | 'healthy') => {
    const key = `${selectedDayIndex}-${type}`;
    const already = userReacted[key];
    setUserReacted((prev) => ({ ...prev, [key]: !already }));
    setMealReactions((prev) => {
      const current = prev[selectedDayIndex] || { love: 50, yummy: 50, healthy: 50 };
      return {
        ...prev,
        [selectedDayIndex]: {
          ...current,
          [type]: current[type] + (already ? -1 : 1),
        },
      };
    });
  };

  const reactions = mealReactions[selectedDayIndex] || { love: 100, yummy: 80, healthy: 90 };

  return (
    <section 
      id="cardapio-dia" 
      aria-labelledby="heading-cardapio" 
      className="scroll-mt-24"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            Serviço & Bem-Estar
          </span>
          <h2 id="heading-cardapio" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center">
            <span className="editorial-bar bg-emerald-800 dark:bg-emerald-500" />
            Comida do Dia & Cardápio Escolar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Refeições nutritivas e balanceadas preparadas pela equipe de nutrição escolar do CETI.
          </p>
        </div>

        {/* Seletor dos Dias da Semana */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {menus.map((m, idx) => (
            <button
              key={m.dayOfWeek}
              id={`btn-menu-day-${idx}`}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedDayIndex === idx
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{m.dayOfWeek.split('-')[0]}</span>
              {idx === 0 && (
                <span className="bg-amber-300 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-black">
                  Hoje
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Card Principal do Cardápio */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        {/* Banner do Dia Selecionado */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 border border-white/15">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Refeição Escolar
                </span>
                <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-slate-200 font-medium">
                  {currentMenu.dateFormatted}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {currentMenu.dayOfWeek}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-white/10 px-3 py-1 rounded-md border border-white/15 text-slate-200 font-medium">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supervisionado por Nutricionista</span>
          </div>
        </div>

        {/* Grid com Itens da Refeição: Prato Principal, Acompanhamento e Salada */}
        <div className="p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <div 
              key={selectedDayIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5"
            >
              {/* Prato Principal */}
              <div className="p-4 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
                  <Utensils className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Prato Principal</span>
                </div>
                <p className="text-sm font-bold text-slate-950 dark:text-white leading-snug">
                  {currentMenu.mainDish}
                </p>
              </div>

              {/* Acompanhamento */}
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Acompanhamento</span>
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {currentMenu.sideDish}
                </p>
              </div>

              {/* Salada & Guarnição */}
              <div className="p-4 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Salada do Dia</span>
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {currentMenu.salad}
                </p>
              </div>
            </div>
          </AnimatePresence>

          {/* Reações dos Estudantes ao Cardápio */}
          <div className="mb-5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              Avaliação dos estudantes para esta refeição:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleReact('love')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  userReacted[`${selectedDayIndex}-love`]
                    ? 'bg-rose-600 text-white'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>❤️ Amei</span>
                <span>{reactions.love}</span>
              </button>
              <button
                onClick={() => handleReact('yummy')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  userReacted[`${selectedDayIndex}-yummy`]
                    ? 'bg-amber-600 text-white'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>😋 Gostoso</span>
                <span>{reactions.yummy}</span>
              </button>
              <button
                onClick={() => handleReact('healthy')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  userReacted[`${selectedDayIndex}-healthy`]
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>🥗 Saudável</span>
                <span>{reactions.healthy}</span>
              </button>
            </div>
          </div>

          {/* Destaque Nutricional */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <Info className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white mb-0.5">Informação Nutricional do Cardápio:</p>
              <p className="leading-relaxed">{currentMenu.nutritionalHighlights}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                * Estudantes com restrições alimentares (celíacos, intolerantes a lactose ou alergias) devem procurar a coordenação da cantina.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

