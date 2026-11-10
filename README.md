# Portal de Notícias Escolar Elisângela Régia

Portal institucional oficial desenvolvido pela Turma de Desenvolvimento de Sistemas em colaboração com a Coordenação Pedagógica e a Diretoria de Imprensa do Grêmio Estudantil Cecília Mendes.

---

## 🔒 Segurança e Variáveis de Ambiente

Todas as senhas fixas e configurações confidenciais foram desvinculadas do código-fonte e migradas para variáveis de ambiente com suporte nativo do Vite.

### 1. Configurando as Variáveis de Ambiente

Antes de executar ou fazer o deploy da aplicação, configure o arquivo `.env`:

```bash
# Copie o modelo oficial de variáveis
cp .env.example .env
```

Abra o arquivo `.env` e configure os valores:

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_ADMIN_PASSWORD` | **Sim** | Senha mestra para login no Painel Administrativo. |
| `GEMINI_API_KEY` | Não | Chave de API do Google Gemini (se utilizar recursos de IA). |
| `APP_URL` | Não | URL canônica de publicação do portal. |

> ⚠️ **Atenção**: O arquivo `.env` está listado no `.gitignore` e **nunca** deve ser incluído em repositórios públicos.

---

## 🚀 Instalação e Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento (Porta 3000)
npm run dev
```

Acesse no navegador: `http://localhost:3000`

---

## 📦 Como Gerar o Pacote ZIP para Deploy

O projeto está 100% pronto e higienizado para ser empacotado em ZIP e enviado para plataformas de hospedagem (Vercel, Netlify, Cloudflare Pages, GitHub Pages ou servidor próprio).

### Opção A: Gerar Build de Produção (Arquivos Estáticos Otimizados)

```bash
# 1. Gerar os arquivos otimizados em /dist
npm run build

# 2. Compactar apenas a pasta /dist para hospedagens de arquivos estáticos
zip -r portal-elisangela-dist.zip dist/
```

### Opção B: Compactar o Código-Fonte Completo do Projeto

Ao compactar o código-fonte, ignore a pasta `node_modules` e o arquivo `.env` com senhas locais:

```bash
zip -r portal-elisangela-regia.zip . -x "node_modules/*" -x ".git/*" -x "dist/*" -x ".env"
```

### 3. Configuração de Deploy em Plataformas (Vercel, Netlify, etc.)

Ao realizar o deploy em plataformas que realizam o build automaticamente:
1. Conecte o repositório ou envie o ZIP do código-fonte.
2. Defina o comando de build como `npm run build`.
3. Defina a pasta de saída como `dist`.
4. Na aba **Environment Variables** (Variáveis de Ambiente) da sua hospedagem, adicione:
   - `VITE_ADMIN_PASSWORD`: *defina sua senha forte de administrador*
   - `APP_URL`: *a URL do seu domínio ou subdomínio final*

---

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor Vite na porta 3000.
- `npm run build`: Valida o TypeScript e compila os assets otimizados para a pasta `dist`.
- `npm run preview`: Visualiza localmente o build de produção gerado na pasta `dist`.
- `npm run lint`: Executa a verificação estática de tipos com o TypeScript (`tsc --noEmit`).
