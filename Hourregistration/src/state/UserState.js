import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            Id: 0,
            UserName: "",
            LastName: "",
            Email: "",
            Role: "",
            Token: ""
        }
    },
    actions: {
        async Login(email, password) {
            try {
                const response = await fetch("api/Auth/login", {
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
                    throw new Error(errorData.message || 'Login failed');
                }

                const data = await response.json();

                // Save the token to the state
                this.Token = data.token;

                // Note: You might want to decode the JWT here to fill 
                // Id, UserName, and Role, or call a separate "GetProfile" endpoint.
                this.Email = email;

                return true;
            } catch (error) {
                console.error("Login Error:", error);
            }
        },

        Logout() {
            this.$reset(); // Clears state
        }
    }
})