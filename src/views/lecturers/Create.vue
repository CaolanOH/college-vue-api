<template lang="html">
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <h2>Create a new lecturer</h2>
          </v-card-title>
          <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field v-model="form.name" label="Name" :rules="nameRules" required ></v-text-field>
                <v-text-field v-model="form.address" label="Address" :rules="addressRules" required ></v-text-field>
                <v-text-field v-model="form.phone" label="Phone" type="number" :rules="phoneRules" required ></v-text-field>
                <v-text-field v-model="form.email" label="Email" type="email" :rules="emailRules" required ></v-text-field>
    <!-- title: <input type="text" v-model="form.title" /> <br>
    code: <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    description: <input type="text" v-model="form.description" /> <br>
    points: <input type="text" v-model="form.points" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    level: <input type="text" v-model="form.level" /> <span v-if="errors.level"> {{ errors.level }} </span><br> -->
                <v-row class="justify-center">
                  <v-col cols="3">
                    <v-btn :to="{ name: 'lecturers_index'}">Cancel</v-btn>
                  </v-col>
                  <v-col cols="3">
                    <v-btn @click="createLecturer()" class="success">Submit</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from '@/config/api';
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        phone: "",
        email: ""
      },
      errors: [],
      nameRules: [
        v => !!v || 'Name is empty',
        v => v.length >= 3 || 'Minimun length is 3 characters'
      ],
      addressRules: [
        v => !!v || 'Address is empty',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      phoneRules: [
        v => !!v || 'Phone number is empty',
        v => v.length >= 7 || 'Minimum length is 7 characters'
      ],
      emailRules: [
        v => !!v || 'Email is empty',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }
  },
  mounted() {

  },
  methods: {
    createLecturer() {
      if (this.$refs.form.validate()) {
        let token = localStorage.getItem('token');
        axios.post('/lecturers', {
            name: this.form.name,
            address: this.form.address,
            email: this.form.email,
            phone: this.form.phone
          }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
          .then(response => {
            console.log(response.data);
            this.$router.push({
              name: 'lecturers_index'
            });
          })
          .catch(error => {
            console.log(error)
            console.log(error.response.data)
            if (error.response.data.errors) {
              this.errors = error.response.data.errors
            }
          })
      }
    }
  },
}
</script>

<style lang="css" scoped>
</style>
