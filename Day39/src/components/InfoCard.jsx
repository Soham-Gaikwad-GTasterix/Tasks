import { Text, View } from "react-native";

import Animated, { 
    FadeInDown, useSharedValue, useAnimatedStyle, withTiming 
} from "react-native-reanimated";

import CustomButton from "./CustomButton";
import { useEffect } from "react";

function InfoCard({
    title,
    subtitle,
    buttonText,
    onPress,
    onDelete,
    isVisible
}) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(
                1,
                {
                    duration: 500
                }
            );
            translateY.value = withTiming(
                0,
                {
                    duration: 500
                }
            );
        }
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
            transform: [
                {
                    translateY: translateY.value
                }
            ]
        })
    );

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    padding: 20,
                    borderWidth: 1,
                    borderRadius: 30,
                    margin: 20
                }
            ]}
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
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10
                }}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <CustomButton
                        title={buttonText}
                        onPress={onPress}
                    />
                </View>
                {
                    onDelete && (
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <CustomButton
                                title="Delete"
                                onPress={onDelete}
                                backgroundColor="#dc2626"
                            />
                        </View>
                    )
                }
                
            </View>
        </Animated.View>
    );
}

export default InfoCard;