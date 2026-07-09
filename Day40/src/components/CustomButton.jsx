import { Pressable, Text } from "react-native";

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

function CustomButton({
    title,
    onPress,
    backgroundColor = "#2563eb",
    disabled = false
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
                disabled={disabled}
                style={({ pressed}) => ({
                    opacity: pressed
                        ? 0.7
                        : 1,
                
                    backgroundColor: disabled ? "#94a3b8" : backgroundColor,
                    paddingVertical: 16,
                    borderRadius: 18,
                    marginTop: 16,
                    elevation: 5,
                    shadowColor: "#2563eb",
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    shadowOffset: {
                        width: 0,
                        height: 4
                    }
                })}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 17,
                        letterSpacing: 0.5
                    }}
                >
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

export default CustomButton;