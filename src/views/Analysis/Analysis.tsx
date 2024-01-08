import { useParams } from "react-router-dom";
import BarCard from "../../components/BarCard";
import { useAnalysis } from "./useAnalysis";

const Analysis = () => {
    const { modelName } = useParams();

    const { analysis, isLoading, errorMessage } = useAnalysis({ modelName })
    if (isLoading) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        )
    } else if (errorMessage) {
        return (
            <div className="px-10 md:px-24 pb-20 pt-4">
                <h1 className="text-light-grey text-4xl font-bold pb-12 capitalize">{modelName} analysis</h1>
                <p className="text-red">Error: {errorMessage}</p>
            </div>
        )
    } else {
        return (
            <div className=" md:px-24 pt-4 pb-2">
                <h1 className="text-light-grey text-4xl font-bold pb-12 capitalize px-4 md:px-0">{modelName} analysis</h1>
                <BarCard analysis={analysis || []} />
            </div>
        )
    }

};

export default Analysis;
