'use client';

import { enableVisualEditing } from '@sanity/visual-editing';
import { useEffect } from 'react';

export function VisualEditing() {
  useEffect(() => {
    enableVisualEditing();
  }, []);

  return null;
}
