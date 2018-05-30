import { ElementCollection } from '../../src/ElementCollection';
import { TitaniumElement } from '../../src/elements/TitaniumElement';

import { createTestElement } from './helpers';

describe('ElementCollection', () => {
    let rootNode: TitaniumElement;
    let collection: ElementCollection;

    beforeEach(() => {
        rootNode = createTestElement('Root');
        rootNode.appendChild(createTestElement('1'));
        rootNode.appendChild(createTestElement('2'));
        collection = new ElementCollection(rootNode);
    });

    it('should return collection length', () => {
        expect(collection.length).toEqual(2);
    });

    it('should return item at given index', () => {
        const testElement = createTestElement('3');
        rootNode.appendChild(testElement);
        expect(collection.item(2)).toEqual(testElement);
    });

    it('should return index of item in collection', () => {
        const testElement = createTestElement('3');
        rootNode.appendChild(testElement);
        expect(collection.indexOf(testElement)).toEqual(2);
    });
});
