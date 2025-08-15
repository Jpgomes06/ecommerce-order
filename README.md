# E-commerce Order Management - Clean Architecture

## 👋 Olá João! Vamos entender como este projeto funciona?

Este projeto foi construído seguindo os princípios da **Clean Architecture** (Arquitetura Limpa) ADAPTADA para o contexto do projeto e-commerce order. Vou explicar tudo de forma simples e detalhada para você entender cada parte e o porquê das escolhas que fizemos.

## 🚀 O que o projeto faz?

O projeto é um sistema simples de gerenciamento de pedidos que:
1. **Recebe pedidos** via API REST
2. **Coloca os pedidos em uma fila** (RabbitMQ) 
3. **Processa os pedidos** da fila e salva no banco de dados (MongoDB)
4. **Lista pedidos** salvos no banco

## 📁 Estrutura do Projeto - Por que esses nomes?

### 🤔 "Mas por que não usar nomenclaturas mais  normais como `controllers`, `models`, `utils`?"

Boa pergunta! Esses nomes vêm da **Clean Architecture** (adaptamos), uma forma de organizar projetos criada pelo Uncle Bob (Robert Martin). Cada nome tem um significado específico:

```
src/
├── domain/          # Regras de negócio (coração do sistema)
├── presentation/    # Interface com o mundo externo (APIs)
├── infra/          # Acesso a banco de dados e filas
└── main/           # Configuração e ligação de tudo
```

### 📖 Traduzindo os nomes para "português normal":

| Nome Clean Architecture | O que significa na prática | Nome "tradicional" |
|------------------------|----------------------------|-------------------|
| **`domain/`** | Regras do seu negócio, independente de tecnologia | `business/`, `core/`, `models/` |
| **`presentation/`** | Como você mostra dados pro usuário (APIs, telas) | `controllers/`, `routes/`, `api/` |
| **`infra/`** | Conexão com coisas externas (banco, APIs) | `database/`, `external/`, `adapters/` |
| **`main/`** | Cola tudo junto, configurações | `config/`, `setup/`, `bootstrap/` |

### 🏗️ Por que usar esses nomes "estranhos"?

1. **Padrão mundial**: Qualquer dev sênior entende na hora
2. **Clareza de responsabilidade**: O nome já diz o que faz
3. **Independência de tecnologia**: `domain` sempre será `domain`, mesmo se trocar Express por Fastify

### 💡 Pensando como uma empresa:

Imagine que você tem uma loja física:

- **`domain/`** = As regras do seu negócio (como calcular desconto, validar CPF)
- **`presentation/`** = Seus vendedores (interface com o cliente)
- **`infra/`** = Seu estoque, caixa, fornecedores (infraestrutura)
- **`main/`** = Seu gerente (organiza tudo)

### 🧠 Domain (Domínio) - O Coração do Sistema

**Em português:** "As regras do meu negócio"

**Por que existe?** É onde ficam as regras que nunca mudam, não importa se você usa MySQL ou MongoDB, Express ou Fastify.

```
domain/
├── entities/       # "Como são os meus dados?" (Order = pedido)
├── contracts/      # "Que funções preciso?" (interfaces)
└── services/       # "Que regras tenho?" (lógica de negócio)
```

**Na prática:**
- **`entities/order.ts`**: "Um pedido TEM QUE ter: ID, cliente, itens..." 
- **`contracts/repository.ts`**: "Preciso de alguém que saiba salvar pedidos"
- **`services/store-order-service.ts`**: "Para salvar pedido, mando pra fila primeiro"

**Se fosse uma padaria:** 
- Entidade = "Pão tem que ter: farinha, fermento, sal"
- Contrato = "Preciso de um fornecedor de farinha"
- Serviço = "Para fazer pão, primeiro aqueço o forno"

### 🌐 Presentation (Apresentação) - Interface com o Mundo

**Em português:** "Como eu converso com o usuário"

**Por que existe?** É a "porta de entrada" do seu sistema. Cuida do HTTP, valida o que chega e formata o que sai.

```
presentation/
├── controllers/    # "Recebo as requisições" (quem atende o telefone)
├── contracts/      # "Como são request/response" (formato das conversas)
└── helpers/        # "Adaptadores" (tradutores entre Express e nosso código)
```

**Na prática:**
- **`controllers/store-order-controller.ts`**: "Recebi um POST, vou validar e chamar quem sabe processar"
- **`contracts/http.ts`**: "Resposta HTTP tem statusCode e body"
- **`helpers/express-route-adapter.ts`**: "Converto req/res do Express para nosso formato"

