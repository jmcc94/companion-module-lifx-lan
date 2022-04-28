const instance_skel = require('../../instance_skel')
const lifx = require('node-lifx-lan')

let debug
let log

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)
		this.action()
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls LIFX lights on a LAN.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Device IP',
				width: 6,
				regex: this.REGEX_IP,
			},
			{
				type: 'textinput',
				id: 'mac',
				label: 'Device MAC',
				width: 12,
				regex: this.REGEX_SOMETHING,
			},
		]
	}

	destroy() {
		lifx.destroy()
		debug('destroy', this.id)
	}
	
	init() {
		light = lifx.createDevice({
					ip: this.config.host,
					mac: this.config.mac
				}).then(() => {
				this.log('info','Light created - ' + ip +'(' + mac + ')')
				})
	}

	action() {
		let actions = {}

		actions['light_off'] = {
			label: 'Turn Light Off',
			options: [
				{
					type: 'dropdown',
					label: 'Light Off',
					id: 'light_off',
					choices: ['On', 'Off']
				}
			],
			callback: (action, bank) => {
				light.turnOff()
			},
		}
	}

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



	feedback() {
	}

	updateConfig(config) {
		this.config = config
	}

	static GetUpgradeScripts() {
		return [upgradeScripts.choicesUpgrade]
	}

}
exports = module.exports = instance
