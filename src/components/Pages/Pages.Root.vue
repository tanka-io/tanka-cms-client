<template>
  <div class="container">
    <transition name="slide-fade" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
  
  }
</script>

<style>
</style>
