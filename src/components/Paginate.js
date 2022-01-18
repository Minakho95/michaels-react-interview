import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Paginate({
  filterArr,
  currentData,
  currentPage,
  handleNextPage,
  handlePrevPage,
  totalPageCount,
  pageSize,
  data,
}) {
  console.log(data.length);
  return (
    <div>
      {/* if filter check and currentData = 0, do not display Paginate */}
      {filterArr.length && currentData.length === 0 ? (
        <div></div>
      ) : (
        <div className="paginate">
          <IconButton
            disabled={currentPage > 1 ? false : true}
            onClick={() => handlePrevPage()}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            // next button disabled condition if category checked or not
            disabled={
              filterArr.length !== 0
                ? currentPage === Math.ceil(currentData.length / pageSize)
                : currentPage === totalPageCount
            }
            onClick={() => handleNextPage()}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Paginate;
