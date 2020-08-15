exports.up = function(knex) {
    return knex.schema.createTable("picture", function(table) {
        table.increments();

        table.string("name", 128)
        .notNullable()

        table.string("title", 128)

        table.string("descript", 128)


        // 🔑 Foreign Key 🔑 //
        table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');   
     
    });
};

exports.down = function(knex) {
  
};

