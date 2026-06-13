import { View, ScrollView } from "react-native";

import ScreenTitle from "../../components/ScreenTitle";

import DashboardCard from "../../components/DashboardCard";

import CustomButton from "../../components/CustomButton";

import Section from "../../components/Section";

import { router } from "expo-router";

export default function HomeScreen() {

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20
      }}
    >
      <ScreenTitle
        title="Dashboard"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >

        <DashboardCard
          title="Patients"
          count="250"
          color="#3b82f6"
        />

        <DashboardCard
          title="Doctors"
          count="20"
          color="#3b82f6"
        />

      </View>

      <Section
        title="Summary"
      >

        <DashboardCard
          title="Appointments"
          count="200"
          color="#3b82f6"
          fullWidth
        />

        <DashboardCard
          title="Revenue"
          count="₹ 50,000"
          color="#3b82f6"
          fullWidth
        />

      </Section>

      <Section
        title="Manage"
      >

        <CustomButton
          title="Patients"
          onPress={() =>
            router.push("/patients")
          }
        />

        <CustomButton
          title="Doctors"
          onPress={() =>
            router.push("/doctors")
          }
        />

        <CustomButton
          title="Appointments"
          onPress={() =>
            router.push("/appointments")
          }
        />

      </Section>

    </ScrollView>
  );
}