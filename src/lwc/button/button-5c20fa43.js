/* proxy-compat-disable */
/**
 * Copyright (C) 2018 salesforce.com, inc.
 */
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function invariant(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}
function isTrue$1(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function isFalse$1(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function fail(msg) {
  throw new Error(msg);
}
var assert = /*#__PURE__*/Object.freeze({
  __proto__: null,
  fail: fail,
  invariant: invariant,
  isFalse: isFalse$1,
  isTrue: isTrue$1
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  assign,
  create,
  defineProperties,
  defineProperty,
  freeze,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
  getOwnPropertyNames: getOwnPropertyNames$1,
  getPrototypeOf: getPrototypeOf$1,
  hasOwnProperty: hasOwnProperty$1,
  isFrozen,
  keys,
  seal,
  setPrototypeOf
} = Object;
const {
  isArray: isArray$1
} = Array;
const {
  concat: ArrayConcat$1,
  copyWithin: ArrayCopyWithin,
  fill: ArrayFill,
  filter: ArrayFilter,
  find: ArrayFind,
  indexOf: ArrayIndexOf,
  join: ArrayJoin,
  map: ArrayMap,
  pop: ArrayPop,
  push: ArrayPush$1,
  reduce: ArrayReduce,
  reverse: ArrayReverse,
  shift: ArrayShift,
  slice: ArraySlice,
  some: ArraySome,
  sort: ArraySort,
  splice: ArraySplice,
  unshift: ArrayUnshift,
  forEach
} = Array.prototype;
const {
  fromCharCode: StringFromCharCode
} = String;
const {
  charCodeAt: StringCharCodeAt,
  replace: StringReplace,
  split: StringSplit,
  slice: StringSlice,
  toLowerCase: StringToLowerCase
} = String.prototype;
function isUndefined$1(obj) {
  return obj === undefined;
}
function isNull(obj) {
  return obj === null;
}
function isTrue(obj) {
  return obj === true;
}
function isFalse(obj) {
  return obj === false;
}
function isFunction$1(obj) {
  return typeof obj === 'function';
}
function isObject(obj) {
  return typeof obj === 'object';
}
function isString(obj) {
  return typeof obj === 'string';
}
function isNumber(obj) {
  return typeof obj === 'number';
}
function noop() {
  /* Do nothing */
}
const OtS$1 = {}.toString;
function toString$1(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray$1(obj)) {
      return ArrayJoin.call(ArrayMap.call(obj, toString$1), ',');
    }
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$1.call(obj);
  } else {
    return obj + '';
  }
}
function getPropertyDescriptor(o, p) {
  do {
    const d = getOwnPropertyDescriptor$1(o, p);
    if (!isUndefined$1(d)) {
      return d;
    }
    o = getPrototypeOf$1(o);
  } while (o !== null);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 *
 * NOTE: If you update this list, please update test files that implicitly reference this list!
 * Searching the codebase for `aria-flowto` and `ariaFlowTo` should be good enough to find all usages.
 */
const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const {
  AriaAttrNameToPropNameMap,
  AriaPropNameToAttrNameMap
} = /*@__PURE__*/(() => {
  const AriaAttrNameToPropNameMap = create(null);
  const AriaPropNameToAttrNameMap = create(null);
  // Synthetic creation of all AOM property descriptors for Custom Elements
  forEach.call(AriaPropertyNames, propName => {
    const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, () => 'aria-'));
    AriaAttrNameToPropNameMap[attrName] = propName;
    AriaPropNameToAttrNameMap[propName] = attrName;
  });
  return {
    AriaAttrNameToPropNameMap,
    AriaPropNameToAttrNameMap
  };
})();
// These attributes take either an ID or a list of IDs as values.
// This includes aria-* attributes as well as the special non-ARIA "for" attribute
const ID_REFERENCING_ATTRIBUTES_SET = new Set(['aria-activedescendant', 'aria-controls', 'aria-describedby', 'aria-details', 'aria-errormessage', 'aria-flowto', 'aria-labelledby', 'aria-owns', 'for']);

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// See browser support for globalThis:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis#browser_compatibility
/* istanbul ignore next */
// @ts-ignore
const _globalThis = typeof globalThis === 'object' ? globalThis : window;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const KEY__IS_NATIVE_SHADOW_ROOT_DEFINED = '$isNativeShadowRootDefined$';
const KEY__SHADOW_RESOLVER = '$shadowResolver$';
const KEY__SHADOW_STATIC = '$shadowStaticNode$';
const KEY__SHADOW_TOKEN = '$shadowToken$';
const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
const KEY__SCOPED_CSS = '$scoped$';
const KEY__NATIVE_GET_ELEMENT_BY_ID = '$nativeGetElementById$';
const KEY__NATIVE_QUERY_SELECTOR_ALL = '$nativeQuerySelectorAll$';
const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const CAMEL_REGEX = /-([a-z])/g;
// Convoluted map generation so that @lwc/shared remains fully tree-shakable (verify-treeshakable)
const {
  NO_STANDARD_ATTRIBUTE_PROPERTY_MAPPING,
  NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING
} = /*#__PURE__*/(() => {
  /**
   * Map composed of properties to attributes not following the HTML property to attribute mapping
   * convention.
   */
  const NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING = new Map([['accessKey', 'accesskey'], ['readOnly', 'readonly'], ['tabIndex', 'tabindex'], ['bgColor', 'bgcolor'], ['colSpan', 'colspan'], ['rowSpan', 'rowspan'], ['contentEditable', 'contenteditable'], ['crossOrigin', 'crossorigin'], ['dateTime', 'datetime'], ['formAction', 'formaction'], ['isMap', 'ismap'], ['maxLength', 'maxlength'], ['minLength', 'minlength'], ['noValidate', 'novalidate'], ['useMap', 'usemap'], ['htmlFor', 'for']]);
  /**
   * Inverted map with attribute name key and property name value.
   */
  const NO_STANDARD_ATTRIBUTE_PROPERTY_MAPPING = new Map();
  NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING.forEach((value, key) => NO_STANDARD_ATTRIBUTE_PROPERTY_MAPPING.set(value, key));
  return {
    NO_STANDARD_ATTRIBUTE_PROPERTY_MAPPING,
    NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING
  };
})();
/**
 * Map associating previously transformed HTML property into HTML attribute.
 */
const CACHED_PROPERTY_ATTRIBUTE_MAPPING = new Map();
/**
 * Map associating previously transformed HTML attribute into HTML property.
 */
const CACHED_ATTRIBUTE_PROPERTY_MAPPING = new Map();
function htmlPropertyToAttribute(propName) {
  const ariaAttributeName = AriaPropNameToAttrNameMap[propName];
  if (!isUndefined$1(ariaAttributeName)) {
    return ariaAttributeName;
  }
  const specialAttributeName = NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
  if (!isUndefined$1(specialAttributeName)) {
    return specialAttributeName;
  }
  const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
  if (!isUndefined$1(cachedAttributeName)) {
    return cachedAttributeName;
  }
  let attributeName = '';
  for (let i = 0, len = propName.length; i < len; i++) {
    const code = StringCharCodeAt.call(propName, i);
    if (code >= 65 &&
    // "A"
    code <= 90 // "Z"
    ) {
      attributeName += '-' + StringFromCharCode(code + 32);
    } else {
      attributeName += StringFromCharCode(code);
    }
  }
  CACHED_PROPERTY_ATTRIBUTE_MAPPING.set(propName, attributeName);
  return attributeName;
}
function htmlAttributeToProperty(attrName) {
  const ariaPropertyName = AriaAttrNameToPropNameMap[attrName];
  if (!isUndefined$1(ariaPropertyName)) {
    return ariaPropertyName;
  }
  const specialPropertyName = NO_STANDARD_ATTRIBUTE_PROPERTY_MAPPING.get(attrName);
  if (!isUndefined$1(specialPropertyName)) {
    return specialPropertyName;
  }
  const cachedPropertyName = CACHED_ATTRIBUTE_PROPERTY_MAPPING.get(attrName);
  if (!isUndefined$1(cachedPropertyName)) {
    return cachedPropertyName;
  }
  const propertyName = StringReplace.call(attrName, CAMEL_REGEX, g => g[1].toUpperCase());
  CACHED_ATTRIBUTE_PROPERTY_MAPPING.set(attrName, propertyName);
  return propertyName;
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ESCAPED_CHARS = {
  '"': '&quot;',
  "'": '&#x27;',
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;'
};
function htmlEscape(str, attrMode = false) {
  const searchValue = attrMode ? /["&]/g : /["'<>&]/g;
  return str.replace(searchValue, char => ESCAPED_CHARS[char]);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Increment whenever the LWC template compiler changes
const LWC_VERSION = "2.40.1";
const LWC_VERSION_COMMENT_REGEX = /\/\*LWC compiler v([\d.]+)\*\/\s*}/;
// eslint-disable-next-line no-restricted-properties
if (!_globalThis.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis, 'lwcRuntimeFlags', {
    value: create(null)
  });
}
/** version: 2.40.1 */

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect(propName, prototype) {
  return isUndefined$1(getOwnPropertyDescriptor$1(prototype, propName));
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function createAriaPropertyPropertyDescriptor(attrName) {
  // Note that we need to call this.{get,set,has,remove}Attribute rather than dereferencing
  // from Element.prototype, because these methods are overridden in LightningElement.
  return {
    get() {
      // reflect what's in the attribute
      return this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
    },
    set(newValue) {
      // reflect into the corresponding attribute
      if (isNull(newValue)) {
        this.removeAttribute(attrName);
      } else {
        this.setAttribute(attrName, newValue);
      }
    },
    configurable: true,
    enumerable: true
  };
}
function patch$1(propName, prototype) {
  const attrName = AriaPropNameToAttrNameMap[propName];
  const descriptor = createAriaPropertyPropertyDescriptor(attrName);
  defineProperty(prototype, propName, descriptor);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function applyAriaReflection(prototype = Element.prototype) {
  const ElementPrototypeAriaPropertyNames = keys(AriaPropNameToAttrNameMap);
  for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
    const propName = ElementPrototypeAriaPropertyNames[i];
    if (detect(propName, prototype)) {
      patch$1(propName, prototype);
    }
  }
}
/** version: 2.40.1 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
if (!lwcRuntimeFlags.DISABLE_ARIA_REFLECTION_POLYFILL) {
  // If DISABLE_ARIA_REFLECTION_POLYFILL is false, then we need to apply the ARIA reflection polyfill globally,
  // i.e. to the global Element.prototype
  applyAriaReflection();
}
/**
 * Report to the current dispatcher, if there is one.
 * @param reportingEventId
 * @param payload - data to report
 */
function report(reportingEventId, payload) {
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getComponentTag(vm) {
  return `<${StringToLowerCase.call(vm.tagName)}>`;
}
// TODO [#1695]: Unify getComponentStack and getErrorComponentStack
function getComponentStack(vm) {
  const stack = [];
  let prefix = '';
  while (!isNull(vm.owner)) {
    ArrayPush$1.call(stack, prefix + getComponentTag(vm));
    vm = vm.owner;
    prefix += '\t';
  }
  return ArrayJoin.call(stack, '\n');
}
function getErrorComponentStack(vm) {
  const wcStack = [];
  let currentVm = vm;
  while (!isNull(currentVm)) {
    ArrayPush$1.call(wcStack, getComponentTag(currentVm));
    currentVm = currentVm.owner;
  }
  return wcStack.reverse().join('\n\t');
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function addErrorComponentStack(vm, error) {
  if (!isFrozen(error) && isUndefined$1(error.wcStack)) {
    const wcStack = getErrorComponentStack(vm);
    defineProperty(error, 'wcStack', {
      get() {
        return wcStack;
      }
    });
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const alreadyLoggedMessages = new Set();
// Only used in LWC's Karma tests
if (process.env.NODE_ENV === 'test-karma-lwc') {
  // @ts-ignore
  window.__lwcResetAlreadyLoggedMessages = () => {
    alreadyLoggedMessages.clear();
  };
}
function log(method, message, vm, once) {
  let msg = `[LWC ${method}]: ${message}`;
  if (!isUndefined$1(vm)) {
    msg = `${msg}\n${getComponentStack(vm)}`;
  }
  if (once) {
    if (alreadyLoggedMessages.has(msg)) {
      return;
    }
    alreadyLoggedMessages.add(msg);
  }
  // In Jest tests, reduce the warning and error verbosity by not printing the callstack
  if (process.env.NODE_ENV === 'test') {
    /* eslint-disable-next-line no-console */
    console[method](msg);
    return;
  }
  try {
    throw new Error(msg);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console[method](e);
  }
}
function logError(message, vm) {
  log('error', message, vm, false);
}
function logWarn(message, vm) {
  log('warn', message, vm, false);
}
function logWarnOnce(message, vm) {
  log('warn', message, vm, true);
}

/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const TargetToReactiveRecordMap = new WeakMap();
function getReactiveRecord(target) {
  let reactiveRecord = TargetToReactiveRecordMap.get(target);
  if (isUndefined$1(reactiveRecord)) {
    const newRecord = create(null);
    reactiveRecord = newRecord;
    TargetToReactiveRecordMap.set(target, newRecord);
  }
  return reactiveRecord;
}
let currentReactiveObserver = null;
function valueMutated(target, key) {
  const reactiveRecord = TargetToReactiveRecordMap.get(target);
  if (!isUndefined$1(reactiveRecord)) {
    const reactiveObservers = reactiveRecord[key];
    if (!isUndefined$1(reactiveObservers)) {
      for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
        const ro = reactiveObservers[i];
        ro.notify();
      }
    }
  }
}
function valueObserved(target, key) {
  // We should determine if an active Observing Record is present to track mutations.
  if (currentReactiveObserver === null) {
    return;
  }
  const ro = currentReactiveObserver;
  const reactiveRecord = getReactiveRecord(target);
  let reactiveObservers = reactiveRecord[key];
  if (isUndefined$1(reactiveObservers)) {
    reactiveObservers = [];
    reactiveRecord[key] = reactiveObservers;
  } else if (reactiveObservers[0] === ro) {
    return; // perf optimization considering that most subscriptions will come from the same record
  }

  if (ArrayIndexOf.call(reactiveObservers, ro) === -1) {
    ro.link(reactiveObservers);
  }
}
class ReactiveObserver {
  constructor(callback) {
    this.listeners = [];
    this.callback = callback;
  }
  observe(job) {
    const inceptionReactiveRecord = currentReactiveObserver;
    currentReactiveObserver = this;
    let error;
    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      currentReactiveObserver = inceptionReactiveRecord;
      if (error !== undefined) {
        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }
  /**
   * This method is responsible for disconnecting the Reactive Observer
   * from any Reactive Record that has a reference to it, to prevent future
   * notifications about previously recorded access.
   */
  reset() {
    const {
      listeners
    } = this;
    const len = listeners.length;
    if (len > 0) {
      for (let i = 0; i < len; i += 1) {
        const set = listeners[i];
        const pos = ArrayIndexOf.call(listeners[i], this);
        ArraySplice.call(set, pos, 1);
      }
      listeners.length = 0;
    }
  }
  // friend methods
  notify() {
    this.callback.call(undefined, this);
  }
  link(reactiveObservers) {
    ArrayPush$1.call(reactiveObservers, this);
    // we keep track of observing records where the observing record was added to so we can do some clean up later on
    ArrayPush$1.call(this.listeners, reactiveObservers);
  }
}
function componentValueMutated(vm, key) {
  // On the server side, we don't need mutation tracking. Skipping it improves performance.
  {
    valueMutated(vm.component, key);
  }
}
function componentValueObserved(vm, key) {
  // On the server side, we don't need mutation tracking. Skipping it improves performance.
  {
    valueObserved(vm.component, key);
  }
}
function createReactiveObserver(callback) {
  // On the server side, we don't need mutation tracking. Skipping it improves performance.
  return new ReactiveObserver(callback);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let nextTickCallbackQueue = [];
const SPACE_CHAR = 32;
const EmptyObject = seal(create(null));
const EmptyArray = seal([]);
function flushCallbackQueue() {
  if (process.env.NODE_ENV !== 'production') {
    if (nextTickCallbackQueue.length === 0) {
      throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
    }
  }
  const callbacks = nextTickCallbackQueue;
  nextTickCallbackQueue = []; // reset to a new queue
  for (let i = 0, len = callbacks.length; i < len; i += 1) {
    callbacks[i]();
  }
}
function addCallbackToNextTick(callback) {
  if (process.env.NODE_ENV !== 'production') {
    if (!isFunction$1(callback)) {
      throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
    }
  }
  if (nextTickCallbackQueue.length === 0) {
    Promise.resolve().then(flushCallbackQueue);
  }
  ArrayPush$1.call(nextTickCallbackQueue, callback);
}
// Borrowed from Vue template compiler.
// https://github.com/vuejs/vue/blob/531371b818b0e31a989a06df43789728f23dc4e8/src/platforms/web/util/style.js#L5-L16
const DECLARATION_DELIMITER = /;(?![^(]*\))/g;
const PROPERTY_DELIMITER = /:(.+)/;
function parseStyleText(cssText) {
  const styleMap = {};
  const declarations = cssText.split(DECLARATION_DELIMITER);
  for (const declaration of declarations) {
    if (declaration) {
      const [prop, value] = declaration.split(PROPERTY_DELIMITER);
      if (prop !== undefined && value !== undefined) {
        styleMap[prop.trim()] = value.trim();
      }
    }
  }
  return styleMap;
}
// Make a shallow copy of an object but omit the given key
function cloneAndOmitKey(object, keyToOmit) {
  const result = {};
  for (const key of keys(object)) {
    if (key !== keyToOmit) {
      result[key] = object[key];
    }
  }
  return result;
}
function flattenStylesheets(stylesheets) {
  const list = [];
  for (const stylesheet of stylesheets) {
    if (!isArray$1(stylesheet)) {
      list.push(stylesheet);
    } else {
      list.push(...flattenStylesheets(stylesheet));
    }
  }
  return list;
}
// Set a ref (lwc:ref) on a VM, from a template API
function setRefVNode(vm, ref, vnode) {
  if (process.env.NODE_ENV !== 'production' && isUndefined$1(vm.refVNodes)) {
    throw new Error('refVNodes must be defined when setting a ref');
  }
  // If this method is called, then vm.refVNodes is set as the template has refs.
  // If not, then something went wrong and we threw an error above.
  const refVNodes = vm.refVNodes;
  // In cases of conflict (two elements with the same ref), prefer, the last one,
  // in depth-first traversal order.
  if (!(ref in refVNodes) || refVNodes[ref].key < vnode.key) {
    refVNodes[ref] = vnode;
  }
}
// Throw an error if we're running in prod mode. Ensures code is truly removed from prod mode.
function assertNotProd() {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function resolveCircularModuleDependency(fn) {
  const module = fn();
  return (module === null || module === void 0 ? void 0 : module.__esModule) ? module.default : module;
}
function isCircularModuleDependency(obj) {
  return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
// to inject at runtime.
const HTMLElementConstructor = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
const HTMLElementPrototype = HTMLElementConstructor.prototype;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// These properties get added to LWCElement.prototype publicProps automatically
const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title'];
function offsetPropertyErrorMessage(name) {
  return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
}
// Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
//
// If you update this list, check for test files that recapitulate the same list. Searching the codebase
// for e.g. "dropzone" should suffice.
const globalHTMLProperties = {
  accessKey: {
    attribute: 'accesskey'
  },
  accessKeyLabel: {
    readOnly: true
  },
  className: {
    attribute: 'class',
    error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
  },
  contentEditable: {
    attribute: 'contenteditable'
  },
  dataset: {
    readOnly: true,
    error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
  },
  dir: {
    attribute: 'dir'
  },
  draggable: {
    attribute: 'draggable'
  },
  dropzone: {
    attribute: 'dropzone',
    readOnly: true
  },
  hidden: {
    attribute: 'hidden'
  },
  id: {
    attribute: 'id'
  },
  inputMode: {
    attribute: 'inputmode'
  },
  lang: {
    attribute: 'lang'
  },
  slot: {
    attribute: 'slot',
    error: 'Using the `slot` property is an anti-pattern.'
  },
  spellcheck: {
    attribute: 'spellcheck'
  },
  style: {
    attribute: 'style'
  },
  tabIndex: {
    attribute: 'tabindex'
  },
  title: {
    attribute: 'title'
  },
  translate: {
    attribute: 'translate'
  },
  // additional "global attributes" that are not present in the link above.
  isContentEditable: {
    readOnly: true
  },
  offsetHeight: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetHeight')
  },
  offsetLeft: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetLeft')
  },
  offsetParent: {
    readOnly: true
  },
  offsetTop: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetTop')
  },
  offsetWidth: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetWidth')
  },
  role: {
    attribute: 'role'
  }
};
let controlledElement = null;
let controlledAttributeName;
function isAttributeLocked(elm, attrName) {
  return elm !== controlledElement || attrName !== controlledAttributeName;
}
function lockAttribute(_elm, _key) {
  controlledElement = null;
  controlledAttributeName = undefined;
}
function unlockAttribute(elm, key) {
  controlledElement = elm;
  controlledAttributeName = key;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This is a descriptor map that contains
 * all standard properties that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base HTML Element and
 * Base Lightning Element should support.
 */
const HTMLElementOriginalDescriptors = create(null);
forEach.call(keys(AriaPropNameToAttrNameMap), propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});
forEach.call(defaultDefHTMLPropertyNames, propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
  // this category, so, better to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function generateDataDescriptor(options) {
  return assign({
    configurable: true,
    enumerable: true,
    writable: true
  }, options);
}
function generateAccessorDescriptor(options) {
  return assign({
    configurable: true,
    enumerable: true
  }, options);
}
let isDomMutationAllowed = false;
function unlockDomMutation() {
  assertNotProd(); // this method should never leak to prod
  isDomMutationAllowed = true;
}
function lockDomMutation() {
  assertNotProd(); // this method should never leak to prod
  isDomMutationAllowed = false;
}
function logMissingPortalError(name, type) {
  return logError(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
}
function patchElementWithRestrictions(elm, options) {
  assertNotProd(); // this method should never leak to prod
  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const descriptors = {
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
      }
    })
  };
  // Apply extra restriction related to DOM manipulation if the element is not a portal.
  if (!options.isLight && options.isSynthetic && !options.isPortal) {
    const {
      appendChild,
      insertBefore,
      removeChild,
      replaceChild
    } = elm;
    const originalNodeValueDescriptor = getPropertyDescriptor(elm, 'nodeValue');
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    assign(descriptors, {
      appendChild: generateDataDescriptor({
        value(aChild) {
          logMissingPortalError('appendChild', 'method');
          return appendChild.call(this, aChild);
        }
      }),
      insertBefore: generateDataDescriptor({
        value(newNode, referenceNode) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('insertBefore', 'method');
          }
          return insertBefore.call(this, newNode, referenceNode);
        }
      }),
      removeChild: generateDataDescriptor({
        value(aChild) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('removeChild', 'method');
          }
          return removeChild.call(this, aChild);
        }
      }),
      replaceChild: generateDataDescriptor({
        value(newChild, oldChild) {
          logMissingPortalError('replaceChild', 'method');
          return replaceChild.call(this, newChild, oldChild);
        }
      }),
      nodeValue: generateAccessorDescriptor({
        get() {
          return originalNodeValueDescriptor.get.call(this);
        },
        set(value) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('nodeValue', 'property');
          }
          originalNodeValueDescriptor.set.call(this, value);
        }
      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },
        set(value) {
          logMissingPortalError('textContent', 'property');
          originalTextContentDescriptor.set.call(this, value);
        }
      }),
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },
        set(value) {
          logMissingPortalError('innerHTML', 'property');
          return originalInnerHTMLDescriptor.set.call(this, value);
        }
      })
    });
  }
  defineProperties(elm, descriptors);
}
function getShadowRootRestrictionsDescriptors(sr) {
  assertNotProd(); // this method should never leak to prod
  // Disallowing properties in dev mode only to avoid people doing the wrong
  // thing when using the real shadow root, because if that's the case,
  // the component will not work when running with synthetic shadow.
  const originalAddEventListener = sr.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
  return {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
      }
    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
      }
    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into its Component's shadow root
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method on ShadowRoot does not support any options.', getAssociatedVMIfPresent(this));
        }
        // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch
        return originalAddEventListener.apply(this, arguments);
      }
    })
  };
}
// Custom Elements Restrictions:
// -----------------------------
function getCustomElementRestrictionsDescriptors(elm) {
  assertNotProd(); // this method should never leak to prod
  const originalAddEventListener = elm.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
  return {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
      }
    }),
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
      }
    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
      }
    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into a lighting element node
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
        }
        // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch
        return originalAddEventListener.apply(this, arguments);
      }
    })
  };
}
function getComponentRestrictionsDescriptors() {
  assertNotProd(); // this method should never leak to prod
  return {
    tagName: generateAccessorDescriptor({
      get() {
        throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does` + ` not know which tagName will be used to create the element, therefore writing` + ` code that check for that value is error prone.`);
      },
      configurable: true,
      enumerable: false // no enumerable properties on component
    })
  };
}

function getLightningElementPrototypeRestrictionsDescriptors(proto) {
  assertNotProd(); // this method should never leak to prod
  const originalDispatchEvent = proto.dispatchEvent;
  const descriptors = {
    dispatchEvent: generateDataDescriptor({
      value(event) {
        const vm = getAssociatedVM(this);
        if (!isNull(event) && isObject(event)) {
          const {
            type
          } = event;
          if (!/^[a-z][a-z0-9_]*$/.test(type)) {
            logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}.` + ` Event name must start with a lowercase letter and followed only lowercase` + ` letters, numbers, and underscores`, vm);
          }
        }
        // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch
        return originalDispatchEvent.apply(this, arguments);
      }
    })
  };
  forEach.call(getOwnPropertyNames$1(globalHTMLProperties), propName => {
    if (propName in proto) {
      return; // no need to redefine something that we are already exposing
    }

    descriptors[propName] = generateAccessorDescriptor({
      get() {
        const {
          error,
          attribute
        } = globalHTMLProperties[propName];
        const msg = [];
        msg.push(`Accessing the global HTML property "${propName}" is disabled.`);
        if (error) {
          msg.push(error);
        } else if (attribute) {
          msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
        }
        logError(msg.join('\n'), getAssociatedVM(this));
      },
      set() {
        const {
          readOnly
        } = globalHTMLProperties[propName];
        if (readOnly) {
          logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
        }
      }
    });
  });
  return descriptors;
}
// This routine will prevent access to certain properties on a shadow root instance to guarantee
// that all components will work fine in IE11 and other browsers without shadow dom support.
function patchShadowRootWithRestrictions(sr) {
  defineProperties(sr, getShadowRootRestrictionsDescriptors(sr));
}
function patchCustomElementWithRestrictions(elm) {
  const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
  const elmProto = getPrototypeOf$1(elm);
  setPrototypeOf(elm, create(elmProto, restrictionsDescriptors));
}
function patchComponentWithRestrictions(cmp) {
  defineProperties(cmp, getComponentRestrictionsDescriptors());
}
function patchLightningElementPrototypeWithRestrictions(proto) {
  defineProperties(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
}
function updateComponentValue(vm, key, newValue) {
  const {
    cmpFields
  } = vm;
  if (newValue !== cmpFields[key]) {
    cmpFields[key] = newValue;
    componentValueMutated(vm, key);
  }
}

/**
 * Copyright (C) 2017 salesforce.com, inc.
 */
const {
  isArray
} = Array;
const {
  prototype: ObjectDotPrototype,
  getPrototypeOf,
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  isExtensible,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  preventExtensions,
  hasOwnProperty
} = Object;
const {
  push: ArrayPush,
  concat: ArrayConcat
} = Array.prototype;
const OtS = {}.toString;
function toString(obj) {
  if (obj && obj.toString) {
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS.call(obj);
  } else {
    return obj + '';
  }
}
function isUndefined(obj) {
  return obj === undefined;
}
function isFunction(obj) {
  return typeof obj === 'function';
}
const proxyToValueMap = new WeakMap();
function registerProxy(proxy, value) {
  proxyToValueMap.set(proxy, value);
}
const unwrap$1 = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
class BaseProxyHandler {
  constructor(membrane, value) {
    this.originalTarget = value;
    this.membrane = membrane;
  }
  // Shared utility methods
  wrapDescriptor(descriptor) {
    if (hasOwnProperty.call(descriptor, 'value')) {
      descriptor.value = this.wrapValue(descriptor.value);
    } else {
      const {
        set: originalSet,
        get: originalGet
      } = descriptor;
      if (!isUndefined(originalGet)) {
        descriptor.get = this.wrapGetter(originalGet);
      }
      if (!isUndefined(originalSet)) {
        descriptor.set = this.wrapSetter(originalSet);
      }
    }
    return descriptor;
  }
  copyDescriptorIntoShadowTarget(shadowTarget, key) {
    const {
      originalTarget
    } = this;
    // Note: a property might get defined multiple times in the shadowTarget
    //       but it will always be compatible with the previous descriptor
    //       to preserve the object invariants, which makes these lines safe.
    const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
    // TODO: it should be impossible for the originalDescriptor to ever be undefined, this `if` can be removed
    /* istanbul ignore else */
    if (!isUndefined(originalDescriptor)) {
      const wrappedDesc = this.wrapDescriptor(originalDescriptor);
      ObjectDefineProperty(shadowTarget, key, wrappedDesc);
    }
  }
  lockShadowTarget(shadowTarget) {
    const {
      originalTarget
    } = this;
    const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
    targetKeys.forEach(key => {
      this.copyDescriptorIntoShadowTarget(shadowTarget, key);
    });
    const {
      membrane: {
        tagPropertyKey
      }
    } = this;
    if (!isUndefined(tagPropertyKey) && !hasOwnProperty.call(shadowTarget, tagPropertyKey)) {
      ObjectDefineProperty(shadowTarget, tagPropertyKey, ObjectCreate(null));
    }
    preventExtensions(shadowTarget);
  }
  // Shared Traps
  // TODO: apply() is never called
  /* istanbul ignore next */
  apply(shadowTarget, thisArg, argArray) {
    /* No op */
  }
  // TODO: construct() is never called
  /* istanbul ignore next */
  construct(shadowTarget, argArray, newTarget) {
    /* No op */
  }
  get(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved
      }
    } = this;
    const value = originalTarget[key];
    valueObserved(originalTarget, key);
    return this.wrapValue(value);
  }
  has(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        tagPropertyKey,
        valueObserved
      }
    } = this;
    valueObserved(originalTarget, key);
    // since key is never going to be undefined, and tagPropertyKey might be undefined
    // we can simply compare them as the second part of the condition.
    return key in originalTarget || key === tagPropertyKey;
  }
  ownKeys(shadowTarget) {
    const {
      originalTarget,
      membrane: {
        tagPropertyKey
      }
    } = this;
    // if the membrane tag key exists and it is not in the original target, we add it to the keys.
    const keys = isUndefined(tagPropertyKey) || hasOwnProperty.call(originalTarget, tagPropertyKey) ? [] : [tagPropertyKey];
    // small perf optimization using push instead of concat to avoid creating an extra array
    ArrayPush.apply(keys, getOwnPropertyNames(originalTarget));
    ArrayPush.apply(keys, getOwnPropertySymbols(originalTarget));
    return keys;
  }
  isExtensible(shadowTarget) {
    const {
      originalTarget
    } = this;
    // optimization to avoid attempting to lock down the shadowTarget multiple times
    if (!isExtensible(shadowTarget)) {
      return false; // was already locked down
    }

    if (!isExtensible(originalTarget)) {
      this.lockShadowTarget(shadowTarget);
      return false;
    }
    return true;
  }
  getPrototypeOf(shadowTarget) {
    const {
      originalTarget
    } = this;
    return getPrototypeOf(originalTarget);
  }
  getOwnPropertyDescriptor(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved,
        tagPropertyKey
      }
    } = this;
    // keys looked up via getOwnPropertyDescriptor need to be reactive
    valueObserved(originalTarget, key);
    let desc = getOwnPropertyDescriptor(originalTarget, key);
    if (isUndefined(desc)) {
      if (key !== tagPropertyKey) {
        return undefined;
      }
      // if the key is the membrane tag key, and is not in the original target,
      // we produce a synthetic descriptor and install it on the shadow target
      desc = {
        value: undefined,
        writable: false,
        configurable: false,
        enumerable: false
      };
      ObjectDefineProperty(shadowTarget, tagPropertyKey, desc);
      return desc;
    }
    if (desc.configurable === false) {
      // updating the descriptor to non-configurable on the shadow
      this.copyDescriptorIntoShadowTarget(shadowTarget, key);
    }
    // Note: by accessing the descriptor, the key is marked as observed
    // but access to the value, setter or getter (if available) cannot observe
    // mutations, just like regular methods, in which case we just do nothing.
    return this.wrapDescriptor(desc);
  }
}
const getterMap$1 = new WeakMap();
const setterMap$1 = new WeakMap();
const reverseGetterMap = new WeakMap();
const reverseSetterMap = new WeakMap();
class ReactiveProxyHandler extends BaseProxyHandler {
  wrapValue(value) {
    return this.membrane.getProxy(value);
  }
  wrapGetter(originalGet) {
    const wrappedGetter = getterMap$1.get(originalGet);
    if (!isUndefined(wrappedGetter)) {
      return wrappedGetter;
    }
    const handler = this;
    const get = function () {
      // invoking the original getter with the original target
      return handler.wrapValue(originalGet.call(unwrap$1(this)));
    };
    getterMap$1.set(originalGet, get);
    reverseGetterMap.set(get, originalGet);
    return get;
  }
  wrapSetter(originalSet) {
    const wrappedSetter = setterMap$1.get(originalSet);
    if (!isUndefined(wrappedSetter)) {
      return wrappedSetter;
    }
    const set = function (v) {
      // invoking the original setter with the original target
      originalSet.call(unwrap$1(this), unwrap$1(v));
    };
    setterMap$1.set(originalSet, set);
    reverseSetterMap.set(set, originalSet);
    return set;
  }
  unwrapDescriptor(descriptor) {
    if (hasOwnProperty.call(descriptor, 'value')) {
      // dealing with a data descriptor
      descriptor.value = unwrap$1(descriptor.value);
    } else {
      const {
        set,
        get
      } = descriptor;
      if (!isUndefined(get)) {
        descriptor.get = this.unwrapGetter(get);
      }
      if (!isUndefined(set)) {
        descriptor.set = this.unwrapSetter(set);
      }
    }
    return descriptor;
  }
  unwrapGetter(redGet) {
    const reverseGetter = reverseGetterMap.get(redGet);
    if (!isUndefined(reverseGetter)) {
      return reverseGetter;
    }
    const handler = this;
    const get = function () {
      // invoking the red getter with the proxy of this
      return unwrap$1(redGet.call(handler.wrapValue(this)));
    };
    getterMap$1.set(get, redGet);
    reverseGetterMap.set(redGet, get);
    return get;
  }
  unwrapSetter(redSet) {
    const reverseSetter = reverseSetterMap.get(redSet);
    if (!isUndefined(reverseSetter)) {
      return reverseSetter;
    }
    const handler = this;
    const set = function (v) {
      // invoking the red setter with the proxy of this
      redSet.call(handler.wrapValue(this), handler.wrapValue(v));
    };
    setterMap$1.set(set, redSet);
    reverseSetterMap.set(redSet, set);
    return set;
  }
  set(shadowTarget, key, value) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    const oldValue = originalTarget[key];
    if (oldValue !== value) {
      originalTarget[key] = value;
      valueMutated(originalTarget, key);
    } else if (key === 'length' && isArray(originalTarget)) {
      // fix for issue #236: push will add the new index, and by the time length
      // is updated, the internal length is already equal to the new length value
      // therefore, the oldValue is equal to the value. This is the forking logic
      // to support this use case.
      valueMutated(originalTarget, key);
    }
    return true;
  }
  deleteProperty(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    delete originalTarget[key];
    valueMutated(originalTarget, key);
    return true;
  }
  setPrototypeOf(shadowTarget, prototype) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
    }
  }
  preventExtensions(shadowTarget) {
    if (isExtensible(shadowTarget)) {
      const {
        originalTarget
      } = this;
      preventExtensions(originalTarget);
      // if the originalTarget is a proxy itself, it might reject
      // the preventExtension call, in which case we should not attempt to lock down
      // the shadow target.
      // TODO: It should not actually be possible to reach this `if` statement.
      // If a proxy rejects extensions, then calling preventExtensions will throw an error:
      // https://codepen.io/nolanlawson-the-selector/pen/QWMOjbY
      /* istanbul ignore if */
      if (isExtensible(originalTarget)) {
        return false;
      }
      this.lockShadowTarget(shadowTarget);
    }
    return true;
  }
  defineProperty(shadowTarget, key, descriptor) {
    const {
      originalTarget,
      membrane: {
        valueMutated,
        tagPropertyKey
      }
    } = this;
    if (key === tagPropertyKey && !hasOwnProperty.call(originalTarget, key)) {
      // To avoid leaking the membrane tag property into the original target, we must
      // be sure that the original target doesn't have yet.
      // NOTE: we do not return false here because Object.freeze and equivalent operations
      // will attempt to set the descriptor to the same value, and expect no to throw. This
      // is an small compromise for the sake of not having to diff the descriptors.
      return true;
    }
    ObjectDefineProperty(originalTarget, key, this.unwrapDescriptor(descriptor));
    // intentionally testing if false since it could be undefined as well
    if (descriptor.configurable === false) {
      this.copyDescriptorIntoShadowTarget(shadowTarget, key);
    }
    valueMutated(originalTarget, key);
    return true;
  }
  /*LWC compiler v2.40.1*/
}
const getterMap = new WeakMap();
const setterMap = new WeakMap();
class ReadOnlyHandler extends BaseProxyHandler {
  wrapValue(value) {
    return this.membrane.getReadOnlyProxy(value);
  }
  wrapGetter(originalGet) {
    const wrappedGetter = getterMap.get(originalGet);
    if (!isUndefined(wrappedGetter)) {
      return wrappedGetter;
    }
    const handler = this;
    const get = function () {
      // invoking the original getter with the original target
      return handler.wrapValue(originalGet.call(unwrap$1(this)));
    };
    getterMap.set(originalGet, get);
    return get;
  }
  wrapSetter(originalSet) {
    const wrappedSetter = setterMap.get(originalSet);
    if (!isUndefined(wrappedSetter)) {
      return wrappedSetter;
    }
    const handler = this;
    const set = function (v) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        const {
          originalTarget
        } = handler;
        throw new Error(`Invalid mutation: Cannot invoke a setter on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    };
    setterMap.set(originalSet, set);
    return set;
  }
  set(shadowTarget, key, value) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const {
        originalTarget
      } = this;
      const msg = isArray(originalTarget) ? `Invalid mutation: Cannot mutate array at index ${key.toString()}. Array is read-only.` : `Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`;
      throw new Error(msg);
    }
    /* istanbul ignore next */
    return false;
  }
  deleteProperty(shadowTarget, key) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
    /* istanbul ignore next */
    return false;
  }
  setPrototypeOf(shadowTarget, prototype) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
    }
  }
  preventExtensions(shadowTarget) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
    }
    /* istanbul ignore next */
    return false;
  }
  defineProperty(shadowTarget, key, descriptor) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
    /* istanbul ignore next */
    return false;
  }
  /*LWC compiler v2.40.1*/
}
function extract(objectOrArray) {
  if (isArray(objectOrArray)) {
    return objectOrArray.map(item => {
      const original = unwrap$1(item);
      if (original !== item) {
        return extract(original);
      }
      return item;
    });
  }
  const obj = ObjectCreate(getPrototypeOf(objectOrArray));
  const names = getOwnPropertyNames(objectOrArray);
  return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
    const item = objectOrArray[key];
    const original = unwrap$1(item);
    if (original !== item) {
      seed[key] = extract(original);
    } else {
      seed[key] = item;
    }
    return seed;
  }, obj);
}
const formatter = {
  header: plainOrProxy => {
    const originalTarget = unwrap$1(plainOrProxy);
    // if originalTarget is falsy or not unwrappable, exit
    if (!originalTarget || originalTarget === plainOrProxy) {
      return null;
    }
    const obj = extract(plainOrProxy);
    return ['object', {
      object: obj
    }];
  },
  hasBody: () => {
    return false;
  },
  body: () => {
    return null;
  }
};
// Inspired from paulmillr/es6-shim
// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185
/* istanbul ignore next */
function getGlobal() {
  // the only reliable means to get the global object is `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
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
  // Gracefully degrade if not able to locate the global object
  return {};
}
function init$1() {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // this method should never leak to prod
    throw new ReferenceError();
  }
  const global = getGlobal();
  // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
  //  - Go to Settings,
  //  - Under console, select "Enable custom formatters"
  // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview
  const devtoolsFormatters = global.devtoolsFormatters || [];
  ArrayPush.call(devtoolsFormatters, formatter);
  global.devtoolsFormatters = devtoolsFormatters;
}

/* istanbul ignore else */
if (process.env.NODE_ENV !== 'production') {
  init$1();
}
function defaultValueIsObservable(value) {
  // intentionally checking for null
  if (value === null) {
    return false;
  }
  // treat all non-object types, including undefined, as non-observable values
  if (typeof value !== 'object') {
    return false;
  }
  if (isArray(value)) {
    return true;
  }
  const proto = getPrototypeOf(value);
  return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
}
const defaultValueObserved = (obj, key) => {
  /* do nothing */
};
const defaultValueMutated = (obj, key) => {
  /* do nothing */
};
function createShadowTarget(value) {
  return isArray(value) ? [] : {};
}
class ObservableMembrane {
  constructor(options = {}) {
    this.readOnlyObjectGraph = new WeakMap();
    this.reactiveObjectGraph = new WeakMap();
    const {
      valueMutated,
      valueObserved,
      valueIsObservable,
      tagPropertyKey
    } = options;
    this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
    this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
    this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
    this.tagPropertyKey = tagPropertyKey;
  }
  getProxy(value) {
    const unwrappedValue = unwrap$1(value);
    if (this.valueIsObservable(unwrappedValue)) {
      // When trying to extract the writable version of a readonly we return the readonly.
      if (this.readOnlyObjectGraph.get(unwrappedValue) === value) {
        return value;
      }
      return this.getReactiveHandler(unwrappedValue);
    }
    return unwrappedValue;
  }
  getReadOnlyProxy(value) {
    value = unwrap$1(value);
    if (this.valueIsObservable(value)) {
      return this.getReadOnlyHandler(value);
    }
    return value;
  }
  unwrapProxy(p) {
    return unwrap$1(p);
  }
  getReactiveHandler(value) {
    let proxy = this.reactiveObjectGraph.get(value);
    if (isUndefined(proxy)) {
      // caching the proxy after the first time it is accessed
      const handler = new ReactiveProxyHandler(this, value);
      proxy = new Proxy(createShadowTarget(value), handler);
      registerProxy(proxy, value);
      this.reactiveObjectGraph.set(value, proxy);
    }
    return proxy;
  }
  getReadOnlyHandler(value) {
    let proxy = this.readOnlyObjectGraph.get(value);
    if (isUndefined(proxy)) {
      // caching the proxy after the first time it is accessed
      const handler = new ReadOnlyHandler(this, value);
      proxy = new Proxy(createShadowTarget(value), handler);
      registerProxy(proxy, value);
      this.readOnlyObjectGraph.set(value, proxy);
    }
    return proxy;
  }
}
/** version: 2.0.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const lockerLivePropertyKey = Symbol.for('@@lockerLiveValue');
const reactiveMembrane = new ObservableMembrane({
  valueObserved,
  valueMutated,
  tagPropertyKey: lockerLivePropertyKey
});
function getReadOnlyProxy(value) {
  // We must return a frozen wrapper around the value, so that child components cannot mutate properties passed to
  // them from their parents. This applies to both the client and server.
  return reactiveMembrane.getReadOnlyProxy(value);
}
function getReactiveProxy(value) {
  // On the server side, we don't need mutation tracking. Skipping it improves performance.
  return reactiveMembrane.getProxy(value);
}
// Making the component instance a live value when using Locker to support expandos.
function markLockerLiveObject(obj) {
  // On the server side, we don't need mutation tracking. Skipping it improves performance.
  {
    obj[lockerLivePropertyKey] = undefined;
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This operation is called with a descriptor of an standard html property
 * that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
 * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
 */
function createBridgeToElementDescriptor(propName, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;
  if (!isFunction$1(get)) {
    if (process.env.NODE_ENV !== 'production') {
      assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
    }
    throw new TypeError();
  }
  if (!isFunction$1(set)) {
    if (process.env.NODE_ENV !== 'production') {
      assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
    }
    throw new TypeError();
  }
  return {
    enumerable,
    configurable,
    get() {
      const vm = getAssociatedVM(this);
      if (isBeingConstructed(vm)) {
        if (process.env.NODE_ENV !== 'production') {
          logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }
        return;
      }
      componentValueObserved(vm, propName);
      return get.call(vm.elm);
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
        assert.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        assert.invariant(!isObject(newValue) || isNull(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
      }
      updateComponentValue(vm, propName, newValue);
      return set.call(vm.elm, newValue);
    }
  };
}
const refsCache = new WeakMap();
/**
 * This class is the base class for any LWC element.
 * Some elements directly extends this class, others implement it via inheritance.
 **/
// @ts-ignore
const LightningElement = function () {
  // This should be as performant as possible, while any initialization should be done lazily
  if (isNull(vmBeingConstructed)) {
    // Thrown when doing something like `new LightningElement()` or
    // `class Foo extends LightningElement {}; new Foo()`
    throw new TypeError('Illegal constructor');
  }
  const vm = vmBeingConstructed;
  const {
    def,
    elm
  } = vm;
  const {
    bridge
  } = def;
  if (process.env.NODE_ENV !== 'production') {
    const {
      assertInstanceOfHTMLElement
    } = vm.renderer;
    assertInstanceOfHTMLElement(vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
  }
  const component = this;
  setPrototypeOf(elm, bridge.prototype);
  vm.component = this;
  // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
  // component creation and passes hooks to instrument all the component interactions with the
  // engine. We are intentionally hiding this argument from the formal API of LightningElement
  // because we don't want folks to know about it just yet.
  if (arguments.length === 1) {
    const {
      callHook,
      setHook,
      getHook
    } = arguments[0];
    vm.callHook = callHook;
    vm.setHook = setHook;
    vm.getHook = getHook;
  }
  markLockerLiveObject(this);
  // Linking elm, shadow root and component with the VM.
  associateVM(component, vm);
  associateVM(elm, vm);
  if (vm.renderMode === 1 /* RenderMode.Shadow */) {
    vm.renderRoot = doAttachShadow(vm);
  } else {
    vm.renderRoot = elm;
  }
  // Adding extra guard rails in DEV mode.
  if (process.env.NODE_ENV !== 'production') {
    patchCustomElementWithRestrictions(elm);
    patchComponentWithRestrictions(component);
  }
  return this;
};
function doAttachShadow(vm) {
  const {
    elm,
    mode,
    shadowMode,
    def: {
      ctor
    },
    renderer: {
      attachShadow
    }
  } = vm;
  const shadowRoot = attachShadow(elm, {
    [KEY__SYNTHETIC_MODE]: shadowMode === 1 /* ShadowMode.Synthetic */,
    delegatesFocus: Boolean(ctor.delegatesFocus),
    mode
  });
  vm.shadowRoot = shadowRoot;
  associateVM(shadowRoot, vm);
  if (process.env.NODE_ENV !== 'production') {
    patchShadowRootWithRestrictions(shadowRoot);
  }
  return shadowRoot;
}
function warnIfInvokedDuringConstruction(vm, methodOrPropName) {
  if (isBeingConstructed(vm)) {
    logError(`this.${methodOrPropName} should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM or has no children yet.`);
  }
}
// @ts-ignore
LightningElement.prototype = {
  constructor: LightningElement,
  dispatchEvent(event) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        dispatchEvent
      }
    } = vm;
    return dispatchEvent(elm, event);
  },
  addEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        addEventListener
      }
    } = vm;
    if (process.env.NODE_ENV !== 'production') {
      const vmBeingRendered = getVMBeingRendered();
      assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert.invariant(isFunction$1(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
    const wrappedListener = getWrappedComponentsListener(vm, listener);
    addEventListener(elm, type, wrappedListener, options);
  },
  removeEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        removeEventListener
      }
    } = vm;
    const wrappedListener = getWrappedComponentsListener(vm, listener);
    removeEventListener(elm, type, wrappedListener, options);
  },
  hasAttribute(name) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = vm;
    return !isNull(getAttribute(elm, name));
  },
  hasAttributeNS(namespace, name) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = vm;
    return !isNull(getAttribute(elm, name, namespace));
  },
  removeAttribute(name) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = vm;
    unlockAttribute(elm, name);
    removeAttribute(elm, name);
    lockAttribute();
  },
  removeAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name, namespace);
    lockAttribute();
  },
  getAttribute(name) {
    const vm = getAssociatedVM(this);
    const {
      elm
    } = vm;
    const {
      getAttribute
    } = vm.renderer;
    return getAttribute(elm, name);
  },
  getAttributeNS(namespace, name) {
    const vm = getAssociatedVM(this);
    const {
      elm
    } = vm;
    const {
      getAttribute
    } = vm.renderer;
    return getAttribute(elm, name, namespace);
  },
  setAttribute(name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;
    if (process.env.NODE_ENV !== 'production') {
      assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }
    unlockAttribute(elm, name);
    setAttribute(elm, name, value);
    lockAttribute();
  },
  setAttributeNS(namespace, name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;
    if (process.env.NODE_ENV !== 'production') {
      assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }
    unlockAttribute(elm, name);
    setAttribute(elm, name, value, namespace);
    lockAttribute();
  },
  getBoundingClientRect() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getBoundingClientRect
      }
    } = vm;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'getBoundingClientRect()');
    }
    return getBoundingClientRect(elm);
  },
  get isConnected() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        isConnected
      }
    } = vm;
    return isConnected(elm);
  },
  get classList() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getClassList
      }
    } = vm;
    if (process.env.NODE_ENV !== 'production') {
      // TODO [#1290]: this still fails in dev but works in production, eventually, we should
      // just throw in all modes
      assert.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
    }
    return getClassList(elm);
  },
  get template() {
    const vm = getAssociatedVM(this);
    if (process.env.NODE_ENV !== 'production') {
      if (vm.renderMode === 0 /* RenderMode.Light */) {
        logError('`this.template` returns null for light DOM components. Since there is no shadow, the rendered content can be accessed via `this` itself. e.g. instead of `this.template.querySelector`, use `this.querySelector`.');
      }
    }
    return vm.shadowRoot;
  },
  get refs() {
    const vm = getAssociatedVM(this);
    if (isUpdatingTemplate) {
      if (process.env.NODE_ENV !== 'production') {
        logError(`this.refs should not be called while ${getComponentTag(vm)} is rendering. Use this.refs only when the DOM is stable, e.g. in renderedCallback().`);
      }
      // If the template is in the process of being updated, then we don't want to go through the normal
      // process of returning the refs and caching them, because the state of the refs is unstable.
      // This can happen if e.g. a template contains `<div class={foo}></div>` and `foo` is computed
      // based on `this.refs.bar`.
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'refs');
    }
    const {
      refVNodes,
      cmpTemplate
    } = vm;
    // If the `cmpTemplate` is null, that means that the template has not been rendered yet. Most likely this occurs
    // if `this.refs` is called during the `connectedCallback` phase. The DOM elements have not been rendered yet,
    // so log a warning. Note we also check `isBeingConstructed()` to avoid a double warning (due to
    // `warnIfInvokedDuringConstruction` above).
    if (process.env.NODE_ENV !== 'production' && isNull(cmpTemplate) && !isBeingConstructed(vm)) {
      logError(`this.refs is undefined for ${getComponentTag(vm)}. This is either because the attached template has no "lwc:ref" directive, or this.refs was ` + `invoked before renderedCallback(). Use this.refs only when the referenced HTML elements have ` + `been rendered to the DOM, such as within renderedCallback() or disconnectedCallback().`);
    }
    // For backwards compatibility with component written before template refs
    // were introduced, we return undefined if the template has no refs defined
    // anywhere. This fixes components that may want to add an expando called `refs`
    // and are checking if it exists with `if (this.refs)`  before adding it.
    // Note we use a null refVNodes to indicate that the template has no refs defined.
    if (isNull(refVNodes)) {
      return;
    }
    // The refNodes can be cached based on the refVNodes, since the refVNodes
    // are recreated from scratch every time the template is rendered.
    // This happens with `vm.refVNodes = null` in `template.ts` in `@lwc/engine-core`.
    let refs = refsCache.get(refVNodes);
    if (isUndefined$1(refs)) {
      refs = create(null);
      for (const key of keys(refVNodes)) {
        refs[key] = refVNodes[key].elm;
      }
      freeze(refs);
      refsCache.set(refVNodes, refs);
    }
    return refs;
  },
  // For backwards compat, we allow component authors to set `refs` as an expando
  set refs(value) {
    defineProperty(this, 'refs', {
      configurable: true,
      enumerable: true,
      writable: true,
      value
    });
  },
  get shadowRoot() {
    // From within the component instance, the shadowRoot is always reported as "closed".
    // Authors should rely on this.template instead.
    return null;
  },
  get children() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'children');
    }
    return renderer.getChildren(vm.elm);
  },
  get childNodes() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'childNodes');
    }
    return renderer.getChildNodes(vm.elm);
  },
  get firstChild() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'firstChild');
    }
    return renderer.getFirstChild(vm.elm);
  },
  get firstElementChild() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'firstElementChild');
    }
    return renderer.getFirstElementChild(vm.elm);
  },
  get lastChild() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'lastChild');
    }
    return renderer.getLastChild(vm.elm);
  },
  get lastElementChild() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'lastElementChild');
    }
    return renderer.getLastElementChild(vm.elm);
  },
  get ownerDocument() {
    const vm = getAssociatedVM(this);
    const renderer = vm.renderer;
    if (process.env.NODE_ENV !== 'production') {
      warnIfInvokedDuringConstruction(vm, 'ownerDocument');
    }
    return renderer.ownerDocument(vm.elm);
  },
  render() {
    const vm = getAssociatedVM(this);
    return vm.def.template;
  },
  toString() {
    const vm = getAssociatedVM(this);
    return `[object ${vm.def.name}]`;
  }
};
const queryAndChildGetterDescriptors = create(null);
const queryMethods = ['getElementsByClassName', 'getElementsByTagName', 'querySelector', 'querySelectorAll'];
// Generic passthrough for query APIs on HTMLElement to the relevant Renderer APIs
for (const queryMethod of queryMethods) {
  queryAndChildGetterDescriptors[queryMethod] = {
    value(arg) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer
      } = vm;
      if (process.env.NODE_ENV !== 'production') {
        warnIfInvokedDuringConstruction(vm, `${queryMethod}()`);
      }
      return renderer[queryMethod](elm, arg);
    },
    configurable: true,
    enumerable: true,
    writable: true
  };
}
defineProperties(LightningElement.prototype, queryAndChildGetterDescriptors);
const lightningBasedDescriptors = create(null);
for (const propName in HTMLElementOriginalDescriptors) {
  lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
}
defineProperties(LightningElement.prototype, lightningBasedDescriptors);
function applyAriaReflectionToLightningElement() {
  // If ARIA reflection is not applied globally to Element.prototype, or if we are running server-side,
  // apply it to LightningElement.prototype.
  // This allows `this.aria*` property accessors to work from inside a component, and to reflect `aria-*` attrs.
  applyAriaReflection(LightningElement.prototype);
}
if (lwcRuntimeFlags.DISABLE_ARIA_REFLECTION_POLYFILL) {
  applyAriaReflectionToLightningElement();
}
defineProperty(LightningElement, 'CustomElementConstructor', {
  get() {
    // If required, a runtime-specific implementation must be defined.
    throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
  },
  configurable: true
});
if (process.env.NODE_ENV !== 'production') {
  patchLightningElementPrototypeWithRestrictions(LightningElement.prototype);
}
function createObservedFieldPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      updateComponentValue(vm, key, newValue);
    },
    enumerable: true,
    configurable: true
  };
}

