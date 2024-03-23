import "./MainContent.scss";

const MainContent = (props) => {
  return (
    <>
      <div className="main-content">
        {props.content}
      </div>
    </>
  );
}

export default MainContent;