import { ElementNode } from '../../src';
import { ElementCollection } from '../../src/ElementCollection';
import { NodeIterator } from '../../src/NodeIterator';

import { createElement } from './helpers';

describe('NodeIterator', () => {
    it('should be able to iterate over node list', () => {
        const rootNode = createElement('View');
        const e1 = createElement('Label', { text: '1' });
        rootNode.appendChild(e1);
        const e2 = createElement('Label', { text: '2' });
        rootNode.appendChild(e2);
        const collection = new ElementCollection(rootNode);
        const iterator = new NodeIterator(collection);
        expect(iterator.next()).toEqual({
            done: false,
            value: e1 as ElementNode
        });
        expect(iterator.next()).toEqual({
            done: false,
            value: e2 as ElementNode
        });
        expect(iterator.next() as any).toEqual({
            done: true,
            value: undefined
        });
    });
});
