import { AbstractElement, InvisibleElement } from '../../../src';
import { createElement } from '../helpers';

describe('AbstractElement', () => {
    describe('findSingleVisualElement', () => {
        it('should return passed element if visual', () => {
            const childElement = createElement('View');
            const foundVisualElement = AbstractElement.findSingleVisualElement(childElement);

            expect(foundVisualElement).toBe(childElement);
        });

        it('should throw if more than one child element', () => {
            const proxyElement = new InvisibleElement('Proxy');
            proxyElement.appendChild(createElement('View'));
            proxyElement.appendChild(createElement('View'));

            expect(() => AbstractElement.findSingleVisualElement(proxyElement)).toThrow();
        });

        it('should return first visual element found', () => {
            const proxyElement = new InvisibleElement('Proxy');
            proxyElement.appendChild(createElement('View'));
            const foundVisualElement = AbstractElement.findSingleVisualElement(proxyElement);

            expect(foundVisualElement).toBeTruthy();
        });
    });
});
