/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
(window["dojoWebpackJsonpdiff_test"] = window["dojoWebpackJsonpdiff_test"] || []).push([["main"],{

/***/ "./node_modules/@dojo/framework/core/Destroyable.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/@dojo/framework/core/Destroyable.mjs ***!
  \***********************************************************/
/*! exports provided: Destroyable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Destroyable", function() { return Destroyable; });
/* harmony import */ var _shim_Promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/Promise */ "./node_modules/@dojo/framework/shim/Promise.mjs");

/**
 * No op function used to replace a Destroyable instance's `destroy` method, once the instance has been destroyed
 */
function noop() {
    return _shim_Promise__WEBPACK_IMPORTED_MODULE_0__["default"].resolve(false);
}
/**
 * No op function used to replace a Destroyable instance's `own` method, once the instance has been destroyed
 */
function destroyed() {
    throw new Error('Call made to destroyed method');
}
class Destroyable {
    /**
     * @constructor
     */
    constructor() {
        this.handles = [];
    }
    /**
     * Register handles for the instance that will be destroyed when `this.destroy` is called
     *
     * @param {Handle} handle The handle to add for the instance
     * @returns {Handle} A wrapper Handle. When the wrapper Handle's `destroy` method is invoked, the original handle is
     *                   removed from the instance, and its `destroy` method is invoked.
     */
    own(handle) {
        const { handles: _handles } = this;
        _handles.push(handle);
        return {
            destroy() {
                _handles.splice(_handles.indexOf(handle));
                handle.destroy();
            }
        };
    }
    /**
     * Destroys all handlers registered for the instance
     *
     * @returns {Promise<any} A Promise that resolves once all handles have been destroyed
     */
    destroy() {
        return new _shim_Promise__WEBPACK_IMPORTED_MODULE_0__["default"]((resolve) => {
            this.handles.forEach((handle) => {
                handle && handle.destroy && handle.destroy();
            });
            this.destroy = noop;
            this.own = destroyed;
            resolve(true);
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Destroyable);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/Evented.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/@dojo/framework/core/Evented.mjs ***!
  \*******************************************************/
/*! exports provided: isGlobMatch, Evented, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGlobMatch", function() { return isGlobMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Evented", function() { return Evented; });
/* harmony import */ var _shim_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/Map */ "./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var _Destroyable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Destroyable */ "./node_modules/@dojo/framework/core/Destroyable.mjs");


/**
 * Map of computed regular expressions, keyed by string
 */
const regexMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_0__["default"]();
/**
 * Determines if the event type glob has been matched
 *
 * @returns boolean that indicates if the glob is matched
 */
function isGlobMatch(globString, targetString) {
    if (typeof targetString === 'string' && typeof globString === 'string' && globString.indexOf('*') !== -1) {
        let regex;
        if (regexMap.has(globString)) {
            regex = regexMap.get(globString);
        }
        else {
            regex = new RegExp(`^${globString.replace(/\*/g, '.*')}$`);
            regexMap.set(globString, regex);
        }
        return regex.test(targetString);
    }
    else {
        return globString === targetString;
    }
}
/**
 * Event Class
 */
class Evented extends _Destroyable__WEBPACK_IMPORTED_MODULE_1__["Destroyable"] {
    constructor() {
        super(...arguments);
        /**
         * map of listeners keyed by event type
         */
        this.listenersMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    emit(event) {
        this.listenersMap.forEach((methods, type) => {
            if (isGlobMatch(type, event.type)) {
                [...methods].forEach((method) => {
                    method.call(this, event);
                });
            }
        });
    }
    on(type, listener) {
        if (Array.isArray(listener)) {
            const handles = listener.map((listener) => this._addListener(type, listener));
            return {
                destroy() {
                    handles.forEach((handle) => handle.destroy());
                }
            };
        }
        return this._addListener(type, listener);
    }
    _addListener(type, listener) {
        const listeners = this.listenersMap.get(type) || [];
        listeners.push(listener);
        this.listenersMap.set(type, listeners);
        return {
            destroy: () => {
                const listeners = this.listenersMap.get(type) || [];
                listeners.splice(listeners.indexOf(listener), 1);
            }
        };
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Evented);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/Injector.mjs":
/*!********************************************************!*\
  !*** ./node_modules/@dojo/framework/core/Injector.mjs ***!
  \********************************************************/
/*! exports provided: Injector, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Injector", function() { return Injector; });
/* harmony import */ var _core_Evented__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Evented */ "./node_modules/@dojo/framework/core/Evented.mjs");

class Injector extends _core_Evented__WEBPACK_IMPORTED_MODULE_0__["Evented"] {
    constructor(payload) {
        super();
        this._payload = payload;
    }
    setInvalidator(invalidator) {
        this._invalidator = invalidator;
    }
    get() {
        return this._payload;
    }
    set(payload) {
        this._payload = payload;
        if (this._invalidator) {
            this._invalidator();
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Injector);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/Registry.mjs":
/*!********************************************************!*\
  !*** ./node_modules/@dojo/framework/core/Registry.mjs ***!
  \********************************************************/
/*! exports provided: WIDGET_BASE_TYPE, isWidgetBaseConstructor, isWidgetFunction, isWNodeFactory, isWidget, isWidgetConstructorDefaultExport, Registry, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDGET_BASE_TYPE", function() { return WIDGET_BASE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWidgetBaseConstructor", function() { return isWidgetBaseConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWidgetFunction", function() { return isWidgetFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWNodeFactory", function() { return isWNodeFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWidget", function() { return isWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWidgetConstructorDefaultExport", function() { return isWidgetConstructorDefaultExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Registry", function() { return Registry; });
/* harmony import */ var _shim_Promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/Promise */ "./node_modules/@dojo/framework/shim/Promise.mjs");
/* harmony import */ var _shim_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shim/Map */ "./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var _core_Evented__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Evented */ "./node_modules/@dojo/framework/core/Evented.mjs");



/**
 * Widget base type
 */
const WIDGET_BASE_TYPE = '__widget_base_type';
/**
 * Checks is the item is a subclass of WidgetBase (or a WidgetBase)
 *
 * @param item the item to check
 * @returns true/false indicating if the item is a WidgetBaseConstructor
 */
function isWidgetBaseConstructor(item) {
    return Boolean(item && item._type === WIDGET_BASE_TYPE);
}
function isWidgetFunction(item) {
    return Boolean(item && item.isWidget);
}
function isWNodeFactory(node) {
    if (typeof node === 'function' && node.isFactory) {
        return true;
    }
    return false;
}
function isWidget(item) {
    return isWidgetBaseConstructor(item) || isWidgetFunction(item);
}
function isWidgetConstructorDefaultExport(item) {
    return Boolean(item &&
        item.hasOwnProperty('__esModule') &&
        item.hasOwnProperty('default') &&
        (isWidget(item.default) || isWNodeFactory(item.default)));
}
/**
 * The Registry implementation
 */
class Registry extends _core_Evented__WEBPACK_IMPORTED_MODULE_2__["Evented"] {
    /**
     * Emit loaded event for registry label
     */
    emitLoadedEvent(widgetLabel, item) {
        this.emit({
            type: widgetLabel,
            action: 'loaded',
            item
        });
    }
    define(label, item) {
        if (this._widgetRegistry === undefined) {
            this._widgetRegistry = new _shim_Map__WEBPACK_IMPORTED_MODULE_1__["default"]();
        }
        if (this._widgetRegistry.has(label)) {
            throw new Error(`widget has already been registered for '${label.toString()}'`);
        }
        this._widgetRegistry.set(label, item);
        if (item instanceof _shim_Promise__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            item.then((widgetCtor) => {
                this._widgetRegistry.set(label, widgetCtor);
                this.emitLoadedEvent(label, widgetCtor);
                return widgetCtor;
            }, (error) => {
                throw error;
            });
        }
        else if (isWidgetBaseConstructor(item)) {
            this.emitLoadedEvent(label, item);
        }
    }
    defineInjector(label, injectorFactory) {
        if (this._injectorRegistry === undefined) {
            this._injectorRegistry = new _shim_Map__WEBPACK_IMPORTED_MODULE_1__["default"]();
        }
        if (this._injectorRegistry.has(label)) {
            throw new Error(`injector has already been registered for '${label.toString()}'`);
        }
        const invalidator = new _core_Evented__WEBPACK_IMPORTED_MODULE_2__["Evented"]();
        const injectorItem = {
            injector: injectorFactory(() => invalidator.emit({ type: 'invalidate' })),
            invalidator
        };
        this._injectorRegistry.set(label, injectorItem);
        this.emitLoadedEvent(label, injectorItem);
    }
    get(label) {
        if (!this._widgetRegistry || !this.has(label)) {
            return null;
        }
        const item = this._widgetRegistry.get(label);
        if (isWidget(item) || isWNodeFactory(item)) {
            return item;
        }
        if (item instanceof _shim_Promise__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            return null;
        }
        const promise = item();
        this._widgetRegistry.set(label, promise);
        promise.then((widgetCtor) => {
            if (isWidgetConstructorDefaultExport(widgetCtor)) {
                widgetCtor = widgetCtor.default;
            }
            this._widgetRegistry.set(label, widgetCtor);
            this.emitLoadedEvent(label, widgetCtor);
            return widgetCtor;
        }, (error) => {
            throw error;
        });
        return null;
    }
    getInjector(label) {
        if (!this._injectorRegistry || !this.hasInjector(label)) {
            return null;
        }
        return this._injectorRegistry.get(label);
    }
    has(label) {
        return Boolean(this._widgetRegistry && this._widgetRegistry.has(label));
    }
    hasInjector(label) {
        return Boolean(this._injectorRegistry && this._injectorRegistry.has(label));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Registry);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/RegistryHandler.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/framework/core/RegistryHandler.mjs ***!
  \***************************************************************/
/*! exports provided: RegistryHandler, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistryHandler", function() { return RegistryHandler; });
/* harmony import */ var _shim_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/Map */ "./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var _core_Evented__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Evented */ "./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var _Registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Registry */ "./node_modules/@dojo/framework/core/Registry.mjs");



class RegistryHandler extends _core_Evented__WEBPACK_IMPORTED_MODULE_1__["Evented"] {
    constructor() {
        super();
        this._registry = new _Registry__WEBPACK_IMPORTED_MODULE_2__["Registry"]();
        this._registryWidgetLabelMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_0__["Map"]();
        this._registryInjectorLabelMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_0__["Map"]();
        this.own(this._registry);
        const destroy = () => {
            if (this.baseRegistry) {
                this._registryWidgetLabelMap.delete(this.baseRegistry);
                this._registryInjectorLabelMap.delete(this.baseRegistry);
                this.baseRegistry = undefined;
            }
        };
        this.own({ destroy });
    }
    set base(baseRegistry) {
        if (this.baseRegistry) {
            this._registryWidgetLabelMap.delete(this.baseRegistry);
            this._registryInjectorLabelMap.delete(this.baseRegistry);
        }
        this.baseRegistry = baseRegistry;
    }
    get base() {
        return this.baseRegistry;
    }
    define(label, widget) {
        this._registry.define(label, widget);
    }
    defineInjector(label, injector) {
        this._registry.defineInjector(label, injector);
    }
    has(label) {
        return this._registry.has(label) || Boolean(this.baseRegistry && this.baseRegistry.has(label));
    }
    hasInjector(label) {
        return this._registry.hasInjector(label) || Boolean(this.baseRegistry && this.baseRegistry.hasInjector(label));
    }
    get(label, globalPrecedence = false) {
        return this._get(label, globalPrecedence, 'get', this._registryWidgetLabelMap);
    }
    getInjector(label, globalPrecedence = false) {
        return this._get(label, globalPrecedence, 'getInjector', this._registryInjectorLabelMap);
    }
    _get(label, globalPrecedence, getFunctionName, labelMap) {
        const registries = globalPrecedence ? [this.baseRegistry, this._registry] : [this._registry, this.baseRegistry];
        for (let i = 0; i < registries.length; i++) {
            const registry = registries[i];
            if (!registry) {
                continue;
            }
            const item = registry[getFunctionName](label);
            const registeredLabels = labelMap.get(registry) || [];
            if (item) {
                return item;
            }
            else if (registeredLabels.indexOf(label) === -1) {
                const handle = registry.on(label, (event) => {
                    if (event.action === 'loaded' &&
                        this[getFunctionName](label, globalPrecedence) === event.item) {
                        this.emit({ type: 'invalidate' });
                    }
                });
                this.own(handle);
                labelMap.set(registry, [...registeredLabels, label]);
            }
        }
        return null;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (RegistryHandler);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/ThemeInjector.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/framework/core/ThemeInjector.mjs ***!
  \*************************************************************/
/*! exports provided: isVariantModule, isThemeWithVariant, isThemeWithVariants, isThemeInjectorPayloadWithVariant, ThemeInjector, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVariantModule", function() { return isVariantModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isThemeWithVariant", function() { return isThemeWithVariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isThemeWithVariants", function() { return isThemeWithVariants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isThemeInjectorPayloadWithVariant", function() { return isThemeInjectorPayloadWithVariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeInjector", function() { return ThemeInjector; });
/* harmony import */ var _shim_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _Injector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Injector */ "./node_modules/@dojo/framework/core/Injector.mjs");
/* harmony import */ var _shim_cssVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shim/cssVariables */ "./node_modules/@dojo/framework/shim/cssVariables.mjs");
/* harmony import */ var _shim_Map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shim/Map */ "./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var _has__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./has */ "./node_modules/@dojo/framework/core/has.mjs");





function isVariantModule(variant) {
    return typeof variant !== 'string';
}
function isThemeWithVariant(theme) {
    return theme && theme.hasOwnProperty('variant');
}
function isThemeWithVariants(theme) {
    return theme && theme.hasOwnProperty('variants');
}
function isThemeInjectorPayloadWithVariant(theme) {
    return !!theme && theme.hasOwnProperty('variant');
}
let processCssVariant = function (_) { };
if (!Object(_has__WEBPACK_IMPORTED_MODULE_4__["default"])('dom-css-variables')) {
    const setUpCssVariantSupport = () => {
        const styleId = '__dojo_processed_styles';
        const processedCssMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_3__["default"]();
        let variantStyleElement;
        function applyStyles(css) {
            const style = document.createElement('style');
            style.textContent = css;
            style.setAttribute('id', styleId);
            if (variantStyleElement && variantStyleElement.parentNode) {
                variantStyleElement.parentNode.replaceChild(style, variantStyleElement);
            }
            else {
                _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.head.appendChild(style);
            }
            variantStyleElement = style;
        }
        return function processCssVariant(variantName) {
            const processedCss = processedCssMap.get(variantName);
            if (processedCss) {
                applyStyles(processedCss);
            }
            else {
                Object(_shim_cssVariables__WEBPACK_IMPORTED_MODULE_2__["default"])({
                    exclude: `style[id=${styleId}]`,
                    onSuccess: (css) => {
                        let temp = css;
                        let index = temp.indexOf(variantName);
                        let variantCss = '';
                        while (index !== -1) {
                            temp = temp.substring(index + variantName.length);
                            const match = temp.match(/\{([^}]+)\}/);
                            if (match) {
                                if (variantCss) {
                                    variantCss = `${variantCss.substring(0, variantCss.length - 1)}${match[0].substring(1)}`;
                                }
                                else {
                                    variantCss = match[0];
                                }
                            }
                            index = temp.indexOf(variantName);
                        }
                        if (variantCss) {
                            css = `:root ${variantCss}${css}`;
                        }
                        return css;
                    },
                    onComplete: (css) => {
                        processedCssMap.set(variantName, css);
                        applyStyles(css);
                    },
                    updateDOM: false,
                    silent: true
                });
            }
        };
    };
    processCssVariant = setUpCssVariantSupport();
}
function createThemeInjectorPayload(theme, variant) {
    if (isThemeWithVariant(theme)) {
        if (typeof theme.variant === 'string') {
            return {
                theme: theme.theme,
                variant: { name: theme.variant, value: theme.theme.variants[theme.variant] }
            };
        }
        return { theme: theme.theme, variant: theme.variant };
    }
    else if (isThemeWithVariants(theme)) {
        variant = variant || 'default';
        if (isVariantModule(variant)) {
            if (!Object(_has__WEBPACK_IMPORTED_MODULE_4__["default"])('dom-css-variables')) {
                processCssVariant(variant.value.root);
            }
            return { theme, variant };
        }
        if (!Object(_has__WEBPACK_IMPORTED_MODULE_4__["default"])('dom-css-variables')) {
            processCssVariant(theme.variants[variant].root);
        }
        return { theme: theme, variant: { name: variant, value: theme.variants[variant] } };
    }
    return { theme };
}
class ThemeInjector extends _Injector__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(theme) {
        super(theme ? createThemeInjectorPayload(theme) : theme);
    }
    set(theme, variant) {
        super.set(createThemeInjectorPayload(theme, variant));
    }
    get() {
        return super.get();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ThemeInjector);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/diff.mjs":
/*!****************************************************!*\
  !*** ./node_modules/@dojo/framework/core/diff.mjs ***!
  \****************************************************/
/*! exports provided: always, ignore, reference, shallow, auto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "always", function() { return always; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignore", function() { return ignore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallow", function() { return shallow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return auto; });
/* harmony import */ var _Registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Registry */ "./node_modules/@dojo/framework/core/Registry.mjs");

function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value);
}
function always(previousProperty, newProperty) {
    return {
        changed: true,
        value: newProperty
    };
}
function ignore(previousProperty, newProperty) {
    return {
        changed: false,
        value: newProperty
    };
}
function reference(previousProperty, newProperty) {
    return {
        changed: previousProperty !== newProperty,
        value: newProperty
    };
}
function shallow(previousProperty, newProperty, depth = 0) {
    let changed = false;
    const validOldProperty = previousProperty && isObjectOrArray(previousProperty);
    const validNewProperty = newProperty && isObjectOrArray(newProperty);
    if (!validOldProperty || !validNewProperty) {
        return {
            changed: true,
            value: newProperty
        };
    }
    const previousKeys = Object.keys(previousProperty);
    const newKeys = Object.keys(newProperty);
    if (previousKeys.length !== newKeys.length) {
        changed = true;
    }
    else {
        changed = newKeys.some((key) => {
            if (depth > 0) {
                return shallow(newProperty[key], previousProperty[key], depth - 1).changed;
            }
            return newProperty[key] !== previousProperty[key];
        });
    }
    return {
        changed,
        value: newProperty
    };
}
function auto(previousProperty, newProperty, depth = 0) {
    let result;
    if (typeof newProperty === 'function') {
        if (newProperty._type === _Registry__WEBPACK_IMPORTED_MODULE_0__["WIDGET_BASE_TYPE"]) {
            result = reference(previousProperty, newProperty);
        }
        else {
            result = ignore(previousProperty, newProperty);
        }
    }
    else if (isObjectOrArray(newProperty)) {
        result = shallow(previousProperty, newProperty, depth);
    }
    else {
        result = reference(previousProperty, newProperty);
    }
    return result;
}


/***/ }),

/***/ "./node_modules/@dojo/framework/core/middleware/icache.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/framework/core/middleware/icache.mjs ***!
  \*****************************************************************/
/*! exports provided: createICacheMiddleware, icache, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createICacheMiddleware", function() { return createICacheMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icache", function() { return icache; });
/* harmony import */ var _shim_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shim/Map */ "./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* tslint:disable:interface-name */


const factory = Object(_vdom__WEBPACK_IMPORTED_MODULE_1__["create"])({ invalidator: _vdom__WEBPACK_IMPORTED_MODULE_1__["invalidator"], destroy: _vdom__WEBPACK_IMPORTED_MODULE_1__["destroy"] });
function createICacheMiddleware() {
    const icache = factory(({ middleware: { invalidator, destroy } }) => {
        const cacheMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_0__["default"]();
        destroy(() => {
            cacheMap.clear();
        });
        const api = {
            get: (key) => {
                const cachedValue = cacheMap.get(key);
                if (!cachedValue || cachedValue.status === 'pending') {
                    return undefined;
                }
                return cachedValue.value;
            }
        };
        api.set = (key, value, invalidate = true) => {
            const current = api.get(key);
            if (typeof value === 'function') {
                value = value(current);
                if (value && typeof value.then === 'function') {
                    cacheMap.set(key, {
                        status: 'pending',
                        value
                    });
                    value.then((result) => {
                        const cachedValue = cacheMap.get(key);
                        if (cachedValue && cachedValue.value === value) {
                            cacheMap.set(key, {
                                status: 'resolved',
                                value: result
                            });
                            invalidate && invalidator();
                        }
                    });
                    return undefined;
                }
            }
            cacheMap.set(key, {
                status: 'resolved',
                value
            });
            invalidate && invalidator();
            return value;
        };
        api.has = (key) => {
            return cacheMap.has(key);
        };
        api.delete = (key, invalidate = true) => {
            cacheMap.delete(key);
            invalidate && invalidator();
        };
        api.clear = (invalidate = true) => {
            cacheMap.clear();
            invalidate && invalidator();
        };
        api.getOrSet = (key, value, invalidate = true) => {
            let cachedValue = cacheMap.get(key);
            if (!cachedValue) {
                api.set(key, value, invalidate);
            }
            cachedValue = cacheMap.get(key);
            if (!cachedValue || cachedValue.status === 'pending') {
                return undefined;
            }
            return cachedValue.value;
        };
        return api;
    });
    return icache;
}
const icache = createICacheMiddleware();
/* harmony default export */ __webpack_exports__["default"] = (icache);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/middleware/injector.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/framework/core/middleware/injector.mjs ***!
  \*******************************************************************/
/*! exports provided: injector, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injector", function() { return injector; });
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");

const injectorFactory = Object(_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ getRegistry: _vdom__WEBPACK_IMPORTED_MODULE_0__["getRegistry"], invalidator: _vdom__WEBPACK_IMPORTED_MODULE_0__["invalidator"], destroy: _vdom__WEBPACK_IMPORTED_MODULE_0__["destroy"] });
const injector = injectorFactory(({ middleware: { getRegistry, invalidator, destroy } }) => {
    const handles = [];
    destroy(() => {
        let handle;
        while ((handle = handles.pop())) {
            handle.destroy();
        }
    });
    const registry = getRegistry();
    return {
        subscribe(label, callback = invalidator) {
            if (registry) {
                const item = registry.getInjector(label);
                if (item) {
                    const handle = item.invalidator.on('invalidate', () => {
                        callback();
                    });
                    handles.push(handle);
                    return () => {
                        const index = handles.indexOf(handle);
                        if (index !== -1) {
                            handles.splice(index, 1);
                            handle.destroy();
                        }
                    };
                }
            }
        },
        get(label) {
            if (registry) {
                const item = registry.getInjector(label);
                if (item) {
                    return item.injector();
                }
            }
            return null;
        }
    };
});
/* harmony default export */ __webpack_exports__["default"] = (injector);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/middleware/theme.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/framework/core/middleware/theme.mjs ***!
  \****************************************************************/
/*! exports provided: THEME_KEY, INJECTED_THEME_KEY, theme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THEME_KEY", function() { return THEME_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INJECTED_THEME_KEY", function() { return INJECTED_THEME_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony import */ var _vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _icache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icache */ "./node_modules/@dojo/framework/core/middleware/icache.mjs");
/* harmony import */ var _injector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./injector */ "./node_modules/@dojo/framework/core/middleware/injector.mjs");
/* harmony import */ var _shim_Set__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shim/Set */ "./node_modules/@dojo/framework/shim/Set.mjs");
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../diff */ "./node_modules/@dojo/framework/core/diff.mjs");
/* harmony import */ var _ThemeInjector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ThemeInjector */ "./node_modules/@dojo/framework/core/ThemeInjector.mjs");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};






const THEME_KEY = ' _key';
const INJECTED_THEME_KEY = '__theme_injector';
function registerThemeInjector(theme, themeRegistry) {
    const themeInjector = new _ThemeInjector__WEBPACK_IMPORTED_MODULE_5__["ThemeInjector"](theme);
    themeRegistry.defineInjector(INJECTED_THEME_KEY, (invalidator) => {
        themeInjector.setInvalidator(invalidator);
        return () => themeInjector;
    });
    return themeInjector;
}
const factory = Object(_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ invalidator: _vdom__WEBPACK_IMPORTED_MODULE_0__["invalidator"], icache: _icache__WEBPACK_IMPORTED_MODULE_1__["default"], diffProperty: _vdom__WEBPACK_IMPORTED_MODULE_0__["diffProperty"], injector: _injector__WEBPACK_IMPORTED_MODULE_2__["default"], getRegistry: _vdom__WEBPACK_IMPORTED_MODULE_0__["getRegistry"] }).properties();
const theme = factory(({ middleware: { invalidator, icache, diffProperty, injector, getRegistry }, properties }) => {
    let themeKeys = new _shim_Set__WEBPACK_IMPORTED_MODULE_3__["default"]();
    diffProperty('theme', properties, (current, next) => {
        const diffResult = Object(_diff__WEBPACK_IMPORTED_MODULE_4__["auto"])(current.theme, next.theme);
        if (diffResult.changed) {
            icache.clear();
            invalidator();
        }
    });
    diffProperty('classes', (current, next) => {
        let result = false;
        if ((current.classes && !next.classes) || (!current.classes && next.classes)) {
            result = true;
        }
        else if (current.classes && next.classes) {
            const keys = [...themeKeys.values()];
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                result = Object(_diff__WEBPACK_IMPORTED_MODULE_4__["shallow"])(current.classes[key], next.classes[key], 1).changed;
                if (result) {
                    break;
                }
            }
        }
        if (result) {
            icache.clear();
            invalidator();
        }
    });
    function getTheme() {
        const { theme } = properties();
        if (theme) {
            return theme;
        }
        const themeInjector = injector.get(INJECTED_THEME_KEY);
        if (themeInjector) {
            const themePayload = themeInjector.get();
            if (Object(_ThemeInjector__WEBPACK_IMPORTED_MODULE_5__["isThemeInjectorPayloadWithVariant"])(themePayload)) {
                return { theme: themePayload.theme, variant: themePayload.variant };
            }
            else if (themePayload) {
                return themePayload.theme;
            }
        }
    }
    const themeInjector = injector.get(INJECTED_THEME_KEY);
    if (!themeInjector) {
        const registry = getRegistry();
        if (registry) {
            registerThemeInjector(undefined, registry.base);
        }
    }
    injector.subscribe(INJECTED_THEME_KEY, () => {
        icache.clear();
        invalidator();
    });
    function set(theme, variant) {
        const currentTheme = injector.get(INJECTED_THEME_KEY);
        if (currentTheme) {
            if (Object(_ThemeInjector__WEBPACK_IMPORTED_MODULE_5__["isThemeWithVariants"])(theme)) {
                currentTheme.set(theme, variant);
            }
            else {
                currentTheme.set(theme);
            }
        }
    }
    return {
        classes(css) {
            const cachedTheme = icache.get(css);
            if (cachedTheme) {
                return cachedTheme;
            }
            const _a = THEME_KEY, key = css[_a], classes = __rest(css, [typeof _a === "symbol" ? _a : _a + ""]);
            themeKeys.add(key);
            let theme = classes;
            let { classes: currentClasses } = properties();
            let currentTheme = getTheme();
            if (currentTheme && Object(_ThemeInjector__WEBPACK_IMPORTED_MODULE_5__["isThemeWithVariant"])(currentTheme)) {
                currentTheme = Object(_ThemeInjector__WEBPACK_IMPORTED_MODULE_5__["isThemeWithVariants"])(currentTheme.theme)
                    ? currentTheme.theme.theme
                    : currentTheme.theme;
            }
            if (currentTheme && currentTheme[key]) {
                theme = Object.assign({}, theme, currentTheme[key]);
            }
            if (currentClasses && currentClasses[key]) {
                const classKeys = Object.keys(currentClasses[key]);
                for (let i = 0; i < classKeys.length; i++) {
                    const classKey = classKeys[i];
                    if (theme[classKey]) {
                        theme[classKey] = `${theme[classKey]} ${currentClasses[key][classKey].join(' ')}`;
                    }
                }
            }
            icache.set(css, theme, false);
            return theme;
        },
        variant() {
            const theme = getTheme();
            if (theme && Object(_ThemeInjector__WEBPACK_IMPORTED_MODULE_5__["isThemeWithVariant"])(theme)) {
                return theme.variant.value.root;
            }
        },
        set,
        get() {
            const currentTheme = injector.get(INJECTED_THEME_KEY);
            if (currentTheme) {
                return currentTheme.get();
            }
        }
    };
});
/* harmony default export */ __webpack_exports__["default"] = (theme);


/***/ }),

/***/ "./node_modules/@dojo/framework/core/vdom.mjs":
/*!****************************************************!*\
  !*** ./node_modules/@dojo/framework/core/vdom.mjs ***!
  \****************************************************/
/*! exports provided: setRendering, incrementBlockCount, decrementBlockCount, isTextNode, isWNode, isVNode, isDomVNode, isElementNode, w, v, dom, REGISTRY_ITEM, FromRegistry, fromRegistry, tsx, propertiesDiff, create, widgetInstanceMap, invalidator, node, diffProperty, destroy, getRegistry, defer, renderer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRendering", function() { return setRendering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "incrementBlockCount", function() { return incrementBlockCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decrementBlockCount", function() { return decrementBlockCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTextNode", function() { return isTextNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWNode", function() { return isWNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVNode", function() { return isVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDomVNode", function() { return isDomVNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementNode", function() { return isElementNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dom", function() { return dom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTRY_ITEM", function() { return REGISTRY_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FromRegistry", function() { return FromRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRegistry", function() { return fromRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsx", function() { return tsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propertiesDiff", function() { return propertiesDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetInstanceMap", function() { return widgetInstanceMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidator", function() { return invalidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "node", function() { return node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diffProperty", function() { return diffProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy", function() { return destroy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegistry", function() { return getRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return defer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderer", function() { return renderer; });
/* harmony import */ var _shim_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shim/WeakMap */ "./node_modules/@dojo/framework/shim/WeakMap.mjs");
/* harmony import */ var _shim_Set__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shim/Set */ "./node_modules/@dojo/framework/shim/Set.mjs");
/* harmony import */ var _shim_Map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shim/Map */ "./node_modules/@dojo/framework/shim/Map.mjs");
/* harmony import */ var _shim_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shim/array */ "./node_modules/@dojo/framework/shim/array.mjs");
/* harmony import */ var _Registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Registry */ "./node_modules/@dojo/framework/core/Registry.mjs");
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./diff */ "./node_modules/@dojo/framework/core/diff.mjs");
/* harmony import */ var _RegistryHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RegistryHandler */ "./node_modules/@dojo/framework/core/RegistryHandler.mjs");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};









