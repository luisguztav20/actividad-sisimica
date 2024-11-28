<template>
  <q-page class="content-center">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 content-center text-grey-4">
        <div
          class="text-center presentation q-mx-auto q-pa-lg"
          style="max-width: 600px"
        >
          <img
            src="/volcan-08.gif"
            alt="Logo monitoreo volcanico"
            style="width: auto; height: 150px"
            class="q-mx-auto q-mb-md"
          />
          <h1 class="text-h4 text-weight-bold text-black">
            App de Monitoreo Volcánico
          </h1>
          <p class="text-body1 text-black">
            Inicia sesión para acceder a la plataforma
          </p>
        </div>
      </div>

      <div class="col-xs-12 col-sm-12 col-md-6 content-center">
        <div class="q-mx-auto q-pa-lg" style="max-width: 600px">
          <q-card flat bordered class="q-pa-md">
            <q-card-section>
              <h4 class="text-center">Formulario de registro</h4>
            </q-card-section>

            <q-form @submit="onSubmit" class="q-gutter-y-md">
              <q-card-section>
                <q-input v-model="email" label="Correo" type="email" />
                <q-input
                  type="password"
                  v-model="password"
                  label="Contraseña"
                />
              </q-card-section>

              <q-card-section align="center" class="column q-gutter-y-md">
                <q-btn
                  color="primary"
                  label="Iniciar sesión"
                  rounded
                  style="width: 100%"
                />
                <q-btn
                  outline
                  color="primary"
                  type="onSubmit"
                  rounded
                  style="width: 100%"
                >
                  <q-avatar size="20px" class="q-mr-sm">
                    <img src="/icons/google.png" />
                  </q-avatar>
                  Iniciar con Google
                </q-btn>
              </q-card-section>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { auth, provider } from "src/boot/firebase"; // Firebase auth y provider
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { Notify } from "quasar";
import { use } from "echarts";

const router = useRouter();
const authStore = useAuthStore();

// El correo permitido
const allowedEmail = "ernesto.calderon@ues.edu.sv";
const adminDos = "luizzmendozza1904@gmail.com";
const adminTres = "tq19002@ues.edu.sv";
const adminCuatro = "qj20001@ues.edu.sv";

// Estado para mostrar mensajes de error
const errorMessage = ref("");

const onSubmit = async () => {
  try {
    // Inicia sesión con Firebase
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verifica si el correo es permitido
    if (
      user.email !== allowedEmail &&
      user.email !== adminDos &&
      user.email !== adminTres &&
      user.email !== adminCuatro
    ) {
      // Si no es el correo permitido, cierra sesión
      await auth.signOut();
      Notify.create({
        message: "No tienes permisos para iniciar sesion",
        color: "red",
        position: "top",
      });
      router.push("/");
      return;
    }

    // Si el correo es válido, guarda el usuario en el store
    authStore.user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Usuario",
      photoURL: user.photoURL || "https://cdn.quasar.dev/img/avatar.png",
    };
    Notify.create({
      message: `Bienvenido ${authStore.user.displayName}`,
      color: "positive",
      position: "top",
    });

    // Redirige a la página principal o protegida
    router.push("/data");
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    errorMessage.value = "Error al iniciar sesión. Inténtalo nuevamente.";
  }
};
</script>
