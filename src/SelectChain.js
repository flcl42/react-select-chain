import React, { Component } from 'react'

Array.prototype.aggregate = function (process, seed = {}) {
	let result = { ...seed };
	this.forEach(item => process(item, result))
	return result;
}

const defaultItemId = "<defaultItemId>"

export function GetDefaultItemFunction(name = "All") {
	return function () {
		return { name: name, id: defaultItemId }
	}
}

export function IsDefaultItem(item) {
	return item && item.id === '<default id>'
}

export function GetIdByDefault(item) {
	return item && item.id
}

export function GetTitleByDefault(item) {
	return item && (item.title || item.name || item.toString())
}

export default class SelectChain extends Component {
	constructor(props) {
		super()
		this.getData = props.getData
		this.filters = props.filters
		this.selectedValues = props.selectedValues
		this.onDataReturned = props.onDataReturned
	}

	componentDidMount() {
		this.loadState(this.filters, this.selectedValues || {})
	}

	loadState(fitlers, initialState, changes) {
		let resetToDefault = false;

		let selects = fitlers.map((filter, index) => {
			let itemId = resetToDefault ? defaultItemId : (initialState[filter.key] || defaultItemId);
			if (changes && changes.hasOwnProperty(filter.key)) {
				let newItemId = changes[filter.key];
				if (itemId !== newItemId) {
					itemId = newItemId
					resetToDefault = true
				}
			}

			let result = {
				settings: filter,
				selectedItemId: itemId,
				values: []
			}
			return result;
		});

		this.setState({ selects: selects, data: null }, this.retrieveData.bind(this));
	}

	retrieveData() {
		const result = this.getData.call(null, this.getSelectedValuesFromState(this.state))
		if (result instanceof Promise) {
			result.then(processData.bind(this))
		}
		else {
			processData.bind(this)(result)
		}
		function processData(result) {
			let selects = this.state.selects;
			selects.forEach(select => select.values = result.values[select.settings.valuesKey])
			this.setState({ selects, data: result.data }, () => {
				if (this.onDataReturned) {
					this.onDataReturned(result.data);
				}
			})
		}
	}

	getSelectedValuesFromState(state, resetDefaults = true) {
		return state.selects.aggregate((select, result) => result[select.settings.key] = resetDefaults && select.selectedItemId === defaultItemId ? null : select.selectedItemId)
	}

	render() {
		let self = this;
		function selectItem(event) {
			self.loadState(self.filters, self.getSelectedValuesFromState(self.state, false), { [this.settings.key]: event.target.value })
		}

		if (!this.state || !this.state.selects) {
			return <span>Wait</span>
		}
		return <span>
			{this.state.selects.map(filterState => {
				let getId = filterState.settings.getId || GetIdByDefault;
				let getTitle = filterState.settings.getTitle || GetTitleByDefault;
				let getDefaultItem = filterState.settings.getDefaultItem || GetDefaultItemFunction();
				let defaultItem = getDefaultItem();
				return <select value={filterState.selectedItemId} key={filterState.settings.key} onChange={selectItem.bind(filterState)}>
					{filterState.values.map((item, index) => <option value={getId(item)} key={filterState.settings.key + getId(item)}>{getTitle(item)}</option>)}
					<option value={defaultItem.id} key={filterState.settings.key + "_default"}>{getTitle(defaultItem)}</option>
				</select>
			})}
		</span>
	}
}