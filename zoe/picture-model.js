const db = require("../data/db-config.js");

module.exports = {
    
    findPicture,
    addPicture,
    // findById,

};

// function findById(id) {
//     return db("picture")
//         .where({ id })
//         .first();
// }

function addPicture(picture) {
    return db("picture")
        .insert(picture
            // ,"id"
            )
        // .then(ids => {
        //     const [id] = ids;

        //     return findById(id);
        // });
}

function findPicture() {
    return db("picture");
}
