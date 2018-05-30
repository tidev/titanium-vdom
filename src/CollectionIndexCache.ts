import { AbstractNode, NodeListInterface } from '.';

export class CollectionIndexCache<T extends AbstractNode, U extends NodeListInterface<T>> {

    private _collection: U;

    private _cachedList: T[];

    private _nodeCount: number = 0;

    private _initialized: boolean;

    constructor(collection: U) {
        this._collection = collection;
        this._cachedList = [];
        this._initialized = false;
    }

    get nodeCount() {
        if (!this._initialized) {
            this.initialize();
        }

        return this._nodeCount;
    }

    public nodeAt(index: number) {
        if (!this._initialized) {
            this.initialize();
        }

        if (index >= this._nodeCount) {
            throw new Error('Node index out of bounds.');
        }

        return this._cachedList[index];
    }

    public indexOf(node: T) {
        if (!this._initialized) {
            this.initialize();
        }

        return this._cachedList.indexOf(node);
    }

    public updateNodeCountAndListCache() {
        let nodeCount = 0;
        for (let child = this._collection.collectionBegin(); child !== null; child = this._collection.traverseForward(child)) {
            nodeCount++;
            this._cachedList.push(child);
        }
        this._nodeCount = nodeCount;
    }

    public invalidate() {
        this._cachedList = [];
        this._nodeCount = 0;
        this._initialized = false;
    }

    private initialize() {
        this.updateNodeCountAndListCache();
        this._initialized = true;
    }
}
