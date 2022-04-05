'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/sensors', async function (request, reply) {
    const limit = request.query.limit
    const type = request.query.type
    const subtype = request.query.subtype
    const location = request.query.location
    const offset = request.query.offset

    const sensors = await fastify.knex('sensors')
    .select()
    .modify((builder)=>{
      if(limit){
        builder.limit(limit)
      }
      if(offset){
        builder.offset(offset)
      }
      if(type){
        builder.where({type: type})
      }
      if(subtype){
        builder.where({subtype: subtype})
      }
      if(location){
        builder.where({location: location})
      }
    })
    if(!sensors || !sensors.length){
      reply.code(404).send(`No sensors found.`)
    }else{
      reply.send(sensors)
    }
  })

  fastify.get('/sensors/types', async function (request, reply) {
    const types = await fastify.knex('sensors').distinct('type')

    if(!types || !types.length){
      reply.code(404).send(`No sensor types found.`)
    }else{
      reply.send(types.map(a => a.type))
    }
  })

  fastify.get('/sensors/subtypes', async function (request, reply) {
    const subtypes = await fastify.knex('sensors').distinct('subtype')

    if(!subtypes || !subtypes.length){
      reply.code(404).send(`No sensor subtypes found.`)
    }else{
      reply.send(subtypes.map(a => a.subtype))
    }
  })

  fastify.get('/sensors/locations', async function (request, reply) {
    const locations = await fastify.knex('sensors').distinct('location')

    if(!locations || !locations.length){
      reply.code(404).send(`No sensor locations found.`)
    }else{
      reply.send(locations.map(a => a.location))
    }
  })

  fastify.get('/sensors/:id', async function (request, reply) {
    const id = request.params.id
    if(!id){
      reply.redirect('/sensors')
    }
    
    const sensor = await fastify.knex('sensors').select().where({id: id}).first()
    if(!sensor){
      reply.code(404).send(`Sensor ${id} is not found.`)
    }else{
      reply.send(sensor)
    }
  })

  fastify.get('/sensors/:id/related', async function (request, reply) {
    const id = request.params.id
    
    const sensors = await fastify.knex('related').select("related_id").where({sensor_id: id})
    if(!sensors || !sensors.length){
      reply.code(404).send(`No related sensors found.`)
    }else{
      reply.send(sensors.map(a => a.related_id))
    }
  })
}