/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const AdapterToTokenMap = new Map();
function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
  const {
    adapter
  } = wireDef;
  const adapterContextToken = AdapterToTokenMap.get(adapter);
  if (isUndefined$1(adapterContextToken)) {
    return; // no provider found, nothing to be done
  }

  const {
    elm,
    context: {
      wiredConnecting,
      wiredDisconnecting
    },
    renderer: {
      registerContextConsumer
    }
  } = vm;
  // waiting for the component to be connected to formally request the context via the token
  ArrayPush$1.call(wiredConnecting, () => {
    // This will attempt to connect the current element with one of its anscestors
    // that can provide context for the given wire adapter. This relationship is
    // keyed on the secret & internal value of `adapterContextToken`, which is unique
    // to a given wire adapter.
    //
    // Depending on the runtime environment, this connection is made using either DOM
    // events (in the browser) or a custom traversal (on the server).
    registerContextConsumer(elm, adapterContextToken, {
      setNewContext(newContext) {
        // eslint-disable-next-line @lwc/lwc-internal/no-invalid-todo
        // TODO: dev-mode validation of config based on the adapter.contextSchema
        callbackWhenContextIsReady(newContext);
      },
      setDisconnectedCallback(disconnectCallback) {
        // adds this callback into the disconnect bucket so it gets disconnected from parent
        // the the element hosting the wire is disconnected
        ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
      }
    });
  });
}

/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
const WIRE_DEBUG_ENTRY = '@wire';
const WireMetaMap = new Map();
function createFieldDataCallback(vm, name) {
  return value => {
    updateComponentValue(vm, name, value);
  };
}
function createMethodDataCallback(vm, method) {
  return value => {
    // dispatching new value into the wired method
    runWithBoundaryProtection(vm, vm.owner, noop, () => {
      // job
      method.call(vm.component, value);
    }, noop);
  };
}
function createConfigWatcher(component, configCallback, callbackWhenConfigIsReady) {
  let hasPendingConfig = false;
  // creating the reactive observer for reactive params when needed
  const ro = createReactiveObserver(() => {
    if (hasPendingConfig === false) {
      hasPendingConfig = true;
      // collect new config in the micro-task
      Promise.resolve().then(() => {
        hasPendingConfig = false;
        // resetting current reactive params
        ro.reset();
        // dispatching a new config due to a change in the configuration
        computeConfigAndUpdate();
      });
    }
  });
  const computeConfigAndUpdate = () => {
    let config;
    ro.observe(() => config = configCallback(component));
    // eslint-disable-next-line @lwc/lwc-internal/no-invalid-todo
    // TODO: dev-mode validation of config based on the adapter.configSchema
    // @ts-ignore it is assigned in the observe() callback
    callbackWhenConfigIsReady(config);
  };
  return {
    computeConfigAndUpdate,
    ro
  };
}
function createConnector(vm, name, wireDef) {
  const {
    method,
    adapter,
    configCallback,
    dynamic
  } = wireDef;
  let debugInfo;
  if (process.env.NODE_ENV !== 'production') {
    const wiredPropOrMethod = isUndefined$1(method) ? name : method.name;
    debugInfo = create(null);
    debugInfo.wasDataProvisionedForConfig = false;
    vm.debugInfo[WIRE_DEBUG_ENTRY][wiredPropOrMethod] = debugInfo;
  }
  const fieldOrMethodCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
  const dataCallback = value => {
    if (process.env.NODE_ENV !== 'production') {
      debugInfo.data = value;
      // Note: most of the time, the data provided is for the current config, but there may be
      // some conditions in which it does not, ex:
      // race conditions in a poor network while the adapter does not cancel a previous request.
      debugInfo.wasDataProvisionedForConfig = true;
    }
    fieldOrMethodCallback(value);
  };
  let context;
  let connector;
  // Workaround to pass the component element associated to this wire adapter instance.
  defineProperty(dataCallback, DeprecatedWiredElementHost, {
    value: vm.elm
  });
  defineProperty(dataCallback, DeprecatedWiredParamsMeta, {
    value: dynamic
  });
  runWithBoundaryProtection(vm, vm, noop, () => {
    // job
    connector = new adapter(dataCallback);
  }, noop);
  const updateConnectorConfig = config => {
    // every time the config is recomputed due to tracking,
    // this callback will be invoked with the new computed config
    runWithBoundaryProtection(vm, vm, noop, () => {
      // job
      if (process.env.NODE_ENV !== 'production') {
        debugInfo.config = config;
        debugInfo.context = context;
        debugInfo.wasDataProvisionedForConfig = false;
      }
      connector.update(config, context);
    }, noop);
  };
  // Computes the current wire config and calls the update method on the wire adapter.
  // If it has params, we will need to observe changes in the next tick.
  const {
    computeConfigAndUpdate,
    ro
  } = createConfigWatcher(vm.component, configCallback, updateConnectorConfig);
  // if the adapter needs contextualization, we need to watch for new context and push it alongside the config
  if (!isUndefined$1(adapter.contextSchema)) {
    createContextWatcher(vm, wireDef, newContext => {
      // every time the context is pushed into this component,
      // this callback will be invoked with the new computed context
      if (context !== newContext) {
        context = newContext;
        // Note: when new context arrives, the config will be recomputed and pushed along side the new
        // context, this is to preserve the identity characteristics, config should not have identity
        // (ever), while context can have identity
        if (vm.state === 1 /* VMState.connected */) {
          computeConfigAndUpdate();
        }
      }
    });
  }
  return {
    // @ts-ignore the boundary protection executes sync, connector is always defined
    connector,
    computeConfigAndUpdate,
    resetConfigWatcher: () => ro.reset()
  };
}
function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }
  const method = descriptor.value;
  const def = {
    adapter,
    method,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}
function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }
  const def = {
    adapter,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}