const EMPTY_ARRAY = [];
const nodeOperations = ['focus', 'blur', 'scrollIntoView', 'click'];
const NAMESPACE_W3 = 'http://www.w3.org/';
const NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
const NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
const WNODE = '__WNODE_TYPE';
const VNODE = '__VNODE_TYPE';
const DOMVNODE = '__DOMVNODE_TYPE';
// @ts-ignore
const scope =  true ? 'diff_test' : undefined;
if (!_shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope]) {
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope] = {};
}
function setRendering(value) {
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope].rendering = value;
}
function incrementBlockCount() {
    const blocksPending = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope].blocksPending || 0;
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope].blocksPending = blocksPending + 1;
}
function decrementBlockCount() {
    const blocksPending = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope].blocksPending || 0;
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"][scope].blocksPending = blocksPending - 1;
}
function isTextNode(item) {
    return item && item.nodeType === 3;
}
function isLazyDefine(item) {
    return Boolean(item && item.label);
}
function isWNodeWrapper(child) {
    return child && isWNode(child.node);
}
function isVNodeWrapper(child) {
    return !!child && isVNode(child.node);
}
function isVirtualWrapper(child) {
    return isVNodeWrapper(child) && child.node.tag === 'virtual';
}
function isBodyWrapper(wrapper) {
    return isVNodeWrapper(wrapper) && wrapper.node.tag === 'body';
}
function isAttachApplication(value) {
    return !!value.type;
}
function isWNode(child) {
    return Boolean(child && child !== true && typeof child !== 'string' && child.type === WNODE);
}
function isVNode(child) {
    return Boolean(child && child !== true && typeof child !== 'string' && (child.type === VNODE || child.type === DOMVNODE));
}
function isDomVNode(child) {
    return Boolean(child && child !== true && typeof child !== 'string' && child.type === DOMVNODE);
}
function isElementNode(value) {
    return !!value.tagName;
}
function toTextVNode(data) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        text: `${data}`,
        type: VNODE
    };
}
function updateAttributes(domNode, previousAttributes, attributes, namespace) {
    const attrNames = Object.keys(attributes);
    const attrCount = attrNames.length;
    for (let i = 0; i < attrCount; i++) {
        const attrName = attrNames[i];
        const attrValue = attributes[attrName];
        const previousAttrValue = previousAttributes[attrName];
        if (attrValue !== previousAttrValue) {
            updateAttribute(domNode, attrName, attrValue, namespace);
        }
    }
}
function w(widgetConstructorOrNode, properties, children) {
    if (properties.__children__) {
        delete properties.__children__;
    }
    if (Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWNodeFactory"])(widgetConstructorOrNode)) {
        return widgetConstructorOrNode(properties, children);
    }
    if (isWNode(widgetConstructorOrNode)) {
        properties = Object.assign({}, widgetConstructorOrNode.properties, properties);
        children = children ? children : widgetConstructorOrNode.children;
        widgetConstructorOrNode = widgetConstructorOrNode.widgetConstructor;
    }
    return {
        children: children || [],
        widgetConstructor: widgetConstructorOrNode,
        properties,
        type: WNODE
    };
}
function v(tag, propertiesOrChildren = {}, children = undefined) {
    let properties = propertiesOrChildren;
    let deferredPropertiesCallback;
    if (typeof tag.tag === 'function') {
        return tag.tag(properties, children);
    }
    if (Array.isArray(propertiesOrChildren)) {
        children = propertiesOrChildren;
        properties = {};
    }
    if (typeof properties === 'function') {
        deferredPropertiesCallback = properties;
        properties = {};
    }
    if (isVNode(tag)) {
        let { classes = [], styles = {} } = properties, newProperties = __rest(properties, ["classes", "styles"]);
        let _a = tag.properties, { classes: nodeClasses = [], styles: nodeStyles = {} } = _a, nodeProperties = __rest(_a, ["classes", "styles"]);
        nodeClasses = Array.isArray(nodeClasses) ? nodeClasses : [nodeClasses];
        classes = Array.isArray(classes) ? classes : [classes];
        styles = Object.assign({}, nodeStyles, styles);
        properties = Object.assign({}, nodeProperties, newProperties, { classes: [...nodeClasses, ...classes], styles });
        children = children ? children : tag.children;
        tag = tag.tag;
    }
    return {
        tag,
        deferredPropertiesCallback,
        children,
        properties,
        type: VNODE
    };
}
/**
 * Create a VNode for an existing DOM Node.
 */
