import "./App.css";
import { movies$ } from "./movies";
import React, { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from "./components/Spinner";
import SelectPageFilter from "./components/SelectPageFilter";
import MultiSelectFilter from "./components/MultiSelectFilter";
import Cards from "./components/Cards";
import Paginate from "./components/Paginate";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalMovie, setTotalMovie] = useState();
  const [filterArr, setFilterArr] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [toggleValue, setToggleValue] = useState("");
  const totalPageCount = Math.ceil(totalMovie / pageSize);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;

  // filter movies by category
  const dataCategory = [];
  for (let i = 0; i < data.length; i++) {
    dataCategory.push(data[i].category);
  }
  const categoryFilter = [...new Set(dataCategory)];

  //filter data if categor(ies) of filterArr exist(s) in data categories
  const currentData = data.filter(
    (word) => filterArr.indexOf(word.category) !== -1
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await movies$;
      setData(response);
      setTotalMovie(response.length);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    // find index of selected card
    const exist = data.find((element) => element.id === id);
    const index = data.indexOf(exist);
    // state update
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    setTotalMovie(newData.length);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleLike = (e, id) => {
    const exist = data.find((element) => element.id === id);
    const index = data.indexOf(exist);
    const newData = [...data];

    if (exist) {
      // if we press like button
      if (e.target.value === "like") {
        if (isLiked === false) {
          if (isDisliked === true) {
            newData[index] = {
              ...newData[index],
              dislikes: newData[index].dislikes - 1,
            };
            delete newData[index].dislikesColor;
            setData(newData);
            setIsDisliked(false);
          }
          newData[index] = {
            ...newData[index],
            likes: newData[index].likes + 1,
            likesColor: "green",
          };
          setData(newData);
          setIsLiked(true);
        } else {
          newData[index] = {
            ...newData[index],
            likes: newData[index].likes - 1,
          };
          delete newData[index].likesColor;
          setData(newData);
          setIsLiked(false);
        }
        // if we press dislike button
      } else if (e.target.value === "dislike") {
        if (isDisliked === false) {
          if (isLiked === true) {
            newData[index] = {
              ...newData[index],
              likes: newData[index].likes - 1,
            };
            delete newData[index].likesColor;
            setData(newData);
            setIsLiked(false);
          }
          newData[index] = {
            ...newData[index],
            dislikes: newData[index].dislikes + 1,
            dislikesColor: "red",
          };
          setData(newData);
          setIsDisliked(true);
        } else {
          e.target.style.color = "";

          newData[index] = {
            ...newData[index],
            dislikes: newData[index].dislikes - 1,
          };
          delete newData[index].dislikesColor;
          setData(newData);
          setIsDisliked(false);
        }
      }
    }
  };

  const handleChecked = (e, elem) => {
    const selectedValue = e.target.checked;
    if (selectedValue) {
      const newTab = [...filterArr];
      newTab.push(elem);
      setFilterArr(newTab);
    } else {
      const exist = filterArr.find((element) => element === elem);
      const index = filterArr.indexOf(exist);
      const newTab = [...filterArr];
      newTab.splice(index, 1);
      setFilterArr(newTab);
    }
  };

  return isLoading ? (
    <>
      <Spinner />
    </>
  ) : (
    <div>
      <h1>React Interview</h1>
      <div className="filter-section">
        {/* page size filter *********/}
        <SelectPageFilter pageSize={pageSize} setPageSize={setPageSize} />

        {/* multiselect categoryFilter/handleChecked ****************/}
        <div className="multiselect-filter">
          Filtrer par catégorie :
          <MultiSelectFilter
            categoryFilter={categoryFilter}
            handleChecked={handleChecked}
          />
        </div>
      </div>

      {/* card list ****************/}
      <div>
        <Cards
          filterArr={filterArr}
          data={data}
          handleLike={handleLike}
          handleDelete={handleDelete}
          firstPageIndex={firstPageIndex}
          lastPageIndex={lastPageIndex}
          toggleValue={toggleValue}
          currentData={currentData}
        />
      </div>
      {/* paginate ******************/}
      <Paginate
        data={data}
        filterArr={filterArr}
        currentData={currentData}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        totalPageCount={totalPageCount}
        pageSize={pageSize}
      />
    </div>
  );
}

export default App;
