import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge:false
    })
});

export async function requestNotificationPermission(){
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
}

export async function createNotificationChannel() {
    await Notifications.setNotificationChannelAsync(
        "appointments",
        {
            name: "Appointments",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            enableVibrate: true
        }
    );
}

export async function scheduleAppointmentTimeNotifications(appointment) {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Appointment Time",
            body: `${appointment.patient} with ` + `Dr. ${appointment.doctor}` + ` starts now`,
            sound: true
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: appointmentDate
        }
    });
}

export async function scheduleReminderNotification(appointment) {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);

    const reminderDate = new Date(appointmentDate.getTime() - 10 * 60 * 1000);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Upcoming Appointment",
            body: `${appointment.patient} with ` + `Dr. ${appointment.doctor}` + ` in 10 minutes`,
            sound: true
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: reminderDate
        }
    });
}