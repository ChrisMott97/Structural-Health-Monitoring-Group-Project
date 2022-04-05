'use strict'

module.exports = async function (fastify, opts) {
	fastify.get('/data', async function(request, reply){
		const sensor = request.query.sensor
		const from = request.query.from
		const until = request.query.until
		const limit = request.query.limit
		const offset = request.query.offset
		
		const data = await fastify.knex('data')
		.select()
		.modify((builder) => {
			if(sensor) {
				builder.where({sensor_id: sensor})
			}
			if(from && until) {
				builder.whereBetween("time", [from, until])
			}
			if(limit) {
				builder.limit(limit)
			}
			if(offset) {
				builder.offset(offset)
			}
		})
		
		if(!data || !data.length){
			reply.code(404).send(`No data found.`)
		}else{
			reply.send(data)
		}
	})
}