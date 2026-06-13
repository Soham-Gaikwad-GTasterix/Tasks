import { View } from "react-native";

import NavigationHeader from "../components/NavigationHeader";

import DynamicForm from "../components/DynamicForm";

export default function AddPatient() {
    return(
        <View
            style={{
                flex: 1,
                marginTop: 30
            }}
        >
            <NavigationHeader
                title="Add Patient"
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
                            placeholder: "Patient Name"
                        },
                        {
                            name: "email",
                            placeholder: "Email"
                        },
                        {
                            name: "age",
                            placeholder: "Age"
                        },
                        {
                            name: "gender",
                            placeholder: "Gender"
                        },
                        {
                            name: "disease",
                            placeholder: "Disease"
                        },
                        {
                            name: "date",
                            placeholder: "Admssion Date"
                        },
                        {
                            name: "phoneNo",
                            placeholder: "Phone No."
                        },
                        {
                            name: "bloodGroup",
                            placeholder: "Blood Group"
                        },
                        {
                            name: "roomNo",
                            placeholder: "Room No."
                        }
                    ]}
                    onSubmit={(data) => 
                        console.log(data)
                    }
                />
            </View>
        </View>
    );
}