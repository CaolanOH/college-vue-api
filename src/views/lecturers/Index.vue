<template lang="html">
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col cols="10">
         <v-card>
           <v-card-title>
          <v-row>
            <v-col cols="10">
              <h1>Lecturers</h1>
            </v-col>
            <v-col cols="2">
              <v-btn class="success" tile :to="{name:'lecturers_create'}"><v-icon class="">add</v-icon>Lecturer</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
         <v-card-text>
        <v-data-table :headers="headers" :items="lecturers" loading="loaderVariable" loading-text="Loading..." :search="term">
        <template v-slot:item.name="{item}">
          <router-link :to="{name: 'lecturers_show', params: { id: item.id} }" class="list-item" v-bind:key="item">{{item.name}}</router-link>
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
  name: 'EnrolmentsIndex',
  components: {},
  data(){
    return{
      loaderVariable: true,
      lecturers: [],
      filterCourses: [],
      term: '',
      headers:[
        {
        text:"Name",
        align: 'start',

        value:'name'
      },
      {
        text:"Address",
        value:'address'
      },
      {
        text:"Phone",
        value:'phone'
      },
      {
        text:"Email",
        value:'email'
      }
    ]
    }
  },
  watch:{
    term: function() {
      this.searchCourse();
    }
  },
  mounted(){
    this.getLecturers();
  },
  methods:{
    getLecturers(){
        let token = localStorage.getItem('token');
        axios.get('/lecturers', {
          headers: { Authorization: "Bearer "+ token }
        })
        .then(response =>{
          console.log(response.data);
          this.lecturers = response.data.data;
          this.filterCourses = this.lecturers
          this.loaderVariable = false;
      }).catch(error =>{
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
