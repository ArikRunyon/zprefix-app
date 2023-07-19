/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE users CASCADE');
  await knex.schema.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'tom', last_name: 'cruise', username: 'bigtallman', password: 'knowshesmall'},
    {first_name: 'bruce', last_name: 'willis', username: 'bedtimehero', password: '$2b$10$LIYR0m1B/uQ0XThvvI.z9uUSO20a0G0ijeJujtWybDYHaI9LXSYeW'},
    {first_name: 'jack', last_name: 'black', username: 'bowserirl', password: 'peachespeachespeaches'},
  ]);
};
