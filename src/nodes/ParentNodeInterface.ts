import { ElementCollection } from '../ElementCollection';
import { ElementNode } from './ElementNode';

export interface ParentNodeInterface {
    children: ElementCollection;

    firstElementChild: ElementNode | null;

    lastElementChild: ElementNode | null;

    childElementCount: number;
}
