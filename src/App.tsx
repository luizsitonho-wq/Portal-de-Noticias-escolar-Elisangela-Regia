/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

import { 
  NewsItem, 
  FeedbackSubmission, 
  AssessmentItem, 
  SchoolEvent, 
  StarStudent, 
  DailyMenu, 
  GremioAction, 
  GremioPoll,
  Quote,
  Administrator,
  PortalSettings
} from './types';

import { 
  featuredNewsData, 
  quotesList, 
  newsList as initialNewsList, 
  assessmentsList, 
  schoolEventsList, 
  starStudentsList, 
  weeklyMenuData, 
  gremioActionsList, 
  initialFeedbacks,
  initialAdministrators
} from './data/mockData';

import { Header } from './components/Header';
import { FeaturedNews } from './components/FeaturedNews';
import { QuoteOfTheDay } from './components/QuoteOfTheDay';
import { SchoolNewsSection } from './components/SchoolNewsSection';
import { ExamsSection } from './components/ExamsSection';
import { EventsSection } from './components/EventsSection';
import { StarStudentsSection } from './components/StarStudentsSection';
import { DailyMenuSection } from './components/DailyMenuSection';
import { GremioSection } from './components/GremioSection';
import { FeedbackSection } from './components/FeedbackSection';
import { NewsModal } from './components/NewsModal';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { supabase, carregarDadoNuvem, salvarDadoNuvem } from './lib/supabase';

const DEFAULT_SETTINGS: PortalSettings = {
  schoolName: 'Elisângela Régia',
  description: 'Portal de Notícias Escolar',
  address: 'Av. dos Estudantes, 1500 - Bairro Universitário',
  phone: '(86) 3221-4500 / Ramal 102',
  email: 'contato@elisangela-regia.edu.br',
  morningShift: '07:00 às 12:20',
  afternoonShift: '13:00 às 18:20',
  officeHours: '08:00 às 17:00',
  libraryHours: '07:30 às 18:00',
  gremioName: 'Grêmio Estudantil',
  gremioBoard: 'Diretoria de Imprensa',
  gremioQuote: 'Trabalhando por uma escola viva, acolhedora, participativa e cheia de oportunidades!',
};

