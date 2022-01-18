import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";

function MultiSelectFilter({ categoryFilter, handleChecked }) {
  return (
    <div>
      <FormGroup className="multiselect-group" style={{ display: "inline" }}>
        {categoryFilter.map((elem, i) => {
          return (
            <FormControlLabel
              className="multiselect-single"
              control={
                <Checkbox
                  sx={{
                    color: "rgb(233, 170, 53)",
                    "&.Mui-checked": {
                      color: "rgb(233, 170, 53)",
                    },
                  }}
                />
              }
              label={elem}
              value={elem}
              onChange={(e) => handleChecked(e, elem)}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}

export default MultiSelectFilter;