**Se fosse uma padaria:**
- Controller = Atendente que recebe pedido e anota
- Contracts = Cardápio (formato dos pedidos)
- Helpers = Tradutor (cliente fala português, cozinheiro fala técnico)

### 🏗️ Infra (Infraestrutura) - Acesso a Recursos Externos

**Em português:** "Conversando com coisas de fora"

**Por que existe?** É onde você realmente "suja as mãos" com bancos de dados, APIs externas, filas, etc.

```
infra/
├── db/mongodb/     # "Falo com o MongoDB" (salvar/buscar dados)
└── queue/          # "Falo com RabbitMQ" (enviar/receber mensagens)
```

**Na prática:**
- **`db/mongodb/order-repository.ts`**: "Sei como salvar pedido no MongoDB específicamente"
- **`queue/rabbitmq-gateway.ts`**: "Sei como publicar mensagem no RabbitMQ específicamente"
- **`queue/order-consumer.ts`**: "Fico escutando a fila e processando mensagens"

**Se fosse uma padaria:**
- DB = Sua prateleira específica onde guarda pães
- Queue = Seu sistema de senhas específico
- Consumer = Funcionário que fica chamando senhas

**Por que não fica no Domain?** Porque amanhã você pode trocar MongoDB por PostgreSQL, e o Domain não deve saber dessas tecnologias específicas.

### ⚙️ Main - Configuração e Ligação

**Em português:** "O chefe que organiza tudo"

**Por que existe?** É quem liga todas as peças do quebra-cabeça. Sem o Main, você teria peças soltas que não conversam.

```
main/
├── config/         # "Configurações do projeto" (porta, URLs, etc.)
├── factories/      # "Montadores" (criam objetos com dependências)
├── routes/         # "Mapeamento de rotas" (GET /ping vai para onde?)
└── server.ts       # "Inicializador" (liga tudo e sobe o servidor)
```

**Na prática:**
- **`config/env.ts`**: "Porta 3000, MongoDB na URL X, RabbitMQ na URL Y"
- **`factories/controllers/`**: "Para criar um controller, preciso criar service, gateway..."
- **`routes/order-routes.ts`**: "POST /order vai pro StoreOrderController"
- **`server.ts`**: "Conecta no banco, inicia consumer, sobe servidor"

**Se fosse uma padaria:**
- Config = Horário de funcionamento, fornecedores
- Factories = Receitas de como montar cada produto
- Routes = Cardápio (que produto cada cliente pode pedir)
- Server = Chefe que abre a padaria de manhã

**Por que não cada um se organiza sozinho?** Porque vira bagunça! Imagina cada arquivo tentando descobrir suas próprias dependências...

### 🔤 Glossário de Termos "Estranhos" que Usamos

| Termo | O que significa | Exemplo no projeto |
|-------|----------------|-------------------|
| **Entity** | "Modelo de dados" | `Order` = como é um pedido |
| **Service** | "Fazedor de coisas" | `StoreOrderService` = salva pedidos |
| **Repository** | "Guardador de dados" | `OrderRepository` = salva no banco |
| **Gateway** | "Conversador externo" | `RabbitMQGateway` = fala com fila |
| **Controller** | "Recebedor de requisições" | `StoreOrderController` = recebe POST |
| **Factory** | "Montador de objetos" | `makeController` = monta controller |
| **Contract/Interface** | "Contrato do que precisa fazer" | `QueueGateway` = "precisa ter publish()" |
| **Adapter** | "Tradutor entre sistemas" | `expressRouteAdapter` = traduz Express |
| **Consumer** | "Ouvinte de filas" | `OrderConsumer` = escuta fila RabbitMQ |
| **DTO** | "Formato de dados" | `Order` = formato do pedido |

### 🆚 Como seria em um projeto "tradicional"?

```
📁 Projeto Tradicional          📁 Nosso Projeto (Clean Architecture)
├── controllers/                ├── presentation/controllers/
├── models/                     ├── domain/entities/
├── services/                   ├── domain/services/
├── database/                   ├── infra/db/
├── routes/                     ├── main/routes/
├── config/                     ├── main/config/
└── utils/                      └── presentation/helpers/
```

**Vantagem do nosso jeito:**
- Qualquer dev sênior entende na hora
- Fica claro onde cada coisa vai
- Facilita trabalho em equipe
- Padrão usado no mundo todo

