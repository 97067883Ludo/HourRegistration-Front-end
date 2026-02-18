import {defineStore} from "pinia";

export const useHourRecorderState = defineStore('HourRecorderStore', {
    state: () => ({
        ProjectName: "",
        ProjectId: 0,
        UserId: 0,
        StartTime: "",
        EndTime: "",
        Running: false
    }),
    persist: {
        paths: ["ProjectName", "ProjectId", 'UserId', 'StartTime', 'EndTime', 'Running'],
        storage: localStorage, // Optional: Use sessionStorage instead of localStorage
    },
    actions: {
        
    }
});