const DEFAULT_POLL: GremioPoll = {
  id: 'poll-2026-1',
  question: 'Qual deve ser o tema da nossa Festa da Primavera 2026?',
  description: 'Vote na sua opção favorita. O resultado orientará a comissão organizadora.',
  isActive: true,
  options: {
    'Anos 80 e 90 (Nostalgia)': 54,
    'Sustentabilidade & Futurismo': 78,
    'Cinema e Cultura Pop': 92,
    'Festivais do Brasil (Regional)': 41,
  },
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoadedFromCloud, setIsLoadedFromCloud] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portal_theme');
    if (saved) return saved === 'dark';
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [portalSettings, setPortalSettings] = useState<PortalSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portal_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portal_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState<boolean>(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);

  // Estados principais do portal (featuredNews agora pode ser null quando apagado!)
  const [featuredNews, setFeaturedNews] = useState<NewsItem | null>(featuredNewsData);
  const [news, setNews] = useState<NewsItem[]>(initialNewsList);
  const [quotes, setQuotes] = useState<Quote[]>(quotesList);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(assessmentsList);
  const [events, setEvents] = useState<SchoolEvent[]>(schoolEventsList);
  const [starStudents, setStarStudents] = useState<StarStudent[]>(starStudentsList);
  const [dailyMenus, setDailyMenus] = useState<DailyMenu[]>(weeklyMenuData);
  const [gremioActions, setGremioActions] = useState<GremioAction[]>(gremioActionsList);
  const [gremioPoll, setGremioPoll] = useState<GremioPoll>(DEFAULT_POLL);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(initialFeedbacks);
  const [administrators, setAdministrators] = useState<Administrator[]>(initialAdministrators);

  useEffect(() => {
    async function inicializarPortal() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        setIsAdminLoggedIn(true);
      }

      const [
        cloudFeatured,
        cloudNews,
        cloudQuotes,
        cloudAssessments,
        cloudEvents,
        cloudStudents,
        cloudMenus,
        cloudGremio,
        cloudPoll,
        cloudFeedbacks,
        cloudAdmins,
        cloudSettings,
      ] = await Promise.all([
        carregarDadoNuvem<NewsItem | { empty: true }>('featured_news'),
        carregarDadoNuvem<NewsItem[]>('news'),
        carregarDadoNuvem<Quote[]>('quotes'),
        carregarDadoNuvem<AssessmentItem[]>('assessments'),
        carregarDadoNuvem<SchoolEvent[]>('events'),
        carregarDadoNuvem<StarStudent[]>('star_students'),
        carregarDadoNuvem<DailyMenu[]>('daily_menus'),
        carregarDadoNuvem<GremioAction[]>('gremio_actions'),
        carregarDadoNuvem<GremioPoll>('gremio_poll'),
        carregarDadoNuvem<FeedbackSubmission[]>('feedbacks'),
        carregarDadoNuvem<Administrator[]>('administrators'),
        carregarDadoNuvem<PortalSettings>('settings'),
      ]);

      if (cloudFeatured) {
        if ('empty' in cloudFeatured && cloudFeatured.empty) {
          setFeaturedNews(null);
        } else {
          setFeaturedNews(cloudFeatured as NewsItem);
        }
      }
      if (cloudNews) setNews(cloudNews);
      if (cloudQuotes) setQuotes(cloudQuotes);
      if (cloudAssessments) setAssessments(cloudAssessments);
      if (cloudEvents) setEvents(cloudEvents);
      if (cloudStudents) setStarStudents(cloudStudents);
      if (cloudMenus) setDailyMenus(cloudMenus);
      if (cloudGremio) setGremioActions(cloudGremio);
      if (cloudPoll) setGremioPoll(cloudPoll);
      if (cloudFeedbacks) setFeedbacks(cloudFeedbacks);
      if (cloudAdmins) setAdministrators(cloudAdmins);
      if (cloudSettings) setPortalSettings(cloudSettings);

      setIsLoadedFromCloud(true);
    }

    inicializarPortal();
  }, []);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setAdminPanelOpen(true);
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminLoginModalOpen(false);
    setAdminPanelOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminLoggedIn(false);
    setAdminPanelOpen(false);
  };

  // Notícias
  const handleAddNews = (newItem: NewsItem) => {
    setNews((prev) => {
      const updated = [newItem, ...prev];
      salvarDadoNuvem('news', updated);
      return updated;
    });
    // Se não havia notícia destaque, a nova publicada vira o destaque automaticamente
    if (!featuredNews) {
      setFeaturedNews(newItem);
      salvarDadoNuvem('featured_news', newItem);
    }
  };

  const handleUpdateNews = (updatedItem: NewsItem) => {
    setNews((prev) => {
      const updated = prev.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      salvarDadoNuvem('news', updated);
      return updated;
    });
    if (featuredNews && featuredNews.id === updatedItem.id) {
      setFeaturedNews(updatedItem);
      salvarDadoNuvem('featured_news', updatedItem);
    }
  };

  const handleDeleteNews = (id: string) => {
    setNews((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      salvarDadoNuvem('news', filtered);
      if (featuredNews && featuredNews.id === id) {
        if (filtered.length > 0) {
          setFeaturedNews(filtered[0]);
          salvarDadoNuvem('featured_news', filtered[0]);
        } else {
          setFeaturedNews(null);
          salvarDadoNuvem('featured_news', { empty: true });
        }
      }
      return filtered;
    });
  };

  const handleDeleteFeaturedNews = () => {
    if (!featuredNews) return;
    const currentId = featuredNews.id;
    const remaining = news.filter((item) => item.id !== currentId);
    setNews(remaining);
    salvarDadoNuvem('news', remaining);

    if (remaining.length > 0) {
      setFeaturedNews(remaining[0]);
      salvarDadoNuvem('featured_news', remaining[0]);
    } else {
      setFeaturedNews(null);
      salvarDadoNuvem('featured_news', { empty: true });
    }
  };

  const handleUpdateFeaturedNews = (newFeatured: NewsItem) => {
    setFeaturedNews(newFeatured);
    salvarDadoNuvem('featured_news', newFeatured);
    setNews((prev) => {
      const exists = prev.some((item) => item.id === newFeatured.id);
      const updated = !exists
        ? [newFeatured, ...prev]
        : prev.map((item) => (item.id === newFeatured.id ? newFeatured : item));
      salvarDadoNuvem('news', updated);
      return updated;
    });
  };

  // Eventos Escolares
  const handleAddEvent = (newEvt: SchoolEvent) => {
    setEvents((prev) => {
      const updated = [newEvt, ...prev];
      salvarDadoNuvem('events', updated);
      return updated;
    });
  };

  const handleUpdateEvent = (updatedEvt: SchoolEvent) => {
    setEvents((prev) => {
      const updated = prev.map((e) => (e.id === updatedEvt.id ? updatedEvt : e));
      salvarDadoNuvem('events', updated);
      return updated;
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      salvarDadoNuvem('events', updated);
      return updated;
    });
  };

  // Enquete do Grêmio
  const handleVotePoll = (option: string) => {
    setGremioPoll((prev) => {
      const updated: GremioPoll = {
        ...prev,
        options: {
          ...prev.options,
          [option]: (prev.options[option] || 0) + 1,
        },
      };
      salvarDadoNuvem('gremio_poll', updated);
      return updated;
    });
  };

  const handleUpdateGremioPoll = (updatedPoll: GremioPoll) => {
    setGremioPoll(updatedPoll);
    salvarDadoNuvem('gremio_poll', updatedPoll);
  };

  // Feedbacks
  const handleAddFeedback = (newFb: FeedbackSubmission) => {
    setFeedbacks((prev) => {
      const updated = [newFb, ...prev];
      salvarDadoNuvem('feedbacks', updated);
      return updated;
    });
  };

  const handleUpdateFeedback = (updatedItem: FeedbackSubmission) => {
    setFeedbacks((prev) => {
      const updated = prev.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      salvarDadoNuvem('feedbacks', updated);
      return updated;
    });
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedbacks((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      salvarDadoNuvem('feedbacks', updated);
      return updated;
    });
  };

  const handleBoostFeedbackLikes = (id: string, amount: number) => {
    setFeedbacks((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, likes: item.likes + amount } : item));
      salvarDadoNuvem('feedbacks', updated);
      return updated;
    });
  };

  // Cardápio
  const handleUpdateDailyMenu = (dayOfWeek: string, updatedMenu: DailyMenu) => {
    setDailyMenus((prev) => {
      const updated = prev.map((item) => (item.dayOfWeek === dayOfWeek ? updatedMenu : item));
      salvarDadoNuvem('daily_menus', updated);
      return updated;
    });
  };

  const handleReorderDailyMenus = (reordered: DailyMenu[]) => {
    setDailyMenus(reordered);
    salvarDadoNuvem('daily_menus', reordered);
  };

  // Provas
  const handleAddAssessment = (item: AssessmentItem) => {
    setAssessments((prev) => {
      const updated = [item, ...prev];
      salvarDadoNuvem('assessments', updated);
      return updated;
    });
  };

  const handleUpdateAssessment = (item: AssessmentItem) => {
    setAssessments((prev) => {
      const updated = prev.map((a) => (a.id === item.id ? item : a));
      salvarDadoNuvem('assessments', updated);
      return updated;
    });
  };

  const handleDeleteAssessment = (id: string) => {
    setAssessments((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      salvarDadoNuvem('assessments', updated);
      return updated;
    });
  };

  // Alunos Destaque
  const handleAddStarStudent = (student: StarStudent) => {
    setStarStudents((prev) => {
      const updated = [student, ...prev];
      salvarDadoNuvem('star_students', updated);
      return updated;
    });
  };

  const handleUpdateStarStudent = (student: StarStudent) => {
    setStarStudents((prev) => {
      const updated = prev.map((s) => (s.id === student.id ? student : s));
      salvarDadoNuvem('star_students', updated);
      return updated;
    });
  };

  const handleDeleteStarStudent = (id: string) => {
    setStarStudents((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      salvarDadoNuvem('star_students', updated);
      return updated;
    });
  };

  // Administradores
  const handleAddAdministrator = (admin: Administrator) => {
    setAdministrators((prev) => {
      const updated = [admin, ...prev];
      salvarDadoNuvem('administrators', updated);
      return updated;
    });
  };

  const handleUpdateAdministrator = (admin: Administrator) => {
    setAdministrators((prev) => {
      const updated = prev.map((a) => (a.id === admin.id ? admin : a));
      salvarDadoNuvem('administrators', updated);
      return updated;
    });
  };

  const handleDeleteAdministrator = (id: string) => {
    setAdministrators((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      salvarDadoNuvem('administrators', updated);
      return updated;
    });
  };

  // Grêmio
  const handleAddGremioAction = (action: GremioAction) => {
    setGremioActions((prev) => {
      const updated = [action, ...prev];
      salvarDadoNuvem('gremio_actions', updated);
      return updated;
    });
  };

  const handleUpdateGremioAction = (action: GremioAction) => {
    setGremioActions((prev) => {
      const updated = prev.map((g) => (g.id === action.id ? action : g));
      salvarDadoNuvem('gremio_actions', updated);
      return updated;
    });
  };

  const handleDeleteGremioAction = (id: string) => {
    setGremioActions((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      salvarDadoNuvem('gremio_actions', updated);
      return updated;
    });
  };

  // Frase do Dia
  const handleAddQuote = (quote: Quote) => {
    setQuotes((prev) => {
      const updated = [quote, ...prev];
      salvarDadoNuvem('quotes', updated);
      return updated;
    });
  };

  const handleUpdateQuote = (updatedItem: Quote) => {
    setQuotes((prev) => {
      const updated = prev.map((q) => (q.id === updatedItem.id ? updatedItem : q));
      salvarDadoNuvem('quotes', updated);
      return updated;
    });
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      salvarDadoNuvem('quotes', updated);
      return updated;
    });
  };

  const handleUpdateSettings = (newSettings: PortalSettings) => {
    setPortalSettings(newSettings);
    salvarDadoNuvem('settings', newSettings);
  };

  const handleResetAllData = async () => {
    setFeaturedNews(featuredNewsData);
    setNews(initialNewsList);
    setQuotes(quotesList);
    setAssessments(assessmentsList);
    setEvents(schoolEventsList);
    setStarStudents(starStudentsList);
    setDailyMenus(weeklyMenuData);
    setGremioActions(gremioActionsList);
    setGremioPoll(DEFAULT_POLL);
    setFeedbacks(initialFeedbacks);
    setAdministrators(initialAdministrators);
    setPortalSettings(DEFAULT_SETTINGS);

    if (isLoadedFromCloud) {
      await Promise.all([
        salvarDadoNuvem('featured_news', featuredNewsData),
        salvarDadoNuvem('news', initialNewsList),
        salvarDadoNuvem('quotes', quotesList),
        salvarDadoNuvem('assessments', assessmentsList),
        salvarDadoNuvem('events', schoolEventsList),
        salvarDadoNuvem('star_students', starStudentsList),
        salvarDadoNuvem('daily_menus', weeklyMenuData),
        salvarDadoNuvem('gremio_actions', gremioActionsList),
        salvarDadoNuvem('gremio_poll', DEFAULT_POLL),
        salvarDadoNuvem('feedbacks', initialFeedbacks),
        salvarDadoNuvem('administrators', initialAdministrators),
        salvarDadoNuvem('settings', DEFAULT_SETTINGS),
      ]);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-100 transition-colors duration-200">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      <main id="conteudo-principal" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 sm:space-y-16">
        <div id="inicio" className="space-y-6">
          {featuredNews && (
            <FeaturedNews
              news={featuredNews}
              onOpenModal={(item) => setSelectedNews(item)}
            />
          )}
          <QuoteOfTheDay quotes={quotes} />
        </div>

        <SchoolNewsSection
          newsList={news}
          searchTerm={searchTerm}
          onOpenModal={(item) => setSelectedNews(item)}
        />

        <ExamsSection assessments={assessments} />
        <EventsSection events={events} />
        <StarStudentsSection students={starStudents} />
        <DailyMenuSection menus={dailyMenus} />

        <GremioSection
          actions={gremioActions}
          onOpenFeedback={() => scrollToSection('feedback-sugestoes')}
          gremioName={portalSettings.gremioName}
          gremioBoard={portalSettings.gremioBoard}
          gremioQuote={portalSettings.gremioQuote}
          poll={gremioPoll}
          onVotePoll={handleVotePoll}
        />

        <FeedbackSection
          feedbacks={feedbacks}
          onAddFeedback={handleAddFeedback}
        />
      </main>

      <AnimatePresence>
        {selectedNews && (
          <NewsModal
            news={selectedNews}
            administrators={administrators}
            onClose={() => setSelectedNews(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adminLoginModalOpen && (
          <AdminLoginModal
            isOpen={adminLoginModalOpen}
            onClose={() => setAdminLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adminPanelOpen && (
          <AdminPanel
            isOpen={adminPanelOpen}
            onClose={() => setAdminPanelOpen(false)}
            onLogout={handleLogout}
        featuredNews={featuredNews}
        onUpdateFeaturedNews={handleUpdateFeaturedNews}
        onDeleteFeaturedNews={handleDeleteFeaturedNews}
        newsList={newsList}
        onAddNews={handleAddNews}
        onUpdateNews={handleUpdateNews}
        onDeleteNews={handleDeleteNews}
        events={events}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        feedbacks={feedbacks}
        onAddFeedback={handleAddFeedback}
        onUpdateFeedback={handleUpdateFeedback}
        onDeleteFeedback={handleDeleteFeedback}
        onBoostFeedbackLikes={handleBoostFeedbackLikes}
        dailyMenus={dailyMenus}
        onUpdateDailyMenu={handleUpdateDailyMenu}
        onReorderDailyMenus={handleReorderDailyMenus}
        assessments={assessments}
        onAddAssessment={handleAddAssessment}
        onUpdateAssessment={handleUpdateAssessment}
        onDeleteAssessment={handleDeleteAssessment}
        starStudents={starStudents}
        onAddStarStudent={handleAddStarStudent}
        onUpdateStarStudent={handleUpdateStarStudent}
        onDeleteStarStudent={handleDeleteStarStudent}
        administrators={administrators}
        onAddAdministrator={handleAddAdministrator}
        onUpdateAdministrator={handleUpdateAdministrator}
        onDeleteAdministrator={handleDeleteAdministrator}
        gremioActions={gremioActions}
        onAddGremioAction={handleAddGremioAction}
        onUpdateGremioAction={handleUpdateGremioAction}
        onDeleteGremioAction={handleDeleteGremioAction}
        gremioPoll={gremioPoll}
        onUpdateGremioPoll={handleUpdateGremioPoll}
        quotes={quotes}
        onAddQuote={handleAddQuote}
        onUpdateQuote={handleUpdateQuote}
        onDeleteQuote={handleDeleteQuote}
        portalSettings={portalSettings}
        onUpdatePortalSettings={handleUpdatePortalSettings}
        onResetAllData={handleResetAllData}
      />
      )}

      {/* Modal de Artigo Completo */}
      <NewsArticleModal
        news={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onLike={handleLikeNews}
      />

      {/* Modal de Comentários / Discussão */}
      <NewsCommentsModal
        news={commentArticle}
        comments={commentArticle ? (newsComments[commentArticle.id] || []) : []}
        onClose={() => setCommentArticle(null)}
        onAddComment={(authorName, gradeClass, text) => {
          if (commentArticle) {
            handleAddComment(commentArticle.id, authorName, gradeClass, text);
          }
        }}
      />
    </div>
  );
}

export default App;
