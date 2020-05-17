<template>
  <v-app>
    <v-content>
    <v-app-bar>
    <v-toolbar-title>{{Title}}</v-toolbar-title>
    <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="change1">Project Budjet</v-tab>
          <v-tab @click="change2">SOS Expected Funding</v-tab>
        </v-tabs>
    </template>
    </v-app-bar>
    <keep-alive>
    <component :is="currentTabComponent"></component>
    </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import ProjectBudjet from '@/components/ProjectBudjet'
import ExpectedFunding from '@/components/ExpectedFunding'

export default {
  name: 'App',

  data(){
  return{
    Title:'ProjectBudjet',
    currentTabComponent:ProjectBudjet
  }
  },
  methods:{
  change1(){
  this.Title='Project Budjet'
  this.currentTabComponent=ProjectBudjet
  },
  change2(){
  this.Title='Save Our Species'
  this.currentTabComponent=ExpectedFunding
  }
  }
};
</script>
