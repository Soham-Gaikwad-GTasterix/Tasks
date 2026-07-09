import { Text, View } from "react-native";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from "react-native-reanimated";

import CustomButton from "./CustomButton";

import { useEffect } from "react";

function InfoCard({
    title,
    subtitle,
    buttonText,
    onPress,
    secondButtonText,
    secondButtonColor,
    secondButtonPress,
    status,
    isVisible
}) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, {
                duration: 500
            });

            translateY.value = withTiming(0, {
                duration: 500
            });
        }
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            {
                translateY: translateY.value
            }
        ]
    }));

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    backgroundColor: "#fff",
                    padding: 18,
                    borderRadius: 20,
                    margin: 16,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 10
                }
            ]}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: "#1e293b"
                }}
            >
                {title}
            </Text>

            {subtitle && (
                <Text
                    style={{
                        marginTop: 8,
                        marginBottom: 16,
                        fontSize: 15,
                        color: "#64748b"
                    }}
                >
                    {subtitle}
                </Text>
            )}

            {/* Scheduled Appointment */}
            {status === "Scheduled" && (
                <View
                    style={{
                        flexDirection: "row",
                        gap: 10,
                        marginTop: 8
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <CustomButton
                            title={buttonText}
                            onPress={onPress}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <CustomButton
                            title={secondButtonText}
                            backgroundColor={secondButtonColor}
                            onPress={secondButtonPress}
                        />
                    </View>
                </View>
            )}

            {/* Admitted Patient */}
            {status === "Admitted" && (
                <View
                    style={{
                        marginTop: 8
                    }}
                >
                    <CustomButton
                        title={buttonText}
                        onPress={onPress}
                    />
                </View>
            )}

            {/* Completed / Cancelled */}
            {(status === "Completed" ||
                status === "Cancelled") && (
                <View
                    style={{
                        marginTop: 12,
                        backgroundColor:
                            status === "Completed"
                                ? "#dcfce7"
                                : "#fee2e2",
                        paddingVertical: 12,
                        borderRadius: 12,
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "700",
                            color:
                                status === "Completed"
                                    ? "#15803d"
                                    : "#dc2626"
                        }}
                    >
                        {status === "Completed"
                            ? "✔️ Appointment Completed"
                            : "❌ Appointment Cancelled"}
                    </Text>
                </View>
            )}
        </Animated.View>
    );
}

export default InfoCard;