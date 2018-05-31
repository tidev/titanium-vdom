import { TitaniumElement } from '../../src/elements/TitaniumElement';

export function createElement(tagName: string, options?: {[k: string]: any}) {
    const view = new TitaniumElement(tagName, o => Ti.UI.createView(o));
    if (options) {
        Object.keys(options).forEach(optionKey => {
            view.setAttribute(optionKey, options[optionKey]);
        });
    }
    return view;
}
