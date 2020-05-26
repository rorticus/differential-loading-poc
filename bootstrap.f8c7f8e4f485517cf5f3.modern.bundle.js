/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
var shimFeatures = {"no-bootstrap":true,"intersection-observer":false,"resize-observer":false,"web-animations":false,"build-fetch":false,"inert":false,"build-blocks":true};
if (window.DojoHasEnvironment && window.DojoHasEnvironment.staticFeatures) {
	Object.keys(window.DojoHasEnvironment.staticFeatures).forEach(function (key) {
		shimFeatures[key] = window.DojoHasEnvironment.staticFeatures[key];
	});
}
window.DojoHasEnvironment = { staticFeatures: shimFeatures };/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
var shimFeatures = {"no-bootstrap":true,"intersection-observer":false,"resize-observer":false,"web-animations":false,"build-fetch":false,"inert":false,"build-blocks":true};
if (window.DojoHasEnvironment && window.DojoHasEnvironment.staticFeatures) {
	Object.keys(window.DojoHasEnvironment.staticFeatures).forEach(function (key) {
		shimFeatures[key] = window.DojoHasEnvironment.staticFeatures[key];
	});
}
window.DojoHasEnvironment = { staticFeatures: shimFeatures };/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
var shimFeatures = {"no-bootstrap":true,"intersection-observer":false,"resize-observer":false,"web-animations":false,"build-fetch":false,"inert":false,"build-blocks":true};
if (window.DojoHasEnvironment && window.DojoHasEnvironment.staticFeatures) {
	Object.keys(window.DojoHasEnvironment.staticFeatures).forEach(function (key) {
		shimFeatures[key] = window.DojoHasEnvironment.staticFeatures[key];
	});
}
window.DojoHasEnvironment = { staticFeatures: shimFeatures };/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"bootstrap": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bootstrap": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"main":"main","runtime/IntersectionObserver":"runtime/IntersectionObserver","runtime/ResizeObserver":"runtime/ResizeObserver","runtime/WebAnimations":"runtime/WebAnimations","runtime/blocks":"runtime/blocks","runtime/client":"runtime/client","runtime/fetch":"runtime/fetch","runtime/inert":"runtime/inert","runtime/pointerEvents":"runtime/pointerEvents","src/widgets/About":"src/widgets/About","src/widgets/Home":"src/widgets/Home","src/widgets/Profile":"src/widgets/Profile"}[chunkId]||chunkId) + "." + {"main":"30395a635b90767a7639","runtime/IntersectionObserver":"495c2f05ef0be36d3442","runtime/ResizeObserver":"7a611217f9ce93c95591","runtime/WebAnimations":"eb93f45a13df0fb10a61","runtime/blocks":"2dfc056f6cab9710d60d","runtime/client":"6ad25e455492662a77d1","runtime/fetch":"0cae7da660054a247eec","runtime/inert":"fef853217fbebd1c8308","runtime/pointerEvents":"ca739343a6feedd6eab4","src/widgets/About":"21369cea4b4bb8143d68","src/widgets/Home":"f0a1531abdba48604a10","src/widgets/Profile":"68c4e0c256ecab65b14f"}[chunkId] + ".modern.bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"main":1,"src/widgets/About":1,"src/widgets/Home":1,"src/widgets/Profile":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({"main":"main","runtime/IntersectionObserver":"runtime/IntersectionObserver","runtime/ResizeObserver":"runtime/ResizeObserver","runtime/WebAnimations":"runtime/WebAnimations","runtime/blocks":"runtime/blocks","runtime/client":"runtime/client","runtime/fetch":"runtime/fetch","runtime/inert":"runtime/inert","runtime/pointerEvents":"runtime/pointerEvents","src/widgets/About":"src/widgets/About","src/widgets/Home":"src/widgets/Home","src/widgets/Profile":"src/widgets/Profile"}[chunkId]||chunkId) + "." + {"main":"52f3f7be10f55e806427","runtime/IntersectionObserver":"31d6cfe0d16ae931b73c","runtime/ResizeObserver":"31d6cfe0d16ae931b73c","runtime/WebAnimations":"31d6cfe0d16ae931b73c","runtime/blocks":"31d6cfe0d16ae931b73c","runtime/client":"31d6cfe0d16ae931b73c","runtime/fetch":"31d6cfe0d16ae931b73c","runtime/inert":"31d6cfe0d16ae931b73c","runtime/pointerEvents":"31d6cfe0d16ae931b73c","src/widgets/About":"df5672370d7a9d52edd5","src/widgets/Home":"5f90bb4b182476fa1212","src/widgets/Profile":"9779a740488aedf81ff1"}[chunkId] + ".bundle.css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.request = request;
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["dojoWebpackJsonpdiff_test"] = window["dojoWebpackJsonpdiff_test"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@dojo/framework/core/has.mjs":
/*!***************************************************!*\
  !*** ./node_modules/@dojo/framework/core/has.mjs ***!
  \***************************************************/
/*! exports provided: testCache, testFunctions, normalize, exists, add, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testCache", function() { return testCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testFunctions", function() { return testFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return exists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return has; });
/* harmony import */ var _shim_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shim/global */ "./node_modules/@dojo/framework/shim/global.mjs");

