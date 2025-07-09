import { useRef } from "react";
import "./ProjectDetails.css";
import CONSTANTS from "../constants.js";

function ProjectDetails({
  selectedProjectIndex,
  projectList,
  handleAddTaskToList,
  handleClearTaskFromList,
  handleDelProjectFromList,
  handleModalDialog,
}) {
  const addTask = useRef();

  // HANDLER FOR DELETE BUTTON
  function handleDeleteBtn() {
    handleDelProjectFromList(selectedProjectIndex);
  }

  // HANDLER FOR ADD TASK BUTTON
  function handleAddTaskBtn() {
    if (!!addTask.current.value) {
      handleAddTaskToList(selectedProjectIndex, addTask.current.value);

      addTask.current.value = "";
    } else {
      handleModalDialog(true, CONSTANTS.TASK_WARNING_MSG);
    }
  }

  // HANDLER FOR CLEAR BUTTON
  function handleClearBtn(index) {
    handleClearTaskFromList(selectedProjectIndex, index);
  }

  // JSX COMPONENT OF PROJECT DETAILS
  return (
    <section id="project-details">
      <div className="project-details-top-container">
        <div>
          <h2>{projectList[selectedProjectIndex].title}</h2>
          <p>
            {new Date(
              projectList[selectedProjectIndex].date + "T00:00:00"
            ).toDateString()}
          </p>
          <p>{projectList[selectedProjectIndex].desc}</p>
        </div>
        <span>
          <button onClick={handleDeleteBtn}>Delete</button>
        </span>
      </div>
      <div className="project-details-bottom-container">
        <h2>Tasks</h2>
        <span>
          <input ref={addTask} id="addTask" type="text" />
          <button onClick={handleAddTaskBtn}>Add Task</button>
        </span>
        {!!projectList[selectedProjectIndex].tasks.length && (
          <ul>
            {projectList[selectedProjectIndex].tasks.map((item, index) => (
              <li key={index}>
                <span>{item}</span>
                <button onClick={() => handleClearBtn(index)}>Clear</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ProjectDetails;
