import { ElementCollection } from '../ElementCollection';
import { runs } from '../utils/device';
import { AbstractNode, NodeType } from './AbstractNode';
import { ChildNodeInterface } from './ChildNodeInterface';
import { ParentNodeInterface } from './ParentNodeInterface';

export type EventCallback = (event: any) => any;

/**
 * Represents a default element inside our vdom.
 *
 * Indivudal elements inherit from this class and add features in their
 * implementation.
 */
export class ElementNode extends AbstractNode implements ChildNodeInterface, ParentNodeInterface {

    public tagName: string;

    public attributes: Map<string, any>;

    public events: Map<string, Set<EventCallback>>;

    public styles: Map<string, any>;

    private _children: ElementCollection | null = null;

    constructor(tagName: string) {
        super();

        this.nodeName = this.tagName = tagName.toUpperCase();
        this.nodeType = NodeType.Element;

        this.attributes = new Map<string, any>();
        this.events = new Map<string, Set<EventCallback>>();
        this.styles = new Map<string, any>();
    }

    get innerHTML(): string {
        return '';
    }

    get outerHTML(): string {
        return `<${this.tagName}></${this.tagName}>`;
    }

    get childElementCount() {
        return this.children.length;
    }

    get firstElementChild(): ElementNode | null {
        for (let child = this.firstChild; child !== null; child = child.nextSibling) {
            if (child.nodeType === NodeType.Element) {
                return child as ElementNode;
            }
        }

        return null;
    }

    get lastElementChild(): ElementNode | null {
        for (let child = this.lastChild; child !== null; child = child.previousSibling) {
            if (child.nodeType === NodeType.Element) {
                return child as ElementNode;
            }
        }

        return null;
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

    get children(): ElementCollection {
        if (!this._children) {
            this._children = new ElementCollection(this);
        }

        return this._children;
    }

    public insertBefore(newChild: AbstractNode, referenceChild: AbstractNode | null) {
        super.insertBefore(newChild, referenceChild);

        this.children.invalidateCache();
    }

    public getAttribute(name: string): any {
        return this.attributes.get(name);
    }

    public setAttribute(name: string, value: any): void {
        this.attributes.set(name, value);
    }

    public removeAttribute(name: string) {
        this.attributes.delete(name);
    }

    public hasAttribute(name: string): boolean {
        return this.attributes.has(name);
    }

    public setAttributeNS(namespace: string, name: string, value: any): void {
        if (runs(namespace)) {
            this.setAttribute(name, value);
        }
    }

    public removeAttributeNS(namespace: string, name: string): void {
        if (runs(namespace)) {
            this.removeAttribute(name);
        }
    }

    public getStyle(propertyName: string): any {
        return this.styles.get(propertyName);
    }

    public setStyle(propertyName: string, value: any): void {
        this.styles.set(propertyName, value);
    }

    public on(eventName: string, handler: EventCallback): void {
        let eventHandlers = this.events.get(eventName);
        if (!eventHandlers) {
            eventHandlers = new Set<EventCallback>();
            this.events.set(eventName, eventHandlers);
        }
        eventHandlers.add(handler);
    }

    public off(eventName: string, handler: EventCallback): void {
        const eventHandlers = this.events.get(eventName);
        if (eventHandlers) {
            eventHandlers.delete(handler);
        }
    }

    public remove(): void {
        if (!this.parentNode) {
            return;
        }

        this.parentNode.removeChild(this);
    }

    public removeChild(oldChild: AbstractNode): void {
        super.removeChild(oldChild);

        this.children.invalidateCache();
    }

    public updateText(): void {
        // Overriden by actual element implementations
    }

    public toString(): string {
        return `${this.constructor.name}(${this.tagName})`;
    }
}
