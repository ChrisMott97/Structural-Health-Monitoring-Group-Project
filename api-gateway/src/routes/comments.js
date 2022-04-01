'use strict'

module.exports = async function (fastify, opts) {
	fastify.get('/comments', async function(request, reply){
		const userID = request.query['user-id']
		const sensorID = request.query['sensor-id']
		const anomalyID = request.query['anomaly-id']

		const comments = await fastify.knex('comments')
			.select()
			.modify((builder) => {
				if(userID) {
					builder.where({user_id: userID})
				}
				if(sensorID) {
					builder.where({sensor_id: sensorID})
				}
				if(anomalyID) {
					builder.where({anomaly_id: anomalyID})
				}
			})

		if(!comments || !comments.length) {
			reply.code(404).send(`No comments found.`)
		}else{
			reply.send(comments)
		}
	})

	fastify.get('/comments/:id', async function(request, reply){
		const id = request.params.id

		const comment = await fastify.knex('comments')
			.select()
			.where({id: id})
			.first()
		
		if(!comment){
			reply.code(404).send(`Comment ${id} is not found.`)
		}else{
			reply.send(comment)
		}
	})
}