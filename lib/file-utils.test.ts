import { describe, it, expect, vi } from 'vitest';
import { extractTextFromFile } from './file-utils';

// Mock pdfjs-dist
vi.mock('pdfjs-dist', () => {
  return {
    getDocument: vi.fn(() => ({
      promise: Promise.resolve({
        numPages: 1,
        getPage: vi.fn(() => Promise.resolve({
          getTextContent: vi.fn(() => Promise.resolve({
            items: [{ str: 'PDF Content' }]
          }))
        }))
      })
    })),
    GlobalWorkerOptions: { workerSrc: '' },
    version: 'mocked-version'
  };
});

// Mock mammoth
vi.mock('mammoth', () => ({
  default: {
    extractRawText: vi.fn(() => Promise.resolve({ value: 'DOCX Content' }))
  }
}));

describe('extractTextFromFile', () => {
  it('extracts text from text/plain file', async () => {
    const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
    const text = await extractTextFromFile(file);
    expect(text).toBe('Hello World');
  });

  it('extracts text from application/pdf file', async () => {
    const file = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    const text = await extractTextFromFile(file);
    expect(text.trim()).toBe('PDF Content');
  });

  it('extracts text from DOCX file', async () => {
    const file = new File(['dummy'], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const text = await extractTextFromFile(file);
    expect(text).toBe('DOCX Content');
  });

  it('returns empty string for images', async () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    // This assumes extractTextFromFile returns '' for images as planned
    // If it throws, the test will fail which is good.
    try {
        const text = await extractTextFromFile(file);
        expect(text).toBe('');
    } catch (e: any) {
        // If it throws "Unsupported file type", then my check logic is wrong or missing
        // But based on my previous thought, I added the check.
        // Let's see if the test passes.
        // If it throws, the implementation is failing to return empty string.
        throw e;
    }
  });
});
