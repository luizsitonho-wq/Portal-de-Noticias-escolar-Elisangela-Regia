/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SchoolEvent } from '../types';
import { Bell, Calendar, MapPin, Users, Clock, Check, Sparkles } from 'lucide-react';

interface EventsSectionProps {
  events: SchoolEvent[];
}

/**
 * Componente: Próximos Eventos da Escola
 * Apresenta a agenda cultural, científica, esportiva e encontros de pais e mestres.
 */
export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [remindedEvents, setRemindedEvents] = useState<Record<string, boolean>>({});

  const toggleReminder = (eventId: string) => {
    setRemindedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const getCategoryColor = (category: SchoolEvent['category']) => {
    switch (category) {
      case 'Ciência':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Cultura':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'Esporte':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'Acadêmico':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <section 
      id="eventos-escolares" 
      aria-labelledby="heading-eventos" 
      className="scroll-mt-24"
    >
      {/* Cabeçalho da Seção */}
      <div className="mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
          <span className="w-2.5 h-1 rounded-full bg-emerald-700 dark:bg-emerald-400" />
          Agenda Cultural & Comunitária
        </span>
        <h2 id="heading-eventos" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center">
          <span className="editorial-bar bg-emerald-800 dark:bg-emerald-500" />
          Próximos Eventos Escolares
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Feiras científicas, gincanas, reuniões com a comunidade e atividades culturais.
        </p>
      </div>

      {/* Grid de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {events.map((evt) => {
          const isReminded = remindedEvents[evt.id];

          return (
            <article
              key={evt.id}
              id={`card-evento-${evt.id}`}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Imagem do Evento */}
                {evt.imageUrl && (
                  <figure className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-xs ${getCategoryColor(evt.category)}`}>
                        {evt.category}
                      </span>
                    </div>
                  </figure>
                )}

                <div className="p-4 sm:p-5">
                  {/* Título do Evento */}
                  <h3 className="text-base font-bold text-slate-950 dark:text-white leading-snug mb-1.5 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                    {evt.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                    {evt.description}
                  </p>

                  {/* Detalhes do Evento */}
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span className="font-medium">{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1.5 border-t border-slate-200/70 dark:border-slate-700">
                      <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                      <span>Público: <strong className="text-slate-900 dark:text-white">{evt.targetAudience}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ação: Salvar Lembrete */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  id={`btn-lembrete-${evt.id}`}
                  onClick={() => toggleReminder(evt.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isReminded
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isReminded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Lembrete Salvo</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Marcar Presença / Lembrar-me</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

