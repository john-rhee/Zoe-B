
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {name: 'eat', user_id: 1},
        {name: 'sleep', user_id: 1},
        {name: 'watch tv', user_id: 1}
      ]);
    });
};
