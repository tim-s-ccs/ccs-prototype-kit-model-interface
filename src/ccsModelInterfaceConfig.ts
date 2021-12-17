import CCSModelInterfaceConfig from './types/ccsModelInterfaceConfig'

const ccsModelInterfaceConfig: CCSModelInterfaceConfig = require.main?.require('./ccsModelInterfaceConfig.json') as CCSModelInterfaceConfig

export default ccsModelInterfaceConfig