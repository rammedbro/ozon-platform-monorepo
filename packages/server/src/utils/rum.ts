export const rum = (nonceTag: string): string => {
  return `<script ${nonceTag} src="//cdn-rum.ngenix.net/js/loader.js" async></script>`;
};
