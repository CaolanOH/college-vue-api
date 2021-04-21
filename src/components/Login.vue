<template lang="html">

  <v-dialog v-model="dialog" width="500" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed v-on="on" v-bind="attrs"><v-icon>mdi-login-variant</v-icon>Login</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey--text">
        <v-icon>mdi-login-variant</v-icon>
        Login
      </v-card-title>
      <v-card-text>
<v-form class="px-3">
              <v-text-field
                v-model="form.email"

                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.password"

                 label="Password"
                 type="password"
                 required
               ></v-text-field>

               <v-btn class="uppercase" color="error darken-1" text @click="dialog = false">
                  close
               </v-btn>
               <v-btn class="uppercase" color="success darken-1" text @click="login(); dialog = false;">
                 Login
               </v-btn>

</v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '@/config/api';
export default {
  data(){
    return{
    form:{
      email:'',
      password:''
    },
      dialog: false,
    }

  },
  methods:{

    login(){
      axios.post('/login',{
        email: this.form.email,
        password: this.form.password
      })
      .then(response =>{
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$emit('login');
        this.$router.replace({ name: 'home' })

      })
      .catch(error =>{
        console.log(error)
        console.log(error.response.data);
      })

    },

  }
}
</script>

<style lang="css" scoped>
</style>
