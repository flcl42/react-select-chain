import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SelectChain, { GetDefaultItemFunction } from 'react-select-chain';

class App extends Component {
	constructor() {
		super()
		this.state = { data: null }
	}

	processResponse(data) {
		this.setState({ ...this.state, data });
	}

	getMockData(data) {
		return {
			values: {
				dates: ["01/01/2017", "01/02/2017", "01/03/2017"],
				cities: [{ id: "1", name: "Minsk" }, { id: "2", name: "Moscow" }, { id: "3", name: "New York" }],
				stations: [{ id: "1", name: "Place #1" }, { id: "2", name: "Place #2" }],
				timeOfDay: [{ id: "1", name: "Morning" }, { id: "2", name: "Afternoon" }, { id: "3", name: "Evening" }],
			},
			data: "Hello! There is data for such request:" + JSON.stringify(data)
		}
	}

	render() {

		const selectOptions = {
			filters: [
				{ key: 'date', getId: (item) => item, valuesKey: 'dates', getDefaultItem: GetDefaultItemFunction("From the beginning") },
				{ key: 'dateTill', getId: (item) => item, valuesKey: 'dates', getDefaultItem: GetDefaultItemFunction("Till now") },
				{ key: 'city', valuesKey: 'cities', dependsOnPrevious: false },
				{ key: 'station', valuesKey: 'stations' },
				{ key: 'timeOfDay', valuesKey: 'timeOfDay' }
			],
			getData: this.getMockData,
			selectedValues: { date: "01/01/2017", city: "1" },
			onDataReturned: this.processResponse.bind(this)
		}

		return <div>
			<h2>Example</h2>
			<p>Select where to by a ticket to:<br />
				<SelectChain {...selectOptions} /></p>
			<p>Data returned:
				{this.state.data}</p>
		</div>
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
