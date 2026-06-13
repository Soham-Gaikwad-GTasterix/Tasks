import { View } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

export default function AddDoctor() {
    return(
        <View
            style={{
                flex: 1,
                marginTop: 30
            }}
        >
            <NavigationHeader
                title="Add Doctor"
                showBack
            />
            <View
                style={{
                    padding: 20
                }}
            >
                <DynamicForm
                    buttonText="Add Patient"
                    fields={[
                        {
                            name: "name",
                            placeholder: "Doctor Name"
                        },
                        {
                            name: "specialization",
                            placeholder: "Specialization"
                        },
                        {
                            name: "experience",
                            placeholder: "Experience"
                        },
                        {
                            name: "department",
                            placeholder: "Department"
                        },
                        {
                            name: "qualification",
                            placeholder: "Qualification"
                        },
                        {
                            name: "phoneNo",
                            placeholder: "Phone No."
                        }
                    ]}
                    onSubmit={(data) => 
                        console.log(data)
                    }
                />
            </View>
        </View>
    )
}