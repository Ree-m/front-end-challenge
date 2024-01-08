import ModelCard from "../../components/ModelCard";
import { useModels } from "./useModels";
import { ModelWithoutPk } from "../../types/Model";
const Inventory = () => {

  const { models, isLoading, errorMessage } = useModels()

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    )
  } else if (errorMessage) {
    return (
      <div className="px-10 md:px-24 pb-20 pt-4">
        <h1 className="text-light-grey font-bold text-4xl pb-12">Inventory</h1>
        <div className="text-red-600">
        <p className="text-red">Error: {errorMessage}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="px-10 md:px-24 pb-20 pt-4">
        <h1 className="text-light-grey font-bold text-4xl pb-12">Inventory</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models && models.map((model: ModelWithoutPk) => (
            <li key={model.job_id}>
              <ModelCard model={model} />
            </li>
          ))}
        </ul>
      </div>

    );
  }
};

export default Inventory;
