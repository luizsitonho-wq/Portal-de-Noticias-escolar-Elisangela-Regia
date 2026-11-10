/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NewsItem,
  AssessmentItem,
  SchoolEvent,
  StarStudent,
  DailyMenu,
  GremioAction,
  FeedbackSubmission,
  Quote,
} from '../types';

// ==========================================
// NOTÍCIA DE DESTAQUE PRINCIPAL
// ==========================================
export const featuredNewsData: NewsItem = {
  id: 'destaque-1',
  title: 'Estudantes do Portal Elisângela Régia Batem Recorde de Notas nas Provas Integradas e Conquistam Premiações',
  summary:
    'Com médias históricas nas avaliações bimestrais e simulados, a escola celebra o rendimento dos alunos e o lançamento do novo portal de comunicação oficial.',
  content: `Com imenso orgulho, a direção da escola, em parceria com o Grêmio Estudantil e os estudantes, anuncia os resultados excepcionais das avaliações do bimestre no Portal de Notícias Escolar Elisângela Régia.
  
Além dos recordes de notas 10.0 nas disciplinas da base comum e técnica, nossos estudantes conquistaram medalhas de destaque estadual em olimpíadas do conhecimento.

O novo portal escolar passa a ser o canal central para conferir o calendário de provas, alunos destaques por notas nas provas, cardápio da merenda escolar, avisos e eventos.

"Ver nossos estudantes brilhando nas provas e aplicando a dedicação diária para informar toda a comunidade é a maior vitória da nossa escola", celebrou o Coordenador Pedagógico.

Acompanhe as próximas atualizações, o ranking das maiores notas por turma e os calendários de simulados aqui no portal!`,
  category: 'geral',
  tag: 'DESTAQUE ACADÊMICO',
  date: '20 de Agosto de 2026',
  author: 'Equipe Editorial Elisângela Régia',
  imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  readTimeMinutes: 4,
  isFeatured: true,
  likes: 168,
};

// ==========================================
// BANCO DE FRASES DO DIA (INSPIRADORAS)
// ==========================================
export const quotesList: Quote[] = [
  {
    id: 'q1',
    text: 'A educação não transforma o mundo. A educação muda as pessoas. As pessoas transformam o mundo.',
    author: 'Paulo Freire',
    role: 'Patrono da Educação Brasileira',
  },
  {
    id: 'q2',
    text: 'Aprender é a única coisa de que a mente nunca se cansa, nunca tem medo e nunca se arrepende.',
    author: 'Leonardo da Vinci',
    role: 'Cientista e Humanista',
  },
  {
    id: 'q3',
    text: 'O conhecimento é o único bem que cresce quando é compartilhado entre colegas.',
    author: 'Cecília Meireles',
    role: 'Escritora, Poetisa e Educadora',
  },
  {
    id: 'q4',
    text: 'A dedicação e o estudo diário são as chaves mestras para alcançar as melhores notas e o futuro dos seus sonhos.',
    author: 'Equipe Pedagógica',
    role: 'Portal de Notícias Escolar Elisângela Régia',
  },
  {
    id: 'q5',
    text: 'A união dos estudantes transforma a escola em um espaço vivo de aprendizado, tecnologia e cidadania.',
    author: 'Grêmio Estudantil Cecília Mendes',
    role: 'Gestão Estudantil',
  },
];

