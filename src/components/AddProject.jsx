import { useRef } from "react";
import "./AddProject.css";
import CONSTANTS from "../constants.js";

function AddProject({
  handleShowAddProject,
  handleProjectList,
  handleModalDialog,
}) {
  const title = useRef();
  const description = useRef();
  const date = useRef();

  // HANDLER FOR CANCEL BUTTON
  function handleCancelBtn() {
    handleShowAddProject(false);
  }

  // HANDLER FOR SAVE BUTTON
  function handleSaveBtn() {
    if (
      !!title.current.value &&
      !!description.current.value &&
      !!date.current.value
    ) {
      const tempObj = {
        title: title.current.value,
        desc: description.current.value,
        date: date.current.value,
        tasks: [],
      };

      handleProjectList(tempObj);
    } else {
      handleModalDialog(true, CONSTANTS.SAVE_WARNING_MSG);
    }
  }

  // JSX COMPONENT OF ADD PROJECT
  return (
    <section id="add-project">
      <div className="add-project-btn-container">
        <span>
          <button onClick={handleCancelBtn}>Cancel</button>
        </span>
        <span>
          <button className="add-project-save-btn" onClick={handleSaveBtn}>
            Save
          </button>
        </span>
      </div>
      <form>
        <span>
          <label htmlFor="title">title</label>
          <input ref={title} id="title" type="text" />
        </span>
        <span>
          <label htmlFor="desc">description</label>
          <textarea ref={description} id="desc" name="description"></textarea>
        </span>
        <span>
          <label htmlFor="date">due date</label>
          <input ref={date} id="date" type="date" />
        </span>
      </form>
    </section>
  );
}

export default AddProject;
