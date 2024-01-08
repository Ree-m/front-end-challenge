import { useEffect, useState } from "react"
import { getAnalysis } from "../../api/getAnalysis";
import { AnalysisData } from "../../types/AnalysisData";

export const useAnalysis = ({ modelName }: {
    modelName: string | undefined;
}) => {
    const [analysis, setAnalysis] = useState<AnalysisData[]>()
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        let ignore = false;

        const fetchAnalysis = async () => {
            setIsLoading(true);
            setErrorMessage(undefined);

            try {
                if (!modelName) {
                    return;
                }

                const fetchedAnalysis = await getAnalysis(modelName);
                if (!fetchedAnalysis.data) {
                    return
                }
                if (ignore) return;
                setIsLoading(false)
                setAnalysis(fetchedAnalysis.data[0] as AnalysisData[]);
                console.log("fetchedAnalysis", fetchedAnalysis.data[0], fetchedAnalysis);

            } catch (error) {
                if (ignore) return
                setIsLoading(false)
                console.log("Error fetching analysis", error);
                setErrorMessage('Something went wrong')
            }
        };

        fetchAnalysis();

        return () => {
            ignore = true;
        };

    }, [modelName]);

    return {
        analysis,
        isLoading,
        errorMessage
    }
}