import { EmulatedRootElement } from 'vdom/index';

describe('EmulatedRootElement', () => {
    let rootElement: EmulatedRootElement;

    beforeEach(() => {
        rootElement = new EmulatedRootElement();
    });

    it('should have "ROOT" tag name', () => {
        expect(rootElement.tagName).toEqual('ROOT');
    });

    it('should have no child nodes', () => {
        expect(rootElement.childNodes.length).toEqual(0);
    });
});