function installWireAdapters(vm) {
  const {
    context,
    def: {
      wire
    }
  } = vm;
  if (process.env.NODE_ENV !== 'production') {
    vm.debugInfo[WIRE_DEBUG_ENTRY] = create(null);
  }
  const wiredConnecting = context.wiredConnecting = [];
  const wiredDisconnecting = context.wiredDisconnecting = [];
  for (const fieldNameOrMethod in wire) {
    const descriptor = wire[fieldNameOrMethod];
    const wireDef = WireMetaMap.get(descriptor);
    if (process.env.NODE_ENV !== 'production') {
      assert.invariant(wireDef, `Internal Error: invalid wire definition found.`);
    }
    if (!isUndefined$1(wireDef)) {
      const {
        connector,
        computeConfigAndUpdate,
        resetConfigWatcher
      } = createConnector(vm, fieldNameOrMethod, wireDef);
      const hasDynamicParams = wireDef.dynamic.length > 0;
      ArrayPush$1.call(wiredConnecting, () => {
        connector.connect();
        if (!lwcRuntimeFlags.ENABLE_WIRE_SYNC_EMIT) {
          if (hasDynamicParams) {
            Promise.resolve().then(computeConfigAndUpdate);
            return;
          }
        }
        computeConfigAndUpdate();
      });
      ArrayPush$1.call(wiredDisconnecting, () => {
        connector.disconnect();
        resetConfigWatcher();
      });
    }
  }
}
function connectWireAdapters(vm) {
  const {
    wiredConnecting
  } = vm.context;
  for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
    wiredConnecting[i]();
  }
}
function disconnectWireAdapters(vm) {
  const {
    wiredDisconnecting
  } = vm.context;
  runWithBoundaryProtection(vm, vm, noop, () => {
    // job
    for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
      wiredDisconnecting[i]();
    }
  }, noop);
}
function createPublicPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      if (isBeingConstructed(vm)) {
        if (process.env.NODE_ENV !== 'production') {
          logError(`Can’t read the value of property \`${toString$1(key)}\` from the constructor because the owner component hasn’t set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }
        return;
      }
      componentValueObserved(vm, key);
      return vm.cmpProps[key];
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }
      vm.cmpProps[key] = newValue;
      componentValueMutated(vm, key);
    },
    enumerable: true,
    configurable: true
  };
}
function createPublicAccessorDescriptor(key, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;
  if (!isFunction$1(get)) {
    if (process.env.NODE_ENV !== 'production') {
      assert.invariant(isFunction$1(get), `Invalid compiler output for public accessor ${toString$1(key)} decorated with @api`);
    }
    throw new Error();
  }
  return {
    get() {
      if (process.env.NODE_ENV !== 'production') {
        // Assert that the this value is an actual Component with an associated VM.
        getAssociatedVM(this);
      }
      return get.call(this);
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }
      if (set) {
        set.call(this, newValue);
      } else if (process.env.NODE_ENV !== 'production') {
        assert.fail(`Invalid attempt to set a new value for property ${toString$1(key)} of ${vm} that does not has a setter decorated with @api.`);
      }
    },
    enumerable,
    configurable
  };
}
function internalTrackDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      if (process.env.NODE_ENV !== 'production') {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }
      const reactiveOrAnyValue = getReactiveProxy(newValue);
      updateComponentValue(vm, key, reactiveOrAnyValue);
    },
    enumerable: true,
    configurable: true
  };
}
function internalWireFieldDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },
    set(value) {
      const vm = getAssociatedVM(this);
      /**
       * Reactivity for wired fields is provided in wiring.
       * We intentionally add reactivity here since this is just
       * letting the author to do the wrong thing, but it will keep our
       * system to be backward compatible.
       */
      updateComponentValue(vm, key, value);
    },
    enumerable: true,
    configurable: true
  };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getClassDescriptorType(descriptor) {
  if (isFunction$1(descriptor.value)) {
    return "method" /* DescriptorType.Method */;
  } else if (isFunction$1(descriptor.set) || isFunction$1(descriptor.get)) {
    return "accessor" /* DescriptorType.Accessor */;
  } else {
    return "field" /* DescriptorType.Field */;
  }
}

function validateObservedField(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    const message = `Invalid observed ${fieldName} field. Found a duplicate ${type} with the same name.`;
    // [W-9927596] Ideally we always throw an error when detecting duplicate observed field.
    // This branch is only here for backward compatibility reasons.
    if (type === "accessor" /* DescriptorType.Accessor */) {
      logError(message);
    } else {
      assert.fail(message);
    }
  }
}
function validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    assert.fail(`Invalid @track ${fieldName} field. Found a duplicate ${type} with the same name.`);
  }
}
function validateFieldDecoratedWithWire(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    assert.fail(`Invalid @wire ${fieldName} field. Found a duplicate ${type} with the same name.`);
  }
}
function validateMethodDecoratedWithWire(Ctor, methodName, descriptor) {
  if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
    assert.fail(`Invalid @wire ${methodName} method.`);
  }
}
function validateFieldDecoratedWithApi(Ctor, fieldName, descriptor) {
  if (!isUndefined$1(descriptor)) {
    const type = getClassDescriptorType(descriptor);
    const message = `Invalid @api ${fieldName} field. Found a duplicate ${type} with the same name.`;
    // [W-9927596] Ideally we always throw an error when detecting duplicate public properties.
    // This branch is only here for backward compatibility reasons.
    if (type === "accessor" /* DescriptorType.Accessor */) {
      logError(message);
    } else {
      assert.fail(message);
    }
  }
}
function validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor) {
  if (isUndefined$1(descriptor)) {
    assert.fail(`Invalid @api get ${fieldName} accessor.`);
  } else if (isFunction$1(descriptor.set)) {
    assert.isTrue(isFunction$1(descriptor.get), `Missing getter for property ${fieldName} decorated with @api in ${Ctor}. You cannot have a setter without the corresponding getter.`);
  } else if (!isFunction$1(descriptor.get)) {
    assert.fail(`Missing @api get ${fieldName} accessor.`);
  }
}
function validateMethodDecoratedWithApi(Ctor, methodName, descriptor) {
  if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse(descriptor.writable)) {
    assert.fail(`Invalid @api ${methodName} method.`);
  }
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by user-land code.
 */
function registerDecorators(Ctor, meta) {
  const proto = Ctor.prototype;
  const {
    publicProps,
    publicMethods,
    wire,
    track,
    fields
  } = meta;
  const apiMethods = create(null);
  const apiFields = create(null);
  const wiredMethods = create(null);
  const wiredFields = create(null);
  const observedFields = create(null);
  const apiFieldsConfig = create(null);
  let descriptor;
  if (!isUndefined$1(publicProps)) {
    for (const fieldName in publicProps) {
      const propConfig = publicProps[fieldName];
      apiFieldsConfig[fieldName] = propConfig.config;
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
      if (propConfig.config > 0) {
        // accessor declaration
        if (process.env.NODE_ENV !== 'production') {
          validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor);
        }
        if (isUndefined$1(descriptor)) {
          throw new Error();
        }
        descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
      } else {
        // field declaration
        if (process.env.NODE_ENV !== 'production') {
          validateFieldDecoratedWithApi(Ctor, fieldName, descriptor);
        }
        // [W-9927596] If a component has both a public property and a private setter/getter
        // with the same name, the property is defined as a public accessor. This branch is
        // only here for backward compatibility reasons.
        if (!isUndefined$1(descriptor) && !isUndefined$1(descriptor.get)) {
          descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
        } else {
          descriptor = createPublicPropertyDescriptor(fieldName);
        }
      }
      apiFields[fieldName] = descriptor;
      defineProperty(proto, fieldName, descriptor);
    }
  }
  if (!isUndefined$1(publicMethods)) {
    forEach.call(publicMethods, methodName => {
      descriptor = getOwnPropertyDescriptor$1(proto, methodName);
      if (process.env.NODE_ENV !== 'production') {
        validateMethodDecoratedWithApi(Ctor, methodName, descriptor);
      }
      if (isUndefined$1(descriptor)) {
        throw new Error();
      }
      apiMethods[methodName] = descriptor;
    });
  }
  if (!isUndefined$1(wire)) {
    for (const fieldOrMethodName in wire) {
      const {
        adapter,
        method,
        config: configCallback,
        dynamic = []
      } = wire[fieldOrMethodName];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);
      if (method === 1) {
        if (process.env.NODE_ENV !== 'production') {
          assert.isTrue(adapter, `@wire on method "${fieldOrMethodName}": adapter id must be truthy.`);
          validateMethodDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }
        if (isUndefined$1(descriptor)) {
          throw new Error();
        }
        wiredMethods[fieldOrMethodName] = descriptor;
        storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          assert.isTrue(adapter, `@wire on field "${fieldOrMethodName}": adapter id must be truthy.`);
          validateFieldDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }
        descriptor = internalWireFieldDecorator(fieldOrMethodName);
        wiredFields[fieldOrMethodName] = descriptor;
        storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
        defineProperty(proto, fieldOrMethodName, descriptor);
      }
    }
  }
  if (!isUndefined$1(track)) {
    for (const fieldName in track) {
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
      if (process.env.NODE_ENV !== 'production') {
        validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor);
      }
      descriptor = internalTrackDecorator(fieldName);
      defineProperty(proto, fieldName, descriptor);
    }
  }
  if (!isUndefined$1(fields)) {
    for (let i = 0, n = fields.length; i < n; i++) {
      const fieldName = fields[i];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
      if (process.env.NODE_ENV !== 'production') {
        validateObservedField(Ctor, fieldName, descriptor);
      }
      // [W-9927596] Only mark a field as observed whenever it isn't a duplicated public nor
      // tracked property. This is only here for backward compatibility purposes.
      const isDuplicatePublicProp = !isUndefined$1(publicProps) && fieldName in publicProps;
      const isDuplicateTrackedProp = !isUndefined$1(track) && fieldName in track;
      if (!isDuplicatePublicProp && !isDuplicateTrackedProp) {
        observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
      }
    }
  }
  setDecoratorsMeta(Ctor, {
    apiMethods,
    apiFields,
    apiFieldsConfig,
    wiredMethods,
    wiredFields,
    observedFields
  });
  return Ctor;
}
const signedDecoratorToMetaMap = new Map();
function setDecoratorsMeta(Ctor, meta) {
  signedDecoratorToMetaMap.set(Ctor, meta);
}
const defaultMeta = {
  apiMethods: EmptyObject,
  apiFields: EmptyObject,
  apiFieldsConfig: EmptyObject,
  wiredMethods: EmptyObject,
  wiredFields: EmptyObject,
  observedFields: EmptyObject
};
function getDecoratorsMeta(Ctor) {
  const meta = signedDecoratorToMetaMap.get(Ctor);
  return isUndefined$1(meta) ? defaultMeta : meta;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let warned = false;
// Only used in LWC's Karma tests
if (process.env.NODE_ENV === 'test-karma-lwc') {
  // @ts-ignore
  window.__lwcResetWarnedOnVersionMismatch = () => {
    warned = false;
  };
}
function checkVersionMismatch(func, type) {
  const versionMatcher = func.toString().match(LWC_VERSION_COMMENT_REGEX);
  if (!isNull(versionMatcher) && !warned) {
    const version = versionMatcher[1];
    const [major, minor] = version.split('.');
    const [expectedMajor, expectedMinor] = LWC_VERSION.split('.');
    if (major !== expectedMajor || minor !== expectedMinor) {
      warned = true; // only warn once to avoid flooding the console
      // stylesheets and templates do not have user-meaningful names, but components do
      const friendlyName = type === 'component' ? `${type} ${func.name}` : type;
      logError(`LWC WARNING: current engine is v${LWC_VERSION}, but ${friendlyName} was compiled with v${version}.\nPlease update your compiled code or LWC engine so that the versions match.\nNo further warnings will appear.`);
    }
  }
}
const signedTemplateSet = new Set();
function defaultEmptyTemplate() {
  return [];
}
signedTemplateSet.add(defaultEmptyTemplate);
function isTemplateRegistered(tpl) {
  return signedTemplateSet.has(tpl);
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */
function registerTemplate(tpl) {
  if (process.env.NODE_ENV !== 'production') {
    checkVersionMismatch(tpl, 'template');
  }
  signedTemplateSet.add(tpl);
  // chaining this method as a way to wrap existing
  // assignment of templates easily, without too much transformation
  return tpl;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
 * libraries to sanitize vulnerable attributes.
 */
function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
  // locker-service patches this function during runtime to sanitize vulnerable attributes. When
  // ran off-core this function becomes a noop and returns the user authored value.
  return attrValue;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// A bridge descriptor is a descriptor whose job is just to get the component instance
// from the element instance, and get the value or set a new value on the component.
// This means that across different elements, similar names can get the exact same
// descriptor, so we can cache them:
const cachedGetterByKey = create(null);
const cachedSetterByKey = create(null);
function createGetter(key) {
  let fn = cachedGetterByKey[key];
  if (isUndefined$1(fn)) {
    fn = cachedGetterByKey[key] = function () {
      const vm = getAssociatedVM(this);
      const {
        getHook
      } = vm;
      return getHook(vm.component, key);
    };
  }
  return fn;
}
function createSetter(key) {
  let fn = cachedSetterByKey[key];
  if (isUndefined$1(fn)) {
    fn = cachedSetterByKey[key] = function (newValue) {
      const vm = getAssociatedVM(this);
      const {
        setHook
      } = vm;
      newValue = getReadOnlyProxy(newValue);
      setHook(vm.component, key, newValue);
    };
  }
  return fn;
}
function createMethodCaller(methodName) {
  return function () {
    const vm = getAssociatedVM(this);
    const {
      callHook,
      component
    } = vm;
    const fn = component[methodName];
    return callHook(vm.component, fn, ArraySlice.call(arguments));
  };
}
function createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback) {
  return function attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue === newValue) {
      // Ignore same values.
      return;
    }
    const propName = attributeToPropMap[attrName];
    if (isUndefined$1(propName)) {
      if (!isUndefined$1(superAttributeChangedCallback)) {
        // delegate unknown attributes to the super.
        // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch
        superAttributeChangedCallback.apply(this, arguments);
      }
      return;
    }
    if (!isAttributeLocked(this, attrName)) {
      // Ignore changes triggered by the engine itself during:
      // * diffing when public props are attempting to reflect to the DOM
      // * component via `this.setAttribute()`, should never update the prop
      // Both cases, the setAttribute call is always wrapped by the unlocking of the
      // attribute to be changed
      return;
    }
    // Reflect attribute change to the corresponding property when changed from outside.
    this[propName] = newValue;
  };
}
function HTMLBridgeElementFactory(SuperClass, props, methods) {
  let HTMLBridgeElement;
  /**
   * Modern browsers will have all Native Constructors as regular Classes
   * and must be instantiated with the new keyword. In older browsers,
   * specifically IE11, those are objects with a prototype property defined,
   * since they are not supposed to be extended or instantiated with the
   * new keyword. This forking logic supports both cases, specifically because
   * wc.ts relies on the construction path of the bridges to create new
   * fully qualifying web components.
   */
  if (isFunction$1(SuperClass)) {
    HTMLBridgeElement = class extends SuperClass {
      /*LWC compiler v2.40.1*/
    };
  } else {
    HTMLBridgeElement = function () {
      // Bridge classes are not supposed to be instantiated directly in
      // browsers that do not support web components.
      throw new TypeError('Illegal constructor');
    };
    // prototype inheritance dance
    setPrototypeOf(HTMLBridgeElement, SuperClass);
    setPrototypeOf(HTMLBridgeElement.prototype, SuperClass.prototype);
    defineProperty(HTMLBridgeElement.prototype, 'constructor', {
      writable: true,
      configurable: true,
      value: HTMLBridgeElement
    });
  }
  // generating the hash table for attributes to avoid duplicate fields and facilitate validation
  // and false positives in case of inheritance.
  const attributeToPropMap = create(null);
  const {
    attributeChangedCallback: superAttributeChangedCallback
  } = SuperClass.prototype;
  const {
    observedAttributes: superObservedAttributes = []
  } = SuperClass;
  const descriptors = create(null);
  // expose getters and setters for each public props on the new Element Bridge
  for (let i = 0, len = props.length; i < len; i += 1) {
    const propName = props[i];
    attributeToPropMap[htmlPropertyToAttribute(propName)] = propName;
    descriptors[propName] = {
      get: createGetter(propName),
      set: createSetter(propName),
      enumerable: true,
      configurable: true
    };
  }
  // expose public methods as props on the new Element Bridge
  for (let i = 0, len = methods.length; i < len; i += 1) {
    const methodName = methods[i];
    descriptors[methodName] = {
      value: createMethodCaller(methodName),
      writable: true,
      configurable: true
    };
  }
  // creating a new attributeChangedCallback per bridge because they are bound to the corresponding
  // map of attributes to props. We do this after all other props and methods to avoid the possibility
  // of getting overrule by a class declaration in user-land, and we make it non-writable, non-configurable
  // to preserve this definition.
  descriptors.attributeChangedCallback = {
    value: createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback)
  };
  // Specify attributes for which we want to reflect changes back to their corresponding
  // properties via attributeChangedCallback.
  defineProperty(HTMLBridgeElement, 'observedAttributes', {
    get() {
      return [...superObservedAttributes, ...keys(attributeToPropMap)];
    }
  });
  defineProperties(HTMLBridgeElement.prototype, descriptors);
  return HTMLBridgeElement;
}
const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, getOwnPropertyNames$1(HTMLElementOriginalDescriptors), []);
{
  // This ARIA reflection only really makes sense in the browser. On the server, there is no `renderedCallback()`,
  // so you cannot do e.g. `this.template.querySelector('x-child').ariaBusy = 'true'`. So we don't need to expose
  // ARIA props outside the LightningElement
  if (lwcRuntimeFlags.DISABLE_ARIA_REFLECTION_POLYFILL) {
    // If ARIA reflection is not applied globally to Element.prototype, apply it to HTMLBridgeElement.prototype.
    // This allows `elm.aria*` property accessors to work from outside a component, and to reflect `aria-*` attrs.
    // This is especially important because the template compiler compiles aria-* attrs on components to aria* props
    //
    // Also note that we apply this to BaseBridgeElement.prototype to avoid excessively redefining property
    // accessors inside the HTMLBridgeElementFactory.
    applyAriaReflection(BaseBridgeElement.prototype);
  }
}
freeze(BaseBridgeElement);
seal(BaseBridgeElement.prototype);

/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const supportsWeakRefs = typeof WeakRef === 'function' && typeof FinalizationRegistry === 'function';
// In browsers that doesn't support WeakRefs, the values will still leak, but at least the keys won't
class LegacyWeakMultiMap {
  constructor() {
    this._map = new WeakMap();
  }
  _getValues(key) {
    let values = this._map.get(key);
    if (isUndefined$1(values)) {
      values = new Set();
      this._map.set(key, values);
    }
    return values;
  }
  get(key) {
    return this._getValues(key);
  }
  add(key, vm) {
    const set = this._getValues(key);
    set.add(vm);
  }
  delete(key) {
    this._map.delete(key);
  }
}
// This implementation relies on the WeakRef/FinalizationRegistry proposal.
// For some background, see: https://github.com/tc39/proposal-weakrefs
class ModernWeakMultiMap {
  constructor() {
    this._map = new WeakMap();
    this._registry = new FinalizationRegistry(weakRefs => {
      // This should be considered an optional cleanup method to remove GC'ed values from their respective arrays.
      // JS VMs are not obligated to call FinalizationRegistry callbacks.
      // Work backwards, removing stale VMs
      for (let i = weakRefs.length - 1; i >= 0; i--) {
        const vm = weakRefs[i].deref();
        if (isUndefined$1(vm)) {
          ArraySplice.call(weakRefs, i, 1); // remove
        }
      }
    });
  }

  _getWeakRefs(key) {
    let weakRefs = this._map.get(key);
    if (isUndefined$1(weakRefs)) {
      weakRefs = [];
      this._map.set(key, weakRefs);
    }
    return weakRefs;
  }
  get(key) {
    const weakRefs = this._getWeakRefs(key);
    const result = new Set();
    for (const weakRef of weakRefs) {
      const vm = weakRef.deref();
      if (!isUndefined$1(vm)) {
        result.add(vm);
      }
    }
    return result;
  }
  add(key, value) {
    const weakRefs = this._getWeakRefs(key);
    // We could check for duplicate values here, but it doesn't seem worth it.
    // We transform the output into a Set anyway
    ArrayPush$1.call(weakRefs, new WeakRef(value));
    // It's important here not to leak the second argument, which is the "held value." The FinalizationRegistry
    // effectively creates a strong reference between the first argument (the "target") and the held value. When
    // the target is GC'ed, the callback is called, and then the held value is GC'ed.
    // Putting the key here would mean the key is not GC'ed until the value is GC'ed, which defeats the purpose
    // of the WeakMap. Whereas putting the weakRefs array here is fine, because it doesn't have a strong reference
    // to anything. See also this example:
    // https://gist.github.com/nolanlawson/79a3d36e8e6cc25c5048bb17c1795aea
    this._registry.register(value, weakRefs);
  }
  delete(key) {
    this._map.delete(key);
  }
}
const WeakMultiMap = supportsWeakRefs ? ModernWeakMultiMap : LegacyWeakMultiMap;

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const swappedTemplateMap = new WeakMap();
const swappedComponentMap = new WeakMap();
const swappedStyleMap = new WeakMap();
// The important thing here is the weak values – VMs are transient (one per component instance) and should be GC'ed,
// so we don't want to create strong references to them.
// The weak keys are kind of useless, because Templates, LightningElementConstructors, and StylesheetFactories are
// never GC'ed. But maybe they will be someday, so we may as well use weak keys too.
const activeTemplates = new WeakMultiMap();
const activeComponents = new WeakMultiMap();
const activeStyles = new WeakMultiMap();
function getTemplateOrSwappedTemplate(tpl) {
  assertNotProd(); // this method should never leak to prod
  const visited = new Set();
  while (swappedTemplateMap.has(tpl) && !visited.has(tpl)) {
    visited.add(tpl);
    tpl = swappedTemplateMap.get(tpl);
  }
  return tpl;
}
function getComponentOrSwappedComponent(Ctor) {
  assertNotProd(); // this method should never leak to prod
  const visited = new Set();
  while (swappedComponentMap.has(Ctor) && !visited.has(Ctor)) {
    visited.add(Ctor);
    Ctor = swappedComponentMap.get(Ctor);
  }
  return Ctor;
}
function getStyleOrSwappedStyle(style) {
  assertNotProd(); // this method should never leak to prod
  const visited = new Set();
  while (swappedStyleMap.has(style) && !visited.has(style)) {
    visited.add(style);
    style = swappedStyleMap.get(style);
  }
  return style;
}
function setActiveVM(vm) {
  assertNotProd(); // this method should never leak to prod
  // tracking active component
  const Ctor = vm.def.ctor;
  // this will allow us to keep track of the hot components
  activeComponents.add(Ctor, vm);
  // tracking active template
  const tpl = vm.cmpTemplate;
  if (tpl) {
    // this will allow us to keep track of the templates that are
    // being used by a hot component
    activeTemplates.add(tpl, vm);
    // tracking active styles associated to template
    const stylesheets = tpl.stylesheets;
    if (!isUndefined$1(stylesheets)) {
      for (const stylesheet of flattenStylesheets(stylesheets)) {
        // this is necessary because we don't hold the list of styles
        // in the vm, we only hold the selected (already swapped template)
        // but the styles attached to the template might not be the actual
        // active ones, but the swapped versions of those.
        const swappedStylesheet = getStyleOrSwappedStyle(stylesheet);
        // this will allow us to keep track of the stylesheet that are
        // being used by a hot component
        activeStyles.add(swappedStylesheet, vm);
      }
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const CtorToDefMap = new WeakMap();
function getCtorProto(Ctor) {
  let proto = getPrototypeOf$1(Ctor);
  if (isNull(proto)) {
    throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
  }
  // covering the cases where the ref is circular in AMD
  if (isCircularModuleDependency(proto)) {
    const p = resolveCircularModuleDependency(proto);
    if (process.env.NODE_ENV !== 'production') {
      if (isNull(p)) {
        throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
      }
    }
    // escape hatch for Locker and other abstractions to provide their own base class instead
    // of our Base class without having to leak it to user-land. If the circular function returns
    // itself, that's the signal that we have hit the end of the proto chain, which must always
    // be base.
    proto = p === proto ? LightningElement : p;
  }
  return proto;
}
function createComponentDef(Ctor) {
  const {
    shadowSupportMode: ctorShadowSupportMode,
    renderMode: ctorRenderMode
  } = Ctor;
  if (process.env.NODE_ENV !== 'production') {
    const ctorName = Ctor.name;
    // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
    // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);
    assert.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
    if (!isUndefined$1(ctorShadowSupportMode)) {
      assert.invariant(ctorShadowSupportMode === "any" /* ShadowSupportMode.Any */ || ctorShadowSupportMode === "reset" /* ShadowSupportMode.Default */, `Invalid value for static property shadowSupportMode: '${ctorShadowSupportMode}'`);
    }
    if (!isUndefined$1(ctorRenderMode)) {
      assert.invariant(ctorRenderMode === 'light' || ctorRenderMode === 'shadow', `Invalid value for static property renderMode: '${ctorRenderMode}'. renderMode must be either 'light' or 'shadow'.`);
    }
  }
  const decoratorsMeta = getDecoratorsMeta(Ctor);
  const {
    apiFields,
    apiFieldsConfig,
    apiMethods,
    wiredFields,
    wiredMethods,
    observedFields
  } = decoratorsMeta;
  const proto = Ctor.prototype;
  let {
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  } = proto;
  const superProto = getCtorProto(Ctor);
  const superDef = superProto !== LightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
  const bridge = HTMLBridgeElementFactory(superDef.bridge, keys(apiFields), keys(apiMethods));
  const props = assign(create(null), superDef.props, apiFields);
  const propsConfig = assign(create(null), superDef.propsConfig, apiFieldsConfig);
  const methods = assign(create(null), superDef.methods, apiMethods);
  const wire = assign(create(null), superDef.wire, wiredFields, wiredMethods);
  connectedCallback = connectedCallback || superDef.connectedCallback;
  disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
  renderedCallback = renderedCallback || superDef.renderedCallback;
  errorCallback = errorCallback || superDef.errorCallback;
  render = render || superDef.render;
  let shadowSupportMode = superDef.shadowSupportMode;
  if (!isUndefined$1(ctorShadowSupportMode)) {
    shadowSupportMode = ctorShadowSupportMode;
  }
  let renderMode = superDef.renderMode;
  if (!isUndefined$1(ctorRenderMode)) {
    renderMode = ctorRenderMode === 'light' ? 0 /* RenderMode.Light */ : 1 /* RenderMode.Shadow */;
  }

  const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
  const name = Ctor.name || superDef.name;
  // installing observed fields into the prototype.
  defineProperties(proto, observedFields);
  const def = {
    ctor: Ctor,
    name,
    wire,
    props,
    propsConfig,
    methods,
    bridge,
    template,
    renderMode,
    shadowSupportMode,
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  };
  if (process.env.NODE_ENV !== 'production') {
    freeze(Ctor.prototype);
  }
  return def;
}
/**
 * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
 * subject to change or being removed.
 */
function isComponentConstructor(ctor) {
  if (!isFunction$1(ctor)) {
    return false;
  }
  // Fast path: LightningElement is part of the prototype chain of the constructor.
  if (ctor.prototype instanceof LightningElement) {
    return true;
  }
  // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
  // climb up the constructor prototype chain to check in case there are circular dependencies
  // to resolve.
  let current = ctor;
  do {
    if (isCircularModuleDependency(current)) {
      const circularResolved = resolveCircularModuleDependency(current);
      // If the circular function returns itself, that's the signal that we have hit the end
      // of the proto chain, which must always be a valid base constructor.
      if (circularResolved === current) {
        return true;
      }
      current = circularResolved;
    }
    if (current === LightningElement) {
      return true;
    }
  } while (!isNull(current) && (current = getPrototypeOf$1(current)));
  // Finally return false if the LightningElement is not part of the prototype chain.
  return false;
}
function getComponentInternalDef(Ctor) {
  if (process.env.NODE_ENV !== 'production') {
    Ctor = getComponentOrSwappedComponent(Ctor);
  }
  let def = CtorToDefMap.get(Ctor);
  if (isUndefined$1(def)) {
    if (isCircularModuleDependency(Ctor)) {
      const resolvedCtor = resolveCircularModuleDependency(Ctor);
      def = getComponentInternalDef(resolvedCtor);
      // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
      // look up the definition in cache instead of re-resolving and recreating the def.
      CtorToDefMap.set(Ctor, def);
      return def;
    }
    if (!isComponentConstructor(Ctor)) {
      throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
    }
    def = createComponentDef(Ctor);
    CtorToDefMap.set(Ctor, def);
  }
  return def;
}
function getComponentHtmlPrototype(Ctor) {
  const def = getComponentInternalDef(Ctor);
  return def.bridge;
}
const lightingElementDef = {
  ctor: LightningElement,
  name: LightningElement.name,
  props: lightningBasedDescriptors,
  propsConfig: EmptyObject,
  methods: EmptyObject,
  renderMode: 1 /* RenderMode.Shadow */,
  shadowSupportMode: "reset" /* ShadowSupportMode.Default */,
  wire: EmptyObject,
  bridge: BaseBridgeElement,
  template: defaultEmptyTemplate,
  render: LightningElement.prototype.render
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function makeHostToken(token) {
  return `${token}-host`;
}
function createInlineStyleVNode(content) {
  return api.h('style', {
    key: 'style',
    attrs: {
      type: 'text/css'
    }
  }, [api.t(content)]);
}
function updateStylesheetToken(vm, template) {
  const {
    elm,
    context,
    renderMode,
    shadowMode,
    renderer: {
      getClassList,
      removeAttribute,
      setAttribute
    }
  } = vm;
  const {
    stylesheets: newStylesheets,
    stylesheetToken: newStylesheetToken
  } = template;
  const {
    stylesheets: newVmStylesheets
  } = vm;
  const isSyntheticShadow = renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */;
  const {
    hasScopedStyles
  } = context;
  let newToken;
  let newHasTokenInClass;
  let newHasTokenInAttribute;
  // Reset the styling token applied to the host element.
  const {
    stylesheetToken: oldToken,
    hasTokenInClass: oldHasTokenInClass,
    hasTokenInAttribute: oldHasTokenInAttribute
  } = context;
  if (!isUndefined$1(oldToken)) {
    if (oldHasTokenInClass) {
      getClassList(elm).remove(makeHostToken(oldToken));
    }
    if (oldHasTokenInAttribute) {
      removeAttribute(elm, makeHostToken(oldToken));
    }
  }
  // Apply the new template styling token to the host element, if the new template has any
  // associated stylesheets. In the case of light DOM, also ensure there is at least one scoped stylesheet.
  const hasNewStylesheets = hasStyles(newStylesheets);
  const hasNewVmStylesheets = hasStyles(newVmStylesheets);
  if (hasNewStylesheets || hasNewVmStylesheets) {
    newToken = newStylesheetToken;
  }
  // Set the new styling token on the host element
  if (!isUndefined$1(newToken)) {
    if (hasScopedStyles) {
      getClassList(elm).add(makeHostToken(newToken));
      newHasTokenInClass = true;
    }
    if (isSyntheticShadow) {
      setAttribute(elm, makeHostToken(newToken), '');
      newHasTokenInAttribute = true;
    }
  }
  // Update the styling tokens present on the context object.
  context.stylesheetToken = newToken;
  context.hasTokenInClass = newHasTokenInClass;
  context.hasTokenInAttribute = newHasTokenInAttribute;
}
function evaluateStylesheetsContent(stylesheets, stylesheetToken, vm) {
  const content = [];
  let root;
  for (let i = 0; i < stylesheets.length; i++) {
    let stylesheet = stylesheets[i];
    if (isArray$1(stylesheet)) {
      ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, stylesheetToken, vm));
    } else {
      if (process.env.NODE_ENV !== 'production') {
        // Check for compiler version mismatch in dev mode only
        checkVersionMismatch(stylesheet, 'stylesheet');
        // in dev-mode, we support hot swapping of stylesheet, which means that
        // the component instance might be attempting to use an old version of
        // the stylesheet, while internally, we have a replacement for it.
        stylesheet = getStyleOrSwappedStyle(stylesheet);
      }
      const isScopedCss = stylesheet[KEY__SCOPED_CSS];
      if (lwcRuntimeFlags.DISABLE_LIGHT_DOM_UNSCOPED_CSS && !isScopedCss && vm.renderMode === 0 /* RenderMode.Light */) {
        logError('Unscoped CSS is not supported in Light DOM. Please use scoped CSS (*.scoped.css) instead of unscoped CSS (*.css).');
        continue;
      }
      // Apply the scope token only if the stylesheet itself is scoped, or if we're rendering synthetic shadow.
      const scopeToken = isScopedCss || vm.shadowMode === 1 /* ShadowMode.Synthetic */ && vm.renderMode === 1 /* RenderMode.Shadow */ ? stylesheetToken : undefined;
      // Use the actual `:host` selector if we're rendering global CSS for light DOM, or if we're rendering
      // native shadow DOM. Synthetic shadow DOM never uses `:host`.
      const useActualHostSelector = vm.renderMode === 0 /* RenderMode.Light */ ? !isScopedCss : vm.shadowMode === 0 /* ShadowMode.Native */;
      // Use the native :dir() pseudoclass only in native shadow DOM. Otherwise, in synthetic shadow,
      // we use an attribute selector on the host to simulate :dir().
      let useNativeDirPseudoclass;
      if (vm.renderMode === 1 /* RenderMode.Shadow */) {
        useNativeDirPseudoclass = vm.shadowMode === 0 /* ShadowMode.Native */;
      } else {
        // Light DOM components should only render `[dir]` if they're inside of a synthetic shadow root.
        // At the top level (root is null) or inside of a native shadow root, they should use `:dir()`.
        if (isUndefined$1(root)) {
          // Only calculate the root once as necessary
          root = getNearestShadowComponent(vm);
        }
        useNativeDirPseudoclass = isNull(root) || root.shadowMode === 0 /* ShadowMode.Native */;
      }

      ArrayPush$1.call(content, stylesheet(scopeToken, useActualHostSelector, useNativeDirPseudoclass));
    }
  }
  return content;
}
function getStylesheetsContent(vm, template) {
  const {
    stylesheets,
    stylesheetToken
  } = template;
  const {
    stylesheets: vmStylesheets
  } = vm;
  let content = [];
  if (hasStyles(stylesheets)) {
    content = evaluateStylesheetsContent(stylesheets, stylesheetToken, vm);
  }
  // VM (component) stylesheets apply after template stylesheets
  if (hasStyles(vmStylesheets)) {
    ArrayPush$1.apply(content, evaluateStylesheetsContent(vmStylesheets, stylesheetToken, vm));
  }
  return content;
}
// It might be worth caching this to avoid doing the lookup repeatedly, but
// perf testing has not shown it to be a huge improvement yet:
// https://github.com/salesforce/lwc/pull/2460#discussion_r691208892
function getNearestShadowComponent(vm) {
  let owner = vm;
  while (!isNull(owner)) {
    if (owner.renderMode === 1 /* RenderMode.Shadow */) {
      return owner;
    }
    owner = owner.owner;
  }
  return owner;
}
/**
 * If the component that is currently being rendered uses scoped styles,
 * this returns the unique token for that scoped stylesheet. Otherwise
 * it returns null.
 */
function getScopeTokenClass(owner) {
  const {
    cmpTemplate,
    context
  } = owner;
  return context.hasScopedStyles && (cmpTemplate === null || cmpTemplate === void 0 ? void 0 : cmpTemplate.stylesheetToken) || null;
}
/**
 * This function returns the host style token for a custom element if it
 * exists. Otherwise it returns null.
 *
 * A host style token is applied to the component if scoped styles are used.
 */
function getStylesheetTokenHost(vnode) {
  const {
    template
  } = getComponentInternalDef(vnode.ctor);
  const {
    vm
  } = vnode;
  const {
    stylesheetToken
  } = template;
  return !isUndefined$1(stylesheetToken) && computeHasScopedStyles(template, vm) ? makeHostToken(stylesheetToken) : null;
}
function getNearestNativeShadowComponent(vm) {
  const owner = getNearestShadowComponent(vm);
  if (!isNull(owner) && owner.shadowMode === 1 /* ShadowMode.Synthetic */) {
    // Synthetic-within-native is impossible. So if the nearest shadow component is
    // synthetic, we know we won't find a native component if we go any further.
    return null;
  }
  return owner;
}
function createStylesheet(vm, stylesheets) {
  const {
    renderMode,
    shadowMode,
    renderer: {
      insertStylesheet
    }
  } = vm;
  if (renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */) {
    for (let i = 0; i < stylesheets.length; i++) {
      insertStylesheet(stylesheets[i]);
    }
  } else if (vm.hydrated) {
    // Note: We need to ensure that during hydration, the stylesheets method is the same as those in ssr.
    //       This works in the client, because the stylesheets are created, and cached in the VM
    //       the first time the VM renders.
    // native shadow or light DOM, SSR
    return ArrayMap.call(stylesheets, createInlineStyleVNode);
  } else {
    // native shadow or light DOM, DOM renderer
    const root = getNearestNativeShadowComponent(vm);
    // null root means a global style
    const target = isNull(root) ? undefined : root.shadowRoot;
    for (let i = 0; i < stylesheets.length; i++) {
      insertStylesheet(stylesheets[i], target);
    }
  }
  return null;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function isVBaseElement(vnode) {
  const {
    type
  } = vnode;
  return type === 2 /* VNodeType.Element */ || type === 3 /* VNodeType.CustomElement */;
}

function isSameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVCustomElement(vnode) {
  return vnode.type === 3 /* VNodeType.CustomElement */;
}

function isVFragment(vnode) {
  return vnode.type === 5 /* VNodeType.Fragment */;
}

function isVScopedSlotFragment(vnode) {
  return vnode.type === 6 /* VNodeType.ScopedSlotFragment */;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ColonCharCode$1 = 58;
function patchAttributes(oldVnode, vnode, renderer) {
  const {
    attrs
  } = vnode.data;
  if (isUndefined$1(attrs)) {
    return;
  }
  const oldAttrs = isNull(oldVnode) ? EmptyObject : oldVnode.data.attrs;
  if (oldAttrs === attrs) {
    return;
  }
  const {
    elm
  } = vnode;
  const {
    setAttribute,
    removeAttribute
  } = renderer;
  for (const key in attrs) {
    const cur = attrs[key];
    const old = oldAttrs[key];
    if (old !== cur) {
      unlockAttribute(elm, key);
      if (StringCharCodeAt.call(key, 3) === ColonCharCode$1) {
        // Assume xml namespace
        setAttribute(elm, key, cur, XML_NAMESPACE);
      } else if (StringCharCodeAt.call(key, 5) === ColonCharCode$1) {
        // Assume xlink namespace
        setAttribute(elm, key, cur, XLINK_NAMESPACE);
      } else if (isNull(cur) || isUndefined$1(cur)) {
        removeAttribute(elm, key);
      } else {
        setAttribute(elm, key, cur);
      }
      lockAttribute();
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ColonCharCode = 58;
function patchAttrUnlessProp(oldVnode, vnode, renderer) {
  const {
    data: {
      attrs
    },
    elm
  } = vnode;
  if (isUndefined$1(attrs)) {
    return;
  }
  const {
    removeAttribute,
    setAttribute,
    setProperty
  } = renderer;
  const oldAttrs = isNull(oldVnode) ? EmptyObject : oldVnode.data.attrs;
  for (const name in attrs) {
    const cur = attrs[name];
    const old = oldAttrs[name];
    if (old !== cur) {
      const propName = htmlAttributeToProperty(name);
      if (propName in elm) {
        setProperty(elm, name, cur);
      } else if (StringCharCodeAt.call(name, 3) === ColonCharCode) {
        // Assume xml namespace
        setAttribute(elm, name, cur, XML_NAMESPACE);
      } else if (StringCharCodeAt.call(name, 5) === ColonCharCode) {
        // Assume xlink namespace
        setAttribute(elm, name, cur, XLINK_NAMESPACE);
      } else if (isNull(cur) || isUndefined$1(cur)) {
        removeAttribute(elm, name);
      } else {
        setAttribute(elm, name, cur);
      }
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function isLiveBindingProp(sel, key) {
  // For properties with live bindings, we read values from the DOM element
  // instead of relying on internally tracked values.
  return sel === 'input' && (key === 'value' || key === 'checked');
}
function patchProps(oldVnode, vnode, renderer) {
  let {
    props
  } = vnode.data;
  const {
    spread
  } = vnode.data;
  if (isUndefined$1(props) && isUndefined$1(spread)) {
    return;
  }
  let oldProps;
  if (!isNull(oldVnode)) {
    oldProps = oldVnode.data.props;
    const oldSpread = oldVnode.data.spread;
    if (oldProps === props && oldSpread === spread) {
      return;
    }
    if (isUndefined$1(oldProps)) {
      oldProps = EmptyObject;
    }
    if (!isUndefined$1(oldSpread)) {
      oldProps = assign({}, oldProps, oldSpread);
    }
  }
  if (!isUndefined$1(spread)) {
    props = assign({}, props, spread);
  }
  const isFirstPatch = isNull(oldVnode);
  const {
    elm,
    sel
  } = vnode;
  const {
    getProperty,
    setProperty
  } = renderer;
  for (const key in props) {
    const cur = props[key];
    // Set the property if it's the first time is is patched or if the previous property is
    // different than the one previously set.
    if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? getProperty(elm, key) : oldProps[key]) || !(key in oldProps) // this is required because the above case will pass when `cur` is `undefined` and key is missing in `oldProps`
    ) {
      // Additional verification if properties are supported by the element
      // Validation relies on html properties and public properties being defined on the element,
      // SSR has its own custom validation.
      if (process.env.NODE_ENV !== 'production') {
        if (!(key in elm)) {
          logWarn(`Unknown public property "${key}" of element <${elm.tagName.toLowerCase()}>. This is either a typo on the corresponding attribute "${htmlPropertyToAttribute(key)}", or the attribute does not exist in this browser or DOM implementation.`);
        }
      }
      setProperty(elm, key, cur);
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const classNameToClassMap = create(null);
function getMapFromClassName(className) {
  // Intentionally using == to match undefined and null values from computed style attribute
  if (className == null) {
    return EmptyObject;
  }
  // computed class names must be string
  className = isString(className) ? className : className + '';
  let map = classNameToClassMap[className];
  if (map) {
    return map;
  }
  map = create(null);
  let start = 0;
  let o;
  const len = className.length;
  for (o = 0; o < len; o++) {
    if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
      if (o > start) {
        map[StringSlice.call(className, start, o)] = true;
      }
      start = o + 1;
    }
  }
  if (o > start) {
    map[StringSlice.call(className, start, o)] = true;
  }
  classNameToClassMap[className] = map;
  if (process.env.NODE_ENV !== 'production') {
    // just to make sure that this object never changes as part of the diffing algo
    freeze(map);
  }
  return map;
}
function patchClassAttribute(oldVnode, vnode, renderer) {
  const {
    elm,
    data: {
      className: newClass
    }
  } = vnode;
  const oldClass = isNull(oldVnode) ? undefined : oldVnode.data.className;
  if (oldClass === newClass) {
    return;
  }
  const {
    getClassList
  } = renderer;
  const classList = getClassList(elm);
  const newClassMap = getMapFromClassName(newClass);
  const oldClassMap = getMapFromClassName(oldClass);
  let name;
  for (name in oldClassMap) {
    // remove only if it is not in the new class collection and it is not set from within the instance
    if (isUndefined$1(newClassMap[name])) {
      classList.remove(name);
    }
  }
  for (name in newClassMap) {
    if (isUndefined$1(oldClassMap[name])) {
      classList.add(name);
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The style property is a string when defined via an expression in the template.
function patchStyleAttribute(oldVnode, vnode, renderer) {
  const {
    elm,
    data: {
      style: newStyle
    }
  } = vnode;
  const oldStyle = isNull(oldVnode) ? undefined : oldVnode.data.style;
  if (oldStyle === newStyle) {
    return;
  }
  const {
    setAttribute,
    removeAttribute
  } = renderer;
  if (!isString(newStyle) || newStyle === '') {
    removeAttribute(elm, 'style');
  } else {
    setAttribute(elm, 'style', newStyle);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function applyEventListeners(vnode, renderer) {
  const {
    elm,
    data: {
      on
    }
  } = vnode;
  if (isUndefined$1(on)) {
    return;
  }
  const {
    addEventListener
  } = renderer;
  for (const name in on) {
    const handler = on[name];
    addEventListener(elm, name, handler);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The HTML class property becomes the vnode.data.classMap object when defined as a string in the template.
// The compiler takes care of transforming the inline classnames into an object. It's faster to set the
// different classnames properties individually instead of via a string.
function applyStaticClassAttribute(vnode, renderer) {
  const {
    elm,
    data: {
      classMap
    }
  } = vnode;
  if (isUndefined$1(classMap)) {
    return;
  }
  const {
    getClassList
  } = renderer;
  const classList = getClassList(elm);
  for (const name in classMap) {
    classList.add(name);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The HTML style property becomes the vnode.data.styleDecls object when defined as a string in the template.
// The compiler takes care of transforming the inline style into an object. It's faster to set the
// different style properties individually instead of via a string.
function applyStaticStyleAttribute(vnode, renderer) {
  const {
    elm,
    data: {
      styleDecls
    }
  } = vnode;
  if (isUndefined$1(styleDecls)) {
    return;
  }
  const {
    setCSSStyleProperty
  } = renderer;
  for (let i = 0; i < styleDecls.length; i++) {
    const [prop, value, important] = styleDecls[i];
    setCSSStyleProperty(elm, prop, value, important);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function patchChildren(c1, c2, parent, renderer) {
  if (hasDynamicChildren(c2)) {
    updateDynamicChildren(c1, c2, parent, renderer);
  } else {
    updateStaticChildren(c1, c2, parent, renderer);
  }
}
function patch(n1, n2, parent, renderer) {
  var _a, _b;
  if (n1 === n2) {
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    if (!isSameVnode(n1, n2) &&
    // Currently the only scenario when patch does not receive the same vnodes are for
    // dynamic components. When a dynamic component's constructor changes, the value of its
    // tag name (sel) will be different. The engine will unmount the previous element
    // and mount the new one using the new constructor in patchCustomElement.
    !(isVCustomElement(n1) && isVCustomElement(n2))) {
      throw new Error('Expected these VNodes to be the same: ' + JSON.stringify({
        sel: n1.sel,
        key: n1.key
      }) + ', ' + JSON.stringify({
        sel: n2.sel,
        key: n2.key
      }));
    }
  }
  switch (n2.type) {
    case 0 /* VNodeType.Text */:
      // VText has no special capability, fallback to the owner's renderer
      patchText(n1, n2, renderer);
      break;
    case 1 /* VNodeType.Comment */:
      // VComment has no special capability, fallback to the owner's renderer
      patchComment(n1, n2, renderer);
      break;
    case 4 /* VNodeType.Static */:
      n2.elm = n1.elm;
      break;
    case 5 /* VNodeType.Fragment */:
      patchFragment(n1, n2, parent, renderer);
      break;
    case 2 /* VNodeType.Element */:
      patchElement(n1, n2, (_a = n2.data.renderer) !== null && _a !== void 0 ? _a : renderer);
      break;
    case 3 /* VNodeType.CustomElement */:
      patchCustomElement(n1, n2, parent, (_b = n2.data.renderer) !== null && _b !== void 0 ? _b : renderer);
      break;
  }
}
function mount(node, parent, renderer, anchor) {
  var _a, _b;
  switch (node.type) {
    case 0 /* VNodeType.Text */:
      // VText has no special capability, fallback to the owner's renderer
      mountText(node, parent, anchor, renderer);
      break;
    case 1 /* VNodeType.Comment */:
      // VComment has no special capability, fallback to the owner's renderer
      mountComment(node, parent, anchor, renderer);
      break;
    case 4 /* VNodeType.Static */:
      // VStatic cannot have a custom renderer associated to them, using owner's renderer
      mountStatic(node, parent, anchor, renderer);
      break;
    case 5 /* VNodeType.Fragment */:
      mountFragment(node, parent, anchor, renderer);
      break;
    case 2 /* VNodeType.Element */:
      // If the vnode data has a renderer override use it, else fallback to owner's renderer
      mountElement(node, parent, anchor, (_a = node.data.renderer) !== null && _a !== void 0 ? _a : renderer);
      break;
    case 3 /* VNodeType.CustomElement */:
      // If the vnode data has a renderer override use it, else fallback to owner's renderer
      mountCustomElement(node, parent, anchor, (_b = node.data.renderer) !== null && _b !== void 0 ? _b : renderer);
      break;
  }
}
function patchText(n1, n2, renderer) {
  n2.elm = n1.elm;
  if (n2.text !== n1.text) {
    updateTextContent(n2, renderer);
  }
}
function mountText(vnode, parent, anchor, renderer) {
  const {
    owner
  } = vnode;
  const {
    createText
  } = renderer;
  const textNode = vnode.elm = createText(vnode.text);
  linkNodeToShadow(textNode, owner, renderer);
  insertNode(textNode, parent, anchor, renderer);
}
function patchComment(n1, n2, renderer) {
  n2.elm = n1.elm;
  // FIXME: Comment nodes should be static, we shouldn't need to diff them together. However
  // it is the case today.
  if (n2.text !== n1.text) {
    updateTextContent(n2, renderer);
  }
}
function mountComment(vnode, parent, anchor, renderer) {
  const {
    owner
  } = vnode;
  const {
    createComment
  } = renderer;
  const commentNode = vnode.elm = createComment(vnode.text);
  linkNodeToShadow(commentNode, owner, renderer);
  insertNode(commentNode, parent, anchor, renderer);
}
function mountFragment(vnode, parent, anchor, renderer) {
  const {
    children
  } = vnode;
  mountVNodes(children, parent, renderer, anchor);
  // children of a fragment will always have at least the two delimiters.
  vnode.elm = children[children.length - 1].elm;
}
function patchFragment(n1, n2, parent, renderer) {
  const {
    children,
    stable
  } = n2;
  if (stable) {
    updateStaticChildren(n1.children, children, parent, renderer);
  } else {
    updateDynamicChildren(n1.children, children, parent, renderer);
  }
  // Note: not reusing n1.elm, because during patching, it may be patched with another text node.
  n2.elm = children[children.length - 1].elm;
}
function mountElement(vnode, parent, anchor, renderer) {
  const {
    sel,
    owner,
    data: {
      svg
    }
  } = vnode;
  const {
    createElement
  } = renderer;
  const namespace = isTrue(svg) ? SVG_NAMESPACE : undefined;
  const elm = vnode.elm = createElement(sel, namespace);
  linkNodeToShadow(elm, owner, renderer);
  applyStyleScoping(elm, owner, renderer);
  applyDomManual(elm, vnode);
  applyElementRestrictions(elm, vnode);
  patchElementPropsAndAttrs$1(null, vnode, renderer);
  insertNode(elm, parent, anchor, renderer);
  mountVNodes(vnode.children, elm, renderer, null);
}
function patchElement(n1, n2, renderer) {
  const elm = n2.elm = n1.elm;
  patchElementPropsAndAttrs$1(n1, n2, renderer);
  patchChildren(n1.children, n2.children, elm, renderer);
}
function mountStatic(vnode, parent, anchor, renderer) {
  const {
    owner
  } = vnode;
  const {
    cloneNode,
    isSyntheticShadowDefined
  } = renderer;
  const elm = vnode.elm = cloneNode(vnode.fragment, true);
  linkNodeToShadow(elm, owner, renderer);
  applyElementRestrictions(elm, vnode);
  // Marks this node as Static to propagate the shadow resolver. must happen after elm is assigned to the proper shadow
  const {
    renderMode,
    shadowMode
  } = owner;
  if (isSyntheticShadowDefined) {
    if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
      elm[KEY__SHADOW_STATIC] = true;
    }
  }
  insertNode(elm, parent, anchor, renderer);
}
function mountCustomElement(vnode, parent, anchor, renderer) {
  const {
    sel,
    owner
  } = vnode;
  const {
    createCustomElement
  } = renderer;
  /**
   * Note: if the upgradable constructor does not expect, or throw when we new it
   * with a callback as the first argument, we could implement a more advanced
   * mechanism that only passes that argument if the constructor is known to be
   * an upgradable custom element.
   */
  let vm;
  const upgradeCallback = elm => {
    // the custom element from the registry is expecting an upgrade callback
    vm = createViewModelHook(elm, vnode, renderer);
  };
  let connectedCallback;
  let disconnectedCallback;
  if (lwcRuntimeFlags.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE) {
    connectedCallback = elm => {
      connectRootElement(elm);
    };
    disconnectedCallback = elm => {
      disconnectRootElement(elm);
    };
  }
  // Should never get a tag with upper case letter at this point; the compiler
  // should produce only tags with lowercase letters. However, the Java
  // compiler may generate tagnames with uppercase letters so - for backwards
  // compatibility, we lower case the tagname here.
  const normalizedTagname = sel.toLowerCase();
  const elm = createCustomElement(normalizedTagname, upgradeCallback, connectedCallback, disconnectedCallback);
  vnode.elm = elm;
  vnode.vm = vm;
  linkNodeToShadow(elm, owner, renderer);
  applyStyleScoping(elm, owner, renderer);
  if (vm) {
    allocateChildren(vnode, vm);
  }
  patchElementPropsAndAttrs$1(null, vnode, renderer);
  insertNode(elm, parent, anchor, renderer);
  if (vm) {
    {
      if (!lwcRuntimeFlags.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE) {
        if (process.env.NODE_ENV !== 'production') {
          // With synthetic lifecycle callbacks, it's possible for elements to be removed without the engine
          // noticing it (e.g. `appendChild` the same host element twice). This test ensures we don't regress.
          assert.isTrue(vm.state === 0 /* VMState.created */, `${vm} cannot be recycled.`);
        }
        runConnectedCallback(vm);
      }
    }
  }
  mountVNodes(vnode.children, elm, renderer, null);
  if (vm) {
    appendVM(vm);
  }
}
function patchCustomElement(n1, n2, parent, renderer) {
  // TODO [#3331]: This if branch should be removed in 246 with lwc:dynamic
  if (n1.ctor !== n2.ctor) {
    // If the constructor differs, unmount the current component and mount a new one using the new
    // constructor.
    const anchor = renderer.nextSibling(n1.elm);
    unmount(n1, parent, renderer, true);
    mountCustomElement(n2, parent, anchor, renderer);
  } else {
    // Otherwise patch the existing component with new props/attrs/etc.
    const elm = n2.elm = n1.elm;
    const vm = n2.vm = n1.vm;
    patchElementPropsAndAttrs$1(n1, n2, renderer);
    if (!isUndefined$1(vm)) {
      // in fallback mode, the allocation will always set children to
      // empty and delegate the real allocation to the slot elements
      allocateChildren(n2, vm);
      // Solves an edge case with slotted VFragments in native shadow mode.
      //
      // During allocation, in native shadow, slotted VFragment nodes are flattened and their text delimiters are removed
      // to avoid interfering with native slot behavior. When this happens, if any of the fragments
      // were not stable, the children must go through the dynamic diffing algo.
      //
      // If the new children (n2.children) contain no VFragments, but the previous children (n1.children) were dynamic,
      // the new nodes must be marked dynamic so that all nodes are properly updated. The only indicator that the new
      // nodes need to be dynamic comes from the previous children, so we check that to determine whether we need to
      // mark the new children dynamic.
      //
      // Example:
      // n1.children: [div, VFragment('', div, null, ''), div] => [div, div, null, div]; // marked dynamic
      // n2.children: [div, null, div] => [div, null, div] // marked ???
      const {
        shadowMode,
        renderMode
      } = vm;
      if (shadowMode == 0 /* ShadowMode.Native */ && renderMode !== 0 /* RenderMode.Light */ && hasDynamicChildren(n1.children)) {
        // No-op if children has already been marked dynamic by 'allocateChildren()'.
        markAsDynamicChildren(n2.children);
      }
    }
    // in fallback mode, the children will be always empty, so, nothing
    // will happen, but in native, it does allocate the light dom
    patchChildren(n1.children, n2.children, elm, renderer);
    if (!isUndefined$1(vm)) {
      // this will probably update the shadowRoot, but only if the vm is in a dirty state
      // this is important to preserve the top to bottom synchronous rendering phase.
      rerenderVM(vm);
    }
  }
}
function mountVNodes(vnodes, parent, renderer, anchor, start = 0, end = vnodes.length) {
  for (; start < end; ++start) {
    const vnode = vnodes[start];
    if (isVNode(vnode)) {
      mount(vnode, parent, renderer, anchor);
    }
  }
}
function unmount(vnode, parent, renderer, doRemove = false) {
  const {
    type,
    elm,
    sel
  } = vnode;
  // When unmounting a VNode subtree not all the elements have to removed from the DOM. The
  // subtree root, is the only element worth unmounting from the subtree.
  if (doRemove) {
    if (type === 5 /* VNodeType.Fragment */) {
      unmountVNodes(vnode.children, parent, renderer, doRemove);
    } else {
      // The vnode might or might not have a data.renderer associated to it
      // but the removal used here is from the owner instead.
      removeNode(elm, parent, renderer);
    }
  }
  switch (type) {
    case 2 /* VNodeType.Element */:
      {
        // Slot content is removed to trigger slotchange event when removing slot.
        // Only required for synthetic shadow.
        const shouldRemoveChildren = sel === 'slot' && vnode.owner.shadowMode === 1 /* ShadowMode.Synthetic */;
        unmountVNodes(vnode.children, elm, renderer, shouldRemoveChildren);
        break;
      }
    case 3 /* VNodeType.CustomElement */:
      {
        const {
          vm
        } = vnode;
        // No need to unmount the children here, `removeVM` will take care of removing the
        // children.
        if (!isUndefined$1(vm)) {
          removeVM(vm);
        }
      }
  }
}
function unmountVNodes(vnodes, parent, renderer, doRemove = false, start = 0, end = vnodes.length) {
  for (; start < end; ++start) {
    const ch = vnodes[start];
    if (isVNode(ch)) {
      unmount(ch, parent, renderer, doRemove);
    }
  }
}
function isVNode(vnode) {
  return vnode != null;
}
function linkNodeToShadow(elm, owner, renderer) {
  const {
    renderRoot,
    renderMode,
    shadowMode
  } = owner;
  const {
    isSyntheticShadowDefined
  } = renderer;
  // TODO [#1164]: this should eventually be done by the polyfill directly
  if (isSyntheticShadowDefined) {
    if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
      elm[KEY__SHADOW_RESOLVER] = renderRoot[KEY__SHADOW_RESOLVER];
    }
  }
}
function updateTextContent(vnode, renderer) {
  const {
    elm,
    text
  } = vnode;
  const {
    setText
  } = renderer;
  if (process.env.NODE_ENV !== 'production') {
    unlockDomMutation();
  }
  setText(elm, text);
  if (process.env.NODE_ENV !== 'production') {
    lockDomMutation();
  }
}
function insertNode(node, parent, anchor, renderer) {
  if (process.env.NODE_ENV !== 'production') {
    unlockDomMutation();
  }
  renderer.insert(node, parent, anchor);
  if (process.env.NODE_ENV !== 'production') {
    lockDomMutation();
  }
}
function removeNode(node, parent, renderer) {
  if (process.env.NODE_ENV !== 'production') {
    unlockDomMutation();
  }
  renderer.remove(node, parent);
  if (process.env.NODE_ENV !== 'production') {
    lockDomMutation();
  }
}
function patchElementPropsAndAttrs$1(oldVnode, vnode, renderer) {
  if (isNull(oldVnode)) {
    applyEventListeners(vnode, renderer);
    applyStaticClassAttribute(vnode, renderer);
    applyStaticStyleAttribute(vnode, renderer);
  }
  // Attrs need to be applied to element before props IE11 will wipe out value on radio inputs if
  // value is set before type=radio.
  patchClassAttribute(oldVnode, vnode, renderer);
  patchStyleAttribute(oldVnode, vnode, renderer);
  if (vnode.data.external) {
    patchAttrUnlessProp(oldVnode, vnode, renderer);
  } else {
    patchAttributes(oldVnode, vnode, renderer);
  }
  patchProps(oldVnode, vnode, renderer);
}
function applyStyleScoping(elm, owner, renderer) {
  // Set the class name for `*.scoped.css` style scoping.
  const scopeToken = getScopeTokenClass(owner);
  if (!isNull(scopeToken)) {
    const {
      getClassList
    } = renderer;
    // TODO [#2762]: this dot notation with add is probably problematic
    // probably we should have a renderer api for just the add operation
    getClassList(elm).add(scopeToken);
  }
  // Set property element for synthetic shadow DOM style scoping.
  const {
    stylesheetToken: syntheticToken
  } = owner.context;
  if (owner.shadowMode === 1 /* ShadowMode.Synthetic */ && !isUndefined$1(syntheticToken)) {
    elm.$shadowToken$ = syntheticToken;
  }
}
function applyDomManual(elm, vnode) {
  var _a;
  const {
    owner,
    data: {
      context
    }
  } = vnode;
  if (owner.shadowMode === 1 /* ShadowMode.Synthetic */ && ((_a = context === null || context === void 0 ? void 0 : context.lwc) === null || _a === void 0 ? void 0 : _a.dom) === "manual" /* LwcDomMode.Manual */) {
    elm.$domManual$ = true;
  }
}
function applyElementRestrictions(elm, vnode) {
  var _a, _b;
  if (process.env.NODE_ENV !== 'production') {
    const isSynthetic = vnode.owner.shadowMode === 1 /* ShadowMode.Synthetic */;
    const isPortal = vnode.type === 2 /* VNodeType.Element */ && ((_b = (_a = vnode.data.context) === null || _a === void 0 ? void 0 : _a.lwc) === null || _b === void 0 ? void 0 : _b.dom) === "manual" /* LwcDomMode.Manual */;
    const isLight = vnode.owner.renderMode === 0 /* RenderMode.Light */;
    patchElementWithRestrictions(elm, {
      isPortal,
      isLight,
      isSynthetic
    });
  }
}
function allocateChildren(vnode, vm) {
  // A component with slots will re-render because:
  // 1- There is a change of the internal state.
  // 2- There is a change on the external api (ex: slots)
  //
  // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
  // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
  // in a reused VCustomElement, there won't be any slotted children.
  // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
  //
  // In case #2, we will always get a fresh VCustomElement.
  const children = vnode.aChildren || vnode.children;
  const {
    renderMode,
    shadowMode
  } = vm;
  if (process.env.NODE_ENV !== 'production') {
    // If any of the children being allocated is a scoped slot fragment, make sure the receiving
    // component is a light DOM component. This is mainly to validate light dom parent running
    // in native shadow mode.
    if (renderMode !== 0 /* RenderMode.Light */ && ArraySome.call(children, child => !isNull(child) && isVScopedSlotFragment(child))) {
      logError(`Invalid usage of 'lwc:slot-data' on ${getComponentTag(vm)} tag. Scoped slot content can only be passed to a light dom child.`);
    }
  }
  // If any of the children being allocated are VFragments, we remove the text delimiters and flatten all immediate
  // children VFragments to avoid them interfering with default slot behavior.
  const allocatedChildren = flattenFragmentsInChildren(children);
  vnode.children = allocatedChildren;
  vm.aChildren = allocatedChildren;
  if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
    // slow path
    allocateInSlot(vm, allocatedChildren, vnode.owner);
    // save the allocated children in case this vnode is reused.
    vnode.aChildren = allocatedChildren;
    // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!
    vnode.children = EmptyArray;
  }
}
/**
 * Flattens the contents of all VFragments in an array of VNodes, removes the text delimiters on those VFragments, and
 * marks the resulting children array as dynamic. Uses a stack (array) to iteratively traverse the nested VFragments
 * and avoid the perf overhead of creating/destroying throwaway arrays/objects in a recursive approach.
 *
 * With the delimiters removed, the contents are marked dynamic so they are diffed correctly.
 *
 * This function is used for slotted VFragments to avoid the text delimiters interfering with slotting functionality.
 */
function flattenFragmentsInChildren(children) {
  const flattenedChildren = [];
  // Initialize our stack with the direct children of the custom component and check whether we have a VFragment.
  // If no VFragment is found in children, we don't need to traverse anything or mark the children dynamic and can return early.
  const nodeStack = [];
  let fragmentFound = false;
  for (let i = children.length - 1; i > -1; i -= 1) {
    const child = children[i];
    ArrayPush$1.call(nodeStack, child);
    fragmentFound = fragmentFound || !!(child && isVFragment(child));
  }
  if (!fragmentFound) {
    return children;
  }
  let currentNode;
  while (!isUndefined$1(currentNode = ArrayPop.call(nodeStack))) {
    if (!isNull(currentNode) && isVFragment(currentNode)) {
      const fChildren = currentNode.children;
      // Ignore the start and end text node delimiters
      for (let i = fChildren.length - 2; i > 0; i -= 1) {
        ArrayPush$1.call(nodeStack, fChildren[i]);
      }
    } else {
      ArrayPush$1.call(flattenedChildren, currentNode);
    }
  }
  // We always mark the children as dynamic because nothing generates stable VFragments yet.
  // If/when stable VFragments are generated by the compiler, this code should be updated to
  // not mark dynamic if all flattened VFragments were stable.
  markAsDynamicChildren(flattenedChildren);
  return flattenedChildren;
}
function createViewModelHook(elm, vnode, renderer) {
  let vm = getAssociatedVMIfPresent(elm);
  // There is a possibility that a custom element is registered under tagName, in which case, the
  // initialization is already carry on, and there is nothing else to do here since this hook is
  // called right after invoking `document.createElement`.
  if (!isUndefined$1(vm)) {
    return vm;
  }
  const {
    sel,
    mode,
    ctor,
    owner
  } = vnode;
  vm = createVM(elm, ctor, renderer, {
    mode,
    owner,
    tagName: sel
  });
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
  }
  return vm;
}
function allocateInSlot(vm, children, owner) {
  var _a, _b;
  const {
    cmpSlots: {
      slotAssignments: oldSlotsMapping
    }
  } = vm;
  const cmpSlotsMapping = create(null);
  // Collect all slots into cmpSlotsMapping
  for (let i = 0, len = children.length; i < len; i += 1) {
    const vnode = children[i];
    if (isNull(vnode)) {
      continue;
    }
    let slotName = '';
    if (isVBaseElement(vnode)) {
      slotName = (_b = (_a = vnode.data.attrs) === null || _a === void 0 ? void 0 : _a.slot) !== null && _b !== void 0 ? _b : '';
    } else if (isVScopedSlotFragment(vnode)) {
      slotName = vnode.slotName;
    }
    // Can't use toString here because Symbol(1).toString() is 'Symbol(1)'
    // but elm.setAttribute('slot', Symbol(1)) is an error.
    // the following line also throws same error for symbols
    // Similar for Object.create(null)
    const normalizedSlotName = '' + slotName;
    const vnodes = cmpSlotsMapping[normalizedSlotName] = cmpSlotsMapping[normalizedSlotName] || [];
    ArrayPush$1.call(vnodes, vnode);
  }
  vm.cmpSlots = {
    owner,
    slotAssignments: cmpSlotsMapping
  };
  if (isFalse(vm.isDirty)) {
    // We need to determine if the old allocation is really different from the new one
    // and mark the vm as dirty
    const oldKeys = keys(oldSlotsMapping);
    if (oldKeys.length !== keys(cmpSlotsMapping).length) {
      markComponentAsDirty(vm);
      return;
    }
    for (let i = 0, len = oldKeys.length; i < len; i += 1) {
      const key = oldKeys[i];
      if (isUndefined$1(cmpSlotsMapping[key]) || oldSlotsMapping[key].length !== cmpSlotsMapping[key].length) {
        markComponentAsDirty(vm);
        return;
      }
      const oldVNodes = oldSlotsMapping[key];
      const vnodes = cmpSlotsMapping[key];
      for (let j = 0, a = cmpSlotsMapping[key].length; j < a; j += 1) {
        if (oldVNodes[j] !== vnodes[j]) {
          markComponentAsDirty(vm);
          return;
        }
      }
    }
  }
}
// Using a WeakMap instead of a WeakSet because this one works in IE11 :(
const DynamicChildren = new WeakMap();
// dynamic children means it was either generated by an iteration in a template
// or part of an unstable fragment, and will require a more complex diffing algo.
function markAsDynamicChildren(children) {
  DynamicChildren.set(children, 1);
}
function hasDynamicChildren(children) {
  return DynamicChildren.has(children);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  // TODO [#1637]: simplify this by assuming that all vnodes has keys
  for (let j = beginIdx; j <= endIdx; ++j) {
    const ch = children[j];
    if (isVNode(ch)) {
      const {
        key
      } = ch;
      if (key !== undefined) {
        map[key] = j;
      }
    }
  }
  return map;
}
function updateDynamicChildren(oldCh, newCh, parent, renderer) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  const newChEnd = newCh.length - 1;
  let newEndIdx = newChEnd;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  let before;
  let clonedOldCh = false;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!isVNode(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
    } else if (!isVNode(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (!isVNode(newStartVnode)) {
      newStartVnode = newCh[++newStartIdx];
    } else if (!isVNode(newEndVnode)) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode, parent, renderer);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode, parent, renderer);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patch(oldStartVnode, newEndVnode, parent, renderer);
      insertNode(oldStartVnode.elm, parent, renderer.nextSibling(oldEndVnode.elm), renderer);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patch(oldEndVnode, newStartVnode, parent, renderer);
      insertNode(newStartVnode.elm, parent, oldStartVnode.elm, renderer);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (isUndefined$1(idxInOld)) {
        // New element
        mount(newStartVnode, parent, renderer, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (isVNode(elmToMove)) {
          if (elmToMove.sel !== newStartVnode.sel) {
            // New element
            mount(newStartVnode, parent, renderer, oldStartVnode.elm);
          } else {
            patch(elmToMove, newStartVnode, parent, renderer);
            // Delete the old child, but copy the array since it is read-only.
            // The `oldCh` will be GC'ed after `updateDynamicChildren` is complete,
            // so we only care about the `oldCh` object inside this function.
            // To avoid cloning over and over again, we check `clonedOldCh`
            // and only clone once.
            if (!clonedOldCh) {
              clonedOldCh = true;
              oldCh = [...oldCh];
            }
            // We've already cloned at least once, so it's no longer read-only
            oldCh[idxInOld] = undefined;
            insertNode(elmToMove.elm, parent, oldStartVnode.elm, renderer);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
  }
  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      // There's some cases in which the sub array of vnodes to be inserted is followed by null(s) and an
      // already processed vnode, in such cases the vnodes to be inserted should be before that processed vnode.
      let i = newEndIdx;
      let n;
      do {
        n = newCh[++i];
      } while (!isVNode(n) && i < newChEnd);
      before = isVNode(n) ? n.elm : null;
      mountVNodes(newCh, parent, renderer, before, newStartIdx, newEndIdx + 1);
    } else {
      unmountVNodes(oldCh, parent, renderer, true, oldStartIdx, oldEndIdx + 1);
    }
  }
}
function updateStaticChildren(c1, c2, parent, renderer) {
  const c1Length = c1.length;
  const c2Length = c2.length;
  if (c1Length === 0) {
    // the old list is empty, we can directly insert anything new
    mountVNodes(c2, parent, renderer, null);
    return;
  }
  if (c2Length === 0) {
    // the old list is nonempty and the new list is empty so we can directly remove all old nodes
    // this is the case in which the dynamic children of an if-directive should be removed
    unmountVNodes(c1, parent, renderer, true);
    return;
  }
  // if the old list is not empty, the new list MUST have the same
  // amount of nodes, that's why we call this static children
  let anchor = null;
  for (let i = c2Length - 1; i >= 0; i -= 1) {
    const n1 = c1[i];
    const n2 = c2[i];
    if (n2 !== n1) {
      if (isVNode(n1)) {
        if (isVNode(n2)) {
          if (isSameVnode(n1, n2)) {
            // both vnodes are equivalent, and we just need to patch them
            patch(n1, n2, parent, renderer);
            anchor = n2.elm;
          } else {
            // removing the old vnode since the new one is different
            unmount(n1, parent, renderer, true);
            mount(n2, parent, renderer, anchor);
            anchor = n2.elm;
          }
        } else {
          // removing the old vnode since the new one is null
          unmount(n1, parent, renderer, true);
        }
      } else if (isVNode(n2)) {
        mount(n2, parent, renderer, anchor);
        anchor = n2.elm;
      }
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const SymbolIterator = Symbol.iterator;
function addVNodeToChildLWC(vnode) {
  ArrayPush$1.call(getVMBeingRendered().velements, vnode);
}
// [s]coped [s]lot [f]actory
function ssf(slotName, factory) {
  return {
    type: 6 /* VNodeType.ScopedSlotFragment */,
    factory,
    owner: getVMBeingRendered(),
    elm: undefined,
    sel: undefined,
    key: undefined,
    slotName
  };
}
// [st]atic node
function st(fragment, key) {
  return {
    type: 4 /* VNodeType.Static */,
    sel: undefined,
    key,
    elm: undefined,
    fragment,
    owner: getVMBeingRendered()
  };
}
// [fr]agment node
function fr(key, children, stable) {
  return {
    type: 5 /* VNodeType.Fragment */,
    sel: undefined,
    key,
    elm: undefined,
    children: [t(''), ...children, t('')],
    stable,
    owner: getVMBeingRendered()
  };
}
// [h]tml node
function h(sel, data, children = EmptyArray) {
  const vmBeingRendered = getVMBeingRendered();
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
    assert.isTrue(isObject(data), `h() 2nd argument data must be an object.`);
    assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
    assert.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`);
    // checking reserved internal data properties
    assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);
    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }
    forEach.call(children, childVnode => {
      if (childVnode != null) {
        assert.isTrue('type' in childVnode && 'sel' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
      }
    });
  }
  const {
    key,
    ref
  } = data;
  const vnode = {
    type: 2 /* VNodeType.Element */,
    sel,
    data,
    children,
    elm: undefined,
    key,
    owner: vmBeingRendered
  };
  if (!isUndefined$1(ref)) {
    setRefVNode(vmBeingRendered, ref, vnode);
  }
  return vnode;
}
// [t]ab[i]ndex function
function ti(value) {
  // if value is greater than 0, we normalize to 0
  // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
  // If value is less than -1, we don't care
  const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));
  if (process.env.NODE_ENV !== 'production') {
    const vmBeingRendered = getVMBeingRendered();
    if (shouldNormalize) {
      logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
    }
  }
  return shouldNormalize ? 0 : value;
}
// [s]lot element node
function s(slotName, data, children, slotset) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
    assert.isTrue(isObject(data), `s() 2nd argument data must be an object.`);
    assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
  }
  if (!isUndefined$1(slotset) && !isUndefined$1(slotset.slotAssignments) && !isUndefined$1(slotset.slotAssignments[slotName]) && slotset.slotAssignments[slotName].length !== 0) {
    const newChildren = [];
    const slotAssignments = slotset.slotAssignments[slotName];
    for (let i = 0; i < slotAssignments.length; i++) {
      const vnode = slotAssignments[i];
      if (!isNull(vnode)) {
        const assignedNodeIsScopedSlot = isVScopedSlotFragment(vnode);
        // The only sniff test for a scoped <slot> element is the presence of `slotData`
        const isScopedSlotElement = !isUndefined$1(data.slotData);
        // Check if slot types of parent and child are matching
        if (assignedNodeIsScopedSlot !== isScopedSlotElement) {
          if (process.env.NODE_ENV !== 'production') {
            logError(`Mismatched slot types for ${slotName === '' ? '(default)' : slotName} slot. Both parent and child component must use standard type or scoped type for a given slot.`, slotset.owner);
          }
          // Ignore slot content from parent
          continue;
        }
        // If the passed slot content is factory, evaluate it and add the produced vnodes
        if (assignedNodeIsScopedSlot) {
          const vmBeingRenderedInception = getVMBeingRendered();
          // Evaluate in the scope of the slot content's owner
          // if a slotset is provided, there will always be an owner. The only case where owner is
          // undefined is for root components, but root components cannot accept slotted content
          setVMBeingRendered(slotset.owner);
          try {
            ArrayPush$1.call(newChildren, vnode.factory(data.slotData, data.key));
          } finally {
            setVMBeingRendered(vmBeingRenderedInception);
          }
        } else {
          // If the slot content is standard type, the content is static, no additional
          // processing needed on the vnode
          ArrayPush$1.call(newChildren, vnode);
        }
      }
    }
    children = newChildren;
  }
  const vmBeingRendered = getVMBeingRendered();
  const {
    renderMode,
    shadowMode
  } = vmBeingRendered;
  if (renderMode === 0 /* RenderMode.Light */) {
    sc(children);
    return children;
  }
  if (shadowMode === 1 /* ShadowMode.Synthetic */) {
    // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
    sc(children);
  }
  return h('slot', data, children);
}
// [c]ustom element node
function c(sel, Ctor, data, children = EmptyArray) {
  const vmBeingRendered = getVMBeingRendered();
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
    assert.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
    assert.isTrue(isObject(data), `c() 3nd argument data must be an object.`);
    assert.isTrue(arguments.length === 3 || isArray$1(children), `c() 4nd argument data must be an array.`);
    // checking reserved internal data properties
    assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert.isFalse(data.styleDecls && data.style, `vnode.data.styleDecls and vnode.data.style ambiguous declaration.`);
    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }
    if (arguments.length === 4) {
      forEach.call(children, childVnode => {
        if (childVnode != null) {
          assert.isTrue('type' in childVnode && 'sel' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }
  }
  const {
    key,
    ref
  } = data;
  let elm, aChildren, vm;
  const vnode = {
    type: 3 /* VNodeType.CustomElement */,
    sel,
    data,
    children,
    elm,
    key,
    ctor: Ctor,
    owner: vmBeingRendered,
    mode: 'open',
    aChildren,
    vm
  };
  addVNodeToChildLWC(vnode);
  if (!isUndefined$1(ref)) {
    setRefVNode(vmBeingRendered, ref, vnode);
  }
  return vnode;
}
// [i]terable node
function i(iterable, factory) {
  const list = [];
  // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
  sc(list);
  const vmBeingRendered = getVMBeingRendered();
  if (isUndefined$1(iterable) || iterable === null) {
    if (process.env.NODE_ENV !== 'production') {
      logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
    }
    return list;
  }
  if (process.env.NODE_ENV !== 'production') {
    assert.isFalse(isUndefined$1(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
  }
  const iterator = iterable[SymbolIterator]();
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered}.`);
  }
  let next = iterator.next();
  let j = 0;
  let {
    value,
    done: last
  } = next;
  let keyMap;
  let iterationError;
  if (process.env.NODE_ENV !== 'production') {
    keyMap = create(null);
  }
  while (last === false) {
    // implementing a look-back-approach because we need to know if the element is the last
    next = iterator.next();
    last = next.done;
    // template factory logic based on the previous collected value
    const vnode = factory(value, j, j === 0, last === true);
    if (isArray$1(vnode)) {
      ArrayPush$1.apply(list, vnode);
    } else {
      ArrayPush$1.call(list, vnode);
    }
    if (process.env.NODE_ENV !== 'production') {
      const vnodes = isArray$1(vnode) ? vnode : [vnode];
      forEach.call(vnodes, childVnode => {
        if (!isNull(childVnode) && isObject(childVnode) && !isUndefined$1(childVnode.sel)) {
          const {
            key
          } = childVnode;
          if (isString(key) || isNumber(key)) {
            if (keyMap[key] === 1 && isUndefined$1(iterationError)) {
              iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
            }
            keyMap[key] = 1;
          } else if (isUndefined$1(iterationError)) {
            iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
          }
        }
      });
    }
    // preparing next value
    j += 1;
    value = next.value;
  }
  if (process.env.NODE_ENV !== 'production') {
    if (!isUndefined$1(iterationError)) {
      logError(iterationError, vmBeingRendered);
    }
  }
  return list;
}
/**
 * [f]lattening
 */
function f(items) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isArray$1(items), 'flattening api can only work with arrays.');
  }
  const len = items.length;
  const flattened = [];
  // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
  sc(flattened);
  for (let j = 0; j < len; j += 1) {
    const item = items[j];
    if (isArray$1(item)) {
      ArrayPush$1.apply(flattened, item);
    } else {
      ArrayPush$1.call(flattened, item);
    }
  }
  return flattened;
}
// [t]ext node
function t(text) {
  let sel, key, elm;
  return {
    type: 0 /* VNodeType.Text */,
    sel,
    text,
    elm,
    key,
    owner: getVMBeingRendered()
  };
}
// [co]mment node
function co(text) {
  let sel, elm;
  return {
    type: 1 /* VNodeType.Comment */,
    sel,
    text,
    elm,
    key: 'c',
    owner: getVMBeingRendered()
  };
}
// [d]ynamic text
function d(value) {
  return value == null ? '' : String(value);
}
// [b]ind function
function b(fn) {
  const vmBeingRendered = getVMBeingRendered();
  if (isNull(vmBeingRendered)) {
    throw new Error();
  }
  const vm = vmBeingRendered;
  return function (event) {
    invokeEventListener(vm, fn, vm.component, event);
  };
}
// [k]ey function
function k(compilerKey, obj) {
  switch (typeof obj) {
    case 'number':
    case 'string':
      return compilerKey + ':' + obj;
    case 'object':
      if (process.env.NODE_ENV !== 'production') {
        assert.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
      }
  }
}
// [g]lobal [id] function
function gid(id) {
  const vmBeingRendered = getVMBeingRendered();
  if (isUndefined$1(id) || id === '') {
    if (process.env.NODE_ENV !== 'production') {
      logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
    }
    return id;
  }
  // We remove attributes when they are assigned a value of null
  if (isNull(id)) {
    return null;
  }
  const {
    idx,
    shadowMode
  } = vmBeingRendered;
  if (shadowMode === 1 /* ShadowMode.Synthetic */) {
    return StringReplace.call(id, /\S+/g, id => `${id}-${idx}`);
  }
  return id;
}
// [f]ragment [id] function
function fid(url) {
  const vmBeingRendered = getVMBeingRendered();
  if (isUndefined$1(url) || url === '') {
    if (process.env.NODE_ENV !== 'production') {
      if (isUndefined$1(url)) {
        logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
      }
    }
    return url;
  }
  // We remove attributes when they are assigned a value of null
  if (isNull(url)) {
    return null;
  }
  const {
    idx,
    shadowMode
  } = vmBeingRendered;
  // Apply transformation only for fragment-only-urls, and only in shadow DOM
  if (shadowMode === 1 /* ShadowMode.Synthetic */ && /^#/.test(url)) {
    return `${url}-${idx}`;
  }
  return url;
}
/**
 * [ddc] - create a (deprecated) dynamic component via `<x-foo lwc:dynamic={Ctor}>`
 *
 * TODO [#3331]: remove usage of lwc:dynamic in 246
 */
function ddc(sel, Ctor, data, children = EmptyArray) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
    assert.isTrue(isObject(data), `dc() 3nd argument data must be an object.`);
    assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 4nd argument data must be an array.`);
  }
  // null or undefined values should produce a null value in the VNodes
  if (isNull(Ctor) || isUndefined$1(Ctor)) {
    return null;
  }
  if (!isComponentConstructor(Ctor)) {
    throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
  }
  return c(sel, Ctor, data, children);
}
/**
 * [dc] - create a dynamic component via `<lwc:component lwc:is={Ctor}>`
 */
function dc(Ctor, data, children = EmptyArray) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isObject(data), `dc() 2nd argument data must be an object.`);
    assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 3rd argument data must be an array.`);
  }
  // Null or undefined values should produce a null value in the VNodes.
  // This is the only value at compile time as the constructor will not be known.
  if (isNull(Ctor) || isUndefined$1(Ctor)) {
    return null;
  }
  if (!isComponentConstructor(Ctor)) {
    throw new Error(`Invalid constructor ${toString$1(Ctor)} is not a LightningElement constructor.`);
  }
  // Look up the dynamic component's name at runtime once the constructor is available.
  // This information is only known at runtime and is stored as part of registerComponent.
  const sel = getComponentRegisteredName(Ctor);
  if (isUndefined$1(sel) || sel === '') {
    throw new Error(`Invalid LWC constructor ${toString$1(Ctor)} does not have a registered name`);
  }
  return c(sel, Ctor, data, children);
}
/**
 * slow children collection marking mechanism. this API allows the compiler to signal
 * to the engine that a particular collection of children must be diffed using the slow
 * algo based on keys due to the nature of the list. E.g.:
 *
 *   - slot element's children: the content of the slot has to be dynamic when in synthetic
 *                              shadow mode because the `vnode.children` might be the slotted
 *                              content vs default content, in which case the size and the
 *                              keys are not matching.
 *   - children that contain dynamic components
 *   - children that are produced by iteration
 *
 */
function sc(vnodes) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isArray$1(vnodes), 'sc() api can only work with arrays.');
  }
  // We have to mark the vnodes collection as dynamic so we can later on
  // choose to use the snabbdom virtual dom diffing algo instead of our
  // static dummy algo.
  markAsDynamicChildren(vnodes);
  return vnodes;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
 * libraries to sanitize HTML content. This hook process the content passed via the template to
 * lwc:inner-html directive.
 * It is meant to be overridden with setSanitizeHtmlContentHook, it throws an error by default.
 */
let sanitizeHtmlContentHook = () => {
  // locker-service patches this function during runtime to sanitize HTML content.
  throw new Error('sanitizeHtmlContent hook must be implemented.');
};
// [s]anitize [h]tml [c]ontent
function shc(content) {
  return sanitizeHtmlContentHook();
}
const api = freeze({
  s,
  h,
  c,
  i,
  f,
  t,
  d,
  b,
  k,
  co,
  dc,
  fr,
  ti,
  st,
  gid,
  fid,
  shc,
  ssf,
  ddc
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const operationIdNameMapping = ['constructor', 'render', 'patch', 'connectedCallback', 'renderedCallback', 'disconnectedCallback', 'errorCallback', 'lwc-hydrate', 'lwc-rehydrate'];
// Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
// JSDom (used in Jest) for example doesn't implement the UserTiming APIs.
const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';
const start = !isUserTimingSupported ? noop : markName => {
  performance.mark(markName);
};
const end = !isUserTimingSupported ? noop : (measureName, markName) => {
  performance.measure(measureName, markName);
  // Clear the created marks and measure to avoid filling the performance entries buffer.
  // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.
  performance.clearMarks(markName);
  performance.clearMeasures(measureName);
};
function getOperationName(opId) {
  return operationIdNameMapping[opId];
}
function getMeasureName(opId, vm) {
  return `${getComponentTag(vm)} - ${getOperationName(opId)}`;
}
function getMarkName(opId, vm) {
  // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
  // the right measures for components that are recursive.
  return `${getMeasureName(opId, vm)} - ${vm.idx}`;
}
/** Indicates if operations should be logged via the User Timing API. */
const isMeasureEnabled = process.env.NODE_ENV !== 'production';
function logOperationStart(opId, vm) {
  if (isMeasureEnabled) {
    const markName = getMarkName(opId, vm);
    start(markName);
  }
}
function logOperationEnd(opId, vm) {
  if (isMeasureEnabled) {
    const markName = getMarkName(opId, vm);
    const measureName = getMeasureName(opId, vm);
    end(measureName, markName);
  }
}
function logGlobalOperationStart(opId, vm) {
  if (isMeasureEnabled) {
    const opName = getOperationName(opId);
    const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
    start(markName);
  }
}
function logGlobalOperationEnd(opId, vm) {
  if (isMeasureEnabled) {
    const opName = getOperationName(opId);
    const markName = isUndefined$1(vm) ? opName : getMarkName(opId, vm);
    end(opName, markName);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let isUpdatingTemplate = false;
let vmBeingRendered = null;
function getVMBeingRendered() {
  return vmBeingRendered;
}
function setVMBeingRendered(vm) {
  vmBeingRendered = vm;
}
function validateSlots(vm, html) {
  assertNotProd(); // this method should never leak to prod
  const {
    cmpSlots
  } = vm;
  const {
    slots = EmptyArray
  } = html;
  for (const slotName in cmpSlots.slotAssignments) {
    // eslint-disable-next-line @lwc/lwc-internal/no-production-assert
    assert.isTrue(isArray$1(cmpSlots.slotAssignments[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots.slotAssignments[slotName])} for slot "${slotName}" in ${vm}.`);
    if (slotName !== '' && ArrayIndexOf.call(slots, slotName) === -1) {
      // TODO [#1297]: this should never really happen because the compiler should always validate
      // eslint-disable-next-line @lwc/lwc-internal/no-production-assert
      logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
    }
  }
}
function validateLightDomTemplate(template, vm) {
  if (template === defaultEmptyTemplate) return;
  if (vm.renderMode === 0 /* RenderMode.Light */) {
    assert.isTrue(template.renderMode === 'light', `Light DOM components can't render shadow DOM templates. Add an 'lwc:render-mode="light"' directive to the root template tag of ${getComponentTag(vm)}.`);
  } else {
    assert.isTrue(isUndefined$1(template.renderMode), `Shadow DOM components template can't render light DOM templates. Either remove the 'lwc:render-mode' directive from ${getComponentTag(vm)} or set it to 'lwc:render-mode="shadow"`);
  }
}
function evaluateTemplate(vm, html) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isFunction$1(html), `evaluateTemplate() second argument must be an imported template instead of ${toString$1(html)}`);
    // in dev-mode, we support hot swapping of templates, which means that
    // the component instance might be attempting to use an old version of
    // the template, while internally, we have a replacement for it.
    html = getTemplateOrSwappedTemplate(html);
  }
  const isUpdatingTemplateInception = isUpdatingTemplate;
  const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
  let vnodes = [];
  runWithBoundaryProtection(vm, vm.owner, () => {
    // pre
    vmBeingRendered = vm;
    logOperationStart(1 /* OperationId.Render */, vm);
  }, () => {
    // job
    const {
      component,
      context,
      cmpSlots,
      cmpTemplate,
      tro
    } = vm;
    tro.observe(() => {
      // Reset the cache memoizer for template when needed.
      if (html !== cmpTemplate) {
        if (process.env.NODE_ENV !== 'production') {
          validateLightDomTemplate(html, vm);
        }
        // Perf opt: do not reset the shadow root during the first rendering (there is
        // nothing to reset).
        if (!isNull(cmpTemplate)) {
          // It is important to reset the content to avoid reusing similar elements
          // generated from a different template, because they could have similar IDs,
          // and snabbdom just rely on the IDs.
          resetComponentRoot(vm);
        }
        // Check that the template was built by the compiler.
        if (!isTemplateRegistered(html)) {
          throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
        }
        vm.cmpTemplate = html;
        // Create a brand new template cache for the swapped templated.
        context.tplCache = create(null);
        // Set the computeHasScopedStyles property in the context, to avoid recomputing it repeatedly.
        context.hasScopedStyles = computeHasScopedStyles(html, vm);
        // Update the scoping token on the host element.
        updateStylesheetToken(vm, html);
        // Evaluate, create stylesheet and cache the produced VNode for future
        // re-rendering.
        const stylesheetsContent = getStylesheetsContent(vm, html);
        context.styleVNodes = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
      }
      if (process.env.NODE_ENV !== 'production') {
        // validating slots in every rendering since the allocated content might change over time
        validateSlots(vm, html);
        // add the VM to the list of host VMs that can be re-rendered if html is swapped
        setActiveVM(vm);
      }
      // reset the refs; they will be set during the tmpl() instantiation
      vm.refVNodes = html.hasRefs ? create(null) : null;
      // right before producing the vnodes, we clear up all internal references
      // to custom elements from the template.
      vm.velements = [];
      // Set the global flag that template is being updated
      isUpdatingTemplate = true;
      vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
      const {
        styleVNodes
      } = context;
      if (!isNull(styleVNodes)) {
        ArrayUnshift.apply(vnodes, styleVNodes);
      }
    });
  }, () => {
    // post
    isUpdatingTemplate = isUpdatingTemplateInception;
    vmBeingRendered = vmOfTemplateBeingUpdatedInception;
    logOperationEnd(1 /* OperationId.Render */, vm);
  });
  if (process.env.NODE_ENV !== 'production') {
    assert.invariant(isArray$1(vnodes), `Compiler should produce html functions that always return an array.`);
  }
  return vnodes;
}
function computeHasScopedStylesInStylesheets(stylesheets) {
  if (hasStyles(stylesheets)) {
    for (let i = 0; i < stylesheets.length; i++) {
      if (isTrue(stylesheets[i][KEY__SCOPED_CSS])) {
        return true;
      }
    }
  }
  return false;
}
function computeHasScopedStyles(template, vm) {
  const {
    stylesheets
  } = template;
  const vmStylesheets = !isUndefined$1(vm) ? vm.stylesheets : null;
  return computeHasScopedStylesInStylesheets(stylesheets) || computeHasScopedStylesInStylesheets(vmStylesheets);
}
function hasStyles(stylesheets) {
  return !isUndefined$1(stylesheets) && !isNull(stylesheets) && stylesheets.length > 0;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let isInvokingRender = false;
let vmBeingConstructed = null;
function isBeingConstructed(vm) {
  return vmBeingConstructed === vm;
}
function invokeComponentCallback(vm, fn, args) {
  const {
    component,
    callHook,
    owner
  } = vm;
  runWithBoundaryProtection(vm, owner, noop, () => {
    callHook(component, fn, args);
  }, noop);
}
function invokeComponentConstructor(vm, Ctor) {
  const vmBeingConstructedInception = vmBeingConstructed;
  let error;
  logOperationStart(0 /* OperationId.Constructor */, vm);
  vmBeingConstructed = vm;
  /**
   * Constructors don't need to be wrapped with a boundary because for root elements
   * it should throw, while elements from template are already wrapped by a boundary
   * associated to the diffing algo.
   */
  try {
    // job
    const result = new Ctor();
    // Check indirectly if the constructor result is an instance of LightningElement. Using
    // the "instanceof" operator would not work here since Locker Service provides its own
    // implementation of LightningElement, so we indirectly check if the base constructor is
    // invoked by accessing the component on the vm.
    if (vmBeingConstructed.component !== result) {
      throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
    }
  } catch (e) {
    error = Object(e);
  } finally {
    logOperationEnd(0 /* OperationId.Constructor */, vm);
    vmBeingConstructed = vmBeingConstructedInception;
    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error);
      // re-throwing the original error annotated after restoring the context
      throw error; // eslint-disable-line no-unsafe-finally
    }
  }
}

