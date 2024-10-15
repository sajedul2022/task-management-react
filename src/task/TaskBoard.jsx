import { useState } from "react";
import ActionTask from "./ActionTask";
import ListTask from "./ListTask";
import SearchTask from "./SearchTask";
import AddTaskModal from "./AddTaskModal";
import NoTask from "./NoTask";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }

  function HandleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskID) {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskID);
    setTasks(tasksAfterDelete);
  }
  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavTask(taskID) {
    const tasksIndex = tasks.findIndex((task) => task.id === taskID);
    const newTasks = [...tasks];
    newTasks[tasksIndex].isFavorite = !newTasks[tasksIndex].isFavorite;
    setTasks(newTasks);
  }

  function handleSearch(SearchTerm) {
    const filterd = tasks.filter((task) =>
      task.title.toLowerCase().includes(SearchTerm.toLowerCase())
    );
    setTasks([...filterd]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={HandleCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <ActionTask
            onAddClick={() => setShowAddModal(true)}
            onDeleteAll={handleDeleteAll}
          />
          {tasks.length > 0 ?
          (<ListTask
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onFav={handleFavTask}
          />)
          : (<NoTask/>)
}
        </div>
      </div>
    </section>
  );
}
