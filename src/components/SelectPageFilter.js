import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function SelectPageFilter({ pageSize, setPageSize }) {
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Affichage</InputLabel>
        <Select
          value={pageSize}
          label="Affichage"
          onChange={(e) => {
            const selectedValue = e.target.value;
            setPageSize(selectedValue);
          }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectPageFilter;
