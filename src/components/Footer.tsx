/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  ArrowUp,
  BookOpen,
  Lock
} from 'lucide-react';
import { PortalSettings } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  settings: PortalSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin, settings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="rodape-portal" className="bg-slate-950 text-slate-400 pt-10 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Coluna 1: Sobre a Escola */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-emerald-800 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight font-editorial">
                  {settings.schoolName}
                </h3>
                <p className="text-[11px] text-slate-400">{settings.description}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jornalismo escolar, calendário de avaliações, iniciativas discentes e prestação de serviços para toda a comunidade.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Edição Digital 2026</span>
              </span>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos de Navegação */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Seções do Portal</span>
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('noticias-diario')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Notícias Gerais
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('provas-simulados')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Avaliações & Simulados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('eventos-escolares')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Agenda de Eventos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('alunos-destaque')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Alunos em Destaque
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cardapio-dia')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Cardápio da Merenda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gremio-estudantil')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Grêmio Estudantil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('feedback-sugestoes')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Mural & Sugestões
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Horários e Atendimento */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Expediente Escolar</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Turno Matutino:</span>
                <span className="text-slate-200 font-medium">{settings.morningShift}</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Turno Vespertino:</span>
                <span className="text-slate-200 font-medium">{settings.afternoonShift}</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1">
                <span>Secretaria:</span>
                <span className="text-slate-200 font-medium">{settings.officeHours}</span>
              </li>
              <li className="flex justify-between">
                <span>Biblioteca & Informática:</span>
                <span className="text-slate-200 font-medium">{settings.libraryHours}</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato e Endereço */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Localização & Contato</span>
            </h4>
            <address className="not-italic space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span className="truncate">{settings.email}</span>
              </div>
            </address>

            <button
              onClick={scrollToTop}
              className="mt-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>

        {/* Faixa de Expediente Escolar */}
        <div className="py-3 px-5 rounded-lg bg-slate-900 border border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <p className="text-slate-300">
              <strong className="text-white">Expediente:</strong> Coordenação Pedagógica, Grêmio Estudantil e Redação Discente.
            </p>
          </div>
          <p className="text-slate-400 text-xs">
            Atualizações diárias • Comunidade Elisângela Régia
          </p>
        </div>

        {/* Faixa Inferior de Direitos e Acesso Restrito Discreto */}
        <div className="pt-3 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Portal de Notícias Escolar Elisângela Régia • Todos os direitos reservados</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <p className="text-[11px] text-slate-500">
              Desenvolvido pela turma de Desenvolvimento de Sistemas
            </p>
          </div>

          {onOpenAdmin && (
            <button
              id="btn-footer-admin-discreet"
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-400 transition-colors cursor-pointer select-none py-1 px-2 rounded hover:bg-slate-900 group"
              title="Acesso restrito para administradores e equipe editorial"
              aria-label="Acesso restrito ao painel administrativo"
            >
              <Lock className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-colors" />
              <span className="group-hover:underline">Acesso Restrito</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
