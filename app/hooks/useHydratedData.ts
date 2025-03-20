import { useState, useEffect } from "react";

function useHydratedData<T>(loadData: (args: any) => T, args: any = null): { data: T | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (args: any) => { // Recibe los argumentos
      const loadedData = loadData(args); // Pasa los argumentos a loadData
      setData(loadedData);
      setIsLoading(false);
    };

    fetchData(args); // Llama a fetchData con los argumentos
  }, [loadData, args]); // Agrega args a las dependencias

  return { data, isLoading };
}

export default useHydratedData;