declare module 'memcache-plus' {
  interface IMemcachedOptions {
    debug: boolean;
    reconnect: number;
    timeout: number;
    failures: number;
    retry: number;
  }

  class Memcached {
    constructor(url: string, options: IMemcachedOptions): void;
  }

  export default Memcached;
}