## 🏭 Factories - Por que usamos?

### O Problema sem Factory

Imagine se fizéssemos assim (forma errada):

```typescript
// ❌ Forma errada - tudo grudado
export class StoreOrderController {
  async handle(request) {
    const rabbitmq = new RabbitMQGateway(); // Dependência fixa!
    const service = new StoreOrderServiceImpl(rabbitmq);
    return service.execute(request.body);
  }
}
```

**Problemas:**
- Controller depende diretamente do RabbitMQ
- Difícil de testar (como mockar o RabbitMQ?)
- Difícil de trocar por outra fila
- Código reutilizável? Não!

### ✅ Solução com Factory

```typescript
// Factory cria o objeto com todas as dependências
export const makeStoreOrderController = (): StoreOrderController => {
  const gateway = makeRabbitMQGateway();      // Cria a dependência
  const service = makeStoreOrderService();     // Cria o serviço  
  return new StoreOrderController(service);    // Injeta no controller
};
```

**Benefícios:**
- **Flexibilidade**: Posso trocar RabbitMQ por SQS facilmente
- **Testabilidade**: Posso injetar mocks nos testes
- **Responsabilidade única**: Cada classe tem uma função específica
- **Reutilização**: A factory pode ser usada em qualquer lugar

### 🔄 O que substituiria as Factories?

1. **Container de DI** (como InversifyJS): Mais complexo, mas mais poderoso
2. **Fazer na mão**: Como mostramos acima (❌ não recomendado)
3. **Framework que já faz** (como NestJS): Já vem com DI integrado

## 🔌 Interfaces - Nossos Contratos

### Por que usar interfaces?

**Sem interface:**
```typescript
// ❌ Service dependente da implementação concreta
class StoreOrderService {
  constructor(private gateway: RabbitMQGateway) {} // Acoplado ao RabbitMQ!
}
```

**Com interface:**
```typescript
// ✅ Service depende da abstração
interface QueueGateway {
  publish(order: Order): Promise<boolean>;
}

class StoreOrderService {
  constructor(private gateway: QueueGateway) {} // Pode ser qualquer fila!
}
```

### 📋 Interfaces que usamos:

1. **`QueueGateway`**: Contrato para filas
   - Implementação: `RabbitMQGateway`
   - Usado em: `StoreOrderService`

2. **`StoreOrderRepository`**: Contrato para salvar pedidos
   - Implementação: `OrderMongoRepository`
   - Usado em: `ProcessOrderService`

3. **`Controller`**: Contrato para controllers HTTP
   - Implementação: `PingController`, `StoreOrderController`
   - Usado em: `adaptRoute`

## 💉 Injeção e Inversão de Dependência

### O que é?

**Injeção de Dependência**: Ao invés da classe criar suas dependências, elas são "injetadas" (passadas) de fora.

**Inversão de Dependência**: Classes dependem de abstrações (interfaces), não de implementações concretas.

### 📍 Onde acontece no projeto:

1. **Controller ← Service**
```typescript
export class StoreOrderController {
  constructor(private readonly service: StoreOrderService) {} // ← Injeção
}
```

2. **Service ← Gateway**
```typescript
export class StoreOrderServiceImpl {
  constructor(private readonly queueGateway: QueueGateway) {} // ← Injeção de interface
}
```

3. **Service ← Repository** 
```typescript
export class ProcessOrderServiceImpl {
  constructor(private readonly repository: StoreOrderRepository) {} // ← Injeção de interface
}
```

## 🛣️ Fluxo Completo da Rota POST /order

Vou te mostrar exatamente o que acontece quando alguém faz `POST /order`:

### 1. **Express recebe a requisição**
```
POST /api/v1/order
Content-Type: application/json
{
  "order_id": 123,
  "client_name": "João Silva",
  "items": [...]
}
```

### 2. **Rota é mapeada** (`src/main/routes/order-routes.ts`)
```typescript
router.post('/order', adaptRoute(makeStoreOrderController()));
//              ↑            ↑               ↑
//          endpoint    adaptador        factory
```

### 3. **Factory cria o Controller** (`src/main/factories/controllers/store-order-controller-factory.ts`)
```typescript
export const makeStoreOrderController = (): StoreOrderController => {
  const service = makeStoreOrderService(); // ← Cria o service primeiro
  return new StoreOrderController(service); // ← Injeta no controller
};
```