function dom({ node, attrs = {}, props = {}, on = {}, diffType = 'none', onAttach }, children) {
    return {
        tag: isElementNode(node) ? node.tagName.toLowerCase() : '',
        properties: props,
        attributes: attrs,
        events: on,
        children,
        type: DOMVNODE,
        domNode: node,
        text: isElementNode(node) ? undefined : node.data,
        diffType,
        onAttach
    };
}
const REGISTRY_ITEM = '__registry_item';
class FromRegistry {
    constructor() {
        /* tslint:disable-next-line:variable-name */
        this.__properties__ = {};
    }
}
FromRegistry.type = REGISTRY_ITEM;
function fromRegistry(tag) {
    var _a;
    return _a = class extends FromRegistry {
            constructor() {
                super(...arguments);
                this.properties = {};
                this.name = tag;
            }
        },
        _a.type = REGISTRY_ITEM,
        _a;
}
function tsx(tag, properties = {}, ...children) {
    children = Object(_shim_array__WEBPACK_IMPORTED_MODULE_5__["flat"])(children, Infinity);
    properties = properties === null ? {} : properties;
    if (typeof tag === 'string') {
        return v(tag, properties, children);
    }
    else if (tag.type === 'registry' && properties.__autoRegistryItem) {
        const name = properties.__autoRegistryItem;
        delete properties.__autoRegistryItem;
        return w(name, properties, children);
    }
    else if (tag.type === REGISTRY_ITEM) {
        const registryItem = new tag();
        return w(registryItem.name, properties, children);
    }
    else {
        return w(tag, properties, children);
    }
}
function propertiesDiff(current, next, invalidator, ignoreProperties) {
    const propertyNames = [...Object.keys(current), ...Object.keys(next)];
    for (let i = 0; i < propertyNames.length; i++) {
        if (ignoreProperties.indexOf(propertyNames[i]) > -1) {
            continue;
        }
        const result = Object(_diff__WEBPACK_IMPORTED_MODULE_7__["auto"])(current[propertyNames[i]], next[propertyNames[i]]);
        if (result.changed) {
            invalidator();
            break;
        }
        ignoreProperties.push(propertyNames[i]);
    }
}
function buildPreviousProperties(domNode, current) {
    const { node: { diffType, properties, attributes } } = current;
    if (!diffType || diffType === 'vdom') {
        return {
            properties: current.deferredProperties
                ? Object.assign({}, current.deferredProperties, current.node.properties) : current.node.properties,
            attributes: current.node.attributes,
            events: current.node.events
        };
    }
    else if (diffType === 'none') {
        return {
            properties: {},
            attributes: current.node.attributes ? {} : undefined,
            events: current.node.events
        };
    }
    let newProperties = {
        properties: {}
    };
    if (attributes) {
        newProperties.attributes = {};
        newProperties.events = current.node.events;
        Object.keys(properties).forEach((propName) => {
            newProperties.properties[propName] = domNode[propName];
        });
        Object.keys(attributes).forEach((attrName) => {
            newProperties.attributes[attrName] = domNode.getAttribute(attrName);
        });
        return newProperties;
    }
    newProperties.properties = Object.keys(properties).reduce((props, property) => {
        props[property] = domNode.getAttribute(property) || domNode[property];
        return props;
    }, {});
    return newProperties;
}
function checkDistinguishable(wrappers, index, parentWNodeWrapper) {
    const wrapperToCheck = wrappers[index];
    if (isVNodeWrapper(wrapperToCheck) && !wrapperToCheck.node.tag) {
        return;
    }
    const { key } = wrapperToCheck.node.properties;
    let parentName = 'unknown';
    if (parentWNodeWrapper) {
        const { node: { widgetConstructor } } = parentWNodeWrapper;
        parentName = widgetConstructor.name || 'unknown';
    }
    if (key === undefined || key === null) {
        for (let i = 0; i < wrappers.length; i++) {
            if (i !== index) {
                const wrapper = wrappers[i];
                if (same(wrapper, wrapperToCheck)) {
                    let nodeIdentifier;
                    if (isWNodeWrapper(wrapper)) {
                        nodeIdentifier = wrapper.node.widgetConstructor.name || 'unknown';
                    }
                    else {
                        nodeIdentifier = wrapper.node.tag;
                    }
                    console.warn(`A widget (${parentName}) has had a child added or removed, but they were not able to uniquely identified. It is recommended to provide a unique 'key' property when using the same widget or element (${nodeIdentifier}) multiple times as siblings`);
                    break;
                }
            }
        }
    }
}
function same(dnode1, dnode2) {
    if (isVNodeWrapper(dnode1) && isVNodeWrapper(dnode2)) {
        if (isDomVNode(dnode1.node) && isDomVNode(dnode2.node)) {
            if (dnode1.node.domNode !== dnode2.node.domNode) {
                return false;
            }
        }
        if (dnode1.node.tag !== dnode2.node.tag) {
            return false;
        }
        if (dnode1.node.properties.key !== dnode2.node.properties.key) {
            return false;
        }
        return true;
    }
    else if (isWNodeWrapper(dnode1) && isWNodeWrapper(dnode2)) {
        const widgetConstructor1 = dnode1.registryItem || dnode1.node.widgetConstructor;
        const widgetConstructor2 = dnode2.registryItem || dnode2.node.widgetConstructor;
        const { node: { properties: props1 } } = dnode1;
        const { node: { properties: props2 } } = dnode2;
        if (dnode1.instance === undefined && typeof widgetConstructor2 === 'string') {
            return false;
        }
        if (widgetConstructor1 !== widgetConstructor2) {
            return false;
        }
        if (props1.key !== props2.key) {
            return false;
        }
        if (!(widgetConstructor1.keys || []).every((key) => props1[key] === props2[key])) {
            return false;
        }
        return true;
    }
    return false;
}
function findIndexOfChild(children, sameAs, start) {
    for (let i = start; i < children.length; i++) {
        if (same(children[i], sameAs)) {
            return i;
        }
    }
    return -1;
}
function createClassPropValue(classes = []) {
    let classNames = '';
    if (Array.isArray(classes)) {
        for (let i = 0; i < classes.length; i++) {
            let className = classes[i];
            if (className && className !== true) {
                classNames = classNames ? `${classNames} ${className}` : className;
            }
        }
        return classNames;
    }
    if (classes && classes !== true) {
        classNames = classes;
    }
    return classNames;
}
function updateAttribute(domNode, attrName, attrValue, namespace) {
    if (namespace === NAMESPACE_SVG && attrName === 'href' && attrValue) {
        domNode.setAttributeNS(NAMESPACE_XLINK, attrName, attrValue);
    }
    else if ((attrName === 'role' && attrValue === '') || attrValue === undefined) {
        domNode.removeAttribute(attrName);
    }
    else {
        domNode.setAttribute(attrName, attrValue);
    }
}
function arrayFrom(arr) {
    return Array.prototype.slice.call(arr);
}
function createFactory(callback, middlewares, key) {
    const factory = (properties, children) => {
        if (properties) {
            const result = w(callback, properties, children);
            callback.isWidget = true;
            callback.middlewares = middlewares;
            return result;
        }
        return {
            middlewares,
            callback
        };
    };
    const keys = Object.keys(middlewares).reduce((keys, middlewareName) => {
        const middleware = middlewares[middlewareName];
        if (middleware.keys) {
            keys = [...keys, ...middleware.keys];
        }
        return keys;
    }, key ? [key] : []);
    callback.keys = keys;
    factory.keys = keys;
    factory.isFactory = true;
    return factory;
}
function create(middlewares = {}) {
    function properties() {
        function returns(callback) {
            return createFactory(callback, middlewares);
        }
        function key(key) {
            function returns(callback) {
                return createFactory(callback, middlewares, key);
            }
            return returns;
        }
        function children() {
            function returns(callback) {
                return createFactory(callback, middlewares);
            }
            function key(key) {
                function returns(callback) {
                    return createFactory(callback, middlewares, key);
                }
                return returns;
            }
            returns.key = key;
            return returns;
        }
        returns.children = children;
        returns.key = key;
        return returns;
    }
    function children() {
        function properties() {
            function returns(callback) {
                return createFactory(callback, middlewares);
            }
            function key(key) {
                function returns(callback) {
                    return createFactory(callback, middlewares, key);
                }
                return returns;
            }
            returns.key = key;
            return returns;
        }
        function returns(callback) {
            return createFactory(callback, middlewares);
        }
        returns.properties = properties;
        return returns;
    }
    function returns(callback) {
        return createFactory(callback, middlewares);
    }
    returns.children = children;
    returns.properties = properties;
    return returns;
}
const factory = create();
function wrapNodes(renderer) {
    const result = renderer();
    const isWNodeWrapper = isWNode(result);
    const callback = () => {
        return result;
    };
    callback.isWNodeWrapper = isWNodeWrapper;
    return factory(callback);
}
const widgetInstanceMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
const widgetMetaMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
const requestedDomNodes = new _shim_Set__WEBPACK_IMPORTED_MODULE_3__["default"]();
let wrapperId = 0;
let metaId = 0;
function addNodeToMap(id, key, node) {
    const widgetMeta = widgetMetaMap.get(id);
    if (widgetMeta) {
        widgetMeta.nodeMap = widgetMeta.nodeMap || new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
        widgetMeta.nodeMap.set(key, node);
        if (requestedDomNodes.has(`${id}-${key}`)) {
            widgetMeta.invalidator();
            requestedDomNodes.delete(`${id}-${key}`);
        }
    }
}
function destroyHandles(meta) {
    const { destroyMap, middlewareIds } = meta;
    if (!destroyMap) {
        return;
    }
    for (let i = 0; i < middlewareIds.length; i++) {
        const id = middlewareIds[i];
        const destroy = destroyMap.get(id);
        destroy && destroy();
        destroyMap.delete(id);
        if (destroyMap.size === 0) {
            break;
        }
    }
    destroyMap.clear();
}
function runDiffs(meta, current, next) {
    let customProperties = {};
    meta.customDiffMap = meta.customDiffMap || new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
    if (meta.customDiffMap.size) {
        meta.customDiffMap.forEach((diffMap) => {
            diffMap.forEach((diff, propertyName) => {
                const result = diff(Object.assign({}, current), Object.assign({}, next));
                if (result) {
                    customProperties[propertyName] = result;
                }
            });
        });
    }
    return customProperties;
}
const invalidator = factory(({ id }) => {
    const [widgetId] = id.split('-');
    return () => {
        const widgetMeta = widgetMetaMap.get(widgetId);
        if (widgetMeta) {
            return widgetMeta.invalidator();
        }
    };
});
const node = factory(({ id }) => {
    return {
        get(key) {
            const [widgetId] = id.split('-');
            const widgetMeta = widgetMetaMap.get(widgetId);
            if (widgetMeta) {
                widgetMeta.nodeMap = widgetMeta.nodeMap || new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
                const mountNode = widgetMeta.mountNode;
                const node = widgetMeta.nodeMap.get(key);
                if (node &&
                    (mountNode.contains(node) ||
                        (_shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.body !== mountNode && _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.body.contains(node)))) {
                    return node;
                }
                requestedDomNodes.add(`${widgetId}-${key}`);
            }
            return null;
        }
    };
});
const diffProperty = factory(({ id }) => {
    function callback(propertyName, propertiesOrDiff, diff) {
        const [widgetId] = id.split('-');
        const widgetMeta = widgetMetaMap.get(widgetId);
        if (!diff) {
            diff = propertiesOrDiff;
        }
        if (widgetMeta) {
            widgetMeta.customDiffMap = widgetMeta.customDiffMap || new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
            widgetMeta.customDiffProperties = widgetMeta.customDiffProperties || new _shim_Set__WEBPACK_IMPORTED_MODULE_3__["default"]();
            const propertyDiffMap = widgetMeta.customDiffMap.get(id) || new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
            if (!propertyDiffMap.has(propertyName)) {
                const result = diff({}, widgetMeta.originalProperties);
                if (result !== undefined) {
                    if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug')) {
                        if (widgetMeta.propertiesCalled) {
                            console.warn(`Calling "propertyDiff" middleware after accessing properties in "${widgetMeta.widgetName}", can result in referencing stale properties.`);
                        }
                    }
                    widgetMeta.properties = Object.assign({}, widgetMeta.properties, { [propertyName]: result });
                }
                propertyDiffMap.set(propertyName, diff);
                widgetMeta.customDiffProperties.add(propertyName);
            }
            widgetMeta.customDiffMap.set(id, propertyDiffMap);
        }
    }
    return callback;
});
const destroy = factory(({ id }) => {
    return (destroyFunction) => {
        const [widgetId] = id.split('-');
        const widgetMeta = widgetMetaMap.get(widgetId);
        if (widgetMeta) {
            widgetMeta.destroyMap = widgetMeta.destroyMap || new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
            if (!widgetMeta.destroyMap.has(id)) {
                widgetMeta.destroyMap.set(id, destroyFunction);
            }
        }
    };
});
const getRegistry = factory(({ id }) => {
    const [widgetId] = id.split('-');
    return () => {
        const widgetMeta = widgetMetaMap.get(widgetId);
        if (widgetMeta) {
            if (!widgetMeta.registryHandler) {
                widgetMeta.registryHandler = new _RegistryHandler__WEBPACK_IMPORTED_MODULE_8__["default"]();
                widgetMeta.registryHandler.base = widgetMeta.registry;
                widgetMeta.registryHandler.on('invalidate', widgetMeta.invalidator);
            }
            widgetMeta.registryHandler = widgetMeta.registryHandler || new _RegistryHandler__WEBPACK_IMPORTED_MODULE_8__["default"]();
            return widgetMeta.registryHandler;
        }
        return null;
    };
});
const defer = factory(({ id }) => {
    const [widgetId] = id.split('-');
    let isDeferred = false;
    return {
        pause() {
            const widgetMeta = widgetMetaMap.get(widgetId);
            if (!isDeferred && widgetMeta) {
                widgetMeta.deferRefs = widgetMeta.deferRefs + 1;
                isDeferred = true;
            }
        },
        resume() {
            const widgetMeta = widgetMetaMap.get(widgetId);
            if (isDeferred && widgetMeta) {
                widgetMeta.deferRefs = widgetMeta.deferRefs - 1;
                isDeferred = false;
            }
        }
    };
});
function wrapFunctionProperties(id, properties) {
    const props = {};
    const propertyNames = Object.keys(properties);
    for (let i = 0; i < propertyNames.length; i++) {
        const propertyName = propertyNames[i];
        if (typeof properties[propertyName] === 'function') {
            props[propertyName] = function WrappedProperty(...args) {
                const widgetMeta = widgetMetaMap.get(id);
                if (widgetMeta) {
                    return widgetMeta.originalProperties[propertyName](...args);
                }
                return properties[propertyName](...args);
            };
            props[propertyName].unwrap = () => {
                const widgetMeta = widgetMetaMap.get(id);
                if (widgetMeta) {
                    return widgetMeta.originalProperties[propertyName];
                }
                return properties[propertyName];
            };
        }
        else {
            props[propertyName] = properties[propertyName];
        }
    }
    return props;
}
function renderer(renderer) {
    let _mountOptions = {
        sync: false,
        merge: true,
        transition: undefined,
        domNode: _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.body,
        registry: new _Registry__WEBPACK_IMPORTED_MODULE_6__["Registry"]()
    };
    let _invalidationQueue = [];
    let _processQueue = [];
    let _deferredProcessQueue = [];
    let _applicationQueue = [];
    let _eventMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
    let _idToWrapperMap = new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
    let _wrapperSiblingMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
    let _idToChildrenWrappers = new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
    let _insertBeforeMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
    let _nodeToWrapperMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
    let _renderScheduled;
    let _deferredRenderCallbacks = [];
    let parentInvalidate;
    let _allMergedNodes = [];
    let _appWrapperId;
    let _deferredProcessIds = new _shim_Map__WEBPACK_IMPORTED_MODULE_4__["default"]();
    function nodeOperation(propName, propValue, previousValue, domNode) {
        let result = propValue && !previousValue;
        if (typeof propValue === 'function') {
            result = propValue();
        }
        if (result === true) {
            _deferredRenderCallbacks.push(() => {
                domNode[propName]();
            });
        }
    }
    function updateEvent(domNode, eventName, currentValue, previousValue) {
        if (previousValue) {
            const previousEvent = _eventMap.get(previousValue);
            previousEvent && domNode.removeEventListener(eventName, previousEvent);
        }
        let callback = currentValue;
        if (eventName === 'input') {
            callback = function (evt) {
                currentValue.call(this, evt);
                evt.target['oninput-value'] = evt.target.value;
            };
        }
        domNode.addEventListener(eventName, callback);
        _eventMap.set(currentValue, callback);
    }
    function removeOrphanedEvents(domNode, previousProperties, properties, onlyEvents = false) {
        Object.keys(previousProperties).forEach((propName) => {
            const isEvent = propName.substr(0, 2) === 'on' || onlyEvents;
            const eventName = onlyEvents ? propName : propName.substr(2);
            if (isEvent && !properties[propName]) {
                const eventCallback = _eventMap.get(previousProperties[propName]);
                if (eventCallback) {
                    domNode.removeEventListener(eventName, eventCallback);
                }
            }
        });
    }
    function resolveRegistryItem(wrapper, instance, id) {
        if (!Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWidget"])(wrapper.node.widgetConstructor)) {
            const owningNode = _nodeToWrapperMap.get(wrapper.node);
            if (owningNode) {
                if (owningNode.instance) {
                    instance = owningNode.instance;
                }
                else {
                    id = owningNode.id;
                }
            }
            let registry;
            if (instance) {
                const instanceData = widgetInstanceMap.get(instance);
                if (instanceData) {
                    registry = instanceData.registry;
                }
            }
            else if (id !== undefined) {
                const widgetMeta = widgetMetaMap.get(id);
                if (widgetMeta) {
                    if (!widgetMeta.registryHandler) {
                        widgetMeta.registryHandler = new _RegistryHandler__WEBPACK_IMPORTED_MODULE_8__["default"]();
                        widgetMeta.registryHandler.base = widgetMeta.registry;
                        widgetMeta.registryHandler.on('invalidate', widgetMeta.invalidator);
                    }
                    registry = widgetMeta.registryHandler;
                }
            }
            if (registry) {
                let registryLabel;
                if (isLazyDefine(wrapper.node.widgetConstructor)) {
                    const { label, registryItem } = wrapper.node.widgetConstructor;
                    if (!registry.has(label)) {
                        registry.define(label, registryItem);
                    }
                    registryLabel = label;
                }
                else {
                    registryLabel = wrapper.node.widgetConstructor;
                }
                let item = registry.get(registryLabel);
                if (Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWNodeFactory"])(item)) {
                    const node = item(wrapper.node.properties, wrapper.node.children);
                    if (Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWidgetFunction"])(node.widgetConstructor)) {
                        wrapper.registryItem = node.widgetConstructor;
                    }
                }
                else {
                    wrapper.registryItem = item;
                }
            }
        }
    }
    function mapNodeToInstance(nodes, wrapper) {
        while (nodes.length) {
            let node = nodes.pop();
            if (isWNode(node) || isVNode(node)) {
                if (!_nodeToWrapperMap.has(node)) {
                    _nodeToWrapperMap.set(node, wrapper);
                    if (node.children && node.children.length) {
                        nodes = [...nodes, ...node.children];
                    }
                }
            }
        }
    }
    function renderedToWrapper(rendered, parent, currentParent) {
        const { requiresInsertBefore, hasPreviousSiblings, namespace, depth } = parent;
        const wrappedRendered = [];
        const hasParentWNode = isWNodeWrapper(parent);
        const hasVirtualParentNode = isVirtualWrapper(parent);
        const currentParentChildren = (isVNodeWrapper(currentParent) && _idToChildrenWrappers.get(currentParent.id)) || [];
        const hasCurrentParentChildren = currentParentChildren.length > 0;
        const insertBefore = ((requiresInsertBefore || hasPreviousSiblings !== false) && (hasParentWNode || hasVirtualParentNode)) ||
            (hasCurrentParentChildren && rendered.length > 1);
        let previousItem;
        if (isWNodeWrapper(parent) && rendered.length) {
            mapNodeToInstance([...rendered], parent);
        }
        for (let i = 0; i < rendered.length; i++) {
            let renderedItem = rendered[i];
            if (!renderedItem || renderedItem === true) {
                continue;
            }
            if (typeof renderedItem === 'string') {
                renderedItem = toTextVNode(renderedItem);
            }
            const owningNode = _nodeToWrapperMap.get(renderedItem);
            const wrapper = {
                node: renderedItem,
                depth: depth + 1,
                order: i,
                parentId: parent.id,
                requiresInsertBefore: insertBefore,
                hasParentWNode,
                namespace: namespace
            };
            if (isVNode(renderedItem)) {
                if (renderedItem.deferredPropertiesCallback) {
                    wrapper.deferredProperties = renderedItem.deferredPropertiesCallback(false);
                }
                if (renderedItem.properties.exitAnimation) {
                    parent.hasAnimations = true;
                    let nextParent = _idToWrapperMap.get(parent.parentId);
                    while (nextParent) {
                        if (nextParent.hasAnimations) {
                            break;
                        }
                        nextParent.hasAnimations = true;
                        nextParent = _idToWrapperMap.get(nextParent.parentId);
                    }
                }
            }
            if (owningNode) {
                wrapper.owningId = owningNode.id;
            }
            if (isWNode(renderedItem)) {
                resolveRegistryItem(wrapper, parent.instance, parent.id);
            }
            if (previousItem) {
                _wrapperSiblingMap.set(previousItem, wrapper);
            }
            wrappedRendered.push(wrapper);
            previousItem = wrapper;
        }
        return wrappedRendered;
    }
    function findParentDomNode(currentNode) {
        let parentDomNode;
        let parentWrapper = _idToWrapperMap.get(currentNode.parentId);
        while (!parentDomNode && parentWrapper) {
            if (!parentDomNode &&
                isVNodeWrapper(parentWrapper) &&
                !isVirtualWrapper(parentWrapper) &&
                parentWrapper.domNode) {
                parentDomNode = parentWrapper.domNode;
            }
            parentWrapper = _idToWrapperMap.get(parentWrapper.parentId);
        }
        return parentDomNode;
    }
    function runDeferredProperties(next) {
        const { deferredPropertiesCallback } = next.node;
        if (deferredPropertiesCallback) {
            const properties = next.node.properties;
            _deferredRenderCallbacks.push(() => {
                if (_idToWrapperMap.has(next.owningId)) {
                    const deferredProperties = next.deferredProperties;
                    next.deferredProperties = deferredPropertiesCallback(true);
                    processProperties(next, {
                        properties: Object.assign({}, deferredProperties, properties)
                    });
                }
            });
        }
    }
    function findInsertBefore(next) {
        let insertBefore = null;
        let searchNode = next;
        while (!insertBefore) {
            const nextSibling = _wrapperSiblingMap.get(searchNode);
            if (nextSibling) {
                let domNode = nextSibling.domNode;
                if (isWNodeWrapper(nextSibling) || isVirtualWrapper(nextSibling)) {
                    if (!nextSibling.childDomWrapperId) {
                        nextSibling.childDomWrapperId = findDomNodeOnParentWrapper(nextSibling.id);
                    }
                    if (nextSibling.childDomWrapperId) {
                        const childWrapper = _idToWrapperMap.get(nextSibling.childDomWrapperId);
                        if (childWrapper && !isBodyWrapper(childWrapper)) {
                            domNode = childWrapper.domNode;
                        }
                    }
                }
                if (domNode && domNode.parentNode) {
                    insertBefore = domNode;
                    break;
                }
                searchNode = nextSibling;
                continue;
            }
            searchNode = searchNode && _idToWrapperMap.get(searchNode.parentId);
            if (!searchNode || (isVNodeWrapper(searchNode) && !isVirtualWrapper(searchNode))) {
                break;
            }
        }
        return insertBefore;
    }
    function setValue(domNode, propValue, previousValue) {
        const domValue = domNode.value;
        const onInputValue = domNode['oninput-value'];
        const onSelectValue = domNode['select-value'];
        if (onSelectValue && domValue !== onSelectValue) {
            domNode.value = onSelectValue;
            if (domNode.value === onSelectValue) {
                domNode['select-value'] = undefined;
            }
        }
        else if ((onInputValue && domValue === onInputValue) || propValue !== previousValue) {
            domNode.value = propValue;
            domNode['oninput-value'] = undefined;
        }
    }
    function setProperties(domNode, currentProperties = {}, nextWrapper, includesEventsAndAttributes = true) {
        const properties = nextWrapper.deferredProperties
            ? Object.assign({}, nextWrapper.deferredProperties, nextWrapper.node.properties) : nextWrapper.node.properties;
        const propNames = Object.keys(properties);
        const propCount = propNames.length;
        if (propNames.indexOf('classes') === -1 && currentProperties.classes) {
            domNode.removeAttribute('class');
        }
        includesEventsAndAttributes && removeOrphanedEvents(domNode, currentProperties, properties);
        for (let i = 0; i < propCount; i++) {
            const propName = propNames[i];
            let propValue = properties[propName];
            const previousValue = currentProperties[propName];
            if (propName === 'classes') {
                const previousClassString = createClassPropValue(previousValue);
                let currentClassString = createClassPropValue(propValue);
                if (previousClassString !== currentClassString) {
                    if (currentClassString) {
                        if (nextWrapper.merged) {
                            const domClasses = (domNode.getAttribute('class') || '').split(' ');
                            for (let i = 0; i < domClasses.length; i++) {
                                if (currentClassString.indexOf(domClasses[i]) === -1) {
                                    currentClassString = `${domClasses[i]} ${currentClassString}`;
                                }
                            }
                        }
                        domNode.setAttribute('class', currentClassString);
                    }
                    else {
                        domNode.removeAttribute('class');
                    }
                }
            }
            else if (nodeOperations.indexOf(propName) !== -1) {
                nodeOperation(propName, propValue, previousValue, domNode);
            }
            else if (propName === 'styles') {
                const styleNames = Object.keys(propValue);
                const styleCount = styleNames.length;
                for (let j = 0; j < styleCount; j++) {
                    const styleName = styleNames[j];
                    const newStyleValue = propValue[styleName];
                    const oldStyleValue = previousValue && previousValue[styleName];
                    if (newStyleValue === oldStyleValue) {
                        continue;
                    }
                    domNode.style[styleName] = newStyleValue || '';
                }
            }
            else {
                if (!propValue && typeof previousValue === 'string') {
                    propValue = '';
                }
                if (propName === 'value') {
                    if (domNode.tagName === 'SELECT') {
                        domNode['select-value'] = propValue;
                    }
                    setValue(domNode, propValue, previousValue);
                }
                else if (propName !== 'key' && propValue !== previousValue) {
                    const type = typeof propValue;
                    if (type === 'function' && propName.lastIndexOf('on', 0) === 0 && includesEventsAndAttributes) {
                        updateEvent(domNode, propName.substr(2), propValue, previousValue);
                    }
                    else if (type === 'string' && propName !== 'innerHTML' && includesEventsAndAttributes) {
                        updateAttribute(domNode, propName, propValue, nextWrapper.namespace);
                    }
                    else if (propName === 'scrollLeft' || propName === 'scrollTop') {
                        if (domNode[propName] !== propValue) {
                            domNode[propName] = propValue;
                        }
                    }
                    else {
                        domNode[propName] = propValue;
                    }
                }
            }
        }
    }
    function _createDeferredRenderCallback() {
        const callbacks = _deferredRenderCallbacks;
        _deferredRenderCallbacks = [];
        if (callbacks.length) {
            return () => {
                let callback;
                while ((callback = callbacks.shift())) {
                    callback();
                }
            };
        }
    }
    function _scheduleDeferredRenderCallbacks() {
        const { sync } = _mountOptions;
        const run = _createDeferredRenderCallback();
        if (run) {
            if (sync) {
                run();
            }
            else {
                let id;
                id = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].requestAnimationFrame(() => {
                    _deferredProcessIds.delete(id);
                    run();
                });
                _deferredProcessIds.set(id, run);
            }
        }
    }
    function processProperties(next, previousProperties) {
        if (next.node.attributes && next.node.events) {
            updateAttributes(next.domNode, previousProperties.attributes || {}, next.node.attributes, next.namespace);
            setProperties(next.domNode, previousProperties.properties, next, false);
            const events = next.node.events || {};
            if (previousProperties.events) {
                removeOrphanedEvents(next.domNode, previousProperties.events || {}, next.node.events, true);
            }
            previousProperties.events = previousProperties.events || {};
            Object.keys(events).forEach((event) => {
                updateEvent(next.domNode, event, events[event], previousProperties.events[event]);
            });
        }
        else {
            setProperties(next.domNode, previousProperties.properties, next);
        }
    }
    function unmount() {
        _processQueue.push({
            current: [_idToWrapperMap.get(_appWrapperId)],
            next: [],
            meta: {}
        });
        if (_renderScheduled) {
            _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].cancelAnimationFrame(_renderScheduled);
        }
        _runProcessQueue();
        _runDomInstructionQueue();
        _deferredProcessIds.forEach((callback, id) => {
            _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].cancelAnimationFrame(id);
            callback();
        });
        const run = _createDeferredRenderCallback();
        run && run();
        _invalidationQueue = [];
        _processQueue = [];
        _deferredProcessQueue = [];
        _applicationQueue = [];
        _deferredRenderCallbacks = [];
        _allMergedNodes = [];
        _eventMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
        _idToWrapperMap.clear();
        _idToChildrenWrappers.clear();
        _wrapperSiblingMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
        _nodeToWrapperMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
        _insertBeforeMap = undefined;
    }
    function mount(mountOptions = {}) {
        let domNode = mountOptions.domNode;
        if (!domNode) {
            if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug') && domNode === null) {
                console.warn('Unable to find node to mount the application, defaulting to the document body.');
            }
            domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.body;
        }
        _mountOptions = Object.assign({}, _mountOptions, mountOptions, { domNode });
        const renderResult = wrapNodes(renderer)({}, []);
        _appWrapperId = `${wrapperId++}`;
        const nextWrapper = {
            id: _appWrapperId,
            node: renderResult,
            order: 0,
            depth: 1,
            owningId: '-1',
            parentId: '-1',
            siblingId: '-1',
            properties: {}
        };
        _idToWrapperMap.set('-1', {
            id: `-1`,
            depth: 0,
            order: 0,
            owningId: '',
            domNode,
            node: v('fake'),
            parentId: '-1'
        });
        _processQueue.push({
            current: [],
            next: [nextWrapper],
            meta: { mergeNodes: arrayFrom(domNode.childNodes) }
        });
        _runProcessQueue();
        _runDomInstructionQueue();
        _cleanUpMergedNodes();
        _insertBeforeMap = undefined;
        _scheduleDeferredRenderCallbacks();
        if (!_renderScheduled) {
            setRendering(false);
        }
    }
    function invalidate() {
        parentInvalidate && parentInvalidate();
    }
    function _schedule() {
        const { sync } = _mountOptions;
        if (sync) {
            _runInvalidationQueue();
        }
        else if (!_renderScheduled) {
            setRendering(true);
            _renderScheduled = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].requestAnimationFrame(() => {
                _runInvalidationQueue();
            });
        }
    }
    function getWNodeWrapper(id) {
        const wrapper = _idToWrapperMap.get(id);
        if (wrapper && isWNodeWrapper(wrapper)) {
            return wrapper;
        }
    }
    function _runInvalidationQueue() {
        _renderScheduled = undefined;
        let invalidationQueue = [..._invalidationQueue];
        const previouslyRendered = [];
        _invalidationQueue = [];
        invalidationQueue.sort((a, b) => {
            let result = b.depth - a.depth;
            if (result === 0) {
                result = b.order - a.order;
            }
            return result;
        });
        if (_deferredProcessQueue.length) {
            _processQueue = [..._deferredProcessQueue];
            _deferredProcessQueue = [];
            _runProcessQueue();
            if (_deferredProcessQueue.length) {
                _invalidationQueue = [...invalidationQueue];
                invalidationQueue = [];
            }
        }
        let item;
        while ((item = invalidationQueue.pop())) {
            let { id } = item;
            const current = getWNodeWrapper(id);
            if (!current || previouslyRendered.indexOf(id) !== -1 || !_idToWrapperMap.has(current.parentId)) {
                continue;
            }
            previouslyRendered.push(id);
            const sibling = _wrapperSiblingMap.get(current);
            const next = {
                node: {
                    type: WNODE,
                    widgetConstructor: current.node.widgetConstructor,
                    properties: current.properties || {},
                    children: current.node.children || []
                },
                instance: current.instance,
                id: current.id,
                properties: current.properties,
                depth: current.depth,
                order: current.order,
                owningId: current.owningId,
                parentId: current.parentId,
                registryItem: current.registryItem
            };
            sibling && _wrapperSiblingMap.set(next, sibling);
            const result = _updateWidget({ current, next });
            if (result && result.item) {
                _processQueue.push(result.item);
                _idToWrapperMap.set(id, next);
                _runProcessQueue();
            }
        }
        _runDomInstructionQueue();
        _cleanUpMergedNodes();
        _scheduleDeferredRenderCallbacks();
        if (!_renderScheduled) {
            setRendering(false);
        }
    }
    function _cleanUpMergedNodes() {
        if (_deferredProcessQueue.length === 0) {
            let mergedNode;
            while ((mergedNode = _allMergedNodes.pop())) {
                mergedNode.parentNode && mergedNode.parentNode.removeChild(mergedNode);
            }
            _mountOptions.merge = false;
        }
    }
    function _runProcessQueue() {
        let item;
        while ((item = _processQueue.pop())) {
            if (isAttachApplication(item)) {
                item.instance && _applicationQueue.push(item);
            }
            else {
                const { current, next, meta } = item;
                _process(current || EMPTY_ARRAY, next || EMPTY_ARRAY, meta);
            }
        }
    }
    function _runDomInstructionQueue() {
        _applicationQueue.reverse();
        let item;
        while ((item = _applicationQueue.pop())) {
            if (item.type === 'create') {
                const { parentDomNode, next, next: { domNode, merged, requiresInsertBefore, node } } = item;
                processProperties(next, { properties: {} });
                runDeferredProperties(next);
                if (!merged) {
                    let insertBefore;
                    if (requiresInsertBefore) {
                        insertBefore = findInsertBefore(next);
                    }
                    else if (_insertBeforeMap) {
                        insertBefore = _insertBeforeMap.get(next);
                    }
                    parentDomNode.insertBefore(domNode, insertBefore);
                    if (isDomVNode(next.node) && next.node.onAttach) {
                        next.node.onAttach();
                    }
                }
                if (domNode.tagName === 'OPTION' && domNode.parentElement) {
                    setValue(domNode.parentElement);
                }
                const { enterAnimation, enterAnimationActive } = node.properties;
                if (_mountOptions.transition && enterAnimation && enterAnimation !== true) {
                    _mountOptions.transition.enter(domNode, enterAnimation, enterAnimationActive);
                }
                const owningWrapper = _nodeToWrapperMap.get(next.node);
                if (owningWrapper && node.properties.key != null) {
                    if (owningWrapper.instance) {
                        const instanceData = widgetInstanceMap.get(owningWrapper.instance);
                        instanceData && instanceData.nodeHandler.add(domNode, `${node.properties.key}`);
                    }
                    else {
                        addNodeToMap(owningWrapper.id, node.properties.key, domNode);
                    }
                }
                item.next.inserted = true;
            }
            else if (item.type === 'update') {
                const { next, next: { domNode }, current, current: { domNode: currentDomNode } } = item;
                if (isTextNode(domNode) && isTextNode(currentDomNode) && domNode !== currentDomNode) {
                    currentDomNode.parentNode && currentDomNode.parentNode.replaceChild(domNode, currentDomNode);
                }
                else {
                    const previousProperties = buildPreviousProperties(domNode, current);
                    processProperties(next, previousProperties);
                    runDeferredProperties(next);
                }
            }
            else if (item.type === 'delete') {
                const { current } = item;
                const { exitAnimation, exitAnimationActive } = current.node.properties;
                if (_mountOptions.transition && exitAnimation && exitAnimation !== true) {
                    _mountOptions.transition.exit(current.domNode, exitAnimation, exitAnimationActive);
                }
                else {
                    current.domNode.parentNode.removeChild(current.domNode);
                }
            }
            else if (item.type === 'attach') {
                const { instance, attached } = item;
                const instanceData = widgetInstanceMap.get(instance);
                if (instanceData) {
                    instanceData.nodeHandler.addRoot();
                    attached && instanceData.onAttach();
                }
            }
            else if (item.type === 'detach') {
                if (item.current.instance) {
                    const instanceData = widgetInstanceMap.get(item.current.instance);
                    instanceData && instanceData.onDetach();
                }
                item.current.instance = undefined;
            }
        }
        if (_deferredProcessQueue.length === 0) {
            _nodeToWrapperMap = new _shim_WeakMap__WEBPACK_IMPORTED_MODULE_2__["default"]();
        }
    }
    function _processMergeNodes(next, mergeNodes) {
        const { merge } = _mountOptions;
        if (merge && mergeNodes.length) {
            if (isVNodeWrapper(next)) {
                let { node: { tag } } = next;
                for (let i = 0; i < mergeNodes.length; i++) {
                    const domElement = mergeNodes[i];
                    const tagName = domElement.tagName || '';
                    if (tag.toUpperCase() === tagName.toUpperCase()) {
                        const mergeNodeIndex = _allMergedNodes.indexOf(domElement);
                        if (mergeNodeIndex !== -1) {
                            _allMergedNodes.splice(mergeNodeIndex, 1);
                        }
                        mergeNodes.splice(i, 1);
                        next.domNode = domElement;
                        break;
                    }
                }
            }
            else {
                next.mergeNodes = mergeNodes;
            }
        }
    }
    function distinguishableCheck(childNodes, index) {
        const parentWNodeWrapper = getWNodeWrapper(childNodes[index].owningId);
        checkDistinguishable(childNodes, index, parentWNodeWrapper);
    }
    function createKeyMap(wrappers) {
        const keys = [];
        for (let i = 0; i < wrappers.length; i++) {
            const wrapper = wrappers[i];
            if (wrapper.node.properties.key != null) {
                keys.push(wrapper.node.properties.key);
            }
            else {
                return false;
            }
        }
        return keys;
    }
    function _process(current, next, meta = {}) {
        let { mergeNodes = [], oldIndex = 0, newIndex = 0 } = meta;
        const currentLength = current.length;
        const nextLength = next.length;
        const hasPreviousSiblings = currentLength > 1 || (currentLength > 0 && currentLength < nextLength);
        let instructions = [];
        let replace = false;
        if (oldIndex === 0 && newIndex === 0 && currentLength) {
            const currentKeys = createKeyMap(current);
            if (currentKeys) {
                const nextKeys = createKeyMap(next);
                if (nextKeys) {
                    for (let i = 0; i < currentKeys.length; i++) {
                        if (nextKeys.indexOf(currentKeys[i]) !== -1) {
                            instructions = [];
                            replace = false;
                            break;
                        }
                        replace = true;
                        instructions.push({ current: current[i], next: undefined });
                    }
                }
            }
        }
        if (replace || (currentLength === 0 && !_mountOptions.merge)) {
            for (let i = 0; i < next.length; i++) {
                instructions.push({ current: undefined, next: next[i] });
            }
        }
        else {
            if (newIndex < nextLength) {
                let currentWrapper = oldIndex < currentLength ? current[oldIndex] : undefined;
                const nextWrapper = next[newIndex];
                nextWrapper.hasPreviousSiblings = hasPreviousSiblings;
                _processMergeNodes(nextWrapper, mergeNodes);
                if (currentWrapper && same(currentWrapper, nextWrapper)) {
                    oldIndex++;
                    newIndex++;
                    if (isVNodeWrapper(currentWrapper) && isVNodeWrapper(nextWrapper)) {
                        nextWrapper.inserted = currentWrapper.inserted;
                    }
                    instructions.push({ current: currentWrapper, next: nextWrapper });
                }
                else if (!currentWrapper || findIndexOfChild(current, nextWrapper, oldIndex + 1) === -1) {
                    Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug') && current.length && distinguishableCheck(next, newIndex);
                    instructions.push({ current: undefined, next: nextWrapper });
                    newIndex++;
                }
                else if (findIndexOfChild(next, currentWrapper, newIndex + 1) === -1) {
                    Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug') && distinguishableCheck(current, oldIndex);
                    instructions.push({ current: currentWrapper, next: undefined });
                    oldIndex++;
                }
                else {
                    Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug') && distinguishableCheck(next, newIndex);
                    Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug') && distinguishableCheck(current, oldIndex);
                    instructions.push({ current: currentWrapper, next: undefined });
                    instructions.push({ current: undefined, next: nextWrapper });
                    oldIndex++;
                    newIndex++;
                }
            }
            if (newIndex < nextLength) {
                _processQueue.push({ current, next, meta: { mergeNodes, oldIndex, newIndex } });
            }
            if (currentLength > oldIndex && newIndex >= nextLength) {
                for (let i = oldIndex; i < currentLength; i++) {
                    Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dojo-debug') && distinguishableCheck(current, i);
                    instructions.push({ current: current[i], next: undefined });
                }
            }
        }
        for (let i = 0; i < instructions.length; i++) {
            const result = _processOne(instructions[i]);
            if (result === false) {
                if (_mountOptions.merge && mergeNodes.length) {
                    if (newIndex < nextLength) {
                        _processQueue.pop();
                    }
                    _processQueue.push({ next, current, meta });
                    _deferredProcessQueue = _processQueue;
                    _processQueue = [];
                    break;
                }
                continue;
            }
            const { widget, item, dom } = result;
            widget && _processQueue.push(widget);
            item && _processQueue.push(item);
            dom && _applicationQueue.push(dom);
        }
    }
    function _processOne({ current, next }) {
        if (current !== next) {
            if (!current && next) {
                if (isVNodeWrapper(next)) {
                    return _createDom({ next });
                }
                else {
                    return _createWidget({ next });
                }
            }
            else if (current && next) {
                if (isVNodeWrapper(current) && isVNodeWrapper(next)) {
                    return _updateDom({ current, next });
                }
                else if (isWNodeWrapper(current) && isWNodeWrapper(next)) {
                    return _updateWidget({ current, next });
                }
            }
            else if (current && !next) {
                if (isVNodeWrapper(current)) {
                    return _removeDom({ current });
                }
                else if (isWNodeWrapper(current)) {
                    return _removeWidget({ current });
                }
            }
        }
        return {};
    }
    function createWidgetOptions(id, widgetId, middleware) {
        return {
            id,
            properties: () => {
                const widgetMeta = widgetMetaMap.get(widgetId);
                if (widgetMeta) {
                    widgetMeta.propertiesCalled = true;
                    return Object.assign({}, widgetMeta.properties);
                }
                return {};
            },
            children: () => {
                const widgetMeta = widgetMetaMap.get(widgetId);
                if (widgetMeta) {
                    return widgetMeta.children;
                }
                return [];
            },
            middleware
        };
    }
    function resolveMiddleware(middlewares, id, middlewareIds = []) {
        const keys = Object.keys(middlewares);
        const results = {};
        const uniqueId = `${id}-${metaId++}`;
        for (let i = 0; i < keys.length; i++) {
            const middleware = middlewares[keys[i]]();
            const payload = createWidgetOptions(uniqueId, id);
            if (middleware.middlewares) {
                const { middlewares: resolvedMiddleware } = resolveMiddleware(middleware.middlewares, id, middlewareIds);
                payload.middleware = resolvedMiddleware;
                results[keys[i]] = middleware.callback(payload);
            }
            else {
                results[keys[i]] = middleware.callback(payload);
            }
        }
        middlewareIds.push(uniqueId);
        return { middlewares: results, ids: middlewareIds };
    }
    function _createWidget({ next }) {
        let { node: { widgetConstructor } } = next;
        let { registry } = _mountOptions;
        let Constructor = next.registryItem || widgetConstructor;
        if (!Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWidget"])(Constructor)) {
            resolveRegistryItem(next);
            if (!next.registryItem) {
                return false;
            }
            Constructor = next.registryItem;
        }
        let rendered;
        let invalidate;
        next.properties = Object.assign({}, next.node.properties);
        next.id = next.id || `${wrapperId++}`;
        _idToWrapperMap.set(next.id, next);
        const { id, depth, order } = next;
        if (!Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWidgetBaseConstructor"])(Constructor)) {
            let widgetMeta = widgetMetaMap.get(id);
            if (!widgetMeta) {
                invalidate = () => {
                    const widgetMeta = widgetMetaMap.get(id);
                    if (widgetMeta) {
                        widgetMeta.dirty = true;
                        if (!widgetMeta.rendering && _idToWrapperMap.has(id)) {
                            _invalidationQueue.push({ id, depth, order });
                            _schedule();
                        }
                    }
                };
                widgetMeta = {
                    widgetName: Constructor.name || 'unknown',
                    mountNode: _mountOptions.domNode,
                    dirty: false,
                    invalidator: invalidate,
                    properties: wrapFunctionProperties(id, next.node.properties),
                    originalProperties: Object.assign({}, next.node.properties),
                    children: next.node.children,
                    deferRefs: 0,
                    rendering: true,
                    middleware: {},
                    middlewareIds: [],
                    registry: _mountOptions.registry,
                    propertiesCalled: false
                };
                widgetMetaMap.set(next.id, widgetMeta);
                if (Constructor.middlewares && Object.keys(Constructor.middlewares).length) {
                    const { middlewares, ids } = resolveMiddleware(Constructor.middlewares, id);
                    widgetMeta.middleware = middlewares;
                    widgetMeta.middlewareIds = ids;
                }
            }
            else {
                invalidate = widgetMeta.invalidator;
            }
            rendered = Constructor(createWidgetOptions(id, id, widgetMeta.middleware));
            widgetMeta.rendering = false;
            widgetMeta.propertiesCalled = false;
            if (widgetMeta.deferRefs > 0) {
                return false;
            }
        }
        else {
            let instance = new Constructor();
            instance.registry.base = registry;
            const instanceData = widgetInstanceMap.get(instance);
            invalidate = () => {
                instanceData.dirty = true;
                if (!instanceData.rendering && _idToWrapperMap.has(id)) {
                    _invalidationQueue.push({ id, depth, order });
                    _schedule();
                }
            };
            instanceData.invalidate = invalidate;
            instanceData.rendering = true;
            instance.__setProperties__(next.node.properties);
            instance.__setChildren__(next.node.children);
            next.instance = instance;
            rendered = instance.__render__();
            instanceData.rendering = false;
        }
        let children;
        if (rendered) {
            rendered = Array.isArray(rendered) ? rendered : [rendered];
            children = renderedToWrapper(rendered, next, null);
            _idToChildrenWrappers.set(id, children);
        }
        if (!parentInvalidate && !Constructor.isWNodeWrapper) {
            parentInvalidate = invalidate;
        }
        return {
            item: {
                next: children,
                meta: { mergeNodes: next.mergeNodes }
            },
            widget: { type: 'attach', instance: next.instance, id, attached: true }
        };
    }
    function _updateWidget({ current, next }) {
        current = getWNodeWrapper(current.id) || current;
        const { instance, domNode, hasAnimations, id } = current;
        let { node: { widgetConstructor } } = next;
        const Constructor = next.registryItem || widgetConstructor;
        if (!Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWidget"])(Constructor)) {
            return {};
        }
        let rendered;
        let processResult = {};
        let didRender = false;
        let currentChildren = _idToChildrenWrappers.get(current.id);
        next.hasAnimations = hasAnimations;
        next.id = id;
        next.properties = Object.assign({}, next.node.properties);
        _wrapperSiblingMap.delete(current);
        if (domNode && domNode.parentNode) {
            next.domNode = domNode;
        }
        if (!Object(_Registry__WEBPACK_IMPORTED_MODULE_6__["isWidgetBaseConstructor"])(Constructor)) {
            const widgetMeta = widgetMetaMap.get(id);
            if (widgetMeta) {
                widgetMeta.originalProperties = Object.assign({}, next.properties);
                widgetMeta.properties = wrapFunctionProperties(id, widgetMeta.originalProperties);
                widgetMeta.children = next.node.children;
                widgetMeta.rendering = true;
                const customProperties = runDiffs(widgetMeta, current.properties, widgetMeta.originalProperties);
                widgetMeta.properties = Object.assign({}, widgetMeta.properties, customProperties);
                if (current.node.children.length > 0 || next.node.children.length > 0) {
                    widgetMeta.dirty = true;
                }
                if (!widgetMeta.dirty) {
                    propertiesDiff(current.properties, next.properties, () => {
                        widgetMeta.dirty = true;
                    }, widgetMeta.customDiffProperties ? [...widgetMeta.customDiffProperties.values()] : []);
                }
                if (widgetMeta.dirty) {
                    _idToChildrenWrappers.delete(id);
                    didRender = true;
                    rendered = Constructor(createWidgetOptions(id, id, widgetMeta.middleware));
                    widgetMeta.dirty = false;
                    if (widgetMeta.deferRefs > 0) {
                        rendered = null;
                    }
                }
                widgetMeta.rendering = false;
                widgetMeta.propertiesCalled = false;
            }
        }
        else {
            const instanceData = widgetInstanceMap.get(instance);
            next.instance = instance;
            instanceData.rendering = true;
            instance.__setProperties__(next.node.properties);
            instance.__setChildren__(next.node.children);
            if (instanceData.dirty) {
                didRender = true;
                _idToChildrenWrappers.delete(id);
                rendered = instance.__render__();
            }
            instanceData.rendering = false;
        }
        _idToWrapperMap.set(next.id, next);
        processResult.widget = { type: 'attach', instance, id, attached: false };
        let children;
        if (rendered) {
            rendered = Array.isArray(rendered) ? rendered : [rendered];
            children = renderedToWrapper(rendered, next, current);
            _idToChildrenWrappers.set(id, children);
        }
        if (didRender) {
            processResult.item = {
                current: currentChildren,
                next: children,
                meta: {}
            };
        }
        return processResult;
    }
    function _removeWidget({ current }) {
        current = getWNodeWrapper(current.id) || current;
        _idToWrapperMap.delete(current.id);
        const meta = widgetMetaMap.get(current.id);
        let currentChildren = _idToChildrenWrappers.get(current.id);
        _idToChildrenWrappers.delete(current.id);
        _wrapperSiblingMap.delete(current);
        let processResult = {
            item: {
                current: currentChildren,
                meta: {}
            }
        };
        if (meta) {
            meta.registryHandler && meta.registryHandler.destroy();
            destroyHandles(meta);
            widgetMetaMap.delete(current.id);
        }
        else {
            processResult.widget = { type: 'detach', current, instance: current.instance };
        }
        return processResult;
    }
    function findDomNodeOnParentWrapper(id) {
        const children = _idToChildrenWrappers.get(id) || [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.domNode) {
                return child.id;
            }
            const childId = findDomNodeOnParentWrapper(child.id);
            if (childId) {
                return childId;
            }
        }
    }
    function _createDom({ next }) {
        const parentDomNode = findParentDomNode(next);
        const isVirtual = isVirtualWrapper(next);
        const isBody = isBodyWrapper(next);
        let mergeNodes = [];
        next.id = `${wrapperId++}`;
        _idToWrapperMap.set(next.id, next);
        if (!next.domNode) {
            if (next.node.domNode) {
                next.domNode = next.node.domNode;
            }
            else {
                if (next.node.tag === 'svg') {
                    next.namespace = NAMESPACE_SVG;
                }
                if (isBody) {
                    next.domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.body;
                }
                else if (next.node.tag && !isVirtual) {
                    if (next.namespace) {
                        next.domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.createElementNS(next.namespace, next.node.tag);
                    }
                    else {
                        next.domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.createElement(next.node.tag);
                    }
                }
                else if (next.node.text != null) {
                    next.domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.createTextNode(next.node.text);
                }
            }
            if (_insertBeforeMap && _allMergedNodes.length) {
                if (parentDomNode === _allMergedNodes[0].parentNode) {
                    _insertBeforeMap.set(next, _allMergedNodes[0]);
                }
            }
        }
        else if (_mountOptions.merge) {
            next.merged = true;
            if (isTextNode(next.domNode)) {
                if (next.domNode.data !== next.node.text) {
                    _allMergedNodes = [next.domNode, ..._allMergedNodes];
                    next.domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.createTextNode(next.node.text);
                    next.merged = false;
                }
            }
            else {
                mergeNodes = arrayFrom(next.domNode.childNodes);
                _allMergedNodes = [..._allMergedNodes, ...mergeNodes];
            }
        }
        let children;
        if (next.domNode || isVirtual) {
            if (next.node.children && next.node.children.length) {
                children = renderedToWrapper(next.node.children, next, null);
                _idToChildrenWrappers.set(next.id, children);
            }
        }
        const dom = isVirtual || isBody
            ? undefined
            : {
                next: next,
                parentDomNode: parentDomNode,
                type: 'create'
            };
        if (children) {
            return {
                item: {
                    current: [],
                    next: children,
                    meta: { mergeNodes }
                },
                dom,
                widget: isVirtual ? { type: 'attach', id: next.id, attached: false } : undefined
            };
        }
        return { dom };
    }
    function _updateDom({ current, next }) {
        next.domNode = current.domNode;
        next.namespace = current.namespace;
        next.id = current.id;
        next.childDomWrapperId = current.childDomWrapperId;
        let children;
        let currentChildren = _idToChildrenWrappers.get(next.id);
        if (next.node.text != null && next.node.text !== current.node.text) {
            next.domNode = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.createTextNode(next.node.text);
        }
        else if (next.node.children) {
            children = renderedToWrapper(next.node.children, next, current);
            _idToChildrenWrappers.set(next.id, children);
        }
        _wrapperSiblingMap.delete(current);
        _idToWrapperMap.set(next.id, next);
        return {
            item: {
                current: currentChildren,
                next: children,
                meta: {}
            },
            dom: { type: 'update', next, current }
        };
    }
    function _removeDom({ current }) {
        const isVirtual = isVirtualWrapper(current);
        const isBody = isBodyWrapper(current);
        const children = _idToChildrenWrappers.get(current.id);
        _idToChildrenWrappers.delete(current.id);
        _idToWrapperMap.delete(current.id);
        _wrapperSiblingMap.delete(current);
        if (current.node.properties.key) {
            const widgetMeta = widgetMetaMap.get(current.owningId);
            const parentWrapper = getWNodeWrapper(current.owningId);
            if (widgetMeta) {
                widgetMeta.nodeMap && widgetMeta.nodeMap.delete(current.node.properties.key);
            }
            else if (parentWrapper && parentWrapper.instance) {
                const instanceData = widgetInstanceMap.get(parentWrapper.instance);
                instanceData && instanceData.nodeHandler.remove(current.node.properties.key);
            }
        }
        if (current.hasAnimations || isVirtual || isBody) {
            return {
                item: { current: children, meta: {} },
                dom: isVirtual || isBody ? undefined : { type: 'delete', current }
            };
        }
        if (children) {
            _deferredRenderCallbacks.push(() => {
                let wrappers = children || [];
                let wrapper;
                let bodyIds = [];
                while ((wrapper = wrappers.pop())) {
                    if (isWNodeWrapper(wrapper)) {
                        wrapper = getWNodeWrapper(wrapper.id) || wrapper;
                        if (wrapper.instance) {
                            const instanceData = widgetInstanceMap.get(wrapper.instance);
                            instanceData && instanceData.onDetach();
                            wrapper.instance = undefined;
                        }
                        else {
                            const meta = widgetMetaMap.get(wrapper.id);
                            if (meta) {
                                meta.registryHandler && meta.registryHandler.destroy();
                                destroyHandles(meta);
                                widgetMetaMap.delete(wrapper.id);
                            }
                        }
                    }
                    let wrapperChildren = _idToChildrenWrappers.get(wrapper.id);
                    if (wrapperChildren) {
                        wrappers.push(...wrapperChildren);
                    }
                    if (isBodyWrapper(wrapper)) {
                        bodyIds.push(wrapper.id);
                    }
                    else if (bodyIds.indexOf(wrapper.parentId) !== -1) {
                        if (isWNodeWrapper(wrapper) || isVirtualWrapper(wrapper)) {
                            bodyIds.push(wrapper.id);
                        }
                        else if (wrapper.domNode && wrapper.domNode.parentNode) {
                            wrapper.domNode.parentNode.removeChild(wrapper.domNode);
                        }
                    }
                    _idToChildrenWrappers.delete(wrapper.id);
                    _idToWrapperMap.delete(wrapper.id);
                }
            });
        }
        return {
            dom: { type: 'delete', current }
        };
    }
    return {
        mount,
        unmount,
        invalidate
    };
}
/* harmony default export */ __webpack_exports__["default"] = (renderer);


