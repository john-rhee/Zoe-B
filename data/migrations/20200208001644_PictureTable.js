exports.up = function(knex) {
    return knex.schema.createTable("pictures", function(table) {
        table.increments();

        table.string("name", 128)
             .notNullable()   

        table.string("produtImage")     

        // 🔑 Foreign Key 🔑
        table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');      

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pictures");
};