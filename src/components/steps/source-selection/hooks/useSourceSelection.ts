import { SelectedFile } from "../types";

export const useSourceSelection = (onFileSelect: (file: SelectedFile | null) => void) => {
  return { onFileSelect };
};
