import { AbstractNode } from '../nodes/AbstractNode';
import { EventCallback } from '../nodes/ElementNode';
import { findSingleVisualElement, findSingleVisualElementNoThrow } from '../utils/dom';
import { camelize } from '../utils/string';
import { AbstractElement } from './AbstractElement';
import { TitaniumElement } from './TitaniumElement';

/**
 * Representation of all elements that are not associated with a Titanium
 * view and thus not directly part of the visual tree.
 *
 * Used for all elements that are not known to the Titanium element registry.
 *
 * As this element is not part of the Titanium visual tree but still can
 * contain Titanium views as its children a special child element handling will
 * be applied. Invisible elements will recursively pass through all of their
 * children to its parent elements. If a Titanium element is reached the child
 * view will be inserted into the Titanium visual tree.
 *
 * Example template:
 *
 *  <View>
 *      <Label>1</Label>
 *      <SomeComponent>  <-- This is an invisible element
 *          <Label>2</Label>
 *      </SomeComponent>
 *      <Label>3</Label>
 *  </View>
 *
 * Resulting visual tree:
 *
 *  View
 *      Label 1
 *      Label 2
 *      Label 3
 *
 * Likewise, a similar handling is applied when setting attributes/events on
 * invisible elements. All attributes/events will be passed along child
 * elements until a visual element is reached and the attributes/events will
 * also be applied to that element.
 */
export class InvisibleElement extends AbstractElement {

    get firstVisualChild() {
        return findSingleVisualElementNoThrow(this);
    }

    public getAttribute(name: string): any {
        try {
            const visualElement = findSingleVisualElement(this);
            return visualElement.getAttribute(name);
        } catch (e) {
            return super.getAttribute(name);
        }
    }

    public setAttribute(name: string, value: any): void {
        super.setAttribute(name, value);

        try {
            const visualElement = findSingleVisualElement(this);
            visualElement.setAttribute(name, value);
        } catch (e) {
            // Do nothing if no visual element was found
        }
    }

    public on(eventName: string, handler: EventCallback) {
        try {
            // We do not have event bubbling, so manually delegate the event handler
            // to the underlying visual element.
            const visualElement = findSingleVisualElement(this);
            return visualElement.on(eventName, handler);
        } catch (e) {
            return super.on(eventName, handler);
        }
    }

    public off(eventName: string, handler: EventCallback) {
        try {
            const visualElement = findSingleVisualElement(this);
            return visualElement.off(eventName, handler);
        } catch (e) {
            return super.off(eventName, handler);
        }
    }

    public isDetached(): boolean {
        return this.hasAttribute('detached') || false;
    }

    public shouldDetachChildren(): boolean {
        return this.hasAttribute('detach-children') || false;
    }

    public insertBefore(newChild: AbstractNode, referenceChild: AbstractNode) {
        super.insertBefore(newChild, referenceChild);

        /* istanbul ignore if */
        if (!(newChild instanceof AbstractElement)) {
            return;
        }

        /* istanbul ignore else */
        if (!(this.isDetached() || this.shouldDetachChildren())) {
            this.insertIntoVisualTree(newChild);
        }

        if (this.firstElementChild === newChild && newChild instanceof TitaniumElement) {
            this.projectToVisualElement(newChild);
        }
    }

    public insertIntoVisualTree(child: AbstractElement, atIndex?: number) {
        const parent = this.parentTemplateElement;
        if (parent === null) {
            return;
        }

        if (child.isDetached() || this.shouldDetachChildren()) {
            return;
        }

        const baseIndex = this.parentElement !== null ? this.parentElement.children.indexOf(this) : 0;
        const insideIndex = atIndex === null || atIndex === undefined ? this.children.indexOf(child) : atIndex;

        parent.insertIntoVisualTree(child, baseIndex + insideIndex);
    }

    private projectToVisualElement<T extends Titanium.Proxy>(visualElement: TitaniumElement<T>) {
        for (const [name, value] of this.attributes) {
            visualElement.setAttribute(name, value);
        }
        for (const [eventName, handlers] of this.events) {
            for (const handler of handlers) {
                visualElement.on(eventName, handler);
            }
        }
    }

}
