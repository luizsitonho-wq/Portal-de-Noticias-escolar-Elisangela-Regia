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
  Quote,
  Administrator,
  PortalSettings
} from '../types';
import { 
  ShieldCheck, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Sparkles, 
  BookOpen, 
  MessageSquareQuote, 
  Utensils, 
  Calendar, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Image, 
  User, 
  Clock, 
  Flame, 
  Tag, 
  GraduationCap, 
  Check, 
  ThumbsUp, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Copy,
  Users,
  Mail,
  Phone,
  Crown,
  Search,
  Filter,
  Layers,
  FileText,
  Settings
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  
  // Notícias
  featuredNews: NewsItem;
  onUpdateFeaturedNews: (news: NewsItem) => void;
  newsList: NewsItem[];
  onAddNews: (news: NewsItem) => void;
  onUpdateNews: (news: NewsItem) => void;
  onDeleteNews: (id: string) => void;
  
  // Mensagens / Feedbacks
  feedbacks: FeedbackSubmission[];
  onAddFeedback: (feedback: FeedbackSubmission) => void;
  onUpdateFeedback: (feedback: FeedbackSubmission) => void;
  onDeleteFeedback: (id: string) => void;
  onBoostFeedbackLikes: (id: string, amount: number) => void;
  
  // Cardápio
  dailyMenus: DailyMenu[];
  onUpdateDailyMenu: (dayOfWeek: string, updatedMenu: DailyMenu) => void;
  onReorderDailyMenus?: (menus: DailyMenu[]) => void;
  
  // Provas e Avaliações
  assessments: AssessmentItem[];
  onAddAssessment: (item: AssessmentItem) => void;
  onUpdateAssessment: (item: AssessmentItem) => void;
  onDeleteAssessment: (id: string) => void;
  
  // Alunos Destaque
  starStudents: StarStudent[];
  onAddStarStudent: (student: StarStudent) => void;
  onUpdateStarStudent: (student: StarStudent) => void;
  onDeleteStarStudent: (id: string) => void;
  
  // Administradores
  administrators: Administrator[];
  onAddAdministrator: (admin: Administrator) => void;
  onUpdateAdministrator: (admin: Administrator) => void;
  onDeleteAdministrator: (id: string) => void;
  
  // Grêmio
  gremioActions: GremioAction[];
  onAddGremioAction: (action: GremioAction) => void;
  onUpdateGremioAction: (action: GremioAction) => void;
  onDeleteGremioAction: (id: string) => void;

  // Frases
  quotes: Quote[];
  onAddQuote: (quote: Quote) => void;
  onUpdateQuote?: (quote: Quote) => void;
  onDeleteQuote: (id: string) => void;

  // Configurações
  portalSettings: PortalSettings;
  onUpdatePortalSettings: (settings: PortalSettings) => void;

  // Sistema
  onResetAllData: () => void;
}

type AdminTab = 'noticias' | 'provas' | 'mural' | 'cardapio' | 'alunos' | 'administradores' | 'gremio' | 'frases' | 'backup' | 'config';

