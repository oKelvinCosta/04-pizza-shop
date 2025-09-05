# Pizza Shop 🍕

Este é um projeto de demonstração de uma loja de pizzas desenvolvido com React e TypeScript.

## 🚀 Como Visualizar o Projeto

Para visualizar o projeto em modo de desenvolvimento, siga estes passos:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev:test
   ```

## 🧪 Testes

### Testes Unitários

Para executar os testes unitários:

```bash
# Executar testes uma vez
npm test

# Executar testes em modo watch
npm run test:watch
```

### Testes End-to-End (E2E)

Para executar os testes E2E com Playwright:

```bash
# Instalar as dependências do Playwright (se ainda não instaladas)
npx playwright install

# Executar os testes E2E
npx playwright test

# Executar os testes E2E com a interface gráfica
npx playwright test --ui

# Executar testes específicos (ex: orders-e2e.spec.ts)
npx playwright test tests/orders-e2e.spec.ts
```

3. O projeto estará disponível em:
   ```
   http://localhost:5173
   ```

## 🛠️ Mocking e Desenvolvimento

Este projeto utiliza o **MSW (Mock Service Worker)** para simular chamadas de API durante o desenvolvimento e testes. Isso permite que você desenvolva e teste a aplicação sem depender de um backend real.

### Como funciona

- Os mocks estão localizados em `src/api/mocks/`
- Cada arquivo de mock corresponde a um endpoint da API
- Os mocks são configurados para responder com dados de exemplo
- Em ambiente de desenvolvimento, os mocks são ativados automaticamente

### Mocks disponíveis

- **Autenticação**
  - Login (`/authenticate`)
  - Perfil do usuário (`/me`)
  - Perfil do restaurante (`/managed-restaurant`)
  
- **Pedidos**
  - Listagem de pedidos (`/orders`)
  - Detalhes do pedido (`/orders/:orderId`)
  - Aprovar pedido (`PATCH /orders/:orderId/approve`)
  - Cancelar pedido (`PATCH /orders/:orderId/cancel`)
  - Entregar pedido (`PATCH /orders/:orderId/deliver`)
  
- **Métricas**
  - Receita mensal (`/metrics/month-revenue`)
  - Pedidos no mês (`/metrics/month-orders-amount`)
  - Pedidos cancelados (`/metrics/month-canceled-orders-amount`)
  - Pedidos no dia (`/metrics/day-orders-amount`)
  - Receita diária (`/metrics/daily-receipt-in-period`)
  - Produtos populares (`/metrics/popular-products`)

### Como desativar os mocks

1. Abra o arquivo `src/main.tsx`
2. Comente ou remova a linha que importa e chama `enableMSW()`
3. Certifique-se de ter um servidor backend rodando e configurado corretamente

## ⚠️ Importante

- O backend não está disponível neste momento, então algumas funcionalidades podem não estar funcionando corretamente.
- Este é um projeto de demonstração focado na interface do usuário.

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- MSW (para mock de API)

## 📝 Licença

Este projeto está sob a licença MIT.
