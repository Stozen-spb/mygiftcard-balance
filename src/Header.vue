<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div>
            <img src="logo.svg" alt="logo" class="logo">
            <a class="navbar-brand" href="#"> Balance</a>
        </div>
        
        <button @click="toggleNavbar" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="showNavbar ? 'show' : ''" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
                 <router-link class="nav-link" to="/registration">Registration</router-link>
            </li>
            <li  class="nav-item">
                <a href="#" class="nav-link" @click="logout">Logout</a>
            </li>

            </ul>
        </div>
        </nav>
</template>

<script>
export default {
    data() {
        return {
            showNavbar:false
        }
    },
    methods: {
        logout(e) {
            e.preventDefault()
            if ( !confirm('Выйти из аккаунта?')) return
            this.$store.commit('logOut')
        },
        toggleNavbar(){
            this.showNavbar = !this.showNavbar
        }
    },
    computed: {

    }
}
</script>

<style scoped>
    nav.navbar {
        background-color: #45b5dc!important;
        font-size: 1.2rem;
        font-weight: bold;
    }
    .logo {
        margin-right: 10px;
    }
</style>