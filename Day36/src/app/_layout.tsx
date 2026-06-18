import "react-native-get-random-values";

import { Stack } from "expo-router";

import { useEffect } from "react";

import { requestNotificationPermission } from "@/services/notificationService";

import * as Updates from "expo-updates";

export default function RootLayout() {

  useEffect(() => {
    async function checkUpdate() {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    checkUpdate();
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        animation:"slide_from_right"
      }}
    />
  );
}
