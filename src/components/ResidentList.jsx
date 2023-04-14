import React from "react";
import ResidentCard from "./ResidentCard";

const ResidentList = ({ location }) => {
  const residents = location?.residents;
  
  return (
    <section className="grid md:grid-cols-3 gap-5">
      {residents?.map((resident) => {
        
        return <ResidentCard  key={resident} resident={resident} />;
 
      })}
    </section>
  );
};

export default ResidentList;
