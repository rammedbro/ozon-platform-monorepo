export type TCommanderAction = (...args: any[]) => void | Promise<void>;
export type TCommanderActionWithPlatformOptions<T extends TCommanderAction> = (...args: Parameters<T>) => Promise<void>;
