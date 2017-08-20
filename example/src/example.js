var React = require('react');
var ReactDOM = require('react-dom');
var SelectChain = require('react-select-chain');

var App = React.createClass({
	render () {
		return (
			<div>
				<SelectChain />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
