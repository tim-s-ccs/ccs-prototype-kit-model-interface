import FrameworkConfig from './types/frameworkConfig'

const frameworkConfig: FrameworkConfig = require.main?.require('./frameworkConfig.json') as FrameworkConfig

export default frameworkConfig