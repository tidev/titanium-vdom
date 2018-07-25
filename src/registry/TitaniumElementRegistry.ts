import { ProxyFactory, ViewMetadata } from '../elements/TitaniumElement';
import { ElementNamingStrategyInterface } from './ElementNamingStrategyInterface';

export interface TitaniumViewElementMeta<T extends Titanium.Proxy> {
    resolveFactory: () => ProxyFactory<T>;
    meta: ViewMetadata;
}

export class TitaniumElementRegistry {
    private static _instance: TitaniumElementRegistry;

    public defaultViewMetadata: Partial<ViewMetadata> = {};

    public namingStrategy: ElementNamingStrategyInterface;

    private elements: Map<string, TitaniumViewElementMeta<any>>;

    private constructor() {
        this.elements = new Map();
        this.namingStrategy = { normalizeName: name => name.toLowerCase() };
    }

    public static getInstance(): TitaniumElementRegistry {
        if (!this._instance) {
            this._instance = new TitaniumElementRegistry();
        }

        return this._instance;
    }

    public registerElement<T extends Titanium.Proxy>(tagName: string, resolveFactory: () => ProxyFactory<T>, meta: ViewMetadata): void {
        const normalizedTagName = this.namingStrategy.normalizeName(tagName);
        if (!this.elements.has(normalizedTagName)) {
            this.elements.set(normalizedTagName, {
                resolveFactory,
                meta: Object.assign({}, this.defaultViewMetadata, meta)
            });
        } else if (Ti) {
            Ti.API.warn(`Element <${tagName}> already registered. Unregister the current one before trying to register it again.`);
        }
    }

    public unregisterElement(tagName: string): void {
        this.ensureElementIsRegistered(tagName);
        this.elements.delete(tagName);
    }

    public getElement<T extends Titanium.Proxy>(tagName: string): TitaniumViewElementMeta<T> {
        this.ensureElementIsRegistered(tagName);
        return this.elements.get(tagName.toLowerCase())!;
    }

    public hasElement(tagName: string): boolean {
        return this.elements.has(tagName.toLowerCase());
    }

    public getViewFactory<T extends Titanium.Proxy>(tagName: string): ProxyFactory<T> {
        this.ensureElementIsRegistered(tagName);
        return this.elements.get(tagName.toLowerCase())!.resolveFactory();
    }

    public getViewMetadata<T extends Titanium.Proxy>(tagName: string): ViewMetadata {
        this.ensureElementIsRegistered(tagName);
        return this.elements.get(tagName.toLowerCase())!.meta;
    }

    public setViewMetadata<T extends Titanium.Proxy>(tagName: string, meta: ViewMetadata) {
        this.ensureElementIsRegistered(tagName);
        this.elements.get(tagName)!.meta = meta;
    }

    private ensureElementIsRegistered(tagName: string): void {
        if (!this.hasElement(tagName)) {
            throw new Error(`No Titanium view registerd for tag ${tagName}`);
        }
    }
}
