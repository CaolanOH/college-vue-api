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
           <p>Level : {{this.course.title}}</p>
           <p>Level : {{this.course.level}}</p>
           <p>Points : {{this.course.points}}</p>
           <p>Description : {{this.course.description}}</p>
         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
           <v-btn color="error darken-1" text @click="deleteCourse(); dialog = false">REMOVE</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>

</template>

<script>
import axios from '@/config/api';
export default {
  name: 'DeleteCourseBtn',
  props: {
    course: Object
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    deleteCourse() {
      let token = localStorage.getItem('token');
      let listOfDeleteRequests = this.course.enrolments.map((current) => axios.delete(`/enrolments/${current.id}`
        , {headers: {Authorization: "Bearer " + token}}
      ));
      // log the contents of listOfDeleteRequests
      Promise.all(listOfDeleteRequests)
        .then((response) => { //<--this line changed
          axios.delete("/courses/" + this.course.id, {
              headers: {
                Authorization: "Bearer " + token
              }
            })
            .then((response) => { //<--this line changed
              console.log(response.data);
              this.$router.replace({
                name: 'courses_index'
              })
            })
            .catch((error) => { //<--this line changed
              console.log(error);
              console.log(response.data);
            });
        });
    }

    //       let token = localStorage.getItem('token');
    //       let listOfDeleteRequests = this.course.enrolments.map((current) => axios.delete("/api/enrolments/" +
    //       current.id, {headers: { Authorization: "Bearer " + token }}
    //     ));
    // // log the contents of listOfDeleteRequests
    //       axios.all(listOfDeleteRequests)
    //       .then((response) => {
    //         axios.delete("/api/courses/" + this.course.id, {
    //           headers: { Authorization: "Bearer " + token }
    //         })
    //         .then((response) => {
    //           console.log(response.data);
    //
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //           console.log(response.data);
    //         });
    //       });

  }
}
</script>

<style lang="css" scoped>
</style>
