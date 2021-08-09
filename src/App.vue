<template>

      <div id="app" class="container-fluid">
       <router-view></router-view>
       <router-view name="second"></router-view>
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

  }
}
</script>

<style>
html{font-size: calc((1vh+1vw)*2)}
#app {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0 auto;
  height:100%;
  background-color: #000;
  background-image: linear-gradient(309deg, #ffffff 0%, #d7e1ec 74%);
  background-clip: padding-box;
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
    padding: 0;
    margin: 0;
    background-color: #ffffff;
    
  }

  html, body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
</style>
