require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-select-chain":[function(require,module,exports){
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

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mbGNsL3dvcmsvcmVhY3Qtc2VsZWN0LWNoYWluL3NyYy9TZWxlY3RDaGFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWlDLE9BQU87Ozs7QUFFeEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxPQUFPLEVBQWE7S0FBWCxJQUFJLHlEQUFHLEVBQUU7O0FBQ3ZELEtBQUksTUFBTSxnQkFBUSxJQUFJLENBQUUsQ0FBQztBQUN6QixLQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtTQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0VBQUEsQ0FBQyxDQUFBO0FBQzNDLFFBQU8sTUFBTSxDQUFDO0NBQ2QsQ0FBQTs7QUFFRCxJQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQTs7QUFFaEMsU0FBUyxzQkFBc0IsR0FBZTtLQUFkLElBQUkseURBQUcsS0FBSzs7QUFDbEQsUUFBTyxZQUFZO0FBQ2xCLFNBQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQTtFQUN4QyxDQUFBO0NBQ0Q7O0FBRU0sU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ25DLFFBQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFBO0NBQ3pDOztBQUVNLFNBQVMsY0FBYyxDQUFDLElBQUksRUFBRTtBQUNwQyxRQUFPLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFBO0NBQ3RCOztBQUVNLFNBQVMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFFBQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUEsQUFBQyxDQUFBO0NBQzNEOztJQUVvQixXQUFX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LEtBQUssRUFBRSxXQUFXLENBQUMsY0FBYyxBQUFDLEVBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxBQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEFBQUM7TUFDdEgsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztjQUFLOztVQUFRLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEFBQUMsRUFBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxBQUFDO1FBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztRQUFVO09BQUEsQ0FBQztNQUM1STs7U0FBUSxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsQUFBQyxFQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxVQUFVLEFBQUM7T0FBRSxRQUFRLENBQUMsV0FBVyxDQUFDO09BQVU7TUFDbkcsQ0FBQTtLQUNULENBQUM7SUFDSSxDQUFBO0dBQ1A7OztRQWpGbUIsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5BcnJheS5wcm90b3R5cGUuYWdncmVnYXRlID0gZnVuY3Rpb24gKHByb2Nlc3MsIHNlZWQgPSB7fSkge1xuXHRsZXQgcmVzdWx0ID0geyAuLi5zZWVkIH07XG5cdHRoaXMuZm9yRWFjaChpdGVtID0+IHByb2Nlc3MoaXRlbSwgcmVzdWx0KSlcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuY29uc3QgZGVmYXVsdEl0ZW1JZCA9IFwiPGRlZmF1bHRJdGVtSWQ+XCJcblxuZXhwb3J0IGZ1bmN0aW9uIEdldERlZmF1bHRJdGVtRnVuY3Rpb24obmFtZSA9IFwiQWxsXCIpIHtcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4geyBuYW1lOiBuYW1lLCBpZDogZGVmYXVsdEl0ZW1JZCB9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzRGVmYXVsdEl0ZW0oaXRlbSkge1xuXHRyZXR1cm4gaXRlbSAmJiBpdGVtLmlkID09PSAnPGRlZmF1bHQgaWQ+J1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0SWRCeURlZmF1bHQoaXRlbSkge1xuXHRyZXR1cm4gaXRlbSAmJiBpdGVtLmlkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHZXRUaXRsZUJ5RGVmYXVsdChpdGVtKSB7XG5cdHJldHVybiBpdGVtICYmIChpdGVtLnRpdGxlIHx8IGl0ZW0ubmFtZSB8fCBpdGVtLnRvU3RyaW5nKCkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdENoYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcigpXG5cdFx0dGhpcy5nZXREYXRhID0gcHJvcHMuZ2V0RGF0YVxuXHRcdHRoaXMuZmlsdGVycyA9IHByb3BzLmZpbHRlcnNcblx0XHR0aGlzLnNlbGVjdGVkVmFsdWVzID0gcHJvcHMuc2VsZWN0ZWRWYWx1ZXNcblx0XHR0aGlzLm9uRGF0YVJldHVybmVkID0gcHJvcHMub25EYXRhUmV0dXJuZWRcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMubG9hZFN0YXRlKHRoaXMuZmlsdGVycywgdGhpcy5zZWxlY3RlZFZhbHVlcyB8fCB7fSlcblx0fVxuXG5cdGxvYWRTdGF0ZShmaXRsZXJzLCBpbml0aWFsU3RhdGUsIGNoYW5nZXMpIHtcblx0XHRsZXQgcmVzZXRUb0RlZmF1bHQgPSBmYWxzZTtcblxuXHRcdGxldCBzZWxlY3RzID0gZml0bGVycy5tYXAoKGZpbHRlciwgaW5kZXgpID0+IHtcblx0XHRcdGxldCBpdGVtSWQgPSByZXNldFRvRGVmYXVsdCA/IGRlZmF1bHRJdGVtSWQgOiAoaW5pdGlhbFN0YXRlW2ZpbHRlci5rZXldIHx8IGRlZmF1bHRJdGVtSWQpO1xuXHRcdFx0aWYgKGNoYW5nZXMgJiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShmaWx0ZXIua2V5KSkge1xuXHRcdFx0XHRsZXQgbmV3SXRlbUlkID0gY2hhbmdlc1tmaWx0ZXIua2V5XTtcblx0XHRcdFx0aWYgKGl0ZW1JZCAhPT0gbmV3SXRlbUlkKSB7XG5cdFx0XHRcdFx0aXRlbUlkID0gbmV3SXRlbUlkXG5cdFx0XHRcdFx0cmVzZXRUb0RlZmF1bHQgPSB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdFx0c2V0dGluZ3M6IGZpbHRlcixcblx0XHRcdFx0c2VsZWN0ZWRJdGVtSWQ6IGl0ZW1JZCxcblx0XHRcdFx0dmFsdWVzOiBbXVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblxuXHRcdHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RzOiBzZWxlY3RzLCBkYXRhOiBudWxsIH0sIHRoaXMucmV0cmlldmVEYXRhLmJpbmQodGhpcykpO1xuXHR9XG5cblx0cmV0cmlldmVEYXRhKCkge1xuXHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuZ2V0RGF0YS5jYWxsKG51bGwsIHRoaXMuZ2V0U2VsZWN0ZWRWYWx1ZXNGcm9tU3RhdGUodGhpcy5zdGF0ZSkpXG5cdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcblx0XHRcdHJlc3VsdC50aGVuKHByb2Nlc3NEYXRhLmJpbmQodGhpcykpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cHJvY2Vzc0RhdGEuYmluZCh0aGlzKShyZXN1bHQpXG5cdFx0fVxuXHRcdGZ1bmN0aW9uIHByb2Nlc3NEYXRhKHJlc3VsdCkge1xuXHRcdFx0bGV0IHNlbGVjdHMgPSB0aGlzLnN0YXRlLnNlbGVjdHM7XG5cdFx0XHRzZWxlY3RzLmZvckVhY2goc2VsZWN0ID0+IHNlbGVjdC52YWx1ZXMgPSByZXN1bHQudmFsdWVzW3NlbGVjdC5zZXR0aW5ncy52YWx1ZXNLZXldKVxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHNlbGVjdHMsIGRhdGE6IHJlc3VsdC5kYXRhIH0sICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMub25EYXRhUmV0dXJuZWQpIHtcblx0XHRcdFx0XHR0aGlzLm9uRGF0YVJldHVybmVkKHJlc3VsdC5kYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRnZXRTZWxlY3RlZFZhbHVlc0Zyb21TdGF0ZShzdGF0ZSwgcmVzZXREZWZhdWx0cyA9IHRydWUpIHtcblx0XHRyZXR1cm4gc3RhdGUuc2VsZWN0cy5hZ2dyZWdhdGUoKHNlbGVjdCwgcmVzdWx0KSA9PiByZXN1bHRbc2VsZWN0LnNldHRpbmdzLmtleV0gPSByZXNldERlZmF1bHRzICYmIHNlbGVjdC5zZWxlY3RlZEl0ZW1JZCA9PT0gZGVmYXVsdEl0ZW1JZCA/IG51bGwgOiBzZWxlY3Quc2VsZWN0ZWRJdGVtSWQpXG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xuXHRcdGZ1bmN0aW9uIHNlbGVjdEl0ZW0oZXZlbnQpIHtcblx0XHRcdHNlbGYubG9hZFN0YXRlKHNlbGYuZmlsdGVycywgc2VsZi5nZXRTZWxlY3RlZFZhbHVlc0Zyb21TdGF0ZShzZWxmLnN0YXRlLCBmYWxzZSksIHsgW3RoaXMuc2V0dGluZ3Mua2V5XTogZXZlbnQudGFyZ2V0LnZhbHVlIH0pXG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLnN0YXRlIHx8ICF0aGlzLnN0YXRlLnNlbGVjdHMpIHtcblx0XHRcdHJldHVybiA8c3Bhbj5XYWl0PC9zcGFuPlxuXHRcdH1cblx0XHRyZXR1cm4gPHNwYW4+XG5cdFx0XHR7dGhpcy5zdGF0ZS5zZWxlY3RzLm1hcChmaWx0ZXJTdGF0ZSA9PiB7XG5cdFx0XHRcdGxldCBnZXRJZCA9IGZpbHRlclN0YXRlLnNldHRpbmdzLmdldElkIHx8IEdldElkQnlEZWZhdWx0O1xuXHRcdFx0XHRsZXQgZ2V0VGl0bGUgPSBmaWx0ZXJTdGF0ZS5zZXR0aW5ncy5nZXRUaXRsZSB8fCBHZXRUaXRsZUJ5RGVmYXVsdDtcblx0XHRcdFx0bGV0IGdldERlZmF1bHRJdGVtID0gZmlsdGVyU3RhdGUuc2V0dGluZ3MuZ2V0RGVmYXVsdEl0ZW0gfHwgR2V0RGVmYXVsdEl0ZW1GdW5jdGlvbigpO1xuXHRcdFx0XHRsZXQgZGVmYXVsdEl0ZW0gPSBnZXREZWZhdWx0SXRlbSgpO1xuXHRcdFx0XHRyZXR1cm4gPHNlbGVjdCB2YWx1ZT17ZmlsdGVyU3RhdGUuc2VsZWN0ZWRJdGVtSWR9IGtleT17ZmlsdGVyU3RhdGUuc2V0dGluZ3Mua2V5fSBvbkNoYW5nZT17c2VsZWN0SXRlbS5iaW5kKGZpbHRlclN0YXRlKX0+XG5cdFx0XHRcdFx0e2ZpbHRlclN0YXRlLnZhbHVlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiA8b3B0aW9uIHZhbHVlPXtnZXRJZChpdGVtKX0ga2V5PXtmaWx0ZXJTdGF0ZS5zZXR0aW5ncy5rZXkgKyBnZXRJZChpdGVtKX0+e2dldFRpdGxlKGl0ZW0pfTwvb3B0aW9uPil9XG5cdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT17ZGVmYXVsdEl0ZW0uaWR9IGtleT17ZmlsdGVyU3RhdGUuc2V0dGluZ3Mua2V5ICsgXCJfZGVmYXVsdFwifT57Z2V0VGl0bGUoZGVmYXVsdEl0ZW0pfTwvb3B0aW9uPlxuXHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdH0pfVxuXHRcdDwvc3Bhbj5cblx0fVxufSJdfQ==