### 4. **Factory cria o Service** (`src/main/factories/services/store-order-service-factory.ts`)
```typescript
export const makeStoreOrderService = (): StoreOrderServiceImpl => {
  const gateway = makeRabbitMQGateway(); // ← Cria o gateway
  return new StoreOrderServiceImpl(gateway); // ← Injeta no service
};
```

### 5. **Factory cria o Gateway** (`src/main/factories/gateways/rabbitmq-gateway-factory.ts`)
```typescript
export const makeRabbitMQGateway = (): RabbitMQGateway => {
  return new RabbitMQGateway(); // ← Cria conexão com RabbitMQ
};
```

### 6. **Adaptador converte Express → HTTP** (`src/presentation/helpers/express-route-adapter.ts`)
```typescript
const httpRequest: HttpRequest = {
  body: req.body, // ← Converte req.body do Express para nosso formato
};
const httpResponse = await controller.handle(httpRequest);
```

### 7. **Controller processa** (`src/presentation/controllers/store-order-controller.ts`)
```typescript
async handle(request: HttpRequest<Order>): Promise<HttpResponse> {
  if (!request.body) {
    throw new Error('Request body is required');
  }
  const result = await this.service.execute(request.body); // ← Chama o service
  return created({ success: result });
}
```

### 8. **Service envia para fila** (`src/domain/services/store-order-service.ts`)
```typescript
async execute(order: Order): Promise<boolean> {
  return this.queueGateway.publish(order); // ← Publica na fila RabbitMQ
}
```

### 9. **Gateway publica no RabbitMQ** (`src/infra/queue/rabbitmq-gateway.ts`)
```typescript
async publish(order: Order): Promise<boolean> {
  const message = JSON.stringify(order);
  this.channel?.sendToQueue(this.queueName, Buffer.from(message)); // ← Vai para a fila
  return true;
}
```

### 10. **Consumer processa a fila** (`src/infra/queue/order-consumer.ts`)
```typescript
// Roda em paralelo, escutando a fila
this.channel.consume(this.queueName, async (message) => {
  const order: Order = JSON.parse(message.content.toString());
  await this.processOrderService.execute(order); // ← Processa o pedido
});
```

### 11. **ProcessOrderService salva no banco** (`src/domain/services/process-order-service.ts`)
```typescript
async execute(order: Order): Promise<boolean> {
  return this.repository.store(order); // ← Salva no MongoDB
}
```

### 12. **Repository salva no MongoDB** (`src/infra/db/mongodb/order-repository.ts`)
```typescript
async store(order: Order): Promise<boolean> {
  await OrderModel.create(order); // ← Salva usando Mongoose
  return true;
}
```

## 🎯 Por que separamos assim?

### 1. **Responsabilidade Única**
Cada arquivo tem uma responsabilidade específica:
- Controller: cuida do HTTP
- Service: cuida da regra de negócio
- Repository: cuida do banco de dados

### 2. **Flexibilidade**
Posso trocar:
- MongoDB por PostgreSQL (mudo só o Repository)
- RabbitMQ por SQS (mudo só o Gateway)
- Express por Fastify (mudo só o adaptador)

### 3. **Testabilidade**
Posso testar cada parte isoladamente:
```typescript
// Teste do service com mock
const mockGateway = { publish: jest.fn() };
const service = new StoreOrderServiceImpl(mockGateway);
```

### 4. **Evolução**
Adicionar novas funcionalidades é fácil:
- Nova rota? Novo controller + service
- Nova forma de salvar? Novo repository
- Nova fila? Novo gateway

## 🚀 Para rodar o projeto

```bash
# Instalar dependências
npm install

# Subir MongoDB e RabbitMQ com Docker
docker-compose up -d

# Rodar o projeto
npm run dev
```

## 📝 Testando as rotas

```bash
# Ping
curl http://localhost:3000/api/v1/ping

# Criar pedido
curl -X POST http://localhost:3000/api/v1/order \
  -H "Content-Type: application/json" \
  -d '{"order_id": 123, "client_name": "João"}'

# Listar pedidos
curl http://localhost:3000/api/v1/orders
```

---

**Resumo João:** Este projeto mostra como separar responsabilidades, usar injeção de dependência e manter o código limpo e flexível. Cada camada tem sua função específica e elas conversam através de interfaces bem definidas. Isso torna o código mais fácil de testar, manter e evoluir! 🎉 

