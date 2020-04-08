import { InvisibleElement, TitaniumElement } from 'vdom/index';

import { createElement } from '../../helpers';

describe('InvisbleElement', () => {
    let rootElement: TitaniumElement<Titanium.UI.View>;
    let proxyElement: InvisibleElement;

    beforeEach(() => {
        rootElement = createElement('View');
        proxyElement = new InvisibleElement('Proxy');
    });

    it('should get attribute from first visual child', () => {
        const topValue = 5;
        const viewElement = createElement('Label');
        viewElement.setAttribute('top', topValue);
        proxyElement.appendChild(viewElement);
        rootElement.appendChild(proxyElement);

        expect(proxyElement.getAttribute('top')).toEqual(topValue);
    });

    it('should get own attribute of no visual child found', () => {
        const value = 'bar';
        proxyElement.setAttribute('foo', value);

        expect(proxyElement.getAttribute('foo')).toEqual(value);
    });

    it('should set attribute on first visual child', () => {
        const topValue = 5;
        const viewElement = createElement('Label');
        proxyElement.appendChild(viewElement);
        proxyElement.setAttribute('top', topValue);
        rootElement.appendChild(proxyElement);

        expect(viewElement.getAttribute('top')).toEqual(topValue);
    });

    it('should project all attributes to first visual child', () => {
        const topValue = 5;
        const colorValue = '#000000';
        const viewElement = createElement('Label');
        proxyElement.setAttribute('top', topValue);
        proxyElement.setAttribute('color', colorValue);
        proxyElement.appendChild(viewElement);

        expect(viewElement.getAttribute('top')).toEqual(topValue);
        expect(viewElement.getAttribute('color')).toEqual(colorValue);
    });

    it('should insert visual child after being added to parent', () => {
        const viewElement = createElement('Label');
        proxyElement.appendChild(viewElement);
        rootElement.appendChild(proxyElement);

        const rootView = rootElement.titaniumView;
        const view = viewElement.titaniumView;
        expect(rootView.children.length).toEqual(1);
    });

    /**
     * This will test the following nested view structure:
     *
     *  <View>
     *      <Label text="1">
     *      <InvisibleElement>
     *          <Label text="2">
     *          <InvisibleElement>
     *              <Label text="3">
     *          </InvisibleElement>
     *          <Label text="4">
     *      </invisibleElement>
     *      <Label text="5">
     *  </View>
     *
     * which should result in the following view hierarchy:
     *
     *  View
     *      Label 1
     *      Label 2
     *      Label 3
     *      Label 4
     *      Label 5
     *
     */
    it('should insert nested visual and invisble childs to parent', () => {
        const nestedProxyElement = new InvisibleElement('NestedProxy');
        const label3Element = createElement('Label', { text: '3' });
        nestedProxyElement.appendChild(label3Element);
        const label2Element = createElement('Label', { text: '2' });
        const label4Element = createElement('Label', { text: '4' });
        proxyElement.appendChild(label2Element);
        proxyElement.appendChild(nestedProxyElement);
        proxyElement.appendChild(label4Element);
        const label1Element = createElement('Label', { text: '1' });
        rootElement.appendChild(label1Element);
        rootElement.appendChild(proxyElement);
        const label5Element = createElement('Label', { text: '5' });
        rootElement.appendChild(label5Element);

        const rootView = rootElement.titaniumView;
        expect(rootView.children.length).toEqual(5);
        for (let i = 0; i < 5; i++) {
            expect((rootView.children[i] as any).text).toEqual((i + 1).toString());
        }
    });

    it('should add view to parent', () => {
        const viewElement = createElement('View');
        rootElement.appendChild(proxyElement);
        proxyElement.appendChild(viewElement);

        const rootView = rootElement.titaniumView;
        const view = viewElement.titaniumView;
        expect(rootView.children.length).toEqual(1);
    });

    it('should insert child view at correct position in parent', () => {
        const view1Element = createElement('View');
        const view2Element = createElement('View');
        const view3Element = createElement('View');
        rootElement.appendChild(view1Element);
        rootElement.appendChild(proxyElement);
        rootElement.appendChild(view3Element);
        proxyElement.appendChild(view2Element);

        const rootView = rootElement.titaniumView;
        expect(rootView.children.length).toEqual(3);
        expect(rootView.children[1]).toEqual(view2Element.titaniumView);
    });

    it('should not insert view of detached Titanium element', () => {
        const viewElement = createElement('View');
        viewElement.meta.detached = true;
        rootElement.appendChild(proxyElement);
        proxyElement.appendChild(viewElement);

        expect(rootElement.titaniumView.children.length).toEqual(0);
    });

    it('should not insert child view if element itself is detached', () => {
        const viewElement = createElement('View');
        proxyElement.setAttribute('detached', true);
        rootElement.appendChild(proxyElement);
        proxyElement.appendChild(viewElement);
        expect(rootElement.titaniumView.children.length).toEqual(0);
    });

    it('should not insert child view if element itself detaches children', () => {
        const viewElement = createElement('View');
        proxyElement.setAttribute('detach-children', true);
        rootElement.appendChild(proxyElement);
        proxyElement.appendChild(viewElement);
        expect(rootElement.titaniumView.children.length).toEqual(0);
    });
});