function invokeComponentRenderMethod(vm) {
  const {
    def: {
      render
    },
    callHook,
    component,
    owner
  } = vm;
  const isRenderBeingInvokedInception = isInvokingRender;
  const vmBeingRenderedInception = getVMBeingRendered();
  let html;
  let renderInvocationSuccessful = false;
  runWithBoundaryProtection(vm, owner, () => {
    // pre
    isInvokingRender = true;
    setVMBeingRendered(vm);
  }, () => {
    // job
    vm.tro.observe(() => {
      html = callHook(component, render);
      renderInvocationSuccessful = true;
    });
  }, () => {
    // post
    isInvokingRender = isRenderBeingInvokedInception;
    setVMBeingRendered(vmBeingRenderedInception);
  });
  // If render() invocation failed, process errorCallback in boundary and return an empty template
  return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
}
function invokeEventListener(vm, fn, thisValue, event) {
  const {
    callHook,
    owner
  } = vm;
  runWithBoundaryProtection(vm, owner, noop, () => {
    // job
    if (process.env.NODE_ENV !== 'production') {
      assert.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
    }
    callHook(thisValue, fn, [event]);
  }, noop);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const registeredComponentMap = new Map();
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */
function registerComponent(
// We typically expect a LightningElementConstructor, but technically you can call this with anything
Ctor, metadata) {
  if (isFunction$1(Ctor)) {
    if (process.env.NODE_ENV !== 'production') {
      // There is no point in running this in production, because the version mismatch check relies
      // on code comments which are stripped out in production by minifiers
      checkVersionMismatch(Ctor, 'component');
    }
    // TODO [#3331]: add validation to check the value of metadata.sel is not an empty string.
    registeredComponentMap.set(Ctor, metadata);
  }
  // chaining this method as a way to wrap existing assignment of component constructor easily,
  // without too much transformation
  return Ctor;
}
function getComponentRegisteredTemplate(Ctor) {
  var _a;
  return (_a = registeredComponentMap.get(Ctor)) === null || _a === void 0 ? void 0 : _a.tmpl;
}
function getComponentRegisteredName(Ctor) {
  var _a;
  return (_a = registeredComponentMap.get(Ctor)) === null || _a === void 0 ? void 0 : _a.sel;
}
function getTemplateReactiveObserver(vm) {
  return createReactiveObserver(() => {
    const {
      isDirty
    } = vm;
    if (isFalse(isDirty)) {
      markComponentAsDirty(vm);
      scheduleRehydration(vm);
    }
  });
}
function renderComponent(vm) {
  if (process.env.NODE_ENV !== 'production') {
    assert.invariant(vm.isDirty, `${vm} is not dirty.`);
  }
  vm.tro.reset();
  const vnodes = invokeComponentRenderMethod(vm);
  vm.isDirty = false;
  vm.isScheduled = false;
  return vnodes;
}
function markComponentAsDirty(vm) {
  if (process.env.NODE_ENV !== 'production') {
    const vmBeingRendered = getVMBeingRendered();
    assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
    assert.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
    assert.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
  }
  vm.isDirty = true;
}
const cmpEventListenerMap = new WeakMap();
function getWrappedComponentsListener(vm, listener) {
  if (!isFunction$1(listener)) {
    throw new TypeError('Expected an EventListener but received ' + typeof listener); // avoiding problems with non-valid listeners
  }

  let wrappedListener = cmpEventListenerMap.get(listener);
  if (isUndefined$1(wrappedListener)) {
    wrappedListener = function (event) {
      invokeEventListener(vm, listener, undefined, event);
    };
    cmpEventListenerMap.set(listener, wrappedListener);
  }
  return wrappedListener;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const Services = create(null);
function invokeServiceHook(vm, cbs) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(isArray$1(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
  }
  const {
    component,
    def,
    context
  } = vm;
  for (let i = 0, len = cbs.length; i < len; ++i) {
    cbs[i].call(undefined, component, {}, def, context);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let idx = 0;
/** The internal slot used to associate different objects the engine manipulates with the VM */
const ViewModelReflection = new WeakMap();
function callHook(cmp, fn, args = []) {
  return fn.apply(cmp, args);
}
function setHook(cmp, prop, newValue) {
  cmp[prop] = newValue;
}
function getHook(cmp, prop) {
  return cmp[prop];
}
function rerenderVM(vm) {
  rehydrate(vm);
}
function connectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  logGlobalOperationStart(7 /* OperationId.GlobalHydrate */, vm);
  // Usually means moving the element from one place to another, which is observable via
  // life-cycle hooks.
  if (vm.state === 1 /* VMState.connected */) {
    disconnectRootElement(elm);
  }
  runConnectedCallback(vm);
  rehydrate(vm);
  logGlobalOperationEnd(7 /* OperationId.GlobalHydrate */, vm);
}
function disconnectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  resetComponentStateWhenRemoved(vm);
}
function appendVM(vm) {
  rehydrate(vm);
}
// just in case the component comes back, with this we guarantee re-rendering it
// while preventing any attempt to rehydration until after reinsertion.
function resetComponentStateWhenRemoved(vm) {
  const {
    state
  } = vm;
  if (state !== 2 /* VMState.disconnected */) {
    const {
      tro
    } = vm;
    // Making sure that any observing record will not trigger the rehydrated on this vm
    tro.reset();
    runDisconnectedCallback(vm);
    // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)
    runChildNodesDisconnectedCallback(vm);
    runLightChildNodesDisconnectedCallback(vm);
  }
}
// this method is triggered by the diffing algo only when a vnode from the
// old vnode.children is removed from the DOM.
function removeVM(vm) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(vm.state === 1 /* VMState.connected */ || vm.state === 2 /* VMState.disconnected */, `${vm} must have been connected.`);
  }
  resetComponentStateWhenRemoved(vm);
}
function getNearestShadowAncestor(vm) {
  let ancestor = vm.owner;
  while (!isNull(ancestor) && ancestor.renderMode === 0 /* RenderMode.Light */) {
    ancestor = ancestor.owner;
  }
  return ancestor;
}
function createVM(elm, ctor, renderer, options) {
  const {
    mode,
    owner,
    tagName,
    hydrated
  } = options;
  const def = getComponentInternalDef(ctor);
  const vm = {
    elm,
    def,
    idx: idx++,
    state: 0 /* VMState.created */,
    isScheduled: false,
    isDirty: true,
    tagName,
    mode,
    owner,
    refVNodes: null,
    children: EmptyArray,
    aChildren: EmptyArray,
    velements: EmptyArray,
    cmpProps: create(null),
    cmpFields: create(null),
    cmpSlots: {
      slotAssignments: create(null)
    },
    cmpTemplate: null,
    hydrated: Boolean(hydrated),
    renderMode: def.renderMode,
    context: {
      stylesheetToken: undefined,
      hasTokenInClass: undefined,
      hasTokenInAttribute: undefined,
      hasScopedStyles: undefined,
      styleVNodes: null,
      tplCache: EmptyObject,
      wiredConnecting: EmptyArray,
      wiredDisconnecting: EmptyArray
    },
    // Properties set right after VM creation.
    tro: null,
    shadowMode: null,
    stylesheets: null,
    // Properties set by the LightningElement constructor.
    component: null,
    shadowRoot: null,
    renderRoot: null,
    callHook,
    setHook,
    getHook,
    renderer
  };
  if (process.env.NODE_ENV !== 'production') {
    vm.debugInfo = create(null);
  }
  vm.stylesheets = computeStylesheets(vm, def.ctor);
  vm.shadowMode = computeShadowMode(vm, renderer);
  vm.tro = getTemplateReactiveObserver(vm);
  if (process.env.NODE_ENV !== 'production') {
    vm.toString = () => {
      return `[object:vm ${def.name} (${vm.idx})]`;
    };
    if (lwcRuntimeFlags.ENABLE_FORCE_NATIVE_SHADOW_MODE_FOR_TEST) {
      vm.shadowMode = 0 /* ShadowMode.Native */;
    }
  }
  // Create component instance associated to the vm and the element.
  invokeComponentConstructor(vm, def.ctor);
  // Initializing the wire decorator per instance only when really needed
  if (hasWireAdapters(vm)) {
    installWireAdapters(vm);
  }
  return vm;
}
function validateComponentStylesheets(vm, stylesheets) {
  let valid = true;
  const validate = arrayOrStylesheet => {
    if (isArray$1(arrayOrStylesheet)) {
      for (let i = 0; i < arrayOrStylesheet.length; i++) {
        validate(arrayOrStylesheet[i]);
      }
    } else if (!isFunction$1(arrayOrStylesheet)) {
      // function assumed to be a stylesheet factory
      valid = false;
    }
  };
  if (!isArray$1(stylesheets)) {
    valid = false;
  } else {
    validate(stylesheets);
  }
  return valid;
}
// Validate and flatten any stylesheets defined as `static stylesheets`
function computeStylesheets(vm, ctor) {
  warnOnStylesheetsMutation(ctor);
  const {
    stylesheets
  } = ctor;
  if (!isUndefined$1(stylesheets)) {
    const valid = validateComponentStylesheets(vm, stylesheets);
    if (valid) {
      return flattenStylesheets(stylesheets);
    } else if (process.env.NODE_ENV !== 'production') {
      logError(`static stylesheets must be an array of CSS stylesheets. Found invalid stylesheets on <${vm.tagName}>`, vm);
    }
  }
  return null;
}
function warnOnStylesheetsMutation(ctor) {
  if (process.env.NODE_ENV !== 'production') {
    let {
      stylesheets
    } = ctor;
    defineProperty(ctor, 'stylesheets', {
      enumerable: true,
      configurable: true,
      get() {
        return stylesheets;
      },
      set(newValue) {
        logWarnOnce(`Dynamically setting the "stylesheets" static property on ${ctor.name} ` + 'will not affect the stylesheets injected.');
        stylesheets = newValue;
      }
    });
  }
}
function computeShadowMode(vm, renderer) {
  const {
    def
  } = vm;
  const {
    isSyntheticShadowDefined,
    isNativeShadowDefined
  } = renderer;
  let shadowMode;
  if (isSyntheticShadowDefined) {
    if (def.renderMode === 0 /* RenderMode.Light */) {
      // ShadowMode.Native implies "not synthetic shadow" which is consistent with how
      // everything defaults to native when the synthetic shadow polyfill is unavailable.
      shadowMode = 0 /* ShadowMode.Native */;
    } else if (isNativeShadowDefined) {
      // Not combined with above condition because @lwc/features only supports identifiers in
      // the if-condition.
      if (lwcRuntimeFlags.ENABLE_MIXED_SHADOW_MODE) {
        if (def.shadowSupportMode === "any" /* ShadowSupportMode.Any */) {
          shadowMode = 0 /* ShadowMode.Native */;
        } else {
          const shadowAncestor = getNearestShadowAncestor(vm);
          if (!isNull(shadowAncestor) && shadowAncestor.shadowMode === 0 /* ShadowMode.Native */) {
            // Transitive support for native Shadow DOM. A component in native mode
            // transitively opts all of its descendants into native.
            shadowMode = 0 /* ShadowMode.Native */;
          } else {
            // Synthetic if neither this component nor any of its ancestors are configured
            // to be native.
            shadowMode = 1 /* ShadowMode.Synthetic */;
          }
        }
      } else {
        shadowMode = 1 /* ShadowMode.Synthetic */;
      }
    } else {
      // Synthetic if there is no native Shadow DOM support.
      shadowMode = 1 /* ShadowMode.Synthetic */;
    }
  } else {
    // Native if the synthetic shadow polyfill is unavailable.
    shadowMode = 0 /* ShadowMode.Native */;
  }

  return shadowMode;
}
function assertIsVM(obj) {
  if (isNull(obj) || !isObject(obj) || !('renderRoot' in obj)) {
    throw new TypeError(`${obj} is not a VM.`);
  }
}
function associateVM(obj, vm) {
  ViewModelReflection.set(obj, vm);
}
function getAssociatedVM(obj) {
  const vm = ViewModelReflection.get(obj);
  if (process.env.NODE_ENV !== 'production') {
    assertIsVM(vm);
  }
  return vm;
}
function getAssociatedVMIfPresent(obj) {
  const maybeVm = ViewModelReflection.get(obj);
  if (process.env.NODE_ENV !== 'production') {
    if (!isUndefined$1(maybeVm)) {
      assertIsVM(maybeVm);
    }
  }
  return maybeVm;
}
function rehydrate(vm) {
  if (isTrue(vm.isDirty)) {
    const children = renderComponent(vm);
    patchShadowRoot(vm, children);
  }
}
function patchShadowRoot(vm, newCh) {
  const {
    renderRoot,
    children: oldCh,
    renderer
  } = vm;
  // caching the new children collection
  vm.children = newCh;
  if (newCh.length > 0 || oldCh.length > 0) {
    // patch function mutates vnodes by adding the element reference,
    // however, if patching fails it contains partial changes.
    if (oldCh !== newCh) {
      runWithBoundaryProtection(vm, vm, () => {
        // pre
        logOperationStart(2 /* OperationId.Patch */, vm);
      }, () => {
        // job
        patchChildren(oldCh, newCh, renderRoot, renderer);
      }, () => {
        // post
        logOperationEnd(2 /* OperationId.Patch */, vm);
      });
    }
  }
  if (vm.state === 1 /* VMState.connected */) {
    // If the element is connected, that means connectedCallback was already issued, and
    // any successive rendering should finish with the call to renderedCallback, otherwise
    // the connectedCallback will take care of calling it in the right order at the end of
    // the current rehydration process.
    runRenderedCallback(vm);
  }
}
function runRenderedCallback(vm) {
  const {
    def: {
      renderedCallback
    }
  } = vm;
  const {
    rendered
  } = Services;
  if (rendered) {
    invokeServiceHook(vm, rendered);
  }
  if (!isUndefined$1(renderedCallback)) {
    logOperationStart(4 /* OperationId.RenderedCallback */, vm);
    invokeComponentCallback(vm, renderedCallback);
    logOperationEnd(4 /* OperationId.RenderedCallback */, vm);
  }
}
let rehydrateQueue = [];
function flushRehydrationQueue() {
  logGlobalOperationStart(8 /* OperationId.GlobalRehydrate */);
  if (process.env.NODE_ENV !== 'production') {
    assert.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
  }
  const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
  rehydrateQueue = []; // reset to a new queue
  for (let i = 0, len = vms.length; i < len; i += 1) {
    const vm = vms[i];
    try {
      rehydrate(vm);
    } catch (error) {
      if (i + 1 < len) {
        // pieces of the queue are still pending to be rehydrated, those should have priority
        if (rehydrateQueue.length === 0) {
          addCallbackToNextTick(flushRehydrationQueue);
        }
        ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i + 1));
      }
      // we need to end the measure before throwing.
      logGlobalOperationEnd(8 /* OperationId.GlobalRehydrate */);
      // re-throwing the original error will break the current tick, but since the next tick is
      // already scheduled, it should continue patching the rest.
      throw error; // eslint-disable-line no-unsafe-finally
    }
  }

  logGlobalOperationEnd(8 /* OperationId.GlobalRehydrate */);
}

