/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem, NewsCategory } from '../types';
import { BookOpen, Calendar, Clock, User, Heart, ArrowRight, Filter, Flame, Share2, Check } from 'lucide-react';

interface SchoolNewsSectionProps {
  newsList: NewsItem[];
  searchTerm: string;
  onOpenModal: (news: NewsItem) => void;
}

/**
 * Componente: Seção do Diário da Escola
 * Apresenta o feed de notícias filtráveis por periodicidade (Diárias, Semanais, Mensais, Gerais)
 * e compatível com busca de texto por título e conteúdo com animações motion.
 */
export const SchoolNewsSection: React.FC<SchoolNewsSectionProps> = ({
  newsList,
  searchTerm,
  onOpenModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'todos' | NewsCategory>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, { count: number; userLiked: boolean }>>(
    () => {
      const initial: Record<string, { count: number; userLiked: boolean }> = {};
      newsList.forEach((n) => {
        initial[n.id] = { count: n.likes, userLiked: false };
      });
      return initial;
    }
  );

  const toggleLike = (newsId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => {
      const current = prev[newsId] || { count: 0, userLiked: false };
      const nextUserLiked = !current.userLiked;
      return {
        ...prev,
        [newsId]: {
          count: nextUserLiked ? current.count + 1 : current.count - 1,
          userLiked: nextUserLiked,
        },
      };
    });
  };

  const handleShare = (item: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.title} - Portal de Notícias Escolar Elisângela Régia`);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Filtragem de notícias por categoria e termo de busca
  const filteredNews = newsList.filter((item) => {
    const matchesFilter = selectedFilter === 'todos' || item.category === selectedFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs = [
    { id: 'todos', label: 'Todas as Notícias' },
    { id: 'diario', label: 'Diárias' },
    { id: 'semanal', label: 'Semanais' },
    { id: 'mensal', label: 'Mensais' },
    { id: 'geral', label: 'Gerais' },
  ];

  return (
    <section 
      id="noticias-diario" 
      aria-labelledby="heading-diario-escola" 
      className="scroll-mt-24"
    >
      {/* Cabeçalho da Seção com Título e Filtros */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            Editoria de Notícias
          </span>
          <h2 id="heading-diario-escola" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center">
            <span className="editorial-bar bg-emerald-800 dark:bg-emerald-500" />
            Diário da Escola & Notícias
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Acompanhe o cotidiano pedagógico, comunicados oficiais, projetos e coberturas escolares.
          </p>
        </div>

        {/* Abas de Filtros de Periodicidade */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mr-1 hidden sm:block flex-shrink-0" />
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-filtro-${tab.id}`}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 dark:bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Notícias Semântico com <article> */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
          <BookOpen className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Nenhuma notícia encontrada nesta categoria</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tente selecionar outro filtro ou limpar os termos da pesquisa.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => {
              const likeState = likedMap[item.id] || { count: item.likes, userLiked: false };

              return (
                <article
                  key={item.id}
                  id={`card-noticia-${item.id}`}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Imagem de Capa do Artigo */}
                    <figure className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 text-white">
                          {item.category}
                        </span>
                      </div>
                      {item.tag && (
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-slate-900 shadow-xs">
                            {item.tag}
                          </span>
                        </div>
                      )}
                    </figure>

                    {/* Conteúdo textual */}
                    <div className="p-4 sm:p-5">
                      {/* Metadados */}
                      <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                        <time className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          <span>{item.date}</span>
                        </time>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          <span>{item.readTimeMinutes} min</span>
                        </span>
                      </div>

                      {/* Título com estilo editorial */}
                      <h3 
                        onClick={() => onOpenModal(item)}
                        className="font-editorial text-base sm:text-[17px] font-bold text-slate-950 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-[1.3] line-clamp-2 cursor-pointer mb-2"
                      >
                        {item.title}
                      </h3>

                      {/* Resumo */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Rodapé do Card com Ações e Autor */}
                  <div className="px-4 sm:px-5 pb-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-slate-700 dark:text-slate-300 truncate font-medium">
                        {item.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        id={`btn-like-${item.id}`}
                        onClick={(e) => toggleLike(item.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                          likeState.userLiked
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title="Curtir matéria"
                      >
                        <Heart className={`w-3.5 h-3.5 ${likeState.userLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{likeState.count}</span>
                      </button>

                      <button
                        onClick={(e) => handleShare(item, e)}
                        className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                        title="Copiar link"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        id={`btn-read-${item.id}`}
                        onClick={() => onOpenModal(item)}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 pl-1 cursor-pointer"
                      >
                        <span>Ler</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

