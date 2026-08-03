import { NavLink } from "react-router-dom";

export default function Sidenav() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f4f4f4",
          height: "100vh",
          width: "200px",
          gap: "10px",
          padding: "12px",
        }}
      >
        <div className="capsule">
          <NavLink to="/">Timer Page</NavLink>
        </div>
        <div className="capsule">
          <NavLink to="/page1">Page1</NavLink>
        </div>
        <div className="capsule">
          <NavLink to="/page2">Page2</NavLink>
        </div>
      </div>
    </>
  );
}