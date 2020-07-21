import { NavigationWindowElement } from '../elements/NavigationWindowElement';
import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerCommonTitaniumElements(registry: TitaniumElementRegistry) {
    registry.registerElement({
        tagName: 'ActivityIndicator',
        resolveFactory: () => Ti.UI.createActivityIndicator,
        meta: {
            typeName: 'Ti.UI.ActivityIndicator'
        }
    });
    registry.registerElement({
        tagName: 'AlertDialog',
        resolveFactory: () => Ti.UI.createAlertDialog,
        meta: {
            typeName: 'Ti.UI.AlertDialog',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'Button',
        resolveFactory: () => Ti.UI.createButton,
        meta: {
            typeName: 'Ti.UI.Button'
        }
    });
    registry.registerElement({
        tagName: 'ImageView',
        resolveFactory: () => Ti.UI.createImageView,
        meta: {
            typeName: 'Ti.UI.ImageView'
        }
    });
    registry.registerElement({
        tagName: 'Label',
        resolveFactory: () => Ti.UI.createLabel,
        meta: {
            typeName: 'Ti.UI.Label'
        }
    });
    registry.registerElement({
        tagName: 'ListView',
        resolveFactory: () => Ti.UI.createListView,
        meta: {
            typeName: 'Ti.UI.ListView',
            detached: true,
            detachChildren: true
        }
    });
    registry.registerElement({
        tagName: 'ListSection',
        resolveFactory: () => Ti.UI.createListSection,
        meta: {
            typeName: 'Ti.UI.ListSection'
        }
    });
    registry.registerElement({
        tagName: 'MaskedImage',
        resolveFactory: () => Ti.UI.createMaskedImage,
        meta: {
            typeName: 'Ti.UI.MaskedImage'
        }
    });
    registry.registerElement({
        tagName: 'NavigationWindow',
        resolveFactory: () => Ti.UI.createNavigationWindow,
        meta: {
            typeName: 'Ti.UI.NavigationWindow',
            detached: true
        },
        elementClass: NavigationWindowElement
    });
    registry.registerElement({
        tagName: 'OptionDialog',
        resolveFactory: () => Ti.UI.createOptionDialog,
        meta: {
            typeName: 'Ti.UI.OptionDialog',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'Picker',
        resolveFactory: () => Ti.UI.createPicker,
        meta: {
            typeName: 'Ti.UI.Picker',
            detachChildren: true
        }
    });
    registry.registerElement({
        tagName: 'PickerColumn',
        resolveFactory: () => Ti.UI.createPickerColumn,
        meta: {
            typeName: 'Ti.UI.PickerColumn',
        }
    });
    registry.registerElement({
        tagName: 'PickerRow',
        resolveFactory: () => Ti.UI.createPickerRow,
        meta: {
            typeName: 'Ti.UI.PickerRow',
        }
    });
    registry.registerElement({
        tagName: 'ProgressBar',
        resolveFactory: () => Ti.UI.createProgressBar,
        meta: {
            typeName: 'Ti.UI.ProgressBar',
        }
    });
    registry.registerElement({
        tagName: 'RefreshControl',
        resolveFactory: () => Ti.UI.createRefreshControl,
        meta: {
            typeName: 'Ti.UI.RefreshControl',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'ScrollableView',
        resolveFactory: () => Ti.UI.createScrollableView,
        meta: {
            typeName: 'Ti.UI.ScrollableView',
            detachChildren: true
        }
    });
    registry.registerElement({
        tagName: 'ScrollView',
        resolveFactory: () => Ti.UI.createScrollView,
        meta: {
            typeName: 'Ti.UI.ScrollView',
        }
    });
    registry.registerElement({
        tagName: 'SearchBar',
        resolveFactory: () => Ti.UI.createSearchBar,
        meta: {
            typeName: 'Ti.UI.SearchBar',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'Slider',
        resolveFactory: () => Ti.UI.createSlider,
        meta: {
            typeName: 'Ti.UI.Slider',
        }
    });
    registry.registerElement({
        tagName: 'Switch',
        resolveFactory: () => Ti.UI.createSlider,
        meta: {
            typeName: 'Ti.UI.Switch',
        }
    });
    registry.registerElement({
        tagName: 'Tab',
        resolveFactory: () => Ti.UI.createTab,
        meta: {
            typeName: 'Ti.UI.Tab',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'TableView',
        resolveFactory: () => Ti.UI.createTableView,
        meta: {
            typeName: 'Ti.UI.TableView',
            detached: true,
            detachChildren: true
        }
    });
    registry.registerElement({
        tagName: 'TableViewRow',
        resolveFactory: () => Ti.UI.createTableViewRow,
        meta: {
            typeName: 'Ti.UI.TableViewRow',
        }
    });
    registry.registerElement({
        tagName: 'TableViewSection',
        resolveFactory: () => Ti.UI.createTableViewSection,
        meta: {
            typeName: 'Ti.UI.TableViewSection',
        }
    });
    registry.registerElement({
        tagName: 'TabbedBar',
        resolveFactory: () => Ti.UI.createTabbedBar,
        meta: {
            typeName: 'Ti.UI.TabbedBar',
        }
    });
    registry.registerElement({
        tagName: 'TabGroup',
        resolveFactory: () => Ti.UI.createTabGroup,
        meta: {
            typeName: 'Ti.UI.TabGroup',
            detached: true
        }
    });
    registry.registerElement({
        tagName: 'TextArea',
        resolveFactory: () => Ti.UI.createTextArea,
        meta: {
            typeName: 'Ti.UI.TextArea',
        }
    });
    registry.registerElement({
        tagName: 'TextField',
        resolveFactory: () => Ti.UI.createTextField,
        meta: {
            typeName: 'Ti.UI.TextField',
        }
    });
    registry.registerElement({
        tagName: 'Toolbar',
        resolveFactory: () => Ti.UI.createToolbar,
        meta: {
            typeName: 'Ti.UI.Toolbar',
            detachChildren: true
        }
    });
    registry.registerElement({
        tagName: 'View',
        resolveFactory: () => Ti.UI.createView,
        meta: {
            typeName: 'Ti.UI.View',
        }
    });
    registry.registerElement({
        tagName: 'WebView',
        resolveFactory: () => Ti.UI.createWebView,
        meta: {
            typeName: 'Ti.UI.WebView',
        }
    });
    registry.registerElement({
        tagName: 'Window',
        resolveFactory: () => Ti.UI.createWindow,
        meta: {
            typeName: 'Ti.UI.Window',
            detached: true
        }
    });
}