/**
 * A cache of results of feature tests
 */
const testCache = {};
/**
 * A cache of the un-resolved feature tests
 */
const testFunctions = {};
/* Grab the staticFeatures if there are available */
const { staticFeatures } = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].DojoHasEnvironment || {};
/* Cleaning up the DojoHasEnviornment */
if ('DojoHasEnvironment' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    delete _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].DojoHasEnvironment;
}
/**
 * Custom type guard to narrow the `staticFeatures` to either a map or a function that
 * returns a map.
 *
 * @param value The value to guard for
 */
function isStaticFeatureFunction(value) {
    return typeof value === 'function';
}
/**
 * The cache of asserted features that were available in the global scope when the
 * module loaded
 */
const staticCache = staticFeatures
    ? isStaticFeatureFunction(staticFeatures)
        ? staticFeatures.apply(_shim_global__WEBPACK_IMPORTED_MODULE_0__["default"])
        : staticFeatures
    : {}; /* Providing an empty cache, if none was in the environment


/**
* AMD plugin function.
*
* Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
* value(s).
*
* @param resourceId The id of the module
* @param normalize Resolves a relative module id into an absolute module id
*/
function normalize(resourceId, normalize) {
    const tokens = resourceId.match(/[\?:]|[^:\?]*/g) || [];
    let i = 0;
    function get(skip) {
        const term = tokens[i++];
        if (term === ':') {
            // empty string module name, resolves to null
            return null;
        }
        else {
            // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
            if (tokens[i++] === '?') {
                if (!skip && has(term)) {
                    // matched the feature, get the first value from the options
                    return get();
                }
                else {
                    // did not match, get the second value, passing over the first
                    get(true);
                    return get(skip);
                }
            }
            // a module
            return term;
        }
    }
    const id = get();
    return id && normalize(id);
}
/**
 * Check if a feature has already been registered
 *
 * @param feature the name of the feature
 */
function exists(feature) {
    const normalizedFeature = feature.toLowerCase();
    return Boolean(normalizedFeature in staticCache || normalizedFeature in testCache || testFunctions[normalizedFeature]);
}
/**
 * Register a new test for a named feature.
 *
 * @example
 * has.add('dom-addeventlistener', !!document.addEventListener);
 *
 * @example
 * has.add('touch-events', function () {
 *    return 'ontouchstart' in document
 * });
 *
 * @param feature the name of the feature
 * @param value the value reported of the feature, or a function that will be executed once on first test
 * @param overwrite if an existing value should be overwritten. Defaults to false.
 */
function add(feature, value, overwrite = false) {
    const normalizedFeature = feature.toLowerCase();
    if (exists(normalizedFeature) && !overwrite && !(normalizedFeature in staticCache)) {
        throw new TypeError(`Feature "${feature}" exists and overwrite not true.`);
    }
    if (typeof value === 'function') {
        testFunctions[normalizedFeature] = value;
    }
    else {
        testCache[normalizedFeature] = value;
        delete testFunctions[normalizedFeature];
    }
}
/**
 * Return the current value of a named feature.
 *
 * @param feature The name of the feature to test.
 */
function has(feature, strict = false) {
    let result;
    const normalizedFeature = feature.toLowerCase();
    if (normalizedFeature in staticCache) {
        result = staticCache[normalizedFeature];
    }
    else if (testFunctions[normalizedFeature]) {
        result = testCache[normalizedFeature] = testFunctions[normalizedFeature].call(null);
        delete testFunctions[normalizedFeature];
    }
    else if (normalizedFeature in testCache) {
        result = testCache[normalizedFeature];
    }
    else if (strict) {
        throw new TypeError(`Attempt to detect unregistered has feature "${feature}"`);
    }
    return result;
}
/*
 * Out of the box feature tests
 */
