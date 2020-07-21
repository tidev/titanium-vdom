import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement({
        tagName: 'CardView',
        resolveFactory: () => Ti.UI.Android.createCardView,
        meta: {
            typeName: 'Ti.UI.Android.CardView'
        }
    });
    registry.registerElement({
        tagName: 'DrawerLayout',
        resolveFactory: () => Ti.UI.Android.createDrawerLayout,
        meta: {
            typeName: 'Ti.UI.Android.DrawerLayout'
        }
    });
    registry.registerElement({
        tagName: 'ProgressIndicator',
        resolveFactory: () => Ti.UI.Android.createProgressIndicator,
        meta: {
            typeName: 'Ti.UI.Android.ProgressIndicator',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'SearchView',
        resolveFactory: () => Ti.UI.Android.createSearchView,
        meta: {
            typeName: 'Ti.UI.Android.SearchView',
            detached: true
        }
    });
}
