<template lang="html">
  <div class="welcome">
    <v-container fluid>
      <v-row class="mt-16">
        <v-col class="col-6">
        <h1 class="display-4">Welcome..</h1>
      </v-col>
  </v-row>
    <v-row>
    <v-col class="col-6 pr-15 pt-0 mt-0">
      <h1 class="uni-line-height">To CollegeAPI University</h1>
    </v-col>
      </v-row>
    </v-container>
    <v-container class="my-10">
      <v-row>
    <v-carousel>
    <v-carousel-item
      cycle
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
  ></v-carousel-item>
    </v-carousel>
  </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      items:[
        {
          src:'/Lecture01.jpg'
        },
        {
          src:'/Lecture02.jpg'
        },
        {
          src:'/Lecture03.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.welcome{
  text-align: center;
  font-family: sans-serif;
}
.uni-line-height{
  line-height: 0;
}
</style>
