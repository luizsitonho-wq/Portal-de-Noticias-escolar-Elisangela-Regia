/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '../types';
import { Sparkles, Calendar, Clock, User, Heart, ArrowRight, Share2, Check, Bookmark } from 'lucide-react';

interface FeaturedNewsProps {
  news: NewsItem;
  onOpenModal: (news: NewsItem) => void;
}

/**
 * Componente: Notícia Destaque Principal (Hero Banner)
 * Exibida no topo da página principal com animações e interações ricas.
 */
export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ news, onOpenModal }) => {
  const [likes, setLikes] = useState(news.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${news.title} - Leia no Portal de Notícias Escolar Elisângela Régia`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <article 
      id="noticia-destaque-principal"
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Imagem da Manchete */}
        <figure className="lg:col-span-7 relative h-72 sm:h-80 lg:h-auto min-h-[320px] overflow-hidden bg-slate-900">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          {/* Badge de Editoria / Chapéu na foto (Mobile) */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-800 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{news.tag || 'Manchete'}</span>
          </div>

          {/* Botão de Salvar nos Favoritos */}
          <button
            onClick={handleSave}
            className={`absolute top-3.5 right-3.5 p-2 rounded-md transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-400 text-slate-900 shadow-xs'
                : 'bg-black/50 hover:bg-black/70 text-white'
            }`}
            title={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-slate-900' : ''}`} />
          </button>
        </figure>

        {/* Conteúdo textual da Manchete */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-white dark:bg-slate-900">
          <div>
            {/* Metadados e Chapéu Editorial */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                {news.tag || 'Destaque Principal'}
              </span>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <time className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{news.date}</span>
                </time>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{news.readTimeMinutes} min</span>
                </span>
              </div>
            </div>

            {/* Título Principal (Manchete com tipografia jornalística estilo grandes portais) */}
            <h2 
              onClick={() => onOpenModal(news)}
              className="font-editorial text-xl sm:text-2xl lg:text-[27px] font-bold text-slate-950 dark:text-white leading-[1.25] mb-3 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {news.title}
            </h2>

            {/* Resumo da Notícia (Linha-fina / Lede Jornalístico) */}
            <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 line-clamp-3 sm:line-clamp-4 leading-relaxed mb-6">
              {news.summary}
            </p>
          </div>

          {/* Rodapé do Card com Autor e Ações */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {news.author}
                  </p>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Redação Elisângela Régia</span>
                </div>
              </div>

              {/* Botões de Interação (Curtir e Compartilhar) */}
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-like-featured"
                  onClick={handleLike}
                  title="Curtir esta matéria"
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    hasLiked 
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50' 
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{likes}</span>
                </button>

                <button
                  id="btn-share-featured"
                  onClick={handleShare}
                  title="Copiar link da matéria"
                  className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                >
                  {copied ? (
                    <span className="flex items-center text-emerald-700 dark:text-emerald-400 font-bold">
                      <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Botão de Ler Matéria Completa */}
            <button
              id="btn-read-featured"
              onClick={() => onOpenModal(news)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>Ler Matéria Completa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

