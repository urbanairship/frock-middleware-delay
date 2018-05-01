/**
 * Copyright 2015 Urban Airship Inc. and Contributors. Subject to the LICENSE
 * file at the top-level directory of this distribution and at
 * https://github.com/urbanairship/frock-middleware-delay/blob/master/LICENSE
 */
try {
  require('babel-polyfill')
} catch (e) {
  // babel polyfill throws if it's ever included in any other module
}

module.exports = createDelayMiddleware

function createDelayMiddleware (frock, logger, _options = {}) {
  const options = Object.assign(
    {},
    {
      min: 0,
      max: 100
    },
    _options
  )

  return handler

  function handler (req, res, next) {
    const delay = randInt(options.min, options.max)

    logger.info(`Delaying ${delay}ms`)

    setTimeout(() => {
      next(req, res)
    }, delay)
  }
}

createDelayMiddleware.validate = validate

function randInt (min, max) {
  return Math.floor((Math.random() * (max - min))) + min
}

function validate () {
  return true
}
