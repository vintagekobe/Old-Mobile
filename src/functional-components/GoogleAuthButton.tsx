import React, { useContext } from "react";
import * as Google from "expo-google-app-auth";
import { GOOGLE_IOS_CLIENT_ID } from "../utils/Keys";
import { Button } from "react-native-paper";
import { AuthContext } from "../utils/AuthProvider";

interface GoogleAuthButtonProps {}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({}) => {
  const { setUser } = useContext(AuthContext);
  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
      });

      if (result.type === "success") {
        // Then you can use the Google REST API
        let userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          }
        );
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("signing in with Google not successful! ", err);
      return { error: true };
    }
  };

  return (
    <Button
      mode="outlined"
      onPress={() => {
        signInWithGoogle();
        setUser("googlelogin");
      }}>
      Sign in with Google
    </Button>
  );
};