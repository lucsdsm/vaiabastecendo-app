# VaiAbastecendo - App

Aplicativo colaborativo para mapeamento e atualização de preços de combustíveis em tempo real. Desenvolvido com React Native e Expo, focado em performance, geolocalização e usabilidade.

## Visão geral

O app foi desenhado para uso diário em dispositivos móveis, com foco em:

- localização e descoberta de postos próximos;
- atualização colaborativa de preços;
- histórico de preços por posto e por tipo de combustível;
- autenticação opcional para liberar ações sensíveis;
- diário de bordo local com veículos, abastecimentos e métricas de consumo;
- tema claro/escuro com suporte ao esquema do sistema.

## Principais funcionalidades

### Mapa e lista de postos

O usuário entra no app após conceder permissão de localização. A partir daí, pode alternar entre mapa e lista para visualizar os postos disponíveis, com foco na proximidade e na leitura rápida dos preços.

### Atualização de preços

Usuários autenticados podem atualizar o preço de um combustível em um posto. Antes do envio, a tela valida o valor informado, normaliza o formato monetário e compara com o histórico para evitar alterações fora do padrão esperado.

### Reações aos preços

O app permite reagir aos preços de forma simples, com atualização otimista na interface e sincronização com a API.

### Diário de bordo local

A aplicação mantém um banco SQLite no aparelho para armazenar veículos e abastecimentos. Isso permite criar, editar e excluir registros mesmo sem conexão ativa.

### Perfil e autenticação

O perfil concentra os dados do usuário, além do fluxo de login e logout. A autenticação é usada para proteger operações como atualização de preço e sincronização de dados sensíveis.

### Tema e experiência visual

O tema global segue o modo do sistema por padrão, com possibilidade de alternância manual. O app também usa componentes reutilizáveis para manter consistência visual entre telas.

## Como a aplicação funciona

### Inicialização

Ao abrir o app, a aplicação:

1. inicializa o banco SQLite local;
2. verifica a permissão de localização;
3. carrega o estado de autenticação;
4. busca os tipos de combustível na API;
5. exibe a tela de permissão ou o fluxo principal, dependendo do acesso à localização.

### Fluxo de dados

- A API fornece autenticação, tipos de combustível, postos, histórico de preços e atualização de preços.
- O SQLite guarda veículos e abastecimentos para uso offline/local.
- O tema é resolvido em memória pelo provider global.
- As telas principais consomem hooks e contextos para manter a lógica separada da interface.

### Atualização de preço

O fluxo de atualização valida o combustível selecionado, o preço informado e o contexto do histórico do posto antes de enviar a requisição. O objetivo é reduzir ruído na base colaborativa e evitar registros incoerentes.

### Registro de abastecimento

Ao adicionar ou editar um abastecimento, o app recalcula valores como litro, preço total e volume abastecido. O histórico do veículo também é usado para checar consistência de odômetro e para estimar métricas de consumo.

## Estrutura do projeto

- `src/components/`: componentes reutilizáveis da interface, como cards, cabeçalho, rodapé, alertas, toast e seletor de combustível.
- `src/contexts/`: estado global para autenticação, combustíveis e toast.
- `src/hooks/`: lógica de integração com API e histórico.
- `src/screens/`: telas da aplicação.
- `src/database/`: banco SQLite e serviços de abastecimento local.
- `src/theme/`: cores, tokens e provider de tema.
- `src/utils/`: utilitários de cor, data, teclado e outros helpers.

## Tecnologias

- React Native
- Expo
- TypeScript
- Axios
- React Navigation
- Expo Location
- Expo Secure Store
- Expo SQLite
- RNMapbox
- React Native Vector Icons

## Requisitos de ambiente

- Node.js instalado na máquina.
- Expo CLI disponível pelo fluxo do projeto.
- Um arquivo `.env` na pasta `app` com a variável `EXPO_PUBLIC_API_URL` apontando para a API.

Exemplo:

```bash
EXPO_PUBLIC_API_URL=https://sua-api.com
```

## Como executar

1. Entre na pasta do app.
2. Instale as dependências.
3. Inicie o projeto.

```bash
cd app
npm install
npm start
```

## Scripts disponíveis

Os scripts principais definidos no projeto são:

- `npm start`: inicia o Expo.
- `npm run android`: abre o app no Android.
- `npm run ios`: abre o app no iOS.
- `npm run web`: executa a versão web.
- `npm run lint`: roda a análise estática do código.

## Configuração importante

- O app depende de permissão de localização para exibir o fluxo principal.
- O mapa utiliza a integração configurada no Expo e no RNMapbox.
- O login é feito contra a API configurada em `EXPO_PUBLIC_API_URL`.
- O banco local é inicializado automaticamente na abertura do app.

## Build e publicação

O projeto usa EAS para os perfis de desenvolvimento, preview e produção. A configuração está em `app/eas.json`.

## Observações

- O app foi pensado para funcionar bem com dados remotos e locais ao mesmo tempo.
- A lógica de negócio mais sensível fica isolada em hooks e contextos, enquanto os componentes visuais permanecem reutilizáveis.
- A experiência principal gira em torno de descoberta de postos, atualização colaborativa e controle pessoal de consumo.
