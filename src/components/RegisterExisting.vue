<template>
<v-container fill-height justify-center align-center >
  <!-- <v-layout row > -->
    <template v-if="!humanityEmployee">
    <v-flex xs12 sm3>
      <!-- <h1> &nbsp</h1> -->
      <v-card class="mt-0 pt-0">
          <v-card-title class="blue darken-1">
            <h4 style="color:white">Andrews 1444044</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent="login">
                <v-layout row>
                  <!-- <v-flex xs4>
                    <v-subheader>Humanity ID</v-subheader>
                  </v-flex> -->
                  <v-flex xs8>
                    <v-text-field class="input-group--focused" name="humanityID" v-model="humanityID" label="Humanity ID"></v-text-field>
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
      <!-- <h1> &nbsp</h1> -->
      <v-card class="mt-0 pt-0">
          <v-card-title class="blue darken-1">
            <h4 style="color:white">Vue-CRM</h4>
          </v-card-title>
          <v-card-text>
             You are already logged in
        </v-card-text>
      </v-card>
    </v-flex>
  </template>
  <template v-else>
    <v-layout row wrap justify-center>
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
            type="tel"
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

              <img
      :src="src"
      :style="pickerStyle.img"
      v-on:error="imageError"
    /><br>

              <input
      title="Picture"
      type="file" accept="image/*"
      :style="pickerStyle.input"
      v-on:change="pick"
    >
    </div>
        </v-card-text>
         <v-alert :value="true" type="info">Username: {{newLogin}} Password: Andrews1</v-alert>

        <v-divider class="mt-5"></v-divider>
        <v-card-actions>

          <v-btn flat to="/">Cancel</v-btn>
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
          <v-btn color="primary" flat :disabled="disabled" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    </v-layout>
</template>
  </v-container>
</template>
<script>
import auth from '../utils/auth'
import humanity from '../utils/humanity-api'
const Parse = require('parse')
import { Auth, Storage } from 'aws-amplify'
import AmplifyTheme from '../amplify/AmplifyTheme'
// const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData)
localStorage.clear()
sessionStorage.clear()
const pickerStyle = {
  picker: {
    position: 'relative'
  },
  preview: {
    maxWidth: '100%'
  },
  img: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    fontSize: '1.2em',
    textAlign: 'center'
  },
  input: {
    // width: '100px',
    // height: '100px',
    // display: 'inline-block',
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // opacity: 0,
    // cursor: 'pointer'
  }
}

export default {
  data() {
    return {
      username: 'ash',
      photoUpdated: false,
      formHasErrors: false,
      errorMessages: [],
      pass: 'asdfasdf',
      error: false,
      path: `avatars/' + '${this.userId}'`,
      src: '../assets/img/avatar.png',
      style: this.theme || AmplifyTheme,
      humanityID: '',
      humanityVerfify: false,
      humanityEmployee: null,
      text: '',
      loggedIn: auth.loggedIn(),
      title: 'Preliminary report',
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    disabled: function() {
      if (!this.humanityEmployee.cell_phone) {
        return true
      }

      if (
        this.photoUpdated &&
        this.humanityEmployee.name &&
        this.humanityEmployee.cell_phone.match(/\d/g).length === 10 &&
        this.humanityEmployee.address &&
        this.humanityEmployee.city &&
        this.humanityEmployee.state &&
        this.humanityEmployee.zip
      ) {
        return false
      } else {
        return true
      }
    },

    newLogin: function() {
      if (this.humanityEmployee) {
        return (this.humanityEmployee.firstname.charAt(0) + '.' + this.humanityEmployee.lastname).toLowerCase()
      }
    },
    form() {
      return this.humanityEmployee
    },
    pickerStyle() {
      return Object.assign({}, this.style.picker, pickerStyle)
    },
    userId: function() {
      return state.amplifyUser.userId
    }
  },
  watch: {
    name() {
      this.errorMessages = []
    }
  },

  methods: {
    getPhoto: function() {
      /* eslint-disable */
      Storage.get('avatars/' + this.newLogin).then(url => {
        this.src = url
        console.log(this.src)
        this.photoUpdated = true
      })
    },
    /* eslint-enable */
    pick: function(e) {
      const file = e.target.files[0]
      const { name, size, type } = file
      // console.log(file)
      // console.log('upload photo to ' + this.newLogin)
      Storage.put('avatars/' + this.newLogin, file, { contentType: type })
        .then(data => {
          // console.log(data)
          this.getPhoto()
          this.photoUpdated = true
        })
        .catch(err => console.error(err))
    },
    imageError: function(e) {
      this.src = this.defSrc
    },
    verifyHumanity: function() {
      this.humanity.getData('/employees/' + this.humanityID).then(res => {
        this.humanityEmployee = res.data.data
      })
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false
      var vm = this
      var username = this.newLogin
      var email = username + '@groupandrews.com'
      var phone_number = '+1' + this.humanityEmployee.cell_phone.replace(/[^0-9.]/g, '')
      var password = 'Andrews1'

      // user.signUp(null, {
      //   success: function(user) {
      //     console.log(user)
      //     vm.$router.push('/')
      //   },
      //   error: function(user, error) {
      //     // Show the error message somewhere and let the user try again.
      //     alert('Error: ' + error.code + ' ' + error.message)
      //   }
      // })
      Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number // optional - E.164 number convention
          // other custom attributes
        }
      })
        .then(data => {
          var user = new vm.parse.User()
          user.set('username', username)
          user.set('password', 'Andrews1')
          user.set('email', email)
          user.set('phone', '+1' + phone_number)
          user.set('avatarURL', 'avatars/' + this.newLogin)
          user.signUp(null, {
            success: function(user) {
              console.log(user)
              vm.$router.push('/')
            },
            error: function(user, error) {
              // Show the error message somewhere and let the user try again.
              alert('Error: ' + error.code + ' ' + error.message)
            }
          })
        })
        .catch(error => alert('Error: ' + error.code + ' ' + error.message))
    }
  }
}
</script>
<style lang="stylus">
@import '../stylus/main';
</style>
