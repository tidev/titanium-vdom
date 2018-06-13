import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement('BlurView', () => Ti.UI.iOS.createBlurView, { typeName: 'Ti.UI.iOS.BlurView' });
    registry.registerElement('NavigationWindow', () => Ti.UI.iOS.createNavigationWindow, { typeName: 'Ti.UI.iOS.NavigationWindow', detached: true });
    registry.registerElement('TabbedBar', () => Ti.UI.iOS.createTabbedBar, { typeName: 'Ti.UI.iOS.TabbedBar' });
}
