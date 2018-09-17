import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement('BlurView', () => Ti.UI.iOS.createBlurView, { typeName: 'Ti.UI.iOS.BlurView' });
    registry.registerElement('ButtonBar', () => Ti.UI.createButtonBar, { typeName: 'Ti.UI.iOS.ButtonBar' });
    registry.registerElement('DashboardView', () => Ti.UI.createDashboardView, { typeName: 'Ti.UI.DashboardView' });
    registry.registerElement('DashboardItem', () => Ti.UI.createDashboardItem, { typeName: 'Ti.UI.DashboardItem' });
    registry.registerElement('LivePhotoView', () => Ti.UI.iOS.createLivePhotoView, { typeName: 'Ti.UI.iOS.LivePhotoView' });
    registry.registerElement('NavigationWindow', () => Ti.UI.iOS.createNavigationWindow, { typeName: 'Ti.UI.iOS.NavigationWindow', detached: true });
    registry.registerElement('Stepper', () => Ti.UI.iOS.createStepper, { typeName: 'Ti.UI.iOS.Stepper' });
    registry.registerElement('TabbedBar', () => Ti.UI.iOS.createTabbedBar, { typeName: 'Ti.UI.iOS.TabbedBar' });
}
