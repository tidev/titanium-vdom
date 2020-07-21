import { registerCommonTitaniumElements } from './elements-common';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerTitaniumElements(registry: TitaniumElementRegistry) {
    registerCommonTitaniumElements(registry);

    registry.registerElement({
        tagName: 'BlurView',
        resolveFactory: () => Ti.UI.iOS.createBlurView,
        meta: {
            typeName: 'Ti.UI.iOS.BlurView'
        }
    });
    registry.registerElement({
        tagName: 'ButtonBar',
        resolveFactory: () => Ti.UI.createButtonBar,
        meta: {
            typeName: 'Ti.UI.ButtonBar'
        }
    });
    registry.registerElement({
        tagName: 'DashboardView',
        resolveFactory: () => Ti.UI.createDashboardView,
        meta: {
            typeName: 'Ti.UI.DashboardView'
        }
    });
    registry.registerElement({
        tagName: 'DashboardItem',
        resolveFactory: () => Ti.UI.createDashboardItem,
        meta: {
            typeName: 'Ti.UI.DashboardItem'
        }
    });
    registry.registerElement({
        tagName: 'LivePhotoView',
        resolveFactory: () => Ti.UI.iOS.createLivePhotoView,
        meta: {
            typeName: 'Ti.UI.iOS.LivePhotoView'
        }
    });
    registry.registerElement({
        tagName: 'Stepper',
        resolveFactory: () => Ti.UI.iOS.createStepper,
        meta: {
            typeName: 'Ti.UI.iOS.Stepper'
        }
    });
}
