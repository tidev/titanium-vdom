import { AbstractNode } from '../nodes/AbstractNode';
import { EventCallback } from '../nodes/ElementNode';
import { TextNode } from '../nodes/TextNode';
import { runs } from '../utils/device';
import { findSingleVisualElement } from '../utils/dom';
import { isNumeric, toNumber } from '../utils/number';
import { camelize } from '../utils/string';
import { AbstractElement } from './AbstractElement';
import { InvisibleElement } from './InvisibleElement';

export type ProxyFactory<T extends Titanium.Proxy> = (options: any) => T;

export interface ViewMetadata {
    typeName: string;
    detached?: boolean;
    detachChildren?: boolean;
    [key: string]: any;
}

function hasOwnProperty(obj: any, name: string) {
    return Object.prototype.hasOwnProperty.call(obj, name);
}

export class TitaniumElement<T extends Titanium.Proxy> extends AbstractElement {

    public meta: ViewMetadata;

    private createProxy: ProxyFactory<T>;

    private _titaniumProxy: T | null = null;

    private proxyCreated: boolean = false;

    constructor(tagName: string, createProxy: ProxyFactory<T>, meta: ViewMetadata) {
        super(tagName);

        this.createProxy = createProxy;
        this.meta = meta;
    }

    get titaniumView(): T {
        if (this._titaniumProxy === null) {
            const creationProperties: { [k: string]: any } = {};
            this.attributes.forEach((attributeValue, attributeName) => {
                const propertyName = camelize(attributeName);
                this.setProperty(creationProperties, propertyName, attributeValue);
            });
            this._titaniumProxy = this.createProxy(creationProperties);

            this.events.forEach((handlers, eventName) => {
                handlers.forEach(handler => {
                    /* istanbul ignore else */
                    if (this._titaniumProxy) {
                        Ti.API.debug(`Adding event listener for ${eventName} to created proxy.`);
                        this._titaniumProxy.addEventListener(eventName, handler);
                    }
                });
            });

            this.proxyCreated = true;
        }

        return this._titaniumProxy;
    }

    public getAttribute(name: string): any {
        if (this.proxyCreated === false) {
            return this.getElementAttribute(name);
        }

        const propertyName = camelize(name);
        /* istanbul ignore else: iOS always returns true for property checks */
        if (Reflect.has(this.titaniumView, propertyName)) {
            return (this.titaniumView as any)[propertyName];
        }

        return this.getElementAttribute(name);
    }

    public getElementAttribute(name: string): any {
        return super.getAttribute(name);
    }

    public setAttribute(name: string, value: any): void {
        super.setAttribute(name, value);

        if (this.proxyCreated === false) {
            return;
        }

        const propertyName = camelize(name);
        this.setProperty(this.titaniumView, propertyName, value);
    }

    /**
     * Reads text from all text child nodes and updates the title or text property of the
     * underlying Titanium view
     */
    public updateText(): void {
        let updatedText = '';
        for (let child = this.firstChild; child !== null; child = child.nextSibling) {
            /* istanbul ignore else */
            if (child instanceof TextNode) {
                updatedText += child.nodeValue;
            }
        }
        updatedText = updatedText.replace(/^\s+|\s+$/g, '');
        const textPropertyCanditates = ['text', 'title'];
        for (const textProperty of textPropertyCanditates) {
            /* istanbul ignore else */
            if (this.proxyCreated && hasOwnProperty(this.titaniumView, textProperty)) {
                this.setProperty(this._titaniumProxy, textProperty, updatedText);
                break;
            } else {
                this.setAttribute(textProperty, updatedText);
            }
        }
    }

    public isDetached(): boolean {
        return this.meta.detached || false;
    }

    public shouldDetachChildren(): boolean {
        return this.meta.detachChildren || false;
    }

