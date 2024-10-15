/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function AddTaskModal({ onSave, taskToUpdate, onCloseClick }) {
  const [task, setTask] = useState( taskToUpdate || {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false,
  });
  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));

  const handleChange = (evt) => {
    const name = evt.target.name;
    let value = evt.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(task);
  };

  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <form
        className="mx-auto my-5 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-3 max-md:px-2 lg:my-2 lg:p-3 z-10 absolute top-2/4 left-1/3"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-2 text-center text-2xl font-bold text-white lg:mb-5 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task" }
        </h2>

        <div className="space-y-2 text-white lg:space-y-2">
          <div className="space-y-1 lg:space-y-1">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              id="title"
              required
            />
          </div>

          <div className="space-y-1 lg:space-y-1">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[20px] w-full rounded-md bg-[#2D323F] px-1 py-1 lg:min-h-[20px]"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              id="description"
              required
            ></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
                id="tags"
                required
              />
            </div>

            <div className="space-y-1 lg:space-y-1">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                id="priority"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between lg:mt-5">

          <button className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80 mr-5"
            onClick={onCloseClick}
          >
            Close
          </button>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={() => onSave(task, isAdd)}
          >
            { isAdd ? "Save" : "Update"}
          </button>
        </div>
      </form>
    </>
  );
}
