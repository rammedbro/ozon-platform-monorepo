import type Postcss from 'postcss';

declare module 'postcss' {
  export interface IPostcssConfig {
    plugins: Record<string, Record<string, any>>;
  }

  export default {
    IPostcssConfig,
    ...Postcss,
  };
}
