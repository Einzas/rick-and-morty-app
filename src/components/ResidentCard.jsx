import axios from "axios";
import React, { useEffect, useState } from "react";

const ResidentCard = ({ resident }) => {
  const [residentInfo, setResidentInfo] = useState();

  useEffect(() => {
    axios
      .get(resident)
      .then((res) => {
        setResidentInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <article className="border-2 w-72 border-green-500">
      <div className="relative">
        <img className="w-max " src={residentInfo?.image} alt="" />
        <div className="flex absolute bottom-0 mb-[10px] left-[50%] -translate-x-1/2 w-max p-2 text-white gap-2 border-2 border-green-500 bg-slate-950/70">
          <div
            className={`p-3 w-1 rounded-full z-10 ${
              residentInfo?.status === "Alive"
                ? "bg-green-500"
                : residentInfo?.status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          ></div>
          <span className="capitalize">{residentInfo?.status}</span>
        </div>
      </div>
      <section className="border-t-2 p-2  border-green-500">
        <h3 className="font-bold text-xl text-white">{residentInfo?.name}</h3>
        <ul className="text-white flex flex-col">
          <li className="grid grid-cols-2">
            <span> {residentInfo?.species}</span>
            <span className="text-gray-600">Species</span>
          </li>
          <li className="grid grid-cols-2">
            <span className="text-gray-600">Origin</span>
            <span>{residentInfo?.origin.name}</span>
          </li>
          <li className="grid grid-cols-2">
            <span className="text-gray-600">Times appear</span>
            <span>{residentInfo?.episode.length}</span>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default ResidentCard;
