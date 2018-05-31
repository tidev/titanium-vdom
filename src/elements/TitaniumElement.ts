import { AbstractElement, InvisibleElement } from '.';
import { AbstractNode, ElementNode, EventCallback, NodeType, TextNode } from '..';
import { camelize, capitalizeFirstLetter, runs } from '../utility';

export type ProxyFactory = (options: object) => Titanium.Proxy;

export interface ViewMetadata {
    detached?: boolean;
    create?: ProxyFactory;
}

export class TitaniumElement extends AbstractElement {

    public meta: ViewMetadata = {};

    private createProxy: ProxyFactory;

    private _titaniumProxy: Titanium.Proxy | null = null;

    private proxyCreated: boolean = false;

    constructor(tagName: string, createProxy: ProxyFactory) {
        super(tagName);

        this.createProxy = createProxy;
    }

    get titaniumView(): Titanium.Proxy {
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
                updatedText = child.nodeValue;
            }
        }
        updatedText = updatedText.replace(/^\s+|\s+$/g, '');
        if (updatedText !== '') {
            const possibleProperties = ['text', 'title'];
            for (const textProperty of possibleProperties) {
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

    private insertChild(element: TitaniumElement, atIndex?: number | null): void {
        if (element.meta.detached) {
            return;
        }

        const parentView = this.titaniumView as Titanium.UI.View;
        const childView = element.titaniumView as Titanium.UI.View;

        if (atIndex === null || atIndex === undefined) {
            parentView.add(childView);
        } else {
            parentView.insertAt({
                view: childView,
                position: atIndex
            });
        }
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

        const visualElement = AbstractElement.findSingleVisualElement(element);
        const childTitaniumView = visualElement.titaniumView as Titanium.UI.View;
        const childIndex = (this.titaniumView as Titanium.UI.View).children.indexOf(childTitaniumView);
        if (childIndex !== -1) {
            return childIndex;
        }

        return null;
    }
}
