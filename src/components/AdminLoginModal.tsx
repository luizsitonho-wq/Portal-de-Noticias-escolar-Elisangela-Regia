/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  AlertCircle, 
  Sparkles, 
  GraduationCap, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

/**
 * Obtém a senha de acesso ao Painel Administrativo configurada via variável de ambiente.
 * Em produção, defina VITE_ADMIN_PASSWORD no arquivo .env ou nas variáveis da sua plataforma de deploy.
 */
export const getAdminPassword = (): string => {
  const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  return typeof envPassword === 'string' ? envPassword.trim() : '';
};

export const ADMIN_PASSWORD = getAdminPassword();

/**
 * Componente: Modal de Acesso ao Painel do Administrador
 * Protegido por credencial configurada via variável de ambiente (VITE_ADMIN_PASSWORD)
 * para a Equipe Editorial, Turma de Desenvolvimento de Sistemas e Diretoria de Imprensa.
 */
export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const configuredPassword = getAdminPassword();

    // Validação da senha com delay visual de verificação de credenciais
    setTimeout(() => {
      if (!configuredPassword) {
        setIsSubmitting(false);
        setErrorMessage('Aviso: VITE_ADMIN_PASSWORD não foi configurada no arquivo .env.');
        return;
      }

      if (password === configuredPassword) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(false);
          setPassword('');
          onLoginSuccess();
        }, 800);
      } else {
        setIsSubmitting(false);
        setErrorMessage('Senha incorreta! Verifique os dígitos e tente novamente.');
      }
    }, 400);
  };

  const handleKeypadDigit = (digit: string) => {
    if (password.length < 12) {
      setPassword((prev) => prev + digit);
      setErrorMessage('');
    }
  };

  const handleKeypadClear = () => {
    setPassword('');
    setErrorMessage('');
  };

  const handleKeypadBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Box */}
        <div className="bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-800 relative">
          {/* Cabeçalho do Modal */}
          <div className="bg-slate-950 p-6 text-slate-100 border-b border-slate-800 relative overflow-hidden">
            <motion.button
              id="btn-close-admin-login"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
              aria-label="Fechar login"
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 border border-emerald-700 flex items-center justify-center text-white font-black shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800 inline-block mb-1">
                  Acesso Restrito
                </span>
                <h2 className="text-lg font-black text-white leading-tight">
                  Painel do Administrador
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Área de gestão para a <strong className="text-slate-200">Turma de Desenvolvimento de Sistemas (1ª Série)</strong> e a <strong className="text-slate-200">Diretoria de Imprensa do Grêmio Cecília Mendes</strong>.
            </p>
          </div>

          {/* Corpo do Login */}
          <div className="p-6 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="admin-password-input" 
                  className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Senha de Acesso:</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    Chave editorial do portal
                  </span>
                </label>

                <div className="relative">
                  <input
                    id="admin-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    value={password ?? ""}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Digite a senha de administrador..."
                    className={`w-full pl-10 pr-11 py-3 text-sm bg-slate-800 border rounded-2xl text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errorMessage
                        ? 'border-red-500 ring-2 ring-red-950 bg-red-950/30'
                        : 'border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    }`}
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                    title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Mensagem de Erro com Animação */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-2 p-2.5 rounded-xl bg-red-950/50 border border-red-900/60 text-red-300 text-xs flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Teclado Numérico Virtual Rápido */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-400 mb-2 text-center">
                  Teclado Numérico Rápido:
                </p>
                <div className="grid grid-cols-3 gap-1.5 max-w-[240px] mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                    <motion.button
                      type="button"
                      key={num}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleKeypadDigit(num)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 text-slate-200 font-bold text-sm rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                    >
                      {num}
                    </motion.button>
                  ))}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={handleKeypadClear}
                    className="py-2 bg-slate-800 hover:bg-red-950/60 hover:text-red-300 text-slate-300 font-bold text-xs rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                    title="Limpar campo"
                  >
                    Limpar
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleKeypadDigit('0')}
                    className="py-2 bg-slate-800 hover:bg-slate-700 hover:text-emerald-400 text-slate-200 font-bold text-sm rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                  >
                    0
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={handleKeypadBackspace}
                    className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700/60 transition-colors cursor-pointer"
                    title="Apagar dígito"
                  >
                    ←
                  </motion.button>
                </div>
              </div>

              {/* Botão de Entrar */}
              <div className="pt-3">
                <motion.button
                  id="btn-submit-admin-login"
                  type="submit"
                  disabled={isSubmitting || !password}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 text-white shadow-md transition-all cursor-pointer ${
                    isSuccess
                      ? 'bg-emerald-600'
                      : isSubmitting || !password
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-600 shadow-emerald-950/30'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-spin" />
                      <span>Acesso Autorizado! Abrindo painel...</span>
                    </>
                  ) : isSubmitting ? (
                    <span>Verificando credenciais...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Entrar no Painel Administrativo</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Dica da Equipe */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>1ª Série DS • CETI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Grêmio Cecília Mendes</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
