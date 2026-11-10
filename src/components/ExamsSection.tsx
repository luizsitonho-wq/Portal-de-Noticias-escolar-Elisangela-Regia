/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AssessmentItem, AssessmentType } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  FileText,
  Target,
  BellRing,
  Check
} from 'lucide-react';

interface ExamsSectionProps {
  assessments: AssessmentItem[];
}

/**
 * Componente: Próximas Provas e Próximos Simulados
 * Permite que alunos e responsáveis consultem o calendário de avaliações bimestrais,
 * simulados preparatórios tipo ENEM e provas de nivelamento com os tópicos cobrados.
 */
export const ExamsSection: React.FC<ExamsSectionProps> = ({ assessments }) => {
  const [activeTab, setActiveTab] = useState<'todas' | AssessmentType>('todas');
  const [selectedGrade, setSelectedGrade] = useState<string>('todos');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  // Extrair turmas únicas disponíveis
  const grades = ['todos', ...Array.from(new Set(assessments.map((a) => a.gradeClass)))];

  // Cálculo de dias restantes até a prova
  const calculateDaysLeft = (dateStr: string) => {
    const today = new Date('2026-08-20T00:00:00');
    const target = new Date(`${dateStr}T00:00:00`);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'É hoje!';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays < 0) return 'Concluída';
    return `Em ${diffDays} dias`;
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAssessments = assessments.filter((item) => {
    const matchesTab = activeTab === 'todas' || item.type === activeTab;
    const matchesGrade = selectedGrade === 'todos' || item.gradeClass === selectedGrade;
    return matchesTab && matchesGrade;
  });

  return (
    <section 
      id="provas-simulados" 
      aria-labelledby="heading-provas-simulados" 
      className="scroll-mt-24"
    >
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full bg-emerald-700 dark:bg-emerald-400" />
            Calendário & Avaliações
          </span>
          <h2 id="heading-provas-simulados" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center">
            <span className="editorial-bar bg-emerald-800 dark:bg-emerald-500" />
            Próximas Provas & Simulados
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Consulte datas, horários, salas de aplicação e conteúdos programáticos detalhados.
          </p>
        </div>

        {/* Controles: Abas e Filtro de Turma */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Seletor de Turma */}
          <div className="relative">
            <select
              id="select-grade-filter"
              value={selectedGrade ?? "all"}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer shadow-xs"
            >
              <option value="todos">Todas as Turmas</option>
              {grades
                .filter((g) => g !== 'todos')
                .map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
            </select>
          </div>

          {/* Abas */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
            <button
              id="tab-todas-avaliacoes"
              onClick={() => setActiveTab('todas')}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'todas'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              id="tab-provas-bimestrais"
              onClick={() => setActiveTab('prova')}
              className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'prova'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Provas</span>
            </button>
            <button
              id="tab-simulados-vestibulares"
              onClick={() => setActiveTab('simulado')}
              className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'simulado'
                  ? 'bg-slate-900 dark:bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Target className="w-3 h-3" />
              <span>Simulados</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Avaliações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredAssessments.map((assessment) => {
            const isSimulado = assessment.type === 'simulado';
            const countdown = calculateDaysLeft(assessment.date);
            const isUrgent = countdown === 'É hoje!' || countdown === 'Amanhã';
            const isAlertSet = reminders[assessment.id];

            return (
              <div
                key={assessment.id}
                id={`card-avaliacao-${assessment.id}`}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 transition-all shadow-xs hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between"
              >
                <div>
                  {/* Topo do Card: Tipo, Turma e Contador */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                          isSimulado
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50'
                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                        }`}
                      >
                        {isSimulado ? 'Simulado' : 'Prova Bimestral'}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {assessment.gradeClass}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isUrgent
                            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {countdown}
                      </span>

                      {/* Botão de Lembrete */}
                      <button
                        onClick={() => toggleReminder(assessment.id)}
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          isAlertSet
                            ? 'bg-emerald-800 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                        title={isAlertSet ? 'Lembrete ativo' : 'Ativar lembrete'}
                      >
                        {isAlertSet ? <Check className="w-3.5 h-3.5" /> : <BellRing className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Título e Disciplina */}
                  <h3 className="text-base font-bold text-slate-950 dark:text-white leading-snug mb-1">
                    {assessment.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{assessment.subject}</span>
                  </p>

                  {/* Informações de Local e Horário */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg text-xs text-slate-800 dark:text-slate-200 mb-4 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span className="font-semibold">
                        {new Date(`${assessment.date}T00:00:00`).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span className="font-medium">{assessment.time}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 pt-1.5 border-t border-slate-200/70 dark:border-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Sala: <strong className="text-slate-900 dark:text-white">{assessment.room}</strong></span>
                    </div>
                  </div>

                  {/* Tópicos Cobrados */}
                  <div className="mb-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
                      <span>Conteúdo Programático:</span>
                    </h4>
                    <ul className="space-y-1">
                      {assessment.topics.map((topic, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dica da Coordenação */}
                {assessment.tips && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/50 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Coordenação:</strong> {assessment.tips}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

