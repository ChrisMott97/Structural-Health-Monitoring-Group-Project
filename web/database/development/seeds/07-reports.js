/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('reports').del();
  await knex.raw('ALTER SEQUENCE reports_id_seq RESTART WITH 1');
  const reports = [['1', new Date('2022-02-03T12:00:00'), 'West Antenna January 2022', new Date('2022-01-01T00:00:00'), new Date('2022-01-31T23:59:59'), 'Marcia Ratke'],
                 ['2', new Date('2022-02-21T12:00:00'), 'Storm Eunice Impact Report', new Date('2022-02-17T00:00:00'), new Date('2022-02-20T23:59:59'), 'Ross Kunze'],
                 ['3', new Date('2022-02-22T12:00:00'), '2021 Report', new Date('2021-01-01T00:00:00'), new Date('2021-12-31T23:59:59'), 'Mark Evans']]
  
  const results = [];
  reports.forEach((report)=>{
    res = {}
    res.title = report[2]
    res.start_date = report[3]
    res.end_date = report[4]
    res.sensitivity = 1;
    res.user = "auth0|624db449e287a5007080932d"
    results.push(res)
  })
  await knex("reports").insert(results);
};
