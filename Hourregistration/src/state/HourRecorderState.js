import {defineStore} from "pinia";

export const useHourRecorderState = defineStore('HourRecorderStore', {
    state: () => ({
        ProjectId: 0,
        UserId: 0,
        StartTime: "",
        EndTime: "",
        Running: false
    }),
    actions: {
        
    }
});