import { AbstractTextualNode, NodeType } from '.';

export class CommentNode extends AbstractTextualNode {
    constructor(text: string) {
        super(text);

        this.tagName = '#comment';
        this.nodeType = NodeType.Comment;
    }
}
