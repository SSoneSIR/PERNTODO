interface InputTodoProps {
  description: string;
  setDescription: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function InputTodo({
  description,
  setDescription,
  onSubmit,
}: InputTodoProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a new todo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}
