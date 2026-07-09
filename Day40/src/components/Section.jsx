import { Text, View } from "react-native";

function Section({
    title,
    children
}) {
    return (
        <View
            style={{
                marginTop: 30
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: "#1e293b",
                    marginBottom: 14
                }}
            >
                {title}
            </Text>

            {children}

        </View>
    );
}

export default Section;