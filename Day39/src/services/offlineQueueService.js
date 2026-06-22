import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "offline_queue";

export async function addToQueue(request) {
    const queue = await getQueue();

    queue.push(request);

    await AsyncStorage.setItem(
        QUEUE_KEY,
        JSON.stringify(queue)
    );
}

export async function getQueue() {
    const queue = await AsyncStorage.getItem(
        QUEUE_KEY
    );
    return queue 
        ? JSON.parse(queue)
        : [];
}

export async function clearQueue() {
    await AsyncStorage.removeItem(
        QUEUE_KEY
    );
}