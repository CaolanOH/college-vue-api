<template lang="html">
  <v-dialog v-model="dialog" persistent max-width="500">
       <template v-slot:activator="{ on, attrs }">
         <v-btn color="error" tile dark v-bind="attrs" v-on="on">
           Remove
         </v-btn>
       </template>
       <v-card>
         <v-card-title class="headline">
           Remove this course ?
         </v-card-title>
         <v-card-text>
           <p>Course : {{this.enrolment.course.title}}</p>
           <p>Lecturer : {{this.enrolment.lecturer.name}}</p>
           <p>Date : {{this.enrolment.date}}</p>
           <p>Time : {{this.enrolment.time}}</p>
           <p>Status : {{this.enrolment.status}}</p>
         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
           <v-btn color="error darken-1" text @click="deleteEnrolments(); dialog = false">REMOVE</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
</template>

<script>
import axios from '@/config/api';
export default {
  name: 'DeleteEnrolmentBtn',
  props: {
    enrolment: Object
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    deleteEnrolments() {
      let token = localStorage.getItem("token");
      axios.delete(`/enrolments/${this.enrolment.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(response => {
        this.$router.replace({
          name: 'enrolments_index'
        })
        console.log(response);
      }).catch(function(error){
        console.log(error);
      });
    }
},

}
</script>

<style lang="css" scoped>
</style>
