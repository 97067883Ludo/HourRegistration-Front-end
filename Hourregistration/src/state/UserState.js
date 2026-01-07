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
        storage: localStorage, // Optional: Use sessionStorage instead of localStorage
    },
    actions: {
        async Login(email, password) {
            try {
                const response = await fetch("https://uren.huizenchaos.nl/api/Auth/login", {
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
                if(router.currentRoute.value.path !== "/login") {
                    await router.push("/login");
                }
                return {
                    success: false,
                    message: "Something went wrong"
                }
            }
        },

        async Logout() {
            this.$reset(); // Clears state
            await router.push("/login");
        },
        
        async Me() {
            try {
                const response = await fetch("https://uren.huizenchaos.nl/api/Auth/me", {
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
                if (response.status > 200) {
                    await router.push({path: '/login', replace: true})
                }
            } catch (e) {
                await router.push("/login");
            }
        }
    },
})