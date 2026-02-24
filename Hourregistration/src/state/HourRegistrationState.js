import {defineStore} from "pinia";
import {fetchWithBaseUrl} from "@/state/Fetch.js";

export const useHourRegistrationStore = defineStore('HourRegistrationStore', {
    state: () => ({
        ProjectId: 0,
        UserId: 0,
        StartTime: new Date(),
        EndTime: new Date(),
        Running: false,
        projects: [],
        RecordedItems: []
    }),
    persist: {
        paths: ["ProjectId", 'UserId', 'StartTime', 'EndTime', 'Running', 'RecordedItems'],
        storage: localStorage, // Optional: Use sessionStorage instead of localStorage
    },
    actions: {
        async DeleteHourRegistrations(Id) {
            try {
                const res = await fetchWithBaseUrl(`api/hour/${Id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: Id
                    })
                }).then(res => {
                    return {
                        success: true,
                        status: 200,
                        data: res.json()
                    }
                });
            } catch (error) {
                return {
                    success: false,
                    status: error.status,
                }
            }
        },
        async CreateHourRegistration(itemIndex) {
            try {
                const response = await fetchWithBaseUrl("api/hour", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ProjectId: this.RecordedItems[itemIndex].ProjectId,
                        UserId: this.RecordedItems[itemIndex].UserId,
                        StartTime: new Date(this.RecordedItems[itemIndex].StartTime).toISOString(),
                        EndTime: new Date(this.RecordedItems[itemIndex].EndTime).toISOString()
                    })
                })
                return {
                    response: response,
                    status: response.status
                }
            } catch (error) {
                return {
                    response: error,
                    status: error.code
                }
            }
        },
        async UpdateHourRegistration(item) {
            try {
                const response = await fetchWithBaseUrl(`api/hour`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item)
                }).then(res => {
                    return {
                        success: true,
                        status: 200,
                        data: res.json()
                    }
                })
            } catch (error) {
                return {
                    success: false,
                    status: error.status,
                }
            }
        },
        getProjectByName(name) {
            console.log(this.projects)
            return this.projects.find(project => project.name === name)
        },
        getActiveProject() {
            console.log(this.projects)
            return this.projects.find(project => project.id === this.ProjectId)
        },
        getProjectNameById(id) {
            let project = this.projects.find(project => project.id === id)
            if (project === undefined) {
                return "Unknown Project"
            }
            return project.name
        },
        extractData() {
            let data = {
                ProjectId: this.ProjectId,
                UserId: this.UserId,
                StartTime: this.StartTime,
                EndTime: this.EndTime
            }

            this.RecordedItems.push(data)
            console.log(this.RecordedItems)
        },
        DeleteItem(indexItem) {
            this.RecordedItems.splice(indexItem, 1);
        },
        EditItem(index, startTime, endTime) {
            let StartTime = new Date(this.RecordedItems[index].StartTime);
            let EndTime = new Date(this.RecordedItems[index].EndTime);
            
            StartTime.setHours(startTime.split(":")[0])
            StartTime.setMinutes(startTime.split(":")[1])
            
            EndTime.setHours(endTime.split(":")[0])
            EndTime.setMinutes(endTime.split(":")[1])
            
            this.RecordedItems[index].StartTime = StartTime
            this.RecordedItems[index].EndTime = EndTime
        },
        async GetHourRegistrationDetails(userId) {
            try {
                const response = await fetchWithBaseUrl("api/hour/user/", {
                    method: "GET",
                })
                
                return {
                    response: response,
                    data: response.json(),
                    status: response.status
                }
            } catch (e) {
                return {
                    response: e.message,
                    status: 500
                }
            }
        },
        SaveRecording(ProjectName, ProjectId, UserId, StartTime, EndTime) {
            console.log(ProjectName, ProjectId, UserId, StartTime, EndTime)
            this.RecordedItems.push({ProjectName: ProjectName, ProjectId: ProjectId, UserId: UserId, StartTime: StartTime, EndTime: EndTime})
        },
    }
})