<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="flex justify-center">
                <logo-view class="w-32 h-32" />
            </div>

            <div
                class="text-center font-bold tracking-tight self-center text-2xl/9 font-semibold sm:text-2xl/9 whitespace-nowrap">
                <span class="text-indigo-700">Mini</span>PCP
            </div>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">E-mail</label>
                    <div class="mt-2">
                        <input type="text" v-model="email" name="email" id="email" autocomplete="email" required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Senha</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Esqueci minha
                                senha?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input type="password" v-model="password" name="password" id="password"
                            autocomplete="current-password" required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Entrar
                    </button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm/6 text-gray-500">
                <a href="/operador" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    <i class='bx bxs-joystick'></i> Acesso do operador
                </a>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LogoView from '@/components/logo/LogoView.vue'

export default {
    components: { LogoView },
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post('http://localhost:3000/api/auth/login', {
                    login: this.email,
                    senha: this.password
                });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/principal');
            } catch (error) {
                this.errorMessage = error.response?.data?.error || 'Erro no login';
                alert(this.errorMessage);
            }
        }
    }
}
</script>

<style>
/* Adicione seu estilo aqui, se necessário */
</style>