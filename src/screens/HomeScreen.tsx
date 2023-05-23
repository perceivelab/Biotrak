import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import useAuth from "../hooks/useAuth";
import ScreenFC from "../models/ScreenFC";
import { SafeAreaView } from "react-native-safe-area-context";
import UserDetail from "../shared/components/UserDetail/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "../store/userState/userState.selectors";
import { VStack } from "native-base";
import HomeTransport from "../shared/components/HomeTransporter/HomeTransport";
import HomeProducer from "../shared/components/HomeProducer/HomeProducer";
import Loader from "../shared/components/Loader/Loader";
import { palette } from "../shared/palette";
import useBackHandler from "../hooks/useBackHandler";

const HomeScreen: ScreenFC<"Home"> = ({ navigation }) => {
  const { logout } = useAuth();
  const user = useSelector(selectUserState);
  const [wait, setWait] = useState<boolean>(true);

  const waiting = () => {
    setTimeout(() => {
      setWait(false);
    }, 1000);
  };

  useBackHandler();

  useEffect(() => {
    waiting();
    user.username === "" && logout();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <VStack space={5} style={{ flex: 1 }}>
        {wait ? (
          <Loader />
        ) : user ? (
          <>
            <UserDetail
              onPress={() => {
                logout();
              }}
              user={user}
            />
            {user?.roles[0].includes("GENERIC_TRANSPORT") ? (
              <HomeTransport nav={navigation} />
            ) : (
              <HomeProducer nav={navigation} />
            )}
          </>
        ) : (
          logout()
        )}
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: palette.white.contrast,
  },
  containerTwoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customRowCard: {
    flexDirection: "row",
  },
  customColumnCard: {
    flexDirection: "column",
  },
});

export default HomeScreen;
