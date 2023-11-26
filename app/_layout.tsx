import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import { queryClient } from '@/queryClient';
import config from '@/tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Theme name="blue">
            <Slot />
          </Theme>
        </QueryClientProvider>
        <StatusBar barStyle="light-content" />
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
