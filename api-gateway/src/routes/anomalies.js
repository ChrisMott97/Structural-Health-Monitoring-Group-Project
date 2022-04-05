'use strict'

module.exports = async function (fastify, opts) {
	fastify.get('/anomalies', async function(request, reply){
		const status = request.query.status
		const limit = request.query.limit
		const offset = request.query.offset
		const from = request.query.from
		const until = request.query.until
		const sensor = request.query.sensor

		const anomalies = await fastify.knex('anomalies')
			.join("data", function() {
				this.on('anomalies.sensor_id', '=', 'data.sensor_id').andOn('anomalies.sensor_time', '=', 'data.time')
			})
			.join("users", "anomalies.user_id", "=", "users.id")
			.select('anomalies.id', 'time', 'value', 'anomalies.sensor_id', 'status', 'confidence', 'updated_at', 'notes', 'name', 'user_id')
			.modify((builder) => {
				if(status){
					builder.where({status: status})
				}
				if(limit){
					builder.limit(limit)
				}
				if(limit){
					builder.offset(offset)
				}
				if(from && until) {
					builder.whereBetween("time", [from, until])
				}
				if(sensor){
					builder.where({"anomalies.sensor_id": sensor})
				}

			})

		if(!anomalies || !anomalies.length){
			reply.code(404).send(`No anomalies found.`)
		}else{
			reply.send(anomalies)
		}

	})

	fastify.get('/anomalies/:id', async function(request, reply){
		const id = request.params.id

		const anomaly = fastify.knex('anomalies')
			.join("data", function() {
				this.on('anomalies.sensor_id', '=', 'data.sensor_id').andOn('anomalies.sensor_time', '=', 'data.time')
			})
			.join("users", "anomalies.user_id", "=", "users.id")
			.select('anomalies.id', 'time', 'value', 'anomalies.sensor_id', 'status', 'confidence', 'updated_at', 'notes', 'name', 'user_id')
			.where({"anomalies.id": id})
			.first()

		if(!anomaly){
			reply.code(404).send(`Anomaly with ID ${id} not found.`)
		}else{
			reply.send(anomaly)
		}
	})
}