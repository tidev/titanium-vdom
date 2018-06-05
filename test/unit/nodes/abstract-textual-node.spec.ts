import { ElementNode, TextNode } from '../../../src';

describe('AbstractTextualNode', () => {
    let textNode: TextNode;
    const textValue = 'test';

    beforeEach(() => {
        textNode = new TextNode(textValue);
    });

    describe('nodeValue', () => {
        it('should return text', () => {
            expect(textNode.nodeValue).toEqual(textValue);
        });

        it('should set new text value', () => {
            const newTextValue = 'new';
            textNode.nodeValue = newTextValue;
            expect(textNode.nodeValue).toEqual(newTextValue);
        });

        it('should trigger parent element text update', () => {
            const parent = new ElementNode('Parent');
            const updateTextSpy = spyOn(parent, 'updateText');
            parent.appendChild(textNode);
            textNode.nodeValue = 'update';
            expect(updateTextSpy).toHaveBeenCalled();
        });
    });
});
