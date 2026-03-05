export const tokens = {
  colors: {
    foregrounds: {
      base: '#1a1916',
      subtle: '#7b736c',
      onColor: '#ffffff',
    },
    backgrounds: {
      muted: '#fcfbf9',
      tertiary: '#eeece6',
    },
    borders: {
      base: '#eeece6',
    },
    buttons: {
      yellow: '#fdffa2',
    },
  },
  typography: {
    families: {
      sans: 'Inter',
      display: 'Rhymes Display',
      mono: 'Roboto Mono',
    },
    sizes: {
      xs: '14px',
      'body-2': '16px',
      'body-1': '18px',
      l: '24px',
      h5: '37px',
      h3: '62px',
    },
    weights: {
      regular: 400,
      medium: 500,
    },
    lineHeights: {
      xs: '20px',
      s: '24px',
      l: '30px',
      h5: '37px',
      h3: '56px',
    },
  },
  spacing: {
    4: '4px',
    12: '12px',
    20: '20px',
    32: '32px',
    60: '60px',
  },
  radius: {
    8: '8px',
    12: '12px',
    16: '16px',
  },
} as const;

export type Tokens = typeof tokens;
