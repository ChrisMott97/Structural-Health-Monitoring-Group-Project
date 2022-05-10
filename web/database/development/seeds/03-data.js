/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const fs = require("fs");
 const path = require("path");
 
 exports.seed = async function (knex) {
   // Deletes ALL existing entries
   const rawdata = fs.readFileSync(path.resolve(__dirname, "./data.json"));
   let data = JSON.parse(rawdata);
   await knex("data").del();
   await knex("data").insert(data);
 };
 