/***/ }),

/***/ "./node_modules/@dojo/framework/routing/ActiveLink.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/framework/routing/ActiveLink.mjs ***!
  \*************************************************************/
/*! exports provided: ActiveLink, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActiveLink", function() { return ActiveLink; });
/* harmony import */ var _core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _core_middleware_injector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/middleware/injector */ "./node_modules/@dojo/framework/core/middleware/injector.mjs");
/* harmony import */ var _core_middleware_icache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/middleware/icache */ "./node_modules/@dojo/framework/core/middleware/icache.mjs");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Link */ "./node_modules/@dojo/framework/routing/Link.mjs");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};




function paramsEqual(linkParams = {}, contextParams = {}) {
    return Object.keys(linkParams).every((key) => linkParams[key] === contextParams[key]);
}
const factory = Object(_core_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ injector: _core_middleware_injector__WEBPACK_IMPORTED_MODULE_1__["default"], diffProperty: _core_vdom__WEBPACK_IMPORTED_MODULE_0__["diffProperty"], icache: _core_middleware_icache__WEBPACK_IMPORTED_MODULE_2__["default"], invalidator: _core_vdom__WEBPACK_IMPORTED_MODULE_0__["invalidator"] }).properties();
const ActiveLink = factory(function ActiveLink({ middleware: { diffProperty, injector, icache, invalidator }, properties, children }) {
    const { to, routerKey = 'router', params } = properties();
    let _a = properties(), { activeClasses, isExact, classes = [] } = _a, props = __rest(_a, ["activeClasses", "isExact", "classes"]);
    diffProperty('to', (current, next) => {
        if (current.to !== next.to) {
            const router = injector.get(routerKey);
            const currentHandle = icache.get('handle');
            if (currentHandle) {
                currentHandle.destroy();
            }
            if (router) {
                const handle = router.on('route', ({ route }) => {
                    if (route.id === to) {
                        invalidator();
                    }
                });
                icache.set('handle', () => handle);
            }
            invalidator();
        }
    });
    const router = injector.get(routerKey);
    if (router) {
        if (!icache.get('handle')) {
            const handle = router.on('route', ({ route }) => {
                if (route.id === to) {
                    invalidator();
                }
            });
            icache.set('handle', () => handle);
        }
        const context = router.getRoute(to);
        const isActive = context && paramsEqual(params, Object.assign({}, context.params, context.queryParams));
        const contextIsExact = context && context.isExact();
        classes = Array.isArray(classes) ? classes : [classes];
        if (isActive && (!isExact || contextIsExact)) {
            classes = [...classes, ...activeClasses];
        }
        props = Object.assign({}, props, { classes });
    }
    return Object(_core_vdom__WEBPACK_IMPORTED_MODULE_0__["w"])(_Link__WEBPACK_IMPORTED_MODULE_3__["default"], props, children());
});
/* harmony default export */ __webpack_exports__["default"] = (ActiveLink);


/***/ }),

/***/ "./node_modules/@dojo/framework/routing/Link.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/@dojo/framework/routing/Link.mjs ***!
  \*******************************************************/
/*! exports provided: Link, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var _core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _core_middleware_injector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/middleware/injector */ "./node_modules/@dojo/framework/core/middleware/injector.mjs");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};



const factory = Object(_core_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ injector: _core_middleware_injector__WEBPACK_IMPORTED_MODULE_2__["default"] }).properties();
const Link = factory(function Link({ middleware: { injector }, properties, children }) {
    let _a = properties(), { routerKey = 'router', to, isOutlet = true, target, params = {}, onClick } = _a, props = __rest(_a, ["routerKey", "to", "isOutlet", "target", "params", "onClick"]);
    const router = injector.get(routerKey);
    let href = to;
    let linkProps;
    if (router) {
        if (isOutlet) {
            href = router.link(href, params);
        }
        const onclick = (event) => {
            onClick && onClick(event);
            if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !target) {
                if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('build-serve') || !Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('build-time-rendered')) {
                    event.preventDefault();
                    href !== undefined && router.setPath(href);
                }
            }
        };
        linkProps = Object.assign({}, props, { onclick, href });
    }
    else {
        linkProps = Object.assign({}, props, { href });
    }
    return Object(_core_vdom__WEBPACK_IMPORTED_MODULE_0__["v"])('a', linkProps, children());
});
/* harmony default export */ __webpack_exports__["default"] = (Link);


/***/ }),

/***/ "./node_modules/@dojo/framework/routing/Outlet.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/@dojo/framework/routing/Outlet.mjs ***!
  \*********************************************************/
/*! exports provided: Outlet, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Outlet", function() { return Outlet; });
/* harmony import */ var _core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _core_middleware_injector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/middleware/injector */ "./node_modules/@dojo/framework/core/middleware/injector.mjs");
/* harmony import */ var _core_middleware_icache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/middleware/icache */ "./node_modules/@dojo/framework/core/middleware/icache.mjs");



const ROUTER_KEY = 'router';
const factory = Object(_core_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ icache: _core_middleware_icache__WEBPACK_IMPORTED_MODULE_2__["default"], injector: _core_middleware_injector__WEBPACK_IMPORTED_MODULE_1__["default"], diffProperty: _core_vdom__WEBPACK_IMPORTED_MODULE_0__["diffProperty"], invalidator: _core_vdom__WEBPACK_IMPORTED_MODULE_0__["invalidator"] })
    .properties()
    .children();
const Outlet = factory(function Outlet({ middleware: { icache, injector, diffProperty, invalidator }, properties, children }) {
    diffProperty('routerKey', (current, next) => {
        const { routerKey: currentRouterKey = ROUTER_KEY } = current;
        const { routerKey = ROUTER_KEY } = next;
        if (routerKey !== currentRouterKey) {
            const currentHandle = icache.get('handle');
            if (currentHandle) {
                currentHandle();
            }
            const handle = injector.subscribe(routerKey);
            if (handle) {
                icache.set('handle', () => handle);
            }
        }
        invalidator();
    });
    const { id, matcher, routerKey = ROUTER_KEY } = properties();
    const [outletChildren] = children();
    const currentHandle = icache.get('handle');
    if (!currentHandle) {
        const handle = injector.subscribe(routerKey);
        if (handle) {
            icache.set('handle', () => handle);
        }
    }
    const router = injector.get(routerKey);
    if (router) {
        const currentRouteContext = router.getMatchedRoute();
        const routeContextMap = router.getOutlet(id);
        if (routeContextMap && currentRouteContext) {
            if (typeof outletChildren === 'function') {
                return outletChildren(Object.assign({}, currentRouteContext, { router }));
            }
            let matches = Object.keys(outletChildren).reduce((matches, key) => {
                matches[key] = !!routeContextMap.get(key);
                return matches;
            }, {});
            if (matcher) {
                matches = matcher(matches, routeContextMap);
            }
            return (Object(_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])("virtual", null, Object.keys(matches)
                .filter((key) => matches[key])
                .map((key) => {
                const renderer = outletChildren[key];
                if (typeof renderer === 'function') {
                    const context = routeContextMap.get(key) || currentRouteContext;
                    return renderer(Object.assign({}, context, { router }));
                }
                return renderer;
            })));
        }
    }
    return null;
});
/* harmony default export */ __webpack_exports__["default"] = (Outlet);


/***/ }),

/***/ "./node_modules/@dojo/framework/routing/Router.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/@dojo/framework/routing/Router.mjs ***!
  \*********************************************************/
/*! exports provided: Router, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony import */ var _shim_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _core_Evented__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Evented */ "./node_modules/@dojo/framework/core/Evented.mjs");
/* harmony import */ var _history_HashHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history/HashHistory */ "./node_modules/@dojo/framework/routing/history/HashHistory.mjs");



const PARAM = '__PARAM__';
const paramRegExp = new RegExp(/^{.+}$/);
const ROUTE_SEGMENT_SCORE = 7;
const DYNAMIC_SEGMENT_PENALTY = 2;
function matchingParams({ params: previousParams }, { params }) {
    const matching = Object.keys(previousParams).every((key) => previousParams[key] === params[key]);
    if (!matching) {
        return false;
    }
    return Object.keys(params).every((key) => previousParams[key] === params[key]);
}
class Router extends _core_Evented__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(config, options = {}) {
        super();
        this._routes = [];
        this._routeMap = Object.create(null);
        this._matchedRoutes = Object.create(null);
        this._matchedOutletMap = new Map();
        this._currentParams = {};
        this._currentQueryParams = {};
        /**
         * Called on change of the route by the the registered history manager. Matches the path against
         * the registered outlets.
         *
         * @param requestedPath The path of the requested route
         */
        this._onChange = (requestedPath) => {
            requestedPath = this._stripLeadingSlash(requestedPath);
            const previousMatchedRoutes = this._matchedRoutes;
            this._matchedRoutes = Object.create(null);
            this._matchedOutletMap.clear();
            const [path, queryParamString] = requestedPath.split('?');
            this._currentQueryParams = this._getQueryParams(queryParamString);
            const segments = path.split('/');
            let routeConfigs = this._routes.map((route) => ({
                route,
                segments: [...segments],
                parent: undefined,
                params: {},
                type: 'index'
            }));
            let routeConfig;
            let matchedRoutes = [];
            while ((routeConfig = routeConfigs.pop())) {
                const { route, parent, segments, params } = routeConfig;
                let segmentIndex = 0;
                let type = 'index';
                let paramIndex = 0;
                let routeMatch = true;
                if (segments.length < route.segments.length) {
                    routeMatch = false;
                }
                else {
                    while (segments.length > 0) {
                        if (route.segments[segmentIndex] === undefined) {
                            type = 'partial';
                            break;
                        }
                        const segment = segments.shift();
                        if (route.segments[segmentIndex] === PARAM) {
                            params[route.params[paramIndex++]] = segment;
                            this._currentParams = Object.assign({}, this._currentParams, params);
                        }
                        else if (route.segments[segmentIndex] !== segment) {
                            routeMatch = false;
                            break;
                        }
                        segmentIndex++;
                    }
                }
                if (routeMatch) {
                    routeConfig.type = type;
                    matchedRoutes.push({ route, parent, type, params, segments: [] });
                    if (segments.length) {
                        routeConfigs = [
                            ...routeConfigs,
                            ...route.children.map((childRoute) => ({
                                route: childRoute,
                                segments: [...segments],
                                parent: routeConfig,
                                type,
                                params: Object.assign({}, params)
                            }))
                        ];
                    }
                }
            }
            let matchedRouteId = undefined;
            let matchedRoute = matchedRoutes.shift();
            while (matchedRoute && matchedRoutes.length) {
                let currentMatch = matchedRoutes.shift();
                if (currentMatch && currentMatch.route.score > matchedRoute.route.score) {
                    matchedRoute = currentMatch;
                }
            }
            if (matchedRoute) {
                if (matchedRoute.type === 'partial') {
                    matchedRoute.type = 'error';
                }
                matchedRouteId = matchedRoute.route.id;
                const title = this._options.setDocumentTitle
                    ? this._options.setDocumentTitle({
                        id: matchedRouteId,
                        title: matchedRoute.route.title,
                        params: matchedRoute.params,
                        queryParams: this._currentQueryParams
                    })
                    : matchedRoute.route.title;
                if (title) {
                    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].document.title = title;
                }
                while (matchedRoute) {
                    let { type, params, route } = matchedRoute;
                    let parent = matchedRoute.parent;
                    const matchedRouteContext = {
                        id: route.id,
                        outlet: route.outlet,
                        queryParams: this._currentQueryParams,
                        params,
                        type,
                        isError: () => type === 'error',
                        isExact: () => type === 'index'
                    };
                    const previousMatchedOutlet = previousMatchedRoutes[route.id];
                    const routeMap = this._matchedOutletMap.get(route.outlet) || new Map();
                    routeMap.set(route.id, matchedRouteContext);
                    this._matchedOutletMap.set(route.outlet, routeMap);
                    this._matchedRoutes[route.id] = matchedRouteContext;
                    if (!previousMatchedOutlet || !matchingParams(previousMatchedOutlet, matchedRouteContext)) {
                        this.emit({ type: 'route', route: matchedRouteContext, action: 'enter' });
                        this.emit({ type: 'outlet', outlet: matchedRouteContext, action: 'enter' });
                    }
                    matchedRoute = parent;
                }
            }
            else {
                this._matchedRoutes.errorRoute = {
                    id: 'errorRoute',
                    outlet: 'errorRoute',
                    queryParams: {},
                    params: {},
                    isError: () => true,
                    isExact: () => false,
                    type: 'error'
                };
            }
            const previousMatchedOutletKeys = Object.keys(previousMatchedRoutes);
            for (let i = 0; i < previousMatchedOutletKeys.length; i++) {
                const key = previousMatchedOutletKeys[i];
                const matchedRoute = this._matchedRoutes[key];
                if (!matchedRoute || !matchingParams(previousMatchedRoutes[key], matchedRoute)) {
                    this.emit({ type: 'route', route: previousMatchedRoutes[key], action: 'exit' });
                    this.emit({ type: 'outlet', outlet: previousMatchedRoutes[key], action: 'exit' });
                }
            }
            this._currentMatchedRoute = matchedRouteId ? this._matchedRoutes[matchedRouteId] : undefined;
            this.emit({
                type: 'nav',
                outlet: matchedRouteId,
                context: this._currentMatchedRoute
            });
            if (this._options.resetScroll) {
                const { window = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].window } = this._options;
                try {
                    window.scroll(0, 0);
                }
                catch (e) {
                    // Catch errors if we're in an environment without window.scroll
                }
            }
        };
        this._options = options;
        this._register(config);
        const autostart = options.autostart === undefined ? true : options.autostart;
        if (autostart) {
            this.start();
        }
    }
    /**
     * Sets the path against the registered history manager
     *
     * @param path The path to set on the history manager
     */
    setPath(path) {
        this._history.set(path);
    }
    start() {
        const { HistoryManager = _history_HashHistory__WEBPACK_IMPORTED_MODULE_2__["HashHistory"], base, window } = this._options;
        this._history = new HistoryManager({ onChange: this._onChange, base, window });
        if (this._matchedRoutes.errorRoute && this._defaultRoute) {
            const path = this.link(this._defaultRoute);
            if (path) {
                this.setPath(path);
            }
        }
    }
    /**
     * Generate a link for a given outlet identifier and optional params.
     *
     * @param outlet The outlet to generate a link for
     * @param params Optional Params for the generated link
     */
    link(outlet, params = {}) {
        let route = this._routeMap[outlet];
        if (route === undefined) {
            return;
        }
        let linkPath = route.fullPath;
        if (route.fullQueryParams.length > 0) {
            let queryString = route.fullQueryParams.reduce((queryParamString, param, index) => {
                if (index > 0) {
                    return `${queryParamString}&${param}={${param}}`;
                }
                return `?${param}={${param}}`;
            }, '');
            linkPath = `${linkPath}${queryString}`;
        }
        params = Object.assign({}, route.defaultParams, this._currentQueryParams, this._currentParams, params);
        if (Object.keys(params).length === 0 && route.fullParams.length > 0) {
            return undefined;
        }
        const fullParams = [...route.fullParams, ...route.fullQueryParams];
        for (let i = 0; i < fullParams.length; i++) {
            const param = fullParams[i];
            if (params[param]) {
                linkPath = linkPath.replace(`{${param}}`, params[param]);
            }
            else {
                return undefined;
            }
        }
        return this._history.prefix(linkPath);
    }
    /**
     * Returns the route context for the route identifier if one has been matched
     *
     * @param routeId The route identifer
     */
    getRoute(routeId) {
        return this._matchedRoutes[routeId];
    }
    getOutlet(outletId) {
        return this._matchedOutletMap.get(outletId);
    }
    getMatchedRoute() {
        return this._currentMatchedRoute;
    }
    /**
     * Returns all the params for the current matched outlets
     */
    get currentParams() {
        return this._currentParams;
    }
    /**
     * Strips the leading slash on a path if one exists
     *
     * @param path The path to strip a leading slash
     */
    _stripLeadingSlash(path) {
        if (path[0] === '/') {
            return path.slice(1);
        }
        return path;
    }
    /**
     * Registers the routing configuration
     *
     * @param config The configuration
     * @param routes The routes
     * @param parentRoute The parent route
     */
    _register(config, routes, parentRoute) {
        routes = routes ? routes : this._routes;
        for (let i = 0; i < config.length; i++) {
            let { path, outlet, children, defaultRoute = false, defaultParams = {}, id, title } = config[i];
            let [parsedPath, queryParamString] = path.split('?');
            let queryParams = [];
            parsedPath = this._stripLeadingSlash(parsedPath);
            const segments = parsedPath.split('/');
            const route = {
                params: [],
                id,
                outlet,
                title,
                path: parsedPath,
                segments,
                defaultParams: parentRoute ? Object.assign({}, parentRoute.defaultParams, defaultParams) : defaultParams,
                children: [],
                fullPath: parentRoute ? `${parentRoute.fullPath}/${parsedPath}` : parsedPath,
                fullParams: [],
                fullQueryParams: [],
                score: parentRoute ? parentRoute.score : 0
            };
            if (defaultRoute) {
                this._defaultRoute = id;
            }
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i];
                route.score += ROUTE_SEGMENT_SCORE;
                if (paramRegExp.test(segment)) {
                    route.score -= DYNAMIC_SEGMENT_PENALTY;
                    route.params.push(segment.replace('{', '').replace('}', ''));
                    segments[i] = PARAM;
                }
            }
            if (queryParamString) {
                queryParams = queryParamString.split('&').map((queryParam) => {
                    return queryParam.replace('{', '').replace('}', '');
                });
            }
            route.fullQueryParams = parentRoute ? [...parentRoute.fullQueryParams, ...queryParams] : queryParams;
            route.fullParams = parentRoute ? [...parentRoute.fullParams, ...route.params] : route.params;
            if (children && children.length > 0) {
                this._register(children, route.children, route);
            }
            this._routeMap[id] = route;
            routes.push(route);
        }
    }
    /**
     * Returns an object of query params
     *
     * @param queryParamString The string of query params, e.g `paramOne=one&paramTwo=two`
     */
    _getQueryParams(queryParamString) {
        const queryParams = {};
        if (queryParamString) {
            const queryParameters = queryParamString.split('&');
            for (let i = 0; i < queryParameters.length; i++) {
                const [key, value] = queryParameters[i].split('=');
                queryParams[key] = value;
            }
        }
        return queryParams;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Router);


/***/ }),

/***/ "./node_modules/@dojo/framework/routing/RouterInjector.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/framework/routing/RouterInjector.mjs ***!
  \*****************************************************************/
/*! exports provided: registerRouterInjector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerRouterInjector", function() { return registerRouterInjector; });
/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Router */ "./node_modules/@dojo/framework/routing/Router.mjs");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

/**
 * Creates a router instance for a specific History manager (default is `HashHistory`) and registers
 * the route configuration.
 *
 * @param config The route config to register for the router
 * @param registry An optional registry that defaults to the global registry
 * @param options The router injector options
 */
function registerRouterInjector(config, registry, options = {}) {
    const { key = 'router' } = options, routerOptions = __rest(options, ["key"]);
    if (registry.hasInjector(key)) {
        throw new Error('Router has already been defined');
    }
    const router = new _Router__WEBPACK_IMPORTED_MODULE_0__["Router"](config, routerOptions);
    registry.defineInjector(key, (invalidator) => {
        router.on('nav', () => invalidator());
        return () => router;
    });
    return router;
}


/***/ }),

/***/ "./node_modules/@dojo/framework/routing/history/HashHistory.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/framework/routing/history/HashHistory.mjs ***!
  \**********************************************************************/
/*! exports provided: HashHistory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashHistory", function() { return HashHistory; });
/* harmony import */ var _shim_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shim/global */ "./node_modules/@dojo/framework/shim/global.mjs");

class HashHistory {
    constructor({ window = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].window, onChange }) {
        this._onChange = () => {
            const path = this.normalizePath(this._window.location.hash);
            if (path !== this._current) {
                this._current = path;
                this._onChangeFunction(this._current);
            }
        };
        this._onChangeFunction = onChange;
        this._window = window;
        this._window.addEventListener('hashchange', this._onChange, false);
        this._current = this.normalizePath(this._window.location.hash);
        this._onChangeFunction(this._current);
    }
    normalizePath(path) {
        return path.replace('#', '');
    }
    prefix(path) {
        if (path[0] !== '#') {
            return `#${path}`;
        }
        return path;
    }
    set(path) {
        this._window.location.hash = this.prefix(path);
        this._onChange();
    }
    get current() {
        return this._current;
    }
    destroy() {
        this._window.removeEventListener('hashchange', this._onChange);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (HashHistory);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Map.mjs":
/*!***************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/Map.mjs ***!
  \***************************************************/
/*! exports provided: Map, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/* harmony import */ var _iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iterator */ "./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "./node_modules/@dojo/framework/shim/object.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _Symbol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Symbol */ "./node_modules/@dojo/framework/shim/Symbol.mjs");
var _a;
`!has('es6-iterator')`;




`!has('es6-symbol')`;

let Map = _global__WEBPACK_IMPORTED_MODULE_1__["default"].Map;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_3__["default"])('es6-map')) {
    Map = _global__WEBPACK_IMPORTED_MODULE_1__["default"].Map = (_a = class Map {
            constructor(iterable) {
                this._keys = [];
                this._values = [];
                this[Symbol.toStringTag] = 'Map';
                if (iterable) {
                    if (Object(_iterator__WEBPACK_IMPORTED_MODULE_0__["isArrayLike"])(iterable)) {
                        for (let i = 0; i < iterable.length; i++) {
                            const value = iterable[i];
                            this.set(value[0], value[1]);
                        }
                    }
                    else {
                        for (const value of iterable) {
                            this.set(value[0], value[1]);
                        }
                    }
                }
            }
            /**
             * An alternative to Array.prototype.indexOf using Object.is
             * to check for equality. See http://mzl.la/1zuKO2V
             */
            _indexOfKey(keys, key) {
                for (let i = 0, length = keys.length; i < length; i++) {
                    if (Object(_object__WEBPACK_IMPORTED_MODULE_2__["is"])(keys[i], key)) {
                        return i;
                    }
                }
                return -1;
            }
            get size() {
                return this._keys.length;
            }
            clear() {
                this._keys.length = this._values.length = 0;
            }
            delete(key) {
                const index = this._indexOfKey(this._keys, key);
                if (index < 0) {
                    return false;
                }
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            }
            entries() {
                const values = this._keys.map((key, i) => {
                    return [key, this._values[i]];
                });
                return new _iterator__WEBPACK_IMPORTED_MODULE_0__["ShimIterator"](values);
            }
            forEach(callback, context) {
                const keys = this._keys;
                const values = this._values;
                for (let i = 0, length = keys.length; i < length; i++) {
                    callback.call(context, values[i], keys[i], this);
                }
            }
            get(key) {
                const index = this._indexOfKey(this._keys, key);
                return index < 0 ? undefined : this._values[index];
            }
            has(key) {
                return this._indexOfKey(this._keys, key) > -1;
            }
            keys() {
                return new _iterator__WEBPACK_IMPORTED_MODULE_0__["ShimIterator"](this._keys);
            }
            set(key, value) {
                let index = this._indexOfKey(this._keys, key);
                index = index < 0 ? this._keys.length : index;
                this._keys[index] = key;
                this._values[index] = value;
                return this;
            }
            values() {
                return new _iterator__WEBPACK_IMPORTED_MODULE_0__["ShimIterator"](this._values);
            }
            [Symbol.iterator]() {
                return this.entries();
            }
        },
        _a[Symbol.species] = _a,
        _a);
}
/* harmony default export */ __webpack_exports__["default"] = (Map);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Set.mjs":
/*!***************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/Set.mjs ***!
  \***************************************************/
/*! exports provided: Set, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Set", function() { return Set; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterator */ "./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _Symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Symbol */ "./node_modules/@dojo/framework/shim/Symbol.mjs");
var _a;

`!has('es6-iterator')`;


`!has('es6-symbol')`;

let Set = _global__WEBPACK_IMPORTED_MODULE_0__["default"].Set;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_2__["default"])('es6-set')) {
    Set = _global__WEBPACK_IMPORTED_MODULE_0__["default"].Set = (_a = class Set {
            constructor(iterable) {
                this._setData = [];
                this[Symbol.toStringTag] = 'Set';
                if (iterable) {
                    if (Object(_iterator__WEBPACK_IMPORTED_MODULE_1__["isArrayLike"])(iterable)) {
                        for (let i = 0; i < iterable.length; i++) {
                            this.add(iterable[i]);
                        }
                    }
                    else {
                        for (const value of iterable) {
                            this.add(value);
                        }
                    }
                }
            }
            add(value) {
                if (this.has(value)) {
                    return this;
                }
                this._setData.push(value);
                return this;
            }
            clear() {
                this._setData.length = 0;
            }
            delete(value) {
                const idx = this._setData.indexOf(value);
                if (idx === -1) {
                    return false;
                }
                this._setData.splice(idx, 1);
                return true;
            }
            entries() {
                return new _iterator__WEBPACK_IMPORTED_MODULE_1__["ShimIterator"](this._setData.map((value) => [value, value]));
            }
            forEach(callbackfn, thisArg) {
                const iterator = this.values();
                let result = iterator.next();
                while (!result.done) {
                    callbackfn.call(thisArg, result.value, result.value, this);
                    result = iterator.next();
                }
            }
            has(value) {
                return this._setData.indexOf(value) > -1;
            }
            keys() {
                return new _iterator__WEBPACK_IMPORTED_MODULE_1__["ShimIterator"](this._setData);
            }
            get size() {
                return this._setData.length;
            }
            values() {
                return new _iterator__WEBPACK_IMPORTED_MODULE_1__["ShimIterator"](this._setData);
            }
            [Symbol.iterator]() {
                return new _iterator__WEBPACK_IMPORTED_MODULE_1__["ShimIterator"](this._setData);
            }
        },
        _a[Symbol.species] = _a,
        _a);
}
/* harmony default export */ __webpack_exports__["default"] = (Set);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/WeakMap.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/WeakMap.mjs ***!
  \*******************************************************/
/*! exports provided: WeakMap, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeakMap", function() { return WeakMap; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterator */ "./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _Symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Symbol */ "./node_modules/@dojo/framework/shim/Symbol.mjs");

`!has('es6-iterator')`;


`!has('es6-symbol')`;

let WeakMap = _global__WEBPACK_IMPORTED_MODULE_0__["default"].WeakMap;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_2__["default"])('es6-weakmap')) {
    const DELETED = {};
    const getUID = function getUID() {
        return Math.floor(Math.random() * 100000000);
    };
    const generateName = (function () {
        let startId = Math.floor(Date.now() % 100000000);
        return function generateName() {
            return '__wm' + getUID() + (startId++ + '__');
        };
    })();
    WeakMap = _global__WEBPACK_IMPORTED_MODULE_0__["default"].WeakMap = class WeakMap {
        constructor(iterable) {
            this[Symbol.toStringTag] = 'WeakMap';
            this._name = generateName();
            this._frozenEntries = [];
            if (iterable) {
                if (Object(_iterator__WEBPACK_IMPORTED_MODULE_1__["isArrayLike"])(iterable)) {
                    for (let i = 0; i < iterable.length; i++) {
                        const item = iterable[i];
                        this.set(item[0], item[1]);
                    }
                }
                else {
                    for (const [key, value] of iterable) {
                        this.set(key, value);
                    }
                }
            }
        }
        _getFrozenEntryIndex(key) {
            for (let i = 0; i < this._frozenEntries.length; i++) {
                if (this._frozenEntries[i].key === key) {
                    return i;
                }
            }
            return -1;
        }
        delete(key) {
            if (key === undefined || key === null) {
                return false;
            }
            const entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED) {
                entry.value = DELETED;
                return true;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                this._frozenEntries.splice(frozenIndex, 1);
                return true;
            }
            return false;
        }
        get(key) {
            if (key === undefined || key === null) {
                return undefined;
            }
            const entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED) {
                return entry.value;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return this._frozenEntries[frozenIndex].value;
            }
        }
        has(key) {
            if (key === undefined || key === null) {
                return false;
            }
            const entry = key[this._name];
            if (Boolean(entry && entry.key === key && entry.value !== DELETED)) {
                return true;
            }
            const frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return true;
            }
            return false;
        }
        set(key, value) {
            if (!key || (typeof key !== 'object' && typeof key !== 'function')) {
                throw new TypeError('Invalid value used as weak map key');
            }
            let entry = key[this._name];
            if (!entry || entry.key !== key) {
                entry = Object.create(null, {
                    key: { value: key }
                });
                if (Object.isFrozen(key)) {
                    this._frozenEntries.push(entry);
                }
                else {
                    Object.defineProperty(key, this._name, {
                        value: entry
                    });
                }
            }
            entry.value = value;
            return this;
        }
    };
}
/* harmony default export */ __webpack_exports__["default"] = (WeakMap);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/array.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/array.mjs ***!
  \*****************************************************/
/*! exports provided: from, of, copyWithin, fill, find, findIndex, includes, flat, flatMap, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "of", function() { return of; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyWithin", function() { return copyWithin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fill", function() { return fill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return includes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flat", function() { return flat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatMap", function() { return flatMap; });
/* harmony import */ var _iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iterator */ "./node_modules/@dojo/framework/shim/iterator.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _support_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./support/util */ "./node_modules/@dojo/framework/shim/support/util.mjs");
`!has('es6-iterator')`;



let from;
/**
 * Creates a new array from the function parameters.
 *
 * @param arguments Any number of arguments for the array
 * @return An array from the given arguments
 */