// ==========================================
// DIÁRIO DA ESCOLA (NOTÍCIAS GERAIS E PERIÓDICAS)
// ==========================================
export const newsList: NewsItem[] = [
  {
    id: 'news-1',
    title: '1ª Série de Desenvolvimento de Sistemas Lança Portal Informativo da Escola',
    summary: 'Projeto prático da disciplina de Programação Web em conjunto com o Grêmio Estudantil traz inovação e transparência aos alunos.',
    content: 'Os estudantes da 1ª Série do Curso Técnico em Desenvolvimento de Sistemas do Portal de Notícias Escolar Elisângela Régia colocaram em prática os conhecimentos de programação para desenvolver o portal oficial de notícias da escola. Em cooperação com a Diretoria de Imprensa do Grêmio Estudantil Cecília Mendes, o site oferece notícias em tempo real, mural de notas, provas e sugestões.',
    category: 'diario',
    tag: 'Desenvolvimento de Sistemas',
    date: '20 de Agosto de 2026',
    author: '1ª Série Técnico em TI & Imprensa do Grêmio',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    likes: 195,
  },
  {
    id: 'news-2',
    title: 'Inscrições Abertas para a Feira de Ciências e Tecnologia do CETI 2026',
    summary: 'Grupos podem submeter projetos até o dia 28. Haverá premiação para as melhores soluções em tecnologia e sustentabilidade.',
    content: 'A Feira de Ciências e Tecnologia deste ano terá como tema "Inovação Tecnológica e Soluções para a Comunidade". Todos os alunos do Ensino Médio Integrado e Técnico estão convidados a montar seus grupos. Os laboratórios de informática estarão disponíveis no contraturno.',
    category: 'semanal',
    tag: 'Feira de Ciências',
    date: '19 de Agosto de 2026',
    author: 'Coordenação do Curso Técnico',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    likes: 89,
  },
  {
    id: 'news-3',
    title: 'Torneio Interclasses de Futsal e Vôlei Organizado pelo Grêmio Cecília Mendes',
    summary: 'As tabelas de jogos da primeira fase já foram sorteadas pelo Grêmio e a coordenação de Educação Física.',
    content: 'A quadra poliesportiva coberta será o palco dos confrontos mais aguardados do semestre! A cerimônia de abertura terá desfile das turmas e apresentação cultural. Os jogos acontecerão nos intervalos estendidos e nos finais de tarde.',
    category: 'semanal',
    tag: 'Esportes & Grêmio',
    date: '18 de Agosto de 2026',
    author: 'Grêmio Cecília Mendes & Prof. de Ed. Física',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 3,
    likes: 118,
  },
  {
    id: 'news-4',
    title: 'Plantão de Dúvidas de Matemática e Algoritmos Aos Sábados',
    summary: 'Aulas de aprofundamento gratuitas para reforço de conteúdo pré-provas bimestrais e simulados.',
    content: 'Aos sábados, das 8h às 11h30, professores e monitores estarão nos laboratórios e salas de aula tirando dúvidas pontuais, corrigindo listas de exercícios e revisando a matéria cobrada nas provas.',
    category: 'mensal',
    tag: 'Plantão de Estudos',
    date: '15 de Agosto de 2026',
    author: 'Coordenação Pedagógica CETI',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    likes: 95,
  },
  {
    id: 'news-5',
    title: 'Biblioteca e Espaço Maker Recebem Novos Equipamentos e Acervo Técnico',
    summary: 'Mais de 150 novos livros de literatura brasileira, lógica de programação e preparação para o ENEM.',
    content: 'O acervo escolar foi enriquecido com clássicos da literatura brasileira e exemplares de engenharia de software e banco de dados. Os empréstimos estão liberados na recepção da biblioteca.',
    category: 'geral',
    tag: 'Biblioteca & Inovação',
    date: '14 de Agosto de 2026',
    author: 'Equipe da Biblioteca CETI',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 2,
    likes: 64,
  },
  {
    id: 'news-6',
    title: 'Campanha de Solidariedade do Grêmio Arrecada Alimentos e Livros',
    summary: 'Mobilização dos alunos do CETI beneficiará projetos sociais e incentivo à leitura na comunidade.',
    content: 'Agradecemos a todas as turmas pelo engajamento. As turmas da 1ª Série de Administração, 1ª e 2ª Séries de Desenvolvimento de Sistemas, 2ª e 3ª Séries de Guia de Turismo e 3ª Série de Marketing Digital lideraram o volume de arrecadações.',
    category: 'diario',
    tag: 'Solidariedade',
    date: '12 de Agosto de 2026',
    author: 'Diretoria Social Grêmio Cecília Mendes',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 2,
    likes: 130,
  },
];

