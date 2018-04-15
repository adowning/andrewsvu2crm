<template>
<v-container fill-height justify-center align-center >
  <!-- <v-layout row > -->
    <v-flex v-if="!loggedIn" xs12 sm3>
      <!-- <h1> &nbsp;</h1> -->
      <v-card class="mt-0 pt-0">
          <v-card-title class="blue darken-1">
            <h4 style="color:white">Andrews</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent="login">
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>User ID</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field class="input-group--focused" name="username" v-model="username" label="username" value="Input text"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Password</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field class="input-group--focused" name="password" type="password" v-model="pass" label="password" value="Input text"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn type="submit">login</v-btn>
                <v-snackbar v-if="error" :timeout="timeout" :top="true" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="error">
                  {{ text }}
                  <v-btn class="pink--text" flat @click.native="error = false">Close</v-btn>
                </v-snackbar>
              </form>
        </v-card-text>
         <v-btn  small outline class="grey" to="registerExisting">
           Current employees click here to register
          </v-btn>
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
  </v-container>
</template>
<script>
import auth from '../utils/auth'

export default {
  data () {
    return {
      username: 'ash',
      pass: 'asdfasdf',
      error: false,
      text: '',
      loggedIn: auth.loggedIn()
    }
  },

  methods: {
    login () {
      auth.login(this.username, this.pass, (loggedIn, err) => {
        if (err) {
          console.log('login', err)
          this.error = true
          this.text = err
        } else if (loggedIn === false) {
          console.log('login', loggedIn)
          this.error = true
          this.text = 'Bad login information'
        } else {
          console.log(this.$route)
      auth.loginAmplify(this.username, this.pass, (loggedIn, err) => {
          })
          this.$router.push(this.$route.query.redirect || '/dashboard')
        }
      })
    },
    mounted () {
      // if (this.loggedIn){
      //    this.$router.push('/dashboard')
      // }
    }
  }
}
</script>
<style lang="stylus">
  @import '../stylus/main'
</style>
