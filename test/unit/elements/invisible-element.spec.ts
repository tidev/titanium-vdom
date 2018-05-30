import { InvisibleElement, TitaniumElement } from '../../../src/elements';

describe('InvisbleElement', () => {
    it('should insert child element after being added to parent', () => {
        const rootElement = createTestElement('Root');
        const viewElement = createTestElement('View 1');
        const proxyElement = new InvisibleElement('proxy');
        proxyElement.appendChild(viewElement);
        rootElement.appendChild(proxyElement);

        const rootView = rootElement.titaniumView as Titanium.UI.View;
        const view = viewElement.titaniumView as Titanium.UI.View;
        expect(rootView.children.length).toEqual(1);
    });

    it('should lift up element to parent', () => {
        const rootElement = createTestElement('Root');
        const viewElement = createTestElement('View 1');
        const proxyElement = new InvisibleElement('proxy');
        rootElement.appendChild(proxyElement);
        proxyElement.appendChild(viewElement);

        const rootView = rootElement.titaniumView as Titanium.UI.View;
        const view = viewElement.titaniumView as Titanium.UI.View;
        expect(rootView.children.length).toEqual(1);
    });

    it('should insert child view at correct position', () => {
        const rootElement = createTestElement('Root');
        const view1Element = createTestElement('View 1');
        const view2Element = createTestElement('View 2');
        const view3Element = createTestElement('View 3');
        const proxyElement = new InvisibleElement('proxy');
        rootElement.appendChild(view1Element);
        rootElement.appendChild(proxyElement);
        rootElement.appendChild(view3Element);
        proxyElement.appendChild(view2Element);

        const rootView = rootElement.titaniumView as Titanium.UI.View;
        expect(rootView.children.length).toEqual(3);
        expect(rootView.children[1]).toEqual(view2Element.titaniumView as Titanium.UI.View);
    });
});

function createTestElement(title: string) {
    const view = new TitaniumElement('View', o => Ti.UI.createView(o));
    view.setAttribute('title', title);
    return view;
}
