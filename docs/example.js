require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelectChain = require('react-select-chain');

var _reactSelectChain2 = _interopRequireDefault(_reactSelectChain);

var App = (function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
		this.state = { data: null };
	}

	_createClass(App, [{
		key: 'processResponse',
		value: function processResponse(data) {
			this.setState(_extends({}, this.state, { data: data }));
		}
	}, {
		key: 'getMockData',
		value: function getMockData(data) {
			return {
				values: {
					dates: ["01/01/2017", "01/02/2017", "01/03/2017"],
					cities: [{ id: "1", name: "Minsk" }, { id: "2", name: "Moscow" }, { id: "3", name: "New York" }],
					stations: [{ id: "1", name: "Place #1" }, { id: "2", name: "Place #2" }],
					timeOfDay: [{ id: "1", name: "Morning" }, { id: "2", name: "Afternoon" }, { id: "3", name: "Evening" }]
				},
				data: "Hello! There is data for such request:" + JSON.stringify(data)
			};
		}
	}, {
		key: 'render',
		value: function render() {

			var selectOptions = {
				filters: [{ key: 'date', getId: function getId(item) {
						return item;
					}, valuesKey: 'dates', getDefaultItem: (0, _reactSelectChain.GetDefaultItemFunction)("From the beginning") }, { key: 'dateTill', getId: function getId(item) {
						return item;
					}, valuesKey: 'dates', getDefaultItem: (0, _reactSelectChain.GetDefaultItemFunction)("Till now") }, { key: 'city', valuesKey: 'cities', dependsOnPrevious: false }, { key: 'station', valuesKey: 'stations' }, { key: 'timeOfDay', valuesKey: 'timeOfDay' }],
				getData: this.getMockData,
				selectedValues: { date: "01/01/2017", city: "1" },
				onDataReturned: this.processResponse.bind(this)
			};

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					'h2',
					null,
					'Example'
				),
				_react2['default'].createElement(
					'p',
					null,
					'Select where to by a ticket to:',
					_react2['default'].createElement('br', null),
					_react2['default'].createElement(_reactSelectChain2['default'], selectOptions)
				),
				_react2['default'].createElement(
					'p',
					null,
					'Data returned:',
					_react2['default'].createElement('br', null),
					this.state.data
				),
				_react2['default'].createElement(
					'h2',
					null,
					'Usage'
				),
				_react2['default'].createElement(
					'p',
					null,
					'See ',
					_react2['default'].createElement(
						'code',
						null,
						'selectOptions'
					),
					' in example of initial parameters. ',
					_react2['default'].createElement(
						'code',
						null,
						'getMockData'
					),
					' shows how to pass values into inputs.',
					_react2['default'].createElement('br', null)
				),
				_react2['default'].createElement(
					'p',
					null,
					'The component takes currently selected values from arguments and then retrieves data about options for every select. When an option is selected it retrieves data again and resets inputs to right of crrent one to "All" state.'
				)
			);
		}
	}]);

	return App;
})(_react.Component);

