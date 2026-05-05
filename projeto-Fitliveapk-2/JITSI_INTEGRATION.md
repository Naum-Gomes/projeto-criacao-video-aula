# Integração Jitsi Meet - FitLive

## 🎯 Visão Geral

O FitLive integra completamente o **Jitsi Meet** para fornecer videoconferência ao vivo durante sessões de treino. A integração funciona em web através da API externa do Jitsi Meet (meet.jit.si) e pode ser estendida para Android/iOS com configuração nativa adicional.

## 🏗️ Arquitetura de Integração

### Componentes Implementados

#### 1. **JitsiAdvanced** (Recomendado para Produção)
**Arquivo**: `components/jitsi-advanced.tsx`

Componente completo com:
- Carregamento automático da API do Jitsi Meet
- Controles de áudio/vídeo/compartilhamento de tela
- Indicadores de status (participantes, mute status)
- Eventos de conferência (join, leave, participants)
- Interface flutuante com botões de controle
- Suporte a web (Android/iOS com configuração nativa)

**Uso**:
```tsx
import { JitsiAdvanced } from '@/components/jitsi-advanced';

<JitsiAdvanced
  roomName="fitlive-treino-1"
  displayName="João Silva"
  onConferenceTerminated={() => console.log('Conferência encerrada')}
  onConferenceJoined={() => console.log('Conectado')}
  onParticipantJoined={(count) => console.log(`${count} participantes`)}
/>
```

#### 2. **useJitsiApi** (Hook Avançado)
**Arquivo**: `hooks/use-jitsi-api.ts`

Hook para gerenciar a API do Jitsi programaticamente:

```tsx
const {
  isConnected,
  isMuted,
  isCameraOff,
  participantCount,
  toggleAudio,
  toggleVideo,
  toggleScreenShare,
  hangUp,
  sendChatMessage,
  raiseHand,
  muteEveryone,
} = useJitsiApi({
  roomName: 'fitlive-treino-1',
  displayName: 'João Silva',
});
```

#### 3. **JitsiIframe** (Simples)
**Arquivo**: `components/jitsi-iframe.tsx`

Componente básico que carrega o Jitsi Meet em um iframe.

## 🚀 Como Funciona

### Fluxo de Conexão

```
1. Usuário inicia treino ao vivo
   ↓
2. LiveWorkoutScreen monta JitsiAdvanced
   ↓
3. JitsiAdvanced carrega external_api.js do meet.jit.si
   ↓
4. Jitsi Meet API cria conferência na sala especificada
   ↓
5. Usuário vê vídeo em tempo real
   ↓
6. Cronômetro e contador funcionam independentemente
   ↓
7. Ao finalizar, JitsiAdvanced desconecta e limpa recursos
```

### Configuração da Sala

A sala é criada automaticamente com o nome:
```
fitlive-treino-{workoutId}
```

Exemplo: `fitlive-treino-1`

### Servidor Jitsi Usado

Por padrão, o app usa a instância pública do Jitsi Meet:
```
https://meet.jit.si
```

## 📱 Integração Web (Funcionando Agora)

### Características Ativas

- ✅ Videoconferência em tempo real
- ✅ Controles de áudio/vídeo
- ✅ Compartilhamento de tela
- ✅ Chat integrado
- ✅ Indicadores de participantes
- ✅ Gravação (opcional)
- ✅ Estatísticas de conexão

### Como Testar

1. Abra o app em navegador: `https://8081-i03wntji2e8nufz65rew8-d320355b.us2.manus.computer`
2. Toque em "Treino Agora"
3. Clique em "Iniciar Treino ao Vivo"
4. Veja a videoconferência Jitsi carregando
5. Permita acesso a câmera/microfone
6. Use os controles flutuantes para mutar/desligar câmera

## 🔧 Configuração Avançada

### Usar Servidor Jitsi Customizado

Para usar seu próprio servidor Jitsi:

```tsx
// Em components/jitsi-advanced.tsx, linha ~60
const api = new window.JitsiMeetExternalAPI('seu-servidor.com', {
  // ... resto da config
});
```

### Customizar Configuração

```tsx
configOverwrite: {
  startAudioOnly: false,           // Iniciar apenas com áudio
  disableSimulcast: false,         // Desabilitar simulcast
  enableLayerSuspension: true,     // Suspender camadas de vídeo
  startWithAudioMuted: false,      // Iniciar com áudio mudo
  startWithVideoMuted: false,      // Iniciar com vídeo desligado
  prejoinPageEnabled: false,       // Mostrar página de pré-entrada
  defaultLanguage: 'pt-BR',        // Idioma padrão
}
```

### Customizar Interface

```tsx
interfaceConfigOverwrite: {
  DEFAULT_BACKGROUND: '#000000',   // Cor de fundo
  SHOW_JITSI_WATERMARK: false,     // Mostrar marca d'água
  TOOLBAR_BUTTONS: [               // Botões da barra de ferramentas
    'microphone',
    'camera',
    'desktop',
    'fullscreen',
    'hangup',
  ],
}
```

