import { useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";

interface Todo {
  todo_id: number;
  todo_description: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      setTodos(data);
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id: number) => {
    if (!editDescription || !editDescription.trim()) return;

    try {
      await fetch(`${API_URL}/todos/ ${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editDescription }),
      });
      setTodos(
        todos.map((todo) =>
          todo.todo_id === id
            ? { ...todo, todo_description: editDescription }
            : todo
        )
      );
      setEditId(null);
      setEditDescription("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteAll = async () => {
    try {
      await fetch(`${API_URL}/todos`, {
        method: "DELETE",
      });
      setTodos([]);
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };

  const resetId = async () => {
    try {
      await fetch(`${API_URL}/todos/reset-id`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error resetting ID:", error);
    }
  };

  const handleEdit = (id: number, description: string) => {
    setEditId(id);
    setEditDescription(description);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditDescription("");
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          PERN Todo App
        </h1>

        <InputTodo
          description={description}
          setDescription={setDescription}
          onSubmit={addTodo}
        />

        <ListTodo
          todos={todos}
          editId={editId}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          onEdit={handleEdit}
          onSave={updateTodo}
          onCancelEdit={handleCancelEdit}
          onDelete={deleteTodo}
          onDeleteAll={deleteAll}
          onResetId={resetId}
        />
      </div>
    </div>
  );
}
