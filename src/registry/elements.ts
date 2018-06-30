import { registerTitaniumElements as registerAndroidElements } from './elements.android';
import { registerTitaniumElements as registerIosElements } from './elements.ios';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

/* istanbul ignore next: universal registration for AoT template compilation, cannot be tested on a device */
export function registerTitaniumElements(registry: TitaniumElementRegistry): void {
    registerAndroidElements(registry);
    registerIosElements(registry);
}
