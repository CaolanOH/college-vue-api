import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome'
import Home from './views/Home'
import Register from './views/Register'
import CoursesIndex from './views/courses/Index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsShow from './views/enrolments/Show'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsCreate from './views/enrolments/Create'

import LecturersIndex from './views/lecturers/Index'
import LecturersShow from './views/lecturers/Show'
import LecturersEdit from './views/lecturers/Edit'
import LecturersCreate from './views/lecturers/Create'



Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name: 'welcome',
      component: Welcome
    },
    {
      path:'/register',
      name: 'register',
      component: Register
    },
    {
      path:'/home',
      name:'home',
      component: Home
    },
    // Courses
    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate
    },
    {
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow
    },
    {
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit
    },
    // Enrolments
    {
      path:'/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },
    {
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentsCreate
    },
    {
      path: '/enrolments/:id',
      name: 'enrolments_show',
      component: EnrolmentsShow
    },
    {
      path: '/enrolments/:id/edit',
      name: 'enrolments_edit',
      component: EnrolmentsEdit
    },
    // Lecturers
    {
      path:'/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },
    {
        path: '/lecturers/create',
        name: 'lecturers_create',
        component: LecturersCreate
      },
      {
        path: '/lecturers/:id',
        name: 'lecturers_show',
        component: LecturersShow
      },
      {
        path: '/lecturers/:id/edit',
        name: 'lecturers_edit',
        component: LecturersEdit
      },
  ]
  });
