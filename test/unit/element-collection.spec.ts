import { ElementCollection } from '../../src/ElementCollection';
import { TitaniumElement } from '../../src/elements/TitaniumElement';

import { createElement } from './helpers';

describe('ElementCollection', () => {
    let rootNode: TitaniumElement<Titanium.UI.View>;
    let collection: ElementCollection;

    beforeEach(() => {
        rootNode = createElement('View');
        rootNode.appendChild(createElement('Label', { text: '1' }));
        rootNode.appendChild(createElement('Label', { text: '2' }));
        collection = new ElementCollection(rootNode);
    });

    it('should return collection length', () => {
        expect(collection.length).toEqual(2);
    });

    it('should return item at given index', () => {
        const testElement = createElement('Label', { text: '3' });
        rootNode.appendChild(testElement);
        expect(collection.item(2)).toEqual(testElement);
    });

    it('should return index of item in collection', () => {
        const testElement = createElement('Label', { text: '3' });
        rootNode.appendChild(testElement);
        expect(collection.indexOf(testElement)).toEqual(2);
    });
});
