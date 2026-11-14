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

  // NOTÍCIAS
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

  // EVENTOS ESCOLARES
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
  // PROVAS
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

  // MURAL / FEEDBACKS
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

  // CARDÁPIO
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
        nutritionalHighlights: found.nutritionalHighlights ?? '',
        isSpecial: found.isSpecial ?? false,
      });
    }
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`🍽️ Cardápio de ${day} carregado para edição!`);
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDailyMenu(selectedMenuDay, menuForm);
    showToast(`🍽️ Cardápio de ${selectedMenuDay} atualizado com sucesso!`);
  };

  const handleMoveMenu = (index: number, direction: 'up' | 'down') => {
    if (!onReorderDailyMenus) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= dailyMenus.length) return;
    const reordered = [...dailyMenus];
    const temp = reordered[index];
    reordered[index] = reordered[newIndex];
    reordered[newIndex] = temp;
    onReorderDailyMenus(reordered);
    showToast('🔄 Ordem do cardápio semanal reorganizada!');
  };

  // ALUNOS DESTAQUE
  const [studentFilter, setStudentFilter] = useState<string>('all');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [studentForm, setStudentForm] = useState<Partial<StarStudent>>({
    name: '',
    gradeClass: '1ª Série - Des. de Sistemas',
    category: 'Des. de Sistemas',
    examScore: 'Média 9.9 nas Provas Bimestrais',
    examSubject: 'Programação Web & Algoritmos',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Excelente dedicação nas avaliações e projetos práticos de tecnologia.',
    avatarBg: 'from-cyan-600 to-blue-700',
    initials: '',
  });

  const handleStartEditStudent = (student: StarStudent) => {
    setEditingStudentId(student.id);
    setStudentForm({
      name: student.name ?? '',
      gradeClass: student.gradeClass ?? '1ª Série',
      category: student.category ?? 'Des. de Sistemas',
      examScore: student.examScore ?? '',
      examSubject: student.examSubject ?? '',
      rankingPosition: student.rankingPosition ?? 'Destaque Acadêmico',
      reason: student.reason ?? '',
      avatarBg: student.avatarBg ?? 'from-cyan-600 to-blue-700',
      initials: student.initials ?? '',
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Aluno carregado no formulário para edição!');
  };

  const handleCancelStudentEdit = () => {
    setEditingStudentId(null);
    setStudentForm({
      name: '',
      gradeClass: '1ª Série - Des. de Sistemas',
      category: 'Des. de Sistemas',
      examScore: 'Média 9.9 nas Provas Bimestrais',
      examSubject: 'Programação Web & Algoritmos',
      rankingPosition: '1º Lugar da Turma',
      reason: 'Excelente dedicação nas avaliações e projetos práticos de tecnologia.',
      avatarBg: 'from-cyan-600 to-blue-700',
      initials: '',
    });
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.examScore) {
      showToast('⚠️ Preencha o nome do aluno e a nota/média de destaque.');
      return;
    }

    const initials = studentForm.name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || 'ES';

    if (editingStudentId) {
      const updated: StarStudent = {
        id: editingStudentId,
        name: studentForm.name || '',
        gradeClass: studentForm.gradeClass || '1ª Série',
        category: (studentForm.category as StarStudent['category']) || 'Des. de Sistemas',
        examScore: studentForm.examScore || 'Média 9.8',
        examSubject: studentForm.examSubject || 'Disciplinas da Base Técnica',
        rankingPosition: studentForm.rankingPosition || 'Destaque Acadêmico',
        reason: studentForm.reason || 'Destaque nas notas e assiduidade.',
        avatarBg: studentForm.avatarBg || 'from-emerald-600 to-teal-700',
        initials: initials,
      };
      onUpdateStarStudent(updated);
      showToast('✅ Dados do aluno destaque atualizados com sucesso!');
      setEditingStudentId(null);
    } else {
      const newStudent: StarStudent = {
        id: `student-${Date.now()}`,
        name: studentForm.name || '',
        gradeClass: studentForm.gradeClass || '1ª Série',
        category: (studentForm.category as StarStudent['category']) || 'Des. de Sistemas',
        examScore: studentForm.examScore || 'Média 9.8',
        examSubject: studentForm.examSubject || 'Disciplinas da Base Técnica',
        rankingPosition: studentForm.rankingPosition || 'Destaque Acadêmico',
        reason: studentForm.reason || 'Destaque nas notas e assiduidade.',
        avatarBg: studentForm.avatarBg || 'from-emerald-600 to-teal-700',
        initials: initials,
      };
      onAddStarStudent(newStudent);
      showToast('🎓 Aluno destaque cadastrado no Mural de Honra!');
    }
    handleCancelStudentEdit();
  };

  // ADMINISTRADORES
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [adminSearch, setAdminSearch] = useState<string>('');
  const [adminForm, setAdminForm] = useState<Partial<Administrator>>({
    name: '',
    role: '',
    team: 'Grupo de Desenvolvimento',
    gradeClass: '1ª Série - Des. de Sistemas',
    email: '',
    phone: '',
    avatarBg: 'from-purple-600 to-indigo-700',
  });

  const handleStartEditAdmin = (admin: Administrator) => {
    setEditingAdminId(admin.id);
    setAdminForm({
      name: admin.name ?? '',
      role: admin.role ?? '',
      team: admin.team ?? 'Grupo de Desenvolvimento',
      gradeClass: admin.gradeClass ?? '1ª Série - Des. de Sistemas',
      email: admin.email ?? '',
      phone: admin.phone ?? '',
      avatarBg: admin.avatarBg ?? 'from-purple-600 to-indigo-700',
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Membro da equipe carregado para edição!');
  };

  const handleCancelAdminEdit = () => {
    setEditingAdminId(null);
    setAdminForm({
      name: '',
      role: '',
      team: 'Grupo de Desenvolvimento',
      gradeClass: '1ª Série - Des. de Sistemas',
      email: '',
      phone: '',
      avatarBg: 'from-purple-600 to-indigo-700',
    });
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.role) {
      showToast('⚠️ Preencha o nome do administrador e o cargo/função.');
      return;
    }

    const today = new Date().toLocaleDateString('pt-BR');
    const selectedTeam = (adminForm.team as Administrator['team']) || 'Grupo de Desenvolvimento';

    if (editingAdminId) {
      const existing = administrators.find((a) => a.id === editingAdminId);
      const updated: Administrator = {
        id: editingAdminId,
        name: adminForm.name || '',
        role: adminForm.role || 'Membro da Equipe',
        team: selectedTeam,
        gradeClass: adminForm.gradeClass || '1ª Série - Des. de Sistemas',
        email: adminForm.email || '',
        phone: adminForm.phone || '',
        avatarBg: adminForm.avatarBg || 'from-purple-600 to-indigo-700',
        registeredAt: existing ? existing.registeredAt : today,
      };
      onUpdateAdministrator(updated);
      showToast('✅ Administrador atualizado com sucesso!');
      setEditingAdminId(null);
    } else {
      const newAdmin: Administrator = {
        id: `admin-${Date.now()}`,
        name: adminForm.name || '',
        role: adminForm.role || 'Membro da Equipe',
        team: selectedTeam,
        gradeClass: adminForm.gradeClass || '1ª Série - Des. de Sistemas',
        email: adminForm.email || '',
        phone: adminForm.phone || '',
        avatarBg: adminForm.avatarBg || 'from-purple-600 to-indigo-700',
        registeredAt: today,
      };
      onAddAdministrator(newAdmin);
      showToast('👑 Novo administrador cadastrado na equipe!');
    }
    handleCancelAdminEdit();
  };

  // GRÊMIO & ENQUETES
  const [editingGremioId, setEditingGremioId] = useState<string | null>(null);
  const [gremioForm, setGremioForm] = useState<Partial<GremioAction>>({
    title: '',
    description: '',
    category: 'Projetos',
    status: 'Em andamento',
    date: 'Setembro / 2026',
    leader: 'Diretoria de Imprensa do Grêmio',
  });

  const [pollQuestion, setPollQuestion] = useState(gremioPoll.question);
  const [pollDescription, setPollDescription] = useState(gremioPoll.description);
  const [pollIsActive, setPollIsActive] = useState(gremioPoll.isActive);
  const [pollOptionsList, setPollOptionsList] = useState<{ label: string; votes: number }[]>(() =>
    Object.entries(gremioPoll.options || {}).map(([label, votes]) => ({ label, votes }))
  );
  const [newOptionLabel, setNewOptionLabel] = useState('');

  const handleSavePollConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = pollOptionsList.filter((o) => o.label.trim() !== '');
    if (!pollQuestion.trim() || validOptions.length < 2) {
      showToast('⚠️ Informe uma pergunta e pelo menos 2 opções de voto.');
      return;
    }

    const optionsRecord: Record<string, number> = {};
    validOptions.forEach((opt) => {
      optionsRecord[opt.label.trim()] = opt.votes;
    });

    onUpdateGremioPoll({
      id: gremioPoll.id,
      question: pollQuestion.trim(),
      description: pollDescription.trim(),
      isActive: pollIsActive,
      options: optionsRecord,
    });
    showToast('🗳️ Enquete do Grêmio atualizada no portal!');
  };

  const handleStartNewPoll = () => {
    const validOptions = pollOptionsList.filter((o) => o.label.trim() !== '');
    if (!pollQuestion.trim() || validOptions.length < 2) {
      showToast('⚠️ Preencha a pergunta e as opções antes de publicar uma nova enquete.');
      return;
    }
    const optionsRecord: Record<string, number> = {};
    validOptions.forEach((opt) => {
      optionsRecord[opt.label.trim()] = 0;
    });
    const resetList = validOptions.map((o) => ({ label: o.label.trim(), votes: 0 }));
    setPollOptionsList(resetList);
    setPollIsActive(true);

    onUpdateGremioPoll({
      id: `poll-${Date.now()}`,
      question: pollQuestion.trim(),
      description: pollDescription.trim(),
      isActive: true,
      options: optionsRecord,
    });
    showToast('🆕 Nova enquete publicada com votos zerados!');
  };

  const handleStartEditGremio = (item: GremioAction) => {
    setEditingGremioId(item.id);
    setGremioForm({
      title: item.title ?? '',
      description: item.description ?? '',
      category: item.category ?? 'Projetos',
      status: item.status ?? 'Em andamento',
      date: item.date ?? 'Setembro / 2026',
      leader: item.leader ?? 'Diretoria de Imprensa do Grêmio',
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Ação do Grêmio carregada para edição!');
  };

  const handleCancelGremioEdit = () => {
    setEditingGremioId(null);
    setGremioForm({
      title: '',
      description: '',
      category: 'Projetos',
      status: 'Em andamento',
      date: 'Setembro / 2026',
      leader: 'Diretoria de Imprensa do Grêmio',
    });
  };

  const handleSaveGremio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gremioForm.title || !gremioForm.description) {
      showToast('⚠️ Preencha o título do projeto e a descrição.');
      return;
    }

    if (editingGremioId) {
      const updated: GremioAction = {
        id: editingGremioId,
        title: gremioForm.title || '',
        description: gremioForm.description || '',
        category: (gremioForm.category as GremioAction['category']) || 'Projetos',
        status: (gremioForm.status as GremioAction['status']) || 'Em andamento',
        date: gremioForm.date || 'Em andamento',
        leader: gremioForm.leader || 'Grêmio Estudantil',
      };
      onUpdateGremioAction(updated);
      showToast('✅ Ação do Grêmio atualizada com sucesso!');
      setEditingGremioId(null);
    } else {
      const newAction: GremioAction = {
        id: `gremio-${Date.now()}`,
        title: gremioForm.title || '',
        description: gremioForm.description || '',
        category: (gremioForm.category as GremioAction['category']) || 'Projetos',
        status: (gremioForm.status as GremioAction['status']) || 'Em andamento',
        date: gremioForm.date || 'Em andamento',
        leader: gremioForm.leader || 'Grêmio Estudantil',
      };
      onAddGremioAction(newAction);
      showToast('💜 Nova ação do Grêmio registrada!');
    }
    handleCancelGremioEdit();
  };

  // FRASES DO DIA
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [quoteForm, setQuoteForm] = useState<Partial<Quote>>({
    text: '',
    author: '',
    role: 'Pensador & Educador',
  });

  const handleStartEditQuote = (q: Quote) => {
    setEditingQuoteId(q.id);
    setQuoteForm({
      text: q.text ?? '',
      author: q.author ?? '',
      role: q.role ?? 'Pensador & Educador',
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Frase carregada no formulário para edição!');
  };

  const handleCancelQuoteEdit = () => {
    setEditingQuoteId(null);
    setQuoteForm({
      return (
    <motion.div
      id="modal-admin-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-emerald-300 px-4 py-3 rounded-xl border border-emerald-700/80 shadow-2xl flex items-center gap-2.5 font-bold text-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100"
      >
        <header className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 border border-emerald-700 flex items-center justify-center text-white shadow-md flex-shrink-0 font-black">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Painel de Gestão & Edição Completa
                </h2>
                <span className="bg-emerald-950/80 text-emerald-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-emerald-800">
                  Elisângela Régia
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Portal de Notícias Escolar Elisângela Régia • Gestão Editorial & Coordenação Pedagógica
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair do Painel</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <nav className="flex items-center gap-1.5 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-thin">
          {[
            { id: 'noticias', label: 'Notícias & Destaque', icon: FileText, count: newsList.length },
            { id: 'eventos', label: 'Eventos & Cultura', icon: Bell, count: events.length },
            { id: 'provas', label: 'Datas de Provas', icon: Calendar, count: assessments.length },
            { id: 'gremio', label: 'Grêmio & Enquetes', icon: Award, count: gremioActions.length },
            { id: 'mural', label: 'Mensagens & Dicas', icon: MessageSquareQuote, count: feedbacks.length },
            { id: 'cardapio', label: 'Cardápio', icon: Utensils, count: dailyMenus.length },
            { id: 'alunos', label: 'Alunos Destaque', icon: GraduationCap, count: starStudents.length },
            { id: 'administradores', label: 'Administradores', icon: ShieldCheck, count: administrators.length },
            { id: 'frases', label: 'Frases do Dia', icon: Sparkles, count: quotes.length },
            { id: 'config', label: 'Config. Portal', icon: Settings, count: null },
            { id: 'backup', label: 'Backup & Reset', icon: RefreshCw, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs border border-emerald-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div ref={scrollContainerRef} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 scroll-smooth">
          
          {activeTab === 'noticias' && (
            <div className="space-y-6">
              {featuredNews && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={featuredNews.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-white">
                        Manchete Principal em Destaque
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{featuredNews.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{featuredNews.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleStartEditNews(featuredNews)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget({ type: 'featured', title: `Destaque: ${featuredNews.title}` })}
                      className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-red-800/60"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Apagar Destaque
                    </button>
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingNewsId ? '✏️ Editando Notícia Selecionada' : '➕ Publicar Nova Notícia'}
                    </h3>
                  </div>
                  {editingNewsId && (
                    <button onClick={handleCancelNewsEdit} className="text-xs text-slate-400 hover:text-white underline cursor-pointer">
                      Cancelar Edição
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveNews} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Título da Notícia</label>
                    <input type="text" value={newsForm.title ?? ""} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Resumo / Chamada</label>
                    <input type="text" value={newsForm.summary ?? ""} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Etiqueta / Tag</label>
                    <input type="text" value={newsForm.tag ?? ""} onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Texto Completo da Matéria</label>
                    <textarea rows={3} value={newsForm.content ?? ""} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Categoria</label>
                    <select value={newsForm.category ?? "geral"} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as NewsCategory })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm">
                      <option value="diario">Diário (Notícias do Dia a Dia)</option>
                      <option value="semanal">Semanal (Destaques da Semana)</option>
                      <option value="mensal">Mensal (Projetos & Conquistas)</option>
                      <option value="geral">Geral (Avisos da Instituição)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Autor</label>
                    <select
                      value={newsForm.authorAdminId ?? ""}
                      onChange={(e) => {
                        const selected = administrators.find(a => a.id === e.target.value);
                        setNewsForm({ ...newsForm, authorAdminId: e.target.value, author: selected ? selected.name : '' });
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    >
                      <option value="">Equipe Editorial</option>
                      {administrators.map(admin => (
                        <option key={admin.id} value={admin.id}>{admin.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Foto / Imagem</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setNewsForm({ ...newsForm, imageUrl: reader.result as string });
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-sm"
                    />
                    <input type="text" value={newsForm.imageUrl ?? ""} onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })} placeholder="Ou cole URL..." className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm mt-2" />
                  </div>
                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Save className="w-4 h-4" />
                      <span>{editingNewsId ? 'Salvar Alterações' : 'Publicar Notícia'}</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notícias Publicadas ({newsList.length})</h4>
                {newsList.map((news) => (
                  <div key={news.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center gap-4">
                      <img src={news.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h5 className="text-sm font-bold text-white">{news.title}</h5>
                        <p className="text-[11px] text-slate-400">{news.date} • {news.tag}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={() => { onUpdateFeaturedNews(news); showToast('⭐ Notícia definida como Destaque!'); }} className="px-2.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 text-xs font-bold cursor-pointer border border-amber-800/50">
                        Destacar
                      </button>
                      <button onClick={() => handleStartEditNews(news)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget({ type: 'news', id: news.id, title: news.title })} className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'eventos' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingEventId ? '✏️ Editando Evento' : '➕ Cadastrar Próximo Evento / Atividade Cultural'}
                    </h3>
                  </div>
                  {editingEventId && (
                    <button onClick={handleCancelEventEdit} className="text-xs text-slate-400 hover:text-white underline cursor-pointer">Cancelar</button>
                  )}
                </div>

                <form onSubmit={handleSaveEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Título do Evento</label>
                    <input type="text" value={eventForm.title ?? ""} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Categoria</label>
                    <select value={eventForm.category ?? "Cultura"} onChange={(e) => setEventForm({ ...eventForm, category: e.target.value as SchoolEvent['category'] })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm">
                      <option value="Cultura">Cultura</option>
                      <option value="Ciência">Ciência</option>
                      <option value="Esporte">Esporte</option>
                      <option value="Acadêmico">Acadêmico</option>
                      <option value="Comunidade">Comunidade</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Data</label>
                    <input type="text" value={eventForm.date ?? ""} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} placeholder="Ex: 25 de Novembro de 2026" className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Horário</label>
                    <input type="text" value={eventForm.time ?? ""} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Local</label>
                    <input type="text" value={eventForm.location ?? ""} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Público-Alvo</label>
                    <input type="text" value={eventForm.targetAudience ?? ""} onChange={(e) => setEventForm({ ...eventForm, targetAudience: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Descrição</label>
                    <textarea rows={3} value={eventForm.description ?? ""} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Imagem</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.
                          {activeTab === 'mural' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  {editingFeedbackId ? '✏️ Editando Mensagem' : '➕ Nova Dica ou Mensagem no Mural'}
                </h3>
                <form onSubmit={handleSaveFeedback} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Autor</label>
                    <input type="text" value={feedbackForm.authorName ?? ""} onChange={(e) => setFeedbackForm({ ...feedbackForm, authorName: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Assunto</label>
                    <input type="text" value={feedbackForm.subject ?? ""} onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Mensagem</label>
                    <textarea rows={3} value={feedbackForm.message ?? ""} onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase flex items-center gap-2 cursor-pointer">
                      <Save className="w-4 h-4" /> <span>{editingFeedbackId ? 'Salvar' : 'Postar'}</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="space-y-3">
                {feedbacks.map((fb) => (
                  <div key={fb.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex justify-between gap-4">
                    <div>
                      <h5 className="text-xs font-bold text-emerald-400">{fb.authorName} ({fb.subject})</h5>
                      <p className="text-xs text-slate-300">{fb.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onBoostFeedbackLikes(fb.id, 5)} className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold cursor-pointer">+5 ({fb.likes})</button>
                      <button onClick={() => handleStartEditFeedback(fb)} className="p-2 rounded-lg bg-slate-800 text-slate-200 cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget({ type: 'feedback', id: fb.id, title: fb.authorName })} className="p-2 rounded-lg bg-red-950/60 text-red-300 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cardapio' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {dailyMenus.map((menu) => (
                  <div key={menu.dayOfWeek} onClick={() => handleSelectDay(menu.dayOfWeek)} className={`p-3 rounded-xl border cursor-pointer ${selectedMenuDay === menu.dayOfWeek ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                    <h4 className="text-xs font-bold">{menu.dayOfWeek}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{menu.mainDish}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSaveMenu} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Data Formatada</label>
                  <input type="text" value={menuForm.dateFormatted ?? ""} onChange={(e) => setMenuForm({ ...menuForm, dateFormatted: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Prato Principal</label>
                  <input type="text" value={menuForm.mainDish ?? ""} onChange={(e) => setMenuForm({ ...menuForm, mainDish: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Acompanhamentos</label>
                  <input type="text" value={menuForm.sideDish ?? ""} onChange={(e) => setMenuForm({ ...menuForm, sideDish: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Saladas & Suco</label>
                  <input type="text" value={menuForm.salad ?? ""} onChange={(e) => setMenuForm({ ...menuForm, salad: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-300">Destaque Nutricional</label>
                  <input type="text" value={menuForm.nutritionalHighlights ?? ""} onChange={(e) => setMenuForm({ ...menuForm, nutritionalHighlights: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer">Salvar Cardápio</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'alunos' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveStudent} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nome do Aluno</label>
                  <input type="text" value={studentForm.name ?? ""} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Curso</label>
                  <select value={studentForm.category ?? "Des. de Sistemas"} onChange={(e) => setStudentForm({ ...studentForm, category: e.target.value as StarStudent['category'] })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm">
                    <option value="Des. de Sistemas">Desenvolvimento de Sistemas</option>
                    <option value="Administração">Administração</option>
                    <option value="Guia de Turismo">Guia de Turismo</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="Geral">Ensino Médio Geral</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Turma</label>
                  <input type="text" value={studentForm.gradeClass ?? ""} onChange={(e) => setStudentForm({ ...studentForm, gradeClass: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nota / Média</label>
                  <input type="text" value={studentForm.examScore ?? ""} onChange={(e) => setStudentForm({ ...studentForm, examScore: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Disciplina</label>
                  <input type="text" value={studentForm.examSubject ?? ""} onChange={(e) => setStudentForm({ ...studentForm, examSubject: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Posição</label>
                  <input type="text" value={studentForm.rankingPosition ?? ""} onChange={(e) => setStudentForm({ ...studentForm, rankingPosition: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                </div>
                <div className="space-y-1.5 md:col-span-3">
                  <label className="text-xs font-bold text-slate-300">Motivo</label>
                  <input type="text" value={studentForm.reason ?? ""} onChange={(e) => setStudentForm({ ...studentForm, reason: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase cursor-pointer">Salvar Aluno</button>
                </div>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredStudents.map((s) => (
                  <div key={s.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h5 className="text-sm font-bold text-white">{s.name}</h5>
                      <span className="text-[10px] text-slate-400">{s.gradeClass} • {s.examScore}</span>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleStartEditStudent(s)} className="p-1.5 rounded-lg bg-slate-800 text-slate-200 cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteTarget({ type: 'student', id: s.id, title: s.name })} className="p-1.5 rounded-lg bg-red-950/60 text-red-300 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'administradores' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveAdmin} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nome</label>
                  <input type="text" value={adminForm.name ?? ""} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Cargo</label>
                  <input type="text" value={adminForm.role ?? ""} onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Equipe / Diretoria</label>
                  <select value={adminForm.team ?? "Grupo de Desenvolvimento"} onChange={(e) => setAdminForm({ ...adminForm, team: e.target.value as Administrator['team'] })} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm">
                    <option value="Grupo de Desenvolvimento">Grupo de Desenvolvimento</option>
                    <option value="Grêmio Estudantil">Grêmio Estudantil</option>
                    <option value="Direção do CETI">Direção do CETI</option>
                    <option value="Coordenação Pedagógica">Coordenação Pedagógica</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Turma / Série</label>
                  <input type="text" value={adminForm.gradeClass ?? ""} onChange={(e) => setAdminForm({ ...adminForm, gradeClass: e.target.value })} className="w
