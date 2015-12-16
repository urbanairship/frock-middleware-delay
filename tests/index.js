try {
  require('babel-polyfill')
} catch (e) {
  // babel polyfill throws if it's ever included in any other module
}

const test = require('tape')

const lib = require('../lib')

const log = {
  debug: () => {},
  info: () => {}
}

test(`setup ${__filename}`, t => {
  t.plan(1)
  t.pass('set it up')
})

test('delays within the expected ranges', t => {
  t.plan(1)

  const handler = lib(null, log, {min: 100, max: 200})

  const start = Date.now()

  handler(null, null, () => {
    const end = Date.now()
    const delay = end - start

    // ensure we don't have failures due to timing inconsistencies at the end
    // of the acceptable ranges; these are ok--js timing is not accurate
    if (delay > 200) {
      t.ok(approximately(delay, 200, 10))
      return
    } else if (delay < 100) {
      t.ok(approximately(delay, 100, 10))
      return
    }

    t.ok(delay < 200 && delay > 100)
  })
})

test('passes through req and res unchanged', t => {
  t.plan(2)

  const req = {}
  const res = {}

  const handler = lib(null, log, {min: 10, max: 20})

  handler(req, res, (rq, rs) => {
    /* eslint-disable eqeqeq */
    t.ok(req == rq)
    t.ok(res == rs)
    /* eslint-enable eqeqeq */
  })
})

test('logs delay message', t => {
  t.plan(2)

  log.info = msg => t.ok(msg.includes('ms'))

  const handler = lib(null, log, {min: 10, max: 20})

  handler(null, null, () => t.pass('done'))
})

test(`teardown ${__filename}`, t => {
  t.plan(1)
  t.pass('tore it down')
})

function approximately (number, compare, skew) {
  const lower = compare - skew
  const upper = compare + skew

  return lower < number && number < upper
}
