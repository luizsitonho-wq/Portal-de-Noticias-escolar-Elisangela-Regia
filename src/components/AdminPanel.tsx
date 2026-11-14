/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  NewsItem, 
  NewsCategory, 
  FeedbackSubmission, 
  FeedbackCategory, 
  DailyMenu, 
  AssessmentItem, 
  AssessmentType, 
  StarStudent, 
  GremioAction, 
  GremioPoll,
  SchoolEvent,
  Quote,
  Administrator,
  PortalSettings
} from '../types';
import { 
  ShieldCheck, 
  X, 
  Trash2, 
  Edit3, 
  Save, 
  Sparkles, 
  MessageSquareQuote, 
  Utensils, 
  Calendar, 
  Award, 
  RefreshCw, 
  LogOut, 
  GraduationCap, 
  ThumbsUp, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Mail,
  Search,
  FileText,
  Settings,
  Bell,
  Vote,
  Plus
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  
  featuredNews: NewsItem | null;
  onUpdateFeaturedNews: (news: NewsItem) => void;
  onDeleteFeaturedNews: () => void;
  newsList: NewsItem[];
  onAddNews: (news: NewsItem) => void;
  onUpdateNews: (news: NewsItem) => void;
  onDeleteNews: (id: string) => void;

  events: SchoolEvent[];
  onAddEvent: (evt: SchoolEvent) => void;
  onUpdateEvent: (evt: SchoolEvent) => void;
  onDeleteEvent: (id: string) => void;
  
  feedbacks: FeedbackSubmission[];
  onAddFeedback: (feedback: FeedbackSubmission) => void;
  onUpdateFeedback: (feedback: FeedbackSubmission) => void;
  onDeleteFeedback: (id: string) => void;
  onBoostFeedbackLikes: (id: string, amount: number) => void;
  
  dailyMenus: DailyMenu[];
  onUpdateDailyMenu: (dayOfWeek: string, updatedMenu: DailyMenu) => void;
  onReorderDailyMenus?: (menus: DailyMenu[]) => void;
  
  assessments: AssessmentItem[];
  onAddAssessment: (item: AssessmentItem) => void;
  onUpdateAssessment: (item: AssessmentItem) => void;
  onDeleteAssessment: (id: string) => void;
  
  starStudents: StarStudent[];
  onAddStarStudent: (student: StarStudent) => void;
  onUpdateStarStudent: (student: StarStudent) => void;
  onDeleteStarStudent: (id: string) => void;
  
  administrators: Administrator[];
  onAddAdministrator: (admin: Administrator) => void;
  onUpdateAdministrator: (admin: Administrator) => void;
  onDeleteAdministrator: (id: string) => void;
  
  gremioActions: GremioAction[];
  onAddGremioAction: (action: GremioAction) => void;
  onUpdateGremioAction: (action: GremioAction) => void;
  onDeleteGremioAction: (id: string) => void;

  gremioPoll: GremioPoll;
  onUpdateGremioPoll: (poll: GremioPoll) => void;

  quotes: Quote[];
  onAddQuote: (quote: Quote) => void;
  onUpdateQuote?: (quote: Quote) => void;
  onDeleteQuote: (id: string) => void;

  portalSettings: PortalSettings;
  onUpdatePortalSettings: (settings: PortalSettings) => void;

  onResetAllData: () => void;
}

type AdminTab = 'noticias' | 'eventos' | 'provas' | 'mural' | 'cardapio' | 'alunos' | 'administradores' | 'gremio' | 'frases' | 'backup' | 'config';