// Imagens escolares pré-selecionadas de alta qualidade
const PRESET_IMAGES = [
  { label: 'Informática & TI', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Laboratório & Ciências', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Biblioteca & Estudos', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80' },
  { label: 'Feira Cultural & Arte', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  { label: 'Esportes & Quadra', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' },
  { label: 'Grêmio & Liderança', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80' },
  { label: 'Refeitório & Alimentação', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onLogout,
  featuredNews,
  onUpdateFeaturedNews,
  newsList,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
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
    type: 'news' | 'assessment' | 'feedback' | 'student' | 'admin' | 'gremio' | 'quote' | 'reset';
    id?: string;
    title: string;
  }
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const handleExecuteDelete = () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;

    if (type === 'news' && id) {
      onDeleteNews(id);
      showToast('🗑️ Notícia removida com sucesso!');
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ==========================================
  // ESTADOS PARA GESTÃO DE NOTÍCIAS
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
      imageUrl: item.imageUrl ?? PRESET_IMAGES[0].url,
      readTimeMinutes: item.readTimeMinutes ?? 3,
    });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('✏️ Notícia carregada no formulário de edição acima!');
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
  // ESTADOS PARA GESTÃO DE PROVAS & DATAS
  // ==========================================
  const [editingAssessmentId, setEditingAssessmentId] = useState<string | null>(null);
  const [assessmentFilterClass, setAssessmentFilterClass] = useState<string>('all');
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
  // ESTADOS PARA GESTÃO DE MENSAGENS / MURAL
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
  // ESTADOS PARA REORGANIZAÇÃO DO CARDÁPIO
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

  // Trocar posição de 2 dias no cardápio
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

  // ==========================================
  // ESTADOS PARA ALUNOS DESTAQUE ORGANIZADOS
  // ==========================================
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

  // ==========================================
  // ESTADOS PARA CADASTRO DE ADMINISTRADORES
  // ==========================================
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [adminSearch, setAdminSearch] = useState<string>('');
  const [adminForm, setAdminForm] = useState<Partial<Administrator>>({
    name: '',
    role: 'Coordenador Pedagógico',
    team: 'Coordenação Pedagógica',
    gradeClass: 'Coordenação Escolar',
    email: '',
    phone: '',
    avatarBg: 'from-purple-600 to-indigo-700',
  });

  const handleStartEditAdmin = (admin: Administrator) => {
    setEditingAdminId(admin.id);
    setAdminForm({
      name: admin.name ?? '',
      role: admin.role ?? 'Coordenador Pedagógico',
      team: admin.team ?? 'Coordenação Pedagógica',
      gradeClass: admin.gradeClass ?? 'Coordenação Escolar',
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
      role: 'Coordenador Pedagógico',
      team: 'Coordenação Pedagógica',
      gradeClass: 'Coordenação Escolar',
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

    if (editingAdminId) {
      const existing = administrators.find((a) => a.id === editingAdminId);
      const updated: Administrator = {
        id: editingAdminId,
        name: adminForm.name || '',
        role: adminForm.role || 'Membro da Equipe',
        team: (adminForm.team as Administrator['team']) || 'Desenvolvimento de Sistemas',
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
        team: (adminForm.team as Administrator['team']) || 'Desenvolvimento de Sistemas',
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

  // ==========================================
  // ESTADOS PARA PROJETOS DO GRÊMIO
  // ==========================================
  const [editingGremioId, setEditingGremioId] = useState<string | null>(null);
  const [gremioForm, setGremioForm] = useState<Partial<GremioAction>>({
    title: '',
    description: '',
    category: 'Projetos',
    status: 'Em andamento',
    date: 'Setembro / 2026',
    leader: 'Diretoria de Imprensa do Grêmio',
  });

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
        leader: gremioForm.leader || 'Grêmio Estudantil Cecília Mendes',
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
        leader: gremioForm.leader || 'Grêmio Estudantil Cecília Mendes',
      };
      onAddGremioAction(newAction);
      showToast('💜 Nova ação do Grêmio registrada!');
    }
    handleCancelGremioEdit();
  };

  // ==========================================
  // ESTADOS PARA FRASES DO DIA
  // ==========================================
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
    setQuoteForm({ text: '', author: '', role: 'Pensador & Educador' });
  };

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.text || !quoteForm.author) {
      showToast('⚠️ Preencha o texto da citação e o autor.');
      return;
    }

    if (editingQuoteId && onUpdateQuote) {
      const updated: Quote = {
        id: editingQuoteId,
        text: quoteForm.text || '',
        author: quoteForm.author || '',
        role: quoteForm.role || 'Educador',
      };
      onUpdateQuote(updated);
      showToast('✨ Frase atualizada com sucesso!');
      setEditingQuoteId(null);
    } else {
      const newQuote: Quote = {
        id: `quote-${Date.now()}`,
        text: quoteForm.text || '',
        author: quoteForm.author || '',
        role: quoteForm.role || 'Educador',
      };
      onAddQuote(newQuote);
      showToast('✨ Nova frase inspiradora adicionada!');
    }
    handleCancelQuoteEdit();
  };

  // Filtragem de alunos por modalidade
  const filteredStudents = starStudents.filter((s) => {
    if (studentFilter === 'all') return true;
    return s.category === studentFilter;
  });

  // Filtragem de avaliações por turma
  const filteredAssessments = assessments.filter((a) => {
    if (assessmentFilterClass === 'all') return true;
    return a.gradeClass.toLowerCase().includes(assessmentFilterClass.toLowerCase());
  });

  // Filtragem de administradores por busca
  const filteredAdmins = administrators.filter((a) => {
    if (!adminSearch) return true;
    const q = adminSearch.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.team.toLowerCase().includes(q) ||
      a.gradeClass.toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  return (
    <motion.div
      id="modal-admin-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      {/* Toast Notification */}
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
        {/* Topo do Painel Administrativo */}
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
              title="Encerrar sessão administrativa"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair do Painel</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700"
              title="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Barra de Abas / Módulos de Edição */}
        <nav className="flex items-center gap-1.5 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto scrollbar-thin">
          {[
            { id: 'noticias', label: 'Notícias & Destaque', icon: FileText, count: newsList.length },
            { id: 'provas', label: 'Datas de Provas', icon: Calendar, count: assessments.length },
            { id: 'mural', label: 'Mensagens & Dicas', icon: MessageSquareQuote, count: feedbacks.length },
            { id: 'cardapio', label: 'Reorganizar Cardápio', icon: Utensils, count: dailyMenus.length },
            { id: 'alunos', label: 'Cadastrar Alunos', icon: GraduationCap, count: starStudents.length },
            { id: 'config', label: 'Config. Portal', icon: Settings, count: 0 },
            { id: 'administradores', label: 'Administradores', icon: ShieldCheck, count: administrators.length },
            { id: 'gremio', label: 'Grêmio Ações', icon: Award, count: gremioActions.length },
            { id: 'frases', label: 'Frases do Dia', icon: Sparkles, count: quotes.length },
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

        {/* Conteúdo da Aba Selecionada */}
        <div ref={scrollContainerRef} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 scroll-smooth">
          
          {/* ========================================================= */}
          {/* ABA 1: NOTÍCIAS & ALTERAÇÃO DE DESTAQUE */}
          {/* ========================================================= */}
          {activeTab === 'noticias' && (
            <div className="space-y-6">
              {/* Formulário de Notícia */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingNewsId ? '✏️ Editando Notícia Selecionada' : '➕ Publicar Nova Notícia'}
                    </h3>
                  </div>
                  {editingNewsId && (
                    <button
                      onClick={handleCancelNewsEdit}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveNews} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Título da Notícia</label>
                    <input
                      type="text"
                      value={newsForm.title ?? ""}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      placeholder="Ex: Laboratório de Informática do CETI recebe novos computadores"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Resumo / Chamada (Linha Fina)</label>
                    <input
                      type="text"
                      value={newsForm.summary ?? ""}
                      onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                      placeholder="Resumo curto que aparece no card..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Etiqueta / Tag</label>
                    <input
                      type="text"
                      value={newsForm.tag ?? ""}
                      onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value })}
                      placeholder="Ex: Tecnologia, Provas, Grêmio, Cultura"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Categoria de Exibição</label>
                    <select
                      value={newsForm.category ?? "geral"}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as NewsCategory })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="diario">Diário (Notícias do Dia a Dia)</option>
                      <option value="semanal">Semanal (Destaques da Semana)</option>
                      <option value="mensal">Mensal (Projetos & Conquistas)</option>
                      <option value="geral">Geral (Avisos da Instituição)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Autor (Selecione um Admin)</label>
                    <select
                      value={newsForm.authorAdminId ?? ""}
                      onChange={(e) => {
                        const selected = administrators.find(a => a.id === e.target.value);
                        setNewsForm({ ...newsForm, authorAdminId: e.target.value, author: selected ? selected.name : '' });
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="">Selecione o autor...</option>
                      {administrators.map(admin => (
                        <option key={admin.id} value={admin.id}>{admin.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Foto / Imagem da Notícia</label>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewsForm({ ...newsForm, imageUrl: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-emerald-900 file:text-emerald-100 hover:file:bg-emerald-800"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 italic">Ou insira uma URL de imagem externa abaixo (caso não envie arquivo):</p>
                      <input
                        type="text"
                        value={newsForm.imageUrl ?? ""}
                        onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                        placeholder="Ex: https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingNewsId ? 'Salvar Alterações' : 'Publicar Notícia'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de Notícias */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Notícias Publicadas ({newsList.length})
                </h4>
                {newsList.map((news) => (
                  <div key={news.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={news.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h5 className="text-sm font-bold text-white">{news.title}</h5>
                        <p className="text-[11px] text-slate-400">{news.date} • {news.tag}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleStartEditNews(news)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteTarget({ type: 'news', id: news.id, title: news.title })} className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-all cursor-pointer border border-red-900/40">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 2: DATAS DE PROVAS */}
          {/* ========================================================= */}
          {activeTab === 'provas' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingAssessmentId ? '✏️ Editando Avaliação' : '➕ Agendar Nova Prova / Avaliação'}
                    </h3>
                  </div>
                  {editingAssessmentId && (
                    <button onClick={handleCancelAssessmentEdit} className="text-xs text-slate-400 hover:text-white underline cursor-pointer">Cancelar Edição</button>
                  )}
                </div>

                <form onSubmit={handleSaveAssessment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Título da Avaliação</label>
                    <input type="text" value={assessmentForm.title ?? ""} onChange={(e) => setAssessmentForm({ ...assessmentForm, title: e.target.value })} placeholder="Ex: Prova Mensal de Programação" className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Disciplina</label>
                    <input type="text" value={assessmentForm.subject ?? ""} onChange={(e) => setAssessmentForm({ ...assessmentForm, subject: e.target.value })} placeholder="Ex: Algoritmos" className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Turma (Série)</label>
                    <input type="text" value={assessmentForm.gradeClass ?? ""} onChange={(e) => setAssessmentForm({ ...assessmentForm, gradeClass: e.target.value })} placeholder="Ex: 1ª Série - Des. de Sistemas" className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Data da Prova</label>
                    <input type="text" value={assessmentForm.date ?? ""} onChange={(e) => setAssessmentForm({ ...assessmentForm, date: e.target.value })} placeholder="Ex: 15 de Setembro" className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Tópicos para Estudo (Separados por vírgula)</label>
                    <input type="text" value={topicsInput} onChange={(e) => setTopicsInput(e.target.value)} placeholder="Ex: Lógica de Programação, Estruturas de Repetição, Arrays" className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Save className="w-4 h-4" /> <span>{editingAssessmentId ? 'Salvar Alterações' : 'Cadastrar Avaliação'}</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avaliações Agendadas</h4>
                {assessments.map(a => (
                  <div key={a.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h5 className="text-sm font-bold text-white">{a.title} ({a.subject})</h5>
                      <p className="text-[11px] text-emerald-400">{a.date} | {a.gradeClass}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleStartEditAssessment(a)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget({ type: 'assessment', id: a.id, title: a.title })} className="p-2 bg-red-950/60 hover:bg-red-900 rounded-lg text-red-300"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 3: MURAL DE MENSAGENS / FEEDBACKS */}
          {/* ========================================================= */}
          {activeTab === 'mural' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingFeedbackId ? '✏️ Editando Mensagem' : '➕ Nova Dica ou Mensagem no Mural'}
                    </h3>
                  </div>
                  {editingFeedbackId && (
                    <button onClick={handleCancelFeedbackEdit} className="text-xs text-slate-400 hover:text-white underline cursor-pointer">Cancelar Edição</button>
                  )}
                </div>
                
                <form onSubmit={handleSaveFeedback} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Autor da Mensagem</label>
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
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                      <Save className="w-4 h-4" /> <span>{editingFeedbackId ? 'Salvar Mensagem' : 'Postar no Mural'}</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mensagens Cadastradas</h4>
                <div className="grid grid-cols-1 gap-3">
                  {feedbacks.map((fb) => (
                    <div key={fb.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex justify-between gap-4">
                      <div>
                        <h5 className="text-xs font-bold text-emerald-400">{fb.authorName} ({fb.subject})</h5>
                        <p className="text-xs text-slate-300 leading-relaxed">{fb.message}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                        <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 text-xs text-emerald-400 font-bold">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{fb.likes}</span>
                          <button
                            onClick={() => {
                              onBoostFeedbackLikes(fb.id, 5);
                              showToast('👍 +5 Curtidas adicionadas!');
                            }}
                            className="ml-1 text-[10px] bg-emerald-950 text-emerald-300 hover:bg-emerald-800 px-1.5 py-0.5 rounded cursor-pointer border border-emerald-800/60"
                            title="Impulsionar curtidas"
                          >
                            +5
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleStartEditFeedback(fb)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
                          title="Editar mensagem"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'feedback', id: fb.id, title: `Mensagem de ${fb.authorName}` })}
                          className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-all cursor-pointer border border-red-900/40"
                          title="Apagar mensagem do mural"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 4: REORGANIZAR & EDITAR CARDÁPIO DA MERENDA */}
          {/* ========================================================= */}
          {activeTab === 'cardapio' && (
            <div className="space-y-6">
              {/* Seletor de Dia e Reorganização */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-emerald-400" />
                    <span>Selecione o Dia ou Reorganize a Ordem Semanal</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {dailyMenus.map((menu, idx) => {
                    const isSelected = selectedMenuDay === menu.dayOfWeek;
                    return (
                      <div
                        key={menu.dayOfWeek}
                        className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                        onClick={() => handleSelectDay(menu.dayOfWeek)}
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase text-slate-400">Dia {idx + 1}</span>
                          <h4 className="text-xs font-bold truncate">{menu.dayOfWeek}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{menu.mainDish}</p>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                          <span className="text-[10px] text-slate-500 font-mono">{menu.dateFormatted}</span>
                          {onReorderDailyMenus && (
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              {idx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveMenu(idx, 'up')}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                                  title="Mover dia para cima"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                              )}
                              {idx < dailyMenus.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveMenu(idx, 'down')}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                                  title="Mover dia para baixo"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formulário de Edição do Dia Selecionado */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      🍽️ Editando Cardápio de: <span className="text-emerald-400">{selectedMenuDay}</span>
                    </h3>
                  </div>
                </div>

                <form onSubmit={handleSaveMenu} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Data Formatada</label>
                    <input
                      type="text"
                      value={menuForm.dateFormatted ?? ""}
                      onChange={(e) => setMenuForm({ ...menuForm, dateFormatted: e.target.value })}
                      placeholder="Ex: 01 de Setembro"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Prato Principal (Proteína & Base)</label>
                    <input
                      type="text"
                      value={menuForm.mainDish ?? ""}
                      onChange={(e) => setMenuForm({ ...menuForm, mainDish: e.target.value })}
                      placeholder="Ex: Feijoada Tradicional Escolar ou Frango Xadrez"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none font-bold text-emerald-300"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Acompanhamentos</label>
                    <input
                      type="text"
                      value={menuForm.sideDish ?? ""}
                      onChange={(e) => setMenuForm({ ...menuForm, sideDish: e.target.value })}
                      placeholder="Ex: Arroz Branco, Farofa Rica de Cenoura e Couve Refogada"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Saladas, Sobremesa & Suco</label>
                    <input
                      type="text"
                      value={menuForm.salad ?? ""}
                      onChange={(e) => setMenuForm({ ...menuForm, salad: e.target.value })}
                      placeholder="Ex: Salada de Tomate, Laranja Fresca e Suco de Caju"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Destaque Nutricional / Vitaminas</label>
                    <input
                      type="text"
                      value={menuForm.nutritionalHighlights ?? ""}
                      onChange={(e) => setMenuForm({ ...menuForm, nutritionalHighlights: e.target.value })}
                      placeholder="Ex: Alto teor de Ferro, Vitamina C e Proteínas de alto valor biológico"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Cardápio de {selectedMenuDay}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 5: CADASTRO ORGANIZADO DE ALUNOS & MÉDIAS DE PROVAS */}
          {/* ========================================================= */}
          {activeTab === 'alunos' && (
            <div className="space-y-6">
              {/* Formulário de Cadastro do Aluno Destaque */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingStudentId ? '✏️ Editando Aluno Destaque' : '➕ Cadastrar Aluno Destaque & Notas'}
                    </h3>
                  </div>
                  {editingStudentId && (
                    <button
                      onClick={handleCancelStudentEdit}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Nome do Aluno(a)</label>
                    <input
                      type="text"
                      value={studentForm.name ?? ""}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      placeholder="Ex: Guilherme Santos Silva"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Curso Técnico / Área</label>
                    <select
                      value={studentForm.category ?? "Des. de Sistemas"}
                      onChange={(e) => setStudentForm({ ...studentForm, category: e.target.value as StarStudent['category'] })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Des. de Sistemas">Desenvolvimento de Sistemas</option>
                      <option value="Administração">Administração</option>
                      <option value="Guia de Turismo">Guia de Turismo</option>
                      <option value="Marketing Digital">Marketing Digital</option>
                      <option value="Geral">Ensino Médio Geral</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Turma / Série</label>
                    <input
                      type="text"
                      value={studentForm.gradeClass ?? ""}
                      onChange={(e) => setStudentForm({ ...studentForm, gradeClass: e.target.value })}
                      placeholder="Ex: 1ª Série - Des. de Sistemas"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Nota / Média de Destaque</label>
                    <input
                      type="text"
                      value={studentForm.examScore ?? ""}
                      onChange={(e) => setStudentForm({ ...studentForm, examScore: e.target.value })}
                      placeholder="Ex: Média 9.9 nas Provas Bimestrais"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none font-bold text-emerald-300"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Disciplina(s) de Destaque</label>
                    <input
                      type="text"
                      value={studentForm.examSubject ?? ""}
                      onChange={(e) => setStudentForm({ ...studentForm, examSubject: e.target.value })}
                      placeholder="Ex: Algoritmos, Matemática e Física"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Posição / Título de Honra</label>
                    <input
                      type="text"
                      value={studentForm.rankingPosition ?? ""}
                      onChange={(e) => setStudentForm({ ...studentForm, rankingPosition: e.target.value })}
                      placeholder="Ex: 1º Lugar da Turma / Nota 10.0"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-3">
                    <label className="text-xs font-bold text-slate-300">Motivo do Reconhecimento</label>
                    <input
                      type="text"
                      value={studentForm.reason ?? ""}
                      onChange={(e) => setStudentForm({ ...studentForm, reason: e.target.value })}
                      placeholder="Ex: Maior nota nas avaliações teóricas e excelente participação nos projetos escolares."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingStudentId ? 'Salvar Dados do Aluno' : 'Cadastrar no Mural de Honra'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista e Filtros de Alunos */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Alunos no Mural de Honra ({starStudents.length})
                  </h4>
                  {/* Filtros por Curso */}
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'Des. de Sistemas', 'Administração', 'Guia de Turismo', 'Marketing Digital'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setStudentFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          studentFilter === cat
                            ? 'bg-emerald-800 text-white border border-emerald-700'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                        }`}
                      >
                        {cat === 'all' ? 'Todos os Cursos' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                            {s.initials}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{s.name}</h5>
                            <span className="text-[10px] text-slate-400">{s.gradeClass}</span>
                          </div>
                        </div>

                        <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-amber-400 font-bold">{s.rankingPosition}</span>
                            <span className="text-emerald-400 font-bold">{s.examScore}</span>
                          </div>
                          <p className="text-[11px] text-slate-300"><strong className="text-slate-400">Matéria:</strong> {s.examSubject}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-2">{s.reason}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => handleStartEditStudent(s)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
                          title="Editar aluno"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'student', id: s.id, title: s.name })}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-all cursor-pointer border border-red-900/40"
                          title="Remover aluno"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA: CONFIGURAÇÕES DO PORTAL */}
          {/* ========================================================= */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-emerald-400" />
                  Configurações do Portal
                </h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    onUpdatePortalSettings(portalSettings);
                    showToast('✅ Configurações salvas!');
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Nome da Escola</label>
                    <input type="text" value={portalSettings.schoolName || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, schoolName: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Descrição</label>
                    <input type="text" value={portalSettings.description || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, description: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Endereço</label>
                    <input type="text" value={portalSettings.address || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, address: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Telefone</label>
                    <input type="text" value={portalSettings.phone || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, phone: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">E-mail</label>
                    <input type="email" value={portalSettings.email || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, email: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Turno Matutino</label>
                    <input type="text" value={portalSettings.morningShift || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, morningShift: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Turno Vespertino</label>
                    <input type="text" value={portalSettings.afternoonShift || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, afternoonShift: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Horário Secretaria</label>
                    <input type="text" value={portalSettings.officeHours || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, officeHours: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Horário Biblioteca</label>
                    <input type="text" value={portalSettings.libraryHours || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, libraryHours: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Nome do Grêmio</label>
                    <input type="text" value={portalSettings.gremioName || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, gremioName: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Diretoria Atual</label>
                    <input type="text" value={portalSettings.gremioBoard || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, gremioBoard: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Frase / Citação da Presidência do Grêmio</label>
                    <textarea rows={2} value={portalSettings.gremioQuote || ''} onChange={(e) => onUpdatePortalSettings({...portalSettings, gremioQuote: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" />
                  </div>
                  <div className="md:col-span-2 pt-2">
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase flex items-center gap-2 cursor-pointer transition-colors">
                      <Save className="w-4 h-4" /> Salvar Configurações
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 6: CADASTRO E GESTÃO DE ADMINISTRADORES */}
          {/* ========================================================= */}
          {activeTab === 'administradores' && (
            <div className="space-y-6">
              {/* Formulário de Cadastro do Administrador */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingAdminId ? '✏️ Editando Administrador' : '➕ Cadastrar Novo Administrador / Membro da Equipe'}
                    </h3>
                  </div>
                  {editingAdminId && (
                    <button
                      onClick={handleCancelAdminEdit}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Nome do Administrador</label>
                    <input
                      type="text"
                      value={adminForm.name ?? ""}
                      onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                      placeholder="Ex: Ana Clara Rodrigues"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Cargo / Função</label>
                    <input
                      type="text"
                      value={adminForm.role ?? ""}
                      onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                      placeholder="Ex: Redatora Chefe / Dev Front-End"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Equipe / Diretoria</label>
                    <select
                      value={adminForm.team ?? "Coordenação Pedagógica"}
                      onChange={(e) => setAdminForm({ ...adminForm, team: e.target.value as Administrator['team'] })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Grupo de Desenvolvimento">Grupo de Desenvolvimento</option>
                      <option value="Grêmio Estudantil">Grêmio Estudantil</option>
                      <option value="Direção do CETI">Direção do CETI</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Turma / Série</label>
                    <input
                      type="text"
                      value={adminForm.gradeClass ?? ""}
                      onChange={(e) => setAdminForm({ ...adminForm, gradeClass: e.target.value })}
                      placeholder="Ex: 1ª Série - Des. de Sistemas"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">E-mail Institucional</label>
                    <input
                      type="email"
                      value={adminForm.email ?? ""}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                      placeholder="exemplo@aluno.edu.pi.gov.br"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Telefone / WhatsApp (Opcional)</label>
                    <input
                      type="text"
                      value={adminForm.phone ?? ""}
                      onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                      placeholder="(86) 99999-0000"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingAdminId ? 'Salvar Alterações do Administrador' : 'Cadastrar Administrador'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de Administradores */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Equipe Administrativa Cadastrada ({administrators.length})
                  </h4>
                  <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={adminSearch ?? ""}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Buscar por nome, equipe ou turma..."
                      className="bg-transparent text-xs text-white focus:outline-none w-48 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredAdmins.map((adm) => (
                    <div
                      key={adm.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-800 border border-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                          {adm.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <h5 className="text-sm font-bold text-white">{adm.name}</h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                              {adm.team}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-300 font-medium">{adm.role}</p>
                          <p className="text-[11px] text-slate-400">{adm.gradeClass}</p>
                          {adm.email && (
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                              <Mail className="w-3 h-3 text-slate-500" />
                              <span>{adm.email}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEditAdmin(adm)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
                          title="Editar administrador"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'admin', id: adm.id, title: adm.name })}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-all cursor-pointer border border-red-900/40"
                          title="Remover administrador"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 7: PROJETOS E AÇÕES DO GRÊMIO */}
          {/* ========================================================= */}
          {activeTab === 'gremio' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingGremioId ? '✏️ Editando Ação do Grêmio Estudantil' : '➕ Cadastrar Novo Projeto / Ação do Grêmio Estudantil'}
                    </h3>
                  </div>
                  {editingGremioId && (
                    <button
                      onClick={handleCancelGremioEdit}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveGremio} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Título do Projeto</label>
                    <input
                      type="text"
                      value={gremioForm.title ?? ""}
                      onChange={(e) => setGremioForm({ ...gremioForm, title: e.target.value })}
                      placeholder="Ex: Reforma dos Armários & Campanha de Doação de Livros"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Status</label>
                    <select
                      value={gremioForm.status ?? "Em andamento"}
                      onChange={(e) => setGremioForm({ ...gremioForm, status: e.target.value as GremioAction['status'] })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Próximo">Próximo / Planejado</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Categoria</label>
                    <select
                      value={gremioForm.category ?? "Projetos"}
                      onChange={(e) => setGremioForm({ ...gremioForm, category: e.target.value as GremioAction['category'] })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Projetos">Projetos</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Esporte">Esporte</option>
                      <option value="Representatividade">Representatividade</option>
                      <option value="Melhorias">Melhorias Estruturais</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Período / Data</label>
                    <input
                      type="text"
                      value={gremioForm.date ?? ""}
                      onChange={(e) => setGremioForm({ ...gremioForm, date: e.target.value })}
                      placeholder="Ex: Setembro a Outubro / 2026"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Diretoria / Responsável</label>
                    <input
                      type="text"
                      value={gremioForm.leader ?? ""}
                      onChange={(e) => setGremioForm({ ...gremioForm, leader: e.target.value })}
                      placeholder="Ex: Kauane Melo e Diretoria Cultural"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-3">
                    <label className="text-xs font-bold text-slate-300">Descrição Detalhada da Ação</label>
                    <textarea
                      rows={3}
                      value={gremioForm.description ?? ""}
                      onChange={(e) => setGremioForm({ ...gremioForm, description: e.target.value })}
                      placeholder="Descreva o que será feito e o benefício para a comunidade escolar..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingGremioId ? 'Salvar Ação do Grêmio' : 'Cadastrar Ação'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de Ações */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Ações do Grêmio ({gremioActions.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {gremioActions.map((g) => (
                    <div
                      key={g.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-purple-300 uppercase border border-slate-700">
                            {g.category} • {g.status}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{g.date}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white">{g.title}</h5>
                        <p className="text-xs text-slate-300">{g.description}</p>
                        <p className="text-[11px] text-emerald-400 font-medium">Líder: {g.leader}</p>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => handleStartEditGremio(g)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'gremio', id: g.id, title: g.title })}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-all cursor-pointer border border-red-900/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 8: FRASES INSPIRADORAS DO DIA */}
          {/* ========================================================= */}
          {activeTab === 'frases' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    ✨ Adicionar Frase Inspiradora
                  </h3>
                </div>

                <form onSubmit={handleSaveQuote} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Texto da Frase / Citação</label>
                    <input
                      type="text"
                      value={quoteForm.text ?? ""}
                      onChange={(e) => setQuoteForm({ ...quoteForm, text: e.target.value })}
                      placeholder="Ex: A educação é a arma mais poderosa que você pode usar para mudar o mundo."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Autor(a)</label>
                    <input
                      type="text"
                      value={quoteForm.author ?? ""}
                      onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                      placeholder="Ex: Nelson Mandela"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Papel / Referência</label>
                    <input
                      type="text"
                      value={quoteForm.role ?? ""}
                      onChange={(e) => setQuoteForm({ ...quoteForm, role: e.target.value })}
                      placeholder="Ex: Líder e Prêmio Nobel da Paz"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingQuoteId ? 'Salvar Alterações' : 'Cadastrar Frase'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de Frases */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Frases no Carrossel ({quotes.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quotes.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 flex items-start justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <p className="text-xs text-white italic">"{q.text}"</p>
                        <p className="text-[11px] text-emerald-400 font-bold">{q.author} • <span className="text-slate-400 font-normal">{q.role}</span></p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEditQuote(q)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer border border-slate-700"
                          title="Editar frase"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'quote', id: q.id, title: `Frase de ${q.author}` })}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-all cursor-pointer border border-red-900/40"
                          title="Apagar frase"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ABA 9: BACKUP & RESTAURAÇÃO DE DADOS */}
          {/* ========================================================= */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>Manutenção e Backup do Portal</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Todas as notícias, datas de provas, mensagens do mural, cardápios e alunos cadastrados estão sincronizados no armazenamento local do navegador (<code className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-emerald-300 font-mono">localStorage</code>).
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const dataBackup = {
                        featuredNews,
                        newsList,
                        assessments,
                        feedbacks,
                        dailyMenus,
                        starStudents,
                        administrators,
                        gremioActions,
                        quotes,
                        exportedAt: new Date().toISOString(),
                      };
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataBackup, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', `backup_portal_ceti_2026_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      showToast('💾 Arquivo de backup exportado com sucesso!');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border border-emerald-700 shadow-sm"
                  >
                    <span>Exportar Backup (JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget({ type: 'reset', title: 'Restaurar Dados Originais de Fábrica' })}
                    className="px-4 py-2.5 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-200 border border-red-800 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Restaurar Dados Originais de Fábrica</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>


      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-slate-900 border border-red-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-4 text-slate-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 mx-auto flex items-center justify-center border border-red-500/40">
                <Trash2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-white">Confirmar Exclusão</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {deleteTarget.type === 'reset'
                    ? 'Tem certeza que deseja restaurar todos os dados e conteúdos originais de fábrica? Suas alterações salvas no navegador serão redefinidas.'
                    : `Deseja realmente excluir "${deleteTarget.title}"? Esta ação removerá o item do portal imediatamente.`}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer border border-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleExecuteDelete}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Sim, Confirmar e Excluir</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Rodapé Interno do Painel */}
        <footer className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-500 font-mono">
          Portal de Notícias Escolar Elisângela Régia • Desenvolvido pela 1ª Série de Desenvolvimento de Sistemas
        </footer>
      </motion.div>
    </motion.div>
  );
};
