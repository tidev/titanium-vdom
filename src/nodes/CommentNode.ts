import { NodeType } from './AbstractNode';
import { AbstractTextualNode } from './AbstractTextualNode';

export class CommentNode extends AbstractTextualNode {
    constructor(text: string) {
        super(text);

        this.nodeName = '#comment';
        this.nodeType = NodeType.Comment;
    }
}
