
import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('../assets/fonts/Roboto-Regular.ttf.ttf'),
    'CustomFont-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'CustomFont-I': require('../assets/fonts/Roboto-Italic.ttf.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;
