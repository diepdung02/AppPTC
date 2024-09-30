// useCustomFonts.js
import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'CustomFont-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'CustomFont-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;