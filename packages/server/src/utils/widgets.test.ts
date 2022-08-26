import { getFlatWidgetArray } from './widgets';

import { layoutMock } from '~/src/servers/app/vue-renderer/template-stream/__mocks__/layout';

describe('parseRequestWidgets', () => {
  it('should work correctly', () => {
    const widgets = getFlatWidgetArray(layoutMock);

    expect(widgets).toStrictEqual([
      {
        vertical: 'cms',
        component: 'topBar',
        critical: false,
        name: 'CmsTopBar',
        replaced: undefined,
        stateId: 'topBar-214233-default-1',
        version: 1,
      },
      {
        vertical: 'cms',
        component: 'header',
        critical: false,
        name: 'CmsHeader',
        replaced: undefined,
        stateId: 'header-214244-default-1',
        version: 2,
      },
      {
        vertical: 'cms',
        component: 'catalogMenu',
        critical: false,
        name: 'CmsCatalogMenu',
        replaced: undefined,
        stateId: 'catalogMenu-219775-default-1',
        version: 1,
      },
      {
        vertical: 'catalog',
        component: 'searchBarDesktop',
        critical: false,
        name: 'CatalogSearchBarDesktop',
        replaced: undefined,
        stateId: 'searchBarDesktop-214236-default-1',
        version: 1,
      },
      {
        vertical: 'catalog',
        component: 'searchContextPopup',
        critical: false,
        name: 'CatalogSearchContextPopup',
        replaced: undefined,
        stateId: 'searchContextPopup-214235-default-1',
        version: 1,
      },
      {
        vertical: 'layout',
        component: 'container',
        critical: false,
        name: 'LayoutContainer',
        replaced: undefined,
        stateId: 'container-180558-default-1',
        version: 1,
      },
      {
        vertical: 'rtb',
        component: 'advBanner',
        critical: false,
        name: 'RtbAdvBanner',
        replaced: undefined,
        stateId: 'advBanner-211221-default-1',
        version: 1,
      },
      {
        vertical: 'story',
        component: 'storiesAll',
        critical: false,
        name: 'StoryStoriesAll',
        replaced: undefined,
        stateId: 'storiesAll-236547-default-1',
        version: 1,
      },
      {
        vertical: 'cms',
        component: 'couponPromo',
        critical: false,
        name: 'CmsCouponPromo',
        replaced: undefined,
        stateId: 'couponPromo-227482-default-1',
        version: 1,
      },
      {
        vertical: 'cms',
        component: 'banner',
        critical: false,
        name: 'CmsBanner',
        replaced: undefined,
        stateId: 'banner-235682-default-1',
        version: 1,
      },
      {
        vertical: 'cms',
        component: 'customHtml',
        critical: false,
        name: 'CmsCustomHtml',
        replaced: undefined,
        stateId: 'customHtml-190162-default-1',
        version: 1,
      },
      {
        vertical: 'testWidgetProvider',
        component: 'testComponentResolves',
        critical: false,
        name: 'TestWidgetProviderTestComponentResolves',
        replaced: undefined,
        stateId: 'testComponentResolves-232942-default-1',
        version: 1,
      },
      {
        vertical: 'cms',
        component: 'footer',
        critical: false,
        name: 'CmsFooter',
        replaced: undefined,
        stateId: 'footer-180581-default-1',
        version: 1,
      },
      {
        vertical: 'cart',
        component: 'total',
        critical: false,
        name: 'CartTotal',
        replaced: undefined,
        stateId: undefined,
        version: 2,
      }
    ]);
  });
});
