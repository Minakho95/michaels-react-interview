import Grow from "@mui/material/Grow";
import { Line } from "rc-progress";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import { TransitionGroup } from "react-transition-group";
function Cards({
  filterArr,
  data,
  handleLike,
  handleDelete,
  firstPageIndex,
  lastPageIndex,
  toggleValue,
  currentData,
}) {
  return (
    <div>
      {/* if filterArr length !== 0 execute filter()  */}
      <TransitionGroup className="card-list">
        {(filterArr.length !== 0 ? currentData : data)
          .slice(firstPageIndex, lastPageIndex)
          .map((movie, i) => {
            return (
              <Grow>
                <div className="single-card">
                  <div className="card-img">
                    <img src={`${movie.picture}`} alt="" />
                  </div>
                  <div className="card-content">
                    <div>
                      <div className="card-content-category">
                        <span className="content-category">
                          {movie.category}
                        </span>
                        <Button
                          color="error"
                          style={{ fontSize: "10px", padding: 0 }}
                          onClick={() => handleDelete(movie.id)}
                        >
                          supprimer
                        </Button>
                      </div>

                      <h4>{movie.title}</h4>
                    </div>

                    <div className="card-content-rating">
                      <div className="rating-bar">
                        <Line
                          percent={
                            (movie.likes * 100) / (movie.likes + movie.dislikes)
                          }
                          strokeWidth="2"
                          trailWidth="2"
                          strokeColor="#1990FF"
                        />
                      </div>
                      <div className="rating-button">
                        <div>
                          <span>{movie.likes}</span>
                        </div>
                        <div>
                          <ToggleButtonGroup
                            value={toggleValue}
                            exclusive
                            onChange={(e) => handleLike(e, movie.id)}
                          >
                            <ToggleButton
                              style={{
                                height: "20px",
                                width: "50px",
                                fontSize: "10px",
                                border: "none",
                                color: movie.likesColor,
                              }}
                              value="like"
                            >
                              J'aime
                            </ToggleButton>
                            <ToggleButton
                              style={{
                                height: "20px",
                                fontSize: "10px",
                                width: "80px",
                                border: "none",
                                color: movie.dislikesColor,
                              }}
                              value="dislike"
                            >
                              j'aime pas
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>

                        <div>
                          <span>{movie.dislikes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grow>
            );
          })}
      </TransitionGroup>
    </div>
  );
}

export default Cards;
