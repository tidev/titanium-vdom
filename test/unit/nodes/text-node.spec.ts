import { NodeType, TextNode } from '../../../src';

describe('TextNode', () => {
    let textNode: TextNode;

    beforeEach(() => {
        textNode = new TextNode('text');
    });

    it('should have #text tag name', () => {
        expect(textNode.tagName).toEqual('#text');
    });

    it('should have text node type', () => {
        expect(textNode.nodeType).toEqual(NodeType.Text);
    });
});
