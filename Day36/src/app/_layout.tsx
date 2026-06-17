import "react-native-get-random-values";

import { Stack } from "expo-router";

import { useEffect } from "react";

import { requestNotificationPermission } from "@/services/notificationService";

export default function RootLayout() {

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
