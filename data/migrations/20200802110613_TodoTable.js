
exports.up = function(knex) {
    return knex.schema.createTable("todo", function(table) {
        table.increments();

        table.string("name", 128)
        .notNullable() 

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
