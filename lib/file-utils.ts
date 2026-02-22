import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set worker source for PDF.js
// We use a CDN to avoid complex Vite worker configuration in this environment.
// This ensures the worker is available at runtime.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;

  try {
    if (fileType === 'text/plain') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string || '');
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    }

    if (fileType === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      // Using generic type for loading task to avoid strict type issues with specific PDF.js versions
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // Item structure can vary, but generally has 'str'
        const pageText = content.items.map((item: any) => item.str || '').join(' ');
        text += pageText + '\n';
      }
      return text;
    }

    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // DOCX
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }

    // Fallback or error for unsupported types (images are handled separately in components)
    if (fileType.startsWith('image/')) {
       // Images are not handled here for text extraction, returning empty string or specific message
       // The components handle images via base64 for Gemini.
       return '';
    }

    throw new Error(`Unsupported file type: ${fileType}`);
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw error;
  }
}
