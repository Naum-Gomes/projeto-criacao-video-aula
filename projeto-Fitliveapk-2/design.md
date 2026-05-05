# FitLive - Design de Interface Mobile

## Visão Geral
FitLive é um aplicativo de treino personalizado que integra videoconferência Jitsi Meet com ferramentas de acompanhamento de exercícios em tempo real. O app permite que treinadores conduzam sessões de treino ao vivo enquanto monitoram o progresso dos alunos através de cronômetro e contador de repetições.

## Orientação e Usabilidade
- **Orientação**: Portrait (9:16)
- **Padrão**: One-handed usage - todos os elementos interativos acessíveis com uma mão
- **Design**: Segue Apple Human Interface Guidelines (HIG) para parecer um app nativo iOS

## Paleta de Cores
- **Primária**: `#FF6B35` (Laranja vibrante - energia, movimento)
- **Secundária**: `#004E89` (Azul profundo - confiança, estabilidade)
- **Sucesso**: `#22C55E` (Verde - conclusão de exercícios)
- **Fundo**: `#FFFFFF` (Light) / `#0F0F0F` (Dark)
- **Superfície**: `#F5F5F5` (Light) / `#1A1A1A` (Dark)
- **Texto Principal**: `#1A1A1A` (Light) / `#FFFFFF` (Dark)
- **Texto Secundário**: `#666666` (Light) / `#AAAAAA` (Dark)

## Telas Principais

### 1. Home Screen (Tela Inicial)
**Objetivo**: Dashboard com acesso rápido a treinos e histórico

**Conteúdo Principal**:
- Header com saudação personalizada ("Olá, [Nome]!")
- Card destacado: "Treino Agora" com botão CTA
- Lista de treinos disponíveis (recentes/favoritos)
- Histórico de sessões completadas
- Botão flutuante para iniciar nova sessão

**Funcionalidades**:
- Exibição de estatísticas rápidas (total de sessões, tempo total)
- Pull-to-refresh para atualizar lista de treinos
- Navegação para detalhes do treino

### 2. Treino Detalhado (Workout Detail)
**Objetivo**: Visualizar informações do treino antes de iniciar

**Conteúdo Principal**:
- Nome e descrição do treino
- Duração estimada
- Número de séries e exercícios
- Nível de dificuldade
- Instrutor responsável
- Botão "Iniciar Treino ao Vivo"

**Funcionalidades**:
- Visualizar lista de exercícios
- Marcar como favorito
- Compartilhar treino

### 3. Tela de Videoconferência com Controles (Live Workout)
**Objetivo**: Conduzir treino com videoconferência e monitoramento de exercícios

**Layout Principal** (Portrait):
- **Área Superior (60%)**: Vídeo do Jitsi Meet (full-screen ou Picture-in-Picture)
- **Área Inferior (40%)**: Painel de controle de exercícios

**Painel de Controle de Exercícios**:
- **Exercício Atual**: Nome e série (ex: "Flexão - Série 1/3")
- **Cronômetro**: Display grande com tempo decorrido/restante
  - Botões: Play/Pause, Reset
  - Duração pré-configurada do exercício
- **Contador de Repetições**: 
  - Display grande com número de reps
  - Botões: +1, -1, Reset
  - Meta de repetições (ex: "8/12")
- **Botão de Próximo Exercício**: Avançar para próximo exercício
- **Botão de Encerrar**: Finalizar sessão

**Funcionalidades**:
- Cronômetro sincronizado com intervalo de descanso
- Contador de repetições com feedback visual
- Notificações de transição entre exercícios
- Manter tela ativa durante treino
- Controles de vídeo (mute, câmera, sair)

### 4. Tela de Pausa/Intervalo
**Objetivo**: Gerenciar intervalos entre séries

**Conteúdo Principal**:
- Próximo exercício
- Tempo de descanso restante
- Dicas de recuperação
- Botão para retomar

### 5. Tela de Conclusão (Workout Complete)
**Objetivo**: Resumo da sessão completada

**Conteúdo Principal**:
- Duração total da sessão
- Exercícios completados
- Total de repetições
- Estatísticas de performance
- Botão "Voltar ao Home"
- Opção de salvar/compartilhar resultado

### 6. Histórico de Treinos (Workout History)
**Objetivo**: Visualizar sessões anteriores

**Conteúdo Principal**:
- Lista de treinos completados (data, duração, exercícios)
- Filtros por período
- Detalhes de cada sessão

### 7. Configurações (Settings)
**Objetivo**: Personalizar experiência

**Opções**:
- Perfil do usuário
- Preferências de notificação
- Tema (claro/escuro)
- Sobre o app

## Fluxos de Usuário Principais

### Fluxo 1: Iniciar Treino ao Vivo
1. Usuário abre app → Home Screen
2. Toca em "Treino Agora" ou seleciona treino da lista
3. Visualiza detalhes do treino
4. Toca "Iniciar Treino ao Vivo"
5. App conecta ao Jitsi Meet (sala de videoconferência)
6. Exibe tela de Live Workout com vídeo + controles
7. Usuário interage com cronômetro e contador durante treino
8. Ao final, exibe tela de conclusão

### Fluxo 2: Gerenciar Exercício Durante Treino
1. Usuário está na tela Live Workout
2. Toca botão "+" para adicionar repetição
3. Contador atualiza em tempo real
4. Ao atingir meta, contador muda cor (verde)
5. Usuário toca "Próximo Exercício"
6. App avança para próximo exercício e reseta cronômetro/contador
7. Exibe intervalo de descanso

### Fluxo 3: Encerrar Treino
1. Usuário toca "Encerrar Treino"
2. Confirma ação
3. Desconecta do Jitsi Meet
4. Exibe tela de conclusão com resumo
5. Usuário pode voltar ao home ou compartilhar resultado

## Componentes Reutilizáveis

### 1. ExerciseCard
- Exibe nome, série, duração estimada
- Ícone de status (pendente, em progresso, completo)

### 2. TimerDisplay
- Cronômetro grande e legível
- Controles Play/Pause/Reset

### 3. RepCounter
- Contador com +/- buttons
- Display de meta vs. atual
- Feedback visual de conclusão

### 4. WorkoutHeader
- Nome do treino
- Série atual
- Tempo decorrido

### 5. VideoContainer
- Wrapper para Jitsi Meet
- Controles de vídeo/áudio
- Modo fullscreen

## Considerações de Implementação

### Performance
- Lazy load de treinos para não sobrecarregar lista
- Manter tela ativa durante videoconferência (expo-keep-awake)
- Otimizar renderização de cronômetro/contador (atualização a cada segundo)

### Acessibilidade
- Controles com tamanho mínimo de 44pt
- Contraste de cores adequado (WCAG AA)
- Labels descritivos para VoiceOver

### Responsividade
- Adaptar layout para diferentes tamanhos de tela
- Garantir usabilidade em modo landscape (opcional)

## Próximas Etapas
1. Implementar navegação e estrutura de telas
2. Criar componentes de UI (Timer, Counter, etc.)
3. Integrar Jitsi Meet SDK
4. Implementar lógica de treino
5. Adicionar persistência de dados (AsyncStorage)
6. Testes e refinamento de UX