function runConnectedCallback(vm) {
  const {
    state
  } = vm;
  if (state === 1 /* VMState.connected */) {
    return; // nothing to do since it was already connected
  }

  vm.state = 1 /* VMState.connected */;
  // reporting connection
  const {
    connected
  } = Services;
  if (connected) {
    invokeServiceHook(vm, connected);
  }
  if (hasWireAdapters(vm)) {
    connectWireAdapters(vm);
  }
  const {
    connectedCallback
  } = vm.def;
  if (!isUndefined$1(connectedCallback)) {
    logOperationStart(3 /* OperationId.ConnectedCallback */, vm);
    invokeComponentCallback(vm, connectedCallback);
    logOperationEnd(3 /* OperationId.ConnectedCallback */, vm);
  }
}
function hasWireAdapters(vm) {
  return getOwnPropertyNames$1(vm.def.wire).length > 0;
}
function runDisconnectedCallback(vm) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(vm.state !== 2 /* VMState.disconnected */, `${vm} must be inserted.`);
  }
  if (isFalse(vm.isDirty)) {
    // this guarantees that if the component is reused/reinserted,
    // it will be re-rendered because we are disconnecting the reactivity
    // linking, so mutations are not automatically reflected on the state
    // of disconnected components.
    vm.isDirty = true;
  }
  vm.state = 2 /* VMState.disconnected */;
  // reporting disconnection
  const {
    disconnected
  } = Services;
  if (disconnected) {
    invokeServiceHook(vm, disconnected);
  }
  if (hasWireAdapters(vm)) {
    disconnectWireAdapters(vm);
  }
  const {
    disconnectedCallback
  } = vm.def;
  if (!isUndefined$1(disconnectedCallback)) {
    logOperationStart(5 /* OperationId.DisconnectedCallback */, vm);
    invokeComponentCallback(vm, disconnectedCallback);
    logOperationEnd(5 /* OperationId.DisconnectedCallback */, vm);
  }
}
function runChildNodesDisconnectedCallback(vm) {
  const {
    velements: vCustomElementCollection
  } = vm;
  // Reporting disconnection for every child in inverse order since they are
  // inserted in reserved order.
  for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
    const {
      elm
    } = vCustomElementCollection[i];
    // There are two cases where the element could be undefined:
    // * when there is an error during the construction phase, and an error
    //   boundary picks it, there is a possibility that the VCustomElement
    //   is not properly initialized, and therefore is should be ignored.
    // * when slotted custom element is not used by the element where it is
    //   slotted into it, as  a result, the custom element was never
    //   initialized.
    if (!isUndefined$1(elm)) {
      const childVM = getAssociatedVMIfPresent(elm);
      // The VM associated with the element might be associated undefined
      // in the case where the VM failed in the middle of its creation,
      // eg: constructor throwing before invoking super().
      if (!isUndefined$1(childVM)) {
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }
}
function runLightChildNodesDisconnectedCallback(vm) {
  const {
    aChildren: adoptedChildren
  } = vm;
  recursivelyDisconnectChildren(adoptedChildren);
}
/**
 * The recursion doesn't need to be a complete traversal of the vnode graph,
 * instead it can be partial, when a custom element vnode is found, we don't
 * need to continue into its children because by attempting to disconnect the
 * custom element itself will trigger the removal of anything slotted or anything
 * defined on its shadow.
 */
function recursivelyDisconnectChildren(vnodes) {
  for (let i = 0, len = vnodes.length; i < len; i += 1) {
    const vnode = vnodes[i];
    if (!isNull(vnode) && !isUndefined$1(vnode.elm)) {
      switch (vnode.type) {
        case 2 /* VNodeType.Element */:
          recursivelyDisconnectChildren(vnode.children);
          break;
        case 3 /* VNodeType.CustomElement */:
          {
            const vm = getAssociatedVM(vnode.elm);
            resetComponentStateWhenRemoved(vm);
            break;
          }
      }
    }
  }
}
// This is a super optimized mechanism to remove the content of the root node (shadow root
// for shadow DOM components and the root element itself for light DOM) without having to go
// into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
// children VNodes might not be representing the current state of the DOM.
function resetComponentRoot(vm) {
  recursivelyRemoveChildren(vm.children, vm);
  vm.children = EmptyArray;
  runChildNodesDisconnectedCallback(vm);
  vm.velements = EmptyArray;
}
// Helper function to remove all children of the root node.
// If the set of children includes VFragment nodes, we need to remove the children of those nodes too.
// Since VFragments can contain other VFragments, we need to traverse the entire of tree of VFragments.
// If the set contains no VFragment nodes, no traversal is needed.
function recursivelyRemoveChildren(vnodes, vm) {
  const {
    renderRoot,
    renderer: {
      remove
    }
  } = vm;
  for (let i = 0, len = vnodes.length; i < len; i += 1) {
    const vnode = vnodes[i];
    if (!isNull(vnode)) {
      // VFragments are special; their .elm property does not point to the root element since they have no single root.
      if (isVFragment(vnode)) {
        recursivelyRemoveChildren(vnode.children, vm);
      } else if (!isUndefined$1(vnode.elm)) {
        remove(vnode.elm, renderRoot);
      }
    }
  }
}
function scheduleRehydration(vm) {
  if (isTrue(vm.isScheduled)) {
    return;
  }
  vm.isScheduled = true;
  if (rehydrateQueue.length === 0) {
    addCallbackToNextTick(flushRehydrationQueue);
  }
  ArrayPush$1.call(rehydrateQueue, vm);
}
function getErrorBoundaryVM(vm) {
  let currentVm = vm;
  while (!isNull(currentVm)) {
    if (!isUndefined$1(currentVm.def.errorCallback)) {
      return currentVm;
    }
    currentVm = currentVm.owner;
  }
}
function runWithBoundaryProtection(vm, owner, pre, job, post) {
  let error;
  pre();
  try {
    job();
  } catch (e) {
    error = Object(e);
  } finally {
    post();
    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error);
      const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVM(owner);
      if (isUndefined$1(errorBoundaryVm)) {
        throw error; // eslint-disable-line no-unsafe-finally
      }

      resetComponentRoot(vm); // remove offenders
      logOperationStart(6 /* OperationId.ErrorCallback */, vm);
      // error boundaries must have an ErrorCallback
      const errorCallback = errorBoundaryVm.def.errorCallback;
      invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
      logOperationEnd(6 /* OperationId.ErrorCallback */, vm);
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
//
// The goal of this code is to detect invalid cross-root ARIA references in synthetic shadow DOM.
// These invalid references should be fixed before the offending components can be migrated to native shadow DOM.
// When invalid usage is detected, we warn in dev mode and call the reporting API if enabled.
// See: https://sfdc.co/synthetic-aria
//
// Use the unpatched native getElementById/querySelectorAll rather than the synthetic one
const getElementById = _globalThis[KEY__NATIVE_GET_ELEMENT_BY_ID];
const querySelectorAll = _globalThis[KEY__NATIVE_QUERY_SELECTOR_ALL];
// This is a "handoff" from synthetic-shadow to engine-core – we want to clean up after ourselves
// so nobody else can misuse these global APIs.
delete _globalThis[KEY__NATIVE_GET_ELEMENT_BY_ID];
delete _globalThis[KEY__NATIVE_QUERY_SELECTOR_ALL];
function isSyntheticShadowRootInstance(rootNode) {
  return rootNode !== document && isTrue(rootNode.synthetic);
}
function reportViolation$1(source, target, attrName) {
  // The vm is either for the source, the target, or both. Either one or both must be using synthetic
  // shadow for a violation to be detected.
  let vm = getAssociatedVMIfPresent(source.getRootNode().host);
  if (isUndefined$1(vm)) {
    vm = getAssociatedVMIfPresent(target.getRootNode().host);
  }
  if (isUndefined$1(vm)) {
    // vm should never be undefined here, but just to be safe, bail out and don't report
    return;
  }
  report("CrossRootAriaInSyntheticShadow" /* ReportingEventId.CrossRootAriaInSyntheticShadow */, {
    tagName: vm.tagName,
    attributeName: attrName
  });
  if (process.env.NODE_ENV !== 'production') {
    // Avoid excessively logging to the console in the case of duplicates.
    logWarnOnce(`Element <${source.tagName.toLowerCase()}> uses attribute "${attrName}" to reference element ` + `<${target.tagName.toLowerCase()}>, which is not in the same shadow root. This will break in native shadow DOM. ` + `For details, see: https://sfdc.co/synthetic-aria`, vm);
  }
}
function parseIdRefAttributeValue(attrValue) {
  // split on whitespace and skip empty strings after splitting
  return isString(attrValue) ? ArrayFilter.call(StringSplit.call(attrValue, /\s+/), Boolean) : [];
}
function detectSyntheticCrossRootAria(elm, attrName, attrValue) {
  const root = elm.getRootNode();
  if (!isSyntheticShadowRootInstance(root)) {
    return;
  }
  if (attrName === 'id') {
    // elm is the target, find the source
    if (!isString(attrValue) || attrValue.length === 0) {
      // if our id is null or empty, nobody can reference us
      return;
    }
    for (const idRefAttrName of ID_REFERENCING_ATTRIBUTES_SET) {
      // Query all global elements with this attribute. The attribute selector syntax `~=` is for values
      // that reference multiple IDs, separated by whitespace.
      const query = `[${idRefAttrName}~="${CSS.escape(attrValue)}"]`;
      const sourceElements = querySelectorAll.call(document, query);
      for (let i = 0; i < sourceElements.length; i++) {
        const sourceElement = sourceElements[i];
        const sourceRoot = sourceElement.getRootNode();
        if (sourceRoot !== root) {
          reportViolation$1(sourceElement, elm, idRefAttrName);
          break;
        }
      }
    }
  } else {
    // elm is the source, find the target
    const ids = parseIdRefAttributeValue(attrValue);
    for (const id of ids) {
      const target = getElementById.call(document, id);
      if (!isNull(target)) {
        const targetRoot = target.getRootNode();
        if (targetRoot !== root) {
          // target element's shadow root is not the same as ours
          reportViolation$1(elm, target, attrName);
        }
      }
    }
  }
}
let enabled = false;
// We want to avoid patching globals whenever possible, so this should be tree-shaken out in prod-mode and if
// reporting is not enabled. It should also only run once
function enableDetection$1() {
  if (enabled) {
    return; // don't double-apply the patches
  }

  enabled = true;
  const {
    setAttribute
  } = Element.prototype;
  // Detect calling `setAttribute` to set an idref or an id
  assign(Element.prototype, {
    setAttribute(attrName, attrValue) {
      setAttribute.call(this, attrName, attrValue);
      if (attrName === 'id' || ID_REFERENCING_ATTRIBUTES_SET.has(attrName)) {
        detectSyntheticCrossRootAria(this, attrName, attrValue);
      }
    }
  });
  // Detect `elm.id = 'foo'`
  const idDescriptor = getOwnPropertyDescriptor$1(Element.prototype, 'id');
  if (!isUndefined$1(idDescriptor)) {
    const {
      get,
      set
    } = idDescriptor;
    // These should always be a getter and a setter, but if someone is monkeying with the global descriptor, ignore it
    if (isFunction$1(get) && isFunction$1(set)) {
      defineProperty(Element.prototype, 'id', {
        get() {
          return get.call(this);
        },
        set(value) {
          set.call(this, value);
          detectSyntheticCrossRootAria(this, 'id', value);
        },
        // On the default descriptor for 'id', enumerable and configurable are true
        enumerable: true,
        configurable: true
      });
    }
  }
}
// Our detection logic relies on some modern browser features. We can just skip reporting the data
// for unsupported browsers
function supportsCssEscape() {
  return typeof CSS !== 'undefined' && isFunction$1(CSS.escape);
}
// If this page is not using synthetic shadow, then we don't need to install detection. Note
// that we are assuming synthetic shadow is loaded before LWC.
function isSyntheticShadowLoaded() {
  // We should probably be calling `renderer.isSyntheticShadowDefined`, but 1) we don't have access to the renderer,
  // and 2) this code needs to run in @lwc/engine-core, so it can access `logWarn()` and `report()`.
  return hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN);
}
// Detecting cross-root ARIA in synthetic shadow only makes sense for the browser
if (supportsCssEscape() && isSyntheticShadowLoaded()) {
  // Always run detection in dev mode, so we can at least print to the console
  if (process.env.NODE_ENV !== 'production') {
    enableDetection$1();
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
//
// The goal of this code is to detect usages of non-standard reflected ARIA properties. These are caused by
// legacy non-standard Element.prototype extensions added by the @lwc/aria-reflection package.
//
// See the README for @lwc/aria-reflection
const NON_STANDARD_ARIA_PROPS = ['ariaActiveDescendant', 'ariaControls', 'ariaDescribedBy', 'ariaDetails', 'ariaErrorMessage', 'ariaFlowTo', 'ariaLabelledBy', 'ariaOwns'];
function isLightningElement(elm) {
  // The former case is for `this.prop` (inside component) and the latter is for `element.prop` (outside component).
  // In both cases, we apply the non-standard prop even when the global polyfill is disabled, so this is kosher.
  return elm instanceof LightningElement || elm instanceof BaseBridgeElement;
}
function findVM(elm) {
  // If it's a shadow DOM component, then it has a host
  const {
    host
  } = elm.getRootNode();
  const vm = isUndefined$1(host) ? undefined : getAssociatedVMIfPresent(host);
  if (!isUndefined$1(vm)) {
    return vm;
  }
  // Else it might be a light DOM component. Walk up the tree trying to find the owner
  let parentElement = elm;
  while (!isNull(parentElement = parentElement.parentElement)) {
    if (isLightningElement(parentElement)) {
      const vm = getAssociatedVMIfPresent(parentElement);
      if (!isUndefined$1(vm)) {
        return vm;
      }
    }
  }
  // If we return undefined, it's because the element was rendered wholly outside a LightningElement
}

function checkAndReportViolation(elm, prop, isSetter, setValue) {
  if (!isLightningElement(elm)) {
    const vm = findVM(elm);
    if (process.env.NODE_ENV !== 'production') {
      logWarnOnce(`Element <${elm.tagName.toLowerCase()}> ` + (isUndefined$1(vm) ? '' : `owned by <${vm.elm.tagName.toLowerCase()}> `) + `uses non-standard property "${prop}". This will be removed in a future version of LWC. ` + `See https://sfdc.co/deprecated-aria`);
    }
    let setValueType;
    if (isSetter) {
      // `typeof null` is "object" which is not very useful for detecting null.
      // We mostly want to know null vs undefined vs other types here, due to
      // https://github.com/salesforce/lwc/issues/3284
      setValueType = isNull(setValue) ? 'null' : typeof setValue;
    }
    report("NonStandardAriaReflection" /* ReportingEventId.NonStandardAriaReflection */, {
      tagName: vm === null || vm === void 0 ? void 0 : vm.tagName,
      propertyName: prop,
      isSetter,
      setValueType
    });
  }
}
function enableDetection() {
  const {
    prototype
  } = Element;
  for (const prop of NON_STANDARD_ARIA_PROPS) {
    const descriptor = getOwnPropertyDescriptor$1(prototype, prop);
    // The descriptor should exist because the @lwc/aria-reflection polyfill has run by now.
    // This happens automatically because of the ordering of imports.
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (isUndefined$1(descriptor) || isUndefined$1(descriptor.get) || isUndefined$1(descriptor.set)) {
        // should never happen
        throw new Error('detect-non-standard-aria.ts loaded before @lwc/aria-reflection');
      }
    }
    // @ts-ignore
    const {
      get,
      set
    } = descriptor;
    defineProperty(prototype, prop, {
      get() {
        checkAndReportViolation(this, prop, false, undefined);
        return get.call(this);
      },
      set(val) {
        checkAndReportViolation(this, prop, true, val);
        return set.call(this, val);
      },
      configurable: true,
      enumerable: true
    });
  }
}
// No point in running this code if we're not in a browser, or if the global polyfill is not loaded
{
  if (!lwcRuntimeFlags.DISABLE_ARIA_REFLECTION_POLYFILL) {
    // Always run detection in dev mode, so we can at least print to the console
    if (process.env.NODE_ENV !== 'production') {
      enableDetection();
    }
  }
}

/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// flag indicating if the hydration recovered from the DOM mismatch
let hasMismatch = false;
function hydrateRoot(vm) {
  hasMismatch = false;
  runConnectedCallback(vm);
  hydrateVM(vm);
  if (hasMismatch) {
    logError('Hydration completed with errors.', vm);
  }
}
function hydrateVM(vm) {
  const children = renderComponent(vm);
  vm.children = children;
  const {
    renderRoot: parentNode,
    renderer: {
      getFirstChild
    }
  } = vm;
  hydrateChildren(getFirstChild(parentNode), children, parentNode, vm);
  runRenderedCallback(vm);
}
function hydrateNode(node, vnode, renderer) {
  var _a, _b;
  let hydratedNode;
  switch (vnode.type) {
    case 0 /* VNodeType.Text */:
      // VText has no special capability, fallback to the owner's renderer
      hydratedNode = hydrateText(node, vnode, renderer);
      break;
    case 1 /* VNodeType.Comment */:
      // VComment has no special capability, fallback to the owner's renderer
      hydratedNode = hydrateComment(node, vnode, renderer);
      break;
    case 4 /* VNodeType.Static */:
      // VStatic are cacheable and cannot have custom renderer associated to them
      hydratedNode = hydrateStaticElement(node, vnode, renderer);
      break;
    case 5 /* VNodeType.Fragment */:
      // a fragment does not represent any element, therefore there is no need to use a custom renderer.
      hydratedNode = hydrateFragment(node, vnode, renderer);
      break;
    case 2 /* VNodeType.Element */:
      hydratedNode = hydrateElement(node, vnode, (_a = vnode.data.renderer) !== null && _a !== void 0 ? _a : renderer);
      break;
    case 3 /* VNodeType.CustomElement */:
      hydratedNode = hydrateCustomElement(node, vnode, (_b = vnode.data.renderer) !== null && _b !== void 0 ? _b : renderer);
      break;
  }
  return renderer.nextSibling(hydratedNode);
}
const NODE_VALUE_PROP = 'nodeValue';
const PARENT_NODE_PROP = 'parentNode';
const TAG_NAME_PROP = 'tagName';
function textNodeContentsAreEqual(node, vnode, renderer) {
  const {
    getProperty
  } = renderer;
  const nodeValue = getProperty(node, NODE_VALUE_PROP);
  if (nodeValue === vnode.text) {
    return true;
  }
  // Special case for empty text nodes – these are serialized differently on the server
  // See https://github.com/salesforce/lwc/pull/2656
  if (nodeValue === '\u200D' && vnode.text === '') {
    return true;
  }
  // Special case for text nodes inside `<style>` tags – these are escaped when rendered server-size,
  // but not when generated by the engine client-side.
  const parentNode = getProperty(node, PARENT_NODE_PROP);
  // Should never be null, but just to be safe, we check.
  /* istanbul ignore else */
  if (!isNull(parentNode)) {
    const tagName = getProperty(parentNode, TAG_NAME_PROP);
    // If the tagName is STYLE, then the following condition should always be true.
    // The LWC compiler blocks using `<style>`s inside of templates, so it should be impossible
    // for component authors to render different `<style>` text content on the client and server.
    // But just to be safe, we check.
    /* istanbul ignore next */
    if (tagName === 'STYLE' && htmlEscape(vnode.text) === nodeValue) {
      return true;
    }
  }
  return false;
}
function hydrateText(node, vnode, renderer) {
  var _a;
  if (!hasCorrectNodeType(vnode, node, 3 /* EnvNodeTypes.TEXT */, renderer)) {
    return handleMismatch(node, vnode, renderer);
  }
  if (process.env.NODE_ENV !== 'production') {
    if (!textNodeContentsAreEqual(node, vnode, renderer)) {
      logWarn('Hydration mismatch: text values do not match, will recover from the difference', vnode.owner);
    }
  }
  const {
    setText
  } = renderer;
  setText(node, (_a = vnode.text) !== null && _a !== void 0 ? _a : null);
  vnode.elm = node;
  return node;
}
function hydrateComment(node, vnode, renderer) {
  var _a;
  if (!hasCorrectNodeType(vnode, node, 8 /* EnvNodeTypes.COMMENT */, renderer)) {
    return handleMismatch(node, vnode, renderer);
  }
  if (process.env.NODE_ENV !== 'production') {
    const {
      getProperty
    } = renderer;
    const nodeValue = getProperty(node, NODE_VALUE_PROP);
    if (nodeValue !== vnode.text) {
      logWarn('Hydration mismatch: comment values do not match, will recover from the difference', vnode.owner);
    }
  }
  const {
    setProperty
  } = renderer;
  setProperty(node, NODE_VALUE_PROP, (_a = vnode.text) !== null && _a !== void 0 ? _a : null);
  vnode.elm = node;
  return node;
}
function hydrateStaticElement(elm, vnode, renderer) {
  if (!areCompatibleNodes(vnode.fragment, elm, vnode, renderer)) {
    return handleMismatch(elm, vnode, renderer);
  }
  vnode.elm = elm;
  return elm;
}
function hydrateFragment(elm, vnode, renderer) {
  const {
    children,
    owner
  } = vnode;
  hydrateChildren(elm, children, renderer.getProperty(elm, 'parentNode'), owner);
  return vnode.elm = children[children.length - 1].elm;
}
function hydrateElement(elm, vnode, renderer) {
  if (!hasCorrectNodeType(vnode, elm, 1 /* EnvNodeTypes.ELEMENT */, renderer) || !isMatchingElement(vnode, elm, renderer)) {
    return handleMismatch(elm, vnode, renderer);
  }
  vnode.elm = elm;
  const {
    owner
  } = vnode;
  const {
    context
  } = vnode.data;
  const isDomManual = Boolean(!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === "manual" /* LwcDomMode.Manual */);
  if (isDomManual) {
    // it may be that this element has lwc:inner-html, we need to diff and in case are the same,
    // remove the innerHTML from props so it reuses the existing dom elements.
    const {
      data: {
        props
      }
    } = vnode;
    const {
      getProperty
    } = renderer;
    if (!isUndefined$1(props) && !isUndefined$1(props.innerHTML)) {
      if (getProperty(elm, 'innerHTML') === props.innerHTML) {
        // Do a shallow clone since VNodeData may be shared across VNodes due to hoist optimization
        vnode.data = Object.assign(Object.assign({}, vnode.data), {
          props: cloneAndOmitKey(props, 'innerHTML')
        });
      } else {
        if (process.env.NODE_ENV !== 'production') {
          logWarn(`Mismatch hydrating element <${getProperty(elm, 'tagName').toLowerCase()}>: innerHTML values do not match for element, will recover from the difference`, owner);
        }
      }
    }
  }
  patchElementPropsAndAttrs(vnode, renderer);
  if (!isDomManual) {
    const {
      getFirstChild
    } = renderer;
    hydrateChildren(getFirstChild(elm), vnode.children, elm, owner);
  }
  return elm;
}
function hydrateCustomElement(elm, vnode, renderer) {
  if (!hasCorrectNodeType(vnode, elm, 1 /* EnvNodeTypes.ELEMENT */, renderer) || !isMatchingElement(vnode, elm, renderer)) {
    return handleMismatch(elm, vnode, renderer);
  }
  const {
    sel,
    mode,
    ctor,
    owner
  } = vnode;
  const vm = createVM(elm, ctor, renderer, {
    mode,
    owner,
    tagName: sel,
    hydrated: true
  });
  vnode.elm = elm;
  vnode.vm = vm;
  allocateChildren(vnode, vm);
  patchElementPropsAndAttrs(vnode, renderer);
  // Insert hook section:
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(vm.state === 0 /* VMState.created */, `${vm} cannot be recycled.`);
  }
  runConnectedCallback(vm);
  if (vm.renderMode !== 0 /* RenderMode.Light */) {
    const {
      getFirstChild
    } = renderer;
    // VM is not rendering in Light DOM, we can proceed and hydrate the slotted content.
    // Note: for Light DOM, this is handled while hydrating the VM
    hydrateChildren(getFirstChild(elm), vnode.children, elm, vm);
  }
  hydrateVM(vm);
  return elm;
}
function hydrateChildren(node, children, parentNode, owner) {
  let hasWarned = false;
  let nextNode = node;
  let anchor = null;
  const {
    renderer
  } = owner;
  for (let i = 0; i < children.length; i++) {
    const childVnode = children[i];
    if (!isNull(childVnode)) {
      if (nextNode) {
        nextNode = hydrateNode(nextNode, childVnode, renderer);
        anchor = childVnode.elm;
      } else {
        hasMismatch = true;
        if (process.env.NODE_ENV !== 'production') {
          if (!hasWarned) {
            hasWarned = true;
            logError(`Hydration mismatch: incorrect number of rendered nodes. Client produced more nodes than the server.`, owner);
          }
        }
        mount(childVnode, parentNode, renderer, anchor);
        anchor = childVnode.elm;
      }
    }
  }
  if (nextNode) {
    hasMismatch = true;
    if (process.env.NODE_ENV !== 'production') {
      if (!hasWarned) {
        logError(`Hydration mismatch: incorrect number of rendered nodes. Server rendered more nodes than the client.`, owner);
      }
    }
    // nextSibling is mostly harmless, and since we don't have
    // a good reference to what element to act upon, we instead
    // rely on the vm's associated renderer for navigating to the
    // next node in the list to be hydrated.
    const {
      nextSibling
    } = renderer;
    do {
      const current = nextNode;
      nextNode = nextSibling(nextNode);
      removeNode(current, parentNode, renderer);
    } while (nextNode);
  }
}
function handleMismatch(node, vnode, renderer) {
  hasMismatch = true;
  const {
    getProperty
  } = renderer;
  const parentNode = getProperty(node, 'parentNode');
  mount(vnode, parentNode, renderer, node);
  removeNode(node, parentNode, renderer);
  return vnode.elm;
}
function patchElementPropsAndAttrs(vnode, renderer) {
  applyEventListeners(vnode, renderer);
  patchProps(null, vnode, renderer);
}
function hasCorrectNodeType(vnode, node, nodeType, renderer) {
  const {
    getProperty
  } = renderer;
  if (getProperty(node, 'nodeType') !== nodeType) {
    if (process.env.NODE_ENV !== 'production') {
      logError('Hydration mismatch: incorrect node type received', vnode.owner);
    }
    return false;
  }
  return true;
}
function isMatchingElement(vnode, elm, renderer) {
  const {
    getProperty
  } = renderer;
  if (vnode.sel.toLowerCase() !== getProperty(elm, 'tagName').toLowerCase()) {
    if (process.env.NODE_ENV !== 'production') {
      logError(`Hydration mismatch: expecting element with tag "${vnode.sel.toLowerCase()}" but found "${getProperty(elm, 'tagName').toLowerCase()}".`, vnode.owner);
    }
    return false;
  }
  const hasIncompatibleAttrs = validateAttrs(vnode, elm, renderer);
  const hasIncompatibleClass = validateClassAttr(vnode, elm, renderer);
  const hasIncompatibleStyle = validateStyleAttr(vnode, elm, renderer);
  return hasIncompatibleAttrs && hasIncompatibleClass && hasIncompatibleStyle;
}
function attributeValuesAreEqual(vnodeValue, value) {
  const vnodeValueAsString = String(vnodeValue);
  if (vnodeValueAsString === value) {
    return true;
  }
  // If the expected value is null, this means that the attribute does not exist. In that case,
  // we accept any nullish value (undefined or null).
  if (isNull(value) && (isUndefined$1(vnodeValue) || isNull(vnodeValue))) {
    return true;
  }
  // In all other cases, the two values are not considered equal
  return false;
}
function validateAttrs(vnode, elm, renderer) {
  const {
    data: {
      attrs = {}
    }
  } = vnode;
  let nodesAreCompatible = true;
  // Validate attributes, though we could always recovery from those by running the update mods.
  // Note: intentionally ONLY matching vnodes.attrs to elm.attrs, in case SSR is adding extra attributes.
  for (const [attrName, attrValue] of Object.entries(attrs)) {
    const {
      owner
    } = vnode;
    const {
      getAttribute
    } = renderer;
    const elmAttrValue = getAttribute(elm, attrName);
    if (!attributeValuesAreEqual(attrValue, elmAttrValue)) {
      if (process.env.NODE_ENV !== 'production') {
        const {
          getProperty
        } = renderer;
        logError(`Mismatch hydrating element <${getProperty(elm, 'tagName').toLowerCase()}>: attribute "${attrName}" has different values, expected "${attrValue}" but found ${isNull(elmAttrValue) ? 'null' : `"${elmAttrValue}"`}`, owner);
      }
      nodesAreCompatible = false;
    }
  }
  return nodesAreCompatible;
}
function validateClassAttr(vnode, elm, renderer) {
  const {
    data,
    owner
  } = vnode;
  let {
    className,
    classMap
  } = data;
  const {
    getProperty,
    getClassList
  } = renderer;
  const scopedToken = getScopeTokenClass(owner);
  const stylesheetTokenHost = isVCustomElement(vnode) ? getStylesheetTokenHost(vnode) : null;
  // Classnames for scoped CSS are added directly to the DOM during rendering,
  // or to the VDOM on the server in the case of SSR. As such, these classnames
  // are never present in VDOM nodes in the browser.
  //
  // Consequently, hydration mismatches will occur if scoped CSS token classnames
  // are rendered during SSR. This needs to be accounted for when validating.
  if (!isNull(scopedToken) || !isNull(stylesheetTokenHost)) {
    if (!isUndefined$1(className)) {
      // The order of the className should be scopedToken className stylesheetTokenHost
      const classTokens = [scopedToken, className, stylesheetTokenHost];
      const classNames = ArrayFilter.call(classTokens, token => !isNull(token));
      className = ArrayJoin.call(classNames, ' ');
    } else if (!isUndefined$1(classMap)) {
      classMap = Object.assign(Object.assign(Object.assign({}, classMap), !isNull(scopedToken) ? {
        [scopedToken]: true
      } : {}), !isNull(stylesheetTokenHost) ? {
        [stylesheetTokenHost]: true
      } : {});
    } else {
      // The order of the className should be scopedToken stylesheetTokenHost
      const classTokens = [scopedToken, stylesheetTokenHost];
      const classNames = ArrayFilter.call(classTokens, token => !isNull(token));
      if (classNames.length) {
        className = ArrayJoin.call(classNames, ' ');
      }
    }
  }
  let nodesAreCompatible = true;
  let readableVnodeClassname;
  const elmClassName = getProperty(elm, 'className');
  if (!isUndefined$1(className) && String(className) !== elmClassName) {
    // className is used when class is bound to an expr.
    nodesAreCompatible = false;
    readableVnodeClassname = className;
  } else if (!isUndefined$1(classMap)) {
    // classMap is used when class is set to static value.
    const classList = getClassList(elm);
    let computedClassName = '';
    // all classes from the vnode should be in the element.classList
    for (const name in classMap) {
      computedClassName += ' ' + name;
      if (!classList.contains(name)) {
        nodesAreCompatible = false;
      }
    }
    readableVnodeClassname = computedClassName.trim();
    if (classList.length > keys(classMap).length) {
      nodesAreCompatible = false;
    }
  } else if (isUndefined$1(className) && elmClassName !== '') {
    // SSR contains a className but client-side VDOM does not
    nodesAreCompatible = false;
    readableVnodeClassname = '';
  }
  if (!nodesAreCompatible) {
    if (process.env.NODE_ENV !== 'production') {
      logError(`Mismatch hydrating element <${getProperty(elm, 'tagName').toLowerCase()}>: attribute "class" has different values, expected "${readableVnodeClassname}" but found "${elmClassName}"`, vnode.owner);
    }
  }
  return nodesAreCompatible;
}
function validateStyleAttr(vnode, elm, renderer) {
  const {
    data: {
      style,
      styleDecls
    }
  } = vnode;
  const {
    getAttribute
  } = renderer;
  const elmStyle = getAttribute(elm, 'style') || '';
  let vnodeStyle;
  let nodesAreCompatible = true;
  if (!isUndefined$1(style) && style !== elmStyle) {
    nodesAreCompatible = false;
    vnodeStyle = style;
  } else if (!isUndefined$1(styleDecls)) {
    const parsedVnodeStyle = parseStyleText(elmStyle);
    const expectedStyle = [];
    // styleMap is used when style is set to static value.
    for (let i = 0, n = styleDecls.length; i < n; i++) {
      const [prop, value, important] = styleDecls[i];
      expectedStyle.push(`${prop}: ${value + (important ? ' important!' : '')}`);
      const parsedPropValue = parsedVnodeStyle[prop];
      if (isUndefined$1(parsedPropValue)) {
        nodesAreCompatible = false;
      } else if (!parsedPropValue.startsWith(value)) {
        nodesAreCompatible = false;
      } else if (important && !parsedPropValue.endsWith('!important')) {
        nodesAreCompatible = false;
      }
    }
    if (keys(parsedVnodeStyle).length > styleDecls.length) {
      nodesAreCompatible = false;
    }
    vnodeStyle = ArrayJoin.call(expectedStyle, ';');
  }
  if (!nodesAreCompatible) {
    if (process.env.NODE_ENV !== 'production') {
      const {
        getProperty
      } = renderer;
      logError(`Mismatch hydrating element <${getProperty(elm, 'tagName').toLowerCase()}>: attribute "style" has different values, expected "${vnodeStyle}" but found "${elmStyle}".`, vnode.owner);
    }
  }
  return nodesAreCompatible;
}
function areCompatibleNodes(client, ssr, vnode, renderer) {
  const {
    getProperty,
    getAttribute
  } = renderer;
  if (getProperty(client, 'nodeType') === 3 /* EnvNodeTypes.TEXT */) {
    if (!hasCorrectNodeType(vnode, ssr, 3 /* EnvNodeTypes.TEXT */, renderer)) {
      return false;
    }
    return getProperty(client, NODE_VALUE_PROP) === getProperty(ssr, NODE_VALUE_PROP);
  }
  if (getProperty(client, 'nodeType') === 8 /* EnvNodeTypes.COMMENT */) {
    if (!hasCorrectNodeType(vnode, ssr, 8 /* EnvNodeTypes.COMMENT */, renderer)) {
      return false;
    }
    return getProperty(client, NODE_VALUE_PROP) === getProperty(ssr, NODE_VALUE_PROP);
  }
  if (!hasCorrectNodeType(vnode, ssr, 1 /* EnvNodeTypes.ELEMENT */, renderer)) {
    return false;
  }
  let isCompatibleElements = true;
  if (getProperty(client, 'tagName') !== getProperty(ssr, 'tagName')) {
    if (process.env.NODE_ENV !== 'production') {
      logError(`Hydration mismatch: expecting element with tag "${getProperty(client, 'tagName').toLowerCase()}" but found "${getProperty(ssr, 'tagName').toLowerCase()}".`, vnode.owner);
    }
    return false;
  }
  const clientAttrsNames = getProperty(client, 'getAttributeNames').call(client);
  clientAttrsNames.forEach(attrName => {
    if (getAttribute(client, attrName) !== getAttribute(ssr, attrName)) {
      logError(`Mismatch hydrating element <${getProperty(client, 'tagName').toLowerCase()}>: attribute "${attrName}" has different values, expected "${getAttribute(client, attrName)}" but found "${getAttribute(ssr, attrName)}"`, vnode.owner);
      isCompatibleElements = false;
    }
  });
  return isCompatibleElements;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// See @lwc/engine-core/src/framework/template.ts
const TEMPLATE_PROPS = ['slots', 'stylesheetToken', 'stylesheets', 'renderMode'];
// Expandos that may be placed on a stylesheet factory function, and which are meaningful to LWC at runtime
const STYLESHEET_PROPS = [
// SEE `KEY__SCOPED_CSS` in @lwc/style-compiler
'$scoped$'];
// Via https://www.npmjs.com/package/object-observer
const ARRAY_MUTATION_METHODS = ['pop', 'push', 'shift', 'unshift', 'reverse', 'sort', 'fill', 'splice', 'copyWithin'];
let mutationTrackingDisabled = false;
function getOriginalArrayMethod(prop) {
  switch (prop) {
    case 'pop':
      return ArrayPop;
    case 'push':
      return ArrayPush$1;
    case 'shift':
      return ArrayShift;
    case 'unshift':
      return ArrayUnshift;
    case 'reverse':
      return ArrayReverse;
    case 'sort':
      return ArraySort;
    case 'fill':
      return ArrayFill;
    case 'splice':
      return ArraySplice;
    case 'copyWithin':
      return ArrayCopyWithin;
  }
}
function reportViolation(type, eventId, prop) {
  if (process.env.NODE_ENV !== 'production') {
    logWarnOnce(`Mutating the "${prop}" property on a ${type} ` + `is deprecated and will be removed in a future version of LWC. ` + `See: https://sfdc.co/template-mutation`);
  }
}
function reportTemplateViolation(prop) {
  reportViolation('template', "TemplateMutation" /* ReportingEventId.TemplateMutation */, prop);
}
function reportStylesheetViolation(prop) {
  reportViolation('stylesheet', "StylesheetMutation" /* ReportingEventId.StylesheetMutation */, prop);
}
// Warn if the user tries to mutate a stylesheets array, e.g.:
// `tmpl.stylesheets.push(someStylesheetFunction)`
function warnOnArrayMutation(stylesheets) {
  // We can't handle users calling Array.prototype.slice.call(tmpl.stylesheets), but
  // we can at least warn when they use the most common mutation methods.
  for (const prop of ARRAY_MUTATION_METHODS) {
    const originalArrayMethod = getOriginalArrayMethod(prop);
    stylesheets[prop] = function arrayMutationWarningWrapper() {
      reportTemplateViolation('stylesheets');
      // @ts-ignore
      return originalArrayMethod.apply(this, arguments);
    };
  }
}
// Warn if the user tries to mutate a stylesheet factory function, e.g.:
// `stylesheet.$scoped$ = true`
function warnOnStylesheetFunctionMutation(stylesheet) {
  for (const prop of STYLESHEET_PROPS) {
    let value = stylesheet[prop];
    defineProperty(stylesheet, prop, {
      enumerable: true,
      configurable: true,
      get() {
        return value;
      },
      set(newValue) {
        reportStylesheetViolation(prop);
        value = newValue;
      }
    });
  }
}
// Warn on either array or stylesheet (function) mutation, in a deeply-nested array
function trackStylesheetsMutation(stylesheets) {
  traverseStylesheets(stylesheets, subStylesheets => {
    if (isArray$1(subStylesheets)) {
      warnOnArrayMutation(subStylesheets);
    } else {
      warnOnStylesheetFunctionMutation(subStylesheets);
    }
  });
}
// Deeply freeze the entire array (of arrays) of stylesheet factory functions
function deepFreeze(stylesheets) {
  traverseStylesheets(stylesheets, subStylesheets => {
    freeze(subStylesheets);
  });
}
// Deep-traverse an array (of arrays) of stylesheet factory functions, and call the callback for every array/function
function traverseStylesheets(stylesheets, callback) {
  callback(stylesheets);
  for (let i = 0; i < stylesheets.length; i++) {
    const stylesheet = stylesheets[i];
    if (isArray$1(stylesheet)) {
      traverseStylesheets(stylesheet, callback);
    } else {
      callback(stylesheet);
    }
  }
}
function trackMutations(tmpl) {
  if (!isUndefined$1(tmpl.stylesheets)) {
    trackStylesheetsMutation(tmpl.stylesheets);
  }
  for (const prop of TEMPLATE_PROPS) {
    let value = tmpl[prop];
    defineProperty(tmpl, prop, {
      enumerable: true,
      configurable: true,
      get() {
        return value;
      },
      set(newValue) {
        if (!mutationTrackingDisabled) {
          reportTemplateViolation(prop);
        }
        value = newValue;
      }
    });
  }
  const originalDescriptor = getOwnPropertyDescriptor$1(tmpl, 'stylesheetTokens');
  defineProperty(tmpl, 'stylesheetTokens', {
    enumerable: true,
    configurable: true,
    get: originalDescriptor.get,
    set(value) {
      reportTemplateViolation('stylesheetTokens');
      // Avoid logging/reporting twice (for both stylesheetToken and stylesheetTokens)
      mutationTrackingDisabled = true;
      originalDescriptor.set.call(this, value);
      mutationTrackingDisabled = false;
    }
  });
}
function addLegacyStylesheetTokensShim(tmpl) {
  // When ENABLE_FROZEN_TEMPLATE is false, then we shim stylesheetTokens on top of stylesheetToken for anyone who
  // is accessing the old internal API (backwards compat). Details: https://salesforce.quip.com/v1rmAFu2cKAr
  defineProperty(tmpl, 'stylesheetTokens', {
    enumerable: true,
    configurable: true,
    get() {
      const {
        stylesheetToken
      } = this;
      if (isUndefined$1(stylesheetToken)) {
        return stylesheetToken;
      }
      // Shim for the old `stylesheetTokens` property
      // See https://github.com/salesforce/lwc/pull/2332/files#diff-7901555acef29969adaa6583185b3e9bce475cdc6f23e799a54e0018cb18abaa
      return {
        hostAttribute: `${stylesheetToken}-host`,
        shadowAttribute: stylesheetToken
      };
    },
    set(value) {
      // If the value is null or some other exotic object, you would be broken anyway in the past
      // because the engine would try to access hostAttribute/shadowAttribute, which would throw an error.
      // However it may be undefined in newer versions of LWC, so we need to guard against that case.
      this.stylesheetToken = isUndefined$1(value) ? undefined : value.shadowAttribute;
    }
  });
}
function freezeTemplate(tmpl) {
  // TODO [#2782]: remove this flag and delete the legacy behavior
  if (lwcRuntimeFlags.ENABLE_FROZEN_TEMPLATE) {
    // Deep freeze the template
    freeze(tmpl);
    if (!isUndefined$1(tmpl.stylesheets)) {
      deepFreeze(tmpl.stylesheets);
    }
  } else {
    // template is not frozen - shim, report, and warn
    // this shim should be applied in both dev and prod
    addLegacyStylesheetTokensShim(tmpl);
    // When ENABLE_FROZEN_TEMPLATE is false, we want to warn in dev mode whenever someone is mutating the template
    if (process.env.NODE_ENV !== 'production') {
      trackMutations(tmpl);
    }
  }
}
/* version: 2.40.1 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * Displays the header for a custom element.
 *
 * @param ce the custom element
 * @param componentInstance component instance associated with the custom element.
 */
function getHeaderForCustomElement(ce, componentInstance) {
  // [element]
  // LWC component instance: [vm.component]
  return ['div', {}, ['object', {
    object: ce,
    config: {
      skip: true
    }
  }], ['div', {}, ['span', {
    style: 'margin: 0 5px; color: red'
  }, 'LWC:'], ['object', {
    object: componentInstance
  }]]];
}
function getHeaderForComponentInstance(componentInstance, debugInfo) {
  if (keys(debugInfo).length === 0) {
    // there is no debug information, no need to customize this component instance
    return null;
  }
  // [component]
  // Debug information: [vm.debugInfo]
  return ['div', {}, ['object', {
    object: componentInstance,
    config: {
      skip: true
    }
  }], ['div', {}, ['span', {
    style: 'margin: 0 5px; color: red'
  }, 'Debug:'], ['object', {
    object: debugInfo
  }]]];
}
const LightningElementFormatter = {
  name: 'LightningElementFormatter',
  header(obj, config) {
    const vm = getAssociatedVMIfPresent(obj);
    if (!isUndefined$1(vm) && (isUndefined$1(config) || !config.skip)) {
      if (obj instanceof HTMLElement) {
        return getHeaderForCustomElement(obj, vm.component);
      } else {
        return getHeaderForComponentInstance(obj, vm.debugInfo);
      }
    }
    return null;
  },
  hasBody() {
    return false;
  }
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function init() {
  const devtoolsFormatters = _globalThis.devtoolsFormatters || [];
  ArrayPush$1.call(devtoolsFormatters, LightningElementFormatter);
  _globalThis.devtoolsFormatters = devtoolsFormatters;
}
if (process.env.NODE_ENV !== 'production') {
  init();
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
//
// Feature detection
//
// This check for constructable style sheets is similar to Fast's:
// https://github.com/microsoft/fast/blob/d49d1ec/packages/web-components/fast-element/src/dom.ts#L51-L53
// See also: https://github.com/whatwg/webidl/issues/1027#issuecomment-934510070
const supportsConstructableStylesheets = isFunction$1(CSSStyleSheet.prototype.replaceSync) && isArray$1(document.adoptedStyleSheets);
// The original adoptedStylesheet proposal used a frozen array. A follow-up proposal made the array mutable.
// Chromium 99+ and Firefox 101+ support mutable arrays. We check if the array is mutable, to ensure backward compat.
// (If the length is writable, then the array is mutable.) See: https://chromestatus.com/feature/5638996492288000
// TODO [#2828]: Re-evaluate this in the future once we drop support for older browser versions.
const supportsMutableAdoptedStyleSheets = supportsConstructableStylesheets && getOwnPropertyDescriptor$1(document.adoptedStyleSheets, 'length').writable;
// Detect IE, via https://stackoverflow.com/a/9851769
const isIE11$1 = !isUndefined$1(document.documentMode);
const stylesheetCache = new Map();
//
// Test utilities
//
// Only used in LWC's Karma tests
if (process.env.NODE_ENV === 'test-karma-lwc') {
  // @ts-ignore
  window.__lwcResetGlobalStylesheets = () => {
    stylesheetCache.clear();
  };
}
function createFreshStyleElement(content) {
  const elm = document.createElement('style');
  elm.type = 'text/css';
  elm.textContent = content;
  return elm;
}
function createStyleElement(content, cacheData) {
  const {
    element,
    usedElement
  } = cacheData;
  // If the <style> was already used, then we should clone it. We cannot insert
  // the same <style> in two places in the DOM.
  if (usedElement) {
    // For a mysterious reason, IE11 doesn't like the way we clone <style> nodes
    // and will render the incorrect styles if we do things that way. It's just
    // a perf optimization, so we can skip it for IE11.
    if (isIE11$1) {
      return createFreshStyleElement(content);
    }
    // This `<style>` may be repeated multiple times in the DOM, so cache it. It's a bit
    // faster to call `cloneNode()` on an existing node than to recreate it every time.
    return element.cloneNode(true);
  }
  // We don't clone every time, because that would be a perf tax on the first time
  cacheData.usedElement = true;
  return element;
}
function createConstructableStylesheet(content) {
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(content);
  return stylesheet;
}
function insertConstructableStylesheet(content, target, cacheData) {
  const {
    adoptedStyleSheets
  } = target;
  const {
    stylesheet
  } = cacheData;
  // Mutable adopted stylesheets are only supported in certain browsers.
  // The reason we use it is for perf: https://github.com/salesforce/lwc/pull/2683
  if (supportsMutableAdoptedStyleSheets) {
    adoptedStyleSheets.push(stylesheet);
  } else {
    target.adoptedStyleSheets = [...adoptedStyleSheets, stylesheet];
  }
}
function insertStyleElement(content, target, cacheData) {
  const elm = createStyleElement(content, cacheData);
  target.appendChild(elm);
}
function getCacheData(content, useConstructableStylesheet) {
  let cacheData = stylesheetCache.get(content);
  if (isUndefined$1(cacheData)) {
    cacheData = {
      stylesheet: undefined,
      element: undefined,
      roots: undefined,
      global: false,
      usedElement: false
    };
    stylesheetCache.set(content, cacheData);
  }
  // Create <style> elements or CSSStyleSheets on-demand, as needed
  if (useConstructableStylesheet && isUndefined$1(cacheData.stylesheet)) {
    cacheData.stylesheet = createConstructableStylesheet(content);
  } else if (!useConstructableStylesheet && isUndefined$1(cacheData.element)) {
    cacheData.element = createFreshStyleElement(content);
  }
  return cacheData;
}
function insertGlobalStylesheet(content) {
  // Force a <style> element for global stylesheets. See comment below.
  const cacheData = getCacheData(content, false);
  if (cacheData.global) {
    // already inserted
    return;
  }
  cacheData.global = true; // mark inserted
  // TODO [#2922]: use document.adoptedStyleSheets in supported browsers. Currently we can't, due to backwards compat.
  insertStyleElement(content, document.head, cacheData);
}
function insertLocalStylesheet(content, target) {
  const cacheData = getCacheData(content, supportsConstructableStylesheets);
  let {
    roots
  } = cacheData;
  if (isUndefined$1(roots)) {
    roots = cacheData.roots = new WeakSet(); // lazily initialize (not needed for global styles)
  } else if (roots.has(target)) {
    // already inserted
    return;
  }
  roots.add(target); // mark inserted
  // Constructable stylesheets are only supported in certain browsers:
  // https://caniuse.com/mdn-api_document_adoptedstylesheets
  // The reason we use it is for perf: https://github.com/salesforce/lwc/pull/2460
  if (supportsConstructableStylesheets) {
    insertConstructableStylesheet(content, target, cacheData);
  } else {
    // Fall back to <style> element
    insertStyleElement(content, target, cacheData);
  }
}
function insertStylesheet(content, target) {
  if (isUndefined$1(target)) {
    // global
    insertGlobalStylesheet(content);
  } else {
    // local
    insertLocalStylesheet(content, target);
  }
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function isCustomElementRegistryAvailable() {
  if (typeof customElements === 'undefined') {
    return false;
  }
  try {
    // dereference HTMLElement global because babel wraps globals in compat mode with a
    // _wrapNativeSuper()
    // This is a problem because LWCUpgradableElement extends renderer.HTMLElement which does not
    // get wrapped by babel.
    const HTMLElementAlias = HTMLElement;
    // In case we use compat mode with a modern browser, the compat mode transformation
    // invokes the DOM api with an .apply() or .call() to initialize any DOM api sub-classing,
    // which are not equipped to be initialized that way.
    class clazz extends HTMLElementAlias {
      /*LWC compiler v2.40.1*/
    }
    customElements.define('lwc-test-' + Math.floor(Math.random() * 1000000), clazz);
    new clazz();
    return true;
  } catch (_a) {
    return false;
  }
}
const hasCustomElements = isCustomElementRegistryAvailable();

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Creates a custom element for compat (legacy) browser environments
const createCustomElementCompat = (tagName, upgradeCallback) => {
  const elm = document.createElement(tagName);
  upgradeCallback(elm); // nothing to do with the result for now
  return elm;
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const cachedConstructors = new Map();
const elementsUpgradedOutsideLWC = new WeakSet();
let elementBeingUpgradedByLWC = false;
// Creates a constructor that is intended to be used directly as a custom element, except that the upgradeCallback is
// passed in to the constructor so LWC can reuse the same custom element constructor for multiple components.
// Another benefit is that only LWC can create components that actually do anything – if you do
// `customElements.define('x-foo')`, then you don't have access to the upgradeCallback, so it's a dummy custom element.
// This class should be created once per tag name.
const createUpgradableConstructor = (connectedCallback, disconnectedCallback) => {
  const hasConnectedCallback = !isUndefined$1(connectedCallback);
  const hasDisconnectedCallback = !isUndefined$1(disconnectedCallback);
  // TODO [#2972]: this class should expose observedAttributes as necessary
  class UpgradableConstructor extends HTMLElement {
    constructor(upgradeCallback) {
      super();
      // If the element is not created using lwc.createElement(), e.g. `document.createElement('x-foo')`,
      // then elementBeingUpgraded will be false
      if (elementBeingUpgradedByLWC) {
        upgradeCallback(this);
      } else if (hasConnectedCallback || hasDisconnectedCallback) {
        // If this element has connected or disconnected callbacks, then we need to keep track of
        // instances that were created outside LWC (i.e. not created by `lwc.createElement()`).
        // If the element has no connected or disconnected callbacks, then we don't need to track this.
        elementsUpgradedOutsideLWC.add(this);
        // TODO [#2970]: LWC elements cannot be upgraded via new Ctor()
        // Do we want to support this? Throw an error? Currently for backwards compat it's a no-op.
      }
    }
    /*LWC compiler v2.40.1*/
  }
  // Do not unnecessarily add a connectedCallback/disconnectedCallback, as it introduces perf overhead
  // See: https://github.com/salesforce/lwc/pull/3162#issuecomment-1311851174
  if (hasConnectedCallback) {
    UpgradableConstructor.prototype.connectedCallback = function () {
      if (!elementsUpgradedOutsideLWC.has(this)) {
        connectedCallback(this);
      }
    };
  }
  if (hasDisconnectedCallback) {
    UpgradableConstructor.prototype.disconnectedCallback = function () {
      if (!elementsUpgradedOutsideLWC.has(this)) {
        disconnectedCallback(this);
      }
    };
  }
  return UpgradableConstructor;
};
const createCustomElementUsingUpgradableConstructor = (tagName, upgradeCallback, connectedCallback, disconnectedCallback) => {
  // use global custom elements registry
  let UpgradableConstructor = cachedConstructors.get(tagName);
  if (isUndefined$1(UpgradableConstructor)) {
    if (!isUndefined$1(customElements.get(tagName))) {
      throw new Error(`Unexpected tag name "${tagName}". This name is a registered custom element, preventing LWC to upgrade the element.`);
    }
    UpgradableConstructor = createUpgradableConstructor(connectedCallback, disconnectedCallback);
    customElements.define(tagName, UpgradableConstructor);
    cachedConstructors.set(tagName, UpgradableConstructor);
  }
  elementBeingUpgradedByLWC = true;
  try {
    return new UpgradableConstructor(upgradeCallback);
  } finally {
    elementBeingUpgradedByLWC = false;
  }
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * We have two modes for creating custom elements:
 *
 * 1. Compat (legacy) browser support (e.g. IE11). Totally custom, doesn't rely on native browser APIs.
 * 2. "Upgradable constructor" custom element. This allows us to have two LWC components with the same tag name,
 *    via a trick: every custom element constructor we define in the registry is basically the same. It's essentially
 *    a dummy `class extends HTMLElement` that accepts an `upgradeCallback` in its constructor ("upgradable
 *    constructor"), which allows us to have completely customized functionality for different components.
 */
let createCustomElement;
if (hasCustomElements) {
  // use the global registry, with an upgradable constructor for the defined custom element
  createCustomElement = createCustomElementUsingUpgradableConstructor;
} else {
  // no registry available here
  createCustomElement = createCustomElementCompat;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * A factory function that produces a renderer.
 * Renderer encapsulates operations that are required to render an LWC component into the underlying
 * runtime environment. In the case of @lwc/enigne-dom, it is meant to be used in a DOM environment.
 * Example usage:
 * import { renderer, rendererFactory } from 'lwc';
 * const customRenderer = rendererFactory(renderer);
 *
 * @param baseRenderer Either null or the base renderer imported from 'lwc'.
 */
function rendererFactory(baseRenderer) {
  const renderer = function (exports) {
    /**
     * Copyright (C) 2018 salesforce.com, inc.
     */
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function invariant(value, msg) {
      if (!value) {
        throw new Error(`Invariant Violation: ${msg}`);
      }
    }
    function isTrue$1(value, msg) {
      if (!value) {
        throw new Error(`Assert Violation: ${msg}`);
      }
    }
    function isFalse$1(value, msg) {
      if (value) {
        throw new Error(`Assert Violation: ${msg}`);
      }
    }
    function fail(msg) {
      throw new Error(msg);
    }
    var assert = /*#__PURE__*/Object.freeze({
      __proto__: null,
      fail: fail,
      invariant: invariant,
      isFalse: isFalse$1,
      isTrue: isTrue$1
    });
    function isUndefined(obj) {
      return obj === undefined;
    }
    function isNull(obj) {
      return obj === null;
    }
    /** version: 2.40.1 */

    /*
     * Copyright (c) 2023, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    class WireContextSubscriptionEvent extends CustomEvent {
      constructor(adapterToken, {
        setNewContext,
        setDisconnectedCallback
      }) {
        super(adapterToken, {
          bubbles: true,
          composed: true
        });
        this.setNewContext = setNewContext;
        this.setDisconnectedCallback = setDisconnectedCallback;
      }
      /*LWC compiler v2.40.1*/
    }
    function registerContextConsumer(elm, adapterContextToken, subscriptionPayload) {
      dispatchEvent(elm, new WireContextSubscriptionEvent(adapterContextToken, subscriptionPayload));
    }
    function registerContextProvider(elm, adapterContextToken, onContextSubscription) {
      addEventListener(elm, adapterContextToken, evt => {
        evt.stopImmediatePropagation();
        const {
          setNewContext,
          setDisconnectedCallback
        } = evt;
        onContextSubscription({
          setNewContext,
          setDisconnectedCallback
        });
      });
    }

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    function cloneNode(node, deep) {
      return node.cloneNode(deep);
    }
    function createElement(tagName, namespace) {
      return isUndefined(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
    }
    function createText(content) {
      return document.createTextNode(content);
    }
    function createComment(content) {
      return document.createComment(content);
    }
    exports.createFragment = void 0;
    // IE11 lacks support for this feature
    const SUPPORTS_TEMPLATE = typeof HTMLTemplateElement === 'function';
    if (SUPPORTS_TEMPLATE) {
      // Parse the fragment HTML string into DOM
      exports.createFragment = function (html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
      };
    } else {
      // In browsers that don't support <template> (e.g. IE11), we need to be careful to wrap elements like
      // <td> in the proper container elements (e.g. <tbody>), because otherwise they will be parsed as null.
      // Via https://github.com/webcomponents/polyfills/blob/ee1db33/packages/template/template.js#L273-L280
      // With other elements added from:
      // https://github.com/sindresorhus/html-tags/blob/95dcdd5/index.js
      // Using the test:
      // document.createRange().createContextualFragment(`<${tag}></${tag}>`).firstChild === null
      // And omitting <html>, <head>, and <body> as these are not practical in an LWC component.
      const topLevelWrappingMap = {
        caption: ['table'],
        col: ['colgroup', 'table'],
        colgroup: ['table'],
        option: ['select'],
        tbody: ['table'],
        td: ['tr', 'tbody', 'table'],
        th: ['tr', 'tbody', 'table'],
        thead: ['table'],
        tfoot: ['table'],
        tr: ['tbody', 'table']
      };
      // Via https://github.com/webcomponents/polyfills/blob/ee1db33/packages/template/template.js#L282-L288
      const getTagName = function (text) {
        return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
      };
      // Via https://github.com/webcomponents/polyfills/blob/ee1db33/packages/template/template.js#L295-L320
      exports.createFragment = function (html) {
        const wrapperTags = topLevelWrappingMap[getTagName(html)];
        if (!isUndefined(wrapperTags)) {
          for (const wrapperTag of wrapperTags) {
            html = `<${wrapperTag}>${html}</${wrapperTag}>`;
          }
        }
        // For IE11, the document title must not be undefined, but it can be an empty string
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createHTMLDocument#browser_compatibility
        const doc = document.implementation.createHTMLDocument('');
        doc.body.innerHTML = html;
        let content = doc.body;
        if (!isUndefined(wrapperTags)) {
          for (let i = 0; i < wrapperTags.length; i++) {
            content = content.firstChild;
          }
        }
        return content.firstChild;
      };
    }
    function insert(node, parent, anchor) {
      parent.insertBefore(node, anchor);
    }
    function remove(node, parent) {
      parent.removeChild(node);
    }
    function nextSibling(node) {
      return node.nextSibling;
    }
    function attachShadow(element, options) {
      // `shadowRoot` will be non-null in two cases:
      //   1. upon initial load with an SSR-generated DOM, while in Shadow render mode
      //   2. when a webapp author places <c-app> in their static HTML and mounts their
      //      root component with customElement.define('c-app', Ctor)
      if (!isNull(element.shadowRoot)) {
        return element.shadowRoot;
      }
      return element.attachShadow(options);
    }
    function setText(node, content) {
      node.nodeValue = content;
    }
    function getProperty(node, key) {
      return node[key];
    }
    function setProperty(node, key, value) {
      node[key] = value;
    }
    function getAttribute(element, name, namespace) {
      return isUndefined(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
    }
    function setAttribute(element, name, value, namespace) {
      return isUndefined(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
    }
    function removeAttribute(element, name, namespace) {
      if (isUndefined(namespace)) {
        element.removeAttribute(name);
      } else {
        element.removeAttributeNS(namespace, name);
      }
    }
    function addEventListener(target, type, callback, options) {
      target.addEventListener(type, callback, options);
    }
    function removeEventListener(target, type, callback, options) {
      target.removeEventListener(type, callback, options);
    }
    function dispatchEvent(target, event) {
      return target.dispatchEvent(event);
    }
    function getClassList(element) {
      return element.classList;
    }
    function setCSSStyleProperty(element, name, value, important) {
      // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
      // represent elements in the engine?
      element.style.setProperty(name, value, important ? 'important' : '');
    }
    function getBoundingClientRect(element) {
      return element.getBoundingClientRect();
    }
    function querySelector(element, selectors) {
      return element.querySelector(selectors);
    }
    function querySelectorAll(element, selectors) {
      return element.querySelectorAll(selectors);
    }
    function getElementsByTagName(element, tagNameOrWildCard) {
      return element.getElementsByTagName(tagNameOrWildCard);
    }
    function getElementsByClassName(element, names) {
      return element.getElementsByClassName(names);
    }
    function getChildren(element) {
      return element.children;
    }
    function getChildNodes(element) {
      return element.childNodes;
    }
    function getFirstChild(element) {
      return element.firstChild;
    }
    function getFirstElementChild(element) {
      return element.firstElementChild;
    }
    function getLastChild(element) {
      return element.lastChild;
    }
    function getLastElementChild(element) {
      return element.lastElementChild;
    }
    function isConnected(node) {
      return node.isConnected;
    }
    function assertInstanceOfHTMLElement(elm, msg) {
      assert.invariant(elm instanceof HTMLElement, msg);
    }
    function ownerDocument(element) {
      return element.ownerDocument;
    }
    exports.addEventListener = addEventListener;
    exports.assertInstanceOfHTMLElement = assertInstanceOfHTMLElement;
    exports.attachShadow = attachShadow;
    exports.cloneNode = cloneNode;
    exports.createComment = createComment;
    exports.createElement = createElement;
    exports.createText = createText;
    exports.dispatchEvent = dispatchEvent;
    exports.getAttribute = getAttribute;
    exports.getBoundingClientRect = getBoundingClientRect;
    exports.getChildNodes = getChildNodes;
    exports.getChildren = getChildren;
    exports.getClassList = getClassList;
    exports.getElementsByClassName = getElementsByClassName;
    exports.getElementsByTagName = getElementsByTagName;
    exports.getFirstChild = getFirstChild;
    exports.getFirstElementChild = getFirstElementChild;
    exports.getLastChild = getLastChild;
    exports.getLastElementChild = getLastElementChild;
    exports.getProperty = getProperty;
    exports.insert = insert;
    exports.isConnected = isConnected;
    exports.nextSibling = nextSibling;
    exports.ownerDocument = ownerDocument;
    exports.querySelector = querySelector;
    exports.querySelectorAll = querySelectorAll;
    exports.registerContextConsumer = registerContextConsumer;
    exports.registerContextProvider = registerContextProvider;
    exports.remove = remove;
    exports.removeAttribute = removeAttribute;
    exports.removeEventListener = removeEventListener;
    exports.setAttribute = setAttribute;
    exports.setCSSStyleProperty = setCSSStyleProperty;
    exports.setProperty = setProperty;
    exports.setText = setText;
    return exports;
  }({});
  // Meant to inherit any properties passed via the base renderer as the argument to the factory.
  Object.setPrototypeOf(renderer, baseRenderer);
  return renderer;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * The base renderer that will be used by engine-core.
 * This will be used for DOM operations when lwc is running in a browser environment.
 */
const renderer = assign(
// The base renderer will invoke the factory with null and assign additional properties that are
// shared across renderers
rendererFactory(null),
// Properties that are either not required to be sandboxed or rely on a globally shared information
{
  // insertStyleSheet implementation shares a global cache of stylesheet data
  insertStylesheet,
  // relies on a shared global cache
  createCustomElement,
  isNativeShadowDefined: _globalThis[KEY__IS_NATIVE_SHADOW_ROOT_DEFINED],
  isSyntheticShadowDefined: hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN)
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function resetShadowRootAndLightDom(element, Ctor) {
  if (element.shadowRoot) {
    const shadowRoot = element.shadowRoot;
    while (!isNull(shadowRoot.firstChild)) {
      shadowRoot.removeChild(shadowRoot.firstChild);
    }
  }
  if (Ctor.renderMode === 'light') {
    while (!isNull(element.firstChild)) {
      element.removeChild(element.firstChild);
    }
  }
}
function createVMWithProps(element, Ctor, props) {
  const vm = createVM(element, Ctor, renderer, {
    mode: 'open',
    owner: null,
    tagName: element.tagName.toLowerCase(),
    hydrated: true
  });
  for (const [key, value] of Object.entries(props)) {
    element[key] = value;
  }
  return vm;
}
function hydrateComponent(element, Ctor, props = {}) {
  if (!(element instanceof Element)) {
    throw new TypeError(`"hydrateComponent" expects a valid DOM element as the first parameter but instead received ${element}.`);
  }
  if (!isFunction$1(Ctor)) {
    throw new TypeError(`"hydrateComponent" expects a valid component constructor as the second parameter but instead received ${Ctor}.`);
  }
  if (!isObject(props) || isNull(props)) {
    throw new TypeError(`"hydrateComponent" expects an object as the third parameter but instead received ${props}.`);
  }
  if (getAssociatedVMIfPresent(element)) {
    /* eslint-disable-next-line no-console */
    console.warn(`"hydrateComponent" expects an element that is not hydrated.`, element);
    return;
  }
  try {
    const vm = createVMWithProps(element, Ctor, props);
    hydrateRoot(vm);
  } catch (e) {
    // Fallback: In case there's an error while hydrating, let's log the error, and replace the element content
    //           with the client generated DOM.
    /* eslint-disable-next-line no-console */
    console.error('Recovering from error while hydrating: ', e);
    // We want to preserve the element, so we need to reset the shadowRoot and light dom.
    resetShadowRootAndLightDom(element, Ctor);
    // we need to recreate the vm with the hydration flag on, so it re-uses the existing shadowRoot.
    createVMWithProps(element, Ctor, props);
    connectRootElement(element);
  }
}
// Note: WeakSet is not supported in IE11, and the polyfill is not performant enough.
//       This WeakSet usage is valid because this functionality is not meant to run in IE11.
const hydratedCustomElements = new WeakSet();
function buildCustomElementConstructor(Ctor) {
  var _a;
  const HtmlPrototype = getComponentHtmlPrototype(Ctor);
  const {
    observedAttributes
  } = HtmlPrototype;
  const {
    attributeChangedCallback
  } = HtmlPrototype.prototype;
  return _a = class extends HTMLElement {
    constructor() {
      super();
      if (this.isConnected) {
        // this if block is hit when there's already an un-upgraded element in the DOM with the same tag name.
        hydrateComponent(this, Ctor, {});
        hydratedCustomElements.add(this);
      } else {
        createVM(this, Ctor, renderer, {
          mode: 'open',
          owner: null,
          tagName: this.tagName
        });
      }
    }
    connectedCallback() {
      if (hydratedCustomElements.has(this)) {
        // This is an un-upgraded element that was hydrated in the constructor.
        hydratedCustomElements.delete(this);
      } else {
        connectRootElement(this);
      }
    }
    disconnectedCallback() {
      disconnectRootElement(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      attributeChangedCallback.call(this, name, oldValue, newValue);
    }
    /*LWC compiler v2.40.1*/
  }, _a.observedAttributes = observedAttributes, _a;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// TODO [#2472]: Remove this workaround when appropriate.
// eslint-disable-next-line @lwc/lwc-internal/no-global-node
const _Node$1 = Node;
const ConnectingSlot = new WeakMap();
const DisconnectingSlot = new WeakMap();
function callNodeSlot(node, slot) {
  if (process.env.NODE_ENV !== 'production') {
    assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
  }
  const fn = slot.get(node);
  if (!isUndefined$1(fn)) {
    fn(node);
  }
  return node; // for convenience
}

if (!lwcRuntimeFlags.ENABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE) {
  // Monkey patching Node methods to be able to detect the insertions and removal of root elements
  // created via createElement.
  const {
    appendChild,
    insertBefore,
    removeChild,
    replaceChild
  } = _Node$1.prototype;
  assign(_Node$1.prototype, {
    appendChild(newChild) {
      const appendedNode = appendChild.call(this, newChild);
      return callNodeSlot(appendedNode, ConnectingSlot);
    },
    insertBefore(newChild, referenceNode) {
      const insertedNode = insertBefore.call(this, newChild, referenceNode);
      return callNodeSlot(insertedNode, ConnectingSlot);
    },
    removeChild(oldChild) {
      const removedNode = removeChild.call(this, oldChild);
      return callNodeSlot(removedNode, DisconnectingSlot);
    },
    replaceChild(newChild, oldChild) {
      const replacedNode = replaceChild.call(this, newChild, oldChild);
      callNodeSlot(replacedNode, DisconnectingSlot);
      callNodeSlot(newChild, ConnectingSlot);
      return replacedNode;
    }
  });
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ComponentConstructorToCustomElementConstructorMap = new Map();
function getCustomElementConstructor(Ctor) {
  if (Ctor === LightningElement) {
    throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
  }
  let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);
  if (isUndefined$1(ce)) {
    ce = buildCustomElementConstructor(Ctor);
    ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
  }
  return ce;
}
/**
 * This static getter builds a Web Component class from a LWC constructor so it can be registered
 * as a new element via customElements.define() at any given time. E.g.:
 *
 *      import Foo from 'ns/foo';
 *      customElements.define('x-foo', Foo.CustomElementConstructor);
 *      const elm = document.createElement('x-foo');
 *
 */
defineProperty(LightningElement, 'CustomElementConstructor', {
  get() {
    return getCustomElementConstructor(this);
  }
});
freeze(LightningElement);
seal(LightningElement.prototype);
/* version: 2.40.1 */

function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
  var shadowSelector = token ? ("[" + token + "]") : "";
  return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}";
  /*LWC compiler v2.40.1*/
}
var _implicitStylesheets = [stylesheet];

function tmpl$2($api, $cmp, $slotset, $ctx) {
  const {fid: api_scoped_frag_id, h: api_element} = $api;
  return [api_element("svg", {
    className: $cmp.computedClass,
    attrs: {
      "focusable": "false",
      "data-key": $cmp.name,
      "aria-hidden": "true"
    },
    key: 0,
    svg: true
  }, [api_element("use", {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
    },
    key: 1,
    svg: true
  })])];
  /*LWC compiler v2.40.1*/
}
var _tmpl$3 = registerTemplate(tmpl$2);
tmpl$2.stylesheets = [];


if (_implicitStylesheets) {
  tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets);
}
tmpl$2.stylesheetToken = "lightning-primitiveIcon_primitiveIcon";
freezeTemplate(tmpl$2);

const classNamesHash = classes => {
  return typeof classes === 'string' ? classes.trim().split(/\s+/).reduce((acc, cn) => {
    acc[cn] = true;
    return acc;
  }, {}) : classes;
};
const proto = {
  add(className) {
    Object.assign(this, classNamesHash(className));
    return this;
  },
  invert() {
    Object.keys(this).forEach(key => {
      this[key] = !this[key];
    });
    return this;
  },
  toString() {
    return Object.keys(this).filter(key => this[key]).join(' ');
  }
};
function classSet(config) {
  return Object.assign(Object.create(proto), classNamesHash(config));
}

/**
 * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
 * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
 * @param  {string|array} arguments - string(s) to be injected into the `string` param
 * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
 */

function formatLabel(str) {
  const args = Array.prototype.slice.call(arguments, 1);
  let replacements = args;
  if (Array.isArray(args[0])) {
    [replacements] = args;
  }
  return str.replace(/{(\d+)}/g, (match, i) => {
    const replacement = replacements[i];
    return replacement !== null && replacement !== undefined ? replacement : '';
  });
}

/* All Valid Aria Attributes, in camel case
 * - it's better to start from camel-case
 *   because `aria-${_.kebabCase('describedBy')}` => 'aria-described-by' (NOT aria property)
 * - correct aria property: 'aria-describedby'
 *  https://www.w3.org/TR/wai-aria/
 */
const ARIA_PROP_LIST = ['activeDescendant', 'atomic', 'autoComplete', 'busy', 'checked', 'colCount', 'colIndex', 'colSpan', 'controls', 'current', 'describedAt', 'describedBy', 'description', 'details', 'disabled', 'dropEffect', 'errorMessage', 'expanded', 'flowTo', 'grabbed', 'hasPopup', 'hidden', 'invalid', 'keyShortcuts', 'label', 'labelledBy', 'level', 'live', 'modal', 'multiLine', 'multiSelectable', 'orientation', 'owns', 'placeholder', 'posInSet', 'pressed', 'readOnly', 'relevant', 'required', 'roleDescription', 'rowCount', 'rowIndex', 'rowSpan', 'selected', 'setSize', 'sort', 'valueMax', 'valueMin', 'valueNow', 'valueText'];

/**
 * Generate an ARIA lookup object when passing in a list of ARIA values
 * @param {Array} list A list of ARIA properties (array of strings)
 * @param {String} type A type which defaults to output ARIA properties as modified kebab-case, or camel-case
 * @example 'valueMax' string becomes: { VALUEMAX: 'aria-valuemax' }
 * @returns {Object} A lookup object for ARIA properties in (modified) kebab-case or camel-case
 */
const getAriaLookup = (list, type = 'default') => {
  if (!list || list.length === 0) {
    throw new Error('List of aria properties is required');
  }
  const lookupObj = {};
  if (type === 'default') {
    list.forEach(name => {
      const nameUpperCase = name.toUpperCase();
      if (!lookupObj[nameUpperCase]) {
        lookupObj[nameUpperCase] = `aria-${name.toLowerCase()}`;
      }
    });
    return lookupObj;
  }
  list.forEach(name => {
    const ariaPropertyLowerCase = `aria-${name.toLowerCase()}`;
    const ariaPropertyCamelCase = `aria${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    if (!lookupObj[ariaPropertyLowerCase]) {
      lookupObj[ariaPropertyLowerCase] = ariaPropertyCamelCase;
    }
  });
  return lookupObj;
};

/**
 * ARIA lookup, 'modified' kebab-case
 * Given an array of aria property strings in camel-case, produce a lookup object
 * NOTE: 'ariaDescribedBy' (camel-case ARIA property) in TRUE kebab-case would be:
 * - 'aria-described-by' (not valid ARIA)
 * - 'aria-describedby' (valid ARIA, or modified kebab-case)
 * Example: 'describedBy' -> { DESCRIBEDBY: 'aria-describedby' }
 */
getAriaLookup(ARIA_PROP_LIST);

/**
 * ARIA lookup, aria-property (key): 'ariaCamelCase' (value)
 * Example: 'valueMax' -> { 'aria-valuemax': 'ariaValueMax' }
 * Useful for converting from normal aria properties to aria camel cased values
 */
getAriaLookup(ARIA_PROP_LIST, 'cc');

/**
 * Utility function to generate an unique guid.
 * used on state objects to provide a performance aid when iterating
 * through the items and marking them for render
 * @returns {String} an unique string ID
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const isIE11 = isIE11Test(navigator);
isChromeTest(navigator);
isSafariTest(navigator);

// The following functions are for tests only
function isIE11Test(navigator) {
  // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
  return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
}
function isChromeTest(navigator) {
  // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}
function isSafariTest(navigator) {
  // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
A string normalization utility for attributes.
@param {String} value - The value to normalize.
@param {Object} config - The optional configuration object.
@param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
@param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
@return {String} - The normalized value.
**/
function normalizeString(value, config = {}) {
  const {
    fallbackValue = '',
    validValues,
    toLowerCase = true
  } = config;
  let normalized = typeof value === 'string' && value.trim() || '';
  normalized = toLowerCase ? normalized.toLowerCase() : normalized;
  if (validValues && validValues.indexOf(normalized) === -1) {
    normalized = fallbackValue;
  }
  return normalized;
}

/**
A boolean normalization utility for attributes.
@param {Any} value - The value to normalize.
@return {Boolean} - The normalized value.
**/
function normalizeBoolean(value) {
  return typeof value === 'string' || !!value;
}

/**
 * Verify if user is using MAC OS or not
 * @returns {boolean} - true if Mac OS
 */
const isMacOSTest = ({
  userAgent
}) => {
  return /(macintosh|macintel|macppc|mac68k|macos)/i.test(userAgent);
};

/**
 * Verify if user is using iOS or not
 * @returns {boolean} - true, if iOS
 */
const isiOSTest = ({
  userAgent
}) => {
  return /(iphone|ipad|ipod)/i.test(userAgent);
};

/**
 * Verify if user is using Windows OS or not
 * @returns {boolean} - true, if Windows OS
 */
const isWindowsOSTest = ({
  userAgent
}) => {
  return /(win32|win64|windows)/i.test(userAgent);
};

/**
 * Verify if user is using Android OS or not
 * @returns {boolean} - true, if Android OS
 */
const isAndroidOSTest = ({
  userAgent
}) => {
  return /android/i.test(userAgent);
};
isMacOSTest(navigator);
isWindowsOSTest(navigator);
isiOSTest(navigator);
isAndroidOSTest(navigator);

/**
 * Set an attribute on an element, if it's a normal element
 * it will use setAttribute, if it's an LWC component
 * it will use the public property
 *
 * @param {HTMLElement} element The element to act on
 * @param {String} attribute the attribute to set
 * @param {Any} value the value to set
 */
function smartSetAttribute(element, attribute, value) {
  if (element.tagName.match(/^LIGHTNING/i)) {
    attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
    element[attribute] = value ? value : null;
  } else if (value) {
    element.setAttribute(attribute, value);
  } else {
    element.removeAttribute(attribute);
  }
}

/**
 * @param {HTMLElement} element Element to act on
 * @param {Object} values values and attributes to set, if the value is
 *                        falsy it the attribute will be removed
 */
function synchronizeAttrs(element, values) {
  if (!element) {
    return;
  }
  const attributes = Object.keys(values);
  attributes.forEach(attribute => {
    smartSetAttribute(element, attribute, values[attribute]);
  });
}
const BUTTON_GROUP_ORDER = {
  FIRST: 'first',
  MIDDLE: 'middle',
  LAST: 'last',
  ONLY: 'only'
};

/**
 * returns the SLDS class for the given group order
 * @param groupOrder
 * @returns {string}
 */
function buttonGroupOrderClass(groupOrder) {
  return {
    [BUTTON_GROUP_ORDER.FIRST]: 'slds-button_first',
    [BUTTON_GROUP_ORDER.MIDDLE]: 'slds-button_middle',
    [BUTTON_GROUP_ORDER.LAST]: 'slds-button_last',
    [BUTTON_GROUP_ORDER.ONLY]: 'single-button'
  }[groupOrder];
}

/**
 * Checks if the given component is native
 * @param {Object} cmp Component instance
 * @returns {Boolean} Whether the component is native
 */
function isNativeComponent(cmp) {
  if (cmp && cmp.template && cmp.template.constructor) {
    return !!String(cmp.template.constructor).match(/\[native code\]/);
  }
  return false;
}

// TODO: remove file when migrating off aura
/*
 * Regex to test a string for an ISO8601 Date. The following formats are matched.
 *
 *  YYYY
 *  YYYY-MM
 *  YYYY-MM-DD
 *  YYYY-MM-DDThh:mmTZD
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.STZD
 *
 *
 * @see: https://www.w3.org/TR/NOTE-datetime
 */
const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d[:]?\d\d)|Z)?)?)?)?$/i;

/* Regex to test a string for an ISO8601 partial time or full time:
 * hh:mm
 * hh:mm:ss
 * hh:mm:ss.S
 * full time = partial time + TZD
 */
const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d[:]?\d\d)|Z)?$/i;
const STANDARD_TIME_FORMAT = 'HH:mm:ss.SSS';
const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
const TIME_SEPARATOR = 'T';
const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2})[:]?(\d{2}))$/i;
function isValidISODateTimeString(dateTimeString) {
  return isValidISO8601String(dateTimeString) && isValidDate(dateTimeString);
}
function isValidISOTimeString(timeString) {
  if (!isValidISO8601TimeString(timeString)) {
    return false;
  }
  const timeOnly = removeTimeZoneSuffix(timeString);
  return isValidDate(`2018-09-09T${timeOnly}Z`);
}
function removeTimeZoneSuffix(dateTimeString) {
  if (typeof dateTimeString === 'string') {
    return dateTimeString.split(TIMEZONE_INDICATOR)[0];
  }
  return dateTimeString;
}
function isValidISO8601String(dateTimeString) {
  if (typeof dateTimeString !== 'string') {
    return false;
  }
  return ISO8601_STRICT_PATTERN.test(dateTimeString);
}
function isValidISO8601TimeString(timeString) {
  if (typeof timeString !== 'string') {
    return false;
  }
  return ISO8601_TIME_PATTERN.test(timeString);
}
function isValidDate(value) {
  // Date.parse returns NaN if the argument doesn't represent a valid date
  const timeStamp = Date.parse(value);
  return isFinite(timeStamp);
}

var _tmpl$2 = void 0;

var labelSecondsLater = 'in a few seconds';

var labelSecondsAgo = 'a few seconds ago';

// These labels will only be used as fallback in browsers that do not support Intl.RelativeTimeFormat
const fallbackFutureLabel = 'in {0} {1}'; // e.g. in 1 minute
const fallbackPastLabel = '{0} {1} ago'; // e.g. 1 minute ago
const fallbackPluralSuffix = 's'; // plural suffix for the units, e.g. in 10 minutes

// The threshold values come from moment.js
const units = {
  SECONDS: {
    name: 'second',
    threshold: 45
  },
  // a few seconds to minute
  MINUTES: {
    name: 'minute',
    threshold: 45
  },
  // minutes to hour
  HOURS: {
    name: 'hour',
    threshold: 22
  },
  // hours to day
  DAYS: {
    name: 'day',
    threshold: 26
  },
  // days to month
  MONTHS: {
    name: 'month',
    threshold: 11
  },
  // months to year
  YEARS: {
    name: 'year'
  }
};
const SECOND_TO_MILLISECONDS = 1000;
const MINUTE_TO_MILLISECONDS = 6e4; // 60 * SECOND_TO_MILLISECONDS;
const HOUR_TO_MILLISECONDS = 36e5; // 60 * MINUTE_TO_MILLISECONDS
const DAY_TO_MILLISECONDS = 864e5; // 24 * HOUR_TO_MILLISECONDS;

class Duration {
  constructor(milliseconds) {
    this.milliseconds = 0;
    if (typeof milliseconds !== 'number') {
      this.isValid = false;
      // eslint-disable-next-line no-console
      console.warn(`The value of milliseconds passed into Duration must be of type number,
                but we are getting the ${typeof milliseconds} value "${milliseconds}" instead.
                `);
      return;
    }
    this.isValid = true;
    this.milliseconds = milliseconds;
  }
  humanize(locale) {
    if (!this.isValid) {
      return '';
    }
    const unit = findBestUnitMatch(this);
    if (unit === units.SECONDS) {
      const isLater = this.milliseconds > 0;
      return isLater ? labelSecondsLater : labelSecondsAgo;
    }
    return format(locale, this.asIn(unit), unit.name);
  }
  asIn(unit) {
    switch (unit) {
      case units.SECONDS:
        return Math.round(this.milliseconds / SECOND_TO_MILLISECONDS);
      case units.MINUTES:
        return Math.round(this.milliseconds / MINUTE_TO_MILLISECONDS);
      case units.HOURS:
        return Math.round(this.milliseconds / HOUR_TO_MILLISECONDS);
      case units.DAYS:
        return Math.round(this.milliseconds / DAY_TO_MILLISECONDS);
      case units.MONTHS:
        return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS));
      case units.YEARS:
      default:
        return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS) / 12);
    }
  }
}
registerDecorators(Duration, {
  fields: ["milliseconds"]
});
var Duration$1 = registerComponent(Duration, {
  tmpl: _tmpl$2,
  sel: "lightning-configProvider"
});
function daysToMonth(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  // 400 years have 12 months === 4800
  const daysToMonthRatio = 4800 / 146097;
  return days * daysToMonthRatio;
}
function findBestUnitMatch(duration) {
  // Traversing the object keys in order from Seconds to Years
  // http://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties
  const match = Object.keys(units).find(key => {
    const unit = units[key];
    // Year is the max and doesn't have a threshold
    return unit === units.YEARS || Math.abs(duration.asIn(unit)) < unit.threshold;
  });
  return units[match];
}
function format(locale, value, unit) {
  if ('Intl' in window && Intl.RelativeTimeFormat) {
    const formatter = new Intl.RelativeTimeFormat(locale, {
      style: 'long',
      numeric: 'always'
    });
    return formatter.format(value, unit);
  }
  return fallbackFormatter(value, unit);
}
function fallbackFormatter(value, unit) {
  // eslint-disable-next-line no-console
  console.warn(`The current environment does not support formatters for relative time.`);
  const absoluteValue = Math.abs(value);
  const unitString = absoluteValue !== 1 ? unit + fallbackPluralSuffix : unit;
  const label = value > 0 ? fallbackFutureLabel : fallbackPastLabel;
  return formatLabel(label, absoluteValue, unitString);
}

registerComponent(JSON.parse('{"adlm":"𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙","ahom":"𑜰𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹","arab":"٠١٢٣٤٥٦٧٨٩","arabext":"۰۱۲۳۴۵۶۷۸۹","bali":"᭐᭑᭒᭓᭔᭕᭖᭗᭘᭙","beng":"০১২৩৪৫৬৭৮৯","bhks":"𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙","brah":"𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯","cakm":"𑄶𑄷𑄸𑄹𑄺𑄻𑄼𑄽𑄾𑄿","cham":"꩐꩑꩒꩓꩔꩕꩖꩗꩘꩙","deva":"०१२३४५६७८९","fullwide":"０１２３４５６７８９","gong":"𑶠𑶡𑶢𑶣𑶤𑶥𑶦𑶧𑶨𑶩","gonm":"𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙","gujr":"૦૧૨૩૪૫૬૭૮૯","guru":"੦੧੨੩੪੫੬੭੮੯","hanidec":"〇一二三四五六七八九","hmng":"𖭐𖭑𖭒𖭓𖭔𖭕𖭖𖭗𖭘𖭙","hmnp":"𞅀𞅁𞅂𞅃𞅄𞅅𞅆𞅇𞅈𞅉","java":"꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙","kali":"꤀꤁꤂꤃꤄꤅꤆꤇꤈꤉","khmr":"០១២៣៤៥៦៧៨៩","knda":"೦೧೨೩೪೫೬೭೮೯","lana":"᪀᪁᪂᪃᪄᪅᪆᪇᪈᪉","lanatham":"᪐᪑᪒᪓᪔᪕᪖᪗᪘᪙","laoo":"໐໑໒໓໔໕໖໗໘໙","latn":"0123456789","lepc":"᱀᱁᱂᱃᱄᱅᱆᱇᱈᱉","limb":"᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏","mathbold":"𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗","mathdbl":"𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡","mathmono":"𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿","mathsanb":"𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵","mathsans":"𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫","mlym":"൦൧൨൩൪൫൬൭൮൯","modi":"𑙐𑙑𑙒𑙓𑙔𑙕𑙖𑙗𑙘𑙙","mong":"᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙","mroo":"𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩","mtei":"꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹","mymr":"၀၁၂၃၄၅၆၇၈၉","mymrshan":"႐႑႒႓႔႕႖႗႘႙","mymrtlng":"꧰꧱꧲꧳꧴꧵꧶꧷꧸꧹","newa":"𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙","nkoo":"߀߁߂߃߄߅߆߇߈߉","olck":"᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙","orya":"୦୧୨୩୪୫୬୭୮୯","osma":"𐒠𐒡𐒢𐒣𐒤𐒥𐒦𐒧𐒨𐒩","rohg":"𐴰𐴱𐴲𐴳𐴴𐴵𐴶𐴷𐴸𐴹","saur":"꣐꣑꣒꣓꣔꣕꣖꣗꣘꣙","shrd":"𑇐𑇑𑇒𑇓𑇔𑇕𑇖𑇗𑇘𑇙","sind":"𑋰𑋱𑋲𑋳𑋴𑋵𑋶𑋷𑋸𑋹","sinh":"෦෧෨෩෪෫෬෭෮෯","sora":"𑃰𑃱𑃲𑃳𑃴𑃵𑃶𑃷𑃸𑃹","sund":"᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹","takr":"𑛀𑛁𑛂𑛃𑛄𑛅𑛆𑛇𑛈𑛉","talu":"᧐᧑᧒᧓᧔᧕᧖᧗᧘᧙","tamldec":"௦௧௨௩௪௫௬௭௮௯","telu":"౦౧౨౩౪౫౬౭౮౯","thai":"๐๑๒๓๔๕๖๗๘๙","tibt":"༠༡༢༣༤༥༦༧༨༩","tirh":"𑓐𑓑𑓒𑓓𑓔𑓕𑓖𑓗𑓘𑓙","vaii":"꘠꘡꘢꘣꘤꘥꘦꘧꘨꘩","wara":"𑣠𑣡𑣢𑣣𑣤𑣥𑣦𑣧𑣨𑣩","wcho":"𞋰𞋱𞋲𞋳𞋴𞋵𞋶𞋷𞋸𞋹"}'), {
  tmpl: _tmpl$2,
  sel: "lightning-base-components-scopedImports"
});

// default implementation of localization service. This covers the current usage of the localizationService in the code base.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_FORMAT = {
  short: 'M/d/yyyy',
  medium: 'MMM d, yyyy',
  long: 'MMMM d, yyyy'
};
const TIME_FORMAT = {
  short: 'h:mm a',
  medium: 'h:mm:ss a',
  long: 'h:mm:ss a'
};

// The parseTime method normalizes the time format so that minor deviations are accepted
const TIME_FORMAT_SIMPLE = {
  short: 'h:m a',
  medium: 'h:m:s a',
  long: 'h:m:s a'
};

// Only works with dates and iso strings
// formats the date object by ignoring the timezone offset
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDate(date, 'YYYY-MM-DD') -> 2019-03-11
function formatDate(value, format) {
  let isUTC = false;
  let dateString = value;
  if (typeof value === 'string') {
    dateString = value.split(TIME_SEPARATOR)[0];
    isUTC = true;
  }
  return formatDateInternal(dateString, format, isUTC);
}

// Only works with date objects.
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateUTC(date, 'YYYY-MM-DD') -> 2019-03-10
function formatDateUTC(value, format) {
  return formatDateInternal(value, format, true);
}

// Only works with a date object
function formatTime(date, format) {
  if (!isDate(date)) {
    return new Date('');
  }
  const hours = (date.getHours() + 11) % 12 + 1;
  const suffix = date.getHours() >= 12 ? 'PM' : 'AM';
  switch (format) {
    case STANDARD_TIME_FORMAT:
      // 16:12:32.000
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${doublePad(date.getMilliseconds())}`;
    case TIME_FORMAT.short:
      // 4:12 PM;
      return `${hours}:${pad(date.getMinutes())} ${suffix}`;
    case TIME_FORMAT.medium:
    case TIME_FORMAT.long:
    default:
      // 4:12:32 PM;
      return `${hours}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${suffix}`;
  }
}

// Only works with a date object
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateTimeUTC(date) -> 2019-03-10  1:00:00 PM
function formatDateTimeUTC(value) {
  if (!isDate(value)) {
    return new Date('');
  }
  const date = new Date(value.getTime());
  return `${formatDateUTC(date)}, ${formatTime(addTimezoneOffset(date))}`;
}

// parses ISO8601 date/time strings. Currently only used to parse ISO time strings without a TZD. Some examples:
// 20:00:00.000             -> Feb 26 2019 20:00:00 GMT-0500
// 2019-03-11               -> Mar 11 2019 00:00:00 GMT-0400
// 2019-03-11T00:00:00.000Z -> Mar 10 2019 20:00:00 GMT-0400
function parseDateTimeISO8601(value) {
  let isoString = null;
  let shouldAddOffset = true;
  if (isValidISOTimeString(value)) {
    isoString = `${getTodayInISO()}T${addTimezoneSuffix(value)}`;
  } else if (isValidISODateTimeString(value)) {
    if (value.indexOf(TIME_SEPARATOR) > 0) {
      isoString = addTimezoneSuffix(value);
      shouldAddOffset = false;
    } else {
      isoString = `${value}T00:00:00.000Z`;
    }
  }
  if (isoString) {
    // Browsers differ on how they treat iso strings without a timezone offset (local vs utc time)
    const parsedDate = new Date(isoString);
    if (shouldAddOffset) {
      addTimezoneOffset(parsedDate);
    }
    return parsedDate;
  }
  return null;
}

// called by the datepicker and calendar for parsing iso and formatted date strings
// called by the timepicker to parse the formatted time string
function parseDateTime(value, format) {
  if (format === STANDARD_DATE_FORMAT && isValidISODateTimeString(value)) {
    return parseDateTimeISO8601(value);
  }
  if (Object.values(DATE_FORMAT).includes(format)) {
    return parseFormattedDate(value, format);
  }
  if (Object.values(TIME_FORMAT_SIMPLE).includes(format)) {
    return parseFormattedTime(value);
  }
  return null;
}

// The input to this method is always an ISO string with timezone offset.
function parseDateTimeUTC(value) {
  return parseDateTimeISO8601(addTimezoneSuffix(value));
}
function isBefore(date1, date2, unit) {
  const normalizedDate1 = getDate(date1);
  const normalizedDate2 = getDate(date2);
  if (!normalizedDate1 || !normalizedDate2) {
    return false;
  }
  return startOf(normalizedDate1, unit).getTime() < startOf(normalizedDate2, unit).getTime();
}

// unit can be millisecond, minute, day
function isAfter(date1, date2, unit) {
  const normalizedDate1 = getDate(date1);
  const normalizedDate2 = getDate(date2);
  if (!normalizedDate1 || !normalizedDate2) {
    return false;
  }
  return startOf(normalizedDate1, unit).getTime() > startOf(normalizedDate2, unit).getTime();
}

// We're not doing timezone conversion in the default config. Only converting from UTC to system timezone
function UTCToWallTime(date, timezone, callback) {
  const utcDate = new Date(date.getTime());
  callback(subtractTimezoneOffset(utcDate));
}

// We're not doing timezone conversion in the default config. Only converting from system timezone to UTC
function WallTimeToUTC(date, timezone, callback) {
  const localDate = new Date(date.getTime());
  callback(addTimezoneOffset(localDate));
}

// Similar to Aura equivalent; add years for buddhist calendar
function translateToOtherCalendar(date) {
  return date;
}

// Similar to Aura equivalent; subtract years for buddhist calendar
function translateFromOtherCalendar(date) {
  return date;
}

// Translates from latn digits to digits of current locale
function translateToLocalizedDigits(input) {
  return input;
}

// Translates from current locale digits to latn digits
function translateFromLocalizedDigits(input) {
  return input;
}

// This is called from the numberFormat library when the value exceeds the safe length.
// We currently rely on aura to format large numbers
function getNumberFormat() {
  return {
    format: value => {
      // eslint-disable-next-line no-console
      console.warn(`The current environment does not support large numbers and the original value of ${value} will be returned.`);
      return value;
    }
  };
}

// relativeDateTime (currently the only user of duration) uses unit="minutes"
// The default implementation here assumes the unit is always minutes.
function duration(minutes) {
  return new Duration$1(minutes * 60 * 1000);
}
function displayDuration(value) {
  return value.humanize('en');
}

// parses a time string formatted in en-US locale i.e. h:mm:ss a
function parseFormattedTime(value) {
  // for time strings it's easier to just split on :.\s
  const values = value.trim().split(/[:.\s*]/);
  // at least two parts i.e. 12 PM, and at most 5 parts i.e. 12:34:21.432 PM
  const length = values.length;
  if (!values || length < 2 || length > 5) {
    return null;
  }
  const ampm = values[length - 1];
  const isBeforeNoon = ampm.toLowerCase() === 'am';
  const isAfternoon = ampm.toLowerCase() === 'pm';
  // remove ampm
  values.splice(-1, 1);
  const allNumbers = values.every(item => !isNaN(item));
  if (!isAfternoon && !isBeforeNoon || !allNumbers) {
    return null;
  }
  const hours = values[0];
  const hour24 = pad(isAfternoon ? hours % 12 + 12 : hours % 12);
  const minutes = length >= 3 && values[1] || '0';
  const seconds = length >= 4 && values[2] || '0';
  const milliseconds = length === 5 && values[3] || '0';
  const newDate = new Date(getTodayInISO());
  newDate.setHours(hour24, minutes, seconds, milliseconds);
  return isDate(newDate) ? newDate : null;
}

// parses a date string formatted in en-US locale, i.e. MMM d, yyyy
function parseFormattedDate(value, format) {
  // default to medium style pattern
  let pattern = /^([a-zA-Z]{3})\s*(\d{1,2}),\s*(\d{4})$/;
  switch (format) {
    case DATE_FORMAT.short:
      pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      break;
    case DATE_FORMAT.long:
      pattern = /^([a-zA-Z]+)\s*(\d{1,2}),\s*(\d{4})$/;
      break;
  }

  // matches[1]: month, matches[2]: day, matches[3]: year
  const match = pattern.exec(value.trim());
  if (!match) {
    return null;
  }
  let month = match[1];
  const day = match[2];
  const year = match[3];

  // for long and medium style formats, we need to find the month index
  if (format !== DATE_FORMAT.short) {
    month = MONTH_NAMES.findIndex(item => item.toLowerCase().includes(month.toLowerCase()));
    // the actual month for the ISO string is 1 more than the index
    month += 1;
  }
  const isoValue = `${year}-${pad(month)}-${pad(day)}`;
  const newDate = new Date(`${isoValue}T00:00:00.000Z`);
  return isDate(newDate) ? addTimezoneOffset(newDate) : null;
}
function formatDateInternal(value, format, isUTC) {
  const date = getDate(value);
  if (!date) {
    // return Invalid Date
    return new Date('');
  }
  if (isUTC && isDate(value)) {
    // if value is an ISO string, we already add the timezone offset when parsing the date string.
    addTimezoneOffset(date);
  }
  switch (format) {
    case STANDARD_DATE_FORMAT:
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    case DATE_FORMAT.short:
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    case DATE_FORMAT.long:
      return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    case DATE_FORMAT.medium:
    default:
      {
        const shortMonthName = MONTH_NAMES[date.getMonth()].substring(0, 3);
        return `${shortMonthName} ${date.getDate()}, ${date.getFullYear()}`;
      }
  }
}

// unit can be 'day' or 'minute', otherwise will default to milliseconds. These are the only units that are currently used in the codebase.
function startOf(date, unit) {
  switch (unit) {
    case 'day':
      date.setHours(0);
      date.setMinutes(0);
    // falls through
    case 'minute':
      date.setSeconds(0);
      date.setMilliseconds(0);
      break;
  }
  return date;
}
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
}
function addTimezoneSuffix(value) {
  // first remove TZD if the string has one, and then add Z
  return removeTimeZoneSuffix(value) + 'Z';
}
function addTimezoneOffset(date) {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
}
function subtractTimezoneOffset(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}
function getDate(value) {
  if (!value) {
    return null;
  }
  if (isDate(value)) {
    return new Date(value.getTime());
  }
  if (isFinite(value) && (typeof value === 'number' || typeof value === 'string')) {
    return new Date(parseInt(value, 10));
  }
  if (typeof value === 'string') {
    return parseDateTimeISO8601(value);
  }
  return null;
}
function getTodayInISO() {
  return new Date().toISOString().split('T')[0];
}
function pad(n) {
  return Number(n) < 10 ? '0' + n : n;
}
function doublePad(n) {
  return Number(n) < 10 ? '00' + n : Number(n) < 100 ? '0' + n : n;
}
var localizationService = {
  formatDate,
  formatDateUTC,
  formatTime,
  formatDateTimeUTC,
  parseDateTimeISO8601,
  parseDateTime,
  parseDateTimeUTC,
  isBefore,
  isAfter,
  UTCToWallTime,
  WallTimeToUTC,
  translateToOtherCalendar,
  translateFromOtherCalendar,
  translateToLocalizedDigits,
  translateFromLocalizedDigits,
  getNumberFormat,
  duration,
  displayDuration
};

function getConfigFromAura($A) {
  return {
    getLocalizationService() {
      return $A.localizationService;
    },
    getPathPrefix() {
      return $A.getContext().getPathPrefix();
    },
    getToken(name) {
      return $A.getToken(name);
    }
  };
}
function createStandAloneConfig() {
  return {
    getLocalizationService() {
      return localizationService;
    },
    getPathPrefix() {
      return ''; // @sfdc.playground path-prefix DO-NOT-REMOVE-COMMENT
    },

    getToken() {
      return undefined; // @sfdc.playground token DO-NOT-REMOVE-COMMENT
    },

    getOneConfig() {
      return {
        densitySetting: ''
      };
    }
  };
}
function getDefaultConfig() {
  return window.$A !== undefined && window.$A.localizationService ? getConfigFromAura(window.$A) : createStandAloneConfig();
}

getDefaultConfig();

// Taken from https://github.com/jonathantneal/svg4everybody/pull/139
// Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
const inIframe = window.top !== window.self;
const isIframeInEdge = isEdgeUA && inIframe;
var isIframeInEdge$1 = registerComponent(isIframeInEdge, {
  tmpl: _tmpl$2,
  sel: "lightning-iconUtils"
});

// Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    };
  });
}

// Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L89-L98
// Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
// Modify at your own risk!
const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
const webkitUA = /\bAppleWebKit\/(\d+)\b/;
const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
const supportsSvg = !isIE && !isIframeInEdge$1;
var supportsSvg$1 = registerComponent(supportsSvg, {
  tmpl: _tmpl$2,
  sel: "lightning-iconUtils"
});

/**
This polyfill injects SVG sprites into the document for clients that don't
fully support SVG. We do this globally at the document level for performance
reasons. This causes us to lose namespacing of IDs across sprites. For example,
if both #image from utility sprite and #image from doctype sprite need to be
rendered on the page, both end up as #image from the doctype sprite (last one
wins). SLDS cannot change their image IDs due to backwards-compatibility
reasons so we take care of this issue at runtime by adding namespacing as we
polyfill SVG elements.

For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
replace the "#approval" id with "#${namespace}-approval" and a similar
operation is done on the corresponding symbol element.
**/
const svgTagName = /svg/i;
const isSvgElement = el => el && svgTagName.test(el.nodeName);
const requestCache = {};
const symbolEls = {};
const svgFragments = {};
const spritesContainerId = 'slds-svg-sprites';
let spritesEl;
function polyfill(el) {
  if (!supportsSvg$1 && isSvgElement(el)) {
    if (!spritesEl) {
      spritesEl = document.createElement('svg');
      spritesEl.xmlns = 'http://www.w3.org/2000/svg';
      spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
      spritesEl.style.display = 'none';
      spritesEl.id = spritesContainerId;
      document.body.insertBefore(spritesEl, document.body.childNodes[0]);
    }
    Array.from(el.getElementsByTagName('use')).forEach(use => {
      // We access the href differently in raptor and in aura, probably
      // due to difference in the way the svg is constructed.
      const src = use.getAttribute('xlink:href') || use.getAttribute('href');
      if (src) {
        // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
        // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
        const parts = src.split('#');
        const url = parts[0];
        const id = parts[1];
        const namespace = url.replace(/[^\w]/g, '-');
        const href = `#${namespace}-${id}`;
        if (url.length) {
          // set the HREF value to no longer be an external reference
          if (use.getAttribute('xlink:href')) {
            use.setAttribute('xlink:href', href);
          } else {
            use.setAttribute('href', href);
          }

          // only insert SVG content if it hasn't already been retrieved
          if (!requestCache[url]) {
            requestCache[url] = fetchSvg(url);
          }
          requestCache[url].then(svgContent => {
            // create a document fragment from the svgContent returned (is parsed by HTML parser)
            if (!svgFragments[url]) {
              const svgFragment = document.createRange().createContextualFragment(svgContent);
              svgFragments[url] = svgFragment;
            }
            if (!symbolEls[href]) {
              const svgFragment = svgFragments[url];
              const symbolEl = svgFragment.querySelector(`#${id}`);
              symbolEls[href] = true;
              symbolEl.id = `${namespace}-${id}`;
              spritesEl.appendChild(symbolEl);
            }
          });
        }
      }
    });
  }
}

const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
Object.assign(Object.create(null), {
  action: 'lightning.actionSprite',
  custom: 'lightning.customSprite',
  doctype: 'lightning.doctypeSprite',
  standard: 'lightning.standardSprite',
  utility: 'lightning.utilitySprite'
});
Object.assign(Object.create(null), {
  action: 'lightning.actionSpriteRtl',
  custom: 'lightning.customSpriteRtl',
  doctype: 'lightning.doctypeSpriteRtl',
  standard: 'lightning.standardSpriteRtl',
  utility: 'lightning.utilitySpriteRtl'
});
Object.assign(Object.create(null), {
  'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
  'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
  'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
  'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
  'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
  'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
  'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
  'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
  'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
  'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
});
const getMatchAtIndex = index => iconName => {
  const result = validNameRe.exec(iconName);
  return result ? result[index] : '';
};
const getName = getMatchAtIndex(2);
const isValidName = iconName => validNameRe.test(iconName);

var dir = 'ltr';

// Cache for promises that import icon templates
const importPromises = {};
const iconTemplateCache = {};
function hasIconLibrary(dir, category) {
  const cacheKey = makeCacheKey(dir, category);
  return !!iconTemplateCache[cacheKey];
}
function getIconLibrary(dir, category) {
  const cacheKey = makeCacheKey(dir, category);
  return iconTemplateCache[cacheKey] || null;
}
function fetchIconLibrary(dir, category) {
  const cacheKey = makeCacheKey(dir, category);

  // If icon template is being requested, return the cached promise
  if (importPromises[cacheKey]) {
    return importPromises[cacheKey];
  }
  const promise = fetchIconTemplate(dir, category);
  promise.then(tmpl => {
    iconTemplateCache[cacheKey] = tmpl;
    delete importPromises[cacheKey];
  }).catch(() => {
    delete importPromises[cacheKey];
  });

  // Cache the promise to import
  importPromises[cacheKey] = promise;
  return promise;
}
function makeCacheKey(dir, category) {
  return `${category}${dir}`;
}

// eslint-disable-next-line @lwc/lwc/no-async-await
async function fetchIconTemplate(dir, category) {
  if (dir === 'rtl') {
    switch (category) {
      case 'utility':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesUtilityRtl-b3ab3823.js');
          return Lib;
        }
      case 'action':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesActionRtl-1abbd128.js');
          return Lib;
        }
      case 'standard':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesStandardRtl-1b6b2c25.js');
          return Lib;
        }
      case 'doctype':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesDoctypeRtl-e9aab168.js');
          return Lib;
        }
      case 'custom':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesCustomRtl-0051b767.js');
          return Lib;
        }
      default:
        return null;
    }
  } else {
    switch (category) {
      case 'utility':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesUtility-70c57b47.js');
          return Lib;
        }
      case 'action':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesAction-0ec264a4.js');
          return Lib;
        }
      case 'standard':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesStandard-0b010c0f.js');
          return Lib;
        }
      case 'doctype':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesDoctype-0fe849c9.js');
          return Lib;
        }
      case 'custom':
        {
          // eslint-disable-next-line @lwc/lwc/no-async-await
          const {
            default: Lib
          } = await import('./iconSvgTemplatesCustom-e985495d.js');
          return Lib;
        }
      default:
        return null;
    }
  }
}

