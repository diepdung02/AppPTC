const translateText = async (text: string, targetLanguage: string) => {
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text, // Đặt văn bản cần dịch vào đây
          source: "auto",
          target: targetLanguage,
          format: "text"
        }),
        headers: { "Content-Type": "application/json" }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result.translatedText; // Hoặc dựa trên cấu trúc phản hồi của API
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // Hoặc giá trị mặc định nào đó
    }
  };
  

  