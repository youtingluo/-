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
  elTop.value = window.scrollY

  // 判斷想要什麼高度讓按鈕出現
  if (elTop.value < 200) {
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
