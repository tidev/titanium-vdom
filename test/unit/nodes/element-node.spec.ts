import { ElementNode, TextNode } from '../../../src';

describe('ElementNode', () => {
    let parent: ElementNode;
    let node: ElementNode;

    beforeEach(() => {
        parent = new ElementNode('parent');
        node = new ElementNode('element');
    });

    describe('innterHTML', () => {
        it('should return empty string', () => {
            expect(node.innerHTML).toEqual('');
        });
    });

    describe('outerHTML', () => {
        it('should return tag string', () => {
            const tagName = 'Test';
            node.tagName = tagName;
            expect(node.outerHTML).toEqual(`<${tagName}></${tagName}>`);
        });
    });

    describe('nodeValue', () => {
        it('should return null', () => {
            expect(node.nodeValue).toBeNull();
        });
    });

    describe('childElementCount', () => {
        it('should return count for elements only', () => {
            node.appendChild(new TextNode('text'));
            node.appendChild(new ElementNode('child'));

            expect(node.childElementCount).toEqual(1);
        });
    });

    describe('parentElement', () => {
        it('should return parent element', () => {
            const parentElement = new ElementNode('Parent');
            parentElement.appendChild(node);

            expect(node.parentElement).toBe(parentElement);
        });

        it('should return null if no parent element', () => {
            expect(node.parentElement).toBeNull();
        });
    });

    describe('childNodes', () => {
        it('should return list of child nodes', () => {
            const child = new ElementNode('child');
            node.appendChild(child);
            expect(node.childNodes.length).toEqual(1);
            expect(node.childNodes.item(0)).toBe(child);
        });
    });

    describe('lastChild', () => {
        it('should return last child node', () => {
            parent.appendChild(node);

            expect(parent.lastChild).toBe(node);
        });

        it('should return null if no children', () => {
            expect(node.lastChild).toBeNull();
        });
    });

    describe('nextSibling', () => {
        it('should return next node sibling', () => {
            const sibling = new ElementNode('sibling');
            parent.appendChild(node);
            parent.appendChild(sibling);

            expect(node.nextSibling).toBe(sibling);
        });

        it('should return null of no next sibling', () => {
            parent.appendChild(node);

            expect(node.nextSibling).toBeNull();
        });

        it('should return null if no parent', () => {
            expect(node.nextSibling).toBeNull();
        });
    });

    describe('previousSibling', () => {
        it('should return previous node sibling', () => {
            const sibling = new ElementNode('sibling');
            parent.appendChild(sibling);
            parent.appendChild(node);

            expect(node.previousSibling).toBe(sibling);
        });

        it('should return null of no previous sibling', () => {
            parent.appendChild(node);

            expect(node.previousSibling).toBeNull();
        });

        it('should return null if no parent', () => {
            expect(node.previousSibling).toBeNull();
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

    describe('lastElementChild', () => {
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

    describe('nextElementSibling', () => {
        it('should return next element sibling', () => {
            const nodeSibling = new TextNode('sibling');
            const elementSibling = new ElementNode('sibling');
            parent.appendChild(node);
            parent.appendChild(nodeSibling);
            parent.appendChild(elementSibling);

            expect(node.nextElementSibling).toBe(elementSibling);
        });

        it('should return null if no next element sibling', () => {
            expect(node.nextElementSibling).toBeNull();
            node.appendChild(new TextNode('sibling'));
            expect(node.nextElementSibling).toBeNull();
        });
    });

    describe('previousElementSibling', () => {
        it('should return previous element sibling', () => {
            const nodeSibling = new TextNode('sibling');
            const elementSibling = new ElementNode('sibling');
            parent.appendChild(elementSibling);
            parent.appendChild(nodeSibling);
            parent.appendChild(node);

            expect(node.previousElementSibling).toBe(elementSibling);
        });

        it('should return null of no previous element sibling', () => {
            expect(node.previousElementSibling).toBeNull();
            node.appendChild(new TextNode('sibling'));
            expect(node.previousElementSibling).toBeNull();
        });
    });

    describe('appendChild', () => {
        it('should callthrough to insertBefore with null reference', () => {
            const insertBeforeSpy = spyOn(parent, 'insertBefore');
            parent.appendChild(node);

            expect(insertBeforeSpy).toHaveBeenCalledWith(node, null);
        });
    });

    describe('removeChild', () => {
        it('should remove child', () => {
            parent.appendChild(node);
            expect(parent.childNodes.length).toEqual(1);

            const anotherChild = new ElementNode('Second');
            parent.appendChild(anotherChild);
            expect(parent.childNodes.length).toEqual(2);

            parent.removeChild(node);
            expect(node.parentNode).toBeNull();
            expect(node.previousSibling).toBeNull();
            expect(node.nextSibling).toBeNull();
            expect(anotherChild.previousSibling).toBeNull();
            expect(anotherChild.nextSibling).toBeNull();
            expect(parent.childNodes.length).toEqual(1);
        });

        it('should throw error if not child of parent', () => {
            expect(() => parent.removeChild(node)).toThrow();
        });
    });

    describe('insertBefore', () => {
        it('should insert node before reference node', () => {
            parent.appendChild(node);
            expect(parent.childNodes.item(0)).toBe(node);

            const secondNode = new ElementNode('Second');
            parent.insertBefore(secondNode, node);

            expect(parent.childNodes.length).toEqual(2);
            expect(parent.childNodes.item(0)).toBe(secondNode);
            expect(parent.childNodes.item(1)).toBe(node);
        });

        it('should append node if called with null reference node', () => {
            expect(parent.childNodes.length).toEqual(0);
            parent.insertBefore(node, null);

            expect(parent.childNodes.length).toEqual(1);
            expect(parent.childNodes.item(0)).toBe(node);

            const secondNode = new ElementNode('second');
            parent.insertBefore(secondNode, null);

            expect(parent.childNodes.length).toEqual(2);
            expect(parent.childNodes.item(1)).toBe(secondNode);
        });

        it('should update previous and next siblings', () => {
            expect(node.previousSibling).toBeNull();
            expect(node.nextSibling).toBeNull();

            parent.appendChild(node);
            const secondNode = new ElementNode('second');
            parent.appendChild(secondNode);

            expect(node.previousSibling).toBeNull();
            expect(node.nextSibling).toBe(secondNode);
            expect(secondNode.previousSibling).toBe(node);
            expect(secondNode.nextSibling).toBeNull();
        });
    });

    describe('remove', () => {
        it('should remove element from parent', () => {
            parent.appendChild(node);
            expect(parent.childElementCount).toEqual(1);
            expect(node.parentElement).toBe(parent);
            node.remove();
            expect(parent.childElementCount).toEqual(0);
            expect(node.parentElement).toBeNull();
        });
    });
});
