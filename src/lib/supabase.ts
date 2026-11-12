import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mqbcnzckumozkgqdlbyl.supabase.co';
const supabaseKey = 'sb_publishable_d9cRsKAozwhtzTcrk8O-0w_U2HMgd9T';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Carrega uma seção do banco de dados
export async function carregarDadoNuvem<T>(chave: string): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from('portal_storage')
      .select('dados')
      .eq('chave', chave)
      .maybeSingle();

    if (error || !data) return null;
    return data.dados as T;
  } catch {
    return null;
  }
}

// Salva uma seção no banco de dados
export async function salvarDadoNuvem<T>(chave: string, dados: T): Promise<void> {
  try {
    await supabase
      .from('portal_storage')
      .upsert(
        { chave, dados, updated_at: new Date().toISOString() },
        { onConflict: 'chave' }
      );
  } catch (err) {
    console.error(`Erro ao salvar ${chave} no Supabase:`, err);
  }
}
