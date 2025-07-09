import { useState, useEffect } from "react";
import AddProject from "./components/AddProject.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import SideBar from "./components/SideBar.jsx";
import Modal from "./components/Modal.jsx";
import CONSTANTS from "./constants.js";

function App() {
  // STATE MANAGEMENT TO DISPLAY/HIDE ADD PROJECT COMPONENT
  const [showAddProject, setShowAddProject] = useState(false);

  // STATE MANAGEMENT TO HANDLE PROJECT LIST
  const [projectList, setProjectList] = useState([]);

  // STATE MANAGEMENT TO TRACK SELECTED PROJECT INDEX FROM PROJECT LIST
  const [selectedProjectIndex, setSelectedProjectIndex] = useState("");

  // STATE MANAGEMENT TO DISPLAY/HIDE MODAL
  const [showModal, setShowModal] = useState({ visible: false, message: "" });

  // STATE MANAGEMENT TO TRIGGER USE EFFECT TO SAVE UPDATED PROJECT LIST DATA IN LOCAL STORAGE
  const [isUpdated, setIsUpdated] = useState(false);

  // RETRIVE PROJECT LIST DATA FROM LOCAL STORAGE
  useEffect(() => {
    const retriveLocalStorage = localStorage.getItem(
      CONSTANTS.PRODUCT_MANAGEMENT
    );

    if (projectList.length === 0 && retriveLocalStorage !== null) {
      const parsedData = JSON.parse(retriveLocalStorage);

      if (parsedData.length > 0) {
        setProjectList([...parsedData]);
      }
    }
  }, []);

  // SAVE UPDATED PROJECT LIST DATA INTO LOCAL STORAGE
  useEffect(() => {
    if (projectList.length > 0 && isUpdated) {
      const stringifyData = JSON.stringify([...projectList]);

      localStorage.setItem(CONSTANTS.PRODUCT_MANAGEMENT, stringifyData);

      setIsUpdated(false);
    }

    if (projectList.length === 0 && isUpdated) {
      localStorage.setItem(CONSTANTS.PRODUCT_MANAGEMENT, JSON.stringify([]));

      setIsUpdated(false);
    }
  }, [isUpdated]);

  // HANDLER TO SHOW/HIDE ADD PROJECT
  function handleShowAddProject(cond) {
    setShowAddProject(cond);

    setSelectedProjectIndex("");
  }

  // HANDLER FOR ADDING NEW PROJECT TO EXITSTING PROJECT LIST
  function handleProjectList(data) {
    setProjectList((prevState) => [...prevState, data]);

    handleShowAddProject(false);

    setIsUpdated(true);

    handleModalDialog(true, CONSTANTS.CREATED_SUCCESSFUL_MSG);
  }

  // HANDLER FOR TRACKING SELECTED PROJECT INDEX
  function handleSelectProject(projectIndex) {
    setSelectedProjectIndex(projectIndex);
  }

  // HANDLER FOR ADDING TASK TO TASKS LIST FOR SELECTED PROJECT
  function handleAddTaskToList(projectIndex, taskName) {
    const project = projectList[projectIndex];

    project.tasks = [...project.tasks, taskName];

    projectList.splice(projectIndex, 1, project);

    setProjectList([...projectList]);

    setIsUpdated(true);

    handleModalDialog(true, CONSTANTS.TASK_ADDED_MSG);
  }

  // HANDLER FOR CLEARING TASK FROM TASKS LIST ON SELECTED PROJECT
  function handleClearTaskFromList(projectIndex, taskIndex) {
    const project = projectList[projectIndex];

    project.tasks.splice(taskIndex, 1);

    projectList.splice(projectIndex, 1, project);

    setProjectList([...projectList]);

    setIsUpdated(true);

    handleModalDialog(true, CONSTANTS.TASK_CLEARED_MSG);
  }

  // HANDLER FOR DELETING PROJECT FROM PROJECT LIST
  function handleDelProjectFromList(projectIndex) {
    const filteredList = projectList.filter(
      (item, index) => index !== projectIndex
    );

    setProjectList([...filteredList]);

    handleShowAddProject(false);

    setIsUpdated(true);

    handleModalDialog(true, CONSTANTS.DELETED_SUCCESSFUL_MSG);
  }

  // HANDLER FOR MODAL DIALOG
  function handleModalDialog(cond, msg) {
    setShowModal({ visible: cond, message: msg });
  }

  // JSX COMPONENT OF APP
  return (
    <main id="main-container">
      {/* MODAL DIALOG COMPONENT */}
      {showModal.visible && (
        <Modal
          message={showModal.message}
          handleModalDialog={handleModalDialog}
        />
      )}
      {/* SIDE BAR COMPONENT */}
      <SideBar
        handleShowAddProject={handleShowAddProject}
        projectList={projectList}
        selectedProjectIndex={selectedProjectIndex}
        handleSelectProject={handleSelectProject}
      />
      <div className="display-container">
        {/* HOME SCREEN COMPONENT */}
        {!showAddProject && selectedProjectIndex === "" && (
          <HomeScreen handleShowAddProject={handleShowAddProject} />
        )}
        {/* ADD PROJECT COMPONENT */}
        {showAddProject && selectedProjectIndex === "" && (
          <AddProject
            handleShowAddProject={handleShowAddProject}
            handleProjectList={handleProjectList}
            handleModalDialog={handleModalDialog}
          />
        )}
        {/* PROJECT DETAILS COMPONENT */}
        {selectedProjectIndex !== "" && (
          <ProjectDetails
            projectList={projectList}
            selectedProjectIndex={selectedProjectIndex}
            handleAddTaskToList={handleAddTaskToList}
            handleClearTaskFromList={handleClearTaskFromList}
            handleDelProjectFromList={handleDelProjectFromList}
            handleModalDialog={handleModalDialog}
          />
        )}
      </div>
    </main>
  );
}

export default App;
