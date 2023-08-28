/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ingredients', table => {
        table.increments().primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('set null')
        table.text('item_name');
        table.text('benefits');
        table.text('drawbacks');
        table.text('grow_season');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ingredients');
};
