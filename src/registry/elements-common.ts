import { TitaniumElementRegistry } from './TitaniumElementRegistry';

export function registerCommonTitaniumElements(registry: TitaniumElementRegistry) {
    registry.registerElement('ActivityIndicator', () => Ti.UI.createActivityIndicator, { typeName: 'Ti.UI.ActivityIndicator' });
    registry.registerElement('AlertDialog', () => Ti.UI.createAlertDialog, { typeName: 'Ti.UI.AlertDialog' });
    registry.registerElement('Button', () => Ti.UI.createButton, { typeName: 'Ti.UI.Button' });
    registry.registerElement('ImageView', () => Ti.UI.createImageView, { typeName: 'Ti.UI.ImageView' });
    registry.registerElement('Label', () => Ti.UI.createLabel, { typeName: 'Ti.UI.Label' });
    registry.registerElement('ListView', () => Ti.UI.createListView, { detached: true, typeName: 'Ti.UI.ListView' });
    registry.registerElement('ListSection', () => Ti.UI.createListSection, { detached: true, typeName: 'Ti.UI.ListSection' });
    registry.registerElement('MaskedImage', () => Ti.UI.createMaskedImage, { typeName: 'Ti.UI.MaskedImage' });
    registry.registerElement('OptionDialog', () => Ti.UI.createOptionDialog, { typeName: 'Ti.UI.OptionDialog' });
    registry.registerElement('Picker', () => Ti.UI.createPicker, { typeName: 'Ti.UI.Picker' });
    registry.registerElement('PickerColumn', () => Ti.UI.createPickerColumn, { detached: true, typeName: 'Ti.UI.PickerColumn' });
    registry.registerElement('PickerRow', () => Ti.UI.createPickerRow, { detached: true, typeName: 'Ti.UI.PickerRow' });
    registry.registerElement('ProgressBar', () => Ti.UI.createProgressBar, { typeName: 'Ti.UI.ProgressBar' });
    registry.registerElement('RefreshControl', () => Ti.UI.createRefreshControl, { detached: true, typeName: 'Ti.UI.RefreshControl' });
    registry.registerElement('ScrollableView', () => Ti.UI.createScrollableView, { detachChildren: true, typeName: 'Ti.UI.ScrollableView' });
    registry.registerElement('ScrollView', () => Ti.UI.createScrollView, { typeName: 'Ti.UI.ScrollView' });
    registry.registerElement('SearchBar', () => Ti.UI.createSearchBar, { detached: true, typeName: 'Ti.UI.SearchBar' });
    registry.registerElement('Slider', () => Ti.UI.createSlider, { typeName: 'Ti.UI.Slider' });
    registry.registerElement('Switch', () => Ti.UI.createSwitch, { typeName: 'Ti.UI.Switch' });
    registry.registerElement('Tab', () => Ti.UI.createTab, { detached: true, typeName: 'Ti.UI.Tab' });
    registry.registerElement('TableView', () => Ti.UI.createTableView, { detached: true, typeName: 'Ti.UI.TableView' });
    registry.registerElement('TableViewRow', () => Ti.UI.createTableViewRow, { detached: true, typeName: 'Ti.UI.TableViewRow' });
    registry.registerElement('TableViewSection', () => Ti.UI.createTableViewSection, { detached: true, typeName: 'Ti.UI.TableViewSection' });
    registry.registerElement('TabGroup', () => Ti.UI.createTabGroup, { detached: true, typeName: 'Ti.UI.TabGroup' });
    registry.registerElement('TextArea', () => Ti.UI.createTextArea, { typeName: 'Ti.UI.TextArea' });
    registry.registerElement('TextField', () => Ti.UI.createTextField, { typeName: 'Ti.UI.TextField' });
    registry.registerElement('Toolbar', () => Ti.UI.createToolbar, { detachChildren: true, typeName: 'Ti.UI.Toolbar' });
    registry.registerElement('View', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
    registry.registerElement('WebView', () => Ti.UI.createWebView, { typeName: 'Ti.UI.WebView' });
    registry.registerElement('Window', () => Ti.UI.createWindow, { detached: true, typeName: 'Ti.UI.Window' });
}