let of;
/* ES6 Array instance methods */
/**
 * Copies data internally within an array or array-like object.
 *
 * @param target The target array-like object
 * @param offset The index to start copying values to; if negative, it counts backwards from length
 * @param start The first (inclusive) index to copy; if negative, it counts backwards from length
 * @param end The last (exclusive) index to copy; if negative, it counts backwards from length
 * @return The target
 */
let copyWithin;
/**
 * Fills elements of an array-like object with the specified value.
 *
 * @param target The target to fill
 * @param value The value to fill each element of the target with
 * @param start The first index to fill
 * @param end The (exclusive) index at which to stop filling
 * @return The filled target
 */
let fill;
/**
 * Finds and returns the first instance matching the callback or undefined if one is not found.
 *
 * @param target An array-like object
 * @param callback A function returning if the current value matches a criteria
 * @param thisArg The execution context for the find function
 * @return The first element matching the callback, or undefined if one does not exist
 */
let find;
/**
 * Performs a linear search and returns the first index whose value satisfies the passed callback,
 * or -1 if no values satisfy it.
 *
 * @param target An array-like object
 * @param callback A function returning true if the current value satisfies its criteria
 * @param thisArg The execution context for the find function
 * @return The first index whose value satisfies the passed callback, or -1 if no values satisfy it
 */
let findIndex;
/* ES7 Array instance methods */
/**
 * Determines whether an array includes a given value
 *
 * @param target the target array-like object
 * @param searchElement the item to search for
 * @param fromIndex the starting index to search from
 * @return `true` if the array includes the element, otherwise `false`
 */
let includes;
/**
 * Flattens arrays to the depth specified
 *
 * @param target An array-like object
 * @param depth The depth to flatten too, defaults to 1.
 */
let flat;
let flatMap;
// Util functions for filled implementations
let toLength;
let toInteger;
let normalizeOffset;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es6-array') || !Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es6-array-fill') || !Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es7-array')) {
    const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    toLength = function toLength(length) {
        if (isNaN(length)) {
            return 0;
        }
        length = Number(length);
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), MAX_SAFE_INTEGER);
    };
    /**
     * From ES6 7.1.4 ToInteger()
     *
     * @param value A value to convert
     * @return An integer
     */
    toInteger = function toInteger(value) {
        value = Number(value);
        if (isNaN(value)) {
            return 0;
        }
        if (value === 0 || !isFinite(value)) {
            return value;
        }
        return (value > 0 ? 1 : -1) * Math.floor(Math.abs(value));
    };
    /**
     * Normalizes an offset against a given length, wrapping it if negative.
     *
     * @param value The original offset
     * @param length The total length to normalize against
     * @return If negative, provide a distance from the end (length); otherwise provide a distance from 0
     */
    normalizeOffset = function normalizeOffset(value, length) {
        return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es6-array')) {
    Array.from = function from(arrayLike, mapFunction, thisArg) {
        if (arrayLike == null) {
            throw new TypeError('from: requires an array-like object');
        }
        if (mapFunction && thisArg) {
            mapFunction = mapFunction.bind(thisArg);
        }
        /* tslint:disable-next-line:variable-name */
        const Constructor = this;
        const length = toLength(arrayLike.length);
        // Support extension
        const array = typeof Constructor === 'function' ? Object(new Constructor(length)) : new Array(length);
        if (!Object(_iterator__WEBPACK_IMPORTED_MODULE_0__["isArrayLike"])(arrayLike) && !Object(_iterator__WEBPACK_IMPORTED_MODULE_0__["isIterable"])(arrayLike)) {
            return array;
        }
        // if this is an array and the normalized length is 0, just return an empty array. this prevents a problem
        // with the iteration on IE when using a NaN array length.
        if (Object(_iterator__WEBPACK_IMPORTED_MODULE_0__["isArrayLike"])(arrayLike)) {
            if (length === 0) {
                return [];
            }
            for (let i = 0; i < arrayLike.length; i++) {
                array[i] = mapFunction ? mapFunction(arrayLike[i], i) : arrayLike[i];
            }
        }
        else {
            let i = 0;
            for (const value of arrayLike) {
                array[i] = mapFunction ? mapFunction(value, i) : value;
                i++;
            }
        }
        if (arrayLike.length !== undefined) {
            array.length = length;
        }
        return array;
    };
    Array.of = function of(...items) {
        return Array.prototype.slice.call(items);
    };
    Array.prototype.copyWithin = function copyWithin(offset, start, end) {
        if (this == null) {
            throw new TypeError('copyWithin: target must be an array-like object');
        }
        const length = toLength(this.length);
        offset = normalizeOffset(toInteger(offset), length);
        start = normalizeOffset(toInteger(start), length);
        end = normalizeOffset(end === undefined ? length : toInteger(end), length);
        let count = Math.min(end - start, length - offset);
        let direction = 1;
        if (offset > start && offset < start + count) {
            direction = -1;
            start += count - 1;
            offset += count - 1;
        }
        while (count > 0) {
            if (start in this) {
                this[offset] = this[start];
            }
            else {
                delete this[offset];
            }
            offset += direction;
            start += direction;
            count--;
        }
        return this;
    };
    Array.prototype.find = function find(callback, thisArg) {
        const index = this.findIndex(callback, thisArg);
        return index !== -1 ? this[index] : undefined;
    };
    Array.prototype.findIndex = function findIndex(callback, thisArg) {
        const length = toLength(this.length);
        if (!callback) {
            throw new TypeError('find: second argument must be a function');
        }
        if (thisArg) {
            callback = callback.bind(thisArg);
        }
        for (let i = 0; i < length; i++) {
            if (callback(this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es6-array-fill')) {
    Array.prototype.fill = function fill(value, start, end) {
        const length = toLength(this.length);
        let i = normalizeOffset(toInteger(start), length);
        end = normalizeOffset(end === undefined ? length : toInteger(end), length);
        while (i < (end || 0)) {
            this[i++] = value;
        }
        return this;
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es7-array')) {
    Array.prototype.includes = function includes(searchElement, fromIndex = 0) {
        let len = toLength(this.length);
        for (let i = fromIndex; i < len; ++i) {
            const currentElement = this[i];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
        }
        return false;
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es2019-array')) {
    Array.prototype.flat = function flat(depth = 1) {
        return depth > 0
            ? this.reduce((acc, val) => acc.concat(Array.isArray(val) ? val.flat(depth - 1) : val), [])
            : this.slice();
    };
    Array.prototype.flatMap = function flatMap(callback) {
        return this.map(callback).flat();
    };
}
from = Array.from;
of = Array.of;
copyWithin = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.copyWithin);
fill = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.fill);
find = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.find);
flat = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.flat);
flatMap = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.flatMap);
findIndex = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.findIndex);
includes = Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["wrapNative"])(Array.prototype.includes);
/* harmony default export */ __webpack_exports__["default"] = (Array);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/cssVariables.mjs":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/cssVariables.mjs ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-vars-ponyfill */ "./node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.js");
/* harmony import */ var css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0__);
`!has('dom-css-variables')`;

/* harmony default export */ __webpack_exports__["default"] = (typeof css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0__ !== 'undefined' && typeof css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0___default.a === 'function'
    ? css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0___default.a
    : (() => { }));


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/iterator.mjs":
/*!********************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/iterator.mjs ***!
  \********************************************************/
/*! exports provided: ShimIterator, isIterable, isArrayLike, get, forOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShimIterator", function() { return ShimIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forOf", function() { return forOf; });
/* harmony import */ var _Symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Symbol */ "./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string */ "./node_modules/@dojo/framework/shim/string.mjs");
`!has('es6-symbol')`;


const staticDone = { done: true, value: undefined };
/**
 * A class that _shims_ an iterator interface on array like objects.
 */
class ShimIterator {
    constructor(list) {
        this._nextIndex = -1;
        if (isIterable(list)) {
            this._nativeIterator = list[Symbol.iterator]();
        }
        else {
            this._list = list;
        }
    }
    /**
     * Return the next iteration result for the Iterator
     */
    next() {
        if (this._nativeIterator) {
            return this._nativeIterator.next();
        }
        if (!this._list) {
            return staticDone;
        }
        if (++this._nextIndex < this._list.length) {
            return {
                done: false,
                value: this._list[this._nextIndex]
            };
        }
        return staticDone;
    }
    [Symbol.iterator]() {
        return this;
    }
}
/**
 * A type guard for checking if something has an Iterable interface
 *
 * @param value The value to type guard against
 */
function isIterable(value) {
    return value && typeof value[Symbol.iterator] === 'function';
}
/**
 * A type guard for checking if something is ArrayLike
 *
 * @param value The value to type guard against
 */
function isArrayLike(value) {
    return value && typeof value.length === 'number';
}
/**
 * Returns the iterator for an object
 *
 * @param iterable The iterable object to return the iterator for
 */
function get(iterable) {
    if (isIterable(iterable)) {
        return iterable[Symbol.iterator]();
    }
    else if (isArrayLike(iterable)) {
        return new ShimIterator(iterable);
    }
}
/**
 * Shims the functionality of `for ... of` blocks
 *
 * @param iterable The object the provides an iterator interface
 * @param callback The callback which will be called for each item of the iterable
 * @param thisArg Optional scope to pass the callback
 */
function forOf(iterable, callback, thisArg) {
    let broken = false;
    function doBreak() {
        broken = true;
    }
    /* We need to handle iteration of double byte strings properly */
    if (isArrayLike(iterable) && typeof iterable === 'string') {
        const l = iterable.length;
        for (let i = 0; i < l; ++i) {
            let char = iterable[i];
            if (i + 1 < l) {
                const code = char.charCodeAt(0);
                if (code >= _string__WEBPACK_IMPORTED_MODULE_1__["HIGH_SURROGATE_MIN"] && code <= _string__WEBPACK_IMPORTED_MODULE_1__["HIGH_SURROGATE_MAX"]) {
                    char += iterable[++i];
                }
            }
            callback.call(thisArg, char, iterable, doBreak);
            if (broken) {
                return;
            }
        }
    }
    else {
        const iterator = get(iterable);
        if (iterator) {
            let result = iterator.next();
            while (!result.done) {
                callback.call(thisArg, result.value, iterable, doBreak);
                if (broken) {
                    return;
                }
                result = iterator.next();
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/object.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/object.mjs ***!
  \******************************************************/
/*! exports provided: assign, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, is, keys, getOwnPropertyDescriptors, entries, values, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnPropertyDescriptor", function() { return getOwnPropertyDescriptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnPropertyNames", function() { return getOwnPropertyNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnPropertySymbols", function() { return getOwnPropertySymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnPropertyDescriptors", function() { return getOwnPropertyDescriptors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return entries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");

let assign;
/**
 * Gets the own property descriptor of the specified object.
 * An own property descriptor is one that is defined directly on the object and is not
 * inherited from the object's prototype.
 * @param o Object that contains the property.
 * @param p Name of the property.
 */
let getOwnPropertyDescriptor;
/**
 * Returns the names of the own properties of an object. The own properties of an object are those that are defined directly
 * on that object, and are not inherited from the object's prototype. The properties of an object include both fields (objects) and functions.
 * @param o Object that contains the own properties.
 */
let getOwnPropertyNames;
/**
 * Returns an array of all symbol properties found directly on object o.
 * @param o Object to retrieve the symbols from.
 */
let getOwnPropertySymbols;
/**
 * Returns true if the values are the same value, false otherwise.
 * @param value1 The first value.
 * @param value2 The second value.
 */
let is;
/**
 * Returns the names of the enumerable properties and methods of an object.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
let keys;
/* ES7 Object static methods */
let getOwnPropertyDescriptors;
let entries;
let values;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_0__["default"])('es6-object')) {
    const keys = Object.keys.bind(Object);
    Object.keys = function symbolAwareKeys(o) {
        return keys(o).filter((key) => !Boolean(key.match(/^@@.+/)));
    };
    Object.assign = function assign(target, ...sources) {
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        sources.forEach((nextSource) => {
            if (nextSource) {
                // Skip over if undefined or null
                keys(nextSource).forEach((nextKey) => {
                    to[nextKey] = nextSource[nextKey];
                });
            }
        });
        return to;
    };
    const getOwnPropertyNames = Object.getOwnPropertyNames.bind(Object);
    Object.getOwnPropertyNames = function symbolAwareGetOwnPropertyNames(o) {
        return getOwnPropertyNames(o).filter((key) => !Boolean(key.match(/^@@.+/)));
    };
    Object.getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return getOwnPropertyNames(o)
            .filter((key) => Boolean(key.match(/^@@.+/)))
            .map((key) => Symbol.for(key.substring(2)));
    };
    Object.is = function is(value1, value2) {
        if (value1 === value2) {
            return value1 !== 0 || 1 / value1 === 1 / value2; // -0
        }
        return value1 !== value1 && value2 !== value2; // NaN
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_0__["default"])('es2017-object')) {
    Object.getOwnPropertyDescriptors = function getOwnPropertyDescriptors(o) {
        return Object.getOwnPropertyNames(o).reduce((previous, key) => {
            previous[key] = Object.getOwnPropertyDescriptor(o, key);
            return previous;
        }, {});
    };
    Object.entries = function entries(o) {
        return keys(o).map((key) => [key, o[key]]);
    };
    Object.values = function values(o) {
        return keys(o).map((key) => o[key]);
    };
}
assign = Object.assign;
getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
getOwnPropertyNames = Object.getOwnPropertyNames;
getOwnPropertySymbols = Object.getOwnPropertySymbols;
is = Object.is;
keys = Object.keys;
getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
entries = Object.entries;
values = Object.values;
/* harmony default export */ __webpack_exports__["default"] = (Object);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/string.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/string.mjs ***!
  \******************************************************/
/*! exports provided: HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX, LOW_SURROGATE_MIN, LOW_SURROGATE_MAX, fromCodePoint, raw, codePointAt, endsWith, includes, normalize, repeat, startsWith, padEnd, padStart, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIGH_SURROGATE_MIN", function() { return HIGH_SURROGATE_MIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIGH_SURROGATE_MAX", function() { return HIGH_SURROGATE_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOW_SURROGATE_MIN", function() { return LOW_SURROGATE_MIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOW_SURROGATE_MAX", function() { return LOW_SURROGATE_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCodePoint", function() { return fromCodePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raw", function() { return raw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "codePointAt", function() { return codePointAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return endsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return includes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padEnd", function() { return padEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padStart", function() { return padStart; });
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _support_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./support/util */ "./node_modules/@dojo/framework/shim/support/util.mjs");


/**
 * The minimum location of high surrogates
 */
const HIGH_SURROGATE_MIN = 0xd800;
/**
 * The maximum location of high surrogates
 */
const HIGH_SURROGATE_MAX = 0xdbff;
/**
 * The minimum location of low surrogates
 */
const LOW_SURROGATE_MIN = 0xdc00;
/**
 * The maximum location of low surrogates
 */
const LOW_SURROGATE_MAX = 0xdfff;
/* ES6 static methods */
/**
 * Return the String value whose elements are, in order, the elements in the List elements.
 * If length is 0, the empty string is returned.
 * @param codePoints The code points to generate the string
 */
let fromCodePoint;
/**
 * `raw` is intended for use as a tag function of a Tagged Template String. When called
 * as such the first argument will be a well formed template call site object and the rest
 * parameter will contain the substitution values.
 * @param template A well-formed template string call site representation.
 * @param substitutions A set of substitution values.
 */
let raw;
/* ES6 instance methods */
/**
 * Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
 * value of the UTF-16 encoded code point starting at the string element at position pos in
 * the String resulting from converting this object to a String.
 * If there is no element at that position, the result is undefined.
 * If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.
 */
let codePointAt;
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * endPosition – length(this). Otherwise returns false.
 */
let endsWith;
/**
 * Returns true if searchString appears as a substring of the result of converting this
 * object to a String, at one or more positions that are
 * greater than or equal to position; otherwise, returns false.
 * @param target The target string
 * @param searchString search string
 * @param position If position is undefined, 0 is assumed, so as to search all of the String.
 */
let includes;
/**
 * Returns the String value result of normalizing the string into the normalization form
 * named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
 * @param target The target string
 * @param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
 * is "NFC"
 */
let normalize;
/**
 * Returns a String value that is made from count copies appended together. If count is 0,
 * T is the empty String is returned.
 * @param count number of copies to append
 */
let repeat;
/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 */
let startsWith;
/* ES7 instance methods */
/**
 * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the end (right) of the current string.
 *
 * @param target The target string
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
let padEnd;
/**
 * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the start (left) of the current string.
 *
 * @param target The target string
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
let padStart;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_0__["default"])('es6-string')) {
    /**
     * Validates that text is defined, and normalizes position (based on the given default if the input is NaN).
     * Used by startsWith, includes, and endsWith.
     *
     * @return Normalized position.
     */
    const normalizeSubstringArgs = function (name, text, search, position, isEnd = false) {
        if (text == null) {
            throw new TypeError('string.' + name + ' requires a valid string to search against.');
        }
        const length = text.length;
        position = position !== position ? (isEnd ? length : 0) : position;
        return [text, String(search), Math.min(Math.max(position, 0), length)];
    };
    String.fromCodePoint = function fromCodePoint(...codePoints) {
        // Adapted from https://github.com/mathiasbynens/String.fromCodePoint
        const length = arguments.length;
        if (!length) {
            return '';
        }
        const fromCharCode = String.fromCharCode;
        const MAX_SIZE = 0x4000;
        let codeUnits = [];
        let index = -1;
        let result = '';
        while (++index < length) {
            let codePoint = Number(arguments[index]);
            // Code points must be finite integers within the valid range
            let isValid = isFinite(codePoint) && Math.floor(codePoint) === codePoint && codePoint >= 0 && codePoint <= 0x10ffff;
            if (!isValid) {
                throw RangeError('string.fromCodePoint: Invalid code point ' + codePoint);
            }
            if (codePoint <= 0xffff) {
                // BMP code point
                codeUnits.push(codePoint);
            }
            else {
                // Astral code point; split in surrogate halves
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                let highSurrogate = (codePoint >> 10) + HIGH_SURROGATE_MIN;
                let lowSurrogate = (codePoint % 0x400) + LOW_SURROGATE_MIN;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += fromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    String.prototype.codePointAt = function codePointAt(position = 0) {
        // Adapted from https://github.com/mathiasbynens/String.prototype.codePointAt
        if (this == null) {
            throw new TypeError('string.codePointAt requries a valid string.');
        }
        const length = this.length;
        if (position !== position) {
            position = 0;
        }
        if (position < 0 || position >= length) {
            return undefined;
        }
        // Get the first code unit
        const first = this.charCodeAt(position);
        if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > position + 1) {
            // Start of a surrogate pair (high surrogate and there is a next code unit); check for low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            const second = this.charCodeAt(position + 1);
            if (second >= LOW_SURROGATE_MIN && second <= LOW_SURROGATE_MAX) {
                return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
            }
        }
        return first;
    };
    String.prototype.endsWith = function endsWith(search, endPosition) {
        let text = this.toString();
        if (search === '') {
            return true;
        }
        if (typeof endPosition === 'undefined') {
            endPosition = text.length;
        }
        else if (endPosition === null || isNaN(endPosition)) {
            return false;
        }
        [text, search, endPosition] = normalizeSubstringArgs('endsWith', text, search, endPosition, true);
        const start = endPosition - search.length;
        if (start < 0) {
            return false;
        }
        return text.slice(start, endPosition) === search;
    };
    String.prototype.includes = function includes(search, position = 0) {
        let text = this.toString();
        [text, search, position] = normalizeSubstringArgs('includes', text, search, position);
        return text.indexOf(search, position) !== -1;
    };
    String.prototype.repeat = function repeat(count = 0) {
        // Adapted from https://github.com/mathiasbynens/String.prototype.repeat
        let text = this.toString();
        if (text == null) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (count !== count) {
            count = 0;
        }
        if (count < 0 || count === Infinity) {
            throw new RangeError('string.repeat requires a non-negative finite count.');
        }
        let result = '';
        while (count) {
            if (count % 2) {
                result += text;
            }
            if (count > 1) {
                text += text;
            }
            count >>= 1;
        }
        return result;
    };
    String.prototype.startsWith = function startsWith(search, position = 0) {
        let text = this.toString();
        search = String(search);
        [text, search, position] = normalizeSubstringArgs('startsWith', text, search, position);
        const end = position + search.length;
        if (end > text.length) {
            return false;
        }
        return text.slice(position, end) === search;
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_0__["default"])('es6-string-raw')) {
    String.raw = function raw(callSite, ...substitutions) {
        let rawStrings = callSite.raw;
        let result = '';
        let numSubstitutions = substitutions.length;
        if (callSite == null || callSite.raw == null) {
            throw new TypeError('string.raw requires a valid callSite object with a raw value');
        }
        for (let i = 0, length = rawStrings.length; i < length; i++) {
            result += rawStrings[i] + (i < numSubstitutions && i < length - 1 ? substitutions[i] : '');
        }
        return result;
    };
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_0__["default"])('es2017-string')) {
    String.prototype.padEnd = function padEnd(maxLength, fillString = ' ') {
        if (this === null || this === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padEnd requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        let strText = String(this);
        const padding = maxLength - strText.length;
        if (padding > 0) {
            strText +=
                repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length);
        }
        return strText;
    };
    String.prototype.padStart = function padStart(maxLength, fillString = ' ') {
        if (this === null || this === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padStart requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        let strText = String(this);
        const padding = maxLength - strText.length;
        if (padding > 0) {
            strText =
                repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length) +
                    strText;
        }
        return strText;
    };
}
fromCodePoint = String.fromCodePoint;
raw = String.raw;
codePointAt = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.codePointAt);
endsWith = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.endsWith);
includes = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.includes);
normalize = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.normalize);
repeat = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.repeat);
startsWith = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.startsWith);
padEnd = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.padEnd);
padStart = Object(_support_util__WEBPACK_IMPORTED_MODULE_1__["wrapNative"])(String.prototype.padStart);
/* harmony default export */ __webpack_exports__["default"] = (String);


/***/ }),

/***/ "./node_modules/@dojo/widgets/header/index.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/@dojo/widgets/header/index.mjs ***!
  \*****************************************************/
/*! exports provided: Header, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var _theme_default_header_m_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../theme/default/header.m.css */ "./node_modules/@dojo/widgets/theme/default/header.m.css.js");
/* harmony import */ var _theme_default_header_m_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_theme_default_header_m_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middleware_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middleware/theme */ "./node_modules/@dojo/widgets/middleware/theme.mjs");
/* harmony import */ var _dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dojo/framework/core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");



const factory = Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["create"])({ theme: _middleware_theme__WEBPACK_IMPORTED_MODULE_1__["default"] })
    .properties()
    .children();
const Header = factory(function Header({ children, properties, middleware: { theme } }) {
    const classes = theme.classes(_theme_default_header_m_css__WEBPACK_IMPORTED_MODULE_0__);
    const { sticky } = properties();
    const { actions, leading, title, trailing } = children()[0];
    return (Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("header", { key: "header", classes: [theme.variant(), sticky ? classes.spacer : undefined] },
        Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: [classes.root, sticky && classes.sticky], key: "root" },
            Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.row },
                Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.primary, key: "primary" },
                    leading && Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.leading }, leading),
                    Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.title, key: "title" }, title && title)),
                Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.secondary, key: "secondary" },
                    Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("nav", { classes: classes.actions, key: "actions" }, actions &&
                        (Array.isArray(actions) ? actions : [actions]).map((action) => (Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.action }, action)))),
                    trailing && Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_2__["tsx"])("div", { classes: classes.trailing }, trailing))))));
});
/* harmony default export */ __webpack_exports__["default"] = (Header);



/***/ }),

/***/ "./node_modules/@dojo/widgets/middleware/theme.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/@dojo/widgets/middleware/theme.mjs ***!
  \*********************************************************/
/*! exports provided: THEME_KEY, theme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THEME_KEY", function() { return THEME_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony import */ var _dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dojo/framework/core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _dojo_framework_core_middleware_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dojo/framework/core/middleware/theme */ "./node_modules/@dojo/framework/core/middleware/theme.mjs");


const factory = Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ coreTheme: _dojo_framework_core_middleware_theme__WEBPACK_IMPORTED_MODULE_1__["default"] });
const THEME_KEY = ' _key';
function uppercaseFirstChar(value) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function lowercaseFirstChar(value) {
    return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
}
function isThemeWithVariant(theme) {
    return theme && theme.hasOwnProperty('variant');
}
const theme = factory(function ({ middleware: { coreTheme }, properties }) {
    return Object.assign({ compose: (baseCss, css, prefix) => {
            const theme = properties().theme;
            const baseKey = baseCss[THEME_KEY];
            const variantKey = css[THEME_KEY];
            const virtualCss = Object.keys(baseCss).reduce((virtualCss, key) => {
                if (key === THEME_KEY) {
                    return virtualCss;
                }
                if (prefix && !virtualCss[`${prefix}${uppercaseFirstChar(key)}`]) {
                    virtualCss[`${prefix}${uppercaseFirstChar(key)}`] = ' ';
                }
                if (!css[key]) {
                    virtualCss[key] = ' ';
                }
                return virtualCss;
            }, { [THEME_KEY]: variantKey });
            const virtualTheme = coreTheme.classes(virtualCss);
            const variantTheme = coreTheme.classes(css);
            let baseTheme = coreTheme.classes(baseCss);
            if (prefix) {
                const prefixedCss = Object.keys(Object.assign({}, virtualTheme, variantTheme)).reduce((prefixCss, key) => {
                    if (key.indexOf(prefix) === 0 && key !== prefix) {
                        const classKey = lowercaseFirstChar(key.replace(prefix, ''));
                        if (!variantTheme[key] &&
                            virtualTheme[key] &&
                            virtualTheme[key].trim()) {
                            prefixCss[classKey] = `${baseTheme[classKey]} ${virtualTheme[key].trim()}`;
                        }
                        if (variantTheme[key]) {
                            prefixCss[classKey] = variantTheme[key];
                        }
                    }
                    return prefixCss;
                }, {});
                baseTheme = Object.assign({}, baseTheme, prefixedCss);
                if (isThemeWithVariant(theme)) {
                    return {
                        theme: Object.assign({}, theme.theme, { [baseKey]: baseTheme }),
                        variant: theme.variant
                    };
                }
                return Object.assign({}, theme, { [baseKey]: baseTheme });
            }
            const constructedTheme = Object.keys(baseTheme).reduce((theme, key) => {
                if (key === THEME_KEY) {
                    return theme;
                }
                const variantComposesClass = variantTheme[key] && variantTheme[key].trim();
                if (variantTheme[key]) {
                    theme[key] = variantComposesClass;
                }
                else if (virtualTheme[key] && virtualTheme[key].trim()) {
                    theme[key] = `${theme[key]} ${virtualTheme[key].trim()}`;
                }
                return theme;
            }, Object.assign({}, baseTheme));
            if (isThemeWithVariant(theme)) {
                return {
                    theme: Object.assign({}, theme.theme, { [baseKey]: constructedTheme }),
                    variant: theme.variant
                };
            }
            return Object.assign({}, theme, { [baseKey]: constructedTheme });
        } }, coreTheme);
});
/* harmony default export */ __webpack_exports__["default"] = (theme);



