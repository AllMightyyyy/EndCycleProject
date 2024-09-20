import { SensorData } from "@/types/SensorData";

const mockData: SensorData[] = [
    { "id": 1, "motion": "detected", "temperature": 25.0, "humidity": 60.0, "ldr": 300, "timestamp": "2024-09-20T10:00:00Z" },
    { "id": 2, "motion": "not detected", "temperature": 24.5, "humidity": 58.5, "ldr": 400, "timestamp": "2024-09-20T10:01:00Z" },
    { "id": 3, "motion": "detected", "temperature": 26.0, "humidity": 62.0, "ldr": 250, "timestamp": "2024-09-20T10:02:00Z" },
    { "id": 4, "motion": "not detected", "temperature": 25.5, "humidity": 61.5, "ldr": 450, "timestamp": "2024-09-20T10:03:00Z" },
    { "id": 5, "motion": "detected", "temperature": 27.0, "humidity": 63.0, "ldr": 200, "timestamp": "2024-09-20T10:04:00Z" },
    { "id": 6, "motion": "not detected", "temperature": 24.0, "humidity": 59.0, "ldr": 350, "timestamp": "2024-09-20T10:05:00Z" },
    { "id": 7, "motion": "detected", "temperature": 26.5, "humidity": 64.0, "ldr": 300, "timestamp": "2024-09-20T10:06:00Z" },
    { "id": 8, "motion": "not detected", "temperature": 25.2, "humidity": 60.3, "ldr": 500, "timestamp": "2024-09-20T10:07:00Z" },
    { "id": 9, "motion": "detected", "temperature": 24.8, "humidity": 57.8, "ldr": 450, "timestamp": "2024-09-20T10:08:00Z" },
    { "id": 10, "motion": "not detected", "temperature": 26.2, "humidity": 62.5, "ldr": 600, "timestamp": "2024-09-20T10:09:00Z" },
    { "id": 11, "motion": "detected", "temperature": 27.1, "humidity": 65.1, "ldr": 250, "timestamp": "2024-09-20T10:10:00Z" },
    { "id": 12, "motion": "not detected", "temperature": 25.6, "humidity": 58.7, "ldr": 400, "timestamp": "2024-09-20T10:11:00Z" },
    { "id": 13, "motion": "detected", "temperature": 26.0, "humidity": 63.3, "ldr": 300, "timestamp": "2024-09-20T10:12:00Z" },
    { "id": 14, "motion": "not detected", "temperature": 24.5, "humidity": 60.1, "ldr": 500, "timestamp": "2024-09-20T10:13:00Z" },
    { "id": 15, "motion": "detected", "temperature": 27.2, "humidity": 64.5, "ldr": 250, "timestamp": "2024-09-20T10:14:00Z" },
    { "id": 16, "motion": "not detected", "temperature": 24.9, "humidity": 59.6, "ldr": 350, "timestamp": "2024-09-20T10:15:00Z" },
    { "id": 17, "motion": "detected", "temperature": 25.8, "humidity": 61.2, "ldr": 400, "timestamp": "2024-09-20T10:16:00Z" },
    { "id": 18, "motion": "not detected", "temperature": 26.1, "humidity": 62.8, "ldr": 450, "timestamp": "2024-09-20T10:17:00Z" },
    { "id": 19, "motion": "detected", "temperature": 27.0, "humidity": 63.5, "ldr": 200, "timestamp": "2024-09-20T10:18:00Z" },
    { "id": 20, "motion": "not detected", "temperature": 25.3, "humidity": 58.0, "ldr": 550, "timestamp": "2024-09-20T10:19:00Z" },
    { "id": 21, "motion": "detected", "temperature": 24.6, "humidity": 60.6, "ldr": 300, "timestamp": "2024-09-20T10:20:00Z" },
    { "id": 22, "motion": "not detected", "temperature": 26.4, "humidity": 62.2, "ldr": 650, "timestamp": "2024-09-20T10:21:00Z" },
    { "id": 23, "motion": "detected", "temperature": 25.7, "humidity": 59.8, "ldr": 400, "timestamp": "2024-09-20T10:22:00Z" },
    { "id": 24, "motion": "not detected", "temperature": 24.3, "humidity": 57.5, "ldr": 200, "timestamp": "2024-09-20T10:23:00Z" },
    { "id": 25, "motion": "detected", "temperature": 26.8, "humidity": 64.0, "ldr": 300, "timestamp": "2024-09-20T10:24:00Z" },
    { "id": 26, "motion": "not detected", "temperature": 25.1, "humidity": 61.5, "ldr": 550, "timestamp": "2024-09-20T10:25:00Z" },
    { "id": 27, "motion": "detected", "temperature": 27.4, "humidity": 65.1, "ldr": 250, "timestamp": "2024-09-20T10:26:00Z" },
    { "id": 28, "motion": "not detected", "temperature": 25.6, "humidity": 59.6, "ldr": 400, "timestamp": "2024-09-20T10:27:00Z" },
    { "id": 29, "motion": "detected", "temperature": 26.9, "humidity": 63.0, "ldr": 300, "timestamp": "2024-09-20T10:28:00Z" },
    { "id": 30, "motion": "not detected", "temperature": 24.7, "humidity": 60.2, "ldr": 450, "timestamp": "2024-09-20T10:29:00Z" },
    { "id": 31, "motion": "detected", "temperature": 25.2, "humidity": 58.3, "ldr": 500, "timestamp": "2024-09-20T10:30:00Z" },
    { "id": 32, "motion": "not detected", "temperature": 26.6, "humidity": 62.7, "ldr": 400, "timestamp": "2024-09-20T10:31:00Z" },
    { "id": 33, "motion": "detected", "temperature": 27.1, "humidity": 64.3, "ldr": 250, "timestamp": "2024-09-20T10:32:00Z" },
    { "id": 34, "motion": "not detected", "temperature": 25.4, "humidity": 61.0, "ldr": 350, "timestamp": "2024-09-20T10:33:00Z" },
    { "id": 35, "motion": "detected", "temperature": 24.9, "humidity": 60.5, "ldr": 600, "timestamp": "2024-09-20T10:34:00Z" },
    { "id": 36, "motion": "not detected", "temperature": 26.2, "humidity": 62.0, "ldr": 700, "timestamp": "2024-09-20T10:35:00Z" },
    { "id": 37, "motion": "detected", "temperature": 25.9, "humidity": 63.5, "ldr": 300, "timestamp": "2024-09-20T10:36:00Z" },
    { "id": 38, "motion": "not detected", "temperature": 24.6, "humidity": 59.8, "ldr": 400, "timestamp": "2024-09-20T10:37:00Z" },
    { "id": 39, "motion": "detected", "temperature": 27.5, "humidity": 64.9, "ldr": 150, "timestamp": "2024-09-20T10:38:00Z" },
    { "id": 40, "motion": "not detected", "temperature": 25.3, "humidity": 60.1, "ldr": 500, "timestamp": "2024-09-20T10:39:00Z" },
    { "id": 41, "motion": "detected", "temperature": 26.4, "humidity": 61.7, "ldr": 300, "timestamp": "2024-09-20T10:40:00Z" },
    { "id": 42, "motion": "not detected", "temperature": 24.8, "humidity": 58.2, "ldr": 600, "timestamp": "2024-09-20T10:41:00Z" },
    { "id": 43, "motion": "detected", "temperature": 25.5, "humidity": 63.0, "ldr": 400, "timestamp": "2024-09-20T10:42:00Z" },
    { "id": 44, "motion": "not detected", "temperature": 26.1, "humidity": 62.5, "ldr": 500, "timestamp": "2024-09-20T10:43:00Z" },
    { "id": 45, "motion": "detected", "temperature": 27.2, "humidity": 64.1, "ldr": 250, "timestamp": "2024-09-20T10:44:00Z" },
    { "id": 46, "motion": "not detected", "temperature": 25.0, "humidity": 59.9, "ldr": 450, "timestamp": "2024-09-20T10:45:00Z" },
    { "id": 47, "motion": "detected", "temperature": 26.3, "humidity": 63.5, "ldr": 300, "timestamp": "2024-09-20T10:46:00Z" },
    { "id": 48, "motion": "not detected", "temperature": 24.7, "humidity": 60.2, "ldr": 550, "timestamp": "2024-09-20T10:47:00Z" },
    { "id": 49, "motion": "detected", "temperature": 27.0, "humidity": 64.7, "ldr": 150, "timestamp": "2024-09-20T10:48:00Z" },
    { "id": 50, "motion": "not detected", "temperature": 25.6, "humidity": 61.4, "ldr": 650, "timestamp": "2024-09-20T10:49:00Z" },
    { "id": 51, "motion": "detected", "temperature": 26.8, "humidity": 62.0, "ldr": 400, "timestamp": "2024-09-20T10:50:00Z" },
    { "id": 52, "motion": "not detected", "temperature": 24.5, "humidity": 58.6, "ldr": 300, "timestamp": "2024-09-20T10:51:00Z" },
    { "id": 53, "motion": "detected", "temperature": 27.4, "humidity": 64.9, "ldr": 500, "timestamp": "2024-09-20T10:52:00Z" },
    { "id": 54, "motion": "not detected", "temperature": 25.3, "humidity": 60.8, "ldr": 450, "timestamp": "2024-09-20T10:53:00Z" },
    { "id": 55, "motion": "detected", "temperature": 26.7, "humidity": 63.1, "ldr": 200, "timestamp": "2024-09-20T10:54:00Z" },
    { "id": 56, "motion": "not detected", "temperature": 25.2, "humidity": 59.0, "ldr": 350, "timestamp": "2024-09-20T10:55:00Z" },
    { "id": 57, "motion": "detected", "temperature": 27.1, "humidity": 62.3, "ldr": 400, "timestamp": "2024-09-20T10:56:00Z" },
    { "id": 58, "motion": "not detected", "temperature": 24.8, "humidity": 60.4, "ldr": 300, "timestamp": "2024-09-20T10:57:00Z" },
    { "id": 59, "motion": "detected", "temperature": 26.4, "humidity": 63.0, "ldr": 250, "timestamp": "2024-09-20T10:58:00Z" },
    { "id": 60, "motion": "not detected", "temperature": 25.0, "humidity": 61.5, "ldr": 500, "timestamp": "2024-09-20T10:59:00Z" },
    { "id": 61, "motion": "detected", "temperature": 27.3, "humidity": 64.2, "ldr": 100, "timestamp": "2024-09-20T11:00:00Z" },
    { "id": 62, "motion": "not detected", "temperature": 25.8, "humidity": 60.6, "ldr": 650, "timestamp": "2024-09-20T11:01:00Z" },
    { "id": 63, "motion": "detected", "temperature": 26.2, "humidity": 62.8, "ldr": 200, "timestamp": "2024-09-20T11:02:00Z" },
    { "id": 64, "motion": "not detected", "temperature": 25.4, "humidity": 58.4, "ldr": 450, "timestamp": "2024-09-20T11:03:00Z" },
    { "id": 65, "motion": "detected", "temperature": 24.7, "humidity": 59.2, "ldr": 300, "timestamp": "2024-09-20T11:04:00Z" },
    { "id": 66, "motion": "not detected", "temperature": 26.5, "humidity": 63.1, "ldr": 350, "timestamp": "2024-09-20T11:05:00Z" },
    { "id": 67, "motion": "detected", "temperature": 27.0, "humidity": 64.8, "ldr": 150, "timestamp": "2024-09-20T11:06:00Z" },
    { "id": 68, "motion": "not detected", "temperature": 25.6, "humidity": 60.3, "ldr": 500, "timestamp": "2024-09-20T11:07:00Z" },
    { "id": 69, "motion": "detected", "temperature": 26.9, "humidity": 62.0, "ldr": 400, "timestamp": "2024-09-20T11:08:00Z" },
    { "id": 70, "motion": "not detected", "temperature": 24.8, "humidity": 58.9, "ldr": 300, "timestamp": "2024-09-20T11:09:00Z" },
    { "id": 71, "motion": "detected", "temperature": 27.2, "humidity": 64.1, "ldr": 250, "timestamp": "2024-09-20T11:10:00Z" },
    { "id": 72, "motion": "not detected", "temperature": 25.1, "humidity": 59.5, "ldr": 600, "timestamp": "2024-09-20T11:11:00Z" },
    { "id": 73, "motion": "detected", "temperature": 26.3, "humidity": 63.3, "ldr": 300, "timestamp": "2024-09-20T11:12:00Z" },
    { "id": 74, "motion": "not detected", "temperature": 24.6, "humidity": 60.8, "ldr": 450, "timestamp": "2024-09-20T11:13:00Z" },
    { "id": 75, "motion": "detected", "temperature": 27.4, "humidity": 64.7, "ldr": 100, "timestamp": "2024-09-20T11:14:00Z" },
    { "id": 76, "motion": "not detected", "temperature": 25.5, "humidity": 61.4, "ldr": 550, "timestamp": "2024-09-20T11:15:00Z" },
    { "id": 77, "motion": "detected", "temperature": 26.7, "humidity": 62.9, "ldr": 300, "timestamp": "2024-09-20T11:16:00Z" },
    { "id": 78, "motion": "not detected", "temperature": 25.3, "humidity": 59.1, "ldr": 400, "timestamp": "2024-09-20T11:17:00Z" },
    { "id": 79, "motion": "detected", "temperature": 27.1, "humidity": 64.2, "ldr": 200, "timestamp": "2024-09-20T11:18:00Z" },
    { "id": 80, "motion": "not detected", "temperature": 25.2, "humidity": 60.0, "ldr": 300, "timestamp": "2024-09-20T11:19:00Z" },
    { "id": 81, "motion": "detected", "temperature": 26.1, "humidity": 63.0, "ldr": 250, "timestamp": "2024-09-20T11:20:00Z" },
    { "id": 82, "motion": "not detected", "temperature": 24.9, "humidity": 58.4, "ldr": 450, "timestamp": "2024-09-20T11:21:00Z" },
    { "id": 83, "motion": "detected", "temperature": 27.3, "humidity": 65.1, "ldr": 300, "timestamp": "2024-09-20T11:22:00Z" },
    { "id": 84, "motion": "not detected", "temperature": 25.8, "humidity": 61.5, "ldr": 500, "timestamp": "2024-09-20T11:23:00Z" },
    { "id": 85, "motion": "detected", "temperature": 26.4, "humidity": 64.0, "ldr": 200, "timestamp": "2024-09-20T11:24:00Z" },
    { "id": 86, "motion": "not detected", "temperature": 25.0, "humidity": 59.9, "ldr": 650, "timestamp": "2024-09-20T11:25:00Z" },
    { "id": 87, "motion": "detected", "temperature": 27.2, "humidity": 64.5, "ldr": 300, "timestamp": "2024-09-20T11:26:00Z" },
    { "id": 88, "motion": "not detected", "temperature": 24.6, "humidity": 60.3, "ldr": 550, "timestamp": "2024-09-20T11:27:00Z" },
    { "id": 89, "motion": "detected", "temperature": 26.9, "humidity": 63.8, "ldr": 150, "timestamp": "2024-09-20T11:28:00Z" },
    { "id": 90, "motion": "not detected", "temperature": 25.7, "humidity": 61.0, "ldr": 400, "timestamp": "2024-09-20T11:29:00Z" },
    { "id": 91, "motion": "detected", "temperature": 27.5, "humidity": 65.0, "ldr": 250, "timestamp": "2024-09-20T11:30:00Z" },
    { "id": 92, "motion": "not detected", "temperature": 25.1, "humidity": 60.5, "ldr": 500, "timestamp": "2024-09-20T11:31:00Z" },
    { "id": 93, "motion": "detected", "temperature": 26.3, "humidity": 63.2, "ldr": 300, "timestamp": "2024-09-20T11:32:00Z" },
    { "id": 94, "motion": "not detected", "temperature": 24.8, "humidity": 59.3, "ldr": 400, "timestamp": "2024-09-20T11:33:00Z" },
    { "id": 95, "motion": "detected", "temperature": 27.4, "humidity": 65.8, "ldr": 150, "timestamp": "2024-09-20T11:34:00Z" },
    { "id": 96, "motion": "not detected", "temperature": 25.3, "humidity": 61.8, "ldr": 550, "timestamp": "2024-09-20T11:35:00Z" },
    { "id": 97, "motion": "detected", "temperature": 26.1, "humidity": 62.4, "ldr": 300, "timestamp": "2024-09-20T11:36:00Z" },
    { "id": 98, "motion": "not detected", "temperature": 24.9, "humidity": 58.1, "ldr": 400, "timestamp": "2024-09-20T11:37:00Z" },
    { "id": 99, "motion": "detected", "temperature": 27.0, "humidity": 63.5, "ldr": 100, "timestamp": "2024-09-20T11:38:00Z" },
    { "id": 100, "motion": "not detected", "temperature": 25.5, "humidity": 61.2, "ldr": 600, "timestamp": "2024-09-20T11:39:00Z" }
];

export default mockData;