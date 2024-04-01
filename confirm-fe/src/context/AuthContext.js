import { createContext, useState } from "react";

// const [login, setLogin] = useState();
// export const LoginContext = createContext({login, setLogin});


const LoginContext = createContext(); // createContext를 바깥으로 빼고, 초기값은 undefined로 설정

const LoginProvider = () => {
  const [login, setLogin] = useState(false); // useState를 함수 컴포넌트 내에서 사용
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {/* 여기에 다른 컴포넌트들을 감싸서 사용할 수 있음 */}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider }; // 다른 컴포넌트에서 사용할 수 있도록 내보내기