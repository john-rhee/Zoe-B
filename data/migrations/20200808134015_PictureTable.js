exports.up = function(knex) {
    return knex.schema.createTable("picture", function(table) {
        table.increments();

        table.string("name", 128)
        .notNullable()
     
    });
};

exports.down = function(knex) {
  
};

