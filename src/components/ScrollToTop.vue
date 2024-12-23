<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import _ from 'lodash'
const elTop = ref(0)
const isShow = ref(false)
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
const scrolling = () => {
  // 捲軸距離視窗頂部的距離
  const scrolltoTop = window.scrollY

  // 捲軸滾動的距離
  const scrollLength = scrolltoTop - elTop.value

  // 更新: 滾動前,捲軸距離視窗頂部的距離
  elTop.value = scrolltoTop

  // 判斷想要什麼高度讓按鈕出現
  if (scrollLength <= 0 && elTop.value < 300) {
    isShow.value = false
  } else {
    isShow.value = true
  }
}
const debouncedScrolling = _.debounce(scrolling, 120)
onMounted(() => {
  window.addEventListener('scroll', debouncedScrolling)
})
onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScrolling)
  isShow.value = false
})
</script>
<template>
  <Transition name="fade">
    <div
      @click="scrollTop"
      v-if="isShow"
      class="scroll-top-btn d-flex justify-content-center align-items-center cursor-pointer"
    >
      <span class="material-symbols-outlined"> arrow_upward </span>
    </div>
  </Transition>
</template>

<style scoped>
.scroll-top-btn {
  position: fixed;
  border-radius: 50%;
  text-align: center;
  bottom: 20px;
  right: 40px;
  width: 40px;
  height: 40px;
  background-color: #3e7f41;
  color: #fff;
}
</style>
