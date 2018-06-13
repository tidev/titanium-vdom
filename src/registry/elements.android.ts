import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement('CardView', () => Ti.UI.Android.createCardView, { typeName: 'Ti.UI.Android.CardView' });
}
