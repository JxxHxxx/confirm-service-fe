import { createContext } from "react";


export const leaveHistoryContext = createContext({
    totalPages: 0,
    pageable: {
        pageNumber: 0
    }
});