add('public-path', undefined);
/* flag for dojo debug, default to false */
add('dojo-debug', false);
/* Detects if the environment is "browser like" */
add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
/* Detects if the environment is "jsdom" */
add('host-jsdom', has('host-browser') && typeof navigator !== 'undefined' && navigator.userAgent.indexOf('jsdom') !== -1);
/* Detects if the environment appears to be NodeJS */
add('host-node', function () {
    if (typeof process === 'object' && process.versions && process.versions.node) {
        return process.versions.node;
    }
});
add('fetch', 'fetch' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"] && typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].fetch === 'function', true);
add('es6-array', () => {
    return (['from', 'of'].every((key) => key in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Array) &&
        ['findIndex', 'find', 'copyWithin'].every((key) => key in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Array.prototype));
}, true);
add('es6-array-fill', () => {
    if ('fill' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Array.prototype) {
        /* Some versions of Safari do not properly implement this */
        return [1].fill(9, Number.POSITIVE_INFINITY)[0] === 1;
    }
    return false;
}, true);
add('es7-array', () => 'includes' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Array.prototype, true);
add('es2019-array', () => 'flat' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Array.prototype, true);
/* Map */
add('es6-map', () => {
    if (typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Map === 'function') {
        /*
    IE11 and older versions of Safari are missing critical ES6 Map functionality
    We wrap this in a try/catch because sometimes the Map constructor exists, but does not
    take arguments (iOS 8.4)
     */
        try {
            const map = new _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Map([[0, 1]]);
            return (map.has(0) &&
                typeof map.keys === 'function' &&
                has('es6-symbol') &&
                typeof map.values === 'function' &&
                typeof map.entries === 'function');
        }
        catch (e) {
            /* istanbul ignore next: not testing on iOS at the moment */
            return false;
        }
    }
    return false;
}, true);
add('es6-iterator', () => has('es6-map'));
/* Math */
add('es6-math', () => {
    return [
        'clz32',
        'sign',
        'log10',
        'log2',
        'log1p',
        'expm1',
        'cosh',
        'sinh',
        'tanh',
        'acosh',
        'asinh',
        'atanh',
        'trunc',
        'fround',
        'cbrt',
        'hypot'
    ].every((name) => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Math[name] === 'function');
}, true);
add('es6-math-imul', () => {
    if ('imul' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Math) {
        /* Some versions of Safari on ios do not properly implement this */
        return Math.imul(0xffffffff, 5) === -5;
    }
    return false;
}, true);
/* Object */
add('es6-object', () => {
    return (has('es6-symbol') &&
        ['assign', 'is', 'getOwnPropertySymbols', 'setPrototypeOf'].every((name) => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Object[name] === 'function'));
}, true);
add('es2017-object', () => {
    return ['values', 'entries', 'getOwnPropertyDescriptors'].every((name) => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Object[name] === 'function');
}, true);
/* Observable */
add('es-observable', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Observable !== 'undefined', true);
/* Promise */
add('es6-promise', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Promise !== 'undefined' && has('es6-symbol'), true);
add('es2018-promise-finally', () => has('es6-promise') && typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Promise.prototype.finally !== 'undefined', true);
/* Set */
add('es6-set', () => {
    if (typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Set === 'function') {
        /* IE11 and older versions of Safari are missing critical ES6 Set functionality */
        const set = new _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Set([1]);
        return set.has(1) && 'keys' in set && typeof set.keys === 'function' && has('es6-symbol');
    }
    return false;
}, true);
/* String */
add('es6-string', () => {
    return ([
        /* static methods */
        'fromCodePoint'
    ].every((key) => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].String[key] === 'function') &&
        [
            /* instance methods */
            'codePointAt',
            'normalize',
            'repeat',
            'startsWith',
            'endsWith',
            'includes'
        ].every((key) => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].String.prototype[key] === 'function'));
}, true);
add('es6-string-raw', () => {
    function getCallSite(callSite, ...substitutions) {
        const result = [...callSite];
        result.raw = callSite.raw;
        return result;
    }
    if ('raw' in _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].String) {
        let b = 1;
        let callSite = getCallSite `a\n${b}`;
        callSite.raw = ['a\\n'];
        const supportsTrunc = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].String.raw(callSite, 42) === 'a\\n';
        return supportsTrunc;
    }
    return false;
}, true);
add('es2017-string', () => {
    return ['padStart', 'padEnd'].every((key) => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].String.prototype[key] === 'function');
}, true);
/* Symbol */
add('es6-symbol', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Symbol !== 'undefined' && typeof Symbol() === 'symbol', true);
/* WeakMap */
add('es6-weakmap', () => {
    if (typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].WeakMap !== 'undefined') {
        /* IE11 and older versions of Safari are missing critical ES6 Map functionality */
        const key1 = {};
        const key2 = {};
        const map = new _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].WeakMap([[key1, 1]]);
        Object.freeze(key1);
        return map.get(key1) === 1 && map.set(key2, 2) === map && has('es6-symbol');
    }
    return false;
}, true);
/* Miscellaneous features */
add('microtasks', () => has('es6-promise') || has('host-node') || has('dom-mutationobserver'), true);
add('postmessage', () => {
    // If window is undefined, and we have postMessage, it probably means we're in a web worker. Web workers have
    // post message but it doesn't work how we expect it to, so it's best just to pretend it doesn't exist.
    return typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].window !== 'undefined' && typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].postMessage === 'function';
}, true);
add('raf', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].requestAnimationFrame === 'function', true);
add('setimmediate', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].setImmediate !== 'undefined', true);
/* DOM Features */
add('dom-mutationobserver', () => {
    if (has('host-browser') && Boolean(_shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].MutationObserver || _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].WebKitMutationObserver)) {
        // IE11 has an unreliable MutationObserver implementation where setProperty() does not
        // generate a mutation event, observers can crash, and the queue does not drain
        // reliably. The following feature test was adapted from
        // https://gist.github.com/t10ko/4aceb8c71681fdb275e33efe5e576b14
        const example = document.createElement('div');
        /* tslint:disable-next-line:variable-name */
        const HostMutationObserver = _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].MutationObserver || _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].WebKitMutationObserver;
        const observer = new HostMutationObserver(function () { });
        observer.observe(example, { attributes: true });
        example.style.setProperty('display', 'block');
        return Boolean(observer.takeRecords().length);
    }
    return false;
}, true);
add('dom-webanimation', () => has('host-browser') && _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].Animation !== undefined && _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].KeyframeEffect !== undefined, true);
add('abort-controller', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].AbortController !== 'undefined');
add('abort-signal', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].AbortSignal !== 'undefined');
add('dom-intersection-observer', () => has('host-browser') && _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].IntersectionObserver !== undefined, true);
add('dom-resize-observer', () => has('host-browser') && _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].ResizeObserver !== undefined, true);
add('dom-pointer-events', () => has('host-browser') && _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].onpointerdown !== undefined, true);
add('dom-css-variables', () => has('host-browser') &&
    !has('host-jsdom') &&
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].window.CSS &&
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].window.CSS.supports &&
    _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].window.CSS.supports('(--a: 0)'), true);
