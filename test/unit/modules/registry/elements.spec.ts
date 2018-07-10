import { TitaniumElementRegistry } from 'vdom/index';

// these two dummy imports are required for the dynamic import to work in karma-typescript
import * as _1 from '../../../../src/registry/elements.android';
import * as _2 from '../../../../src/registry/elements.ios';

const platformName = Ti.Platform.osname === 'iphone' ? 'ios' : Ti.Platform.osname;
const importPromise = import(`../../../../src/registry/elements.${platformName}`);

describe('element registration', () => {
    let registry: TitaniumElementRegistry;
    // tslint:disable-next-line:no-empty
    let registerTitaniumElements = (_: TitaniumElementRegistry) => {};
    const commonElements = [
        'ActivityIndicator',
        'AlertDialog',
        'Button',
        'ImageView',
        'Label',
        'ListView',
        'ListSection',
        'Picker',
        'PickerColumn',
        'PickerRow',
        'ProgressBar',
        'RefreshControl',
        'ScrollableView',
        'ScrollView',
        'SearchBar',
        'Slider',
        'Switch',
        'Tab',
        'TabGroup',
        'TextArea',
        'TextField',
        'Toolbar',
        'View',
        'WebView',
        'Window'
    ];
    const platformElements: { [k: string]: string[] } = {
        android: [
            'CardView'
        ],
        ios: [
            'BlurView',
            'DashboardView',
            'DashboardItem',
            'NavigationWindow',
            'TabbedBar'
        ]
    };

    beforeAll(done => {
        importPromise.then(module => {
            registerTitaniumElements = module.registerTitaniumElements;
            done();
        }, done.fail);
    });

    beforeEach(() => {
        registry = TitaniumElementRegistry.getInstance();
    });

    afterEach(() => {
        (TitaniumElementRegistry as any)._instance = null;
    });

    it('should register common Titanium elements', () => {
        registerTitaniumElements(registry);
        for (const tagName of commonElements) {
            expect(registry.hasElement(tagName)).toBeTruthy(`Expected registry to have common element ${tagName}.`);
        }
    });

    it('should register platform specific elements', () => {
        registerTitaniumElements(registry);
        for (const tagName of platformElements[platformName]) {
            expect(registry.hasElement(tagName)).toBeTruthy(`Expected registry to have ${platformName} specific element ${tagName}.`);
        }
    });

    it('should register factory function for all elements', () => {
        registerTitaniumElements(registry);
        const registeredElements = (registry as any).elements as Map<string, any>;
        registeredElements.forEach((elementMeta, elementName) => {
            const factoryFunction = registry.getViewFactory(elementName);
            expect(factoryFunction).toEqual(jasmine.any(Function), `Expected element ${elementName} to have factory function.`);
        });
    });
});
