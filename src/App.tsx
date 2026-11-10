/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Tipagens estruturadas do portal
import { 
  NewsItem, 
  FeedbackSubmission, 
  AssessmentItem, 
  SchoolEvent, 
  StarStudent, 
  DailyMenu, 
  GremioAction, 
  Quote,
  Administrator,
  PortalSettings
} from './types';

// Dados iniciais organizados por módulos
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

// Componentes da Interface Semântica
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

/**
 * =========================================================================
 * COMPONENTE PRINCIPAL: PORTAL DE NOTÍCIAS DA ESCOLA CECÍLIA MENDES
 * =========================================================================
 */
export default function App() {
  // Estado de busca global
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Estado do Tema Escuro (Dark Mode) com persistência e preferência de sistema
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portal_theme');
    if (saved) return saved === 'dark';
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 11. Configurações do Portal (Footer info)
  const [portalSettings, setPortalSettings] = useState<PortalSettings>(() => {
    const saved = localStorage.getItem('portal_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
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
  });

  // Sincroniza a classe 'dark' no elemento raiz html
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

  // Seção ativa para destaque no menu
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Estado para controle da notícia aberta no modal de leitura
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Estados para o Painel do Administrador (Protegido via VITE_ADMIN_PASSWORD)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('portal_admin_session') === 'true';
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState<boolean>(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);

  // =========================================================
  // ESTADOS COM PERSISTÊNCIA NO LOCALSTORAGE
  // =========================================================

  // 1. Notícia Destaque Principal (Hero)
  const [featuredNews, setFeaturedNews] = useState<NewsItem>(() => {
    const saved = localStorage.getItem('portal_featured_news');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return featuredNewsData;
  });

  // 2. Lista de Notícias do Diário
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('portal_news_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialNewsList;
  });

  // 3. Frases Inspiradoras do Dia
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('portal_quotes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return quotesList;
  });

  // 4. Provas e Simulados
  const [assessments, setAssessments] = useState<AssessmentItem[]>(() => {
    const saved = localStorage.getItem('portal_assessments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return assessmentsList;
  });

  // 5. Eventos Escolares
  const [events] = useState<SchoolEvent[]>(() => {
    const saved = localStorage.getItem('portal_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return schoolEventsList;
  });

  // 6. Alunos Destaque por Notas
  const [starStudents, setStarStudents] = useState<StarStudent[]>(() => {
    const saved = localStorage.getItem('portal_star_students');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return starStudentsList;
  });

  // 7. Cardápios da Semana
  const [dailyMenus, setDailyMenus] = useState<DailyMenu[]>(() => {
    const saved = localStorage.getItem('portal_daily_menus');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return weeklyMenuData;
  });

  // 8. Ações do Grêmio Cecília Mendes
  const [gremioActions, setGremioActions] = useState<GremioAction[]>(() => {
    const saved = localStorage.getItem('portal_gremio_actions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return gremioActionsList;
  });

  // 9. Feedbacks e Dicas dos Alunos
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem('portal_escola_feedbacks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialFeedbacks;
  });

  // 10. Administradores da Equipe
  const [administrators, setAdministrators] = useState<Administrator[]>(() => {
    const saved = localStorage.getItem('portal_administrators');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialAdministrators;
  });

  // Salva no localStorage quando os estados mudam
  useEffect(() => {
    localStorage.setItem('portal_featured_news', JSON.stringify(featuredNews));
  }, [featuredNews]);

  useEffect(() => {
    localStorage.setItem('portal_news_list', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('portal_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('portal_assessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('portal_star_students', JSON.stringify(starStudents));
  }, [starStudents]);

  useEffect(() => {
    localStorage.setItem('portal_daily_menus', JSON.stringify(dailyMenus));
  }, [dailyMenus]);

  useEffect(() => {
    localStorage.setItem('portal_gremio_actions', JSON.stringify(gremioActions));
  }, [gremioActions]);

  useEffect(() => {
    localStorage.setItem('portal_escola_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('portal_administrators', JSON.stringify(administrators));
  }, [administrators]);

  useEffect(() => {
    localStorage.setItem('portal_settings', JSON.stringify(portalSettings));
  }, [portalSettings]);

  useEffect(() => {
    localStorage.setItem('portal_admin_session', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // =========================================================
  // HANDLERS DO PAINEL ADMINISTRATIVO
  // =========================================================

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

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminPanelOpen(false);
    localStorage.removeItem('portal_admin_session');
  };

  // Funções de Gestão de Notícias
  const handleAddNews = (newItem: NewsItem) => {
    setNews((prev) => [newItem, ...prev]);
  };

  const handleUpdateNews = (updated: NewsItem) => {
    setNews((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    if (featuredNews.id === updated.id) {
      setFeaturedNews(updated);
    }
  };

  const handleDeleteNews = (id: string) => {
    setNews((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (featuredNews.id === id) {
        if (filtered.length > 0) {
          setFeaturedNews(filtered[0]);
        } else {
          setFeaturedNews(featuredNewsData);
        }
      }
      return filtered;
    });
  };

  const handleUpdateFeaturedNews = (newFeatured: NewsItem) => {
    setFeaturedNews(newFeatured);
    // Se não estiver na lista geral, adiciona
    setNews((prev) => {
      const exists = prev.some((item) => item.id === newFeatured.id);
      if (!exists) return [newFeatured, ...prev];
      return prev.map((item) => (item.id === newFeatured.id ? newFeatured : item));
    });
  };

  // Funções de Gestão de Feedbacks
  const handleAddFeedback = (newFb: FeedbackSubmission) => {
    setFeedbacks((prev) => [newFb, ...prev]);
  };

  const handleUpdateFeedback = (updated: FeedbackSubmission) => {
    setFeedbacks((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBoostFeedbackLikes = (id: string, amount: number) => {
    setFeedbacks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + amount } : item))
    );
  };

  // Funções de Gestão do Cardápio
  const handleUpdateDailyMenu = (dayOfWeek: string, updatedMenu: DailyMenu) => {
    setDailyMenus((prev) =>
      prev.map((item) => (item.dayOfWeek === dayOfWeek ? updatedMenu : item))
    );
  };

  const handleReorderDailyMenus = (reordered: DailyMenu[]) => {
    setDailyMenus(reordered);
  };

  // Funções de Gestão de Provas
  const handleAddAssessment = (item: AssessmentItem) => {
    setAssessments((prev) => [item, ...prev]);
  };

  const handleUpdateAssessment = (item: AssessmentItem) => {
    setAssessments((prev) => prev.map((a) => (a.id === item.id ? item : a)));
  };

  const handleDeleteAssessment = (id: string) => {
    setAssessments((prev) => prev.filter((item) => item.id !== id));
  };

  // Funções de Gestão de Alunos Destaque
  const handleAddStarStudent = (student: StarStudent) => {
    setStarStudents((prev) => [student, ...prev]);
  };

  const handleUpdateStarStudent = (student: StarStudent) => {
    setStarStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)));
  };

  const handleDeleteStarStudent = (id: string) => {
    setStarStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // Funções de Gestão de Administradores
  const handleAddAdministrator = (admin: Administrator) => {
    setAdministrators((prev) => [admin, ...prev]);
  };

  const handleUpdateAdministrator = (admin: Administrator) => {
    setAdministrators((prev) => prev.map((a) => (a.id === admin.id ? admin : a)));
  };

  const handleDeleteAdministrator = (id: string) => {
    setAdministrators((prev) => prev.filter((a) => a.id !== id));
  };

  // Funções de Gestão do Grêmio
  const handleAddGremioAction = (action: GremioAction) => {
    setGremioActions((prev) => [action, ...prev]);
  };

  const handleUpdateGremioAction = (action: GremioAction) => {
    setGremioActions((prev) => prev.map((g) => (g.id === action.id ? action : g)));
  };

  const handleDeleteGremioAction = (id: string) => {
    setGremioActions((prev) => prev.filter((g) => g.id !== id));
  };

  // Funções de Frase do Dia
  const handleAddQuote = (quote: Quote) => {
    setQuotes((prev) => [quote, ...prev]);
  };

  const handleUpdateQuote = (updated: Quote) => {
    setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  // Função para Restaurar todos os dados originais
  const handleResetAllData = () => {
    setFeaturedNews(featuredNewsData);
    setNews(initialNewsList);
    setQuotes(quotesList);
    setAssessments(assessmentsList);
    setStarStudents(starStudentsList);
    setDailyMenus(weeklyMenuData);
    setGremioActions(gremioActionsList);
    setFeedbacks(initialFeedbacks);
    setAdministrators(initialAdministrators);
    localStorage.clear();
  };

  // Função de rolagem suave até a seção selecionada
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
      {/* 
        =========================================================
        1. CABEÇALHO SEMÂNTICO (<header>)
        =========================================================
      */}
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

      {/* 
        =========================================================
        2. CONTEÚDO PRINCIPAL SEMÂNTICO (<main>)
        =========================================================
      */}
      <main id="conteudo-principal" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 sm:space-y-16">
        
        {/* Bloco Inicial: Notícia Destaque + Frase do Dia (logo abaixo) */}
        <div id="inicio" className="space-y-6">
          {/* Notícia Destaque Principal */}
          <FeaturedNews
            news={featuredNews}
            onOpenModal={(item) => setSelectedNews(item)}
          />

          {/* Frase do Dia (Pensamento Educacional) */}
          <QuoteOfTheDay quotes={quotes} />
        </div>

        {/* 
          =========================================================
          3. DIÁRIO DA ESCOLA (Notícias Diárias, Semanais, Mensais)
          =========================================================
        */}
        <SchoolNewsSection
          newsList={news}
          searchTerm={searchTerm}
          onOpenModal={(item) => setSelectedNews(item)}
        />

        {/* 
          =========================================================
          4. CALENDÁRIO ACADÊMICO: PROVAS & SIMULADOS
          =========================================================
        */}
        <ExamsSection assessments={assessments} />

        {/* 
          =========================================================
          5. PRÓXIMOS EVENTOS ESCOLARES
          =========================================================
        */}
        <EventsSection events={events} />

        {/* 
          =========================================================
          6. MURAL DE HONRA: ALUNOS DESTAQUE DE CADA SALA
          =========================================================
        */}
        <StarStudentsSection students={starStudents} />

        {/* 
          =========================================================
          7. COMIDA DO DIA / CARDÁPIO ESCOLAR BALANCEADO
          =========================================================
        */}
        <DailyMenuSection menus={dailyMenus} />

        {/* 
          =========================================================
          8. AÇÕES DO GRÊMIO ESTUDANTIL CECÍLIA MENDES
             (Identidade Visual: Roxo, Lilás e Dourado/Amarelo)
          =========================================================
        */}
        <GremioSection
          actions={gremioActions}
          onOpenFeedback={() => scrollToSection('feedback-sugestoes')}
          gremioName={portalSettings.gremioName}
          gremioBoard={portalSettings.gremioBoard}
          gremioQuote={portalSettings.gremioQuote}
        />

        {/* 
          =========================================================
          9. FORMULÁRIO DE FEEDBACK, SUGESTÕES E MACETES DE ESTUDO
          =========================================================
        */}
        <FeedbackSection
          feedbacks={feedbacks}
          onAddFeedback={handleAddFeedback}
        />
      </main>

      {/* 
        =========================================================
        10. MODAL DE LEITURA DA NOTÍCIA COMPLETA
        =========================================================
      */}
      <AnimatePresence>
        {selectedNews && (
          <NewsModal
            news={selectedNews}
            administrators={administrators}
            onClose={() => setSelectedNews(null)}
          />
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        11. MODAL DE LOGIN DO ADMINISTRADOR (VITE_ADMIN_PASSWORD)
        =========================================================
      */}
      <AnimatePresence>
        {adminLoginModalOpen && (
          <AdminLoginModal
            isOpen={adminLoginModalOpen}
            onClose={() => setAdminLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        12. PAINEL DO ADMINISTRADOR COMPLETO (Equipe DS & Grêmio)
        =========================================================
      */}
      <AnimatePresence>
        {adminPanelOpen && (
          <AdminPanel
            isOpen={adminPanelOpen}
            onClose={() => setAdminPanelOpen(false)}
            onLogout={handleLogout}
            featuredNews={featuredNews}
            onUpdateFeaturedNews={handleUpdateFeaturedNews}
            newsList={news}
            onAddNews={handleAddNews}
            onUpdateNews={handleUpdateNews}
            onDeleteNews={handleDeleteNews}
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
            quotes={quotes}
            onAddQuote={handleAddQuote}
            onUpdateQuote={handleUpdateQuote}
            onDeleteQuote={handleDeleteQuote}
            portalSettings={portalSettings}
            onUpdatePortalSettings={setPortalSettings}
            onResetAllData={handleResetAllData}
          />
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        13. RODAPÉ INSTITUCIONAL SEMÂNTICO (<footer>)
        =========================================================
      */}
      <Footer 
        onNavigate={scrollToSection} 
        onOpenAdmin={handleOpenAdmin}
        settings={portalSettings}
      />
    </div>
  );
}

