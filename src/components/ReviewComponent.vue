<script setup>
defineProps({
  reviewContent: {
    type: Array,
    default: () => []
  }
})
// let rating = 1
// const fullStar = Math.floor(rating) // 3
// const halfStar = rating % 1 !== 0 // true
// const nullStar = 5 - fullStar - halfStar
// console.log(nullStar)
</script>
<template>
  <div v-if="reviewContent.length">
    <div class="p-3 mb-3 rounded-5 bg-light h-100">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="fs-5">
          <img class="rounded-circle me-2" src="../assets/Shape.png" alt="avatar" />管理員
        </h3>
        <div>
          <img src="../assets/r-Photoroom.png" alt="mark" />
        </div>
      </div>
      <div class="review pt-2 pb-3" v-for="item in reviewContent" :key="item['品項']">
        <p class="star-null fs-5 d-flex align-items-center mb-1">
          <span class="text-info">{{ item['星級'] }} </span>
          <span
            v-for="index in 5"
            :key="index"
            :class="{
              'material-symbols-outlined fill-symbol text-info': index <= item['星級'],
              'material-symbols-outlined fill-symbol': index > item['星級']
            }"
          >
            star
          </span>
        </p>
        <p class="fs-4 text-primary">{{ item['品項'] }}</p>
        <p>
          {{ item['實際評測'] }}
        </p>
      </div>
    </div>
  </div>

  <div v-else class="d-flex flex-column align-items-center">
    <img class="mb-3" src="../assets/Empty.png" alt="尚無資料" />
  </div>
</template>
<style>
.review {
  border-bottom: 2px solid rgba(205, 205, 205, 0.3);
  &:last-child {
    border-bottom: none;
  }
}
</style>