// ==========================================
// PRÓXIMAS PROVAS E SIMULADOS
// ==========================================
export const assessmentsList: AssessmentItem[] = [
  {
    id: 'asm-1',
    type: 'prova',
    title: 'Avaliação Bimestral de Gestão de Mídias e Campanhas Digitais',
    subject: 'Marketing Digital',
    gradeClass: '3ª Série - Marketing Digital',
    date: '2026-08-25',
    time: '07:30 - 09:10',
    room: 'Laboratório de Informática 02',
    topics: ['Métricas de Conversão (CAC, ROI e LTV)', 'Tráfego Pago e Google Ads', 'Estratégias de Copywriting e Inbound Marketing'],
    tips: 'Revise os estudos de caso das campanhas digitais desenvolvidas no bimestre.',
  },
  {
    id: 'asm-2',
    type: 'prova',
    title: 'Avaliação Prática de Lógica de Programação e Algoritmos',
    subject: 'Técnico em Des. de Sistemas',
    gradeClass: '1ª Série - Des. de Sistemas',
    date: '2026-08-26',
    time: '09:30 - 11:10',
    room: 'Laboratório de Informática 01',
    topics: ['Estruturas Condicionais (if/else)', 'Laços de Repetição (for/while)', 'Vetores e Matrizes', 'Funções em JavaScript/TypeScript'],
    tips: 'Revise os exercícios práticos do laboratório. Teste a lógica de fluxo no papel antes de codificar.',
  },
  {
    id: 'asm-3',
    type: 'prova',
    title: 'Prova de Teoria e Técnicas de Guiamento Regional',
    subject: 'Guia de Turismo',
    gradeClass: '2ª Série - Guia de Turismo',
    date: '2026-08-27',
    time: '08:00 - 09:40',
    room: 'Sala 06 (Bloco B)',
    topics: ['Patrimônio Histórico e Cultural do Piauí', 'Legislação e Ética do Guia de Turismo', 'Comunicação e Oratória com Grupos'],
    tips: 'Atenção aos roteiros históricos dos monumentos estaduais e termos técnicos de guiamento.',
  },
  {
    id: 'asm-4',
    type: 'prova',
    title: 'Avaliação de Gestão Financeira e Teoria Geral da Administração',
    subject: 'Administração',
    gradeClass: '1ª Série - Administração',
    date: '2026-08-28',
    time: '10:00 - 11:40',
    room: 'Sala 04 (Bloco A)',
    topics: ['Funções Administrativas (Planejar, Organizar, Dirigir e Controlar)', 'Fluxo de Caixa e Custos Fixos/Variáveis', 'Empreendedorismo e Organogramas'],
    tips: 'Leve calculadora básica simples. Revise os cálculos de ponto de equilíbrio e margem.',
  },
  {
    id: 'asm-5',
    type: 'prova',
    title: 'Prova Prática de Banco de Dados e Engenharia de Software',
    subject: 'Técnico em Des. de Sistemas',
    gradeClass: '2ª Série - Des. de Sistemas',
    date: '2026-08-29',
    time: '07:30 - 09:10',
    room: 'Laboratório de Informática 01',
    topics: ['Modelagem Entidade-Relacionamento (DER)', 'Consultas SQL (SELECT, JOIN, GROUP BY)', 'APIs RESTful e Arquitetura MVC'],
    tips: 'Revise a normalização de tabelas e teste as consultas SQL preparadas na aula anterior.',
  },
  {
    id: 'asm-6',
    type: 'prova',
    title: 'Avaliação de Ecoturismo, Geografia e Roteiros Nacionais',
    subject: 'Guia de Turismo',
    gradeClass: '3ª Série - Guia de Turismo',
    date: '2026-08-29',
    time: '09:30 - 11:10',
    room: 'Sala 07 (Bloco B)',
    topics: ['Planejamento de Roteiros Nacionais e Internacionais', 'Normas de Segurança em Turismo de Aventura', 'Turismo Sustentável e Parques Nacionais'],
    tips: 'Foco no estudo do Parque Nacional da Serra da Capivara e Sete Cidades.',
  },
  {
    id: 'asm-7',
    type: 'simulado',
    title: '1º Simulado Geral Tipo ENEM CETI 2026 (Todas as Turmas)',
    subject: 'Linguagens, Códigos, Humanas e Redação',
    gradeClass: 'Todas as Turmas do CETI',
    date: '2026-08-30',
    time: '13:00 - 18:30',
    room: 'Salas dos Blocos A, B e C',
    topics: ['45 Questões de Linguagens e Língua Estrangeira', '45 Questões de Humanas (História, Geografia, Filosofia, Sociologia)', 'Proposta de Redação Inédita'],
    tips: 'Portões fecham rigorosamente às 12:45. Leve caneta esferográfica de corpo transparente com tinta preta.',
  },
];

