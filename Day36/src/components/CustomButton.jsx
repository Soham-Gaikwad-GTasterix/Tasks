import { Pressable, Text } from "react-native";

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

function CustomButton({
    title,
    onPress,
    backgroundColor = "#2563eb"
}) {

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: scale.value
                }
            ]
        })
    );

    return (

        <Animated.View
            style={animatedStyle}
        >
            <Pressable
                onPress={onPress}
                onPressIn={() => {
                    scale.value = withSpring(0.95);
                }}
                onPressOut={() => {
                    scale.value = withSpring(1);
                }}
                style={({ pressed}) => ({
                    opacity: pressed
                        ? 0.7
                        : 1,
                
                    backgroundColor,
                    padding: 16,
                    borderRadius: 12,
                    marginTop: 20
                })}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}
                >
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

export default CustomButton;