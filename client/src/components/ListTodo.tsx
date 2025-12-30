import EditTodo from "./EditTodo";

interface Todo {
  todo_id: number;
  todo_description: string;
}

interface ListTodoProps {
  todos: Todo[];
  editId: number | null;
  editDescription: string;
  setEditDescription: (value: string) => void;
  onEdit: (id: number, description: string) => void;
  onSave: (id: number) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
  onResetId: () => void;
}

export default function ListTodo({
  todos,
  editId,
  editDescription,
  setEditDescription,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete,
  onDeleteAll,
  onResetId,
}: ListTodoProps) {
  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={onDeleteAll}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          Delete All
        </button>
        <button
          onClick={onResetId}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Reset ID
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) =>
            editId === todo.todo_id ? (
              <EditTodo
                key={todo.todo_id}
                todo={todo}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                onSave={() => onSave(todo.todo_id)}
                onCancel={onCancelEdit}
              />
            ) : (
              <div
                key={todo.todo_id}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-400 text-sm w-8">
                  #{todo.todo_id}
                </span>
                <span className="flex-1 text-gray-800">
                  {todo.todo_description}
                </span>
                <button
                  onClick={() => onEdit(todo.todo_id, todo.todo_description)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.todo_id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            )
          )
        )}
      </div>
    </>
  );
}