/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/default/header.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/default/header.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/default/header.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/default/header.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/default/header.m.css */ "./node_modules/@dojo/widgets/theme/default/header.m.css");
module.exports = {" _key":"@dojo/widgets/header","root":"header-m__root__1Wu1d","row":"header-m__row__3e0zv","primary":"header-m__primary__2eL4c","secondary":"header-m__secondary__keWQu","sticky":"header-m__sticky__3Rxub","leading":"header-m__leading__EGBZf","title":"header-m__title__3AvG7","actions":"header-m__actions__3MCfn","action":"header-m__action__1tpKL","trailing":"header-m__trailing__1qern","spacer":"header-m__spacer__3HogK"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/accordion.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/accordion.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/accordion.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/accordion.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/accordion.m.css */ "./node_modules/@dojo/widgets/theme/dojo/accordion.m.css");
module.exports = {" _key":"@dojo/widgets/accordion","root":"accordion-m__root__Rxs8b"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/avatar.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/avatar.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/avatar.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/avatar.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/avatar.m.css */ "./node_modules/@dojo/widgets/theme/dojo/avatar.m.css");
module.exports = {" _key":"@dojo/widgets/avatar","root":"avatar-m__root__1VkSv","avatarColor":"avatar-m__avatarColor__3OmuK","avatarColorSecondary":"avatar-m__avatarColorSecondary__vkqqN","small":"avatar-m__small__2Tqpi","medium":"avatar-m__medium__2_v9Q","large":"avatar-m__large__1bumt","circle":"avatar-m__circle__2IbnP","square":"avatar-m__square__32U8B","rounded":"avatar-m__rounded__dtC5b"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css */ "./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css");
module.exports = {" _key":"@dojo/widgets/breadcrumb-group","root":"breadcrumb-group-m__root__2c_G5","listItem":"breadcrumb-group-m__listItem__3N7sj"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/button.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/button.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/button.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/button.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/button.m.css");
module.exports = {" _key":"@dojo/widgets/button","root":"button-m__root__28pvq","pressed":"button-m__pressed__3sV_C","disabled":"button-m__disabled__f4Azn","label":"button-m__label__mkUVZ"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/calendar.m.css":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/calendar.m.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/calendar.m.css.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/calendar.m.css.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/calendar.m.css */ "./node_modules/@dojo/widgets/theme/dojo/calendar.m.css");
module.exports = {" _key":"@dojo/widgets/calendar","root":"calendar-m__root__1tLGM","dateGrid":"calendar-m__dateGrid__3Deul","weekday":"calendar-m__weekday__IVdDz","date":"calendar-m__date__2HZ0l","abbr":"calendar-m__abbr__NAXva","todayDate":"calendar-m__todayDate__1X8CM","inactiveDate":"calendar-m__inactiveDate__2Gk9b","selectedDate":"calendar-m__selectedDate__2X9KT","topMatter":"calendar-m__topMatter__3N546","monthTrigger":"calendar-m__monthTrigger__3PjRC","yearTrigger":"calendar-m__yearTrigger__iE25Z","previous":"calendar-m__previous__ScgW3","next":"calendar-m__next__3VwlS","monthTriggerActive":"calendar-m__monthTriggerActive__17804","yearTriggerActive":"calendar-m__yearTriggerActive__2SWmn","calendarPagingIcon":"calendar-m__calendarPagingIcon__EmDza icon-m__icon__2JzPg","monthGrid":"calendar-m__monthGrid__D5Viu","yearGrid":"calendar-m__yearGrid__2btl0","monthFields":"calendar-m__monthFields__25gUW","yearFields":"calendar-m__yearFields__316-R","monthRadio":"calendar-m__monthRadio__q9SIE","yearRadio":"calendar-m__yearRadio__1KTig","monthRadioLabel":"calendar-m__monthRadioLabel__1FkZH","yearRadioLabel":"calendar-m__yearRadioLabel__16Ui_","monthRadioChecked":"calendar-m__monthRadioChecked__3uX63","yearRadioChecked":"calendar-m__yearRadioChecked__SkQUn","monthRadioInput":"calendar-m__monthRadioInput__3p-Ha","yearRadioInput":"calendar-m__yearRadioInput__1jypV"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/card.m.css":
/*!**********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/card.m.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/card.m.css.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/card.m.css.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/card.m.css */ "./node_modules/@dojo/widgets/theme/dojo/card.m.css");
module.exports = {" _key":"@dojo/widgets/card","root":"card-m__root__2O8hE","actions":"card-m__actions__16a2H","actionButtons":"card-m__actionButtons__I3DkN","actionIcons":"card-m__actionIcons__1txrb","primary":"card-m__primary__X0sgt","content":"card-m__content__1yyco","media":"card-m__media__2VVB0","mediaSquare":"card-m__mediaSquare__1V7A9","media16by9":"card-m__media16by9__2iLHJ","header":"card-m__header__294wg","titleWrapper":"card-m__titleWrapper__1vlU9","contentWrapper":"card-m__contentWrapper__2XDys","title":"card-m__title__1st_D","subtitle":"card-m__subtitle__2a3KJ"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css */ "./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css");
module.exports = {" _key":"@dojo/widgets/checkbox-group","root":"checkbox-group-m__root__1BVCZ","legend":"checkbox-group-m__legend__2lYxD label-m__root__2OY2Q"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css */ "./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css");
module.exports = {" _key":"@dojo/widgets/checkbox","root":"checkbox-m__root__25_UT","input":"checkbox-m__input__k7une","inputWrapper":"checkbox-m__inputWrapper__J_orM icon-m__checkIcon___SgNE icon-m__icon__2JzPg","checked":"checkbox-m__checked__2GgYs","focused":"checkbox-m__focused__1ox0Y","onLabel":"checkbox-m__onLabel__2S2Uj","offLabel":"checkbox-m__offLabel__3YMm8","disabled":"checkbox-m__disabled__1rzbj","readonly":"checkbox-m__readonly__1z_i8","invalid":"checkbox-m__invalid__3uIrz","valid":"checkbox-m__valid__3n96h"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css */ "./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css");
module.exports = {" _key":"@dojo/widgets/chip-typeahead","root":"chip-typeahead-m__root__sjZeg","value":"chip-typeahead-m__value__2uqjJ","selectedIcon":"chip-typeahead-m__selectedIcon__3Y90y","input":"chip-typeahead-m__input__2EPdN","inputWrapper":"chip-typeahead-m__inputWrapper__2u6zp","values":"chip-typeahead-m__values__ebPIz"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/chip.m.css":
/*!**********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/chip.m.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/chip.m.css.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/chip.m.css.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/chip.m.css */ "./node_modules/@dojo/widgets/theme/dojo/chip.m.css");
module.exports = {" _key":"@dojo/widgets/chip","root":"chip-m__root__38BHL","label":"chip-m__label__qUnxa","closeIcon":"chip-m__closeIcon__1SV6f","clickable":"chip-m__clickable__1N1eC","disabled":"chip-m__disabled__2k7b5"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/date-input.m.css":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/date-input.m.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/date-input.m.css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/date-input.m.css.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/date-input.m.css */ "./node_modules/@dojo/widgets/theme/dojo/date-input.m.css");
module.exports = {" _key":"@dojo/widgets/date-input","root":"date-input-m__root__2Yzvp","input":"date-input-m__input__3TdOm","toggleCalendarButton":"date-input-m__toggleCalendarButton__3qDqH","popup":"date-input-m__popup__1ZIaA"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/dialog.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/dialog.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/dialog.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/dialog.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/dialog.m.css */ "./node_modules/@dojo/widgets/theme/dojo/dialog.m.css");
module.exports = {" _key":"@dojo/widgets/dialog","root":"dialog-m__root__NAZCT","main":"dialog-m__main__3spJM","underlayVisible":"dialog-m__underlayVisible__3Eqbz","title":"dialog-m__title__1P-PZ","content":"dialog-m__content__6tbsZ","close":"dialog-m__close__2sN1M","closeIcon":"dialog-m__closeIcon__3LrDH","actions":"dialog-m__actions__sY9bD"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css":
/*!****************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css");
module.exports = {" _key":"@dojo/widgets/floating-action-button","root":"floating-action-button-m__root__2piV7","icon":"floating-action-button-m__icon__2DAWn","extended":"floating-action-button-m__extended__2XVgZ","pressed":"floating-action-button-m__pressed__2TjQj button-m__pressed__3sV_C","label":"floating-action-button-m__label__2Cyv7 button-m__label__mkUVZ","disabled":"floating-action-button-m__disabled__1eqKe"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css");
module.exports = {" _key":"@dojo/widgets/grid-body","root":"grid-body-m__root__2zbEx"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css");
module.exports = {" _key":"@dojo/widgets/grid-cell","root":"grid-cell-m__root__34wXf","input":"grid-cell-m__input__2g0he","edit":"grid-cell-m__edit__3hH3_"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css");
module.exports = {" _key":"@dojo/widgets/grid-footer","root":"grid-footer-m__root__3p2-L"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css");
module.exports = {" _key":"@dojo/widgets/grid-header","root":"grid-header-m__root__HYjsh","cell":"grid-header-m__cell__2HBju","sortable":"grid-header-m__sortable__Cdm4W","sorted":"grid-header-m__sorted__280sg","sort":"grid-header-m__sort__31J7s","-webkit-filter":"grid-header-m__filter__2Yr-S","filter":"grid-header-m__filter__2Yr-S"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css":
/*!***************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css");
module.exports = {" _key":"@dojo/widgets/grid-paginated-footer","root":"grid-paginated-footer-m__root__23Cev","details":"grid-paginated-footer-m__details__3Fazr","more":"grid-paginated-footer-m__more__1mDXK","pageNav":"grid-paginated-footer-m__pageNav__2afTM","pageNumber":"grid-paginated-footer-m__pageNumber__2lhSZ","active":"grid-paginated-footer-m__active__iaKed"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css":
/*!**************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css");
module.exports = {" _key":"@dojo/widgets/grid-placeholder-row","root":"grid-placeholder-row-m__root__UivAF grid-row-m__root__NKTOq","loading":"grid-placeholder-row-m__loading__2UpDv","spin":"grid-placeholder-row-m__spin__11VRU"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css");
module.exports = {" _key":"@dojo/widgets/grid-row","root":"grid-row-m__root__NKTOq"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid.m.css":
/*!**********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid.m.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/grid.m.css.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/grid.m.css.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/grid.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid.m.css");
module.exports = {" _key":"@dojo/widgets/grid","root":"grid-m__root__3e-Fb","header":"grid-m__header__Xgbwh","filterGroup":"grid-m__filterGroup__lccgY"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/header-card.m.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/header-card.m.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/header-card.m.css.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/header-card.m.css.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/header-card.m.css */ "./node_modules/@dojo/widgets/theme/dojo/header-card.m.css");
module.exports = {" _key":"@dojo/widgets/header-card","root":"header-card-m__root__l4KKu","header":"header-card-m__header__3iFIG","headerContent":"header-card-m__headerContent__2Kz4-","avatar":"header-card-m__avatar__kU5oC","title":"header-card-m__title__3M9XE","subtitle":"header-card-m__subtitle__2o1Ge"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/header.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/header.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/header.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/header.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/header.m.css */ "./node_modules/@dojo/widgets/theme/dojo/header.m.css");
module.exports = {" _key":"@dojo/widgets/header","root":"header-m__root__1WDVi","row":"header-m__row__3ZCgD","primary":"header-m__primary__1cNeA","secondary":"header-m__secondary__3uElU","sticky":"header-m__sticky__1tiQe","leading":"header-m__leading__1C73V","title":"header-m__title__2xNxF","actions":"header-m__actions__3hd87","action":"header-m__action__3QPqq","trailing":"header-m__trailing__r7k1p","spacer":"header-m__spacer__1njcI"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css */ "./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css");
module.exports = {" _key":"@dojo/widgets/helper-text","root":"helper-text-m__root__2HclM","text":"helper-text-m__text__2vI1Z","valid":"helper-text-m__valid__Qigz0","invalid":"helper-text-m__invalid__zjI0U"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/icon.m.css":
/*!**********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/icon.m.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/icon.m.css.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/icon.m.css.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/icon.m.css */ "./node_modules/@dojo/widgets/theme/dojo/icon.m.css");
module.exports = {" _key":"@dojo/widgets/icon","icon":"icon-m__icon__2JzPg","clockIcon":"icon-m__clockIcon__2S5I7","eyeIcon":"icon-m__eyeIcon__2UFzR","eyeSlashIcon":"icon-m__eyeSlashIcon__1-jQ3","plusIcon":"icon-m__plusIcon__C2hAP","minusIcon":"icon-m__minusIcon__3yz6D","checkIcon":"icon-m__checkIcon___SgNE","closeIcon":"icon-m__closeIcon__60eFq","leftIcon":"icon-m__leftIcon__86k5d","rightIcon":"icon-m__rightIcon__2jTr-","upIcon":"icon-m__upIcon__C6vkW","downIcon":"icon-m__downIcon__3YfxA","upAltIcon":"icon-m__upAltIcon__2h5Ff","downAltIcon":"icon-m__downAltIcon__1A_IX","searchIcon":"icon-m__searchIcon__1GW-J","barsIcon":"icon-m__barsIcon__33nJG","settingsIcon":"icon-m__settingsIcon__mUrFB","alertIcon":"icon-m__alertIcon__tXYqM","helpIcon":"icon-m__helpIcon__AWIZ1","infoIcon":"icon-m__infoIcon__2nM8O","cancelIcon":"icon-m__cancelIcon__1gsBL","checkedBoxIcon":"icon-m__checkedBoxIcon__31wsd","phoneIcon":"icon-m__phoneIcon__2SYAN","editIcon":"icon-m__editIcon__3z6EX","dateIcon":"icon-m__dateIcon__2Olo4","linkIcon":"icon-m__linkIcon__1NOjY","locationIcon":"icon-m__locationIcon__2MwHF","secureIcon":"icon-m__secureIcon__2AVyP","mailIcon":"icon-m__mailIcon__10-91","starIcon":"icon-m__starIcon__1FwGO"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var accordionPane = __webpack_require__(/*! ./accordion.m.css */ "./node_modules/@dojo/widgets/theme/dojo/accordion.m.css.js");
var avatar = __webpack_require__(/*! ./avatar.m.css */ "./node_modules/@dojo/widgets/theme/dojo/avatar.m.css.js");
var breadcrumbGroup = __webpack_require__(/*! ./breadcrumb-group.m.css */ "./node_modules/@dojo/widgets/theme/dojo/breadcrumb-group.m.css.js");
var button = __webpack_require__(/*! ./button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/button.m.css.js");
var calendar = __webpack_require__(/*! ./calendar.m.css */ "./node_modules/@dojo/widgets/theme/dojo/calendar.m.css.js");
var card = __webpack_require__(/*! ./card.m.css */ "./node_modules/@dojo/widgets/theme/dojo/card.m.css.js");
var checkboxGroup = __webpack_require__(/*! ./checkbox-group.m.css */ "./node_modules/@dojo/widgets/theme/dojo/checkbox-group.m.css.js");
var checkbox = __webpack_require__(/*! ./checkbox.m.css */ "./node_modules/@dojo/widgets/theme/dojo/checkbox.m.css.js");
var chip = __webpack_require__(/*! ./chip.m.css */ "./node_modules/@dojo/widgets/theme/dojo/chip.m.css.js");
var dateInput = __webpack_require__(/*! ./date-input.m.css */ "./node_modules/@dojo/widgets/theme/dojo/date-input.m.css.js");
var dialog = __webpack_require__(/*! ./dialog.m.css */ "./node_modules/@dojo/widgets/theme/dojo/dialog.m.css.js");
var floatingActionButton = __webpack_require__(/*! ./floating-action-button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/floating-action-button.m.css.js");
var grid = __webpack_require__(/*! ./grid.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid.m.css.js");
var gridBody = __webpack_require__(/*! ./grid-body.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-body.m.css.js");
var gridCell = __webpack_require__(/*! ./grid-cell.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-cell.m.css.js");
var gridFooter = __webpack_require__(/*! ./grid-footer.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-footer.m.css.js");
var gridHeader = __webpack_require__(/*! ./grid-header.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-header.m.css.js");
var gridPlaceholderRow = __webpack_require__(/*! ./grid-placeholder-row.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-placeholder-row.m.css.js");
var gridPaginatedFooter = __webpack_require__(/*! ./grid-paginated-footer.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-paginated-footer.m.css.js");
var gridRow = __webpack_require__(/*! ./grid-row.m.css */ "./node_modules/@dojo/widgets/theme/dojo/grid-row.m.css.js");
var headerCard = __webpack_require__(/*! ./header-card.m.css */ "./node_modules/@dojo/widgets/theme/dojo/header-card.m.css.js");
var header = __webpack_require__(/*! ./header.m.css */ "./node_modules/@dojo/widgets/theme/dojo/header.m.css.js");
var helperText = __webpack_require__(/*! ./helper-text.m.css */ "./node_modules/@dojo/widgets/theme/dojo/helper-text.m.css.js");
var icon = __webpack_require__(/*! ./icon.m.css */ "./node_modules/@dojo/widgets/theme/dojo/icon.m.css.js");
var label = __webpack_require__(/*! ./label.m.css */ "./node_modules/@dojo/widgets/theme/dojo/label.m.css.js");
var listItem = __webpack_require__(/*! ./list-item.m.css */ "./node_modules/@dojo/widgets/theme/dojo/list-item.m.css.js");
var loadingIndicator = __webpack_require__(/*! ./loading-indicator.m.css */ "./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css.js");
var list = __webpack_require__(/*! ./list.m.css */ "./node_modules/@dojo/widgets/theme/dojo/list.m.css.js");
var menuItem = __webpack_require__(/*! ./menu-item.m.css */ "./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css.js");
var chipTypeahead = __webpack_require__(/*! ./chip-typeahead.m.css */ "./node_modules/@dojo/widgets/theme/dojo/chip-typeahead.m.css.js");
var outlinedButton = __webpack_require__(/*! ./outlined-button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css.js");
var nativeSelect = __webpack_require__(/*! ./native-select.m.css */ "./node_modules/@dojo/widgets/theme/dojo/native-select.m.css.js");
var pagination = __webpack_require__(/*! ./pagination.m.css */ "./node_modules/@dojo/widgets/theme/dojo/pagination.m.css.js");
var passwordInput = __webpack_require__(/*! ./password-input.m.css */ "./node_modules/@dojo/widgets/theme/dojo/password-input.m.css.js");
var progress = __webpack_require__(/*! ./progress.m.css */ "./node_modules/@dojo/widgets/theme/dojo/progress.m.css.js");
var radioGroup = __webpack_require__(/*! ./radio-group.m.css */ "./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css.js");
var radio = __webpack_require__(/*! ./radio.m.css */ "./node_modules/@dojo/widgets/theme/dojo/radio.m.css.js");
var raisedButton = __webpack_require__(/*! ./raised-button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css.js");
var rangeSlider = __webpack_require__(/*! ./range-slider.m.css */ "./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css.js");
var result = __webpack_require__(/*! ./result.m.css */ "./node_modules/@dojo/widgets/theme/dojo/result.m.css.js");
var select = __webpack_require__(/*! ./select.m.css */ "./node_modules/@dojo/widgets/theme/dojo/select.m.css.js");
var slidePane = __webpack_require__(/*! ./slide-pane.m.css */ "./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css.js");
var slider = __webpack_require__(/*! ./slider.m.css */ "./node_modules/@dojo/widgets/theme/dojo/slider.m.css.js");
var snackbar = __webpack_require__(/*! ./snackbar.m.css */ "./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css.js");
var switchControl = __webpack_require__(/*! ./switch.m.css */ "./node_modules/@dojo/widgets/theme/dojo/switch.m.css.js");
var tabContainer = __webpack_require__(/*! ./tab-container.m.css */ "./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css.js");
var textArea = __webpack_require__(/*! ./text-area.m.css */ "./node_modules/@dojo/widgets/theme/dojo/text-area.m.css.js");
var textInput = __webpack_require__(/*! ./text-input.m.css */ "./node_modules/@dojo/widgets/theme/dojo/text-input.m.css.js");
var threeColumnLayout = __webpack_require__(/*! ./three-column-layout.m.css */ "./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css.js");
var timePicker = __webpack_require__(/*! ./time-picker.m.css */ "./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css.js");
var titlePane = __webpack_require__(/*! ./title-pane.m.css */ "./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css.js");
var tooltip = __webpack_require__(/*! ./tooltip.m.css */ "./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css.js");
var twoColumnLayout = __webpack_require__(/*! ./two-column-layout.m.css */ "./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css.js");
var typeahead = __webpack_require__(/*! ./typeahead.m.css */ "./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css.js");
var defaultVariant = __webpack_require__(/*! ./variants/default.m.css */ "./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css.js");
var darkVariant = __webpack_require__(/*! ./variants/dark.m.css */ "./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css.js");
exports.default = {
    theme: {
        '@dojo/widgets/accordion': accordionPane,
        '@dojo/widgets/avatar': avatar,
        '@dojo/widgets/breadcrumb-group': breadcrumbGroup,
        '@dojo/widgets/button': button,
        '@dojo/widgets/calendar': calendar,
        '@dojo/widgets/card': card,
        '@dojo/widgets/checkbox-group': checkboxGroup,
        '@dojo/widgets/checkbox': checkbox,
        '@dojo/widgets/chip': chip,
        '@dojo/widgets/date-input': dateInput,
        '@dojo/widgets/dialog': dialog,
        '@dojo/widgets/floating-action-button': floatingActionButton,
        '@dojo/widgets/grid-body': gridBody,
        '@dojo/widgets/grid-cell': gridCell,
        '@dojo/widgets/grid-footer': gridFooter,
        '@dojo/widgets/grid-header': gridHeader,
        '@dojo/widgets/grid-placeholder-row': gridPlaceholderRow,
        '@dojo/widgets/grid-paginated-footer': gridPaginatedFooter,
        '@dojo/widgets/grid-row': gridRow,
        '@dojo/widgets/grid': grid,
        '@dojo/widgets/header-card': headerCard,
        '@dojo/widgets/header': header,
        '@dojo/widgets/helper-text': helperText,
        '@dojo/widgets/icon': icon,
        '@dojo/widgets/label': label,
        '@dojo/widgets/list-item': listItem,
        '@dojo/widgets/loading-indicator': loadingIndicator,
        '@dojo/widgets/menu-item': menuItem,
        '@dojo/widgets/chip-typeahead': chipTypeahead,
        '@dojo/widgets/list': list,
        '@dojo/widgets/outlined-button': outlinedButton,
        '@dojo/widgets/native-select': nativeSelect,
        '@dojo/widgets/pagination': pagination,
        '@dojo/widgets/password-input': passwordInput,
        '@dojo/widgets/progress': progress,
        '@dojo/widgets/radio-group': radioGroup,
        '@dojo/widgets/radio': radio,
        '@dojo/widgets/raised-button': raisedButton,
        '@dojo/widgets/range-slider': rangeSlider,
        '@dojo/widgets/result': result,
        '@dojo/widgets/select': select,
        '@dojo/widgets/slide-pane': slidePane,
        '@dojo/widgets/slider': slider,
        '@dojo/widgets/snackbar': snackbar,
        '@dojo/widgets/switch': switchControl,
        '@dojo/widgets/tab-container': tabContainer,
        '@dojo/widgets/text-area': textArea,
        '@dojo/widgets/text-input': textInput,
        '@dojo/widgets/three-column-layout': threeColumnLayout,
        '@dojo/widgets/time-picker': timePicker,
        '@dojo/widgets/title-pane': titlePane,
        '@dojo/widgets/tooltip': tooltip,
        '@dojo/widgets/two-column-layout': twoColumnLayout,
        '@dojo/widgets/typeahead': typeahead
    },
    variants: {
        default: defaultVariant,
        dark: darkVariant
    }
};



/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/label.m.css":
/*!***********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/label.m.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/label.m.css.js":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/label.m.css.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/label.m.css */ "./node_modules/@dojo/widgets/theme/dojo/label.m.css");
module.exports = {" _key":"@dojo/widgets/label","root":"label-m__root__2OY2Q","secondary":"label-m__secondary__2JgjM","required":"label-m__required__2p83z"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/list-item.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/list-item.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/list-item.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/list-item.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/list-item.m.css */ "./node_modules/@dojo/widgets/theme/dojo/list-item.m.css");
module.exports = {" _key":"@dojo/widgets/list-item","root":"list-item-m__root__dUG_o","active":"list-item-m__active__3tRcp","selected":"list-item-m__selected__1sHW5","disabled":"list-item-m__disabled__3VhQD"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/list.m.css":
/*!**********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/list.m.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/list.m.css.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/list.m.css.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/list.m.css */ "./node_modules/@dojo/widgets/theme/dojo/list.m.css");
module.exports = {" _key":"@dojo/widgets/list","root":"list-m__root__3ee5s","menu":"list-m__menu___jE2c","divider":"list-m__divider__2pf5q"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css */ "./node_modules/@dojo/widgets/theme/dojo/loading-indicator.m.css");
module.exports = {" _key":"@dojo/widgets/loading-indicator","root":"loading-indicator-m__root__1S_Do","buffer":"loading-indicator-m__buffer__2N8zx","bar":"loading-indicator-m__bar__2QYHV","primary":"loading-indicator-m__primary__1OxUO","progress":"loading-indicator-m__progress__EoLqt","inner":"loading-indicator-m__inner__3GTa2"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css */ "./node_modules/@dojo/widgets/theme/dojo/menu-item.m.css");
module.exports = {" _key":"@dojo/widgets/menu-item","root":"menu-item-m__root__1HFs_","active":"menu-item-m__active__2iRtR"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/native-select.m.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/native-select.m.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/native-select.m.css.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/native-select.m.css.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/native-select.m.css */ "./node_modules/@dojo/widgets/theme/dojo/native-select.m.css");
module.exports = {" _key":"@dojo/widgets/native-select","root":"native-select-m__root__2A2KN","inputWrapper":"native-select-m__inputWrapper__3v5as","select":"native-select-m__select__7f8t5","arrow":"native-select-m__arrow__3m49y","disabled":"native-select-m__disabled__1TaDk"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css":
/*!*********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css.js":
/*!************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/outlined-button.m.css");
module.exports = {" _key":"@dojo/widgets/outlined-button","root":"outlined-button-m__root__1j7qa","pressed":"outlined-button-m__pressed__2iuy5","label":"outlined-button-m__label__SD9Eo","disabled":"outlined-button-m__disabled__3POiK"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/pagination.m.css":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/pagination.m.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/pagination.m.css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/pagination.m.css.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/pagination.m.css */ "./node_modules/@dojo/widgets/theme/dojo/pagination.m.css");
module.exports = {" _key":"@dojo/widgets/pagination","root":"pagination-m__root__L7VlA","linksWrapper":"pagination-m__linksWrapper__2jtOw","prev":"pagination-m__prev__vFB9g","next":"pagination-m__next__xfQUm","icon":"pagination-m__icon__31lQc","label":"pagination-m__label__HE0yp","link":"pagination-m__link__3db0U","currentPage":"pagination-m__currentPage__InwXB","selectWrapper":"pagination-m__selectWrapper__3vqQT"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/password-input.m.css":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/password-input.m.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/password-input.m.css.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/password-input.m.css.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/password-input.m.css */ "./node_modules/@dojo/widgets/theme/dojo/password-input.m.css");
module.exports = {" _key":"@dojo/widgets/password-input","root":"password-input-m__root__gH-Hk text-input-m__root__2yKLO","toggleButton":"password-input-m__toggleButton__3vybc"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/progress.m.css":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/progress.m.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/progress.m.css.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/progress.m.css.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/progress.m.css */ "./node_modules/@dojo/widgets/theme/dojo/progress.m.css");
module.exports = {" _key":"@dojo/widgets/progress","root":"progress-m__root__2XHXH","output":"progress-m__output__vKJw-","bar":"progress-m__bar__sB2fc","progress":"progress-m__progress__2V0hS"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css */ "./node_modules/@dojo/widgets/theme/dojo/radio-group.m.css");
module.exports = {" _key":"@dojo/widgets/radio-group","root":"radio-group-m__root__3VCTl","legend":"radio-group-m__legend__ZiCRP"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/radio.m.css":
/*!***********************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/radio.m.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/radio.m.css.js":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/radio.m.css.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/radio.m.css */ "./node_modules/@dojo/widgets/theme/dojo/radio.m.css");
module.exports = {" _key":"@dojo/widgets/radio","root":"radio-m__root__VefZS","input":"radio-m__input__3HytW","inputWrapper":"radio-m__inputWrapper__1Zous","radioBackground":"radio-m__radioBackground__8HvZ0","radioOuter":"radio-m__radioOuter__2v-Zg","radioInner":"radio-m__radioInner__3f5tV","focused":"radio-m__focused__3nJo1","checked":"radio-m__checked__2yRzd","disabled":"radio-m__disabled__B3g_v","readonly":"radio-m__readonly__5rLlH","invalid":"radio-m__invalid__EfJNI","valid":"radio-m__valid__1-Pzb"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css */ "./node_modules/@dojo/widgets/theme/dojo/raised-button.m.css");
module.exports = {" _key":"@dojo/widgets/raised-button","root":"raised-button-m__root__8rmm4","pressed":"raised-button-m__pressed__3Yr5d","label":"raised-button-m__label__3lT-j","disabled":"raised-button-m__disabled__1M-Lp"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css */ "./node_modules/@dojo/widgets/theme/dojo/range-slider.m.css");
module.exports = {" _key":"@dojo/widgets/range-slider","root":"range-slider-m__root__104A-","inputWrapper":"range-slider-m__inputWrapper__lTUjE","filled":"range-slider-m__filled__XRsjH","thumb":"range-slider-m__thumb__qHz5U","input":"range-slider-m__input__3dB_q","focused":"range-slider-m__focused__355WG","hasOutput":"range-slider-m__hasOutput__3mwgj","outputTooltip":"range-slider-m__outputTooltip__2RQbx","output":"range-slider-m__output__2IwRP","disabled":"range-slider-m__disabled__3wxJ-","readonly":"range-slider-m__readonly__2W81l","invalid":"range-slider-m__invalid__3jnT9"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/result.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/result.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/result.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/result.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/result.m.css */ "./node_modules/@dojo/widgets/theme/dojo/result.m.css");
module.exports = {" _key":"@dojo/widgets/result","root":"result-m__root__1s4Al","iconWrapper":"result-m__iconWrapper__1nmlS","statusIcon":"result-m__statusIcon__3PF2C","iconIcon":"result-m__iconIcon__Nu6vI icon-m__icon__2JzPg","actions":"result-m__actions__22GMb","actionButtons":"result-m__actionButtons__1epeV","contentWrapper":"result-m__contentWrapper__2esbQ","content":"result-m__content__3eBjD","titleWrapper":"result-m__titleWrapper__EmGbs","title":"result-m__title__1yfPE","subtitle":"result-m__subtitle__3e_ij","alert":"result-m__alert__3NSTh","error":"result-m__error__1KZCT","info":"result-m__info__2T1qW","success":"result-m__success__3deJM"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/select.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/select.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/select.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/select.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/select.m.css */ "./node_modules/@dojo/widgets/theme/dojo/select.m.css");
module.exports = {" _key":"@dojo/widgets/select","root":"select-m__root__vSQDW","trigger":"select-m__trigger__cQJRQ","value":"select-m__value__9wfTg","placeholder":"select-m__placeholder__2UlZ1","arrow":"select-m__arrow__3p83i","menuWrapper":"select-m__menuWrapper__OePaS","disabled":"select-m__disabled__3zDEP","readonly":"select-m__readonly__3yUii","invalid":"select-m__invalid__2G3mI","valid":"select-m__valid__3Kr6J"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css */ "./node_modules/@dojo/widgets/theme/dojo/slide-pane.m.css");
module.exports = {" _key":"@dojo/widgets/slide-pane","root":"slide-pane-m__root__2TQzV","underlayVisible":"slide-pane-m__underlayVisible__2dXLD","pane":"slide-pane-m__pane__2_qpl","content":"slide-pane-m__content__3B7wz","title":"slide-pane-m__title__2Dwsi","close":"slide-pane-m__close__2Tp8H","closeIcon":"slide-pane-m__closeIcon__2mfZI","left":"slide-pane-m__left__3pSsl","right":"slide-pane-m__right__1qBIY","top":"slide-pane-m__top__2Ouqt","bottom":"slide-pane-m__bottom__2Wm48","slideIn":"slide-pane-m__slideIn__QKvGX","slideOut":"slide-pane-m__slideOut__3C58O"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/slider.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/slider.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/slider.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/slider.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/slider.m.css */ "./node_modules/@dojo/widgets/theme/dojo/slider.m.css");
module.exports = {" _key":"@dojo/widgets/slider","root":"slider-m__root__1fQ-Q","inputWrapper":"slider-m__inputWrapper__1HBJS","track":"slider-m__track__2DGhE","fill":"slider-m__fill__4FdQ9","thumb":"slider-m__thumb__26xCj","input":"slider-m__input__2DrOc","outputTooltip":"slider-m__outputTooltip__yLzFO","output":"slider-m__output__KwPnR","vertical":"slider-m__vertical__1lBx-","disabled":"slider-m__disabled__LideH","readonly":"slider-m__readonly__14OUb","invalid":"slider-m__invalid__2uaAc","valid":"slider-m__valid__1F6U5"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css */ "./node_modules/@dojo/widgets/theme/dojo/snackbar.m.css");
module.exports = {" _key":"@dojo/widgets/snackbar","root":"snackbar-m__root__3DYwa","content":"snackbar-m__content__2dPUv","label":"snackbar-m__label__D1Lkn","actions":"snackbar-m__actions__fQHb6","open":"snackbar-m__open__1trii","success":"snackbar-m__success__FTGZN","error":"snackbar-m__error__1sGDA","leading":"snackbar-m__leading__342U0","stacked":"snackbar-m__stacked__1Wgqe"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/switch.m.css":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/switch.m.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/switch.m.css.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/switch.m.css.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/switch.m.css */ "./node_modules/@dojo/widgets/theme/dojo/switch.m.css");
module.exports = {" _key":"@dojo/widgets/switch","root":"switch-m__root__1GFoq","inputWrapper":"switch-m__inputWrapper__37KNw","label":"switch-m__label__2IMGM","thumb":"switch-m__thumb__3xB-N","track":"switch-m__track__1U4WH","underlay":"switch-m__underlay__1_0bA","nativeControl":"switch-m__nativeControl__3isSL","checked":"switch-m__checked__o1Lvq","disabled":"switch-m__disabled__1Mmee","readonly":"switch-m__readonly__o78hN","focused":"switch-m__focused__w-VpX","offLabel":"switch-m__offLabel__2b7ED","onLabel":"switch-m__onLabel__2nH4q"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css */ "./node_modules/@dojo/widgets/theme/dojo/tab-container.m.css");
module.exports = {" _key":"@dojo/widgets/tab-container","root":"tab-container-m__root__3r_9I","tabButtons":"tab-container-m__tabButtons__3D03V","tabButton":"tab-container-m__tabButton__1Rtmj","disabledTabButton":"tab-container-m__disabledTabButton__-3pyN","activeTabButton":"tab-container-m__activeTabButton__3O1dt","close":"tab-container-m__close__2R550","closeable":"tab-container-m__closeable__2ZpGe","tab":"tab-container-m__tab__14Gr-","alignLeft":"tab-container-m__alignLeft__3uIbQ","tabs":"tab-container-m__tabs__2dU3y","alignRight":"tab-container-m__alignRight__NCc1f","alignBottom":"tab-container-m__alignBottom__3hOao"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/text-area.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/text-area.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/text-area.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/text-area.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/text-area.m.css */ "./node_modules/@dojo/widgets/theme/dojo/text-area.m.css");
module.exports = {" _key":"@dojo/widgets/text-area","root":"text-area-m__root__2NVkd","input":"text-area-m__input__Vx3AV","disabled":"text-area-m__disabled__ZjqlP","readonly":"text-area-m__readonly__3NoH6","invalid":"text-area-m__invalid__3Z9ZA","valid":"text-area-m__valid__2mAxH"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/text-input.m.css":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/text-input.m.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/text-input.m.css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/text-input.m.css.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/text-input.m.css */ "./node_modules/@dojo/widgets/theme/dojo/text-input.m.css");
module.exports = {" _key":"@dojo/widgets/text-input","root":"text-input-m__root__2yKLO","wrapper":"text-input-m__wrapper__2yH16","input":"text-input-m__input__2OqON","inputWrapper":"text-input-m__inputWrapper__Bf3IL","focused":"text-input-m__focused__Bz5Ku","disabled":"text-input-m__disabled__1KyyV","readonly":"text-input-m__readonly__2dMQl","invalid":"text-input-m__invalid__wejhD","valid":"text-input-m__valid__2CP3A","addonRoot":"text-input-m__addonRoot__DQCsb","addonFilled":"text-input-m__addonFilled__18Yy8"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css":
/*!*************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css */ "./node_modules/@dojo/widgets/theme/dojo/three-column-layout.m.css");
module.exports = {" _key":"@dojo/widgets/three-column-layout","leading":"three-column-layout-m__leading__10E32","trailing":"three-column-layout-m__trailing__1__Yd"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css */ "./node_modules/@dojo/widgets/theme/dojo/time-picker.m.css");
module.exports = {" _key":"@dojo/widgets/time-picker","root":"time-picker-m__root__2uRZv","input":"time-picker-m__input__3e4IV","toggleMenuButton":"time-picker-m__toggleMenuButton__1eb2P","popup":"time-picker-m__popup__3ANpm"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css */ "./node_modules/@dojo/widgets/theme/dojo/title-pane.m.css");
module.exports = {" _key":"@dojo/widgets/title-pane","root":"title-pane-m__root__1cmLi","titleButton":"title-pane-m__titleButton__hMwuO","content":"title-pane-m__content__33Ft6","contentTransition":"title-pane-m__contentTransition__1GWDf","open":"title-pane-m__open__2GqTv","arrow":"title-pane-m__arrow__1RFCq"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css.js":
/*!****************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css */ "./node_modules/@dojo/widgets/theme/dojo/tooltip.m.css");
module.exports = {" _key":"@dojo/widgets/tooltip","root":"tooltip-m__root__1j6Iv","content":"tooltip-m__content__1N9s1","bottom":"tooltip-m__bottom__2dGm7","top":"tooltip-m__top__2QOyL","left":"tooltip-m__left__2vQ3o","right":"tooltip-m__right__j1o47"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css */ "./node_modules/@dojo/widgets/theme/dojo/two-column-layout.m.css");
module.exports = {" _key":"@dojo/widgets/two-column-layout","small":"two-column-layout-m__small__2sTw2"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css":
/*!***************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css.js":
/*!******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css */ "./node_modules/@dojo/widgets/theme/dojo/typeahead.m.css");
module.exports = {" _key":"@dojo/widgets/typeahead","root":"typeahead-m__root__2Em3D","triggerWrapper":"typeahead-m__triggerWrapper__3ijZT"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css */ "./node_modules/@dojo/widgets/theme/dojo/variants/dark.m.css");
module.exports = {" _key":"@dojo/widgets/dark","root":"dark-m__root__36GXf"};;

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css */ "./node_modules/@dojo/widgets/theme/dojo/variants/default.m.css");
module.exports = {" _key":"@dojo/widgets/default","root":"default-m__root__1h1rO"};;

/***/ }),

/***/ "./node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.js":
/*!******************************************************************!*\
  !*** ./node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * css-vars-ponyfill
 * v2.3.0
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2020 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
(function(global, factory) {
     true ? module.exports = factory() : undefined;
})(this, (function() {
    "use strict";
    function _extends() {
        _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(n);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    /*!
   * get-css-data
   * v1.8.0
   * https://github.com/jhildenbiddle/get-css-data
   * (c) 2018-2020 John Hildenbiddle <http://hildenbiddle.com>
   * MIT license
   */    function getUrls(urls) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var settings = {
            mimeType: options.mimeType || null,
            onBeforeSend: options.onBeforeSend || Function.prototype,
            onSuccess: options.onSuccess || Function.prototype,
            onError: options.onError || Function.prototype,
            onComplete: options.onComplete || Function.prototype
        };
        var urlArray = Array.isArray(urls) ? urls : [ urls ];
        var urlQueue = Array.apply(null, Array(urlArray.length)).map((function(x) {
            return null;
        }));
        function isValidCss() {
            var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var isHTML = cssText.trim().charAt(0) === "<";
            return !isHTML;
        }
        function onError(xhr, urlIndex) {
            settings.onError(xhr, urlArray[urlIndex], urlIndex);
        }
        function onSuccess(responseText, urlIndex) {
            var returnVal = settings.onSuccess(responseText, urlArray[urlIndex], urlIndex);
            responseText = returnVal === false ? "" : returnVal || responseText;
            urlQueue[urlIndex] = responseText;
            if (urlQueue.indexOf(null) === -1) {
                settings.onComplete(urlQueue);
            }
        }
        var parser = document.createElement("a");
        urlArray.forEach((function(url, i) {
            parser.setAttribute("href", url);
            parser.href = String(parser.href);
            var isIElte9 = Boolean(document.all && !window.atob);
            var isIElte9CORS = isIElte9 && parser.host.split(":")[0] !== location.host.split(":")[0];
            if (isIElte9CORS) {
                var isSameProtocol = parser.protocol === location.protocol;
                if (isSameProtocol) {
                    var xdr = new XDomainRequest;
                    xdr.open("GET", url);
                    xdr.timeout = 0;
                    xdr.onprogress = Function.prototype;
                    xdr.ontimeout = Function.prototype;
                    xdr.onload = function() {
                        if (isValidCss(xdr.responseText)) {
                            onSuccess(xdr.responseText, i);
                        } else {
                            onError(xdr, i);
                        }
                    };
                    xdr.onerror = function(err) {
                        onError(xdr, i);
                    };
                    setTimeout((function() {
                        xdr.send();
                    }), 0);
                } else {
                    console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(url, ")"));
                    onError(null, i);
                }
            } else {
                var xhr = new XMLHttpRequest;
                xhr.open("GET", url);
                if (settings.mimeType && xhr.overrideMimeType) {
                    xhr.overrideMimeType(settings.mimeType);
                }
                settings.onBeforeSend(xhr, url, i);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 && isValidCss(xhr.responseText)) {
                            onSuccess(xhr.responseText, i);
                        } else {
                            onError(xhr, i);
                        }
                    }
                };
                xhr.send();
            }
        }));
    }
    /**
   * Gets CSS data from <style> and <link> nodes (including @imports), then
   * returns data in order processed by DOM. Allows specifying nodes to
   * include/exclude and filtering CSS data using RegEx.
   *
   * @preserve
   * @param {object}   [options] The options object
   * @param {object}   [options.rootElement=document] Root element to traverse for
   *                   <link> and <style> nodes.
   * @param {string}   [options.include] CSS selector matching <link> and <style>
   *                   nodes to include
   * @param {string}   [options.exclude] CSS selector matching <link> and <style>
   *                   nodes to exclude
   * @param {object}   [options.filter] Regular expression used to filter node CSS
   *                   data. Each block of CSS data is tested against the filter,
   *                   and only matching data is included.
   * @param {boolean}  [options.skipDisabled=true] Determines if disabled
   *                   stylesheets will be skipped while collecting CSS data.
   * @param {boolean}  [options.useCSSOM=false] Determines if CSS data will be
   *                   collected from a stylesheet's runtime values instead of its
   *                   text content. This is required to get accurate CSS data
   *                   when a stylesheet has been modified using the deleteRule()
   *                   or insertRule() methods because these modifications will
   *                   not be reflected in the stylesheet's text content.
   * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
   *                   1) the XHR object, 2) source node reference, and 3) the
   *                   source URL as arguments.
   * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
   *                   1) CSS text, 2) source node reference, and 3) the source
   *                   URL as arguments.
   * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
   *                   object for inspection, 2) soure node reference, and 3) the
   *                   source URL that failed (either a <link> href or an @import)
   *                   as arguments
   * @param {function} [options.onComplete] Callback after all nodes have been
   *                   processed. Passes 1) concatenated CSS text, 2) an array of
   *                   CSS text in DOM order, and 3) an array of nodes in DOM
   *                   order as arguments.
   *
   * @example
   *
   *   getCssData({
   *     rootElement : document,
   *     include     : 'style,link[rel="stylesheet"]',
   *     exclude     : '[href="skip.css"]',
   *     filter      : /red/,
   *     skipDisabled: true,
   *     useCSSOM    : false,
   *     onBeforeSend(xhr, node, url) {
   *       // ...
   *     }
   *     onSuccess(cssText, node, url) {
   *       // ...
   *     }
   *     onError(xhr, node, url) {
   *       // ...
   *     },
   *     onComplete(cssText, cssArray, nodeArray) {
   *       // ...
   *     }
   *   });
   */    function getCssData(options) {
        var regex = {
            cssComments: /\/\*[\s\S]+?\*\//g,
            cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
        };
        var settings = {
            rootElement: options.rootElement || document,
            include: options.include || 'style,link[rel="stylesheet"]',
            exclude: options.exclude || null,
            filter: options.filter || null,
            skipDisabled: options.skipDisabled !== false,
            useCSSOM: options.useCSSOM || false,
            onBeforeSend: options.onBeforeSend || Function.prototype,
            onSuccess: options.onSuccess || Function.prototype,
            onError: options.onError || Function.prototype,
            onComplete: options.onComplete || Function.prototype
        };
        var sourceNodes = Array.apply(null, settings.rootElement.querySelectorAll(settings.include)).filter((function(node) {
            return !matchesSelector(node, settings.exclude);
        }));
        var cssArray = Array.apply(null, Array(sourceNodes.length)).map((function(x) {
            return null;
        }));
        function handleComplete() {
            var isComplete = cssArray.indexOf(null) === -1;
            if (isComplete) {
                var cssText = cssArray.join("");
                settings.onComplete(cssText, cssArray, sourceNodes);
            }
        }
        function handleSuccess(cssText, cssIndex, node, sourceUrl) {
            var returnVal = settings.onSuccess(cssText, node, sourceUrl);
            cssText = returnVal !== undefined && Boolean(returnVal) === false ? "" : returnVal || cssText;
            resolveImports(cssText, node, sourceUrl, (function(resolvedCssText, errorData) {
                if (cssArray[cssIndex] === null) {
                    errorData.forEach((function(data) {
                        return settings.onError(data.xhr, node, data.url);
                    }));
                    if (!settings.filter || settings.filter.test(resolvedCssText)) {
                        cssArray[cssIndex] = resolvedCssText;
                    } else {
                        cssArray[cssIndex] = "";
                    }
                    handleComplete();
                }
            }));
        }
        function parseImportData(cssText, baseUrl) {
            var ignoreRules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var importData = {};
            importData.rules = (cssText.replace(regex.cssComments, "").match(regex.cssImports) || []).filter((function(rule) {
                return ignoreRules.indexOf(rule) === -1;
            }));
            importData.urls = importData.rules.map((function(rule) {
                return rule.replace(regex.cssImports, "$1");
            }));
            importData.absoluteUrls = importData.urls.map((function(url) {
                return getFullUrl(url, baseUrl);
            }));
            importData.absoluteRules = importData.rules.map((function(rule, i) {
                var oldUrl = importData.urls[i];
                var newUrl = getFullUrl(importData.absoluteUrls[i], baseUrl);
                return rule.replace(oldUrl, newUrl);
            }));
            return importData;
        }
        function resolveImports(cssText, node, baseUrl, callbackFn) {
            var __errorData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
            var __errorRules = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
            var importData = parseImportData(cssText, baseUrl, __errorRules);
            if (importData.rules.length) {
                getUrls(importData.absoluteUrls, {
                    onBeforeSend: function onBeforeSend(xhr, url, urlIndex) {
                        settings.onBeforeSend(xhr, node, url);
                    },
                    onSuccess: function onSuccess(cssText, url, urlIndex) {
                        var returnVal = settings.onSuccess(cssText, node, url);
                        cssText = returnVal === false ? "" : returnVal || cssText;
                        var responseImportData = parseImportData(cssText, url, __errorRules);
                        responseImportData.rules.forEach((function(rule, i) {
                            cssText = cssText.replace(rule, responseImportData.absoluteRules[i]);
                        }));
                        return cssText;
                    },
                    onError: function onError(xhr, url, urlIndex) {
                        __errorData.push({
                            xhr: xhr,
                            url: url
                        });
                        __errorRules.push(importData.rules[urlIndex]);
                        resolveImports(cssText, node, baseUrl, callbackFn, __errorData, __errorRules);
                    },
                    onComplete: function onComplete(responseArray) {
                        responseArray.forEach((function(importText, i) {
                            cssText = cssText.replace(importData.rules[i], importText);
                        }));
                        resolveImports(cssText, node, baseUrl, callbackFn, __errorData, __errorRules);
                    }
                });
            } else {
                callbackFn(cssText, __errorData);
            }
        }
        if (sourceNodes.length) {
            sourceNodes.forEach((function(node, i) {
                var linkHref = node.getAttribute("href");
                var linkRel = node.getAttribute("rel");
                var isLink = node.nodeName === "LINK" && linkHref && linkRel && linkRel.toLowerCase().indexOf("stylesheet") !== -1;
                var isSkip = settings.skipDisabled === false ? false : node.disabled;
                var isStyle = node.nodeName === "STYLE";
                if (isLink && !isSkip) {
                    getUrls(linkHref, {
                        mimeType: "text/css",
                        onBeforeSend: function onBeforeSend(xhr, url, urlIndex) {
                            settings.onBeforeSend(xhr, node, url);
                        },
                        onSuccess: function onSuccess(cssText, url, urlIndex) {
                            var sourceUrl = getFullUrl(linkHref);
                            handleSuccess(cssText, i, node, sourceUrl);
                        },
                        onError: function onError(xhr, url, urlIndex) {
                            cssArray[i] = "";
                            settings.onError(xhr, node, url);
                            handleComplete();
                        }
                    });
                } else if (isStyle && !isSkip) {
                    var cssText = node.textContent;
                    if (settings.useCSSOM) {
                        cssText = Array.apply(null, node.sheet.cssRules).map((function(rule) {
                            return rule.cssText;
                        })).join("");
                    }
                    handleSuccess(cssText, i, node, location.href);
                } else {
                    cssArray[i] = "";
                    handleComplete();
                }
            }));
        } else {
            settings.onComplete("", []);
        }
    }
    function getFullUrl(url, base) {
        var d = document.implementation.createHTMLDocument("");
        var b = d.createElement("base");
        var a = d.createElement("a");
        d.head.appendChild(b);
        d.body.appendChild(a);
        b.href = base || document.baseURI || (document.querySelector("base") || {}).href || location.href;
        a.href = url;
        return a.href;
    }
    function matchesSelector(elm, selector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matches.call(elm, selector);
    }
    var balancedMatch = balanced;
    function balanced(a, b, str) {
        if (a instanceof RegExp) a = maybeMatch(a, str);
        if (b instanceof RegExp) b = maybeMatch(b, str);
        var r = range(a, b, str);
        return r && {
            start: r[0],
            end: r[1],
            pre: str.slice(0, r[0]),
            body: str.slice(r[0] + a.length, r[1]),
            post: str.slice(r[1] + b.length)
        };
    }
    function maybeMatch(reg, str) {
        var m = str.match(reg);
        return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
        var begs, beg, left, right, result;
        var ai = str.indexOf(a);
        var bi = str.indexOf(b, ai + 1);
        var i = ai;
        if (ai >= 0 && bi > 0) {
            begs = [];
            left = str.length;
            while (i >= 0 && !result) {
                if (i == ai) {
                    begs.push(i);
                    ai = str.indexOf(a, i + 1);
                } else if (begs.length == 1) {
                    result = [ begs.pop(), bi ];
                } else {
                    beg = begs.pop();
                    if (beg < left) {
                        left = beg;
                        right = bi;
                    }
                    bi = str.indexOf(b, i + 1);
                }
                i = ai < bi && ai >= 0 ? ai : bi;
            }
            if (begs.length) {
                result = [ left, right ];
            }
        }
        return result;
    }
    function parseCss(css) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaults = {
            preserveStatic: true,
            removeComments: false
        };
        var settings = _extends({}, defaults, options);
        var errors = [];
        function error(msg) {
            throw new Error("CSS parse error: ".concat(msg));
        }
        function match(re) {
            var m = re.exec(css);
            if (m) {
                css = css.slice(m[0].length);
                return m;
            }
        }
        function open() {
            return match(/^{\s*/);
        }
        function close() {
            return match(/^}/);
        }
        function whitespace() {
            match(/^\s*/);
        }
        function comment() {
            whitespace();
            if (css[0] !== "/" || css[1] !== "*") {
                return;
            }
            var i = 2;
            while (css[i] && (css[i] !== "*" || css[i + 1] !== "/")) {
                i++;
            }
            if (!css[i]) {
                return error("end of comment is missing");
            }
            var str = css.slice(2, i);
            css = css.slice(i + 2);
            return {
                type: "comment",
                comment: str
            };
        }
        function comments() {
            var cmnts = [];
            var c;
            while (c = comment()) {
                cmnts.push(c);
            }
            return settings.removeComments ? [] : cmnts;
        }
        function selector() {
            whitespace();
            while (css[0] === "}") {
                error("extra closing bracket");
            }
            var m = match(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
            if (m) {
                return m[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, (function(m) {
                    return m.replace(/,/g, "‌");
                })).split(/\s*(?![^(]*\)),\s*/).map((function(s) {
                    return s.replace(/\u200C/g, ",");
                }));
            }
        }
        function declaration() {
            if (css[0] === "@") {
                return at_rule();
            }
            match(/^([;\s]*)+/);
            var comment_regexp = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
            var prop = match(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
            if (!prop) {
                return;
            }
            prop = prop[0].trim();
            if (!match(/^:\s*/)) {
                return error("property missing ':'");
            }
            var val = match(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/);
            var ret = {
                type: "declaration",
                property: prop.replace(comment_regexp, ""),
                value: val ? val[0].replace(comment_regexp, "").trim() : ""
            };
            match(/^[;\s]*/);
            return ret;
        }
        function declarations() {
            if (!open()) {
                return error("missing '{'");
            }
            var d;
            var decls = comments();
            while (d = declaration()) {
                decls.push(d);
                decls = decls.concat(comments());
            }
            if (!close()) {
                return error("missing '}'");
            }
            return decls;
        }
        function keyframe() {
            whitespace();
            var vals = [];
            var m;
            while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
                vals.push(m[1]);
                match(/^,\s*/);
            }
            if (vals.length) {
                return {
                    type: "keyframe",
                    values: vals,
                    declarations: declarations()
                };
            }
        }
        function at_keyframes() {
            var m = match(/^@([-\w]+)?keyframes\s*/);
            if (!m) {
                return;
            }
            var vendor = m[1];
            m = match(/^([-\w]+)\s*/);
            if (!m) {
                return error("@keyframes missing name");
            }
            var name = m[1];
            if (!open()) {
                return error("@keyframes missing '{'");
            }
            var frame;
            var frames = comments();
            while (frame = keyframe()) {
                frames.push(frame);
                frames = frames.concat(comments());
            }
            if (!close()) {
                return error("@keyframes missing '}'");
            }
            return {
                type: "keyframes",
                name: name,
                vendor: vendor,
                keyframes: frames
            };
        }
        function at_page() {
            var m = match(/^@page */);
            if (m) {
                var sel = selector() || [];
                return {
                    type: "page",
                    selectors: sel,
                    declarations: declarations()
                };
            }
        }
        function at_page_margin_box() {
            var m = match(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);
            if (m) {
                var name = "".concat(m[1], "-").concat(m[2]) + (m[3] ? "-".concat(m[3]) : "");
                return {
                    type: "page-margin-box",
                    name: name,
                    declarations: declarations()
                };
            }
        }
        function at_fontface() {
            var m = match(/^@font-face\s*/);
            if (m) {
                return {
                    type: "font-face",
                    declarations: declarations()
                };
            }
        }
        function at_supports() {
            var m = match(/^@supports *([^{]+)/);
            if (m) {
                return {
                    type: "supports",
                    supports: m[1].trim(),
                    rules: rules()
                };
            }
        }
        function at_host() {
            var m = match(/^@host\s*/);
            if (m) {
                return {
                    type: "host",
                    rules: rules()
                };
            }
        }
        function at_media() {
            var m = match(/^@media([^{]+)*/);
            if (m) {
                return {
                    type: "media",
                    media: (m[1] || "").trim(),
                    rules: rules()
                };
            }
        }
        function at_custom_m() {
            var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (m) {
                return {
                    type: "custom-media",
                    name: m[1].trim(),
                    media: m[2].trim()
                };
            }
        }
        function at_document() {
            var m = match(/^@([-\w]+)?document *([^{]+)/);
            if (m) {
                return {
                    type: "document",
                    document: m[2].trim(),
                    vendor: m[1] ? m[1].trim() : null,
                    rules: rules()
                };
            }
        }
        function at_x() {
            var m = match(/^@(import|charset|namespace)\s*([^;]+);/);
            if (m) {
                return {
                    type: m[1],
                    name: m[2].trim()
                };
            }
        }
        function at_rule() {
            whitespace();
            if (css[0] === "@") {
                var ret = at_x() || at_fontface() || at_media() || at_keyframes() || at_supports() || at_document() || at_custom_m() || at_host() || at_page() || at_page_margin_box();
                if (ret && !settings.preserveStatic) {
                    var hasVarFunc = false;
                    if (ret.declarations) {
                        hasVarFunc = ret.declarations.some((function(decl) {
                            return /var\(/.test(decl.value);
                        }));
                    } else {
                        var arr = ret.keyframes || ret.rules || [];
                        hasVarFunc = arr.some((function(obj) {
                            return (obj.declarations || []).some((function(decl) {
                                return /var\(/.test(decl.value);
                            }));
                        }));
                    }
                    return hasVarFunc ? ret : {};
                }
                return ret;
            }
        }
        function rule() {
            if (!settings.preserveStatic) {
                var balancedMatch$1 = balancedMatch("{", "}", css);
                if (balancedMatch$1) {
                    var hasVarDecl = /:(?:root|host)(?![.:#(])/.test(balancedMatch$1.pre) && /--\S*\s*:/.test(balancedMatch$1.body);
                    var hasVarFunc = /var\(/.test(balancedMatch$1.body);
                    if (!hasVarDecl && !hasVarFunc) {
                        css = css.slice(balancedMatch$1.end + 1);
                        return {};
                    }
                }
            }
            var sel = selector() || [];
            var decls = settings.preserveStatic ? declarations() : declarations().filter((function(decl) {
                var hasVarDecl = sel.some((function(s) {
                    return /:(?:root|host)(?![.:#(])/.test(s);
                })) && /^--\S/.test(decl.property);
                var hasVarFunc = /var\(/.test(decl.value);
                return hasVarDecl || hasVarFunc;
            }));
            if (!sel.length) {
                error("selector missing");
            }
            return {
                type: "rule",
                selectors: sel,
                declarations: decls
            };
        }
        function rules(core) {
            if (!core && !open()) {
                return error("missing '{'");
            }
            var node;
            var rules = comments();
            while (css.length && (core || css[0] !== "}") && (node = at_rule() || rule())) {
                if (node.type) {
                    rules.push(node);
                }
                rules = rules.concat(comments());
            }
            if (!core && !close()) {
                return error("missing '}'");
            }
            return rules;
        }
        return {
            type: "stylesheet",
            stylesheet: {
                rules: rules(true),
                errors: errors
            }
        };
    }
    function parseVars(cssData) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaults = {
            parseHost: false,
            store: {},
            onWarning: function onWarning() {}
        };
        var settings = _extends({}, defaults, options);
        var reVarDeclSelectors = new RegExp(":".concat(settings.parseHost ? "host" : "root", "$"));
        if (typeof cssData === "string") {
            cssData = parseCss(cssData, settings);
        }
        cssData.stylesheet.rules.forEach((function(rule) {
            if (rule.type !== "rule" || !rule.selectors.some((function(s) {
                return reVarDeclSelectors.test(s);
            }))) {
                return;
            }
            rule.declarations.forEach((function(decl, i) {
                var prop = decl.property;
                var value = decl.value;
                if (prop && prop.indexOf("--") === 0) {
                    settings.store[prop] = value;
                }
            }));
        }));
        return settings.store;
    }
    function stringifyCss(tree) {
        var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var cb = arguments.length > 2 ? arguments[2] : undefined;
        var renderMethods = {
            charset: function charset(node) {
                return "@charset " + node.name + ";";
            },
            comment: function comment(node) {
                return node.comment.indexOf("__CSSVARSPONYFILL") === 0 ? "/*" + node.comment + "*/" : "";
            },
            "custom-media": function customMedia(node) {
                return "@custom-media " + node.name + " " + node.media + ";";
            },
            declaration: function declaration(node) {
                return node.property + ":" + node.value + ";";
            },
            document: function document(node) {
                return "@" + (node.vendor || "") + "document " + node.document + "{" + visit(node.rules) + "}";
            },
            "font-face": function fontFace(node) {
                return "@font-face" + "{" + visit(node.declarations) + "}";
            },
            host: function host(node) {
                return "@host" + "{" + visit(node.rules) + "}";
            },
            import: function _import(node) {
                return "@import " + node.name + ";";
            },
            keyframe: function keyframe(node) {
                return node.values.join(",") + "{" + visit(node.declarations) + "}";
            },
            keyframes: function keyframes(node) {
                return "@" + (node.vendor || "") + "keyframes " + node.name + "{" + visit(node.keyframes) + "}";
            },
            media: function media(node) {
                return "@media " + node.media + "{" + visit(node.rules) + "}";
            },
            namespace: function namespace(node) {
                return "@namespace " + node.name + ";";
            },
            page: function page(node) {
                return "@page " + (node.selectors.length ? node.selectors.join(", ") : "") + "{" + visit(node.declarations) + "}";
            },
            "page-margin-box": function pageMarginBox(node) {
                return "@" + node.name + "{" + visit(node.declarations) + "}";
            },
            rule: function rule(node) {
                var decls = node.declarations;
                if (decls.length) {
                    return node.selectors.join(",") + "{" + visit(decls) + "}";
                }
            },
            supports: function supports(node) {
                return "@supports " + node.supports + "{" + visit(node.rules) + "}";
            }
        };
        function visit(nodes) {
            var buf = "";
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                if (cb) {
                    cb(n);
                }
                var txt = renderMethods[n.type](n);
                if (txt) {
                    buf += txt;
                    if (txt.length && n.selectors) {
                        buf += delim;
                    }
                }
            }
            return buf;
        }
        return visit(tree.stylesheet.rules);
    }
    function walkCss(node, fn) {
        node.rules.forEach((function(rule) {
            if (rule.rules) {
                walkCss(rule, fn);
                return;
            }
            if (rule.keyframes) {
                rule.keyframes.forEach((function(keyframe) {
                    if (keyframe.type === "keyframe") {
                        fn(keyframe.declarations, rule);
                    }
                }));
                return;
            }
            if (!rule.declarations) {
                return;
            }
            fn(rule.declarations, node);
        }));
    }
    var VAR_PROP_IDENTIFIER = "--";
    var VAR_FUNC_IDENTIFIER = "var";
    function transformCss(cssData) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaults = {
            preserveStatic: true,
            preserveVars: false,
            variables: {},
            onWarning: function onWarning() {}
        };
        var settings = _extends({}, defaults, options);
        if (typeof cssData === "string") {
            cssData = parseCss(cssData, settings);
        }
        walkCss(cssData.stylesheet, (function(declarations, node) {
            for (var i = 0; i < declarations.length; i++) {
                var decl = declarations[i];
                var type = decl.type;
                var prop = decl.property;
                var value = decl.value;
                if (type !== "declaration") {
                    continue;
                }
                if (!settings.preserveVars && prop && prop.indexOf(VAR_PROP_IDENTIFIER) === 0) {
                    declarations.splice(i, 1);
                    i--;
                    continue;
                }
                if (value.indexOf(VAR_FUNC_IDENTIFIER + "(") !== -1) {
                    var resolvedValue = resolveValue(value, settings);
                    if (resolvedValue !== decl.value) {
                        resolvedValue = fixNestedCalc(resolvedValue);
                        if (!settings.preserveVars) {
                            decl.value = resolvedValue;
                        } else {
                            declarations.splice(i, 0, {
                                type: type,
                                property: prop,
                                value: resolvedValue
                            });
                            i++;
                        }
                    }
                }
            }
        }));
        return stringifyCss(cssData);
    }
    function fixNestedCalc(value) {
        var reCalcVal = /calc\(([^)]+)\)/g;
        (value.match(reCalcVal) || []).forEach((function(match) {
            var newVal = "calc".concat(match.split("calc").join(""));
            value = value.replace(match, newVal);
        }));
        return value;
    }
    function resolveValue(value) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var __recursiveFallback = arguments.length > 2 ? arguments[2] : undefined;
        if (value.indexOf("var(") === -1) {
            return value;
        }
        var valueData = balancedMatch("(", ")", value);
        function resolveFunc(value) {
            var name = value.split(",")[0].replace(/[\s\n\t]/g, "");
            var fallback = (value.match(/(?:\s*,\s*){1}(.*)?/) || [])[1];
            var match = Object.prototype.hasOwnProperty.call(settings.variables, name) ? String(settings.variables[name]) : undefined;
            var replacement = match || (fallback ? String(fallback) : undefined);
            var unresolvedFallback = __recursiveFallback || value;
            if (!match) {
                settings.onWarning('variable "'.concat(name, '" is undefined'));
            }
            if (replacement && replacement !== "undefined" && replacement.length > 0) {
                return resolveValue(replacement, settings, unresolvedFallback);
            } else {
                return "var(".concat(unresolvedFallback, ")");
            }
        }
        if (!valueData) {
            if (value.indexOf("var(") !== -1) {
                settings.onWarning('missing closing ")" in the value "'.concat(value, '"'));
            }
            return value;
        } else if (valueData.pre.slice(-3) === "var") {
            var isEmptyVarFunc = valueData.body.trim().length === 0;
            if (isEmptyVarFunc) {
                settings.onWarning("var() must contain a non-whitespace string");
                return value;
            } else {
                return valueData.pre.slice(0, -3) + resolveFunc(valueData.body) + resolveValue(valueData.post, settings);
            }
        } else {
            return valueData.pre + "(".concat(resolveValue(valueData.body, settings), ")") + resolveValue(valueData.post, settings);
        }
    }
    var isBrowser = typeof window !== "undefined";
    var isNativeSupport = isBrowser && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)");
    var counters = {
        group: 0,
        job: 0
    };
    var defaults = {
        rootElement: isBrowser ? document : null,
        shadowDOM: false,
        include: "style,link[rel=stylesheet]",
        exclude: "",
        variables: {},
        onlyLegacy: true,
        preserveStatic: true,
        preserveVars: false,
        silent: false,
        updateDOM: true,
        updateURLs: true,
        watch: null,
        onBeforeSend: function onBeforeSend() {},
        onError: function onError() {},
        onWarning: function onWarning() {},
        onSuccess: function onSuccess() {},
        onComplete: function onComplete() {},
        onFinally: function onFinally() {}
    };
    var regex = {
        cssComments: /\/\*[\s\S]+?\*\//g,
        cssKeyframes: /@(?:-\w*-)?keyframes/,
        cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
        cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
        cssVarDeclRules: /(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,
        cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
        cssVarFunc: /var\(\s*--[\w-]/,
        cssVars: /(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
    };
    var variableStore = {
        dom: {},
        job: {},
        user: {}
    };
    var cssVarsIsRunning = false;
    var cssVarsObserver = null;
    var cssVarsSrcNodeCount = 0;
    var debounceTimer = null;
    var isShadowDOMReady = false;
    /**
   * Fetches, parses, and transforms CSS custom properties from specified
   * <style> and <link> elements into static values, then appends a new <style>
   * element with static values to the DOM to provide CSS custom property
   * compatibility for legacy browsers. Also provides a single interface for
   * live updates of runtime values in both modern and legacy browsers.
   *
   * @preserve
   * @param {object}   [options] Options object
   * @param {object}   [options.rootElement=document] Root element to traverse for
   *                   <link> and <style> nodes
   * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
   *                   and <style> nodes will be processed.
   * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
   *                   matching <link re="stylesheet"> and <style> nodes to
   *                   process
   * @param {string}   [options.exclude] CSS selector matching <link
   *                   rel="stylehseet"> and <style> nodes to exclude from those
   *                   matches by options.include
   * @param {object}   [options.variables] A map of custom property name/value
   *                   pairs. Property names can omit or include the leading
   *                   double-hyphen (—), and values specified will override
   *                   previous values
   * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
   *                   only generate legacy-compatible CSS in browsers that lack
   *                   native support (i.e., legacy browsers)
   * @param {boolean}  [options.preserveStatic=true] Determines if CSS
   *                   declarations that do not reference a custom property will
   *                   be preserved in the transformed CSS
   * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
   *                   property declarations will be preserved in the transformed
   *                   CSS
   * @param {boolean}  [options.silent=false] Determines if warning and error
   *                   messages will be displayed on the console
   * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
   *                   update the DOM after processing CSS custom properties
   * @param {boolean}  [options.updateURLs=true] Determines if the ponyfill will
   *                   convert relative url() paths to absolute urls
   * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
   *                   be created that will execute the ponyfill when a <link> or
   *                   <style> DOM mutation is observed
   * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
   *                   1) the XHR object, 2) source node reference, and 3) the
   *                   source URL as arguments
   * @param {function} [options.onError] Callback after a CSS parsing error has
   *                   occurred or an XHR request has failed. Passes 1) an error
   *                   message, and 2) source node reference, 3) xhr, and 4 url as
   *                   arguments.
   * @param {function} [options.onWarning] Callback after each CSS parsing warning
   *                   has occurred. Passes 1) a warning message as an argument.
   * @param {function} [options.onSuccess] Callback after CSS data has been
   *                   collected from each node and before CSS custom properties
   *                   have been transformed. Allows modifying the CSS data before
   *                   it is transformed by returning any string value (or false
   *                   to skip). Passes 1) CSS text, 2) source node reference, and
   *                   3) the source URL as arguments.
   * @param {function} [options.onComplete] Callback after all CSS has been
   *                   processed, legacy-compatible CSS has been generated, and
   *                   (optionally) the DOM has been updated. Passes 1) a CSS
   *                   string with CSS variable values resolved, 2) an array of
   *                   output <style> node references that have been appended to
   *                   the DOM, 3) an object containing all custom properies names
   *                   and values, and 4) the ponyfill execution time in
   *                   milliseconds.
   * @param {function} [options.onFinally] Callback in modern and legacy browsers
   *                   after the ponyfill has finished all tasks. Passes 1) a
   *                   boolean indicating if the last ponyfill call resulted in a
   *                   style change, 2) a boolean indicating if the current
   *                   browser provides native support for CSS custom properties,
   *                   and 3) the ponyfill execution time in milliseconds.
   * @example
   *
   *   cssVars({
   *     rootElement   : document,
   *     shadowDOM     : false,
   *     include       : 'style,link[rel="stylesheet"]',
   *     exclude       : '',
   *     variables     : {},
   *     onlyLegacy    : true,
   *     preserveStatic: true,
   *     preserveVars  : false,
   *     silent        : false,
   *     updateDOM     : true,
   *     updateURLs    : true,
   *     watch         : false,
   *     onBeforeSend(xhr, node, url) {},
   *     onError(message, node, xhr, url) {},
   *     onWarning(message) {},
   *     onSuccess(cssText, node, url) {},
   *     onComplete(cssText, styleNode, cssVariables, benchmark) {},
   *     onFinally(hasChanged, hasNativeSupport, benchmark)
   *   });
   */    function cssVars() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var msgPrefix = "cssVars(): ";
        var settings = _extends({}, defaults, options);
        function handleError(message, sourceNode, xhr, url) {
            if (!settings.silent && window.console) {
                console.error("".concat(msgPrefix).concat(message, "\n"), sourceNode);
            }
            settings.onError(message, sourceNode, xhr, url);
        }
        function handleWarning(message) {
            if (!settings.silent && window.console) {
                console.warn("".concat(msgPrefix).concat(message));
            }
            settings.onWarning(message);
        }
        function handleFinally(hasChanged) {
            settings.onFinally(Boolean(hasChanged), isNativeSupport, getTimeStamp() - settings.__benchmark);
        }
        if (!isBrowser) {
            return;
        }
        if (settings.watch) {
            settings.watch = defaults.watch;
            addMutationObserver(settings);
            cssVars(settings);
            return;
        } else if (settings.watch === false && cssVarsObserver) {
            cssVarsObserver.disconnect();
            cssVarsObserver = null;
        }
        if (!settings.__benchmark) {
            if (cssVarsIsRunning === settings.rootElement) {
                cssVarsDebounced(options);
                return;
            }
            settings.__benchmark = getTimeStamp();
            settings.exclude = [ cssVarsObserver ? '[data-cssvars]:not([data-cssvars=""])' : '[data-cssvars="out"]', settings.exclude ].filter((function(selector) {
                return selector;
            })).join(",");
            settings.variables = fixVarNames(settings.variables);
            if (!cssVarsObserver) {
                var outNodes = Array.apply(null, settings.rootElement.querySelectorAll('[data-cssvars="out"]'));
                outNodes.forEach((function(outNode) {
                    var dataGroup = outNode.getAttribute("data-cssvars-group");
                    var srcNode = dataGroup ? settings.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(dataGroup, '"]')) : null;
                    if (!srcNode) {
                        outNode.parentNode.removeChild(outNode);
                    }
                }));
                if (cssVarsSrcNodeCount) {
                    var srcNodes = settings.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');
                    if (srcNodes.length < cssVarsSrcNodeCount) {
                        cssVarsSrcNodeCount = srcNodes.length;
                        variableStore.dom = {};
                    }
                }
            }
        }
        if (document.readyState !== "loading") {
            if (isNativeSupport && settings.onlyLegacy) {
                var hasVarChange = false;
                if (settings.updateDOM) {
                    var targetElm = settings.rootElement.host || (settings.rootElement === document ? document.documentElement : settings.rootElement);
                    Object.keys(settings.variables).forEach((function(key) {
                        var varValue = settings.variables[key];
                        hasVarChange = hasVarChange || varValue !== getComputedStyle(targetElm).getPropertyValue(key);
                        targetElm.style.setProperty(key, varValue);
                    }));
                }
                handleFinally(hasVarChange);
            } else if (!isShadowDOMReady && (settings.shadowDOM || settings.rootElement.shadowRoot || settings.rootElement.host)) {
                getCssData({
                    rootElement: defaults.rootElement,
                    include: defaults.include,
                    exclude: settings.exclude,
                    skipDisabled: false,
                    onSuccess: function onSuccess(cssText, node, url) {
                        cssText = cssText.replace(regex.cssComments, "").replace(regex.cssMediaQueries, "");
                        cssText = (cssText.match(regex.cssVarDeclRules) || []).join("");
                        return cssText || false;
                    },
                    onComplete: function onComplete(cssText, cssArray, nodeArray) {
                        parseVars(cssText, {
                            store: variableStore.dom,
                            onWarning: handleWarning
                        });
                        isShadowDOMReady = true;
                        cssVars(settings);
                    }
                });
            } else {
                cssVarsIsRunning = settings.rootElement;
                getCssData({
                    rootElement: settings.rootElement,
                    include: settings.include,
                    exclude: settings.exclude,
                    skipDisabled: false,
                    onBeforeSend: settings.onBeforeSend,
                    onError: function onError(xhr, node, url) {
                        var responseUrl = xhr.responseURL || getFullUrl$1(url, location.href);
                        var statusText = xhr.statusText ? "(".concat(xhr.statusText, ")") : "Unspecified Error" + (xhr.status === 0 ? " (possibly CORS related)" : "");
                        var errorMsg = "CSS XHR Error: ".concat(responseUrl, " ").concat(xhr.status, " ").concat(statusText);
                        handleError(errorMsg, node, xhr, responseUrl);
                    },
                    onSuccess: function onSuccess(cssText, node, url) {
                        var returnVal = settings.onSuccess(cssText, node, url);
                        cssText = returnVal !== undefined && Boolean(returnVal) === false ? "" : returnVal || cssText;
                        if (settings.updateURLs) {
                            cssText = fixRelativeCssUrls(cssText, url);
                        }
                        return cssText;
                    },
                    onComplete: function onComplete(cssText, cssArray) {
                        var nodeArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                        var currentVars = _extends({}, variableStore.dom, variableStore.user);
                        var hasVarChange = false;
                        variableStore.job = {};
                        nodeArray.forEach((function(node, i) {
                            var nodeCSS = cssArray[i];
                            if (regex.cssVars.test(nodeCSS)) {
                                try {
                                    var cssTree = parseCss(nodeCSS, {
                                        preserveStatic: settings.preserveStatic,
                                        removeComments: true
                                    });
                                    parseVars(cssTree, {
                                        parseHost: Boolean(settings.rootElement.host),
                                        store: variableStore.dom,
                                        onWarning: handleWarning
                                    });
                                    node.__cssVars = {
                                        tree: cssTree
                                    };
                                } catch (err) {
                                    handleError(err.message, node);
                                }
                            }
                        }));
                        _extends(variableStore.job, variableStore.dom);
                        if (settings.updateDOM) {
                            _extends(variableStore.user, settings.variables);
                            _extends(variableStore.job, variableStore.user);
                        } else {
                            _extends(variableStore.job, variableStore.user, settings.variables);
                            _extends(currentVars, settings.variables);
                        }
                        hasVarChange = counters.job > 0 && Boolean(Object.keys(variableStore.job).length > Object.keys(currentVars).length || Boolean(Object.keys(currentVars).length && Object.keys(variableStore.job).some((function(key) {
                            return variableStore.job[key] !== currentVars[key];
                        }))));
                        if (hasVarChange) {
                            resetCssNodes(settings.rootElement);
                            cssVars(settings);
                        } else {
                            var outCssArray = [];
                            var outNodeArray = [];
                            var hasKeyframesWithVars = false;
                            if (settings.updateDOM) {
                                counters.job++;
                            }
                            nodeArray.forEach((function(node, i) {
                                var isSkip = !node.__cssVars;
                                if (node.__cssVars) {
                                    try {
                                        transformCss(node.__cssVars.tree, _extends({}, settings, {
                                            variables: variableStore.job,
                                            onWarning: handleWarning
                                        }));
                                        var outCss = stringifyCss(node.__cssVars.tree);
                                        if (settings.updateDOM) {
                                            var nodeCSS = cssArray[i];
                                            var hasCSSVarFunc = regex.cssVarFunc.test(nodeCSS);
                                            if (!node.getAttribute("data-cssvars")) {
                                                node.setAttribute("data-cssvars", "src");
                                            }
                                            if (outCss.length && hasCSSVarFunc) {
                                                var dataGroup = node.getAttribute("data-cssvars-group") || ++counters.group;
                                                var outCssNoSpaces = outCss.replace(/\s/g, "");
                                                var outNode = settings.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(dataGroup, '"]')) || document.createElement("style");
                                                hasKeyframesWithVars = hasKeyframesWithVars || regex.cssKeyframes.test(outCss);
                                                if (settings.preserveStatic) {
                                                    node.sheet.disabled = true;
                                                }
                                                if (!outNode.hasAttribute("data-cssvars")) {
                                                    outNode.setAttribute("data-cssvars", "out");
                                                }
                                                if (outCssNoSpaces === node.textContent.replace(/\s/g, "")) {
                                                    isSkip = true;
                                                    if (outNode && outNode.parentNode) {
                                                        node.removeAttribute("data-cssvars-group");
                                                        outNode.parentNode.removeChild(outNode);
                                                    }
                                                } else if (outCssNoSpaces !== outNode.textContent.replace(/\s/g, "")) {
                                                    [ node, outNode ].forEach((function(n) {
                                                        n.setAttribute("data-cssvars-job", counters.job);
                                                        n.setAttribute("data-cssvars-group", dataGroup);
                                                    }));
                                                    outNode.textContent = outCss;
                                                    outCssArray.push(outCss);
                                                    outNodeArray.push(outNode);
                                                    if (!outNode.parentNode) {
                                                        node.parentNode.insertBefore(outNode, node.nextSibling);
                                                    }
                                                }
                                            }
                                        } else {
                                            if (node.textContent.replace(/\s/g, "") !== outCss) {
                                                outCssArray.push(outCss);
                                            }
                                        }
                                    } catch (err) {
                                        handleError(err.message, node);
                                    }
                                }
                                if (isSkip) {
                                    node.setAttribute("data-cssvars", "skip");
                                }
                                if (!node.hasAttribute("data-cssvars-job")) {
                                    node.setAttribute("data-cssvars-job", counters.job);
                                }
                            }));
                            cssVarsSrcNodeCount = settings.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length;
                            if (settings.shadowDOM) {
                                var elms = [ settings.rootElement ].concat(_toConsumableArray(settings.rootElement.querySelectorAll("*")));
                                for (var i = 0, elm; elm = elms[i]; ++i) {
                                    if (elm.shadowRoot && elm.shadowRoot.querySelector("style")) {
                                        var shadowSettings = _extends({}, settings, {
                                            rootElement: elm.shadowRoot
                                        });
                                        cssVars(shadowSettings);
                                    }
                                }
                            }
                            if (settings.updateDOM && hasKeyframesWithVars) {
                                fixKeyframes(settings.rootElement);
                            }
                            cssVarsIsRunning = false;
                            settings.onComplete(outCssArray.join(""), outNodeArray, JSON.parse(JSON.stringify(variableStore.job)), getTimeStamp() - settings.__benchmark);
                            handleFinally(outNodeArray.length);
                        }
                    }
                });
            }
        } else {
            document.addEventListener("DOMContentLoaded", (function init(evt) {
                cssVars(options);
                document.removeEventListener("DOMContentLoaded", init);
            }));
        }
    }
    cssVars.reset = function() {
        counters.job = 0;
        counters.group = 0;
        cssVarsIsRunning = false;
        if (cssVarsObserver) {
            cssVarsObserver.disconnect();
            cssVarsObserver = null;
        }
        cssVarsSrcNodeCount = 0;
        debounceTimer = null;
        isShadowDOMReady = false;
        for (var prop in variableStore) {
            variableStore[prop] = {};
        }
    };
    function addMutationObserver(settings) {
        function isLink(node) {
            var isStylesheet = node.tagName === "LINK" && (node.getAttribute("rel") || "").indexOf("stylesheet") !== -1;
            return isStylesheet && !node.sheet.disabled;
        }
        function isStyle(node) {
            return node.tagName === "STYLE" && !node.sheet.disabled;
        }
        function isValidAddMutation(mutationNodes) {
            return Array.apply(null, mutationNodes).some((function(node) {
                var isElm = node.nodeType === 1;
                var hasAttr = isElm && node.hasAttribute("data-cssvars");
                var isStyleWithVars = isStyle(node) && regex.cssVars.test(node.textContent);
                var isValid = !hasAttr && (isLink(node) || isStyleWithVars);
                return isValid;
            }));
        }
        function isValidRemoveMutation(mutationNodes) {
            return Array.apply(null, mutationNodes).some((function(node) {
                var isElm = node.nodeType === 1;
                var isOutNode = isElm && node.getAttribute("data-cssvars") === "out";
                var isSrcNode = isElm && node.getAttribute("data-cssvars") === "src";
                var isValid = isSrcNode;
                if (isSrcNode || isOutNode) {
                    var dataGroup = node.getAttribute("data-cssvars-group");
                    var orphanNode = settings.rootElement.querySelector('[data-cssvars-group="'.concat(dataGroup, '"]'));
                    if (isSrcNode) {
                        resetCssNodes(settings.rootElement);
                        variableStore.dom = {};
                    }
                    if (orphanNode) {
                        orphanNode.parentNode.removeChild(orphanNode);
                    }
                }
                return isValid;
            }));
        }
        if (!window.MutationObserver) {
            return;
        }
        if (cssVarsObserver) {
            cssVarsObserver.disconnect();
            cssVarsObserver = null;
        }
        cssVarsObserver = new MutationObserver((function(mutations) {
            var hasValidMutation = mutations.some((function(mutation) {
                var isValid = false;
                if (mutation.type === "attributes") {
                    isValid = isLink(mutation.target);
                } else if (mutation.type === "childList") {
                    isValid = isValidAddMutation(mutation.addedNodes) || isValidRemoveMutation(mutation.removedNodes);
                }
                return isValid;
            }));
            if (hasValidMutation) {
                cssVars(settings);
            }
        }));
        cssVarsObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [ "disabled", "href" ],
            childList: true,
            subtree: true
        });
    }
    function cssVarsDebounced(settings) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout((function() {
            settings.__benchmark = null;
            cssVars(settings);
        }), delay);
    }
    function fixKeyframes(rootElement) {
        var animationNameProp = [ "animation-name", "-moz-animation-name", "-webkit-animation-name" ].filter((function(prop) {
            return getComputedStyle(document.body)[prop];
        }))[0];
        if (animationNameProp) {
            var allNodes = rootElement.getElementsByTagName("*");
            var keyframeNodes = [];
            var nameMarker = "__CSSVARSPONYFILL-KEYFRAMES__";
            for (var i = 0, len = allNodes.length; i < len; i++) {
                var node = allNodes[i];
                var animationName = getComputedStyle(node)[animationNameProp];
                if (animationName !== "none") {
                    node.style[animationNameProp] += nameMarker;
                    keyframeNodes.push(node);
                }
            }
            void document.body.offsetHeight;
            for (var _i = 0, _len = keyframeNodes.length; _i < _len; _i++) {
                var nodeStyle = keyframeNodes[_i].style;
                nodeStyle[animationNameProp] = nodeStyle[animationNameProp].replace(nameMarker, "");
            }
        }
    }
    function fixRelativeCssUrls(cssText, baseUrl) {
        var cssUrls = cssText.replace(regex.cssComments, "").match(regex.cssUrls) || [];
        cssUrls.forEach((function(cssUrl) {
            var oldUrl = cssUrl.replace(regex.cssUrls, "$1");
            var newUrl = getFullUrl$1(oldUrl, baseUrl);
            cssText = cssText.replace(cssUrl, cssUrl.replace(oldUrl, newUrl));
        }));
        return cssText;
    }
    function fixVarNames() {
        var varObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var reLeadingHyphens = /^-{2}/;
        return Object.keys(varObj).reduce((function(obj, value) {
            var key = reLeadingHyphens.test(value) ? value : "--".concat(value.replace(/^-+/, ""));
            obj[key] = varObj[value];
            return obj;
        }), {});
    }
    function getFullUrl$1(url) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href;
        var d = document.implementation.createHTMLDocument("");
        var b = d.createElement("base");
        var a = d.createElement("a");
        d.head.appendChild(b);
        d.body.appendChild(a);
        b.href = base;
        a.href = url;
        return a.href;
    }
    function getTimeStamp() {
        return isBrowser && (window.performance || {}).now ? window.performance.now() : (new Date).getTime();
    }
    function resetCssNodes(rootElement) {
        var resetNodes = Array.apply(null, rootElement.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));
        resetNodes.forEach((function(node) {
            return node.setAttribute("data-cssvars", "");
        }));
    }
    return cssVars;
}));
//# sourceMappingURL=css-vars-ponyfill.js.map


