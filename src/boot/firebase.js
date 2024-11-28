// import { boot } from "quasar/wrappers";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
// import { createPinia } from "pinia";
// import { useAuthStore } from "src/stores/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC5CxHL5Z8FurFzEWsJkuuTTJ8G8W-dU00",
//   authDomain: "monitoreo-volcanico-288f5.firebaseapp.com",
//   projectId: "monitoreo-volcanico-288f5",
//   storageBucket: "monitoreo-volcanico-288f5.firebasestorage.app",
//   messagingSenderId: "222726688505",
//   appId: "1:222726688505:web:16893eafd06fde9a9bdc28",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// auth.languageCode = "es";

// export default boot((async) => {
//   const pinia = createPinia();
//   app.use(pinia);

//   const authStore = useAuthStore();
//   authStore.init();
// });

// export { auth, provider };

import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createPinia } from "pinia";
import { useAuthStore } from "src/stores/auth"; // Asegúrate de tener este store
import { GoogleAuthProvider } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5CxHL5Z8FurFzEWsJkuuTTJ8G8W-dU00",
  authDomain: "monitoreo-volcanico-288f5.firebaseapp.com",
  projectId: "monitoreo-volcanico-288f5",
  storageBucket: "monitoreo-volcanico-288f5.firebasestorage.app",
  messagingSenderId: "222726688505",
  appId: "1:222726688505:web:16893eafd06fde9a9bdc28",
};

// Inicializa Firebase y sus servicios
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Exporta Firebase para usarlo donde sea necesario
export { auth, provider };

// Configura Quasar con Pinia y Firebase
export default boot(({ app }) => {
  const pinia = createPinia(); // Crear instancia de Pinia
  app.use(pinia); // Registrar Pinia en la app Quasar

  // Inicializa el estado del usuario al iniciar la app
  const authStore = useAuthStore();
  authStore.init();
});
