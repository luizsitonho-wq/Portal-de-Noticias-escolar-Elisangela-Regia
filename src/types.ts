/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type NewsCategory = 'diario' | 'semanal' | 'mensal' | 'geral';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  tag: string;
  date: string;
  author: string;
  authorAdminId?: string;
  imageUrl: string;
  readTimeMinutes: number;
  isFeatured?: boolean;
  likes: number;
}

export type AssessmentType = 'prova' | 'simulado';

export interface AssessmentItem {
  id: string;
  type: AssessmentType;
  title: string;
  subject: string;
  gradeClass: string;
  date: string;
  time: string;
  room: string;
  topics: string[];
  tips: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  targetAudience: string;
  category: 'Cultura' | 'Esporte' | 'Ciência' | 'Comunidade' | 'Acadêmico';
  imageUrl?: string;
}

export interface StarStudent {
  id: string;
  name: string;
  gradeClass: string;
  examScore: string;
  examSubject: string;
  reason: string;
  category: 'Administração' | 'Des. de Sistemas' | 'Guia de Turismo' | 'Marketing Digital' | 'Geral';
  avatarBg: string;
  initials: string;
  rankingPosition?: string;
}

export interface DailyMenu {
  dayOfWeek: string;
  dateFormatted: string;
  mainDish: string;
  sideDish: string;
  salad: string;
  dessert?: string;
  nutritionalHighlights: string;
  isSpecial?: boolean;
}

export interface GremioAction {
  id: string;
  title: string;
  description: string;
  category: 'Cultura' | 'Esporte' | 'Projetos' | 'Representatividade' | 'Melhorias';
  status: 'Em andamento' | 'Concluído' | 'Próximo';
  date: string;
  leader: string;
}

export interface GremioPoll {
  id: string;
  question: string;
  description: string;
  isActive: boolean;
  options: Record<string, number>;
}

export type FeedbackCategory = 'feedback' | 'sugestao' | 'dica_estudo' | 'macete';

export interface FeedbackSubmission {
  id: string;
  authorName: string;
  gradeClass: string;
  category: FeedbackCategory;
  subject: string;
  message: string;
  createdAt: string;
  likes: number;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  role: string;
}

export interface Administrator {
  id: string;
  name: string;
  role: string;
  team: 'Grupo de Desenvolvimento' | 'Grêmio Estudantil' | 'Direção do CETI' | 'Desenvolvimento de Sistemas' | 'Grêmio Estudantil Cecília Mendes' | 'Coordenação Pedagógica';
  gradeClass: string;
  email?: string;
  phone?: string;
  avatarBg?: string;
  registeredAt: string;
}

export interface PortalSettings {
  schoolName: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  morningShift: string;
  afternoonShift: string;
  officeHours: string;
  libraryHours: string;
  gremioName: string;
  gremioBoard: string;
  gremioQuote: string;
}
