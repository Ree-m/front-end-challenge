import { useState, useEffect } from "react";
import { getModels } from "../../api/getModels";
import { ModelWithoutPk } from "../../types/Model";

export const useModels = () => {
    const [models, setModels] = useState<Array<ModelWithoutPk>>([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        let ignore = false;

        const fetchModels = async () => {

            setIsLoading(true);
            setErrorMessage(undefined);

            try {
                const fetchedModels = await getModels();

                if (ignore) return;
                setIsLoading(false)
                setModels(fetchedModels.data)


            } catch (error) {
                if (ignore) return
                setIsLoading(false)
                setErrorMessage('Something went wrong.')
                            
            }
        };

        fetchModels();
        return () => {
            ignore = true;
        };
    }, []);

    return {
        models,
        isLoading,
        errorMessage
    }

}