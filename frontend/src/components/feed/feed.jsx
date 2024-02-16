import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { searchCourses, setAllCourses } from "../../lib/state-management";
import { ClipLoader } from "react-spinners";

const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const starWarsPeople = useSelector((state) => state.filteredCourses);

  const fetchStarWarsPeople = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${pageNumber}`
      );
      const totalCount = response.data.count;
      const totalPagesCount = Math.ceil(totalCount / 10); // Assuming 10 items per page
      setTotalPages(totalPagesCount);
      const starWarsPeopleWithImages = response.data.results.map((person) => ({
        ...person,
        imageUrl: `https://picsum.photos/200/300?random=${Math.random()}`, // Random image from picsum with width 200 and height 300
      }));
      dispatch(setAllCourses(starWarsPeopleWithImages));
    } catch (error) {
      console.error("Error fetching Star Wars people:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarWarsPeople(page);
  }, [page]);

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(searchCourses(value));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 mx-1 border border-gray-300 rounded-lg ${
            page === i ? "bg-blue-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="border-grey border rounded-lg shadow-md mt-5 items-center w-[30%] m-auto">
        <input
          type="text"
          className="py-2 pl-2 border-none rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          placeholder="Search Task"
          onChange={handleSearch}
        />
      </div>
<div className="mt-6">
      {loading ? (
        <div className="flex w-full justify-center align-middle m-auto h-[80vh] items-center">
          <ClipLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 w-[98%] m-auto">
        {starWarsPeople.map((person, index) => (
      <div
        key={index}
        className="bg-white p-4 rounded-lg shadow-md mb-5"
        style={{ backgroundColor: person.hair_color }}
      >
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
            <img
              src={person.imageUrl}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">{person.name}</div>
            <p className="text-gray-600 text-sm mb-2">
              Hair Color: {person.hair_color}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Skin Color: {person.skin_color}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Gender: {person.gender}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Vehicles Count: {person.vehicles.length}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
      )}

      <div className="flex justify-center my-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-3 py-1 border border-gray-300 rounded-lg ${
            page === 1 && "bg-gray-300 text-gray-700"
          }`}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-3 py-1 border border-gray-300 rounded-lg ${
            page === totalPages && "bg-gray-300 text-gray-700"
          }`}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default Feed;
