import {defineStore} from "pinia";
import {fetchWithBaseUrl} from "@/state/Fetch.js";


export const useProjectState =  defineStore('ProjectStore', {
    state: () => ({
        
    }),
    actions: {
        async GetProject(id) {
            try {
                const response = await fetchWithBaseUrl("api/project/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response)
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status
                }

            } catch (error) {
                return {
                    success: false,
                    data: [],
                    code: error.code
                }
            }
        },
        
        async GetAllProjects() {
            try {
                const response = await fetchWithBaseUrl("api/project", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                console.log(response)
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status
                }
                
            } catch (error) {
                return {
                    success: false,
                    data: [],
                    code: error.code
                }
            }
        },
        
        async CreateProject(name, description) {
            try {
                const response = await fetchWithBaseUrl("api/project", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Name: name,
                        Description: description
                    })
                });
                return {}
            } catch (error) {
                return {
                    success: false,
                    
                }
            }
        },
        async DeleteProject(id) {
            try {
                const response = await fetchWithBaseUrl("api/project/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                return {}
            } catch (error) {}
        }
    }
    
})