import type { IPostcssConfig } from 'postcss';

export const postcssConfig: IPostcssConfig = {
  plugins: {
    'postcss-nested': {},
    'autoprefixer': {},
    'postcss-assets': {}
  }
};
