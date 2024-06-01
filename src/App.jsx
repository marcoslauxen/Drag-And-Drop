import { useState } from "react";
import { Task } from "./components/Task";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "./index.css";

function App() {
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, name: "Estudar react" },
    { id: 2, name: "Ir para academia" },
    { id: 3, name: "Fazer compras" },
  ]);

  function handleAddTask(event) {
    event.preventDefault();

    if (newTask.trim() === "") {
      return (
        alert("Digite o nome da tarefa para adicionar"),
        setNewTask("")
      )
    }

    const newTaskObj = {
      id: Date.now(),
      name: newTask,
    };
    setTasks((allTasks) => [...allTasks, newTaskObj]);
    setNewTask("");
  }

  function reoder(list, startIndex, endIndex) {
    const result = Array.from(list);  
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result) {
    if (!result.destination) return;

    const reorderedTasks = reoder(tasks, result.source.index, result.destination.index);
    setTasks(reorderedTasks);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Lista de Tarefas</h1>

      <form className="flex justify-center mb-8 w-full max-w-lg" onSubmit={handleAddTask}>
        <input
          className="border border-gray-300 rounded-lg p-3 mr-2 w-full focus:outline-none focus:border-blue-500 transition-shadow shadow-sm"
          type="text"
          placeholder="Digite o nome da tarefa..."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          type="submit"
        >
          Adicionar
        </button>
      </form>

      <section className="w-full max-w-lg">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
}

export default App;
