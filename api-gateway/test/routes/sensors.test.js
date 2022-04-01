'use strict'

const { test } = require('tap')
const { build } = require('../helper')



test('get all sensors route', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/sensors'
  })
  t.equal(res.statusCode, 200)
})

test('get one sensor route', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    method: 'GET',
    url: '/sensors/GPH000EDE'
  })
  t.same(JSON.parse(res.payload), {id: "GPH000EDE",type: "GPS", subtype: "Longitude", location: "East Antenna", unit: "degrees"})
  t.equal(res.statusCode, 200)
})

test('get one sensor route that does not exist', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    method: 'GET',
    url: '/sensors/sdfnjksd'
  })
  t.equal(res.statusCode, 404)
})


