import { TitaniumElementRegistry } from 'vdom/index';

// these two dummy imports are required for the dynamic import to work in karma-typescript
import * as _1 from '../../../../src/registry/elements.android';
import * as _2 from '../../../../src/registry/elements.ios';

const platformName = Ti.Platform.osname === 'iphone' ? 'ios' : Ti.Platform.osname;
const importPromise = import(`../../../../src/registry/elements.${platformName}`);

describe('element registration', () => {
    let registry: TitaniumElementRegistry;
    // tslint:disable-next-line
    let registerTitaniumElements = (registry: TitaniumElementRegistry) => {};

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
        expect(registry.hasElement('Label')).toBeTruthy();
        expect(registry.hasElement('View')).toBeTruthy();
    });

    it('should register factory function for all elements', () => {
        registerTitaniumElements(registry);
        const registerdElements = (registry as any).elements as Map<string, any>;
        registerdElements.forEach((elementMeta, elementName) => {
            const factoryFunction = registry.getViewFactory(elementName);
            expect(factoryFunction).toEqual(jasmine.any(Function));
        });
    });
});
