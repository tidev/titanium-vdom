import { InvisibleElement, TitaniumElement } from '../../../src/elements';

import { createElement } from '../helpers';

describe('InvisbleElement', () => {
    let rootElement: TitaniumElement;
    let proxyElement: InvisibleElement;

    beforeEach(() => {
        rootElement = createElement('View');
        proxyElement = new InvisibleElement('Proxy');
    });

    it('should insert child element after being added to parent', () => {
        const viewElement = createElement('Label');
        proxyElement.appendChild(viewElement);
        rootElement.appendChild(proxyElement);

        const rootView = rootElement.titaniumView as Titanium.UI.View;
        const view = viewElement.titaniumView as Titanium.UI.View;
        expect(rootView.children.length).toEqual(1);
    });

    it('should lift up element to parent', () => {
        const viewElement = createElement('View');
        rootElement.appendChild(proxyElement);
        proxyElement.appendChild(viewElement);

        const rootView = rootElement.titaniumView as Titanium.UI.View;
        const view = viewElement.titaniumView as Titanium.UI.View;
        expect(rootView.children.length).toEqual(1);
    });

    it('should insert child view at correct position', () => {
        const view1Element = createElement('View');
        const view2Element = createElement('View');
        const view3Element = createElement('View');
        rootElement.appendChild(view1Element);
        rootElement.appendChild(proxyElement);
        rootElement.appendChild(view3Element);
        proxyElement.appendChild(view2Element);

        const rootView = rootElement.titaniumView as Titanium.UI.View;
        expect(rootView.children.length).toEqual(3);
        expect(rootView.children[1]).toEqual(view2Element.titaniumView as Titanium.UI.View);
    });
});
