import { ElementNode, TextNode } from '../../../src';

describe('ElementNode', () => {
    let node: ElementNode;

    beforeEach(() => {
        node = new ElementNode('element');
    });

    describe('childElementCount', () => {
        it('should return count for elements only', () => {
            node.appendChild(new TextNode('text'));
            node.appendChild(new ElementNode('child'));

            expect(node.childElementCount).toEqual(1);
        });
    });

    describe('firstElementChild', () => {
        it('should return first element child', () => {
            node.appendChild(new TextNode('text'));
            const childElement = new ElementNode('first-child');
            node.appendChild(childElement);
            node.appendChild(new ElementNode('last-child'));

            expect(node.firstElementChild).toBe(childElement);
        });

        it('should return null if no child element', () => {
            expect(node.firstElementChild).toBeNull();
            node.appendChild(new TextNode('text'));
            expect(node.firstElementChild).toBeNull();
        });
    });

    describe('firstElementChild', () => {
        it('should return last element child', () => {
            node.appendChild(new ElementNode('first-chid'));
            const childElement = new ElementNode('last-child');
            node.appendChild(childElement);
            node.appendChild(new TextNode('text'));

            expect(node.lastElementChild).toBe(childElement);
        });

        it('should return null if no child element', () => {
            expect(node.lastElementChild).toBeNull();
            node.appendChild(new TextNode('text'));
            expect(node.lastElementChild).toBeNull();
        });
    });

    describe('remove', () => {
        it('should remove element from parent', () => {
            const parent = new ElementNode('parent');
            parent.appendChild(node);
            expect(parent.childElementCount).toEqual(1);
            expect(node.parentElement).toBe(parent);
            node.remove();
            expect(parent.childElementCount).toEqual(0);
            expect(node.parentElement).toBeNull();
        });
    });
});
