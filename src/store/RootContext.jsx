import { createContext, useState } from "react";

export const RootContext = createContext(null);

export default function Post({ children }) {
    const [rootDetails, setRootDetails] = useState({});

    return (
        <RootContext.Provider value={{ rootDetails, setRootDetails }}>
            {children}
        </RootContext.Provider>
    )
}