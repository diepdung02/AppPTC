
import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('../assets/fonts/.ttf'),
    'CustomFont-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;
