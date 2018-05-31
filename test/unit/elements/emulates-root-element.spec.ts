import { EmulatedRootElement } from '../../../src';

describe('EmulatedRootElement', () => {
    let rootElement: EmulatedRootElement;

    beforeEach(() => {
        rootElement = new EmulatedRootElement();
    });

    it('should have "Root" tag name', () => {
        expect(rootElement.tagName).toEqual('Root');
    });

    it('should have no child nodes', () => {
        expect(rootElement.childNodes.length).toEqual(0);
    });
});
