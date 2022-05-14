import React from "react";

function NotFound() {
  return (
    <div
      className="flex-row"
      style={{
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      <img
        style={{ MaxWidth: "50%" }}
        src="https://res.cloudinary.com/carsmart/image/upload/v1652437721/Flixage/UI/undraw_page_not_found_re_e9o6_mdxaxi.svg"
      ></img>
    </div>
  );
}

export default NotFound;
