# VaiAbastecendo - App

Aplicativo colaborativo para mapeamento e atualização de preços de combustíveis em tempo real. Desenvolvido com React Native e Expo, focado em performance, geolocalização e usabilidade.

## 🛠 Tecnologias

* **Framework:** React Native / Expo
* **Requisições:** Axios
* **Geolocalização:** Expo Location (com fallback inteligente)
* **Ícones e Fontes:** Expo Vector Icons, Google Fonts
* **Build e Deploy:** EAS (Expo Application Services)

## 🏗 Estrutura

* `src/components/`: componentes visuais reutilizáveis (`PostoCard`, `UpdatePriceModal`, `Header`, etc).
* `src/contexts/`: gerenciamento de estado global (`AuthContext`, `CombustivelContext`, `ToastContext`).
* `src/hooks/`: lógica de negócio e consumo de API isolada (`usePostos.ts`).
* `src/screens/`: telas principais da aplicação (`MapView`, `PostosList`, `UserProfile`).
* `src/theme/`: configuração global de cores e tipografia (Modo Claro/Escuro).
* `src/utils/`: funções e utilitários auxiliares (`color.ts`, `dateFormatter.ts`, `dictFlags.ts`, `keyboardPadding.ts`).

## 🚀 Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Configure as variáveis de ambiente:**
    
    Crie um arquivo .env na raíz do projeto e adicione a URL da API:
    
    ```bash
    EXPO_PUBLIC_API_URL=
    ```

2. **Inicie o Expo:**
    ```bash
   npx expo start
   ```

## 📦 APK (Android)
O projeto está configurado para gerar builds na nuvem usando o EAS.

1. Instale o CLI do EAS: 
    ```
    npm install -g eas-cli
    ```

2. Faça o login:
    ```
    eas login
    ```

3. Inicie o build
    ```
    eas build -p android --profile preview
    ```