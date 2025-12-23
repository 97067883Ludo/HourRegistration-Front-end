import { defineStore } from 'pinia';
import router from "@/router/index.js";

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            Id: 0,
            UserName: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Role: "",
            Token: ""
        }
    },
    persist: {
        paths: ["UserName", 'FirstName', 'LastName', 'Email', 'Role', "Token"],
        storage: sessionStorage, // Optional: Use sessionStorage instead of localStorage
    },
    actions: {
        async Login(email, password) {
            try {
                const response = await fetch("http://localhost:5145/api/Auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Email: email,
                        Password: password
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    return {
                        success: false,
                        message: errorData.message
                    }
                }
                const data = await response.json();
                
                this.Token = data.token;
                this.Email = data.email;
                this.Id = data.id;
                this.FirstName = data.firstName;
                this.LastName = data.lastName;
                this.Role = data.role;
                

                console.log("Login Successfull ");
                console.log(data);
                return {
                    success: true,
                    message: "Success"
                }
            } catch (error) {
                console.error("Login Error:", error);
            }
        },

        Logout() {
            this.$reset(); // Clears state
        },
        
        async Me() {
            const response = await fetch("http://localhost:5145/api/Auth/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: this.Token
                })
            });
            if (response.status === 200 && router.currentRoute.value.path === '/login') {
                await router.push({path: '/', replace: true})
            }
            if(response.status > 200) {
                await router.push({path: '/login', replace: true})
            }
        }
    },
})