import { Dialog, Portal, Button, Text } from "react-native-paper";

export default function ConfirmationDialog({
    visible,
    title,
    message,
    confirmText = "Yes",
    cancelText = "Cancel",
    confirmColor = "#dc2626",
    cancelColor = "#2563eb",
    onConfirm,
    onCancel
}) {
    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={onCancel}
                style={{
                    borderRadius: 20,
                    backgroundColor: "#fff"
                }}
            >
                <Dialog.Title
                    style={{
                        fontWeight: "700",
                        color: "#475569",
                        fontSize: 22
                    }}
                >
                    {title}
                </Dialog.Title>

                <Dialog.Content>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#475569",
                            lineHeight: 24
                        }}
                    >
                        {message}
                    </Text>
                </Dialog.Content>

                <Dialog.Actions
                    style={{
                        paddingHorizontal: 16,
                        paddingBottom: 16
                    }}
                >
                    <Button
                        textColor={cancelColor}
                        onPress={onCancel}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        textColor={confirmColor}
                        onPress={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}