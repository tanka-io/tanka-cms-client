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
    mainStyle() {
      return [];
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
.background {
  position: fixed;
  background: url("https://static.pexels.com/photos/259209/pexels-photo-259209.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  top:0;
  left:0;
  z-index: -1;
  overflow: hidden;
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
