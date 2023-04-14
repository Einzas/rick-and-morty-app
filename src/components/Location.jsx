import React from "react";

const Location = ({ location }) => {
  return (
    <section className="text-green-300 p-5">
      <h2 className="text-center">
        <b>{location?.name} </b>
      </h2>
      <ul className="md:flex md:border-none border-2 border-green-500 gap-3 justify-center items-center ">
        <li>
          <b> Type:</b> {location?.type}
        </li>
        <li>
          <b>Dimension:</b> {location?.dimension}
        </li>
        <li>
          <b>Population:</b> {location?.residents.length}{" "}
        </li>
      </ul>
    </section>
  );
};

export default Location;
