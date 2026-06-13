import { View } from "react-native";

import { router } from "expo-router";

import ScreenTitle from "../../components/ScreenTitle";

import InfoCard from "../../components/InfoCard";

export default function Add(){
    return (
        <View
            style={{
                flex: 1,
                padding: 20
            }}
        >
            <ScreenTitle
                title="Create"
            />
            <InfoCard
                title="Add Patient"
                subtitle="Create a new patient"
                buttonText="Open Form"
                onPress={() => 
                    router.push(
                        "/add-patient"
                    )
                }            
            />
            <InfoCard
                title="Add Doctor"
                subtitle="Create a new Doctor"
                buttonText="Open Form"
                onPress={() => 
                    router.push(
                        "/add-doctor"
                    )
                }            
            />
            <InfoCard
                title="Add Appointment"
                subtitle="Create appointment"
                buttonText="Open Form"
                onPress={() => 
                    router.push(
                        "/add-appointment"
                    )
                }            
            />
        </View>
    );
}