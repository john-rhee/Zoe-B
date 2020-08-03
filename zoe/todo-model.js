const db = require("../data/db-config.js");

module.exports = {
    findTodo,
    addTodo,
    findById,
    updateTodo,
    removeTodo

};

function findById(id) {
    return db("todo")
        .where({ id })
        .first();
}

function findTodo() {
    return db("todo");
}

function addTodo(todo) {
    return db("todo")
        .insert(todo, "id")
        .then(ids => {
            const [id] = ids;

            return findById(id);
        });
}

function updateTodo(changes, id) {
    return db("todo")
        .where({ id })
        .update(changes)
}

function removeTodo(id) {
    return db("todo")
        .where({ id })
        .del();
}