import {defineStore} from "pinia";

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
        async CreateHourRegistration(itemIndex) {
            try {
                const response = await fetch("http://localhost:5145/api/hour", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ProjectId: this.RecordedItems[itemIndex].ProjectId,
                        UserId: this.RecordedItems[itemIndex].UserId,
                        StartTime: this.RecordedItems[itemIndex].StartTime,
                        EndTime: this.RecordedItems[itemIndex].EndTime
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
        EditItem(index, item) {
            
            this.EditItem = item
        },
    }
})