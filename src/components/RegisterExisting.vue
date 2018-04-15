<template>
<v-container fill-height justify-center align-center >
  <!-- <v-layout row > -->
    <v-flex v-if="!humanityEmployee" xs12 sm3>
      <!-- <h1> &nbsp;</h1> -->
      <v-card class="mt-0 pt-0">
          <v-card-title class="blue darken-1">
            <h4 style="color:white">Andrews</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent="login">
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Humanity ID</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field class="input-group--focused" name="humanityID" v-model="humanityID" label="Humanity ID" value="1444044"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-btn @click.native="verifyHumanity">Submit</v-btn>
                <v-snackbar v-if="error" :timeout="timeout" :top="true" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="error">
                  {{ text }}
                  <v-btn class="pink--text" flat @click.native="error = false">Close</v-btn>
                </v-snackbar>
              </form>
        </v-card-text>
      </v-card>
    </v-flex>
     <v-flex v-if="loggedIn" xs12 sm3>
      <!-- <h1> &nbsp;</h1> -->
      <v-card class="mt-0 pt-0">
          <v-card-title class="blue darken-1">
            <h4 style="color:white">Vue-CRM</h4>
          </v-card-title>
          <v-card-text>
             You are already logged in
        </v-card-text>
      </v-card>
    </v-flex>
  <!-- </v-layout> -->
  <!-- <EmployeeRecord v-if="humanityEmployee" ></EmployeeRecord> -->
    <v-layout row wrap justify-center v-if="humanityEmployee">
     <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            label="Full Name"
            placeholder="John Doe"
            v-model="humanityEmployee.name"
            required
            ref="name"
            :rules="[() => !!humanityEmployee.name || 'This field is required']"
            :error-messages="errorMessages"
          ></v-text-field>
             <v-text-field
            label="Cell Phone"
            required
            :rules="[() => !!humanityEmployee.cell_phone || 'This field is required']"
            v-model="humanityEmployee.cell_phone"
            ref="cell_phone"
          ></v-text-field>
          <v-text-field
            label="Address Line"
            placeholder="Snowy Rock Pl"
            :rules="[
              () => !!humanityEmployee.address || 'This field is required',
              () => !!humanityEmployee.address && humanityEmployee.address.length <= 25 || 'Address must be less than 25 characters'  
            ]"
            v-model="humanityEmployee.address"
            ref="address"
            counter="25"
            required
          ></v-text-field>
          <v-text-field
            label="City"
            placeholder="Tyler"
            :rules="[() => !!humanityEmployee.city || 'This field is required']"
            v-model="humanityEmployee.city"
            ref="city"
            required
          ></v-text-field>
          <v-text-field
            label="State/Province/Region"
            v-model="humanityEmployee.state"
            :rules="[() => !!humanityEmployee.state || 'This field is required']"
            required
            ref="state"
            placeholder="TX"
          ></v-text-field>
          <v-text-field
            label="ZIP / Postal Code"
            required
            :rules="[() => !!humanityEmployee.zip || 'This field is required']"
            v-model="humanityEmployee.zip"
            ref="zip"
            placeholder="75701"
          ></v-text-field>
        </v-card-text>       
         <v-alert :value="true" type="info">Username: {{newLogin}} Password: Andrews1</v-alert>
         
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              left
              v-if="formHasErrors"
            >
              <v-btn
                icon
                @click="resetForm"
                slot="activator"
                class="my-0"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    </v-layout>

  </v-container>
</template>
<script>
import auth from '../utils/auth'
import humanity from '../utils/humanity-api'
var Parse = require('parse');
export default {
    components: {
    // EmployeeRecord
  },
    data () {
    return {
      username: 'ash',
      formHasErrors: false,
      errorMessages: [],
      pass: 'asdfasdf',
      error: false,
      humanityID: '1444044',
      humanityVerfify: false,
      humanityEmployee: null,
      text: '',
      loggedIn: auth.loggedIn(),
       title: 'Preliminary report',
        email: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
  },
computed: {
    newLogin: function () {
      return (this.humanityEmployee.firstname.charAt(0) + '.' + this.humanityEmployee.lastname).toLowerCase()
    },
     form () {
        return this.humanityEmployee
     }
},
    watch: {
      name () {
        this.errorMessages = []
      }
    },

  methods: {
    verifyHumanity: function () {
      this.humanity.getData('employees/' + this.humanityID).then((res) =>
      {
        console.log(res)
         this.humanityEmployee = res.data.data
      })
    },
     resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })},
    submit () {
         this.formHasErrors = false

        // Object.keys(this.form).forEach(f => {
        //   if (!this.form[f]) this.formHasErrors = true

        //   this.$refs[f].validate(true)
        // })
        var user = new Parse.User()
        user.set("username", this.newLogin)
        user.set("password", 'Andrews1')
        user.set("email", this.humanityEmployee.email)

        // other fields can be set just like with Parse.Object
        user.set("phone", this.humanityEmployee.cell_phone)

        user.signUp(null, {
          success: function (user) {
            // Hooray! Let them use the app now.
          },
          error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message)
          }
});

    },
    mounted () {
    }
  }
}
</script>
<style lang="stylus">
  @import '../stylus/main'
</style>
