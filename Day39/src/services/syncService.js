import axios from "axios";

import {
    getQueue,
    clearQueue
} from "./offlineQueueService";

export async function syncOfflineQueue() {
    const queue = await getQueue();

    for (const item of queue) {
        try {
            await axios({
                method: item.method,
                url: BASE_URL + item.endpoint,
                data: item.data
            });
        } catch (error) {
            console.log(
                "Sync Failed",
                error.message
            );
            return;
        }
    }
    await clearQueue();
}