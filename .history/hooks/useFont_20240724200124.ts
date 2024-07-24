// hooks/useFonts.ts
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('../assets/fonts/CustomFont-Regular.ttf'),
    'CustomFont-Bold': require('../assets/fonts/CustomFont-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return fontsLoaded;
};

export default useCustomFonts;
