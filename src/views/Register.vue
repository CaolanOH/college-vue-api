<template lang="html">
<v-container class="mt-10">
  <v-row class="justify-center">
    <v-col cols="8">
      <v-card>
        <v-card-title class="justify-center ">
          <h1>Register</h1>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-row class="justify-center">
            <v-col cols="5">
              <v-card>
              <v-img src="/register.jpg"></v-img>
            </v-card>
            </v-col>
            <v-col cols="5">
          <v-form refs="form" lazy-validation>
            <v-text-field v-model="form.name" label="Username" :rules="usernameRules"></v-text-field>
            <v-text-field v-model="form.email" label="email" type=" email" :rules="emailRules" class="mt-10"></v-text-field>
            <v-text-field v-model="form.password" label="password" type="password" :rules="passwordRules" class="mt-10"></v-text-field>
            <v-btn class="success mt-10" block x-large tile @click="register()">Sign Up</v-btn>

          </v-form>
        </v-col>
        </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import axios from '@/config/api';
  export default {
    name: 'Register',
    components: {},
    data() {
      return {
        form:{
          name:"",
          email:"",
          password:""
        },
        usernameRules:[
          v => !!v || 'Username is empty',
          v => v.length >= 3 || 'Minimun length is 3 characters'
        ],
        emailRules:[
          v => !!v || 'Email is empty',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules:[
          v => !!v || 'Password is empty',
          v => v.length >= 3 || 'Minimun length is 3 characters'
        ]
      }
    },
    methods:{
      register(){
        if(this.$refs.form.validate()) {
        axios.post('/register',{
          name: this.form.name,
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
      }
    }
    }
  }

</script>

<style lang="css" scoped>
</style>
