import { AbstractNode, NodeListInterface } from '.';

export class NodeIterator<T extends AbstractNode> implements Iterator<T> {

    private _list: NodeListInterface<T>;

    private _index: number;

    constructor(list: NodeListInterface<T>) {
        this._list = list;
        this._index = 0;
    }

    public next(): IteratorResult<T> {
        return {
            done: this._index >= this._list.length,
            value: this._index < this._list.length ? this._list.item(this._index++) : undefined
        } as IteratorResult<T>;
    }
}
