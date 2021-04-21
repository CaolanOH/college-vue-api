<template lang="html">
  <v-container class="mt-10">
      <v-row class="justify-center">
        <v-col cols="8">
          <v-card>
            <v-card-title>
              <h1 class="display-2 font-weight-bold">{{this.enrolment.course.title}}</h1>
            </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <h3 class="label">Name :</h3>
                    </v-col>
                        <v-col>
                  {{this.enrolment.lecturer.name}}
                </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                            <h3 class="label">Date :</h3>
                    </v-col>
                    <v-col>
                  {{this.enrolment.date}}
                </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                            <h3 class="label">Time :</h3>
                    </v-col>
                        <v-col>
                  {{this.enrolment.time}}
                </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                            <h3 class="label">status :</h3>
                    </v-col>
                        <v-col>
                  {{this.enrolment.status}}
                </v-col>
                </v-row>
                  <v-row class="justify-center mt-5">
                  <v-btn class="warning mr-1" tile :to="{name: 'enrolments_edit', params: { id: enrolment.id}}" >Edit</v-btn>
                      <DeleteEnrolmentBtn :enrolment="this.enrolment"/>
                </v-row>
                </v-card-text>
                  </v-card>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import DeleteEnrolmentBtn from '@/components/DeleteEnrolmentBtn.vue';
import axios from '@/config/api';
export default {
  name: 'EnrolmentsShow',
  components: {
    DeleteEnrolmentBtn,
  },
  data(){
    return{
      enrolment:{}
    }
  },
  mounted(){
    this.id = this.$route.params.id
    this.getEnrolment();
  },
  methods:{
    getEnrolment(){
        let token = localStorage.getItem('token');
        axios.get(`/enrolments/${this.id}`, {
          headers: { Authorization: "Bearer "+ token }
        })
        .then(response =>{
          console.log(response.data);
          this.enrolment = response.data.data;

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
