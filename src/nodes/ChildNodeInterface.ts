import { ElementNode } from './ElementNode';

export interface ChildNodeInterface {
    nextElementSibling: ElementNode | null;
    previousElementSibling: ElementNode | null;
    remove(): void;
}
