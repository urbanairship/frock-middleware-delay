import 'core-js/shim'

export default createDelayMiddleware

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
