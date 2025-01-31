// src/components/ui/use-toast.ts

import { useState } from 'react';

export interface Toast {
  title: string;
  description: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1)); // Remove toast after 3 seconds
    }, 3000);
  };

  return { toast, toasts };
}
