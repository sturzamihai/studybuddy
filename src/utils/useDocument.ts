import { useEffect, useState } from "react";

export default function useDocument(id: string) {
    const [document, setDocument] = useState<Document | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        setIsLoading(true);
    
        fetch(`/api/documents/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setDocument(data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setIsLoading(false);
          });
    }, [id]);
    
    return { document, isLoading, error };
}