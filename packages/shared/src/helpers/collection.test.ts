import { makeCollection } from './collection';

describe('@platform/helpers/collection >>> makeCollection', () => {
  it('should work correctly', () => {
    const widgets = {
      CommonEmptyState: {
        content: {
          desktop: {
            assets: [
              'csma-desktop-common-empty-state.9323f0ea62869b07f2ab.css',
              'csma-desktop-common-empty-state.82acb31f8445bc9f6f4d.js'
            ]
          },
          mobile: {
            assets: [
              'csma-mobile-common-empty-state.bb1fb8c086e29502620c.css',
              'csma-mobile-common-empty-state.2567e5155bfcce015164.js'
            ]
          }
        }
      },
      CsmaModalLayoutContainer: {
        content: {
          assets: [
            'csma-all-modal-layout-container.d7098b24115e5f75bfed.css',
            'csma-all-modal-layout-container.636bdfb1d2ff28a37b98.js'
          ]
        }
      },
      CsmaOrderTracking: {
        content: {
          desktop: {
            default: {
              assets: [
                'composer-components.6714eee5974ae8e4a478.css',
                'composer-components.0ea651113b00c9654e74.js',
                'csma-desktop-order-tracking.9f659a8405ca9117ce0e.css',
                'csma-desktop-order-tracking.61913ff61ff00fb994b2.js'
              ]
            },
            versions: {
              3: {
                assets: [
                  'csma-desktop-order-tracking-v3.cf7f2c7b87abfc6d0914.css',
                  'csma-desktop-order-tracking-v3.bab61b7df562c884a0d5.js'
                ]
              }
            }
          },
          mobile: {
            assets: [
              'composer-components.6714eee5974ae8e4a478.css',
              'composer-components.0ea651113b00c9654e74.js',
              'csma-mobile-order-tracking.dd9b7fff13d8eb96438f.css',
              'csma-mobile-order-tracking.fbc0809946ca4f1c8b92.js'
            ]
          }
        }
      }
    };

    const chunks = makeCollection(widgets);

    expect(chunks).toStrictEqual([
      'csma-desktop-common-empty-state.9323f0ea62869b07f2ab.css',
      'csma-desktop-common-empty-state.82acb31f8445bc9f6f4d.js',
      'csma-mobile-common-empty-state.bb1fb8c086e29502620c.css',
      'csma-mobile-common-empty-state.2567e5155bfcce015164.js',
      'csma-all-modal-layout-container.d7098b24115e5f75bfed.css',
      'csma-all-modal-layout-container.636bdfb1d2ff28a37b98.js',
      'composer-components.6714eee5974ae8e4a478.css',
      'composer-components.0ea651113b00c9654e74.js',
      'csma-desktop-order-tracking.9f659a8405ca9117ce0e.css',
      'csma-desktop-order-tracking.61913ff61ff00fb994b2.js',
      'csma-desktop-order-tracking-v3.cf7f2c7b87abfc6d0914.css',
      'csma-desktop-order-tracking-v3.bab61b7df562c884a0d5.js',
      'csma-mobile-order-tracking.dd9b7fff13d8eb96438f.css',
      'csma-mobile-order-tracking.fbc0809946ca4f1c8b92.js'
    ]);
  });
});
