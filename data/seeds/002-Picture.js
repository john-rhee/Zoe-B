
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('picture').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('picture').insert([
        {name: 'zoe', title: 'Happy Zoe', descript: 'Zoe is sitting.', user_id: 1}
       
      ]);
    });
};