class LightningPrimitiveIcon extends LightningElement {
  constructor(...args) {
    super(...args);
    this.src = void 0;
    this.svgClass = void 0;
    this._size = 'medium';
    this._variant = '';
    this._iconLibrary = null;
    this._iconName = null;
  }
  get size() {
    return this._size;
  }
  set size(val) {
    this._size = val;
  }
  get variant() {
    return this._variant;
  }
  set variant(val) {
    this._variant = val;
  }
  get iconName() {
    return this._iconName;
  }
  set iconName(value) {
    if (value !== this._iconName) {
      this._iconName = value;
      this.requestIconTemplates();
    }
  }
  get category() {
    if (isValidName(this._iconName)) {
      const [spriteName] = this._iconName.split(':');
      return spriteName;
    }
    return null;
  }
  get isReady() {
    return !!this._iconLibrary;
  }

  // eslint-disable-next-line @lwc/lwc/no-async-await
  async requestIconTemplates() {
    if (hasIconLibrary(dir, this.category)) {
      this._iconLibrary = getIconLibrary(dir, this.category);
      return;
    }
    if (this.category) {
      try {
        this._iconLibrary = null;
        this._iconLibrary = await fetchIconLibrary(dir, this.category);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`<lightning-primitive-icon> failed to dynamically import icon templates for ${this.category}: ${e.message}`);
      }
    }
  }
  renderedCallback() {
    if (this.isReady || this.iconName !== this.prevIconName) {
      this.prevIconName = this.iconName;
      const svgElement = this.template.querySelector('svg');
      polyfill(svgElement);
    }
  }
  render() {
    if (this.isReady) {
      // If src is present, should use default template reply on given svg src
      if (!this.src) {
        const name = this.iconName;
        if (isValidName(name)) {
          const [spriteName, iconName] = name.split(':');
          const template = this._iconLibrary[`${spriteName}_${iconName}`];
          if (template) {
            return template;
          }
        }
      }
    }
    return _tmpl$3;
  }
  get href() {
    return this.src || '';
  }
  get name() {
    return getName(this.iconName);
  }
  get normalizedSize() {
    return normalizeString(this._size, {
      fallbackValue: 'medium',
      validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
    });
  }
  get normalizedVariant() {
    // NOTE: Leaving a note here because I just wasted a bunch of time
    // investigating why both 'bare' and 'inverse' are supported in
    // lightning-primitive-icon. lightning-icon also has a deprecated
    // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
    // that no classes should be applied. So this component needs to
    // support both 'bare' and 'inverse' while lightning-icon only needs to
    // support 'inverse'.
    return normalizeString(this._variant, {
      fallbackValue: '',
      validValues: ['bare', 'error', 'inverse', 'warning', 'success']
    });
  }
  get computedClass() {
    const classes = classSet(this.svgClass);
    const {
      normalizedSize,
      normalizedVariant
    } = this;
    if (normalizedVariant !== 'bare') {
      classes.add('slds-icon');
    }
    switch (normalizedVariant) {
      case 'error':
        classes.add('slds-icon-text-error');
        break;
      case 'warning':
        classes.add('slds-icon-text-warning');
        break;
      case 'success':
        classes.add('slds-icon-text-success');
        break;
      case 'inverse':
      case 'bare':
        break;
      default:
        // if custom icon is set, we don't want to set
        // the text-default class
        if (!this.src) {
          classes.add('slds-icon-text-default');
        }
    }
    if (normalizedSize !== 'medium') {
      classes.add(`slds-icon_${normalizedSize}`);
    }
    return classes.toString();
  }
  /*LWC compiler v2.40.1*/
}
registerDecorators(LightningPrimitiveIcon, {
  publicProps: {
    src: {
      config: 0
    },
    svgClass: {
      config: 0
    },
    size: {
      config: 3
    },
    variant: {
      config: 3
    },
    iconName: {
      config: 3
    }
  },
  fields: ["_size", "_variant", "_iconLibrary", "_iconName"]
});
var _lightningPrimitiveIcon = registerComponent(LightningPrimitiveIcon, {
  tmpl: _tmpl$3,
  sel: "lightning-primitiveIcon"
});

