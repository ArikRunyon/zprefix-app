/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE meals CASCADE');
  await knex.schema.raw('ALTER SEQUENCE meals_id_seq RESTART WITH 1');
  await knex('meals').del()
  await knex('meals').insert([
    {user_id: 1, name: 'pizza', cook_time_in_minutes: 30, ingredients: 'cheese, sauce, crust, salt, pepper', recipe: 'pizza'},
    {user_id: 2, name: 'pizza', cook_time_in_minutes: 30, ingredients: 'cheese, sauce, crust, salt, pepper', recipe: 'pizza'},
    {user_id: 3, name: 'pizza', cook_time_in_minutes: 30, ingredients: 'cheese, sauce, crust, salt, pepper', recipe: 'pizza'},
  ]);
};
