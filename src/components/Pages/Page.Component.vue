<template>
  <div class="row">
    <div class="col-12 marginBottom" v-if="page[lang] && page[lang].title === 'index'">
      <swiper :options="swiperOption" :height="400">
        <!-- slides -->
        <swiper-slide><img class="img-fluid limit-height" src="http://s3.india.com/wp-content/uploads/2017/01/Budget.jpg"></swiper-slide>
        <swiper-slide><img class="img-fluid limit-height" src="http://lemieuxnoletsyndic.com/wp-content/uploads/2017/05/budgetFederal.jpg"></swiper-slide>
        <swiper-slide><img class="img-fluid limit-height" src="https://fr.irefeurope.org/SITES/fr.irefeurope.org/local/cache-vignettes/L621xH414/arton4550-72fdf.jpg?1508239653"></swiper-slide>/
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>
    <div class="col-12" v-for="b in page.children" :key="b._id">
      <BlockComponent :block="b" :lang="lang" :datas="datas"></BlockComponent>
    </div>
  </div>
</template>

<script>
const BlockComponent = () => import("./Block.vue");
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    page: {
      type: Object,
      required: true
    },
    lang: {
      type: String,
      required: true
    },
    datas: {
      type: Object,
      required: false
    }
  },
  components: {
    BlockComponent,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: 2000,
        direction: "horizontal",
        pagination: ".swiper-pagination",
        paginationClickable: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        scrollbar: ".swiper-scrollbar",
        mousewheelControl: false,
        
      }
    };
  }
};
</script>

<style scoped>
.limit-height{
  height:400px;
}
.marginBottom{
  margin-bottom:48px;
}
</style>
