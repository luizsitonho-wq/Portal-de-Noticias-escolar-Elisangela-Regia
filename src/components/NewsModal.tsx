/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem, Administrator } from '../types';
import { X, Calendar, Clock, User, Heart, Share2, Tag, BookOpen, Check, Mail, Phone } from 'lucide-react';

interface NewsModalProps {
  news: NewsItem | null;
  administrators: Administrator[];
  onClose: () => void;
}

/**
 * Componente: Modal de Leitura Completa da Notícia
 * Apresenta a matéria completa com imagem em alta resolução,
 * autoria, categoria e formatação jornalística adequada.
 */
export const NewsModal: React.FC<NewsModalProps> = ({ news, administrators, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!news) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${news.title} - Leia no Portal do Portal de Notícias Escolar Elisângela Régia`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      onClick={onClose}
    >
        <div className="bg-white dark:bg-slate-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        {/* Botão de Fechar */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar notícia"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Imagem de Capa */}
        <figure className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 rounded-t-xl">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white mb-2 shadow-xs">
              {news.tag}
            </span>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-tight">
              {news.title}
            </h2>
          </div>
        </figure>

        {/* Corpo da Notícia */}
        <div className="p-6 sm:p-8">
          {/* Metadados */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-5 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{news.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{news.readTimeMinutes} min de leitura</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
              </button>
            </div>
          </div>

          {/* Resumo em Destaque (Linha Fina / Lede) */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border-l-2 border-emerald-800 dark:border-emerald-500 text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed mb-6">
            {news.summary}
          </div>

          {/* Texto Completo da Matéria */}
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {news.content}
          </div>

          {/* Assinatura do Autor */}
          <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                  {news.author}
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Redação Elisângela Régia</span>
                {news.authorAdminId && administrators.find(a => a.id === news.authorAdminId) && (
                  <div className="flex gap-2 mt-1">
                    {administrators.find(a => a.id === news.authorAdminId)?.email && (
                      <a href={`mailto:${administrators.find(a => a.id === news.authorAdminId)?.email}`} className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5 hover:underline">
                        <Mail className="w-3 h-3" /> E-mail
                      </a>
                    )}
                    {administrators.find(a => a.id === news.authorAdminId)?.phone && (
                      <a href={`tel:${administrators.find(a => a.id === news.authorAdminId)?.phone}`} className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5 hover:underline">
                        <Phone className="w-3 h-3" /> WhatsApp
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Fechar Matéria
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

