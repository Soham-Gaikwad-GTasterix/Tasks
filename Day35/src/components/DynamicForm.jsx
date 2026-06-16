import { View, TextInput, Alert, Platform, Pressable, Text } from "react-native";

import { useState } from "react";

import CustomButton from "./CustomButton";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";

function DynamicForm({
    fields,
    buttonText,
    onSubmit,
    initialValues = {}
}) {
    const [formData, setFormData] = useState(initialValues);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [pickerMode, setPickerMode] = useState("date");

    const [selectedDateField, setSelectedDateField] = useState(null);

    function handleChange(
        name,
        value
    ) {
        setFormData(
            (prev) => ({
                ...prev,
                [name]: value
            })
        );
    }

    function validateForm() {
        for (const field of fields) {
            const value = formData[field.name];
            if (
                !value || value.toString().trim() === ""
            ) {
                Alert.alert(
                    "Required Field",
                    `${field.placeholder} is required`
                );
                return false;
            }
        }
        if (
            formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)
        ) {
            Alert.alert("Invalid Email");
            return false;
        }
        if (
            formData.age && Number(formData.age) < 0
        ) {
            Alert.alert("Age cannot be negative");
            return false;
        }
        if (
            formData.phoneNo && !/^\d{10}$/.test(formData.phoneNo)
        ) {
            Alert.alert("Phone Number must be 10 digits");
            return false;
        }
        return true;
    }

    return(
        <View>
            {fields.map(field => {
                if (
                    field.type === "select"
                ) {
                    return (
                        <View
                            key={field.name}
                            style={{
                                borderWidth: 1,
                                borderRadius: 12,
                                marginBottom: 12
                            }}
                        >
                            <Picker
                                selectedValue={
                                    formData[
                                        field.name
                                    ] || ""
                                }
                                onValueChange={(value) => handleChange(
                                    field.name,
                                    value
                                )}
                            >
                                <Picker.Item
                                    label={field.placeholder}
                                    value=""
                                />
                                {
                                    field.options.map(
                                        option => (
                                            <Picker.Item
                                                key={option}
                                                label={option}
                                                value={option}
                                            />
                                        )
                                    )
                                }
                            </Picker>
                        </View>
                    );
                }
                if (
                    field.type === "date" ||
                    field.type === "time"
                ){
                    return (
                        <Pressable
                            key={field.name}
                            onPressIn={() => {
                                setSelectedDateField(field.name);
                                setPickerMode(field.type);
                                setShowDatePicker(true);
                            }}
                            style={{
                                borderWidth: 1,
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 12
                            }}
                        >
                            <Text>
                                {
                                    formData[field.name] 
                                    || field.placeholder
                                }
                            </Text>
                        </Pressable>
                    );
                }
                return (
                    <TextInput
                        key={field.name}
                        placeholder={
                            field.placeholder
                        }
                        value={
                            formData[
                                field.name
                            ] || ""
                        }
                        keyboardType={field.keyboardType}
                        maxLength={field.maxLength}
                        onChangeText={(value) =>
                            handleChange(
                                field.name,
                                value
                            )
                        }
                        style={{
                            borderWidth: 1,
                            borderRadius: 12,
                            padding: 12,
                            marginBottom: 12
                        }}
                    />
                );
            })}
            {
                showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode={pickerMode}
                        display={
                            Platform.OS === "ios"
                                ? "spinner"
                                : "default"
                        }
                        onValueChange={(
                            event,
                            selectedDate
                        ) => {
                            setShowDatePicker(false);
                            if(
                                selectedDate
                            ) {
                                if (
                                    pickerMode === "date"
                                ) {
                                    handleChange(
                                        selectedDateField,
                                        selectedDate
                                            .toISOString()
                                            .split("T")[0]
                                    );
                                } else {
                                    handleChange(
                                        selectedDateField,
                                        selectedDate
                                            .toLocaleTimeString(
                                                [],
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                }
                                            )
                                    );
                                }
                            }
                        }}
                    />
                )
            }
            <CustomButton
                title={buttonText}
                onPress={() => {
                    if (
                        validateForm()
                    ) {
                        onSubmit(formData);
                    }
                }}
            />
        </View>
    );
}

export default DynamicForm;