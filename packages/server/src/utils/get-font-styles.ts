export const getFontStyle = (nonceTag: string, renderContext: Record<string, any>): string => {
  const fontNameBold = 'GT-Eesti-Pro-Display-Medium';
  const fontNameNormal = 'GT-Eesti-Pro-Text-Book';

  const fontFormat = `woff${renderContext.isModern ? 2 : ''}`;

  const fontLinks = {
    'bold': {
      link: `//${renderContext.staticCdn}.ozone.ru/graphics/test/fonts/${fontNameBold}.${fontFormat}`
    },
    'normal': {
      link: `//${renderContext.staticCdn}.ozone.ru/graphics/test/fonts/${fontNameNormal}.${fontFormat}`
    },
  };

  const cssFontBold = `url('${fontLinks['bold'].link}') format('${fontFormat}')`;
  const cssFontNormal = `url('${fontLinks['normal'].link}') format('${fontFormat}')`;

  const preload = `
    <link ${nonceTag} internal rel="preload" as="font" href="${fontLinks['bold'].link}" type="font/${fontFormat}" crossorigin="anonymous">
    <link ${nonceTag} internal rel="preload" as="font" href="${fontLinks['normal'].link}" type="font/${fontFormat}" crossorigin="anonymous">
  `;

  return preload + `
  <style>
  @font-face {
    font-family: 'GTEestiPro';
    font-weight: 700;
    font-display: swap;
    src: ${cssFontBold};
  }
  @font-face {
    font-family: 'GTEestiPro';
    font-weight: 400;
    font-display: swap;
    src: ${cssFontNormal};
  }
  </style>
  `;
};
