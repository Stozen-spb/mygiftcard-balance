<template>
  <div class="container-fluid">
      <div id="app">
       <!--  <Header></Header> -->
<!--         <RegisterForm></RegisterForm>
        <LoginForm> </LoginForm>
        <AddCardForm></AddCardForm>
        <CardList></CardList> -->
       <!--  <Footer></Footer> -->
       <router-view></router-view>
       <router-view name="second"></router-view>
      </div>
  </div>

</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function() {
    console.log(22)
    this.$store.dispatch('getUserDataFromFirebaseDatabase')
    //this.$store.dispatch('getCardInfo')
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1000px;
  margin:0 auto;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
body {
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
  }
</style>