const PRESET_IMAGES = [
  { label: 'Informática & TI', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Laboratório & Ciências', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Biblioteca & Estudos', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80' },
  { label: 'Feira Cultural & Arte', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  { label: 'Esportes & Quadra', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onLogout,
  featuredNews,
  onUpdateFeaturedNews,
  onDeleteFeaturedNews,
  newsList,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  feedbacks,
  onAddFeedback,
  onUpdateFeedback,
  onDeleteFeedback,
  onBoostFeedbackLikes,
  dailyMenus,
  onUpdateDailyMenu,
  onReorderDailyMenus,
  assessments,
  onAddAssessment,
  onUpdateAssessment,
  onDeleteAssessment,
  starStudents,
  onAddStarStudent,
  onUpdateStarStudent,
  onDeleteStarStudent,
  administrators,
  onAddAdministrator,
  onUpdateAdministrator,
  onDeleteAdministrator,
  gremioActions,
  onAddGremioAction,
  onUpdateGremioAction,
  onDeleteGremioAction,
  gremioPoll,
  onUpdateGremioPoll,
  quotes,
  onAddQuote,
  onUpdateQuote,
  onDeleteQuote,
  portalSettings,
  onUpdatePortalSettings,
  onResetAllData,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('noticias');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  interface DeleteTarget {
    type: 'news' | 'featured' | 'event' | 'assessment' | 'feedback' | 'student' | 'admin' | 'gremio' | 'quote' | 'reset';
    id?: string;
    title: string;
  }
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExecuteDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;

    if (type === 'news' && id) {
      onDeleteNews(id);
      showToast('🗑️ Notícia removida com sucesso!');
    } else if (type === 'featured') {
      onDeleteFeaturedNews();
      showToast('🗑️ Notícia destaque removida!');
    } else if (type === 'event' && id) {
      onDeleteEvent(id);
      showToast('🗑️ Evento removido com sucesso!');
    } else if (type === 'assessment' && id) {
      onDeleteAssessment(id);
      showToast('🗑️ Prova removida do calendário!');
    } else if (type === 'feedback' && id) {
      onDeleteFeedback(id);
      showToast('🗑️ Mensagem removida do mural!');
    } else if (type === 'student' && id) {
      onDeleteStarStudent(id);
      showToast('🗑️ Aluno removido do quadro de honra!');
    } else if (type === 'admin' && id) {
      onDeleteAdministrator(id);
      showToast('🗑️ Administrador removido da equipe!');
    } else if (type === 'gremio' && id) {
      onDeleteGremioAction(id);
      showToast('🗑️ Ação do Grêmio excluída!');
    } else if (type === 'quote' && id) {
      onDeleteQuote(id);
      showToast('🗑️ Frase do dia removida!');
    } else if (type === 'reset') {
      onResetAllData();
      showToast('🔄 Todos os dados foram restaurados aos padrões originais!');
    }

    setDeleteTarget(null);
  };

  // ==========================================
  // NOTÍCIAS
  // ==========================================
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '',
    summary: '',
    content: '',
    category: 'diario',
    tag: 'Destaque Escolar',
    author: 'Diretoria de Imprensa do Grêmio',
    imageUrl: PRESET_IMAGES[0].url,
    readTimeMinutes: 3,
  });

  const handleStartEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title ?? '',
      summary: item.summary ?? '',
      content: item.content ?? '',
      category: item.category ?? 'diario',
      tag: item.tag ?? 'Destaque Escolar',
      author: item.author ?? 'Diretoria de Imprensa do Grêmio',
      authorAdminId: item.authorAdminId,
      imageUrl: item.imageUrl ?? PRESET_IMAGES[0].url,
      readTimeMinutes: item.readTimeMinutes ?? 3,
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Notícia carregada no formulário de edição!');
  };

  const handleCancelNewsEdit = () => {
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      summary: '',
      content: '',
      category: 'diario',
      tag: 'Destaque Escolar',
      author: 'Diretoria de Imprensa do Grêmio',
      imageUrl: PRESET_IMAGES[0].url,
      readTimeMinutes: 3,
    });
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) {
      showToast('⚠️ Preencha o título e o resumo da notícia.');
      return;
    }

    const todayStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    if (editingNewsId) {
      const existing = newsList.find((n) => n.id === editingNewsId) || featuredNews;
      if (!existing) return;
      const updated: NewsItem = {
        ...existing,
        title: newsForm.title || '',
        summary: newsForm.summary || '',
        content: newsForm.content || newsForm.summary || '',
        category: (newsForm.category as NewsCategory) || 'diario',
        tag: newsForm.tag || 'Escola',
        author: newsForm.author || 'Equipe Editorial',
        authorAdminId: newsForm.authorAdminId,
        imageUrl: newsForm.imageUrl || PRESET_IMAGES[0].url,
        readTimeMinutes: Number(newsForm.readTimeMinutes) || 3,
      };
      onUpdateNews(updated);
      showToast('✅ Notícia atualizada com sucesso!');
      setEditingNewsId(null);
    } else {
      const newItem: NewsItem = {
        id: `news-${Date.now()}`,
        title: newsForm.title || '',
        summary: newsForm.summary || '',
        content: newsForm.content || newsForm.summary || '',
        category: (newsForm.category as NewsCategory) || 'diario',
        tag: newsForm.tag || 'Notícia Nova',
        date: todayStr,
        author: newsForm.author || 'Diretoria de Imprensa do Grêmio',
        authorAdminId: newsForm.authorAdminId,
        imageUrl: newsForm.imageUrl || PRESET_IMAGES[0].url,
        readTimeMinutes: Number(newsForm.readTimeMinutes) || 3,
        likes: 0,
      };
      onAddNews(newItem);
      showToast('🎉 Nova notícia publicada!');
    }
    handleCancelNewsEdit();
  };

  // ==========================================
  // EVENTOS ESCOLARES & QUESTÕES CULTURAIS
  // ==========================================
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<Partial<SchoolEvent>>({
    title: '',
    description: '',
    date: '',
    time: '08:00 às 12:00',
    location: 'Pátio Central / Auditório do CETI',
    targetAudience: 'Toda a Comunidade Escolar',
    category: 'Cultura',
    imageUrl: PRESET_IMAGES[3].url,
  });

  const handleStartEditEvent = (evt: SchoolEvent) => {
    setEditingEventId(evt.id);
    setEventForm({
      title: evt.title ?? '',
      description: evt.description ?? '',
      date: evt.date ?? '',
      time: evt.time ?? '',
      location: evt.location ?? '',
      targetAudience: evt.targetAudience ?? '',
      category: evt.category ?? 'Cultura',
      imageUrl: evt.imageUrl ?? PRESET_IMAGES[3].url,
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Evento carregado para edição!');
  };

  const handleCancelEventEdit = () => {
    setEditingEventId(null);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '08:00 às 12:00',
      location: 'Pátio Central / Auditório do CETI',
      targetAudience: 'Toda a Comunidade Escolar',
      category: 'Cultura',
      imageUrl: PRESET_IMAGES[3].url,
    });
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) {
      showToast('⚠️ Preencha o título e a data do evento.');
      return;
    }

    if (editingEventId) {
      const updated: SchoolEvent = {
        id: editingEventId,
        title: eventForm.title || '',
        description: eventForm.description || '',
        date: eventForm.date || '',
        time: eventForm.time || '08:00 às 12:00',
        location: eventForm.location || 'Escola',
        targetAudience: eventForm.targetAudience || 'Alunos e Professores',
        category: (eventForm.category as SchoolEvent['category']) || 'Cultura',
        imageUrl: eventForm.imageUrl || PRESET_IMAGES[3].url,
      };
      onUpdateEvent(updated);
      showToast('✅ Evento atualizado com sucesso!');
      setEditingEventId(null);
    } else {
      const newEvt: SchoolEvent = {
        id: `evt-${Date.now()}`,
        title: eventForm.title || '',
        description: eventForm.description || '',
        date: eventForm.date || '',
        time: eventForm.time || '08:00 às 12:00',
        location: eventForm.location || 'Escola',
        targetAudience: eventForm.targetAudience || 'Alunos e Professores',
        category: (eventForm.category as SchoolEvent['category']) || 'Cultura',
        imageUrl: eventForm.imageUrl || PRESET_IMAGES[3].url,
      };
      onAddEvent(newEvt);
      showToast('🎉 Novo evento publicado na agenda!');
    }
    handleCancelEventEdit();
  };

  // ==========================================
  // PROVAS
  // ==========================================
  const [editingAssessmentId, setEditingAssessmentId] = useState<string | null>(null);
  const [assessmentForm, setAssessmentForm] = useState<Partial<AssessmentItem>>({
    type: 'prova',
    title: '',
    subject: '',
    gradeClass: '1ª Série - Des. de Sistemas',
    date: '',
    time: '07:30 às 11:30',
    room: 'Sala 04 (Laboratório de TI)',
    topics: [],
    tips: '',
  });
  const [topicsInput, setTopicsInput] = useState<string>('');

  const handleStartEditAssessment = (item: AssessmentItem) => {
    setEditingAssessmentId(item.id);
    setAssessmentForm({
      type: item.type ?? 'prova',
      title: item.title ?? '',
      subject: item.subject ?? '',
      gradeClass: item.gradeClass ?? '',
      date: item.date ?? '',
      time: item.time ?? '',
      room: item.room ?? '',
      topics: item.topics ?? [],
      tips: item.tips ?? '',
    });
    setTopicsInput(item.topics ? item.topics.join(', ') : '');
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Avaliação carregada no formulário para edição!');
  };

  const handleCancelAssessmentEdit = () => {
    setEditingAssessmentId(null);
    setAssessmentForm({
      type: 'prova',
      title: '',
      subject: '',
      gradeClass: '1ª Série - Des. de Sistemas',
      date: '',
      time: '07:30 às 11:30',
      room: 'Sala 04 (Laboratório de TI)',
      topics: [],
      tips: '',
    });
    setTopicsInput('');
  };

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessmentForm.title || !assessmentForm.subject || !assessmentForm.date) {
      showToast('⚠️ Preencha o título da prova, disciplina e data.');
      return;
    }

    const topicsArray = topicsInput
      ? topicsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Conteúdo programático bimestral do CETI'];

    if (editingAssessmentId) {
      const updated: AssessmentItem = {
        id: editingAssessmentId,
        type: (assessmentForm.type as AssessmentType) || 'prova',
        title: assessmentForm.title || '',
        subject: assessmentForm.subject || '',
        gradeClass: assessmentForm.gradeClass || '1ª Série',
        date: assessmentForm.date || '',
        time: assessmentForm.time || '07:30 às 11:30',
        room: assessmentForm.room || 'Salas de Aula',
        topics: topicsArray,
        tips: assessmentForm.tips || 'Revise as anotações e simulados anteriores.',
      };
      onUpdateAssessment(updated);
      showToast('✅ Data e conteúdo da prova atualizados com sucesso!');
      setEditingAssessmentId(null);
    } else {
      const newItem: AssessmentItem = {
        id: `assessment-${Date.now()}`,
        type: (assessmentForm.type as AssessmentType) || 'prova',
        title: assessmentForm.title || '',
        subject: assessmentForm.subject || '',
        gradeClass: assessmentForm.gradeClass || '1ª Série',
        date: assessmentForm.date || '',
        time: assessmentForm.time || '07:30 às 11:30',
        room: assessmentForm.room || 'Salas de Aula',
        topics: topicsArray,
        tips: assessmentForm.tips || 'Revise as anotações e simulados anteriores.',
      };
      onAddAssessment(newItem);
      showToast('📅 Nova avaliação cadastrada no calendário!');
    }
    handleCancelAssessmentEdit();
  };

  // ==========================================
  // MURAL / FEEDBACKS
  // ==========================================
  const [editingFeedbackId, setEditingFeedbackId] = useState<string | null>(null);
  const [feedbackForm, setFeedbackForm] = useState<Partial<FeedbackSubmission>>({
    authorName: '',
    gradeClass: '1ª Série - Des. de Sistemas',
    category: 'dica_estudo',
    subject: '',
    message: '',
    likes: 10,
  });

  const handleStartEditFeedback = (fb: FeedbackSubmission) => {
    setEditingFeedbackId(fb.id);
    setFeedbackForm({
      authorName: fb.authorName ?? '',
      gradeClass: fb.gradeClass ?? '',
      category: fb.category ?? 'dica_estudo',
      subject: fb.subject ?? '',
      message: fb.message ?? '',
      likes: fb.likes ?? 10,
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Mensagem carregada no formulário para edição!');
  };

  const handleCancelFeedbackEdit = () => {
    setEditingFeedbackId(null);
    setFeedbackForm({
      authorName: '',
      gradeClass: '1ª Série - Des. de Sistemas',
      category: 'dica_estudo',
      subject: '',
      message: '',
      likes: 10,
    });
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.authorName || !feedbackForm.subject || !feedbackForm.message) {
      showToast('⚠️ Preencha o autor, assunto e texto da mensagem.');
      return;
    }

    const todayHour = `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    if (editingFeedbackId) {
      const existing = feedbacks.find((f) => f.id === editingFeedbackId);
      const updated: FeedbackSubmission = {
        id: editingFeedbackId,
        authorName: feedbackForm.authorName || '',
        gradeClass: feedbackForm.gradeClass || '1ª Série',
        category: (feedbackForm.category as FeedbackCategory) || 'dica_estudo',
        subject: feedbackForm.subject || '',
        message: feedbackForm.message || '',
        createdAt: existing ? existing.createdAt : todayHour,
        likes: Number(feedbackForm.likes) || 0,
      };
      onUpdateFeedback(updated);
      showToast('✅ Mensagem do mural atualizada com sucesso!');
      setEditingFeedbackId(null);
    } else {
      const newFb: FeedbackSubmission = {
        id: `fb-${Date.now()}`,
        authorName: feedbackForm.authorName || '',
        gradeClass: feedbackForm.gradeClass || '1ª Série',
        category: (feedbackForm.category as FeedbackCategory) || 'dica_estudo',
        subject: feedbackForm.subject || '',
        message: feedbackForm.message || '',
        createdAt: todayHour,
        likes: Number(feedbackForm.likes) || 5,
      };
      onAddFeedback(newFb);
      showToast('💬 Nova mensagem/dica inserida no mural!');
    }
    handleCancelFeedbackEdit();
  };

  // ==========================================
  // CARDÁPIO
  // ==========================================
  const [selectedMenuDay, setSelectedMenuDay] = useState<string>(dailyMenus[0]?.dayOfWeek || 'Segunda-feira');
  const activeMenuDayData = dailyMenus.find((m) => m.dayOfWeek === selectedMenuDay) || dailyMenus[0];
  const [menuForm, setMenuForm] = useState<DailyMenu>(activeMenuDayData);

  const handleSelectDay = (day: string) => {
    setSelectedMenuDay(day);
    const found = dailyMenus.find((m) => m.dayOfWeek === day);
    if (found) {
      setMenuForm({
        dayOfWeek: found.dayOfWeek ?? 'Segunda-feira',
        dateFormatted: found.dateFormatted ?? '',
        mainDish: found.mainDish ?? '',
        sideDish: found.sideDish ?? '',
        salad: found.salad ?? '',
        dessert: found.dessert ?? '',
        nutritionalHighlights: found.nutrition
