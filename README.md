# Rick and Morty Character Explorer

Uma aplicação moderna para explorar personagens do universo Rick and Morty, construída com Next.js, TypeScript, GraphQL e Clean Architecture.

## 🚀 Tecnologias

- **Next.js 16** com App Router
- **React 19** com TypeScript
- **GraphQL** com Apollo Client
- **TailwindCSS** - Estilização
- **Shadcn/ui** - Componentes
- **Jest** - Testes unitários
- **Clean Architecture** - Arquitetura limpa

## 📁 Estrutura do Projeto

```
src/
├── domain/              # Camada de domínio
│   ├── entities/       # Entidades de negócio
│   └── repositories/   # Interfaces de repositórios
├── data/               # Camada de dados
│   ├── graphql/       # Queries GraphQL
│   └── repositories/  # Implementações de repositórios
├── presentation/       # Camada de apresentação
│   ├── components/    # Componentes React
│   ├── hooks/        # Custom hooks
└── components/ui/     # Componentes UI (shadcn)
app/                   # Páginas Next.js (App Router)
├── page.tsx          # Página principal (listagem)
└── character/[id]/   # Página de detalhes
```

## ✨ Funcionalidades

- ✅ Listagem de personagens com paginação infinita
- ✅ Filtros avançados (nome, status, espécie, gênero)
- ✅ Visualização detalhada de personagens
- ✅ Design responsivo com tema sci-fi
- ✅ Animações e transições suaves
- ✅ Estados de loading e erro
- ✅ Clean Architecture
- ✅ Testes unitários

## 🏃 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🧪 Testes

```bash
# Executar testes
npm run test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### Estrutura de Testes

- **Testes unitários** de componentes em `src/presentation/components/__tests__/`
- **Testes unitários** de repositórios em `src/data/repositories/__tests__/`
- Configuração do Jest em `jest.config.js`

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

### Deploy na Vercel

1. Conecte seu repositório GitHub à Vercel
2. Configure o build command: `npm run build`
3. Configure o output directory: `.next`
4. Deploy! 🚀

Ou use o Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🎨 Design System

O projeto utiliza um tema sci-fi inspirado no Rick and Morty:

- **Portal Green** (#00B5CC) - Cor primária
- **Rick Yellow** (#F0E14A) - Cor secundária
- Fundo espacial escuro
- Animações suaves com portal glow
- Componentes customizados do shadcn/ui

## 📝 API

Este projeto consome a [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql)

## 🏗️ Clean Architecture

O projeto segue os princípios de Clean Architecture:

1. **Domain Layer** - Entidades e regras de negócio
2. **Data Layer** - Implementação de acesso a dados
3. **Presentation Layer** - UI e lógica de apresentação

### Vantagens:
- ✅ Código testável
- ✅ Independência de frameworks
- ✅ Fácil manutenção
- ✅ Baixo acoplamento

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.
