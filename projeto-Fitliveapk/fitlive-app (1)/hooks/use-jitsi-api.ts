import { useEffect, useRef, useState, useCallback } from 'react';
import { Platform } from 'react-native';

interface JitsiConfig {
  roomName: string;
  displayName: string;
  userEmail?: string;
  userAvatar?: string;
}

interface JitsiApiInstance {
  dispose: () => void;
  executeCommand: (command: string, ...args: any[]) => void;
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
}

/**
 * Hook para gerenciar a API do Jitsi Meet
 * Fornece métodos para controlar a conferência
 */
export function useJitsiApi(config: JitsiConfig) {
  const apiRef = useRef<JitsiApiInstance | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);

  // Inicializar Jitsi
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const initJitsi = () => {
      // @ts-ignore - Jitsi Meet API global
      if (typeof window !== 'undefined' && window.JitsiMeetExternalAPI) {
        try {
          // @ts-ignore
          const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
            roomName: config.roomName,
            width: '100%',
            height: '100%',
            parentNode: document.getElementById('jitsi-container'),
            configOverwrite: {
              startAudioOnly: false,
              disableSimulcast: false,
              enableLayerSuspension: true,
              startWithAudioMuted: false,
              startWithVideoMuted: false,
              prejoinPageEnabled: false,
              toolbarButtons: [
                'microphone',
                'camera',
                'desktop',
                'fullscreen',
                'hangup',
                'profile',
                'chat',
                'settings',
                'raisehand',
                'videoquality',
                'filmstrip',
              ],
            },
            interfaceConfigOverwrite: {
              DEFAULT_BACKGROUND: '#000000',
              SHOW_JITSI_WATERMARK: false,
              MOBILE_APP_PROMO: false,
              TOOLBAR_BUTTONS: [
                'microphone',
                'camera',
                'desktop',
                'fullscreen',
                'hangup',
              ],
            },
            userInfo: {
              displayName: config.displayName,
              email: config.userEmail,
              avatarUrl: config.userAvatar,
            },
          });

          apiRef.current = api;

          // Eventos
          api.addEventListener('videoConferenceJoined', () => {
            setIsConnected(true);
          });

          api.addEventListener('videoConferenceLeft', () => {
            setIsConnected(false);
          });

          api.addEventListener('readyToClose', () => {
            setIsConnected(false);
          });

          api.addEventListener('participantJoined', () => {
            setParticipantCount((prev) => prev + 1);
          });

          api.addEventListener('participantLeft', () => {
            setParticipantCount((prev) => Math.max(1, prev - 1));
          });

          api.addEventListener('audioMuteStatusChanged', (data: any) => {
            setIsMuted(data.muted);
          });

          api.addEventListener('videoMuteStatusChanged', (data: any) => {
            setIsCameraOff(data.muted);
          });
        } catch (error) {
          console.error('Erro ao inicializar Jitsi:', error);
        }
      }
    };

    // Carregar script do Jitsi
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = initJitsi;
    document.body.appendChild(script);

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [config.roomName, config.displayName]);

  // Controlar áudio
  const toggleAudio = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio');
    }
  }, []);

  // Controlar vídeo
  const toggleVideo = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleVideo');
    }
  }, []);

  // Compartilhar tela
  const toggleScreenShare = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleShareScreen');
    }
  }, []);

  // Sair da conferência
  const hangUp = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('hangup');
    }
  }, []);

  // Enviar mensagem de chat
  const sendChatMessage = useCallback((message: string) => {
    if (apiRef.current) {
      apiRef.current.executeCommand('sendChatMessage', message);
    }
  }, []);

  // Elevar mão
  const raiseHand = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('raiseHand');
    }
  }, []);

  // Mutar todos (apenas para moderadores)
  const muteEveryone = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand('muteEveryone');
    }
  }, []);

  return {
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
  };
}
