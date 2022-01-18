import { TailSpin } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="spinner">
      <TailSpin
        heigth="150"
        width="150"
        color="rgb(233, 170, 53)"
        arialLabel="loading"
      />
      <p>chargement des données...</p>
    </div>
  );
}

export default Spinner;