add('dom-inert', () => has('host-browser') && Element.prototype.hasOwnProperty('inert'), true);
add('build-elide', false);
add('test', false);
add('global-this', () => typeof _shim_global__WEBPACK_IMPORTED_MODULE_0__["default"].globalThis !== 'undefined');


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Promise.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/Promise.mjs ***!
  \*******************************************************/
/*! exports provided: ShimPromise, isThenable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShimPromise", function() { return ShimPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isThenable", function() { return isThenable; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _support_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./support/queue */ "./node_modules/@dojo/framework/shim/support/queue.mjs");
/* harmony import */ var _Symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Symbol */ "./node_modules/@dojo/framework/shim/Symbol.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
var _a;

`!has('microtasks')`;

`!has('es6-symbol')`;


let ShimPromise = _global__WEBPACK_IMPORTED_MODULE_0__["default"].Promise;
const isThenable = function isThenable(value) {
    return value && typeof value.then === 'function';
};
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_3__["default"])('es6-promise')) {
    _global__WEBPACK_IMPORTED_MODULE_0__["default"].Promise = ShimPromise = (_a = class Promise {
            /**
             * Creates a new Promise.
             *
             * @constructor
             *
             * @param executor
             * The executor function is called immediately when the Promise is instantiated. It is responsible for
             * starting the asynchronous operation when it is invoked.
             *
             * The executor must call either the passed `resolve` function when the asynchronous operation has completed
             * successfully, or the `reject` function when the operation fails.
             */
            constructor(executor) {
                /**
                 * The current state of this promise.
                 */
                this.state = 1 /* Pending */;
                this[Symbol.toStringTag] = 'Promise';
                /**
                 * If true, the resolution of this promise is chained ("locked in") to another promise.
                 */
                let isChained = false;
                /**
                 * Whether or not this promise is in a resolved state.
                 */
                const isResolved = () => {
                    return this.state !== 1 /* Pending */ || isChained;
                };
                /**
                 * Callbacks that should be invoked once the asynchronous operation has completed.
                 */
                let callbacks = [];
                /**
                 * Initially pushes callbacks onto a queue for execution once this promise settles. After the promise settles,
                 * enqueues callbacks for execution on the next event loop turn.
                 */
                let whenFinished = function (callback) {
                    if (callbacks) {
                        callbacks.push(callback);
                    }
                };
                /**
                 * Settles this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                const settle = (newState, value) => {
                    // A promise can only be settled once.
                    if (this.state !== 1 /* Pending */) {
                        return;
                    }
                    this.state = newState;
                    this.resolvedValue = value;
                    whenFinished = _support_queue__WEBPACK_IMPORTED_MODULE_1__["queueMicroTask"];
                    // Only enqueue a callback runner if there are callbacks so that initially fulfilled Promises don't have to
                    // wait an extra turn.
                    if (callbacks && callbacks.length > 0) {
                        Object(_support_queue__WEBPACK_IMPORTED_MODULE_1__["queueMicroTask"])(function () {
                            if (callbacks) {
                                let count = callbacks.length;
                                for (let i = 0; i < count; ++i) {
                                    callbacks[i].call(null);
                                }
                                callbacks = null;
                            }
                        });
                    }
                };
                /**
                 * Resolves this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                const resolve = (newState, value) => {
                    if (isResolved()) {
                        return;
                    }
                    if (isThenable(value)) {
                        value.then(settle.bind(null, 0 /* Fulfilled */), settle.bind(null, 2 /* Rejected */));
                        isChained = true;
                    }
                    else {
                        settle(newState, value);
                    }
                };
                this.then = (onFulfilled, onRejected) => {
                    return new Promise((resolve, reject) => {
                        // whenFinished initially queues up callbacks for execution after the promise has settled. Once the
                        // promise has settled, whenFinished will schedule callbacks for execution on the next turn through the
                        // event loop.
                        whenFinished(() => {
                            const callback = this.state === 2 /* Rejected */ ? onRejected : onFulfilled;
                            if (typeof callback === 'function') {
                                try {
                                    resolve(callback(this.resolvedValue));
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }
                            else if (this.state === 2 /* Rejected */) {
                                reject(this.resolvedValue);
                            }
                            else {
                                resolve(this.resolvedValue);
                            }
                        });
                    });
                };
                try {
                    executor(resolve.bind(null, 0 /* Fulfilled */), resolve.bind(null, 2 /* Rejected */));
                }
                catch (error) {
                    settle(2 /* Rejected */, error);
                }
            }
            static all(iterable) {
                return new this(function (resolve, reject) {
                    const values = [];
                    let complete = 0;
                    let total = 0;
                    let populating = true;
                    function fulfill(index, value) {
                        values[index] = value;
                        ++complete;
                        finish();
                    }
                    function finish() {
                        if (populating || complete < total) {
                            return;
                        }
                        resolve(values);
                    }
                    function processItem(index, item) {
                        ++total;
                        if (isThenable(item)) {
                            // If an item Promise rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(fulfill.bind(null, index), reject);
                        }
                        else {
                            Promise.resolve(item).then(fulfill.bind(null, index));
                        }
                    }
                    let i = 0;
                    for (const value of iterable) {
                        processItem(i, value);
                        i++;
                    }
                    populating = false;
                    finish();
                });
            }
            static race(iterable) {
                return new this(function (resolve, reject) {
                    for (const item of iterable) {
                        if (item instanceof Promise) {
                            // If a Promise item rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(resolve, reject);
                        }
                        else {
                            Promise.resolve(item).then(resolve);
                        }
                    }
                });
            }
            static reject(reason) {
                return new this(function (resolve, reject) {
                    reject(reason);
                });
            }
            static resolve(value) {
                return new this(function (resolve) {
                    resolve(value);
                });
            }
            catch(onRejected) {
                return this.then(undefined, onRejected);
            }
        },
        _a[Symbol.species] = ShimPromise,
        _a);
    // this cast is needed in order to omit finally in the class declaration; this was done so the finally code
    // is not duplicated and always added in the conditional below
}
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_3__["default"])('es2018-promise-finally')) {
    _global__WEBPACK_IMPORTED_MODULE_0__["default"].Promise.prototype.finally = function (onFinally) {
        return this.then(onFinally && ((value) => Promise.resolve(onFinally()).then(() => value)), onFinally &&
            ((reason) => Promise.resolve(onFinally()).then(() => {
                throw reason;
            })));
    };
}
/* harmony default export */ __webpack_exports__["default"] = (ShimPromise);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/Symbol.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/Symbol.mjs ***!
  \******************************************************/
