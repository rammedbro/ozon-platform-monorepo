import type { IRenderContext, IServerContext } from '@bx-fe/platform-types';

export const getContextPublicPath = (serverContext: IServerContext, renderContext: IRenderContext = {}) => {
  if (renderContext.alternateCdn) {
    return serverContext.publicPathAlternate;
  }

  return serverContext.publicPath;
};
