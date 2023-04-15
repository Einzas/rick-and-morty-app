import React, { useEffect, useState } from "react";
import ResidentCard from "./ResidentCard";

const ResidentList = ({ location, scrollTo }) => {
  const residents = location?.residents;
  const [currentPage, setCurrentPage] = useState(1);

  const RESIDENTS_PER_PAGE = 15;
  const quantityPages = Math.ceil(residents?.length / RESIDENTS_PER_PAGE);

  const arrayPages = [];
  for (let i = 1; i <= quantityPages; i++) {
    arrayPages.push(i);
  }

  const residentsOnPage = residents?.slice(
    (currentPage - 1) * RESIDENTS_PER_PAGE,
    currentPage * RESIDENTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [location]);

  return (
    <>
      <section className="grid md:grid-cols-3 gap-5">
        {residentsOnPage?.map((resident) => {
          return <ResidentCard key={resident} resident={resident} />;
        })}
      </section>
      {arrayPages.length > 1 ? (
        <div className="flex mt-4 justify-center items-center">
          <ul className="flex gap-2 ">
            {arrayPages.map((page) => {
              return (
                <li
                  key={page}
                  className={`p-2 cursor-pointer rounded-sm ${
                    page === currentPage ? "bg-green-500" : "bg-gray-500"
                  }`}
                  onClick={() => {
                    setCurrentPage(page);
                    scrollTo("list");
                  }}
                >
                  {page}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ResidentList;
