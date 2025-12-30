const express= require('express');
const app=express();
const cors= require('cors');
const pool = require('./db');

//middleware    
app.use(cors());
app.use(express.json());

//routes
//create a todo

app.post('/todos', async(req,res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING todo_id, description AS todo_description", [description])
        const allTodos = await pool.query("SELECT todo_id, description AS todo_description FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})
//get all todo

app.get('/todos', async(req,res)    => {
    try {
        const allTodos=await pool.query("SELECT todo_id, description AS todo_description FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get a todo
app.get('/todos/:id', async(req,res)    => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT todo_id, description AS todo_description FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//update a todo

app.put('/todos/:id', async(req,res) => {
    try {
         const {id} = req.params;
         const {description} = req.body;
         const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
         res.json("Todo updated");
    } catch (error) {
        console.log(error.message);
    }
})
//delete a todo
app.delete('/todos/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo deleted");
    } catch (error) {
        console.log(error.message);
    }
})  

//reset id sequence
app.post('/todos/reset-id', async(req,res) => {
    try {
        await pool.query("ALTER SEQUENCE todo_todo_id_seq RESTART WITH 1");
        res.json("ID sequence reset");
    } catch (error) {
        console.log(error.message);
    }
})

//delete all todo
app.delete('/todos', async(req,res) => {
    try {
        const deleteTodo = await pool.query("DELETE FROM todo");
        await pool.query("ALTER SEQUENCE todo_todo_id_seq RESTART WITH 1");
        res.json("Todo deleted");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
