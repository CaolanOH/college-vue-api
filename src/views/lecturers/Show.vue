<template lang="html">
  <v-container class="mt-10">
    <v-row class="justify-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <h1>Lecturer</h1>
          </v-card-title>
              <v-card-text>
                {{this.lecturer.name}}
                <br>
                {{this.lecturer.address}}
                <br>
                {{this.lecturer.phone}}
                <br>
                {{this.lecturer.email}}
                <br>
                {{this.lecturer.status}}
                <br>
                <v-btn class="warning" tile :to="{name: 'lecturers_edit', params: { id: this.lecturer.id} }">Edit</v-btn>
                  <DeleteLecturerBtn :lecturer="this.lecturer"/>

              </v-card-text>
                </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeleteLecturerBtn from '@/components/DeleteLecturerBtn.vue';
import axios from '@/config/api';
export default {
  components: {
    DeleteLecturerBtn
  },
  data(){
    return{
      lecturer:{}
    }
  },
  mounted(){
    this.id = this.$route.params.id
    this.getLecturer();
  },
  methods:{
    getLecturer(){
        let token = localStorage.getItem('token');
        axios.get(`/lecturers/${this.id}`, {
          headers: { Authorization: "Bearer "+ token }
        })
        .then(response =>{
          console.log(response.data);
          this.lecturer = response.data.data;

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
