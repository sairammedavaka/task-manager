import "./HomeScreen.css";
import noProjectImg from "../assets/no-projects.png";

function HomeScreen({ handleShowAddProject }) {
  // HANDLER FOR CREATE NEW PROJECT BUTTON
  function handleCreateNewProjectBtn() {
    handleShowAddProject(true);
  }

  // JSX COMPONENT OF HOME SCREEN
  return (
    <section id="home-screen">
      <div className="no-project-image">
        <img src={noProjectImg} alt="No project logo" />
      </div>
      <h2>No Project Selected</h2>
      <p>Select a project or get started with a new one</p>
      <span>
        <button onClick={handleCreateNewProjectBtn}>Create new project</button>
      </span>
    </section>
  );
}

export default HomeScreen;
