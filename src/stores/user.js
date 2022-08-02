import { defineStore } from "pinia";

export const useCambioStore = defineStore("cambios", {
    state: () => ({
        userData: false,
        userCrear: false,
       
    }),
    
});


