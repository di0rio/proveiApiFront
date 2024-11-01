# Sistema de Vendas - Frontend React

Este é um sistema de vendas desenvolvido com React + Vite que permite o gerenciamento de clientes, produtos, fornecedores e vendas.

## Funcionalidades

### Principais
- Gestão de Clientes (CRUD)
- Gestão de Fornecedores (CRUD)
- Gestão de Produtos (CRUD)
- Registro e Gestão de Vendas
- Interface responsiva e moderna

### Bônus Implementados
- Sistema de Autenticação com JWT
- Relatório de Vendas por Período
- Gestão Automática de Estoque
- Dashboard com Indicadores

## Tecnologias Utilizadas

- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Shadcn/UI
- React Query
- JWT para autenticação

## Requisitos

- Node.js 18+
- NPM ou Yarn
- API Backend em execução (porta 5000)

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/sistema-vendas-react
```

2. Entre no diretório
```bash
cd sistema-vendas-react
```

3. Instale as dependências
```bash
npm install
```

4. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo .env com suas configurações

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
├── components/    # Componentes reutilizáveis
├── pages/        # Páginas da aplicação
├── services/     # Serviços e API calls
├── contexts/     # Contextos React
├── hooks/        # Hooks personalizados
├── utils/        # Funções utilitárias
└── styles/       # Estilos globais
```

## Rotas Principais

- `/login` - Autenticação
- `/dashboard` - Painel principal
- `/clientes` - Gestão de clientes
- `/fornecedores` - Gestão de fornecedores
- `/produtos` - Gestão de produtos
- `/vendas` - Registro de vendas
- `/relatorios` - Relatórios e análises

## Autenticação

O sistema utiliza JWT para autenticação. O token deve ser incluído no header de todas as requisições:

```javascript
Authorization: Bearer <seu-token>
```

## Contribuição

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
