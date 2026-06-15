import { View, TextInput } from "react-native";

import { useState } from "react";

import CustomButton from "./CustomButton";

function DynamicForm({
    fields,
    buttonText,
    onSubmit
}) {
    const [formData, setFormData] = useState({});
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
    return(
        <View>
            {fields.map((field) => (
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
            ))}
            <CustomButton
                title={buttonText}
                onPress={() =>
                    onSubmit(formData)
                }
            />
        </View>
    );
}

export default DynamicForm;