import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { cn } from '@/lib/utils';

interface JitsiAdvancedProps {
  roomName: string;
  displayName: string;
  onConferenceTerminated?: () => void;
  onConferenceJoined?: () => void;
  onParticipantJoined?: (count: number) => void;
  className?: string;
}

/**
 * Componente avançado do Jitsi Meet com controles completos
 * Suporta web com integração via iframe
 */
export function JitsiAdvanced({
  roomName,
  displayName,
  onConferenceTerminated,
  onConferenceJoined,
  onParticipantJoined,
  className,
}: JitsiAdvancedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Carregar script do Jitsi Meet
    const loadJitsi = () => {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;

      script.onload = () => {
        initJitsiMeet();
      };

      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    };

    loadJitsi();
  }, []);

  const initJitsiMeet = () => {
    if (!containerRef.current) return;

    // @ts-ignore - Jitsi Meet API global
    if (typeof window !== 'undefined' && window.JitsiMeetExternalAPI) {
      try {
        // @ts-ignore
        const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: roomName,
          width: '100%',
          height: '100%',
          parentNode: containerRef.current,
          configOverwrite: {
            startAudioOnly: false,
            disableSimulcast: false,
            enableLayerSuspension: true,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            prejoinPageEnabled: false,
            disableInviteFunctions: false,
            defaultLanguage: 'pt-BR',
          },
          interfaceConfigOverwrite: {
            DEFAULT_BACKGROUND: '#000000',
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            MOBILE_APP_PROMO: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'closedcaptions',
              'desktop',
              'fullscreen',
              'fodeviceselection',
              'hangup',
              'profile',
              'chat',
              'recording',
              'livestreaming',
              'etherpad',
              'settings',
              'raisehand',
              'videoquality',
              'filmstrip',
              'invite',
              'feedback',
              'stats',
              'shortcuts',
              'tileview',
              'download',
              'help',
              'mute-everyone',
              'security',
            ],
            SETTINGS_SECTIONS: [
              'devices',
              'language',
              'moderator',
              'profile',
              'calendar',
              'sounds',
              'more',
            ],
            VERTICAL_FILMSTRIP: false,
            FILMSTRIP_BREAKPOINT: 120,
            HIDE_INVITE_BUTTON: false,
          },
          userInfo: {
            displayName: displayName,
          },
        });

        apiRef.current = api;

        // Eventos de conferência
        api.addEventListener('videoConferenceJoined', () => {
          setIsConnected(true);
          onConferenceJoined?.();
        });

        api.addEventListener('videoConferenceLeft', () => {
          setIsConnected(false);
          onConferenceTerminated?.();
        });

        api.addEventListener('readyToClose', () => {
          setIsConnected(false);
          onConferenceTerminated?.();
        });

        // Eventos de participantes
        api.addEventListener('participantJoined', () => {
          setParticipantCount((prev) => {
            const newCount = prev + 1;
            onParticipantJoined?.(newCount);
            return newCount;
          });
        });

        api.addEventListener('participantLeft', () => {
          setParticipantCount((prev) => Math.max(1, prev - 1));
        });

        // Eventos de áudio/vídeo
        api.addEventListener('audioMuteStatusChanged', (data: any) => {
          setIsMuted(data.muted);
        });

        api.addEventListener('videoMuteStatusChanged', (data: any) => {
          setIsCameraOff(data.muted);
        });

        api.addEventListener('screenSharingStatusChanged', (data: any) => {
          setIsScreenSharing(data.on);
        });
      } catch (error) {
        console.error('Erro ao inicializar Jitsi Meet:', error);
      }
    }
  };

  const handleToggleAudio = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleAudio');
    }
  };

  const handleToggleVideo = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleVideo');
    }
  };

  const handleToggleScreenShare = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('toggleShareScreen');
    }
  };

  const handleHangUp = () => {
    if (apiRef.current) {
      apiRef.current.executeCommand('hangup');
    }
  };

  if (Platform.OS !== 'web') {
    return (
      <View className={cn('bg-surface items-center justify-center gap-4 flex-1', className)}>
        <Text className="text-4xl">🎥</Text>
        <View className="items-center gap-2">
          <Text className="text-lg font-semibold text-foreground">
            Jitsi Meet
          </Text>
          <Text className="text-sm text-muted">
            Sala: {roomName}
          </Text>
          <Text className="text-sm text-muted">
            Usuário: {displayName}
          </Text>
          <Text className="text-xs text-muted mt-4 text-center px-4">
            Disponível apenas em web. Para Android/iOS, use react-native-jitsi-meet
          </Text>
        </View>
      </View>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        position: 'relative',
      }}
      className={className}
    >
      {/* Jitsi Container */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Status Bar */}
      {isConnected && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '8px 12px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
            fontSize: '12px',
            zIndex: 100,
          }}
        >
          <span>👥 {participantCount} participante(s)</span>
          <span>
            {isMuted ? '🔇 Mudo' : '🎤'} | {isCameraOff ? '📹 Câmera desligada' : '📷'}
          </span>
        </div>
      )}

      {/* Controles Flutuantes */}
      {isConnected && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            display: 'flex',
            gap: '10px',
            zIndex: 100,
          }}
        >
          <button
            onClick={handleToggleAudio}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isMuted ? '#EF4444' : '#22C55E',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {isMuted ? '🔇 Ativar' : '🎤 Mutar'}
          </button>

          <button
            onClick={handleToggleVideo}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isCameraOff ? '#EF4444' : '#22C55E',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {isCameraOff ? '📹 Ligar' : '📷 Desligar'}
          </button>

          <button
            onClick={handleToggleScreenShare}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isScreenSharing ? '#FF6B35' : '#004E89',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {isScreenSharing ? '🖥️ Parando' : '🖥️ Compartilhar'}
          </button>

          <button
            onClick={handleHangUp}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#EF4444',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            📞 Sair
          </button>
        </div>
      )}
    </div>
  );
}
