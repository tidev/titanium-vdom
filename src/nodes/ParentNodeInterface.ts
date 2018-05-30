import { ElementNode } from '.';
import { ElementCollection } from '..';

export interface ParentNodeInterface {
    children: ElementCollection;

    firstElementChild: ElementNode | null;

    lastElementChild: ElementNode | null;

    childElementCount: number;
}
