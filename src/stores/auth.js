import { defineStore } from "pinia";
import { auth } from "src/boot/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Guardará los datos del usuario autenticado
  }),
  actions: {
    init() {
      // Escuchar los cambios en el estado de autenticación
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Usuario",
            photoURL: user.photoURL || "https://cdn.quasar.dev/img/avatar.png",
          };
        } else {
          this.user = null;
        }
      });
    },
    logout() {
      auth.signOut();
      this.user = null;
    },
  },
});
