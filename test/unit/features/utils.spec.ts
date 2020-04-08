import { InvisibleElement } from 'vdom/index';
import { runs } from 'vdom/utils/device';
import { findSingleVisualElement } from 'vdom/utils/dom';
import { camelize, capitalizeFirstLetter } from'vdom/utils/string';

import { createElement } from '../helpers';

describe('utility', () => {
    describe('camelize', () => {
        it('should camelize string', () => {
            const source = 'kebab-case';
            const expected = 'kebabCase';
            expect(camelize(source)).toEqual(expected);
        });
    });

    describe('capitalizeFirstLetter', () => {
        it('should capitalize first letter', () => {
            const source = 'upper';
            const expected = 'Upper';
            expect(capitalizeFirstLetter(source)).toEqual(expected);
        });
    });

    describe('runs', () => {
        it('should detect current platform', () => {
            expect(runs(Ti.Platform.osname)).toBeTruthy();
        });

        if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
            it('should detect common "ios" platform name', () => {
                expect(runs('ios')).toBeTruthy();
            });
        }
    });

    describe('findSingleVisualElement', () => {
        it('should return passed element if visual', () => {
            const childElement = createElement('View');
            const foundVisualElement = findSingleVisualElement(childElement);

            expect(foundVisualElement).toBe(childElement);
        });

        it('should throw if more than one child element', () => {
            const proxyElement = new InvisibleElement('Proxy');
            proxyElement.appendChild(createElement('View'));
            proxyElement.appendChild(createElement('View'));

            expect(() => findSingleVisualElement(proxyElement)).toThrow();
        });

        it('should return first visual element found', () => {
            const proxyElement = new InvisibleElement('Proxy');
            proxyElement.appendChild(createElement('View'));
            const foundVisualElement = findSingleVisualElement(proxyElement);

            expect(foundVisualElement).toBeTruthy();
        });
    });
});
