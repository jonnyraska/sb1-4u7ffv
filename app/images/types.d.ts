declare global {
  interface Window {
    addImagesToGrid: (images: Array<{
      id: string;
      url: string;
      name: string;
      tags: string[];
      folderId: string | null;
    }>) => void;
  }
}