/*! exports provided: Symbol, isSymbol, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return Symbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbol", function() { return isSymbol; });
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/has */ "./node_modules/@dojo/framework/core/has.mjs");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _support_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./support/util */ "./node_modules/@dojo/framework/shim/support/util.mjs");



let Symbol = _global__WEBPACK_IMPORTED_MODULE_1__["default"].Symbol;
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_0__["default"])('es6-symbol')) {
    /**
     * Throws if the value is not a symbol, used internally within the Shim
     * @param  {any}    value The value to check
     * @return {symbol}       Returns the symbol or throws
     */
    const validateSymbol = function validateSymbol(value) {
        if (!isSymbol(value)) {
            throw new TypeError(value + ' is not a symbol');
        }
        return value;
    };
    const defineProperties = Object.defineProperties;
    const defineProperty = Object.defineProperty;
    const create = Object.create;
    const objPrototype = Object.prototype;
    const globalSymbols = {};
    const getSymbolName = (function () {
        const created = create(null);
        return function (desc) {
            let postfix = 0;
            let name;
            while (created[String(desc) + (postfix || '')]) {
                ++postfix;
            }
            desc += String(postfix || '');
            created[desc] = true;
            name = '@@' + desc;
            // FIXME: Temporary guard until the duplicate execution when testing can be
            // pinned down.
            if (!Object.getOwnPropertyDescriptor(objPrototype, name)) {
                defineProperty(objPrototype, name, {
                    set: function (value) {
                        defineProperty(this, name, Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(value));
                    }
                });
            }
            return name;
        };
    })();
    const InternalSymbol = function Symbol(description) {
        if (this instanceof InternalSymbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        return Symbol(description);
    };
    Symbol = _global__WEBPACK_IMPORTED_MODULE_1__["default"].Symbol = function Symbol(description) {
        if (this instanceof Symbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        const sym = Object.create(InternalSymbol.prototype);
        description = description === undefined ? '' : String(description);
        return defineProperties(sym, {
            __description__: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(description),
            __name__: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(getSymbolName(description))
        });
    };
    /* Decorate the Symbol function with the appropriate properties */
    defineProperty(Symbol, 'for', Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(function (key) {
        if (globalSymbols[key]) {
            return globalSymbols[key];
        }
        return (globalSymbols[key] = Symbol(String(key)));
    }));
    defineProperties(Symbol, {
        keyFor: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(function (sym) {
            let key;
            validateSymbol(sym);
            for (key in globalSymbols) {
                if (globalSymbols[key] === sym) {
                    return key;
                }
            }
        }),
        hasInstance: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('hasInstance'), false, false),
        isConcatSpreadable: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('isConcatSpreadable'), false, false),
        iterator: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('iterator'), false, false),
        match: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('match'), false, false),
        observable: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('observable'), false, false),
        replace: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('replace'), false, false),
        search: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('search'), false, false),
        species: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('species'), false, false),
        split: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('split'), false, false),
        toPrimitive: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('toPrimitive'), false, false),
        toStringTag: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('toStringTag'), false, false),
        unscopables: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for('unscopables'), false, false)
    });
    /* Decorate the InternalSymbol object */
    defineProperties(InternalSymbol.prototype, {
        constructor: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol),
        toString: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(function () {
            return this.__name__;
        }, false, false)
    });
    /* Decorate the Symbol.prototype */
    defineProperties(Symbol.prototype, {
        toString: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(function () {
            return 'Symbol (' + validateSymbol(this).__description__ + ')';
        }),
        valueOf: Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(function () {
            return validateSymbol(this);
        })
    });
    defineProperty(Symbol.prototype, Symbol.toPrimitive, Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(function () {
        return validateSymbol(this);
    }));
    defineProperty(Symbol.prototype, Symbol.toStringTag, Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])('Symbol', false, false, true));
    defineProperty(InternalSymbol.prototype, Symbol.toPrimitive, Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.prototype[Symbol.toPrimitive], false, false, true));
    defineProperty(InternalSymbol.prototype, Symbol.toStringTag, Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.prototype[Symbol.toStringTag], false, false, true));
}
/**
 * A custom guard function that determines if an object is a symbol or not
 * @param  {any}       value The value to check to see if it is a symbol or not
 * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
 */
