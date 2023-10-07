import { useStateContext } from "contexts/ContextProvider";
import accountService from "../services/account-service";

const useRefresh = () => {
  const { setAuth } = useStateContext();

  const refresh = async () => {
    const response = await accountService.useRefreshToken();

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefresh;
