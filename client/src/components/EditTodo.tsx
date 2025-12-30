interface EditTodoProps {
  todo: {
    todo_id: number;
    todo_description: string;
  };
  editDescription: string;
  setEditDescription: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditTodo({
  todo,
  editDescription,
  setEditDescription,
  onSave,
  onCancel,
}: EditTodoProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="text-gray-400 text-sm w-8">#{todo.todo_id}</span>
      <input
        type="text"
        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
      />
      <button
        onClick={onSave}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