_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-select-chain":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mbGNsL3dvcmsvcmVhY3Qtc2VsZWN0LWNoYWluL2V4YW1wbGUvc3JjL2V4YW1wbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztxQkNBaUMsT0FBTzs7Ozt3QkFDbkIsV0FBVzs7OztnQ0FDb0Isb0JBQW9COzs7O0lBRWxFLEdBQUc7V0FBSCxHQUFHOztBQUNHLFVBRE4sR0FBRyxHQUNNO3dCQURULEdBQUc7O0FBRVAsNkJBRkksR0FBRyw2Q0FFQTtBQUNQLE1BQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUE7RUFDM0I7O2NBSkksR0FBRzs7U0FNTyx5QkFBQyxJQUFJLEVBQUU7QUFDckIsT0FBSSxDQUFDLFFBQVEsY0FBTSxJQUFJLENBQUMsS0FBSyxJQUFFLElBQUksRUFBSixJQUFJLElBQUcsQ0FBQztHQUN2Qzs7O1NBRVUscUJBQUMsSUFBSSxFQUFFO0FBQ2pCLFVBQU87QUFDTixVQUFNLEVBQUU7QUFDUCxVQUFLLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQztBQUNqRCxXQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUNoRyxhQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7QUFDeEUsY0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7S0FDdkc7QUFDRCxRQUFJLEVBQUUsd0NBQXdDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDckUsQ0FBQTtHQUNEOzs7U0FFSyxrQkFBRzs7QUFFUixPQUFNLGFBQWEsR0FBRztBQUNyQixXQUFPLEVBQUUsQ0FDUixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGVBQUMsSUFBSTthQUFLLElBQUk7TUFBQSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLDhDQUF1QixvQkFBb0IsQ0FBQyxFQUFFLEVBQ3hILEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBQyxJQUFJO2FBQUssSUFBSTtNQUFBLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsOENBQXVCLFVBQVUsQ0FBQyxFQUFFLEVBQ2xILEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxFQUM5RCxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUN6QyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUM1QztBQUNELFdBQU8sRUFBRSxJQUFJLENBQUMsV0FBVztBQUN6QixrQkFBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ2pELGtCQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQy9DLENBQUE7O0FBRUQsVUFBTzs7O0lBQ047Ozs7S0FBZ0I7SUFDaEI7Ozs7S0FBa0MsNENBQU07S0FDdkMsZ0VBQWlCLGFBQWEsQ0FBSTtLQUFJO0lBQ3ZDOzs7O0tBQWlCLDRDQUFNO0tBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtLQUFLO0lBQ3RCOzs7O0tBQWM7SUFDZDs7OztLQUNLOzs7O01BQTBCOztLQUFtQzs7OztNQUF3Qjs7S0FBc0MsNENBQU07S0FDbEk7SUFDSjs7OztLQUVJO0lBQ0MsQ0FBQTtHQUNOOzs7UUFuREksR0FBRzs7O0FBc0RULHNCQUFTLE1BQU0sQ0FBQyxpQ0FBQyxHQUFHLE9BQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdENoYWluLCB7IEdldERlZmF1bHRJdGVtRnVuY3Rpb24gfSBmcm9tICdyZWFjdC1zZWxlY3QtY2hhaW4nO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpXG5cdFx0dGhpcy5zdGF0ZSA9IHsgZGF0YTogbnVsbCB9XG5cdH1cblxuXHRwcm9jZXNzUmVzcG9uc2UoZGF0YSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLnN0YXRlLCBkYXRhIH0pO1xuXHR9XG5cblx0Z2V0TW9ja0RhdGEoZGF0YSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZXM6IHtcblx0XHRcdFx0ZGF0ZXM6IFtcIjAxLzAxLzIwMTdcIiwgXCIwMS8wMi8yMDE3XCIsIFwiMDEvMDMvMjAxN1wiXSxcblx0XHRcdFx0Y2l0aWVzOiBbeyBpZDogXCIxXCIsIG5hbWU6IFwiTWluc2tcIiB9LCB7IGlkOiBcIjJcIiwgbmFtZTogXCJNb3Njb3dcIiB9LCB7IGlkOiBcIjNcIiwgbmFtZTogXCJOZXcgWW9ya1wiIH1dLFxuXHRcdFx0XHRzdGF0aW9uczogW3sgaWQ6IFwiMVwiLCBuYW1lOiBcIlBsYWNlICMxXCIgfSwgeyBpZDogXCIyXCIsIG5hbWU6IFwiUGxhY2UgIzJcIiB9XSxcblx0XHRcdFx0dGltZU9mRGF5OiBbeyBpZDogXCIxXCIsIG5hbWU6IFwiTW9ybmluZ1wiIH0sIHsgaWQ6IFwiMlwiLCBuYW1lOiBcIkFmdGVybm9vblwiIH0sIHsgaWQ6IFwiM1wiLCBuYW1lOiBcIkV2ZW5pbmdcIiB9XSxcblx0XHRcdH0sXG5cdFx0XHRkYXRhOiBcIkhlbGxvISBUaGVyZSBpcyBkYXRhIGZvciBzdWNoIHJlcXVlc3Q6XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblxuXHRcdGNvbnN0IHNlbGVjdE9wdGlvbnMgPSB7XG5cdFx0XHRmaWx0ZXJzOiBbXG5cdFx0XHRcdHsga2V5OiAnZGF0ZScsIGdldElkOiAoaXRlbSkgPT4gaXRlbSwgdmFsdWVzS2V5OiAnZGF0ZXMnLCBnZXREZWZhdWx0SXRlbTogR2V0RGVmYXVsdEl0ZW1GdW5jdGlvbihcIkZyb20gdGhlIGJlZ2lubmluZ1wiKSB9LFxuXHRcdFx0XHR7IGtleTogJ2RhdGVUaWxsJywgZ2V0SWQ6IChpdGVtKSA9PiBpdGVtLCB2YWx1ZXNLZXk6ICdkYXRlcycsIGdldERlZmF1bHRJdGVtOiBHZXREZWZhdWx0SXRlbUZ1bmN0aW9uKFwiVGlsbCBub3dcIikgfSxcblx0XHRcdFx0eyBrZXk6ICdjaXR5JywgdmFsdWVzS2V5OiAnY2l0aWVzJywgZGVwZW5kc09uUHJldmlvdXM6IGZhbHNlIH0sXG5cdFx0XHRcdHsga2V5OiAnc3RhdGlvbicsIHZhbHVlc0tleTogJ3N0YXRpb25zJyB9LFxuXHRcdFx0XHR7IGtleTogJ3RpbWVPZkRheScsIHZhbHVlc0tleTogJ3RpbWVPZkRheScgfVxuXHRcdFx0XSxcblx0XHRcdGdldERhdGE6IHRoaXMuZ2V0TW9ja0RhdGEsXG5cdFx0XHRzZWxlY3RlZFZhbHVlczogeyBkYXRlOiBcIjAxLzAxLzIwMTdcIiwgY2l0eTogXCIxXCIgfSxcblx0XHRcdG9uRGF0YVJldHVybmVkOiB0aGlzLnByb2Nlc3NSZXNwb25zZS5iaW5kKHRoaXMpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIDxkaXY+XG5cdFx0XHQ8aDI+RXhhbXBsZTwvaDI+XG5cdFx0XHQ8cD5TZWxlY3Qgd2hlcmUgdG8gYnkgYSB0aWNrZXQgdG86PGJyIC8+XG5cdFx0XHRcdDxTZWxlY3RDaGFpbiB7Li4uc2VsZWN0T3B0aW9uc30gLz48L3A+XG5cdFx0XHQ8cD5EYXRhIHJldHVybmVkOjxiciAvPlxuXHRcdFx0XHR7dGhpcy5zdGF0ZS5kYXRhfTwvcD5cblx0XHRcdDxoMj5Vc2FnZTwvaDI+XG5cdFx0XHQ8cD5cblx0XHRcdFx0U2VlIDxjb2RlPnNlbGVjdE9wdGlvbnM8L2NvZGU+IGluIGV4YW1wbGUgb2YgaW5pdGlhbCBwYXJhbWV0ZXJzLiA8Y29kZT5nZXRNb2NrRGF0YTwvY29kZT4gc2hvd3MgaG93IHRvIHBhc3MgdmFsdWVzIGludG8gaW5wdXRzLjxiciAvPlxuXHRcdFx0PC9wPlxuXHRcdFx0PHA+XG5cdFx0XHRcdFRoZSBjb21wb25lbnQgdGFrZXMgY3VycmVudGx5IHNlbGVjdGVkIHZhbHVlcyBmcm9tIGFyZ3VtZW50cyBhbmQgdGhlbiByZXRyaWV2ZXMgZGF0YSBhYm91dCBvcHRpb25zIGZvciBldmVyeSBzZWxlY3QuIFdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkIGl0IHJldHJpZXZlcyBkYXRhIGFnYWluIGFuZCByZXNldHMgaW5wdXRzIHRvIHJpZ2h0IG9mIGNycmVudCBvbmUgdG8gXCJBbGxcIiBzdGF0ZS5cblx0XHRcdDwvcD5cblx0XHQ8L2Rpdj5cblx0fVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiJdfQ==
