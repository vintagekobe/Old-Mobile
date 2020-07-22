import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator } from "react-native-paper";
import { setAccessToken } from "../../src/utils/accessToken";
import { Routes } from "../../src/utils/Routes";
import { Wrapper } from "../styled-components/ReusedUI";
import { AuthContext } from "./AuthProvider";

import getEnvVars from "../../environment";
import { useLoginHook } from "../functional-components/useLoginHook";
// @ts-ignore
const { apiUrl } = getEnvVars();
console.log(`my url in app w headers is ${apiUrl}`);

// get a refresh token on each app load
interface Props {}

export const AppWithHeaders: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const loginUser = useLoginHook();
  const { setUser } = useContext(AuthContext);
  //"http://localhost:4000/refresh_token"
  // "https://peaceful-oasis-92942.herokuapp.com/refresh_token"

  useEffect(() => {
    fetch(`${apiUrl}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      loginUser(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Wrapper>
        <ActivityIndicator size="large" />
      </Wrapper>
    );
  }

  return <Routes />;
};