function isSymbol(value) {
    return (value && (typeof value === 'symbol' || value['@@toStringTag'] === 'Symbol')) || false;
}
/**
 * Fill any missing well known symbols if the native Symbol is missing them
 */
[
    'hasInstance',
    'isConcatSpreadable',
    'iterator',
    'species',
    'replace',
    'search',
    'split',
    'match',
    'toPrimitive',
    'toStringTag',
    'unscopables',
    'observable'
].forEach((wellKnown) => {
    if (!Symbol[wellKnown]) {
        Object.defineProperty(Symbol, wellKnown, Object(_support_util__WEBPACK_IMPORTED_MODULE_2__["getValueDescriptor"])(Symbol.for(wellKnown), false, false));
    }
});
/* harmony default export */ __webpack_exports__["default"] = (Symbol);


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/global.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/global.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {const globalObject = (function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof window !== 'undefined' && window.navigator.userAgent.indexOf('jsdom') > -1) {
        return window;
    }
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
})();
/* harmony default export */ __webpack_exports__["default"] = (globalObject);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/queue.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/support/queue.mjs ***!
  \*************************************************************/
/*! exports provided: queueTask, queueAnimationTask, queueMicroTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueTask", function() { return queueTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueAnimationTask", function() { return queueAnimationTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueMicroTask", function() { return queueMicroTask; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./node_modules/@dojo/framework/shim/global.mjs");
/* harmony import */ var _core_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/has */ "./node_modules/@dojo/framework/core/has.mjs");


