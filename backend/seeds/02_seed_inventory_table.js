/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE inventory CASCADE');
  await knex.schema.raw('ALTER SEQUENCE inventory_id_seq RESTART WITH 1');
  await knex('inventory').del()
  await knex('inventory').insert([
    {user_id: '1', item_name: 'grappling hook', description: 'no mission too impossible', quantity: '4'},
    {user_id: '2', item_name: 'walkie talkie', description: 'Hans! Dont do it!', quantity: '1'},
    {user_id: '3', item_name: 'star of destiny', description: 'star? guitar pick? both!', quantity: '1'},
    {user_id: '3', item_name: 'over 100', description: 'over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 over 100 ', quantity: '1'},
  ]);
};
