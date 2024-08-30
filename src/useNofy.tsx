import { useContext } from "react";
import { NofyContext } from "./contextProvider";

const useNofyContext = () => {
    return useContext(NofyContext);
};

export default useNofyContext;
