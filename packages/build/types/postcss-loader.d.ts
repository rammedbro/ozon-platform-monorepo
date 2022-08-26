declare module 'postcss-loader' {
  interface IPostcssLoaderOptions {
    config?: string;
    plugins?: (string | [string, Record<string, any>])[];
  }

  export { IPostcssLoaderOptions };
}