    public insertBefore(newNode: AbstractNode, referenceNode: AbstractNode | null): void {
        super.insertBefore(newNode, referenceNode);

        if (newNode instanceof TextNode) {
            this.updateText();
        }

        if (newNode instanceof TitaniumElement) {
            const atIndex = this.getTitaniumChildIndexFromNode(referenceNode);
            this.insertChild(newNode, atIndex);
        }

        if (newNode instanceof InvisibleElement) {
            const atIndex = this.getTitaniumChildIndexFromNode(referenceNode);
            this.insertIntoVisualTree(newNode, atIndex ? atIndex : 0);
        }
    }

    public insertIntoVisualTree(child: AbstractElement, atIndex?: number) {
        if (child.isDetached() || this.shouldDetachChildren()) {
            return;
        }

        if (child instanceof TitaniumElement) {
            this.insertChild(child, atIndex);
        } else if (child instanceof InvisibleElement) {
            for (const childNode of child.children) {
                this.insertIntoVisualTree(childNode as AbstractElement);
            }
        }
    }

    public removeChild(oldChild: AbstractNode): void {
        super.removeChild(oldChild);

        /* istanbul ignore else */
        if (oldChild instanceof TitaniumElement) {
            /* istanbul ignore if: mainly For type checking only, probably all views have a remove() method */
            if (!this.isContainerView(this.titaniumView)) {
                throw new Error(`Unable to remove child ${oldChild} from parent ${this} because remove method is unavailable.`);
            }
            this.titaniumView.remove(oldChild.titaniumView);
        }
    }

    public on(eventName: string, handler: EventCallback): void {
        super.on(eventName, handler);

        if (this.proxyCreated) {
            this.titaniumView.addEventListener(eventName, handler);
        }
    }

    public off(eventName: string, handler: EventCallback): void {
        super.off(eventName, handler);

        if (this.proxyCreated) {
            this.titaniumView.removeEventListener(eventName, handler);
        }
    }

    private insertChild<U extends Titanium.Proxy>(element: TitaniumElement<U>, atIndex?: number | null): void {
        if (element.isDetached() || this.shouldDetachChildren()) {
            return;
        }

        const parentView = this.titaniumView;
        const childView = element.titaniumView;

        /* istanbul ignore if: mainly For type checking only, probably all views have add methods */
        if (!this.isContainerView(parentView)) {
            throw new Error(`Unable to automatically add children to ${this}. Consider wrapping it in a custom component to manually handle children and make it a detached element.`);
        }

        if (atIndex === null || atIndex === undefined) {
            parentView.add(childView);
        } else {
            parentView.insertAt({
                view: childView,
                position: atIndex
            });
        }
    }

    private isContainerView(view: any): view is Titanium.UI.View {
        const requiredFields = ['add', 'insertAt', 'children', 'remove'];
        function isDefined(value: any) {
            return typeof value !== undefined;
        }
        return requiredFields.every(fieldName => isDefined(view[fieldName]));
    }

    private getTitaniumChildIndexFromNode(node: AbstractNode | null): number | null {
        if (node === null) {
            return null;
        }

        let element: AbstractElement | null = null;
        /* istanbul ignore else: edge case when trying to insert before a non-element node */
        if (node instanceof AbstractElement) {
            element = node;
        } else {
            element = node.nextElementSibling as AbstractElement;
        }
        if (!element) {
            return null;
        }

        const visualElement = findSingleVisualElement(element);
        const childTitaniumView = visualElement.titaniumView as Titanium.UI.View;
        if (!this.isContainerView(this.titaniumView)) {
            throw new Error(`Unable to determine Titanium child view index for ${visualElement}. Parent ${this} is no container view.`);
        }
        const childIndex = this.titaniumView.children.indexOf(childTitaniumView);
        if (childIndex !== -1) {
            return childIndex;
        }

        return null;
    }

    private setProperty(proxy: any, name: string, value: any) {
        if (typeof value === 'string' && isNumeric(value)) {
            proxy[name] = toNumber(value);
        } else {
            proxy[name] = value;
        }
    }
}
