import { CommentNode, NodeType } from '../../../src';

describe('CommentNode', () => {
    let commentNode: CommentNode;

    beforeEach(() => {
        commentNode = new CommentNode('comment');
    });

    it('should have #comment node name', () => {
        expect(commentNode.nodeName).toEqual('#comment');
    });

    it('should have comment node type', () => {
        expect(commentNode.nodeType).toEqual(NodeType.Comment);
    });
});
