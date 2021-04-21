<template lang="html">
<nav>
  <v-toolbar dark>
    <v-toolbar-title>CollegeAPI</v-toolbar-title>
    <v-toolbar-items v-if="loggedIn">
      <v-btn depressed :to="{ name: 'courses_index'}">Courses</v-btn>
      <v-btn depressed :to="{ name: 'lecturers_index'}">Lecturers</v-btn>
      <v-btn depressed :to="{ name: 'enrolments_index'}">Enrolments</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn depressed :to="{ name: 'welcome'}">Home</v-btn>
      <v-btn depressed>About</v-btn>
      <v-btn depressed>Contact</v-btn>
    </v-toolbar-items>
      <v-spacer/>
    <v-toolbar-items v-if="loggedIn">
      <v-btn depressed @click="logout()">LogOut</v-btn>
      </v-toolbar-items>
    <v-toolbar-items v-else>
      <Login v-on:login="setLoggedIn" />
      <v-btn depressed  v-on:login="setLoggedIn" :to="{name: 'register' }">Register</v-btn>
    </v-toolbar-items>

  </v-toolbar>
</nav>
</template>

<script>
import Login from './Login.vue'
import axios from '@/config/api';
export default {
  name: 'Navbar',
  props: {
    loggedIn: Boolean //<-- this is new line
  },

  data() {
    return {

    }
  },

  components: {
    Login
  },
  methods:{
    logout() {
      let token = localStorage.getItem('token')

      axios.get('/logout', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
            this.$emit('logout');
          this.$router.replace({
            name: 'welcome'
          });
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
      localStorage.removeItem('token');
    }
    // logout(){
    // localStorage.removeItem('token'); // optionally, can now move this to App.vue's logout method
    //   this.$emit('logout'); //<-- tells App.vue to update loggedIn
    //   this.$router.push('/');
    // }
  },
  setLoggedIn() {
    this.$emit('login');
  },
}
</script>

<style lang="css" scoped>
</style>