function tmpl$1($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, c: api_custom_element, d: api_dynamic_text, t: api_text, h: api_element} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "disabled": $cmp.disabled ? "" : null,
      "aria-disabled": $cmp.disabled,
      "name": $cmp.name,
      "accesskey": $cmp.accessKey,
      "title": $cmp.title,
      "type": $cmp.normalizedType,
      "value": $cmp.value,
      "aria-atomic": $cmp.computedAriaAtomic,
      "aria-busy": $cmp.computedAriaBusy,
      "aria-label": $cmp.ariaLabel,
      "aria-expanded": $cmp.computedAriaExpanded,
      "aria-haspopup": $cmp.computedAriaHasPopup,
      "aria-live": $cmp.computedAriaLive,
      "aria-pressed": $cmp.computedAriaPressed,
      "aria-relevant": $cmp.computedAriaRelevant
    },
    key: 0,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
    }
  }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 1
  }) : null, api_text(api_dynamic_text($cmp.label)), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 2
  }) : null])];
  /*LWC compiler v2.40.1*/
}
var _tmpl$1 = registerTemplate(tmpl$1);
tmpl$1.stylesheets = [];
tmpl$1.stylesheetToken = "lightning-button_button";
freezeTemplate(tmpl$1);

const stc0 = [];
function tmpl($api, $cmp, $slotset, $ctx) {
  return stc0;
  /*LWC compiler v2.40.1*/
}
var _tmpl = registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.stylesheetToken = "lightning-primitiveButton_primitiveButton";
freezeTemplate(tmpl);

