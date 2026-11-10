/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StarStudent } from '../types';
import { Award, Trophy, Medal, Sparkles, Star, CheckCircle2, TrendingUp, Filter, Heart, ThumbsUp } from 'lucide-react';

interface StarStudentsSectionProps {
  students: StarStudent[];
}

/**
 * Componente: Alunos Destaque por Notas nas Provas da Escola
 * Reconhecimento oficial dos estudantes selecionados com base no melhor desempenho
 * e nas maiores notas obtidas nas avaliações bimestrais, simulados e provas práticas.
 */
export const StarStudentsSection: React.FC<StarStudentsSectionProps> = ({ students }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [cheers, setCheers] = useState<Record<string, number>>({});
  const [userCheered, setUserCheered] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'todos', label: 'Todas as Turmas' },
    { id: 'Administração', label: '1ª Série Adm' },
    { id: 'Des. de Sistemas', label: 'Des. de Sistemas (1ª & 2ª)' },
    { id: 'Guia de Turismo', label: 'Guia de Turismo (2ª & 3ª)' },
    { id: 'Marketing Digital', label: '3ª Série Marketing Digital' },
  ];

  const filteredStudents = selectedCategory === 'todos'
    ? students
    : students.filter((s) => s.category === selectedCategory);

  const handleCheer = (studentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasCheered = userCheered[studentId];
    setUserCheered((prev) => ({ ...prev, [studentId]: !hasCheered }));
    setCheers((prev) => ({
      ...prev,
      [studentId]: (prev[studentId] || 25) + (hasCheered ? -1 : 1),
    }));
  };

  const getCategoryColor = (category: StarStudent['category']) => {
    switch (category) {
      case 'Administração':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      case 'Des. de Sistemas':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800';
      case 'Guia de Turismo':
        return 'bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-300 border border-teal-200 dark:border-teal-800';
      case 'Marketing Digital':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <section 
      id="alunos-destaque" 
      aria-labelledby="heading-alunos-destaque" 
      className="scroll-mt-24"
    >
      {/* Cabeçalho do Mural de Honra */}
      <div className="mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full bg-amber-600 dark:bg-amber-400" />
            Mural de Honra & Excelência
          </span>
          <h2 id="heading-alunos-destaque" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center">
            <span className="editorial-bar bg-amber-600 dark:bg-amber-400" />
            Alunos Destaque por Notas nas Provas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Estudantes com as maiores pontuações nas avaliações bimestrais e simulados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Critério: Provas Oficiais</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>2º Bimestre / 2026</span>
          </div>
        </div>
      </div>

      {/* Filtros por Área do Conhecimento */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mr-1 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`btn-filter-star-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-slate-900 dark:bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid com Cards dos Alunos Destaque por Notas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredStudents.map((student) => {
            const currentCheers = cheers[student.id] || 28;
            const hasCheered = userCheered[student.id];

            return (
              <div
                key={student.id}
                id={`card-aluno-${student.id}`}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header do Card com Avatar, Nome e Turma */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${student.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0`}>
                      {student.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getCategoryColor(student.category)}`}>
                          {student.category}
                        </span>
                        {student.rankingPosition && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 rounded border border-amber-200 dark:border-amber-800">
                            {student.rankingPosition}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug truncate">
                        {student.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {student.gradeClass}
                      </p>
                    </div>
                  </div>

                  {/* Nota da Prova em Destaque */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-lg p-3 mb-3 text-xs text-slate-800 dark:text-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                        {student.examSubject}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-950 dark:text-white mb-1 flex items-center gap-1">
                      <Medal className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{student.examScore}</span>
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {student.reason}
                    </p>
                  </div>
                </div>

                {/* Rodapé com Validação e Botão de Parabéns */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Boletim Oficial</span>
                  </span>

                  {/* Botão interativo de Dar Parabéns */}
                  <button
                    onClick={(e) => handleCheer(student.id, e)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                      hasCheered
                        ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                    title="Dar os parabéns"
                  >
                    <span>👏 Parabéns</span>
                    <span>{currentCheers}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

