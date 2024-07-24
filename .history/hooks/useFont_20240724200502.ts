
import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'CustomFont-r': require('../.ttf'),
    'CustomFont-Bold': require('../assets/fonts/CustomFont-Bold.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;
