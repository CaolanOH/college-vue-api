<template lang="html">
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col cols="10">
         <v-card>
           <v-card-title>
          <v-row>
            <v-col cols="9">
              <h1>Enrolments</h1>
            </v-col>
            <v-col cols="3">
              <v-btn tile class="success float-right" :to="{name:'enrolments_create'}"><v-icon class="">add</v-icon>Enrolment</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
         <v-card-text>
        <v-data-table
        :headers="headers"
        :items="enrolments"
        loading="loaderVariable"
        loading-text="Loading..."
        >

        <template v-slot:item.date="{item}">
          <router-link :to="{name: 'enrolments_show', params: { id: item.id} }" class="list-item" v-bind:key="item">{{item.date}}</router-link>
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
      loaderVariable: false,
      enrolments: [],
      headers:[
        {
        text:"Course",
        align: 'start',
        sortable: false,
        value:'course.title'
      },
      {
        text:"Lecturer",
        value:'lecturer.name'
      },
      {
        text:"Date",
        value:'date'
      },
      {
        text:"Time",
        value:'time'
      },
      {
        text:"Status",
        value:'status'
      }
    ]
    }
  },
  mounted(){
    this.getEnrolments();
  },
  methods:{
    getEnrolments(){

        let token = localStorage.getItem('token');
        axios.get('/enrolments', {
          headers: { Authorization: "Bearer "+ token }
        })
        .then(response =>{
          console.log(response.data);
          this.enrolments = response.data.data;
          this.loaderVariable = true
      }).catch(error =>{
        console.log(error)
        console.log(error.response.data);
      })

    }
  }
}
</script>

<style lang="css" scoped>
.home{
  text-align: center;
  font-family: sans-serif;
}
</style>
