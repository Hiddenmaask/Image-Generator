<template >
  <router-view />
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      title: 'Vue.js',
      showFooter: true,
      footerText: 'Copyright (c) 2015-present, Vue.js'
    }
  }
}
</script>

<style>

:root {
  /* CSS HEX */
  --flickr-pink: #f72585ff;
  --byzantine: #b5179eff;
  --purple: #7209b7ff;
  --purple-2: #560badff;
  --trypan-blue: #480ca8ff;
  --trypan-blue-2: #3a0ca3ff;
  --persian-blue: #3f37c9ff;
  --ultramarine-blue: #4361eeff;
  --dodger-blue: #4895efff;
  --vivid-sky-blue: #4cc9f0ff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

html, body, header{
  height: auto;
  /* make background a complicated gradient which slowly shifts through all colours*/
  background-size: 100% 100%;
  background: linear-gradient(to bottom, var(--flickr-pink) 0%, var(--byzantine) 50%, var(--purple) 100%) no-repeat fixed center;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;






}
</style>
