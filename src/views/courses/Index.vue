<template lang="html">
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col cols="10">
         <v-card outlined>
           <v-card-title>
          <v-row>
            <v-col cols="10">
              <h1>Courses</h1>
            </v-col>
            <v-col cols="2">
              <v-btn class="success" tile :to="{name:'courses_create'}"><v-icon class="">add</v-icon> Course</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
         <v-card-text>
        <v-data-table :headers="headers" :items="courses" loading="loaderVariable" loading-text="Loading..." :items-per-page="5" :search="term">
        <template v-slot:item.title="{item}">
          <router-link :to="{name: 'courses_show', params: { id: item.id} }" class="list-item" v-bind:key="item.id">{{item.title}}</router-link>
        </template>
        <template v-slot:top>
                <v-text-field v-model="term" label="Search.." class="mx-4" v-on:keyup.enter="searchCourse"></v-text-field>
              </template>
        </v-data-table>
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
      loaderVariable: true,
      courses: [],
      filterCourses: [],
      term: '',
      headers: [{
          text: "Title",
          align: 'start',

          value: 'title'
        },
        {
          text: "Description",
          value: 'description'
        },
        {
          text: "Code",
          value: 'code'
        },
        {
          text: "Level",
          value: 'level'
        },
        {
          text: "Points",
          value: 'points'
        }

      ]
    }
  },
  watch: {
    term: function() {
      this.searchCourse();
    }
  },
  mounted() {
    this.loaderVariable;
    this.getCourses();
    this.filterCourses();
  },
  methods: {
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
          this.filterCourses = this.courses;
          this.loaderVariable = false;
        }).catch(error => {
          console.log(error)
          console.log(error.response.data);
        })

    },
    searchCourse() {
      this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(this.term.toLowerCase()));
    },
  }
}
</script>

<style lang="css" scoped>
.home{
  text-align: center;
  font-family: sans-serif;
}
</style>