/***/ }),

/***/ "./src/App.m.css":
/*!***********************!*\
  !*** ./src/App.m.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {" _key":"diff-test/App","root":"App-m__root__df891dLaFAR"};

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dojo/framework/core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _dojo_framework_core_middleware_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dojo/framework/core/middleware/theme */ "./node_modules/@dojo/framework/core/middleware/theme.mjs");
/* harmony import */ var _dojo_framework_routing_Outlet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dojo/framework/routing/Outlet */ "./node_modules/@dojo/framework/routing/Outlet.mjs");
/* harmony import */ var _dojo_widgets_theme_dojo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dojo/widgets/theme/dojo */ "./node_modules/@dojo/widgets/theme/dojo/index.js");
/* harmony import */ var _dojo_widgets_theme_dojo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dojo_widgets_theme_dojo__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _widgets_Menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widgets/Menu */ "./src/widgets/Menu.tsx");
/* harmony import */ var _App_m_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.m.css */ "./src/App.m.css");
/* harmony import */ var _App_m_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_App_m_css__WEBPACK_IMPORTED_MODULE_5__);






var Loadable__ = { type: "registry" };
var __autoRegistryItems = { Home: () => __webpack_require__.e(/*! import() | src/widgets/Home */ "src/widgets/Home").then(__webpack_require__.bind(null, /*! ./widgets/Home */ "./src/widgets/Home.tsx")), About: () => __webpack_require__.e(/*! import() | src/widgets/About */ "src/widgets/About").then(__webpack_require__.bind(null, /*! ./widgets/About */ "./src/widgets/About.tsx")), Profile: () => __webpack_require__.e(/*! import() | src/widgets/Profile */ "src/widgets/Profile").then(__webpack_require__.bind(null, /*! ./widgets/Profile */ "./src/widgets/Profile.tsx")) };
const factory = Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])({ theme: _dojo_framework_core_middleware_theme__WEBPACK_IMPORTED_MODULE_1__["default"] });
/* harmony default export */ __webpack_exports__["default"] = (factory(function App({ middleware: { theme } }) {
    if (!theme.get()) {
        theme.set(_dojo_widgets_theme_dojo__WEBPACK_IMPORTED_MODULE_3___default.a);
    }
    return (Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])("div", { classes: [_App_m_css__WEBPACK_IMPORTED_MODULE_5__["root"]] },
        Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_widgets_Menu__WEBPACK_IMPORTED_MODULE_4__["default"], null),
        Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_dojo_framework_routing_Outlet__WEBPACK_IMPORTED_MODULE_2__["default"], { id: "main" }, {
            home: Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(Loadable__, { __autoRegistryItem: { label: "__autoRegistryItem_Home", registryItem: __autoRegistryItems.Home } }),
            about: Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(Loadable__, { __autoRegistryItem: { label: "__autoRegistryItem_About", registryItem: __autoRegistryItems.About } }),
            profile: Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(Loadable__, { username: "Dojo User", __autoRegistryItem: { label: "__autoRegistryItem_Profile", registryItem: __autoRegistryItems.Profile } })
        })));
}));


