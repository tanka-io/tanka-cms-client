<template>
  <div id="app" :style="mainStyle">
    <div class="background"></div>
    <header>
      <MenuComponent></MenuComponent>
    </header>
    <main>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
const MenuComponent = () => import("@/components/Shared/Menu.Component.vue");
export default {
  name: "app",
  components: {
    MenuComponent
  },
  created() {
    this.$store.dispatch("setLang", this.$route.query.lang);
    this.$store.dispatch("getConfig");
    this.$store.dispatch("getTheme");
  },
  computed: {
    config() {
      return this.$store.getters.getConfig;
    },
    mainStyle(){
      return [
      ]
    }
  }
};
</script>

<style>
html,
body {
  overflow-x: hidden;
  margin: 0;
} 
.background{
  position: fixed;
  width:100vw;
  height:100vw;
  background: url('https://images.techhive.com/images/article/2015/10/mac-macbook-100620597-orig.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.5;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
main {
  text-align: center;
  background:rgba(255, 255, 255,1);
  min-height:100vh;
  padding-top:40px;
}

.slide-fade-enter-active {
  transition-delay: 0.15s;
  transition-duration: 0.15s;
}

.slide-fade-leave-active {
  transition-duration: 0.15s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}

</style>
