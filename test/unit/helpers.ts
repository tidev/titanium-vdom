import { TitaniumElement } from 'vdom/elements/TitaniumElement';

export function createElement(tagName: string, options?: {[k: string]: any}) {
    const element = new TitaniumElement(tagName, o => (Ti.UI as any)[`create${tagName}`](o));
    if (options) {
        Object.keys(options).forEach(optionKey => {
            element.setAttribute(optionKey, options[optionKey]);
        });
    }
    return element;
}
