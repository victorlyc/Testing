var express = require('express');
var Todo = require('../model/todo');
var router = express.Router();

router.get('/todos', function(req, res) {

    Todo.find(function(err, todos) {
        if (err) {
            res.send(err);
        }

        res.json(todos);
    });
});

router.post('/todos', function(req, res) {

    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });

});

router.delete('/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

module.exports = router;