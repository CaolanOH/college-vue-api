<template lang="html">
  <v-dialog v-model="dialog" persistent max-width="500">
       <template v-slot:activator="{ on, attrs }">
         <v-btn color="error" tile dark v-bind="attrs" v-on="on">
           Remove
         </v-btn>
       </template>
       <v-card>
         <v-card-title class="headline">
           Remove this lecturer ?
         </v-card-title>
         <v-card-text>
           <p>Name : {{this.lecturer.name}}</p>
           <p>Address : {{this.lecturer.address}}</p>
           <p>Phone : {{this.lecturer.phone}}</p>
           <p>Email : {{this.lecturer.email}}</p>
         </v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
           <v-btn color="error darken-1" text @click="deleteLecturer(); dialog = false">REMOVE</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
</template>

<script>
import axios from '@/config/api';
export default {
  name: 'DeleteLecturerBtn',
  props: {
    lecturer: Object
  },
  data() {
    return {
      dialog: false,
    }
  },
    methods: {
      deleteLecturer(){
        let token = localStorage.getItem('token');
        let listOfDeleteRequests = this.lecturer.enrolments.map((current) => axios.delete(`/enrolments/${current.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        }));
        // log the contents of listOfDeleteRequests
        Promise.all(listOfDeleteRequests)
          .then((response) => { //<--this line changed
            axios.delete("/lecturers/" + this.lecturer.id, {
                headers: {
                  Authorization: "Bearer " + token
                }
              })
              .then((response) => { //<--this line changed
                console.log(response.data);
                this.$router.replace({
                  name: 'lecturers_index'
                })
              })
              .catch((error) => { //<--this line changed
                console.log(error);
                console.log(response.data);
              });
          });
      }
    }
  }


</script>

<style lang="css" scoped>
</style>
