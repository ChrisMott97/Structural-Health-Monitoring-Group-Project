const knexConfig = require('../database/knexfile.js')['development']
const knex = require('knex')(knexConfig);

function find(limit, offset, type, subtype, location){
	return knex('sensors')
	.select()
	.modify((builder)=>{
		limit && builder.limit(limit)
		offset && builder.offset(offset)
		type && builder.where({type: type})
		subtype && builder.where({subtype: subtype})
		location && builder.where({location: location})
	})
}

function findOne(id){
	return knex('sensors')
  .select()
  .where({id: id})
  .first()
}

function findRelated(id){
	return knex('related')
  .select("related_id")
  .where({sensor_id: id})
}
module.exports = { find, findOne, findRelated }