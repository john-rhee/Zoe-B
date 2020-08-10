const db = require("../data/db-config.js");

module.exports = {
    
    findPicture,
    addPicture,
    findById,

};

function findById(id) {
    return db("picture")
      .select("id", "name")
      .where({ id })
      .first();
  }

function addPicture(picName) {
    
    return db("picture")
        .insert({name: picName},"id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findPicture() {
    return db("picture");
}
