import { View, TextInput, Alert, Platform, Pressable, Text, Image } from "react-native";

import { useState } from "react";

import CustomButton from "./CustomButton";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";

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
                                            width: 120,
                                            height: 120,
                                            borderRadius: 60,
                                            alignSelf: "center",
                                            marginTop: 10
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
                                    color="#000"
                                    value=""
                                />
                                {
                                    field.options.map(
                                        option => (
                                            <Picker.Item
                                                key={option}
                                                label={option}
                                                value={option}
                                                color="#000"
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