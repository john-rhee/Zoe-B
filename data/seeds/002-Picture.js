
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('picture').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('picture').insert([
        {name: 'zoe1.jpg', title: 'Busy Zoe', descript: 'Zoe is watching TV.', user_id: 1},
        {name: 'zoe1.jpg', title: 'Busy Zoe', descript: 'Zoe is watching TV.', user_id: 1},
        {name: 'zoe1.jpg', title: 'Busy Zoe', descript: 'Zoe is watching TV.', user_id: 1},
       
      ]);
    });
};
