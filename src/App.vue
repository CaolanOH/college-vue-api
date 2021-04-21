<template>
<v-app class="background">
  <Navbar :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
  <router-view :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
</v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  data() {
    return {
      loggedIn: false
    }
  },
  created() {

    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ", this.loggedIn);

    } else {
      this.loggedIn = false;
    }
  },
  components: {
    Navbar
  },
  methods: {
    setLoggedIn() {
      this.loggedIn = true;
      // optionally, you could store the token in localStorage here
    },
    setLoggedOut() {
      this.loggedIn = false;
      // optionally, you could trigger the whole logout process here
    }
  }

}
</script>

<style>
.background{
  background-color: #F5F5F5;
}
</style>
