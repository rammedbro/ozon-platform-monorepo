declare module '*.yml' {
  const content: string;

  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}
