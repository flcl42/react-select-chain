"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.GetDefaultItemFunction = GetDefaultItemFunction;
exports.IsDefaultItem = IsDefaultItem;
exports.GetIdByDefault = GetIdByDefault;
exports.GetTitleByDefault = GetTitleByDefault;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

Array.prototype.aggregate = function (process) {
	var seed = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var result = _extends({}, seed);
	this.forEach(function (item) {
		return process(item, result);
	});
	return result;
};

var defaultItemId = "<defaultItemId>";

function GetDefaultItemFunction() {
	var name = arguments.length <= 0 || arguments[0] === undefined ? "All" : arguments[0];

	return function () {
		return { name: name, id: defaultItemId };
	};
}

function IsDefaultItem(item) {
	return item && item.id === '<default id>';
}

function GetIdByDefault(item) {
	return item && item.id;
}

function GetTitleByDefault(item) {
	return item && (item.title || item.name || item.toString());
}

var SelectChain = (function (_Component) {
	_inherits(SelectChain, _Component);

	function SelectChain(props) {
		_classCallCheck(this, SelectChain);

		_get(Object.getPrototypeOf(SelectChain.prototype), "constructor", this).call(this);
		this.getData = props.getData;
		this.filters = props.filters;
		this.selectedValues = props.selectedValues;
		this.onDataReturned = props.onDataReturned;
	}

	_createClass(SelectChain, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.loadState(this.filters, this.selectedValues || {});
		}
	}, {
		key: "loadState",
		value: function loadState(fitlers, initialState, changes) {
			var resetToDefault = false;

			var selects = fitlers.map(function (filter, index) {
				var itemId = resetToDefault ? defaultItemId : initialState[filter.key] || defaultItemId;
				if (changes && changes.hasOwnProperty(filter.key)) {
					var newItemId = changes[filter.key];
					if (itemId !== newItemId) {
						itemId = newItemId;
						resetToDefault = true;
					}
				}

				var result = {
					settings: filter,
					selectedItemId: itemId,
					values: []
				};
				return result;
			});

			this.setState({ selects: selects, data: null }, this.retrieveData.bind(this));
		}
	}, {
		key: "retrieveData",
		value: function retrieveData() {
			var result = this.getData.call(null, this.getSelectedValuesFromState(this.state));
			if (result instanceof Promise) {
				result.then(processData.bind(this));
			} else {
				processData.bind(this)(result);
			}
			function processData(result) {
				var _this = this;

				var selects = this.state.selects;
				selects.forEach(function (select) {
					return select.values = result.values[select.settings.valuesKey];
				});
				this.setState({ selects: selects, data: result.data }, function () {
					if (_this.onDataReturned) {
						_this.onDataReturned(result.data);
					}
				});
			}
		}
	}, {
		key: "getSelectedValuesFromState",
		value: function getSelectedValuesFromState(state) {
			var resetDefaults = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

			return state.selects.aggregate(function (select, result) {
				return result[select.settings.key] = resetDefaults && select.selectedItemId === defaultItemId ? null : select.selectedItemId;
			});
		}
	}, {
		key: "render",
		value: function render() {
			var self = this;
			function selectItem(event) {
				self.loadState(self.filters, self.getSelectedValuesFromState(self.state, false), _defineProperty({}, this.settings.key, event.target.value));
			}

			if (!this.state || !this.state.selects) {
				return _react2["default"].createElement(
					"span",
					null,
					"Wait"
				);
			}
			return _react2["default"].createElement(
				"span",
				null,
				this.state.selects.map(function (filterState) {
					var getId = filterState.settings.getId || GetIdByDefault;
					var getTitle = filterState.settings.getTitle || GetTitleByDefault;
					var getDefaultItem = filterState.settings.getDefaultItem || GetDefaultItemFunction();
					var defaultItem = getDefaultItem();
					return _react2["default"].createElement(
						"select",
						{ value: filterState.selectedItemId, key: filterState.settings.key, onChange: selectItem.bind(filterState) },
						filterState.values.map(function (item, index) {
							return _react2["default"].createElement(
								"option",
								{ value: getId(item), key: filterState.settings.key + getId(item) },
								getTitle(item)
							);
						}),
						_react2["default"].createElement(
							"option",
							{ value: defaultItem.id, key: filterState.settings.key + "_default" },
							getTitle(defaultItem)
						)
					);
				})
			);
		}
	}]);

	return SelectChain;
})(_react.Component);

exports["default"] = SelectChain;