import type { Media } from '@content-island/api-client';

export interface MiniBio {
  id: string;
  language: 'es';
  title: string;
  name: string;
  role: string;
  description: string;
  image: Media;
  imageAlt: string;
}

export type MiniBioType = 'hero' | 'card';
