import { View, TextInput, Alert, Platform, Pressable, Text, Image } from "react-native";

import { useState } from "react";

import CustomButton from "./CustomButton";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Dropdown } from "react-native-element-dropdown";

import * as ImagePicker from "expo-image-picker";

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

    async function pickImage(fieldName) {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1
        });
        if (
            !result.canceled
        ) {
            handleChange(
                fieldName,
                result.assets[0].uri
            );
        }
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
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return false;
        }
        if (
            formData.age && Number(formData.age) < 0
        ) {
            Alert.alert("Invalid Age Value", "Age cannot be negative");
            return false;
        }
        if (
            formData.experience && Number(formData.experience) < 0
        ) {
            Alert.alert("Invalid Experience", "Experience cannot be negative");
            return false;
        }
        if (
            formData.phoneNo && !/^\d{10}$/.test(formData.phoneNo)
        ) {
            Alert.alert("Invalid Phane Number", "Phone Number must be 10 digits");
            return false;
        }
        return true;
    }

    return(
        <View
            style={{
                backgroundColor: "#f4f8fc"
            }}
        >
            {fields.map(field => {

                if (
                    field.type === "doctor-select"
                ) {
                    return (
                        <View
                            key={field.name}
                            style={{
                                backgroundColor: "#fff",
                                borderWidth: 1,
                                borderRadius: 18,
                                marginBottom: 18,
                                borderColor: "#e2e8f0",
                                elevation: 3,
                                shadowColor: "#000",
                                shadowOpacity: 0.08,
                                shadowRadius: 6,
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                }
                            }}
                        >
                            <Dropdown
                                style={{
                                    height: 58,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    paddingHorizontal: 18,
                                    borderWidth: 1,
                                    borderColor: "#e2e8f0",
                                    elevation: 3
                                }}
                                placeholderStyle={{
                                    color: "#94a3b8",
                                    fontSize: 16
                                }}
                                data={field.options.map(
                                    doctor => ({
                                        label: doctor.name,
                                        value: doctor.id
                                    })
                                )}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Doctor"
                                value={formData[field.name]}
                                onChange={item =>
                                    handleChange(
                                        field.name,
                                        item.value
                                    )
                                }
                                search
                                maxHeight={300}
                                activeColor="#dbeafe"
                                containerStyle={{
                                    borderRadius: 18
                                }}
                            />
                        </View>
                    );
                }

                if (
                    field.type === "image"
                ) {
                    return (
                        <View
                            key={field.name}
                            style={{
                                marginBottom: 12
                            }}
                        >
                            <CustomButton
                                title="Choose Photo"
                                onPress={() =>
                                    pickImage(field.name)
                                }
                            />
                            {
                                formData[field.name] && (
                                    <Image
                                        source={{
                                            uri: formData[field.name]
                                        }}
                                        style={{
                                            width: 150,
                                            height: 150,
                                            borderRadius: 75,
                                            borderWidth: 4,
                                            borderColor: "#2563eb",
                                            alignSelf: "center",
                                            marginTop: 16
                                        }}
                                    />
                                )
                            }
                        </View>
                    );
                }

                if (
                    field.type === "select"
                ) {
                    return (
                        <View
                            key={field.name}
                            style={{
                                backgroundColor: "#fff",
                                borderWidth: 1,
                                borderRadius: 18,
                                marginBottom: 18,
                                borderColor: "#e2e8f0",
                                elevation: 3,
                                shadowColor: "#000",
                                shadowOpacity: 0.08,
                                shadowRadius: 6,
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                }
                            }}
                        >
                            <Dropdown
                                style={{
                                    height: 58,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    paddingHorizontal: 18,
                                    borderWidth: 1,
                                    borderColor: "#e2e8f0",
                                    elevation: 3
                                }}
                                placeholderStyle={{
                                    color: "#94a3b8",
                                    fontSize: 16
                                }}
                                data={field.options.map(
                                    option => ({
                                        label: option,
                                        value: option
                                    })
                                )}
                                labelField="label"
                                valueField="value"
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={item =>
                                    handleChange(
                                        field.name,
                                        item.value
                                    )
                                }
                                search
                                maxHeight={300}
                                activeColor="#dbeafe"
                                containerStyle={{
                                    borderRadius: 18
                                }}
                            />
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
                                backgroundColor: "#fff",
                                borderWidth: 1,
                                borderRadius: 18,
                                padding: 18,
                                marginBottom: 18,
                                borderColor: "#e2e8f0",
                                elevation: 3,
                                shadowColor: "#000",
                                shadowOpacity: 0.08,
                                shadowRadius: 6,
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                }
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
                        placeholderTextColor="#555"
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
                        secureTextEntry={field.secureTextEntry || false}
                        style={{
                            borderWidth: 1,
                            borderRadius: 18,
                            paddingHorizontal: 18,
                            paddingVertical:16,
                            marginBottom: 18,
                            color: "#0f172a",
                            backgroundColor: "#fff",
                            fontSize: 16,
                            borderColor: "#e2e8f0",
                            elevation: 6,
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 6,
                            shadowOffset: {
                                width: 0,
                                height: 3
                            }
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
                                        selectedDate.toLocaleTimeString(
                                            "en-GB",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false
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