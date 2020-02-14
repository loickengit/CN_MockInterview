
let dev_config = require('./development')

let env = (process.env.NODE_ENV === undefined
  || process.env.NODE_ENV === 'development') ? 'dev':process.env.NODE_ENV

let config = {}
if (env === 'dev'){
  config = dev_config
} else if (env === 'production'){

}

exports.config = config
