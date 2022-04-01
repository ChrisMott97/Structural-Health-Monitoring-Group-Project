'use strict'

const { test } = require('tap')
const { build } = require('../helper')



test('get all users route', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    url: '/users'
  })
  t.equal(res.statusCode, 200)
})

test('get one user route', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    method: 'GET',
    url: '/users/1'
  })
  t.equal(JSON.parse(res.payload).id, 1)
  t.equal(res.statusCode, 200)
})

test('get one user route that does not exist', async (t) => {
  const app = await build(t)
  const res = await app.inject({
    method: 'GET',
    url: '/users/-1'
  })
  t.equal(res.statusCode, 404)
})

// inject callback style:
//
// test('default root route', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/'
//   }, (err, res) => {
//     t.error(err)
//     t.same(JSON.parse(res.payload), { root: true })
//   })
// })
