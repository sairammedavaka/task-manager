import "./SideBar.css";

function SideBar({
  handleShowAddProject,
  projectList,
  selectedProjectIndex,
  handleSelectProject,
}) {
  // HANDLER FOR ADD PROJECT BUTTON
  function handleAddProjectBtn() {
    handleShowAddProject(true);
  }

  // HANDLER FOR SELECTING PROJECT BUTTON
  function handleSelectingProjectBtn(index) {
    handleSelectProject(index);
  }

  // JSX COMPONENT OF SIDE BAR
  return (
    <section id="sidebar">
      <h2>your projects</h2>
      <span>
        <button onClick={handleAddProjectBtn}>+ Add Project</button>
      </span>
      {!!projectList.length && (
        <ul>
          {projectList.map((item, index) => (
            <li key={index}>
              <button
                data-status={
                  index === selectedProjectIndex ? "active" : "inactive"
                }
                onClick={() => handleSelectingProjectBtn(index)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SideBar;
