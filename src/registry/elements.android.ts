import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement('CardView', () => Ti.UI.Android.createCardView, { typeName: 'Ti.UI.Android.CardView' });
    registry.registerElement('DrawerLayout', () => Ti.UI.Android.createDrawerLayout, { typeName: 'Ti.UI.Android.DrawerLayout' });
    registry.registerElement('ProgressIndicator', () => Ti.UI.Android.createProgressIndicator, { typeName: 'Ti.UI.Android.ProgressIndicator' });
    registry.registerElement('SearchView', () => Ti.UI.Android.createSearchView, { detached: true, typeName: 'Ti.UI.Android.SearchView' });
}
