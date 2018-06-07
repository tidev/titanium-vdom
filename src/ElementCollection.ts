import { CollectionIndexCache } from './CollectionIndexCache';
import { NodeIterator } from './NodeIterator';
import { NodeListInterface } from './NodeListInterface';
import { ElementNode } from './nodes/ElementNode';

export class ElementCollection implements NodeListInterface<ElementNode> {
    private _rootNode: ElementNode;

    private _indexCache: CollectionIndexCache<ElementNode, ElementCollection>;

    constructor(rootNode: ElementNode) {
        this._rootNode = rootNode;
        this._indexCache = new CollectionIndexCache(this);
    }

    get length(): number {
        return this._indexCache.nodeCount;
    }

    public item(index: number) {
        return this._indexCache.nodeAt(index) as ElementNode;
    }

    public indexOf(node: ElementNode) {
        return this._indexCache.indexOf(node);
    }

    public collectionBegin() {
        return this._rootNode.firstElementChild;
    }

    public collectionEnd() {
        return this._rootNode.lastElementChild;
    }

    public traverseForward(node: ElementNode) {
        return node.nextElementSibling;
    }

    public invalidateCache(): void {
        this._indexCache.invalidate();
    }

    public [Symbol.iterator](): Iterator<ElementNode> {
        return new NodeIterator(this);
    }
}
