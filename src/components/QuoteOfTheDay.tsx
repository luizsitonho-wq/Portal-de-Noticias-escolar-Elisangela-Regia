/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from '../types';
import { Quote as QuoteIcon, RefreshCw, Sparkles, Heart } from 'lucide-react';

interface QuoteOfTheDayProps {
  quotes: Quote[];
}

/**
 * Componente: Frase do Dia
 * Posicionada logo abaixo da notícia destaque na página principal.
 * Traz mensagens de incentivo aos estudos, reflexão cidadã, animação fluida e interação de inspiração.
 */
export const QuoteOfTheDay: React.FC<QuoteOfTheDayProps> = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState<Record<number, number>>({ 0: 48, 1: 65, 2: 92, 3: 57 });
  const [hasLiked, setHasLiked] = useState<Record<number, boolean>>({});

  const currentQuote = quotes[currentIndex] || quotes[0];

  const handleNextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleLike = () => {
    const isLiked = hasLiked[currentIndex];
    setHasLiked((prev) => ({ ...prev, [currentIndex]: !isLiked }));
    setLikes((prev) => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 40) + (isLiked ? -1 : 1),
    }));
  };

  return (
    <aside 
      id="frase-do-dia" 
      aria-label="Frase do dia para reflexão escolar"
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
        {/* Ícone e Título da Seção */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-800 dark:text-emerald-400 flex-shrink-0">
            <QuoteIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
              Pensamento do Dia
            </span>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Reflexão e Inspiração para os Estudos
            </h3>
          </div>
        </div>

        {/* Controles: Curtir e Sortear Frase */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
              hasLiked[currentIndex]
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
                : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            title="Inspirou meus estudos"
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked[currentIndex] ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{likes[currentIndex] || 45}</span>
          </button>

          <button
            id="btn-next-quote"
            onClick={handleNextQuote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            title="Ver outra frase inspiradora"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Outra reflexão</span>
          </button>
        </div>
      </div>

      {/* Conteúdo da Citação com Transição Animada */}
      <div className="pt-4 min-h-[84px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <blockquote className="font-editorial text-base sm:text-lg lg:text-[19px] font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed">
              &ldquo;{currentQuote.text}&rdquo;
            </blockquote>
            
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <cite className="not-italic flex items-center gap-2 text-xs sm:text-sm">
                <span className="font-bold text-slate-950 dark:text-white">{currentQuote.author}</span>
                {currentQuote.role && (
                  <span className="text-slate-500 dark:text-slate-400">({currentQuote.role})</span>
                )}
              </cite>

              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                {currentIndex + 1} de {quotes.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
};

