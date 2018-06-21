import { AbstractNode } from '../nodes/AbstractNode';
import { EventCallback } from '../nodes/ElementNode';
import { TextNode } from '../nodes/TextNode';
import { camelize, capitalizeFirstLetter, findSingleVisualElement, runs } from '../utility';
import { AbstractElement } from './AbstractElement';
import { InvisibleElement } from './InvisibleElement';

export type ProxyFactory<T extends Titanium.Proxy> = (options: any) => T;

export interface ViewMetadata {
    typeName: string;
    detached?: boolean;
    [key: string]: any;
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
                creationProperties[attributeName] = attributeValue;
            });
            Ti.API.debug(`Creating proxy for ${this} with options: ${JSON.stringify(creationProperties)}`);
            this._titaniumProxy = this.createProxy(creationProperties);

            this.events.forEach((handlers, eventName) => {
                handlers.forEach(handler => {
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
        if (!Reflect.has(this.titaniumView, propertyName)) {
            throw new Error(`Unable to get attribute ${name}. ${this} has no matching property named ${propertyName}.`);
        }

        return (this.titaniumView as any)[propertyName];
    }

    public getElementAttribute(name: string): any {
        return super.getAttribute(name);
    }

    public setAttribute(name: string, value: any, namespace?: string | null): void {
        if (namespace && !runs(namespace)) {
            return;
        }

        super.setAttribute(name, value, namespace);

        if (this.proxyCreated === false) {
            return;
        }

        const propertyName = camelize(name);
        const setterName = 'set' + capitalizeFirstLetter(propertyName);

        if (Reflect.has(this.titaniumView, setterName) && typeof (this.titaniumView as any)[setterName] === 'function') {
            Ti.API.debug(`${this}.setAttribute via setter: ${setterName}(${JSON.stringify(value)})`);
            (this.titaniumView as any)[setterName](value);
            return;
        }

        if (Reflect.has(this.titaniumView, propertyName)) {
            Ti.API.debug(`${this}.setAttribute via property: ${propertyName}(${JSON.stringify(value)})`);
            (this.titaniumView as any)[propertyName] = value;
            return;
        }

        Ti.API.debug(`${this.tagName} has no property ${propertyName} or matching setter ${setterName} to set attribute ${name}.`);
    }

    public hasAttributeAccessor(name: string): boolean {
        const acessorNames = [name, `set${capitalizeFirstLetter(camelize(name))}`];
        return acessorNames.some(accessorName => {
            return Reflect.has(this.titaniumView, accessorName);
        });
    }

    /**
     * Reads text from all text child nodes and updates the title or text property of the 
     * underlying Titanium view
     */
    public updateText(): void {
        let updatedText = '';
        for (let child = this.firstChild; child !== null; child = child.nextSibling) {
            if (child instanceof TextNode) {
                updatedText += child.nodeValue;
            }
        }
        updatedText = updatedText.replace(/^\s+|\s+$/g, '');
        if (updatedText !== '') {
            let textPropertyCanditates = ['text', 'title'];
            if (runs('ios') && this.titaniumView.apiName === 'Ti.UI.Button') {
                textPropertyCanditates = ['title'];
            }
            for (const textProperty of textPropertyCanditates) {
                if (this.hasAttributeAccessor(textProperty)) {
                    this.setAttribute(textProperty, updatedText, null);
                    break;
                }
            }
        }
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

        if (oldChild instanceof TitaniumElement) {
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
        if (element.meta.detached) {
            return;
        }

        const parentView = this.titaniumView;
        const childView = element.titaniumView;

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
        if (!(node instanceof AbstractElement)) {
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
}
