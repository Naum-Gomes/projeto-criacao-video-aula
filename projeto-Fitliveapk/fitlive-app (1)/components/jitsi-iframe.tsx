import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { cn } from '@/lib/utils';

interface JitsiIframeProps {
  roomName: string;
  displayName: string;
  onConferenceTerminated?: () => void;
  onConferenceJoined?: () => void;
  className?: string;
}

/**
 * Componente Jitsi Meet usando iframe para web
 * Usa a instância pública do Jitsi Meet (meet.jit.si)
 */
export function JitsiIframe({
  roomName,
  displayName,
  onConferenceTerminated,
  onConferenceJoined,
  className,
}: JitsiIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Apenas para web
    if (Platform.OS !== 'web') {
      return;
    }

    // Carregar o script do Jitsi Meet
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;

    script.onload = () => {
      initJitsi();
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initJitsi = () => {
    // @ts-ignore - Jitsi Meet API global
    if (typeof window !== 'undefined' && window.JitsiMeetExternalAPI) {
      // @ts-ignore
      const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName: roomName,
        parentNode: containerRef.current,
        configOverwrite: {
          startAudioOnly: false,
          disableSimulcast: false,
          enableLayerSuspension: true,
          startWithAudioMuted: false,
          startWithVideoMuted: false,
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
        },
        userInfo: {
          displayName: displayName,
        },
      });

      // Eventos da conferência
      api.addEventListener('videoConferenceJoined', () => {
        setIsLoaded(true);
        onConferenceJoined?.();
      });

      api.addEventListener('videoConferenceLeft', () => {
        onConferenceTerminated?.();
      });

      api.addEventListener('readyToClose', () => {
        onConferenceTerminated?.();
      });

      // Cleanup
      return () => {
        api.dispose();
      };
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
            A integração nativa do Jitsi Meet requer configuração adicional
            no projeto Android/iOS
          </Text>
        </View>
      </View>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
      }}
      className={className}
    />
  );
}
