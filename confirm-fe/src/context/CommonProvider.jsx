import { createContext, useState } from "react";

export const CommonContext = createContext({
    login: false,
    setLogin: () => {}
})

export function CommonProvider( { children }) {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <CommonContext.Provider value={{ login: isLogin, setLogin:setIsLogin }}>
            {children}
        </CommonContext.Provider>
    )
}