// ==========================================
// PRÓXIMOS EVENTOS ESCOLARES
// ==========================================
export const schoolEventsList: SchoolEvent[] = [
  {
    id: 'evt-1',
    title: 'Feira de Ciências & Inovação Tecnológica do CETI',
    description: 'Apresentação de projetos desenvolvidos pelos estudantes das turmas regulares e do Curso Técnico em Desenvolvimento de Sistemas.',
    date: '04 de Setembro de 2026',
    time: '08:30 às 16:30',
    location: 'Pátio Central e Laboratórios do CETI',
    targetAudience: 'Toda a comunidade escolar e convidados',
    category: 'Ciência',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-2',
    title: 'Sarau Cultural de Poesia e Música Cecília Meireles',
    description: 'Apresentações artísticas, recital de poesias autorais dos estudantes e intervenções culturais lideradas pelo Grêmio.',
    date: '11 de Setembro de 2026',
    time: '18:00 às 20:30',
    location: 'Auditório Principal do CETI',
    targetAudience: 'Estudantes, professores e famílias',
    category: 'Cultura',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-3',
    title: 'Reunião de Pais e Mestres - Entrega de Boletins e Notas',
    description: 'Divulgação dos relatórios de rendimento das provas bimestrais e conversa com os professores das disciplinas.',
    date: '18 de Setembro de 2026',
    time: '07:30 às 12:00',
    location: 'Salas de Aula por Turma',
    targetAudience: 'Pais e Responsáveis Legais',
    category: 'Acadêmico',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-4',
    title: 'Feira das Profissões e Tecnologia da Informação',
    description: 'Palestras com profissionais de Engenharia de Software, Medicina, Direito e workshops com ex-alunos do CETI.',
    date: '25 de Setembro de 2026',
    time: '08:00 às 13:00',
    location: 'Bloco Multimídia',
    targetAudience: 'Todas as séries do Ensino Médio',
    category: 'Comunidade',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
];

// ==========================================
// ALUNOS DESTAQUE DE CADA SALA (SELECIONADOS POR NOTAS NAS PROVAS)
// ==========================================
export const starStudentsList: StarStudent[] = [
  {
    id: 'star-1',
    name: 'Larissa Albuquerque Santos',
    gradeClass: '1ª Série - Administração',
    examScore: 'Média 9.95 nas Provas Bimestrais',
    examSubject: 'Teoria Geral da Administração & Finanças',
    category: 'Administração',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Gabaritou a prova de Planejamento Empresarial e obteve nota 10.0 na avaliação de Fluxo de Caixa e Custos.',
    avatarBg: 'bg-blue-600',
    initials: 'LA',
  },
  {
    id: 'star-2',
    name: 'Guilherme Albuquerque',
    gradeClass: '1ª Série - Desenvolvimento de Sistemas',
    examScore: 'Nota 10.0 em Lógica de Programação',
    examSubject: 'Programação Web & Algoritmos',
    category: 'Des. de Sistemas',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Obteve pontuação máxima na prova prática de estruturas de dados e desenvolveu algoritmos sem falhas na avaliação técnica.',
    avatarBg: 'bg-purple-600',
    initials: 'GA',
  },
  {
    id: 'star-3',
    name: 'Lucas Gabriel Silveira',
    gradeClass: '2ª Série - Desenvolvimento de Sistemas',
    examScore: 'Média 9.9 nas Provas de Banco de Dados',
    examSubject: 'Engenharia de Software & Banco de Dados SQL',
    category: 'Des. de Sistemas',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Gabaritou a modelagem de entidades e relacionamentos (DER) e construiu consultas relacionais complexas sem erros.',
    avatarBg: 'bg-emerald-600',
    initials: 'LG',
  },
  {
    id: 'star-4',
    name: 'Camila Fernandes Lima',
    gradeClass: '2ª Série - Guia de Turismo',
    examScore: 'Média 9.85 em Geografia & Patrimônio',
    examSubject: 'Técnicas de Guiamento & Patrimônio Cultural',
    category: 'Guia de Turismo',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Maior nota da turma na prova sobre circuitos turísticos do Piauí e apresentação impecável de roteiro cultural.',
    avatarBg: 'bg-teal-600',
    initials: 'CF',
  },
  {
    id: 'star-5',
    name: 'Beatriz Vasconcelos',
    gradeClass: '3ª Série - Marketing Digital',
    examScore: 'Nota 9.9 em Gestão de Campanhas & 980 no Simulado ENEM',
    examSubject: 'Métricas Digitais, Copywriting & Redação',
    category: 'Marketing Digital',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Maior nota da escola na prova dissertativa com nota 980 no simulado ENEM e 10.0 na prova de Inbound Marketing.',
    avatarBg: 'bg-amber-600',
    initials: 'BV',
  },
  {
    id: 'star-6',
    name: 'Mateus Rocha Neves',
    gradeClass: '3ª Série - Guia de Turismo',
    examScore: 'Média 9.85 nas Provas Integradas',
    examSubject: 'Ecoturismo, Legislação & Roteiros Nacionais',
    category: 'Guia de Turismo',
    rankingPosition: '1º Lugar da Turma',
    reason: 'Destaque com pontuação máxima na avaliação prática de condução turística e estudos de sustentabilidade ambiental.',
    avatarBg: 'bg-rose-600',
    initials: 'MR',
  },
];

// ==========================================
// COMIDA DO DIA / CARDÁPIO ESCOLAR
// ==========================================
export const weeklyMenuData: DailyMenu[] = [
  {
    dayOfWeek: 'Segunda-feira',
    dateFormatted: 'Hoje (20/08)',
    mainDish: 'Arroz Integral com Frango Desfiado ao Molho de Tomate Fresco e Ervas',
    sideDish: 'Feijão Carioca temperado com louro e alho',
    salad: 'Mix de Alface Crespa, Tomate Cereja e Cenoura Ralada',
    nutritionalHighlights: 'Rico em Vitamina C, Fibras Alimentares e Proteínas de alto valor biológico.',
  },
  {
    dayOfWeek: 'Terça-feira',
    dateFormatted: 'Amanhã (21/08)',
    mainDish: 'Carne Moída Refogada com Batatas e Cenouras em Cubos',
    sideDish: 'Arroz Branco e Feijão Preto Selecionado',
    salad: 'Salada de Beterraba Cozida com Pepino e Rúcula',
    nutritionalHighlights: 'Fonte de Ferro, Potássio e Vitaminas do Complexo B.',
  },
  {
    dayOfWeek: 'Quarta-feira',
    dateFormatted: 'Quarta (22/08)',
    mainDish: 'Filé de Peixe Grelhado com Azeite e Ervas',
    sideDish: 'Purê Cremoso de Mandioquinha e Arroz Colorido',
    salad: 'Salada Crocante de Repolho Roxo, Maçã e Espinafre',
    nutritionalHighlights: 'Alto teor de Ômega-3, Cálcio e Minerais essenciais.',
  },
  {
    dayOfWeek: 'Quinta-feira',
    dateFormatted: 'Quinta (23/08)',
    mainDish: 'Iscas de Carne ao Molho Rústico com Ervilhas',
    sideDish: 'Arroz Soltinho e Feijão Carioca',
    salad: 'Salada de Vagem, Tomate e Couve-Flor no Vapor',
    nutritionalHighlights: 'Excelente equilíbrio de Carboidratos Complexos e Antioxidantes.',
  },
  {
    dayOfWeek: 'Sexta-feira',
    dateFormatted: 'Sexta (24/08)',
    mainDish: 'Macarronada Especial com Almôndegas e Molho de Manjericão',
    sideDish: 'Arroz Branco e Feijão Selecionado',
    salad: 'Mix de Folhas Verdes com Tomate e Milho Doce',
    nutritionalHighlights: 'Energia saudável para o encerramento da semana letiva.',
  },
];

// ==========================================
// AÇÕES DO GRÊMIO ESTUDANTIL CECÍLIA MENDES
// Identidade: Roxo, Lilás, Dourado/Amarelo
// ==========================================
export const gremioActionsList: GremioAction[] = [
  {
    id: 'gremio-1',
    title: 'Lançamento do Portal de Notícias e Transparência Estudantil',
    description: 'Desenvolvido pela Diretoria de Imprensa do Grêmio Cecília Mendes em conjunto com os estudantes da 1ª Série do Curso Técnico em Desenvolvimento de Sistemas.',
    category: 'Projetos',
    status: 'Concluído',
    date: '20 de Agosto de 2026',
    leader: 'Diretoria de Imprensa & 1ª Série Des. de Sistemas',
  },
  {
    id: 'gremio-2',
    title: 'Instalação de Novos Bebedouros Industriais nos Blocos A e B',
    description: 'Após diálogo construtivo com a direção do CETI, foram instalados 4 novos filtros industriais com saída para garrafinhas.',
    category: 'Melhorias',
    status: 'Concluído',
    date: '10 de Agosto de 2026',
    leader: 'Gestão Estudantil - Grêmio Cecília Mendes',
  },
  {
    id: 'gremio-3',
    title: 'Cine-Debate e Clube de Leitura Cecília Meireles',
    description: 'Sessões quinzenais seguidas de debates sobre cidadania, tecnologia e literatura no auditório às quintas-feiras.',
    category: 'Cultura',
    status: 'Em andamento',
    date: 'Em andamento (Quinzenal)',
    leader: 'Diretoria Cultural do Grêmio',
  },
  {
    id: 'gremio-4',
    title: 'Organização do Campeonato Interclasses CETI 2026',
    description: 'Inscrições das equipes vinculadas à doação solidária de alimentos e materiais para a comunidade.',
    category: 'Esporte',
    status: 'Em andamento',
    date: '20 a 29 de Agosto de 2026',
    leader: 'Diretoria de Esportes e Lazer',
  },
];

// ==========================================
// FEEDBACKS INICIAIS E DICAS DE ESTUDO
// ==========================================
export const initialFeedbacks: FeedbackSubmission[] = [
  {
    id: 'fb-1',
    authorName: 'Gabriel Nogueira (1ª Série DS)',
    gradeClass: '1ª Série - Des. de Sistemas',
    category: 'macete',
    subject: 'Macete para Memorizar Fórmulas de Cinemática (MUV) nas Provas',
    message: 'Para lembrar a fórmula da velocidade "V = Vo + a.t", use a frase: "Vi Você a Toa"! Para a equação de Torricelli "V² = Vo² + 2.a.Δs", memorize: "Vovô e Vovó mais 2 Amigos num Triângulo Amoroso". Me ajudou a tirar 9.8 na prova de Física!',
    createdAt: '19/08/2026 às 14:20',
    likes: 52,
  },
  {
    id: 'fb-2',
    authorName: 'Mariana Duarte',
    gradeClass: '2ª Série A',
    category: 'dica_estudo',
    subject: 'Método Pomodoro de 25/5 para Tirar Notas Altas nas Avaliações',
    message: 'Para quem tem dificuldade de sentar e estudar para as provas: cronômetro em 25 minutos de estudo focado (celular no modo avião) e 5 minutos de descanso. Mudou minhas médias no CETI!',
    createdAt: '18/08/2026 às 16:45',
    likes: 41,
  },
  {
    id: 'fb-3',
    authorName: 'João Pedro Ramos',
    gradeClass: '3ª Série B',
    category: 'sugestao',
    subject: 'Parabéns pelo novo portal criado pelo Grêmio e turma de TI!',
    message: 'O site ficou excelente! Ficou muito fácil consultar as datas de provas e o cardápio da merenda. Parabéns à Diretoria de Imprensa do Grêmio Cecília Mendes e aos colegas de Desenvolvimento de Sistemas!',
    createdAt: '20/08/2026 às 08:15',
    likes: 36,
  },
];

// ==========================================
// ADMINISTRADORES E GESTORES CADASTRADOS
// ==========================================
export const initialAdministrators: import('../types').Administrator[] = [
  {
    id: 'admin-1',
    name: 'Direção do CETI',
    role: 'Direção & Supervisão Geral',
    team: 'Direção do CETI',
    gradeClass: 'Direção Escolar',
    email: 'direcao@elisangela-regia.edu.pi.gov.br',
    avatarBg: 'from-purple-700 to-indigo-900',
    registeredAt: '01/08/2026',
  },
  {
    id: 'admin-2',
    name: 'Grupo de Desenvolvimento',
    role: 'Desenvolvimento e Manutenção Técnica',
    team: 'Grupo de Desenvolvimento',
    gradeClass: '1ª Série - Des. de Sistemas',
    email: 'ds.elisangelaregia@aluno.edu.pi.gov.br',
    avatarBg: 'from-purple-600 to-indigo-700',
    registeredAt: '01/08/2026',
  },
  {
    id: 'admin-3',
    name: 'Grêmio Estudantil',
    role: 'Diretoria de Imprensa & Representação',
    team: 'Grêmio Estudantil',
    gradeClass: 'Diretoria do Grêmio',
    email: 'gremio.elisangela@aluno.edu.pi.gov.br',
    avatarBg: 'from-emerald-600 to-teal-700',
    registeredAt: '05/08/2026',
  },
];
