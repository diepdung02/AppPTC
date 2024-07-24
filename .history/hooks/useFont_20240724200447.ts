
import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('../assets/fonts/.ttf'),
    'CustomFont-Bold': require('../assets/fonts/CustomFont-Bold.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;
