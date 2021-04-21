<template lang="html">
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <h2>Create a new enrolment</h2>
          </v-card-title>
          <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-select v-model="form.course_id" label="Course Name" :items="courses" item-value="id" item-text="title" :rules="courseRules" required ></v-select>
                <v-text-field v-model="form.date" label="Date" type="date" :rules="dateRules" required ></v-text-field>
                <v-text-field v-model="form.time" label="Time" type="time" :rules="timeRules" required ></v-text-field>
                <v-select v-model="form.status" :items="items" :rules="statusRules" label="Status" required></v-select>
                <v-select v-model="form.lecturer_id" label="Lecturer Name" :items="lecturers" item-value="id" item-text="name" :rules="lecturerRules" required ></v-select>



    <!-- title: <input type="text" v-model="form.title" /> <br>
    code: <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{ errors.code }} </span><br>
    description: <input type="text" v-model="form.description" /> <br>
    points: <input type="text" v-model="form.points" /> <span v-if="errors.points"> {{ errors.points }} </span><br>
    level: <input type="text" v-model="form.level" /> <span v-if="errors.level"> {{ errors.level }} </span><br> -->
                <v-row class="justify-center">
                  <v-col cols="3">
                    <v-btn :to="{ name: 'enrolments_index'}">Cancel</v-btn>
                  </v-col>
                  <v-col cols="3">
                    <v-btn @click="createEnrolement()" class="success">Submit</v-btn>
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
  name: 'EnrolmentsCreate',
  components: {},
  data() {
    return {
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
      },
      errors: {},
      items: [
        'interested',
        'assigned',
        'associate',
        'career break'
      ],
      courses: [],
      lecturers: [],
      courseRules: [
        v => !!v || 'Course input is empty'
      ],
      dateRules: [
        v => !!v || 'Date input is empty'
      ],
      timeRules: [
        v => !!v || 'Time input is empty'
      ],
      lecturerRules: [
        v => !!v || 'Course input is empty'
      ],
      statusRules: [
        v => !!v || 'Course input is empty'
      ],

    }
  },
  mounted() {
    this.getCourses();
    this.getLectures();
  },
  methods: {
    createEnrolement() {
      let token = localStorage.getItem('token');
      if (this.$refs.form.validate()){
      axios.post('/enrolments', {
          date: this.form.date,
          time: this.form.time,
          status: this.form.status,
          course_id: this.form.course_id,
          lecturer_id: this.form.lecturer_id
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$router.push({
            name: 'enrolments_index'
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
  },
    getCourses() {
      let token = localStorage.getItem('token');
      axios.get('/courses', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.courses = response.data.data;
        }).catch(error => {
          console.log(error)
          console.log(error.response.data);
        })

    },
    getLectures() {
      let token = localStorage.getItem('token');
      axios.get('/lecturers', {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          console.log(response.data);
          this.lecturers = response.data.data;
        }).catch(error => {
          console.log(error)
          console.log(error.response.data);
        })

    }
  },
}
</script>

<style lang="css" scoped>
</style>
