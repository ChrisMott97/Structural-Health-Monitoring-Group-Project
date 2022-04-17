/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("related").del();
  let results = [];
  await knex("sensors")
    .select()
    .then((rows) => {
      rows.forEach((i) => {
        rows.forEach((j) => {
          if (i.location == j.location && i.id != j.id) {
            results.push({ sensor_id: i.id, related_id: j.id });
          }
        });
      });
    });
  await knex("related").insert(results);
};
// # # matches related sensors by location
// # for sensor in sensors_data:
// #     for related_sensor in sensors_data:
// #         if (sensor["location"] == related_sensor["location"]) and not (sensor["id"] == related_sensor["id"]):
// #             related_data.append({
// #                 "sensor_id": sensor["id"],
// #                 "related_id": related_sensor["id"]
// #                 })
