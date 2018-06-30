import { ElementNode } from '../nodes/ElementNode';

export abstract class AbstractElement extends ElementNode {
    get parentTemplateElement(): AbstractElement | null {
        return this.parentElement instanceof AbstractElement ? this.parentElement : null;
    }

    public abstract isDetached(): boolean;

    public abstract shouldDetachChildren(): boolean;

    public abstract insertIntoVisualTree(children: AbstractElement, atIndex?: number): void;
}
