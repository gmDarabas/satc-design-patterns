# Trabalho Final - Design Patterns: API E-Commerce

Este projeto é uma API desenvolvida com [Express.js](https://expressjs.com/) para gerenciar pedidos de uma loja virtual que comercializa diferentes tipos de produtos. O foco principal do trabalho é demonstrar a aplicação de padrões de projeto vistos em sala de aula (Design Patterns) em um contexto real.

## Padrões de Projeto Utilizados

### 1. **Builder**
- **Descrição**: Facilita a construção de pedidos complexos, permitindo adicionar informações como produtos, cliente, frete e outras propriedades de maneira incremental.
- **Exemplo no Projeto**: [OrderBuilder.ts](./src/order/OrderBuilder.ts) É a classe que utiliza o padrão *Builder* para modularizar a criação de [pedidos](./src/order/Order.ts).

### 2. **State**
- **Descrição**: Gerencia os diferentes estados do pedido, como "Recebido", "Em Processamento", "Enviado" ou "Entregue".
- **Exemplo no Projeto**: [OrderState.ts](./src/order/OrderState.ts) implementa a lógica de transição entre estados.

### 3. **Composite**
- **Descrição**: Permite a criação de estruturas hierárquicas, como o menu de navegação da loja.
- **Exemplo no Projeto**: Implementado na organização do [menu de categorias e produtos](./src/menu/MenuComponent.ts), permitindo uma árvore de categorias e subcategorias.

### 4. **Factory**
- **Descrição**: Garante a criação de instâncias específicas para os diferentes estados do pedido.
- **Exemplo no Projeto**: A *Factory* cria objetos representando os estados definidos no padrão *State*.

---

## Endpoint Disponíveis
- `GET /api/menu` - Retorna o menu com categorias, subcategorias e produtos. Demonstra o padrão *Composite*. 
- `POST /api/order` - Cria um novo pedido. Demonstra o padrão *Builder*.
- `PATCH /api/order/:id/advance` - Altera o status de um pedido para o próximo estado. Demonstra o padrão *State*.

## Para rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```
