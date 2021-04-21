<template lang="html">
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="6">
        <v-card >
          <v-card-title>
            <h2>Create a new course</h2>
          </v-card-title>
          <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                  </ul>
                </p>
                <v-text-field v-model="form.title" label="Title" :rules="nameRules" required></v-text-field>
                <v-textarea v-model="form.description" name="input-7-4" label="Description" :rules="descRules" required ></v-textarea>
                <v-row>
                  <v-col cols="4">
                    <v-text-field v-model="form.code" label="Code"  required :rules="codeRules" ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="form.points" label="Points" type="number" :rules="pointRules" required ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="form.level" label="Level" type="number" max="10" :rules="levelRules" required ></v-text-field>
                  </v-col>
                </v-row>


    <!-- title: <input type="text" v-model="form.title" /> <br>
    code: <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    description: <input type="text" v-model="form.description" /> <br>
    points: <input type="text" v-model="form.points" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    level: <input type="text" v-model="form.level" /> <span v-if="errors.level"> {{ errors.level }} </span><br> -->
                <v-row class="justify-center">
                  <v-col cols="3">
                    <v-btn :to="{ name: 'courses_index'}">Cancel</v-btn>
                  </v-col>
                  <v-col cols="3">
                    <v-btn @click="createCourse()" class="success">Submit</v-btn>
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
  name: 'CourseCreate',
  components: {},
  data() {
    return {
      errors: [],
      nameRules: [
        v => !!v || 'Course title is empty',
        v => v.length >= 3 || 'Minimun length is 3 characters'
      ],
      descRules: [
        v => !!v || 'Course description is empty',
        v => v.length >= 3 || 'Minimun length is 3 characters'
      ],
      codeRules: [
        v => !!v || 'Course Code is empty',
        v => v.length == 5 || 'Course code must be 5 Characters'
      ],
      pointRules: [
        v => !!v || 'Course points is empty'

      ],
      levelRules: [
        v => !!v || 'Course level is empty'

      ],
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },

    }
  },
  mounted() {

  },
  methods: {
    createCourse() {
      this.errors = [];
      if (!this.form.title) {
        this.errors.push("Course title required.");
      }
      if (!this.form.code) {
        this.errors.push("Course code is required.");
      }
      if (!this.form.description) {
        this.errors.push("Course description is required.");
      }
      if (!this.form.points) {
        this.errors.push("Course points required.");
      }
      if (!this.form.description) {
        this.errors.push("Course level required.");
      }

      let token = localStorage.getItem('token');

if (this.$refs.form.validate()){
      axios.post('/courses', {
          title: this.form.title,
          code: this.form.code,
          description: this.form.description,
          points: this.form.points,
          level: this.form.level,
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'courses_index'
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
