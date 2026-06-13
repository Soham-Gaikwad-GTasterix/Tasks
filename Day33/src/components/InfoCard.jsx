import { View, Text } from "react-native";

import CustomButton from "./CustomButton";

function InfoCard({
    title,
    subtitle,
    buttonText,
    onPress
}) {
    return (
        <View
            style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 30,
                margin: 20
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                }}
            >
                {title}
            </Text>
            {subtitle && (
                <Text
                    style={{
                        marginTop: 8,
                        marginBottom: 16,
                    }}
                >
                {subtitle}
            </Text>
            )}
            <CustomButton
                title={buttonText}
                onPress={onPress}
            />
        </View>
    );
}

export default InfoCard;