function executeTask(item) {
    if (item && item.isActive && item.callback) {
        item.callback();
    }
}
function getQueueHandle(item, destructor) {
    return {
        destroy: function () {
            this.destroy = function () { };
            item.isActive = false;
            item.callback = null;
            if (destructor) {
                destructor();
            }
        }
    };
}
let checkMicroTaskQueue;
let microTasks;
/**
 * Schedules a callback to the macrotask queue.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
const queueTask = (function () {
    let destructor;
    let enqueue;
    // Since the IE implementation of `setImmediate` is not flawless, we will test for `postMessage` first.
    if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('postmessage')) {
        const queue = [];
        _global__WEBPACK_IMPORTED_MODULE_0__["default"].addEventListener('message', function (event) {
            // Confirm that the event was triggered by the current window and by this particular implementation.
            if (event.source === _global__WEBPACK_IMPORTED_MODULE_0__["default"] && event.data === 'dojo-queue-message') {
                event.stopPropagation();
                if (queue.length) {
                    executeTask(queue.shift());
                }
            }
        });
        enqueue = function (item) {
            queue.push(item);
            _global__WEBPACK_IMPORTED_MODULE_0__["default"].postMessage('dojo-queue-message', '*');
        };
    }
    else if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('setimmediate')) {
        destructor = _global__WEBPACK_IMPORTED_MODULE_0__["default"].clearImmediate;
        enqueue = function (item) {
            return setImmediate(executeTask.bind(null, item));
        };
    }
    else {
        destructor = _global__WEBPACK_IMPORTED_MODULE_0__["default"].clearTimeout;
        enqueue = function (item) {
            return setTimeout(executeTask.bind(null, item), 0);
        };
    }
    function queueTask(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        const id = enqueue(item);
        return getQueueHandle(item, destructor &&
            function () {
                destructor(id);
            });
    }
    // TODO: Use aspect.before when it is available.
    return Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('microtasks')
        ? queueTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueTask(callback);
        };
})();
// When no mechanism for registering microtasks is exposed by the environment, microtasks will
// be queued and then executed in a single macrotask before the other macrotasks are executed.
if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('microtasks')) {
    let isMicroTaskQueued = false;
    microTasks = [];
    checkMicroTaskQueue = function () {
        if (!isMicroTaskQueued) {
            isMicroTaskQueued = true;
            queueTask(function () {
                isMicroTaskQueued = false;
                if (microTasks.length) {
                    let item;
                    while ((item = microTasks.shift())) {
                        executeTask(item);
                    }
                }
            });
        }
    };
}
/**
 * Schedules an animation task with `window.requestAnimationFrame` if it exists, or with `queueTask` otherwise.
 *
 * Since requestAnimationFrame's behavior does not match that expected from `queueTask`, it is not used there.
 * However, at times it makes more sense to delegate to requestAnimationFrame; hence the following method.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
const queueAnimationTask = (function () {
    if (!Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('raf')) {
        return queueTask;
    }
    function queueAnimationTask(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        const rafId = requestAnimationFrame(executeTask.bind(null, item));
        return getQueueHandle(item, function () {
            cancelAnimationFrame(rafId);
        });
    }
    // TODO: Use aspect.before when it is available.
    return Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('microtasks')
        ? queueAnimationTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueAnimationTask(callback);
        };
})();
/**
 * Schedules a callback to the microtask queue.
 *
 * Any callbacks registered with `queueMicroTask` will be executed before the next macrotask. If no native
 * mechanism for scheduling macrotasks is exposed, then any callbacks will be fired before any macrotask
 * registered with `queueTask` or `queueAnimationTask`.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
let queueMicroTask = (function () {
    let enqueue;
    if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('host-node')) {
        enqueue = function (item) {
            _global__WEBPACK_IMPORTED_MODULE_0__["default"].process.nextTick(executeTask.bind(null, item));
        };
    }
    else if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('es6-promise')) {
        enqueue = function (item) {
            _global__WEBPACK_IMPORTED_MODULE_0__["default"].Promise.resolve(item).then(executeTask);
        };
    }
    else if (Object(_core_has__WEBPACK_IMPORTED_MODULE_1__["default"])('dom-mutationobserver')) {
        /* tslint:disable-next-line:variable-name */
        const HostMutationObserver = _global__WEBPACK_IMPORTED_MODULE_0__["default"].MutationObserver || _global__WEBPACK_IMPORTED_MODULE_0__["default"].WebKitMutationObserver;
        const node = document.createElement('div');
        const queue = [];
        const observer = new HostMutationObserver(function () {
            while (queue.length > 0) {
                const item = queue.shift();
                if (item && item.isActive && item.callback) {
                    item.callback();
                }
            }
        });
        observer.observe(node, { attributes: true });
        enqueue = function (item) {
            queue.push(item);
            node.setAttribute('queueStatus', '1');
        };
    }
    else {
        enqueue = function (item) {
            checkMicroTaskQueue();
            microTasks.push(item);
        };
    }
    return function (callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        enqueue(item);
        return getQueueHandle(item);
    };
})();


/***/ }),

/***/ "./node_modules/@dojo/framework/shim/support/util.mjs":
/*!************************************************************!*\
  !*** ./node_modules/@dojo/framework/shim/support/util.mjs ***!
  \************************************************************/
/*! exports provided: getValueDescriptor, wrapNative */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValueDescriptor", function() { return getValueDescriptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapNative", function() { return wrapNative; });
/**
 * Helper function to generate a value property descriptor
 *
 * @param value        The value the property descriptor should be set to
 * @param enumerable   If the property should be enumberable, defaults to false
 * @param writable     If the property should be writable, defaults to true
 * @param configurable If the property should be configurable, defaults to true
 * @return             The property descriptor object
 */
function getValueDescriptor(value, enumerable = false, writable = true, configurable = true) {
    return {
        value: value,
        enumerable: enumerable,
        writable: writable,
        configurable: configurable
    };
}
function wrapNative(nativeFunction) {
    return function (target, ...args) {
        return nativeFunction.apply(target, args);
    };
}


/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/bootstrap-plugin/async.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@dojo/webpack-contrib/bootstrap-plugin/async.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! @dojo/framework/core/has */ "./node_modules/@dojo/framework/core/has.mjs");
var cldrLoader = __webpack_require__(/*! ../cldr/bootstrap */ "./node_modules/@dojo/webpack-contrib/cldr/bootstrap.js").default;
__webpack_require__(/*! ./common */ "./node_modules/@dojo/webpack-contrib/bootstrap-plugin/common.js");

var modules = [];

if (has.default('build-serve')) {
	modules.push(__webpack_require__.e(/*! import() | runtime/client */ "runtime/client").then(__webpack_require__.t.bind(null, /*! eventsource-polyfill */ "./node_modules/eventsource-polyfill/dist/browserify-eventsource.js", 7)));
	modules.push(__webpack_require__.e(/*! import() | runtime/client */ "runtime/client").then(__webpack_require__.t.bind(null, /*! ../webpack-hot-client/client */ "./node_modules/@dojo/webpack-contrib/webpack-hot-client/client.js", 7)));
}