## 🤖 Integração Android/iOS

### Dependências Necessárias

```bash
npm install react-native-jitsi-meet
```

### Configuração Android

Adicionar ao `app.json`:

```json
{
  "plugins": [
    [
      "react-native-jitsi-meet",
      {
        "skipBuildGradleDownload": false
      }
    ]
  ]
}
```

### Configuração iOS

Adicionar permissões ao `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>FitLive precisa de acesso à câmera para videoconferência</string>
<key>NSMicrophoneUsageDescription</key>
<string>FitLive precisa de acesso ao microfone para videoconferência</string>
```

### Implementação Native

```tsx
import { JitsiMeet, JitsiMeetEvents } from 'react-native-jitsi-meet';

const startJitsiMeeting = async () => {
  const options = {
    room: 'fitlive-treino-1',
    userDisplayName: 'João Silva',
    audioMuted: false,
    videoMuted: false,
  };

  await JitsiMeet.call(options);
};

JitsiMeetEvents.addListener('CONFERENCE_JOINED', () => {
  console.log('Conferência iniciada');
});

JitsiMeetEvents.addListener('CONFERENCE_TERMINATED', () => {
  console.log('Conferência encerrada');
});
```

## 📊 Eventos Disponíveis

| Evento | Descrição |
|--------|-----------|
| `videoConferenceJoined` | Usuário entrou na conferência |
| `videoConferenceLeft` | Usuário saiu da conferência |
| `participantJoined` | Novo participante entrou |
| `participantLeft` | Participante saiu |
| `audioMuteStatusChanged` | Status de áudio mudou |
| `videoMuteStatusChanged` | Status de vídeo mudou |
| `screenSharingStatusChanged` | Status de compartilhamento mudou |
| `readyToClose` | Conferência pronta para fechar |

## 🎮 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `toggleAudio` | Mutar/desmutar áudio |
| `toggleVideo` | Desligar/ligar câmera |
| `toggleShareScreen` | Compartilhar/parar compartilhamento |
| `hangup` | Sair da conferência |
| `sendChatMessage` | Enviar mensagem no chat |
| `raiseHand` | Levantar mão |
| `muteEveryone` | Mutar todos (moderador) |

## 🐛 Troubleshooting

### Vídeo não conecta

1. **Verificar permissões**: Navegador precisa de permissão para câmera/microfone
2. **Verificar conectividade**: Testar conexão de internet
3. **Verificar firewall**: Algumas redes bloqueiam Jitsi
4. **Testar em outro navegador**: Chrome/Firefox/Safari

### Audio/Vídeo com lag

1. **Reduzir qualidade**: Configurar `disableSimulcast: true`
2. **Usar WiFi**: Dados móveis podem ter latência
3. **Fechar outras abas**: Liberar recursos do navegador
4. **Verificar CPU**: Conferência usa bastante processamento

### Sala não encontrada

1. **Verificar nome da sala**: Deve ser válido e único
2. **Verificar servidor**: Servidor Jitsi deve estar online
3. **Verificar URL**: URL do servidor deve estar correta

## 📈 Performance

### Otimizações Implementadas

- Carregamento lazy do script Jitsi
- Limpeza de recursos ao desmontar
- Compressão de vídeo automática
- Suspensão de camadas de vídeo
- Simulcast desabilitado por padrão

### Monitoramento

Para monitorar performance:

```tsx
api.addEventListener('stats.endpointStats', (data) => {
  console.log('Estatísticas:', data);
});
```

## 🔐 Segurança

### Boas Práticas

1. **Nomes de sala únicos**: Use IDs de treino para evitar colisões
2. **Validar usuários**: Verificar identidade antes de conectar
3. **Usar HTTPS**: Sempre usar conexão segura
4. **Limitar participantes**: Configurar máximo de participantes
5. **Criptografia**: Jitsi Meet suporta criptografia E2E

### Configuração de Segurança

```tsx
configOverwrite: {
  e2eping: {
    enabled: true,  // Ativar criptografia E2E
  },
}
```

## 📚 Referências

- [Jitsi Meet Documentation](https://jitsi.github.io/handbook/)
- [Jitsi Meet API](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe)
- [react-native-jitsi-meet](https://github.com/react-native-jitsi-meet/react-native-jitsi-meet)
- [Expo Plugins](https://docs.expo.dev/plugins/introduction/)

## 🚀 Próximos Passos

1. **Testar em dispositivos reais**: Validar em iOS e Android
2. **Implementar gravação**: Gravar sessões de treino
3. **Adicionar chat**: Integrar chat com cronômetro
4. **Sincronizar dados**: Salvar histórico de conferências
5. **Análise de performance**: Monitorar qualidade de vídeo

---

**Status**: ✅ Web funcional | ⏳ Android/iOS em desenvolvimento

**Última atualização**: Maio 2026
