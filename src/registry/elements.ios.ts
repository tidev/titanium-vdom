import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement('BlurView', () => Ti.UI.iOS.createBlurView, { typeName: 'Ti.UI.iOS.BlurView' });
    registry.registerElement('DashboardView', () => Ti.UI.createDashboardView, { typeName: 'Ti.UI.DashboardView' });
    registry.registerElement('DashboardItem', () => Ti.UI.createDashboardItem, { typeName: 'Ti.UI.DashboardItem' });
    registry.registerElement('LivePhotoView', () => Ti.UI.iOS.createLivePhotoView, { typeName: 'Ti.UI.iOS.LivePhotoView' });
    registry.registerElement('Stepper', () => Ti.UI.iOS.createStepper, { typeName: 'Ti.UI.iOS.Stepper' });
}
