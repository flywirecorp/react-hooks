import { useState, useCallback, useEffect, useReducer } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function useForm() {
  var initialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useState = useState({
    values: initialValues,
    dirtyFields: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  function handleChange(name, value) {
    setState(_objectSpread2(_objectSpread2({}, state), {}, {
      values: _objectSpread2(_objectSpread2({}, state.values), {}, _defineProperty({}, name, value)),
      dirtyFields: _objectSpread2(_objectSpread2({}, state.dirtyFields), {}, _defineProperty({}, name, true))
    }));
  }

  return _objectSpread2(_objectSpread2({}, state), {}, {
    handleChange: handleChange
  });
}

var useOnClickOutside = function useOnClickOutside(ref, callback) {
  var handler = useCallback(function (evt) {
    var hasReferencedElement = ref && ref.current;
    if (!hasReferencedElement) return;
    var hasClickedOutside = !ref.current.contains(evt.target);
    if (hasClickedOutside) callback();
  }, [ref, callback]);
  useEffect(function () {
    document.addEventListener('click', handler);
    return function () {
      return document.removeEventListener('click', handler);
    };
  }, [handler]);
};

var useOnScroll = function useOnScroll(callback) {
  useEffect(function () {
    document.addEventListener('scroll', callback);
    return function () {
      document.removeEventListener('scroll', callback);
    };
  }, [callback]);
};

var FIRST_STEP = 0;

function useStep(_ref) {
  var steps = _ref.steps,
      _ref$initialStep = _ref.initialStep,
      initialStep = _ref$initialStep === void 0 ? FIRST_STEP : _ref$initialStep;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      completed = _useState2[0],
      setCompleted = _useState2[1];

  var _useState3 = useState(initialStep),
      _useState4 = _slicedToArray(_useState3, 2),
      index = _useState4[0],
      setIndex = _useState4[1];

  var step = steps[index];

  var inRange = function inRange(index) {
    if (typeof index === 'number') {
      if (index < FIRST_STEP) return FIRST_STEP;
      if (index >= steps.length) return steps.length - 1;
      return index;
    }

    return steps.findIndex(function (step) {
      return step.id === index;
    }) || FIRST_STEP;
  };

  var go = function go(step) {
    return setIndex(inRange(step));
  };

  var next = function next() {
    return go(index + 1);
  };

  var prev = function prev() {
    return go(index - 1);
  };

  var complete = function complete(step) {
    var index = inRange(step);
    var id = steps[index].id;
    setCompleted(_toConsumableArray(new Set([].concat(_toConsumableArray(completed), [id]))));
  };

  var uncomplete = function uncomplete(step) {
    var index = inRange(step);
    var stepId = steps[index].id;
    setCompleted(completed.filter(function (id) {
      return id !== stepId;
    }));
  };

  return {
    complete: complete,
    completed: completed,
    index: index,
    navigation: {
      next: next,
      prev: prev,
      go: go
    },
    step: step,
    uncomplete: uncomplete
  };
}

function useToggle() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return useReducer(function (state) {
    return !state;
  }, initialState);
}

export { useForm, useOnClickOutside, useOnScroll, useStep, useToggle };
