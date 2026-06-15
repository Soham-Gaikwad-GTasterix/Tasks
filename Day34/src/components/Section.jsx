import { Text, View } from "react-native";

function Section({
    title,
    children
}) {
    return (
        <View
            style={{
                marginTop: 24
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10
                }}
            >
                {title}
            </Text>

            {children}

        </View>
    );
}

export default Section;