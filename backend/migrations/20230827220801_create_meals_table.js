/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('meals', table => {
        table.increments().primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id').onDelete('set null')
        table.text('name')
        table.integer('cook_time_in_minutes')
        table.text('ingredients')
        table.text('recipe')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('meals');
};
