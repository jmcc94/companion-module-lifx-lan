const instance_skel = require('../../instance_skel')

const lifx = require('node-lifx-lan')

let debug
let log

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...actions,
			...presets,
		})

		this.updateVariableDefinitions = updateVariableDefinitions
		this.updateVariables = updateVariables


	}

	static GetUpgradeScripts() {
		return [upgradeScripts.choicesUpgrade]
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls BirdDog PTZ Cameras.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Device IP',
				width: 6,
				regex: this.REGEX_IP,
			},
		]
	}

	updateConfig(config) {}

	destroy() {
		if (this.udp !== undefined) {
			this.udp.destroy()
		}
		if (this.poll_interval !== undefined) {
			clearInterval(this.poll_interval)
		}
		debug('destroy', this.id)
	}

	init() {}

	initVariables() {
		this.updateVariableDefinitions()
	}

	initFeedbacks() {
		const feedbacks = initFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets(updates) {
		this.setPresetDefinitions(this.getPresets())
	}

	actions(system) {
		this.setActions(this.getActions())
	}

	action(action) {}


}
exports = module.exports = instance
