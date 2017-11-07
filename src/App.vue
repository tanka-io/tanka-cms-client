<template>
  <div id="app" :style="mainStyle">
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
}
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
main {
  text-align: center;
  margin-top: 48px;
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