const CONTENT_SEPARATOR = '\n';
function getAttr(elm, attr) {
  if (elm.tagName.match(/lightning/i)) {
    return elm[attr];
  }
  return elm.getAttribute(attr);
}
function extractElements(root, ids) {
  if (typeof ids !== 'string' || ids === '') {
    return [];
  }
  // We must query the elements in the order of ids, so that
  // the content will be extracted in the correct order.
  return splitIds(ids).map(id => root.querySelector(`#${id}`)).filter(el => !!el);
}
function extractContent(elements) {
  return elements.map(element => element.textContent).filter(text => text.length).join(CONTENT_SEPARATOR);
}
function splitIds(ids) {
  return (ids + '').trim().split(/\s+/);
}
function hashIds(ids) {
  return (ids + '').trim().split(/\s+/).reduce((r, v) => {
    r[v] = 1;
    return r;
  }, {});
}

// this method should check each individual id from computedIds
// against the existing value of the attrName on elm, and dupe
// them, and add the new ones.
function addAriaRefWhenNeeded(elm, attrName, computedIds) {
  const newIds = splitIds(computedIds);
  const oldIds = getAttr(elm, attrName) || '';
  const oldIdsHash = hashIds(oldIds);
  const suffix = [];
  for (let i = 0; i < newIds.length; i += 1) {
    if (!oldIdsHash[newIds[i]]) {
      suffix.push(newIds[i]);
    }
  }
  if (suffix.length !== 0) {
    synchronizeAttrs(elm, {
      [attrName]: oldIds + (oldIds.length === 0 ? '' : ' ') + suffix.join(' ')
    });
  }
}

// this method should check each individual id from computedIds
// against the existing value of the attrName on elm, and remove
// them when possible in preparation for some new values.
function removeAriaRefWhenPossible(elm, attrName, computedIds) {
  const newIds = splitIds(computedIds);
  const oldIds = getAttr(elm, attrName) || '';
  const oldIdsHash = hashIds(oldIds);
  const newValues = [];
  for (let i = 0; i < newIds.length; i += 1) {
    if (!oldIdsHash[newIds[i]]) {
      newValues.push(newIds[i]);
    }
  }
  synchronizeAttrs(elm, {
    [attrName]: newValues.join(' ')
  });
}
function createPlaceholderContainer() {
  const container = document.createElement('span');
  container.className = 'slds-assistive-text';
  container.setAttribute('placeholder-container', '');
  return container;
}
class AriaObserver {
  constructor(component) {
    this.component = component;
    this.template = component.template;
    this.isNative = isNativeComponent(component);
    this.state = {};
    this.liveIds = {};
    this.guid = guid();
    this.placeholderContainer = null;
  }
  connectLiveIdRef(refs, callback) {
    const selector = (refs + '').trim().split(/\s+/).map(ref => `[id*="${ref}"]`).join(',');
    const liveId = {
      selector,
      callback
    };
    this.liveIds[refs] = liveId;
  }
  connect({
    targetSelector,
    attribute,
    id,
    ids
  }) {
    ids = ids || id;
    this.state[attribute] = this.state[attribute] || {};
    const attrState = this.state[attribute];

    // note: we don't support linking to a different targetSelector
    attrState.innerSelector = attrState.innerSelector || targetSelector;

    // removing the old ids if possible before setting the new ones
    if (!this.isNative && attrState.ids) {
      const elm = this.template.querySelector(attrState.innerSelector);
      if (elm) {
        removeAriaRefWhenPossible(elm, attribute, attrState.ids);
      }
    }
    attrState.ids = ids;
    if (this.isNative && !attrState.placeholder) {
      // create placeholder element for copied content
      attrState.placeholder = document.createElement('span');
      attrState.placeholder.id = `auto-link-${attribute}-${this.guid}`;
    }
    if (this.component.isConnected) {
      this.privateUpdate(attribute);
    }
  }
  sync() {
    if (!this.component.isConnected) {
      throw new Error(`Invalid sync invocation. It can only be invoked during renderedCallback().`);
    }
    if (this.isNative && !this.mo) {
      this.privateConnect();
    }
    for (const attrName in this.state) {
      if (Object.prototype.hasOwnProperty.call(this.state, attrName)) {
        this.privateUpdate(attrName);
      }
    }

    // live idRef feature is a no-op in native
    if (!this.isNative) {
      this.privateUpdateLiveIds();
    }
  }
  privateExtractIds(elements) {
    return elements.map(el => {
      return el.getAttribute('id');
    }).join(' ');
  }
  privateUpdateLiveIds() {
    const root = this.template.host.getRootNode();

    // if not connected do nothing
    if (!root) {
      return;
    }
    for (const liveId in this.liveIds) {
      if (Object.prototype.hasOwnProperty.call(this.liveIds, liveId)) {
        const thisId = this.liveIds[liveId];
        if (!thisId.elements) {
          // element refs are cached
          thisId.elements = Array.prototype.slice.call(root.querySelectorAll(thisId.selector));
        }
        const newIds = this.privateExtractIds(thisId.elements);
        // only fire calback if the value changed
        if (newIds !== thisId.ids) {
          thisId.callback(newIds);
          thisId.ids = newIds;
        }
      }
    }
  }
  privateUpdate(attrName) {
    const {
      innerSelector
    } = this.state[attrName];
    const elm = this.template.querySelector(innerSelector);
    if (!elm) {
      return; // nothing to update
    }

    let computedIds;
    if (this.isNative) {
      const {
        ids,
        content,
        placeholder
      } = this.state[attrName];
      const newContent = extractContent(extractElements(this.root, ids));
      if (content !== newContent) {
        this.state[attrName].content = placeholder.textContent = newContent;
      }
      if (!placeholder.parentNode) {
        // create placeholder container at template root, if not already exist
        if (!this.placeholderContainer) {
          this.placeholderContainer = createPlaceholderContainer();
          this.template.appendChild(this.placeholderContainer);
        }

        // inserting the placeholder once
        this.placeholderContainer.appendChild(placeholder);
      }
      computedIds = placeholder.id;
    } else {
      computedIds = this.state[attrName].ids;
    }
    addAriaRefWhenNeeded(elm, attrName, computedIds);
  }
  privateConnect() {
    // caching root ref
    this.root = this.template.host.getRootNode();
    // creating the observer once
    this.mo = new MutationObserver(() => {
      if (!this.component.isConnected) {
        return; // do nothing when the template is not connected
      }

      this.sync();
    });
    this.mo.observe(this.root, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }
  disconnect() {
    // MutationObservers must be disconnected manually when using @lwc/synthetic-shadow
    // https://lwc.dev/guide/composition#:~:text=memory%20leak
    if (this.mo) {
      this.mo.disconnect();
      this.mo = undefined;
    }
  }
}
var AriaObserver$1 = registerComponent(AriaObserver, {
  tmpl: _tmpl$2,
  sel: "lightning-ariaObserver"
});

const BUTTON = 'button';
const ROLE = 'role';

/**
 * Primitive for button, buttonIcon and buttonIconStateful
 * We try to have those components to set their aria attributes on their template as much as possible
 * to avoid setting those manually, however there are a few instances
 * in which manual setting is still required:
 *
 *  - aria-disabled: Since it dependes on the disabled state, which is controlled by primitive button.
 *  - aria-controls: Abstracts the logic of setting the id-reference on the host element
 *  - aria-cetails: Role that depeneds on AriaObserver for native shadow.
 *  - aria-describedBy: Role that depeneds on AriaObserver for native shadow.
 *  - aria-flowTo: Abstracts the logic of setting the id-reference on the host element.
 *  - aria-labelledby: Role that depeneds on AriaObserver for native shadow.
 *  - aria-owns: Abstracts the logic of setting the id-reference on the host element.
 */
class LightningPrimitiveButton extends LightningElement {
  /**** COMPONENT PRIVATE PROPERTIES ****/

  /**** COMPONENT PUBLIC APIS ****/
  /**
   * Specifies whether this button should be displayed in a disabled state.
   * Disabled buttons can't be clicked. This value defaults to false.
   *
   * @type {boolean}
   * @default false
   */
  set disabled(value) {
    this.originalDisabledValue = value;
    this.state.disabled = normalizeBoolean(value);
  }
  get disabled() {
    return this.state.disabled;
  }

  /**
   * Specifies a shortcut key to activate or focus an element.
   *
   * @type {string}
   */

  /**
   * Specifies the ID or list of IDs of the element or elements that
   * contain visible descriptive text to describe the button.
   */
  set ariaLabelledBy(value) {
    this.originalAriaLabelledBy = value;
    this.ariaObserver.connect({
      targetSelector: 'button',
      attribute: 'aria-labelledby',
      id: value
    });
  }
  get ariaLabelledBy() {
    return this.originalAriaLabelledBy;
  }

  /**
   * A space-separated list of element IDs that provide descriptive labels for the button.
   *
   * @type {string}
   */
  set ariaDescribedBy(value) {
    this.originalAriaDescribedBy = value;
    this.ariaObserver.connect({
      targetSelector: 'button',
      attribute: 'aria-describedby',
      id: value
    });
  }
  get ariaDescribedBy() {
    return this.originalAriaDescribedBy;
  }

  /**
   * A space-separated list of element IDs whose presence or content is controlled by this button.
   *
   * @type {string}
   */
  set ariaControls(value) {
    this.originalAriaControls = value;
    this.template.host.setAttribute('aria-controls', value);
    this.setHostRoleAttribute(BUTTON);
  }
  get ariaControls() {
    return this.originalAriaControls;
  }

  /**
   * A space-separated list of element IDs whose presence or content is controlled by this button.
   *
   * @type {string}
   */
  set ariaOwns(value) {
    this.originalAriaOwns = value;
    this.template.host.setAttribute('aria-owns', value);
    this.setHostRoleAttribute(BUTTON);
  }
  get ariaOwns() {
    return this.originalAriaOwns;
  }

  /**
   * A space-separated list of element IDs whose presence or content is controlled by this button.
   *
   * @type {string}
   */
  set ariaDetails(value) {
    this.originalAriaDetails = value;
    this.template.host.setAttribute('aria-details', value);
    this.setHostRoleAttribute(BUTTON);
  }
  get ariaDetails() {
    return this.originalAriaDetails;
  }

  /**
   * A space-separated list of element IDs whose presence or content is controlled by this button.
   *
   * @type {string}
   */
  set ariaFlowTo(value) {
    this.originalAriaFlowTo = value;
    this.template.host.setAttribute('aria-flowto', value);
    this.setHostRoleAttribute(BUTTON);
  }
  get ariaFlowTo() {
    return this.originalAriaFlowTo;
  }

  /**
   * Indicates whether an element that the button controls is expanded or collapsed.
   * Valid values are 'true' or 'false'. The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */
  get ariaExpanded() {
    return this.originalAriaExpanded;
  }
  set ariaExpanded(value) {
    this.originalAriaExpanded = value;
    this.state.ariaExpanded = normalizeString(value, {
      fallbackValue: null,
      validValues: ['true', 'false']
    });
  }
  get computedAriaExpanded() {
    return this.state.ariaExpanded;
  }

  /**
   * Indicates the current "pressed" state of toggle buttons.
   * Valid values are 'true' or 'false'. The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */
  set ariaPressed(value) {
    this.originalAriaPressed = value;
    this.state.ariaPressed = normalizeString(value, {
      fallbackValue: null,
      validValues: ['true', 'false']
    });
  }
  get ariaPressed() {
    return this.originalAriaPressed;
  }
  get computedAriaPressed() {
    return this.state.ariaPressed;
  }

  /**
   * Indicates whether an element that the button controls is expanded or collapsed.
   * Valid values are 'true' or 'false'. The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */
  set ariaHidden(value) {
    this.originalAriaHidden = value;
    this.state.ariaHidden = normalizeString(value, {
      fallbackValue: null,
      validValues: ['true', 'false']
    });
  }
  get ariaHidden() {
    return this.originalAriaHidden;
  }
  get computedAriaHidden() {
    return this.state.ariaHidden;
  }

  /**
   * Indicates the element that represents the current item within a container or set of related elements.
   * For example:
   *   - A page token used to indicate a link within a set of pagination links, where the link is visually styled to
   *   represent the currently-displayed page.
   *   - A step token used to indicate a link within a step indicator for a step-based process, where
   *   the link is visually styled to represent the current step.
   *   - A location token used to indicate the image that is visually highlighted as the current component
   *   of a flow chart.
   *   - A date token used to indicate the current date within a calendar.
   *   - A time token used to indicate the current time within a timetable.
   *
   * @type {string}
   * @default undefined
   */

  /**
   * Indicates that the button has an interactive popup element.
   * Valid values are 'true', 'dialog', 'menu', 'listbox', 'tree', and 'grid' based on ARIA 1.1 specifications.
   * The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */
  set ariaHasPopup(value) {
    this.originalAriaHasPopup = value;
    this.state.ariaHasPopup = normalizeString(value, {
      fallbackValue: null,
      validValues: ['true', 'dialog', 'menu', 'listbox', 'tree', 'grid']
    });
  }
  get ariaHasPopup() {
    return this.originalAriaHasPopup;
  }
  get computedAriaHasPopup() {
    return this.state.ariaHasPopup;
  }

  /**
   * Indicates that the button has an interactive popup element.
   * Valid values are 'true', 'dialog', 'menu', 'listbox', 'tree', and 'grid' based on ARIA 1.1 specifications.
   * The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */
  set ariaRelevant(value) {
    this.originalAriaRelevant = value;
    this.state.ariaRelevant = normalizeString(value, {
      fallbackValue: null,
      validValues: ['additions', 'removals', 'text', 'all']
    });
  }
  get ariaRelevant() {
    return this.originalAriaRelevant;
  }
  get computedAriaRelevant() {
    return this.state.ariaRelevant;
  }

  /**
   * Indicates that the button can be updated when it doesn't have focus.
   * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
   * technologies to notify users of updates at a low priority, generally without interrupting.
   * The assertive value causes assistive technologies to notify users immediately,
   * potentially clearing queued speech updates.
   *
   * @type {string}
   */
  set ariaLive(value) {
    this.originalAriaLive = value;
    this.state.ariaLive = normalizeString(value, {
      fallbackValue: null,
      validValues: ['polite', 'assertive', 'off']
    });
  }
  get ariaLive() {
    return this.originalAriaLive;
  }
  get computedAriaLive() {
    return this.state.ariaLive;
  }

  /**
   * Indicates whether assistive technologies present all, or only parts of,
   * the changed region. Valid values are 'true' or 'false'.
   *
   * @type {string}
   */
  set ariaAtomic(value) {
    this.originalAriaAtomic = value;
    this.state.ariaAtomic = normalizeString(value, {
      fallbackValue: null,
      validValues: ['true', 'false']
    });
  }
  get ariaAtomic() {
    return this.originalAriaAtomic;
  }
  get computedAriaAtomic() {
    return this.state.ariaAtomic;
  }

  /**
   * Indicates an element is being modified and that assistive technologies MAY want to wait
   * until the modifications are complete before exposing them to the user.
   * Refer to W3C aria-busy for more
   *
   * @type {string}
   */
  set ariaBusy(value) {
    this.originalAriaBusy = value;
    this.state.ariaBusy = normalizeString(value, {
      fallbackValue: null,
      validValues: ['true', 'false']
    });
  }
  get ariaBusy() {
    return this.originalAriaBusy;
  }
  get computedAriaBusy() {
    return this.state.ariaBusy;
  }
  get computedButtonClass() {
    const classes = classSet('slds-button');
    classes.add(buttonGroupOrderClass(this.groupOrder));
    return classes.toString();
  }

  /**
   * Sets focus on the element.
   */
  focus() {}

  /**
   * Reserved for internal use only.
   * Describes the order of this element (first, middle or last) inside lightning-button-group.
   * @type {string}
   */

  /**** COMPONENT LIFECYCLE EVENTS ****/

  constructor() {
    super();
    this._initialized = false;
    this.state = {
      ariaAtomic: null,
      ariaBusy: null,
      ariaControls: null,
      ariaDetails: null,
      ariaDescribedBy: null,
      ariaExpanded: null,
      ariaFlowTo: null,
      ariaHasPopup: null,
      ariaHidden: null,
      ariaLabelledBy: null,
      ariaLive: null,
      ariaOwns: null,
      ariaPressed: null,
      ariaRelevant: null,
      disabled: false
    };
    this.originalAriaAtomic = void 0;
    this.originalAriaBusy = void 0;
    this.originalAriaControls = void 0;
    this.originalAriaDetails = void 0;
    this.originalAriaDescribedBy = void 0;
    this.originalAriaExpanded = void 0;
    this.originalAriaFlowTo = void 0;
    this.originalAriaHasPopup = void 0;
    this.originalAriaHidden = void 0;
    this.originalAriaLabelledBy = void 0;
    this.originalAriaLive = void 0;
    this.originalAriaOwns = void 0;
    this.originalAriaPressed = void 0;
    this.originalAriaRelevant = void 0;
    this.originalDisabledValue = void 0;
    this.accessKey = void 0;
    /**
     * Displays tooltip text when the mouse cursor moves over the element.
     *
     * @type {string}
     */
    this.title = void 0;
    /**
     * Label describing the button to assistive technologies.
     *
     * @type {string}
     */
    this.ariaLabel = void 0;
    this.ariaCurrent = void 0;
    /**
     * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
     *
     * @type {string}
     * @default undefined
     */
    this.ariaKeyShortcuts = void 0;
    this.groupOrder = '';
    this.ariaObserver = new AriaObserver$1(this);

    // Workaround for an IE11 bug where click handlers on button ancestors
    // receive the click event even if the button element has the `disabled`
    // attribute set.
    if (isIE11) {
      this.template.addEventListener('click', event => {
        if (this.disabled) {
          event.stopImmediatePropagation();
        }
      });
    }
  }
  renderedCallback() {
    if (this.isConnected) {
      this.ariaObserver.sync();
    }
  }
  disconnectedCallback() {
    if (this.ariaObserver) {
      this.ariaObserver.disconnect();
      this.ariaObserver = undefined;
    }
  }

  /**
   * Utility function to set aria roles on the host element.
   * This is used mainly for native-shadow use cases for aria attributes that
   * depenend on ID references.
   *
   * If the role attribute is present we will respect that, otherwise it will be set to
   * an specific role, in this case button.
   *
   * @type {string}
   * @default undefined
   */
  setHostRoleAttribute(value) {
    const hostElement = this.template.host;
    let ariaRoleValue = hostElement.getAttribute(ROLE) || value;
    hostElement.setAttribute(ROLE, ariaRoleValue);
  }
  /*LWC compiler v2.40.1*/
}
registerDecorators(LightningPrimitiveButton, {
  publicProps: {
    disabled: {
      config: 3
    },
    accessKey: {
      config: 0
    },
    title: {
      config: 0
    },
    ariaLabel: {
      config: 0
    },
    ariaLabelledBy: {
      config: 3
    },
    ariaDescribedBy: {
      config: 3
    },
    ariaControls: {
      config: 3
    },
    ariaOwns: {
      config: 3
    },
    ariaDetails: {
      config: 3
    },
    ariaFlowTo: {
      config: 3
    },
    ariaExpanded: {
      config: 3
    },
    ariaPressed: {
      config: 3
    },
    ariaHidden: {
      config: 3
    },
    ariaCurrent: {
      config: 0
    },
    ariaKeyShortcuts: {
      config: 0
    },
    ariaHasPopup: {
      config: 3
    },
    ariaRelevant: {
      config: 3
    },
    ariaLive: {
      config: 3
    },
    ariaAtomic: {
      config: 3
    },
    ariaBusy: {
      config: 3
    },
    groupOrder: {
      config: 0
    }
  },
  publicMethods: ["focus"],
  track: {
    state: 1
  },
  fields: ["_initialized", "originalAriaAtomic", "originalAriaBusy", "originalAriaControls", "originalAriaDetails", "originalAriaDescribedBy", "originalAriaExpanded", "originalAriaFlowTo", "originalAriaHasPopup", "originalAriaHidden", "originalAriaLabelledBy", "originalAriaLive", "originalAriaOwns", "originalAriaPressed", "originalAriaRelevant", "originalDisabledValue"]
});
var LightningPrimitiveButton$1 = registerComponent(LightningPrimitiveButton, {
  tmpl: _tmpl,
  sel: "lightning-primitiveButton"
});

/**
 * A clickable element used to perform an action.
 */
class LightningButton extends LightningPrimitiveButton$1 {
  constructor(...args) {
    super(...args);
    this._normalizedVariant = 'neutral';
    this._stretch = false;
    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @type {string}
     */
    this.name = void 0;
    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @type {string}
     */
    this.value = void 0;
    /**
     * The text to be displayed inside the button.
     *
     * @type {string}
     */
    this.label = void 0;
    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed.
     *
     * @type {string}
     */
    this.iconName = void 0;
    /**
     * Describes the position of the icon with respect to the button label.
     * Options include left and right.
     * This value defaults to left.
     *
     * @type {string}
     * @default left
     */
    this.iconPosition = 'left';
    this._originalStretch = false;
    this._normalizedStretch = false;
    /**
     * Specifies the type of button.
     * Valid values are button, reset, and submit.
     * This value defaults to button.
     *
     * @type {string}
     * @default button
     */
    this.type = 'button';
    /**
     * Reserved for internal use. If present, disables button animation.
     */
    this.disableAnimation = void 0;
  }
  /**
   * The variant changes the appearance of the button.
   * Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.
   * This value defaults to neutral.
   *
   * @type {string}
   * @default neutral
   */
  get variant() {
    return this.originalVariant;
  }
  set variant(value) {
    this.originalVariant = value;
    this._normalizedVariant = normalizeString(value, {
      fallbackValue: 'neutral',
      validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
    });
  }
  /**
   * Setting it to true allows the button to take up the entire available width.
   * This value defaults to false.
   *
   * @type {boolean}
   * @default false
   */
  get stretch() {
    return this._originalStretch;
  }
  set stretch(value) {
    this._originalStretch = value;
    this._normalizedStretch = normalizeBoolean(value);
  }
  render() {
    return _tmpl$1;
  }
  get computedButtonClass() {
    const classes = classSet(super.computedButtonClass);
    return classes.add({
      'slds-button_neutral': this._normalizedVariant === 'neutral',
      'slds-button_brand': this._normalizedVariant === 'brand',
      'slds-button_outline-brand': this._normalizedVariant === 'brand-outline',
      'slds-button_destructive': this._normalizedVariant === 'destructive',
      'slds-button_text-destructive': this._normalizedVariant === 'destructive-text',
      'slds-button_inverse': this._normalizedVariant === 'inverse',
      'slds-button_success': this._normalizedVariant === 'success',
      'slds-button_stretch': this.stretch
    }).toString();
  }
  get normalizedType() {
    return normalizeString(this.type, {
      fallbackValue: 'button',
      validValues: ['button', 'reset', 'submit']
    });
  }
  get normalizedIconPosition() {
    return normalizeString(this.iconPosition, {
      fallbackValue: 'left',
      validValues: ['left', 'right']
    });
  }
  get showIconLeft() {
    return this.iconName && this.normalizedIconPosition === 'left';
  }
  get showIconRight() {
    return this.iconName && this.normalizedIconPosition === 'right';
  }
  get computedIconClass() {
    return classSet('slds-button__icon').add({
      'slds-button__icon_left': this.normalizedIconPosition === 'left',
      'slds-button__icon_right': this.normalizedIconPosition === 'right'
    }).toString();
  }
  handleButtonFocus() {
    this.dispatchEvent(new CustomEvent('focus'));
  }
  handleButtonBlur() {
    this.dispatchEvent(new CustomEvent('blur'));
  }

  /**
   * Sets focus on the button.
   */
  focus() {
    if (this._connected) {
      this.button.focus();
    }
  }

  /**
   * Simulates a mouse click on the button.
   */
  click() {
    if (this._connected) {
      this.button.click();
    }
  }
  get button() {
    return this.template.querySelector('button');
  }

  /**
   * Once we are connected, we fire a register event so the button-group (or other) component can register
   * the buttons.
   */
  connectedCallback() {
    if (!this._connected) {
      this._connected = true;
    }
  }
  renderedCallback() {
    // initialize aria attributes in primitiveButton
    super.renderedCallback();
    // button inherits from primitiveButton, button.css not working in this case.
    // change host style to disable pointer event.
    this.template.host.style.pointerEvents = this.disabled ? 'none' : '';
  }
  disconnectedCallback() {
    this._connected = false;
  }
  /*LWC compiler v2.40.1*/
}
LightningButton.delegatesFocus = true;
registerDecorators(LightningButton, {
  publicProps: {
    name: {
      config: 0
    },
    value: {
      config: 0
    },
    label: {
      config: 0
    },
    variant: {
      config: 3
    },
    iconName: {
      config: 0
    },
    iconPosition: {
      config: 0
    },
    stretch: {
      config: 3
    },
    type: {
      config: 0
    },
    disableAnimation: {
      config: 0
    }
  },
  publicMethods: ["focus", "click"],
  fields: ["_normalizedVariant", "_stretch", "_originalStretch", "_normalizedStretch"]
});
var button = registerComponent(LightningButton, {
  tmpl: _tmpl$1,
  sel: "lightning-button"
});
LightningButton.interopMap = {
  exposeNativeEvent: {
    click: true,
    focus: true,
    blur: true
  }
};

export { _tmpl$2 as _, registerComponent as a, button as b, freezeTemplate as f, registerTemplate as r };
