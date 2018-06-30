import { TitaniumElementRegistry } from 'vdom/index';

describe('TitaniumElementRegistry', () => {
    let registry: TitaniumElementRegistry;

    beforeEach(() => {
        registry = TitaniumElementRegistry.getInstance();
    });

    afterEach(() => {
        (TitaniumElementRegistry as any)._instance = null;
    });

    describe('getInstance', () => {
        it('should return the same instance on consecutive calls', () => {
            const reg = TitaniumElementRegistry.getInstance();
            expect(registry).toBe(reg);
        });
    });

    describe('registerElement', () => {
        it('should register element', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            expect(registry.hasElement('view')).toBeTruthy();
        });

        it('should use default naming strategy to register element', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            expect(registry.hasElement('view')).toBeTruthy();
        });

        it('should use custom naming strategy to register element', () => {
            registry.namingStrategy = { normalizeName(name: string) { return `_${name}`; } };
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            expect(registry.hasElement('_view')).toBeTruthy();
        });
    });

    describe('unregisterElement', () => {
        it('should unregister previously registered element', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            expect(registry.hasElement('view')).toBeTruthy();
            registry.unregisterElement('view');
            expect(registry.hasElement('view')).toBeFalsy();
        });

        it('should throw if element not registerd', () => {
            expect(registry.hasElement('view')).toBeFalsy();
            expect(() => registry.unregisterElement('view')).toThrow();
        });
    });

    describe('hasElement', () => {
        it('should find element by tag name', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            expect(registry.hasElement('view')).toBeTruthy();
        });

        it('should return false if element not found', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            expect(registry.hasElement('other-view')).toBeFalsy();
        });
    });

    describe('getElement', () => {
        it('should get element by tag name', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            const element = registry.getElement('view');
            expect(element).toBeTruthy();
        });

        it('should throw if element not found', () => {
            expect(() => registry.getElement('view')).toThrow();
        });
    });

    describe('getViewFactory', () => {
        it('should get view factory function by tag name', () => {
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            const createFunction = registry.getViewFactory('view');
            expect(createFunction).toBeTruthy();
            expect(createFunction).toEqual(jasmine.any(Function));
        });

        it('should throw if element not found', () => {
            expect(() => registry.getElement('view')).toThrow();
        });
    });

    describe('getViewMetadata', () => {
        it('should get view metadata by tag name', () => {
            const expectedMetadata = {
                typeName: 'Ti.UI.View',
                some: 'data'
            };
            registry.registerElement('view', () => Ti.UI.createView, expectedMetadata);
            const actualMetadata = registry.getViewMetadata('view');
            expect(actualMetadata).toBeTruthy();
            expect(actualMetadata).toEqual(expectedMetadata);
        });

        it('should throw if element not found', () => {
            expect(() => registry.getElement('view')).toThrow();
        });
    });

    describe('setViewMetadata', () => {
        it('should set view metadata by tag name', () => {
            const expectedMetadata = {
                typeName: 'Ti.UI.View',
                some: 'data'
            };
            registry.registerElement('view', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
            registry.setViewMetadata('view', expectedMetadata);
            const actualMetadata = registry.getViewMetadata('view');
            expect(actualMetadata).toBeTruthy();
            expect(actualMetadata).toEqual(expectedMetadata);
        });

        it('should throw if element not found', () => {
            expect(() => registry.getElement('view')).toThrow();
        });
    });
});
