import { ElementNode } from '.';
import { ChildNodeList } from '../ChildNodeList';

export enum NodeType {
    Element = 1,
    Text = 3,
    Comment = 8,
    Document = 9
}

export abstract class AbstractNode {

    public tagName: string = '';

    public nodeType: NodeType | null = null;

    public parentNode: AbstractNode | null = null;

    public firstChild: AbstractNode | null = null;

    protected _nodeValue: string | null = null;

    private _childNodes: ChildNodeList | null = null;

    private _nextSibling: AbstractNode;

    private _previousSibling: AbstractNode;

    constructor() {
        this._nextSibling = this;
        this._previousSibling = this;
    }

    get nodeValue(): string | null {
        return null;
    }

    set nodeValue(value: string | null) {
        // Will be overriden by comment and text nodes
    }

    get innerHTML(): string {
        return '';
    }

    get outerHTML(): string {
        return `<${this.tagName}></${this.tagName}>`;
    }

    get parentElement(): ElementNode | null {
        const ancestor = this.parentNode;
        return ancestor !== null && ancestor.nodeType === NodeType.Element ? ancestor as ElementNode : null;
    }

    get childNodes(): ChildNodeList {
        if (!this._childNodes) {
            this._childNodes = new ChildNodeList(this);
        }

        return this._childNodes;
    }

    get lastChild(): AbstractNode | null {
        if (this.firstChild) {
            return this.firstChild._previousSibling;
        }

        return null;
    }

    get nextSibling(): AbstractNode | null {
        if (this.parentNode === null) {
            return null;
        }

        const nextSibling = this._nextSibling;
        if (this.parentNode.firstChild === nextSibling) {
            return null;
        }

        return nextSibling;
    }

    get previousSibling(): AbstractNode | null {
        if (this.parentNode === null) {
            return null;
        }

        const previousSibling = this._previousSibling;
        if (this.parentNode.lastChild === previousSibling) {
            return null;
        }

        return previousSibling;
    }

    get nextElementSibling(): ElementNode | null {
        for (let child = this.nextSibling; child !== null; child = child.nextSibling) {
            if (child.nodeType === NodeType.Element) {
                return child as ElementNode;
            }
        }

        return null;
    }

    get previousElementSibling(): ElementNode | null {
        for (let child = this.previousSibling; child !== null; child = child.previousSibling) {
            if (child.nodeType === NodeType.Element) {
                return child as ElementNode;
            }
        }

        return null;
    }

    public appendChild(childNode: AbstractNode): void {
        this.insertBefore(childNode, null);
    }

    public removeChild(oldChild: AbstractNode): void {
        if (oldChild.parentNode !== this) {
            throw new Error(`Child node ${oldChild} not found inside ${this}`);
        }

        if (this.firstChild === oldChild) {
            this.firstChild = oldChild.nextSibling;
        }

        oldChild.parentNode = null;

        const previousChild = oldChild._previousSibling;
        const nextChild = oldChild._nextSibling;
        if (previousChild !== oldChild) {
            previousChild._nextSibling = nextChild;
            nextChild._previousSibling = previousChild;
            oldChild._previousSibling = oldChild._nextSibling = oldChild;
        }

        this.childNodes.invalidateCache();
    }

    /**
     * @todo Improve performance when node already has a parent
     * @param newNode 
     * @param referenceNode 
     */
    public insertBefore(newNode: AbstractNode, referenceNode: AbstractNode | null): void {
        if (newNode.parentNode !== null) {
            newNode.parentNode.removeChild(newNode);
        }

        newNode.parentNode = this;

        if (referenceNode === null) {
            referenceNode = this.firstChild;
        } else if (referenceNode === this.firstChild) {
            this.firstChild = newNode;
        }

        if (referenceNode) {
            newNode._previousSibling = referenceNode._previousSibling;
            newNode._nextSibling = referenceNode;
            referenceNode._previousSibling._nextSibling = newNode;
            referenceNode._previousSibling = newNode;
        } else {
            this.firstChild = newNode;
        }

        this.childNodes.invalidateCache();
    }
}
