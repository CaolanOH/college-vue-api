<template lang="html">
  <v-container class="mt-10">
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <h1 class="display-2 font-weight-bold">{{this.course.title}}</h1>
          </v-card-title>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="5">
                <h3 class="label">Level :</h3>
                  <p class="">{{this.course.level}}</p>
              </v-col>
              <v-col cols="5">
                  <h3 class="label">Points :</h3>
                    <p>{{this.course.points}}</p>
                </v-col>

                </v-row>
                <v-row>
                  <v-col>
                    <h3 class="label">Description :</h3>

                    <p class="mt-5">{{this.course.description}}</p>
                  </v-col>
                </v-row>
                <v-row class="justify-center mt-5">
                <v-btn class="mr-1" color="yellow darken-1" tile :to="{name: 'courses_edit', params: { id: this.course.id} }">Edit</v-btn>
              <DeleteCourseBtn :course="this.course"/>

              </v-row>
              </v-card-text>
            </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>
        <h3>Something</h3>
      </v-card-title>
      <v-card-text>
        <br>
        {{course.enrolments.lecturer}}
        <br>
      </v-card-text>
      </v-card>
      <v-card class="mt-5">
        <v-card-title>
          <h3>More Stuff</h3>
        </v-card-title>
        <v-card-text>
          more stuff
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteCourseBtn from '@/components/DeleteCourseBtn.vue'
import axios from '@/config/api';
export default {
    name: 'CourseCreate',
    components: {
      DeleteCourseBtn
    },
data(){
  return{

    course:{}
  }
},
mounted(){
  this.id = this.$route.params.id
  this.getCourse();
},
methods:{
  getCourse(){
      let token = localStorage.getItem('token');
      axios.get(`/courses/${this.id}`, {
        headers: { Authorization: "Bearer "+ token }
      })
      .then(response =>{
        console.log(response.data);
        this.course = response.data.data;

    }).catch(error =>{
      console.log(error)
      console.log(error.response.data);
    })
  }
}
}
</script>

<style lang="css" scoped>
</style>
