import { CommentNode, NodeType } from '../../../src';

describe('CommentNode', () => {
    let commentNode: CommentNode;

    beforeEach(() => {
        commentNode = new CommentNode('comment');
    });

    it('should have #comment tag name', () => {
        expect(commentNode.tagName).toEqual('#comment');
    });

    it('should have comment node type', () => {
        expect(commentNode.nodeType).toEqual(NodeType.Comment);
    });
});
