
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 1, name: 'eat'},
        {id: 2, name: 'sleep'},
        {id: 3, name: 'watch tv'}
      ]);
    });
};
