export const $logger: any = {
  requests: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  critical: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  log: jest.fn(),
  reset: () => jest.resetAllMocks()
};
