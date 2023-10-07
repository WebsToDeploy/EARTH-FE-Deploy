import { useStateContext } from "../../../contexts/ContextProvider";

const Logout = () => {
  const { setAuth } = useStateContext();
  setAuth(null);
};

export default Logout;
