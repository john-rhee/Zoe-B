const db = require("../data/db-config.js");

module.exports = {
    
    findPicture,
    addPicture,
    findById,
    updatePicture,
    removePicture,
    findByImageId

};

function findById(id) {
    return db("picture")
      .where({ id })
      .first();
  }

function findByImageId(id,userId) {
return db("picture")
    .where({id, user_id:userId})
    .first();
}

function addPicture(picName, picTitle, picDescript, userId) {
    
    return db("picture")
        .insert({name: picName, title: picTitle, descript:picDescript, user_id:userId},"id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findPicture(userId) {
    return db("picture")
        .where({user_id:userId})
}

function updatePicture(picName, picTitle, picDescript, userId, id) {
    return db("picture")
        .where({ id })
        .update({name: picName, title: picTitle, descript:picDescript, user_id:userId})
}

function removePicture(id) {
    return db("picture")
        .where({ id })
        .del();
}
