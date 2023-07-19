/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('inventory', table => {
        table.increments().primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('set null')
        table.text('item_name');
        table.text('description');
        table.integer('quantity');
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('inventory');
};
