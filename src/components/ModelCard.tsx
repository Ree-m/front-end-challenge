import { Link } from "react-router-dom";
import { Model } from "../types/Model";

const ModelCard = ({ model }: { model: Omit<Model, 'pk'> }) => {
    return (
        <div className="rounded-[16px] border border-grey hover:border hover:border-blue">
            <Link to={`/analysis/${model.model_name}`}>
                <div className="flex justify-center items-center gap-8 p-8">
                    <div>
                        <h3 className="capitalize text-white text-lg md:text-2xl">name</h3>
                        <h3 className="text-blue text-xl md:text-3xl">{model.model_name}</h3>
                    </div>
                    <div>
                        <h3 className="capitalize text-white text-lg md:text-2xl"> type</h3>
                        <p className="text-blue text-xl md:text-3xl">{model.model_type}</p>
                    </div>
                </div>

            </Link>

        </div >
    );
};

export default ModelCard;
