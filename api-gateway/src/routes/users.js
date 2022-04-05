'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/users', async function (request, reply) {
    const limit = request.query.limit
    const offset = request.query.offset

    const users = await fastify.knex('users')
    .select('id', 'name', 'permission')
    .modify((builder) => {
			if(limit) {
				builder.limit(limit)
			}
      if(offset) {
				builder.offset(offset)
			}
		})
    if(!users || !users.length){
      reply.code(404).send(`No users found.`)
    }else{
      reply.send(users)
    }
  })

  fastify.get('/users/:id', async function (request, reply) {
    const id = request.params.id
    if(!id){
      reply.redirect('/users')
    }
    
    const user = await fastify.knex('users').select('id', 'name', 'permission').where({id: id}).first()
    if(!user){
      reply.code(404).send(`User ${id} is not found.`)
    }else{
      reply.send(user)
    }
  })
}
