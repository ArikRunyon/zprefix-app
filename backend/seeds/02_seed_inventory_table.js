/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE ingredients CASCADE');
  await knex.schema.raw('ALTER SEQUENCE ingredients_id_seq RESTART WITH 1');
  await knex('ingredients').del()
  await knex('ingredients').insert([
    {user_id: '1', item_name: 'grappling hook', benefits: 'no mission too impossible', drawbacks: '4', grow_season: 'winter'},
    {user_id: '2', item_name: 'grappling', benefits: 'no mission too impossible', drawbacks: '4', grow_season: 'winter'},
    {user_id: '3', item_name: 'grappling hook', benefits: 'no mission too impossible', drawbacks: '4', grow_season: 'winter'},
    {user_id: '3', item_name: 'hook', benefits: 'no mission too impossible', drawbacks: '4', grow_season: 'winter'},
  ]);
};
