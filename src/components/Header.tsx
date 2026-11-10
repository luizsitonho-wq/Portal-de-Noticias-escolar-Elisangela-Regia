/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  Calendar, 
  Bell, 
  Sparkles,
  BookOpen, 
  Utensils, 
  Users, 
  Award, 
  MessageSquareQuote,
  Clock,
  ChevronRight,
  Flame,
  Moon,
  Sun
} from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

/**
 * Componente: Cabeçalho do Portal de Notícias
 * Inspirado nos grandes portais jornalísticos brasileiros (G1, Folha de S.Paulo, Estadão):
 * - Barra de utilidades e plantão (ticker) de avisos em tempo real
 * - Cabeçalho com identidade visual sóbria, limpa e de alta legibilidade
 * - Barra de editorias horizontais com indicador sutil
 * - Acesso rápido à área de gestão escolar
 */
export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  activeSection,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [tickerIndex, setTickerIndex] = useState(0);

  // Avisos dinâmicos em rotação contínua (Plantão Escolar)
  const announcements = [
    'Grêmio Estudantil: Gestão oficial com Kauane Melo & Lü Sitonho!',
    'Calendário: Provas Bimestrais e Simulados Técnicos em andamento.',
    'Refeitório: Confira o cardápio nutritivo e balanceado de hoje.',
    'Mural de Honra: Parabéns aos alunos destaques de cada sala e curso!',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Atualização em tempo real da data e hora atual
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = now.toLocaleDateString('pt-BR', options);
      const capitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentDateTime(`${capitalized} • ${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Itens de navegação principal (Editorias)
  const navItems = [
    { id: 'noticias-diario', label: 'Diário & Notícias', icon: BookOpen },
    { id: 'provas-simulados', label: 'Provas & Simulados', icon: Calendar },
    { id: 'eventos-escolares', label: 'Eventos', icon: Bell },
    { id: 'alunos-destaque', label: 'Alunos Destaque', icon: Award },
    { id: 'cardapio-dia', label: 'Cardápio Escolar', icon: Utensils },
    { id: 'gremio-estudantil', label: 'Grêmio Estudantil', icon: Sparkles },
    { id: 'feedback-sugestoes', label: 'Mural & Sugestões', icon: MessageSquareQuote },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="header-principal" className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* 1. Barra Superior de Utilidades e Plantão de Notícias */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800 dark:border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Plantão / Ticker */}
          <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-ping inline-block" />
              Plantão
            </span>
            <div className="overflow-hidden h-5 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-slate-300 text-[11px] sm:text-xs font-medium truncate"
                >
                  {announcements[tickerIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Data, Alternador de Tema & Acesso Administrativo */}
          <div className="flex items-center gap-2.5 font-sans text-slate-400 text-[11px] flex-shrink-0 ml-auto">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentDateTime || 'Carregando...'}</span>
            </div>

            {/* Botão de Alternar Modo Escuro / Claro */}
            <button
              id="btn-header-theme-toggle-top"
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Faixa Principal: Masthead do Portal & Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Masthead do Portal */}
          <div 
            onClick={() => handleLinkClick('inicio')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-xs flex-shrink-0 border border-emerald-700">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                  Portal de Notícias Elisângela Régia
                </h1>
                <span className="hidden md:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                  Edição Escolar
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Jornalismo Estudantil, Notícias, Avaliações e Comunicação da Comunidade Escolar
              </p>
            </div>
          </div>

          {/* Área de Busca (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm ml-4">
            <div className="relative w-full">
              <input
                id="search-input-header"
                type="text"
                value={searchTerm ?? ""}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar notícias, provas, cardápio..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchTerm && (
                <button
                  id="btn-clear-search"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs bg-slate-200 dark:bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                  title="Limpar busca"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Botões Mobile: Menu Hamburguer */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Campo de busca no mobile quando visível */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              id="search-input-mobile"
              type="text"
              value={searchTerm ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquisar em todo o portal..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 3. Barra de Editorias (Navegação Horizontal Estilo Grandes Portais) */}
      <nav id="nav-desktop" aria-label="Navegação Principal de Editorias" className="hidden md:block bg-slate-50/80 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 overflow-x-auto py-1 text-sm font-medium scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isGremio = item.id === 'gremio-estudantil';

              return (
                <li key={item.id}>
                  <button
                    id={`nav-item-${item.id}`}
                    onClick={() => handleLinkClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap text-xs font-bold cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Menu Gaveta Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            id="nav-mobile" 
            aria-label="Navegação Mobile" 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 shadow-lg overflow-hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <button
                      id={`nav-mobile-${item.id}`}
                      onClick={() => handleLinkClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-bold text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-800 text-white'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

