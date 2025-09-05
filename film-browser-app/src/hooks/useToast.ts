import { useState } from "react";

const [toast, setToast] = useState<{message: string, type:'success' | 'error'} | null>(null);

export const useToast = () => {
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({message, type});
        setTimeout(() => setToast(null), 3000);

    }
    
    return { showToast }
    
}