import { TitaniumElement } from '../../src/elements/TitaniumElement';

export function createTestElement(title: string) {
    const view = new TitaniumElement('View', o => Ti.UI.createView(o));
    view.setAttribute('title', title);
    return view;
}
