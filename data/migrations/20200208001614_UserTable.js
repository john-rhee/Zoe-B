exports.up = function(knex) {
    return knex.schema.createTable("users", function(table) {
        table.increments();

        table.string("full_name", 128)
             .notNullable();  

        table.string("username", 128)
             .notNullable()
             .unique();

        table.string("password", 128).notNullable();     
        
        table.timestamps(true, true);
        // table.datetime("created_at");
        // table.datetime("updated_at");
             
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};