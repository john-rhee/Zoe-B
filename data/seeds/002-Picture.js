
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('picture').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('picture').insert([
        {name: 'zoe1.jpg', title: 'Busy Zoe', descript: 'Zoe is watching TV.', user_id: 1},
        {name: 'zoe2.jpg', title: 'Zoe Studying', descript: 'Zoe is reading a book.', user_id: 1},
        {name: 'zoe3.jpg', title: 'Halloween Zoe', descript: 'Zoe is waering a Halloween custome.', user_id: 1}
       
      ]);
    });
};
