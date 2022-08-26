export const TEAMS_BUILD_PRESETS = {
  checkout: ['checkcart', 'checkout', 'cart', 'cms', 'udm', 'composer', 'common', 'order-done', 'payments', 'shared', 'csma', 'layout'],
  travel: ['csma', 'cms', 'udm', 'composer', 'layout', 'travel', 'common', 'bfs', 'pdp'],
  chat: ['csma', 'cms', 'udm', 'composer', 'layout', 'communication', 'messenger', 'common'],
  ozoncard: ['wallet', 'cms', 'udm', 'composer', 'common', 'shared', 'csma', 'layout'],
  rms: ['cms', 'csma', 'layout', 'composer', 'pdp', 'rms', 'udm', 'my-profile'],
  pdp: ['layout', 'pdp,', 'shared', 'composer', 'reviews'],
  classified: ['layout', 'classified', 'shared', 'composer', 'cms'],
  insurance: ['insurance', 'search', 'cms', 'udm', 'composer', 'common', 'shared', 'csma', 'layout']
};

export const RESERVED_TAGS = [
  // HTML tags
  'html', 'body', 'base', 'head', 'link', 'meta', 'style', 'title', 'address',
  'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'hgroup', 'nav', 'section', 'div', 'dd', 'dl', 'dt', 'figcaption', 'figure',
  'picture', 'hr', 'img', 'li', 'main', 'ol', 'p', 'pre', 'ul', 'a', 'b', 'abbr',
  'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark',
  'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub',
  'sup', 'time', 'u', 'var', 'wbr', 'area', 'audio', 'map', 'track', 'video',
  'embed', 'object', 'param', 'source', 'canvas', 'script', 'noscript', 'del',
  'ins', 'caption', 'col', 'colgroup', 'table', 'thead', 'tbody', 'td', 'th', 'tr',
  'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter',
  'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details',
  'dialog', 'menu', 'menuitem', 'summary', 'content', 'element', 'shadow', 'template',
  'blockquote', 'iframe', 'tfoot',
  // SVG tags
  'svg', 'animate', 'circle', 'clippath', 'cursor', 'defs', 'desc', 'ellipse', 'filter',
  'font-face', 'foreignObject', 'g', 'glyph', 'image', 'line', 'marker', 'mask',
  'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'rect', 'switch', 'symbol',
  'text', 'textpath', 'tspan', 'use', 'view',
  // Vue built-in tags
  'slot', 'component'
];