if (has.default("build-blocks")) {
	modules.push(__webpack_require__.e(/*! import() | runtime/blocks */ "runtime/blocks").then(__webpack_require__.t.bind(null, /*! ../build-time-render/blocks */ "./node_modules/@dojo/webpack-contrib/build-time-render/blocks.js", 7)));
}

if (has.default("intersection-observer") && !has.default('dom-intersection-observer')) {
	modules.push(
		__webpack_require__.e(/*! import() | runtime/IntersectionObserver */ "runtime/IntersectionObserver").then(__webpack_require__.bind(null, /*! @dojo/framework/shim/IntersectionObserver */ "./node_modules/@dojo/framework/shim/IntersectionObserver.mjs"))
	);
}

if (has.default("build-fetch") && !has.default('fetch')) {
	modules.push(__webpack_require__.e(/*! import() | runtime/fetch */ "runtime/fetch").then(__webpack_require__.bind(null, /*! @dojo/framework/shim/fetch */ "./node_modules/@dojo/framework/shim/fetch.mjs")));
}

if (has.default("web-animations") && !has.default('dom-webanimation')) {
	modules.push(__webpack_require__.e(/*! import() | runtime/WebAnimations */ "runtime/WebAnimations").then(__webpack_require__.bind(null, /*! @dojo/framework/shim/WebAnimations */ "./node_modules/@dojo/framework/shim/WebAnimations.mjs")));
}

if (has.default("resize-observer") && !has.default('dom-resize-observer')) {
	modules.push(__webpack_require__.e(/*! import() | runtime/ResizeObserver */ "runtime/ResizeObserver").then(__webpack_require__.bind(null, /*! @dojo/framework/shim/ResizeObserver */ "./node_modules/@dojo/framework/shim/ResizeObserver.mjs")));
}

if (has.default("inert") && !has.default('dom-inert')) {
	modules.push(__webpack_require__.e(/*! import() | runtime/inert */ "runtime/inert").then(__webpack_require__.t.bind(null, /*! @dojo/framework/shim/inert */ "./node_modules/@dojo/framework/shim/inert.mjs", 7)));
}

if (!has.default('dom-pointer-events')) {
	modules.push(__webpack_require__.e(/*! import() | runtime/pointerEvents */ "runtime/pointerEvents").then(__webpack_require__.bind(null, /*! @dojo/framework/shim/pointerEvents */ "./node_modules/@dojo/framework/shim/pointerEvents.mjs")));
}

modules.push(cldrLoader);

module.exports = Promise.all(modules).then(function() {
	return __webpack_require__.e(/*! import() | main */ "main").then(__webpack_require__.bind(null, /*! ./src/main.tsx */ "./src/main.tsx"));
});


/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/bootstrap-plugin/common.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@dojo/webpack-contrib/bootstrap-plugin/common.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! @dojo/framework/core/has */ "./node_modules/@dojo/framework/core/has.mjs");
var global = __webpack_require__(/*! @dojo/framework/shim/global */ "./node_modules/@dojo/framework/shim/global.mjs");

if (!global.default['diff_test']) {
	global.default['diff_test'] = {};
}

if (!has.exists('build-time-render')) {
	has.add('build-time-render', false, false);
}

if (!has.exists('build-serve')) {
	has.add('build-serve', false, false);
}

var appBase = global.default['diff_test'].base ? global.default['diff_test'].base : global.default.__app_base__;

var initialPublicPath = global.default['diff_test'].publicPath
	? global.default['diff_test'].publicPath
	: global.default.__public_path__;

var initialPublicOrigin = global.default['diff_test'].publicOrigin
	? global.default['diff_test'].publicOrigin
	: global.default.__public_origin__;

has.add('app-base', appBase || '/', true);

if (initialPublicPath || initialPublicOrigin) {
	var publicPath = initialPublicOrigin || window.location.origin;
	if (initialPublicPath) {
		publicPath = publicPath + initialPublicPath;
		has.add('public-path', initialPublicPath, true);
	}
	__webpack_require__.p = publicPath;
}


/***/ }),

/***/ "./node_modules/@dojo/webpack-contrib/cldr/bootstrap.js":
/*!**************************************************************!*\
  !*** ./node_modules/@dojo/webpack-contrib/cldr/bootstrap.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (Promise.resolve());


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!******************************************************************************************************!*\
  !*** multi ./src/main.css @dojo/framework/shim/Promise @dojo/webpack-contrib/bootstrap-plugin/async ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/rory/Desktop/Projects/diff-test/src/main.css */"./src/main.css");
__webpack_require__(/*! @dojo/framework/shim/Promise */"./node_modules/@dojo/framework/shim/Promise.mjs");
module.exports = __webpack_require__(/*! @dojo/webpack-contrib/bootstrap-plugin/async */"./node_modules/@dojo/webpack-contrib/bootstrap-plugin/async.js");


/***/ })

/******/ });
//# sourceMappingURL=bootstrap.981343247a80652c260e.modern.bundle.js.map
//# sourceMappingURL=bootstrap.981343247a80652c260e.modern.bundle.js.map