/***/ }),

/***/ "./src/main.tsx":
/*!**********************!*\
  !*** ./src/main.tsx ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dojo/framework/core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _dojo_framework_core_Registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dojo/framework/core/Registry */ "./node_modules/@dojo/framework/core/Registry.mjs");
/* harmony import */ var _dojo_framework_routing_RouterInjector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dojo/framework/routing/RouterInjector */ "./node_modules/@dojo/framework/routing/RouterInjector.mjs");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes */ "./src/routes.ts");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App */ "./src/App.tsx");





const registry = new _dojo_framework_core_Registry__WEBPACK_IMPORTED_MODULE_1__["default"]();
Object(_dojo_framework_routing_RouterInjector__WEBPACK_IMPORTED_MODULE_2__["registerRouterInjector"])(_routes__WEBPACK_IMPORTED_MODULE_3__["default"], registry);
const r = Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["default"])(() => Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_App__WEBPACK_IMPORTED_MODULE_4__["default"], null));
r.mount({ registry, domNode: document.getElementById('app') });


/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
    {
        id: 'home',
        path: 'home',
        outlet: 'main',
        defaultRoute: true
    },
    {
        id: 'about',
        path: 'about',
        outlet: 'main'
    },
    {
        id: 'profile',
        path: 'profile',
        outlet: 'main'
    }
]);


/***/ }),

/***/ "./src/widgets/Menu.tsx":
/*!******************************!*\
  !*** ./src/widgets/Menu.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dojo/framework/core/vdom */ "./node_modules/@dojo/framework/core/vdom.mjs");
/* harmony import */ var _dojo_framework_routing_ActiveLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dojo/framework/routing/ActiveLink */ "./node_modules/@dojo/framework/routing/ActiveLink.mjs");
/* harmony import */ var _dojo_widgets_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dojo/widgets/header */ "./node_modules/@dojo/widgets/header/index.mjs");
/* harmony import */ var _styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/Menu.m.css */ "./src/widgets/styles/Menu.m.css");
/* harmony import */ var _styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__);




const factory = Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["create"])();
/* harmony default export */ __webpack_exports__["default"] = (factory(function Menu() {
    return (Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])("div", { classes: _styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["root"] },
        Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_dojo_widgets_header__WEBPACK_IMPORTED_MODULE_2__["default"], null, {
            title: 'My Dojo App!',
            actions: (Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])("virtual", null,
                Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_dojo_framework_routing_ActiveLink__WEBPACK_IMPORTED_MODULE_1__["default"], { to: "home", classes: [_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["link"]], activeClasses: [_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["selected"]] }, "Home"),
                Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_dojo_framework_routing_ActiveLink__WEBPACK_IMPORTED_MODULE_1__["default"], { to: "about", classes: [_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["link"]], activeClasses: [_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["selected"]] }, "About"),
                Object(_dojo_framework_core_vdom__WEBPACK_IMPORTED_MODULE_0__["tsx"])(_dojo_framework_routing_ActiveLink__WEBPACK_IMPORTED_MODULE_1__["default"], { to: "profile", classes: [_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["link"]], activeClasses: [_styles_Menu_m_css__WEBPACK_IMPORTED_MODULE_3__["selected"]] }, "Profile")))
        })));
}));


/***/ }),

/***/ "./src/widgets/styles/Menu.m.css":
/*!***************************************!*\
  !*** ./src/widgets/styles/Menu.m.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {" _key":"diff-test/Menu","root":"Menu-m__root__df891d3jZMJ","link":"Menu-m__link__df891d1c9_f","selected":"Menu-m__selected__df891d3pg72"};

/***/ })

}]);
//# sourceMappingURL=main.30395a635b90767a7639.modern.bundle.js.map
//# sourceMappingURL=main.30395a635b90767a7639.modern.bundle.js.map