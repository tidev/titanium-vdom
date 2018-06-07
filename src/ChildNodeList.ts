import { CollectionIndexCache } from './CollectionIndexCache';
import { NodeIterator } from './NodeIterator';
import { NodeListInterface } from './NodeListInterface';
import { AbstractNode } from './nodes/AbstractNode';

export class ChildNodeList implements NodeListInterface<AbstractNode> {
    private _rootNode: AbstractNode;

    private _indexCache: CollectionIndexCache<AbstractNode, ChildNodeList>;

    constructor(rootNode: AbstractNode) {
        this._rootNode = rootNode;
        this._indexCache = new CollectionIndexCache(this);
    }

    get length() {
        return this._indexCache.nodeCount;
    }

    public item(index: number) {
        return this._indexCache.nodeAt(index);
    }

    public collectionBegin() {
        return this._rootNode.firstChild;
    }

    public collectionEnd() {
        return this._rootNode.lastChild;
    }

    public traverseForward(node: AbstractNode) {
        return node.nextSibling;
    }

    public invalidateCache(): void {
        this._indexCache.invalidate();
    }

    public [Symbol.iterator](): Iterator<AbstractNode> {
        return new NodeIterator(this);
    }
}
