import "./ContainerText.css";

const ContainerText = ({ title, children }) => {
  return (
    <div className="card">

      <div className="header">{title}</div>

      <div className="container-content">
        {children}
      </div>

    </div>
  );
};

export default ContainerText;