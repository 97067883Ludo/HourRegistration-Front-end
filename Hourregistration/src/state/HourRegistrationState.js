import {defineStore} from "pinia";

export const useHourRegistrationStore = defineStore('HourRegistrationStore', {
    state: () => ({
        ProjectId: 0,
        UserId: 0,
        StartTime: new Date(),
        EndTime: new Date(),
        Running: false
    }),
    persist: {
        paths: ["ProjectId", 'UserId', 'StartTime', 'EndTime', 'Running'],
        storage: localStorage, // Optional: Use sessionStorage instead of localStorage
    },
    actions: {
        async CreateHourRegistration(projectId, userId, startTime, endTime) {
            const response = await fetch("http://localhost:5145/api/hourregistration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ProjectId: projectId,
                    UserId: userId,
                    StartTime: startTime,
                    EndTime: endTime
                })
            })
            console.log(response)
        },
    }
})