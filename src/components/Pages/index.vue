<template>
  <div>
    <img :src="img" class="_img">
    <div class="_content">
      <div class="section">
        <h1 class="title">Budget is nuts to be honnest</h1>
        <p class="content">I couln't be happier to be here today thank you for the gift</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    img() {
      // window.location.host
      let s = "http://" + window.location.host + "/api/v1/upload/back.jpeg";
      console.log(s);
      return s;
    }
  }
};
</script>

<style scoped>
._img {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: -1;
}
._content {
  margin-left: 20vw;
  width: 80vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  position: relative;
  background-color: white;
}
@media screen and (max-width: 578px) {
  ._content {
    margin-left: 0vw;
    width: 100vw;
  }
}
</style>
