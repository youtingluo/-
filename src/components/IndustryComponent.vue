<script setup>
defineProps({
  company: Object,
  mutipleTypeArray: Array,
  tag: Array
})
</script>
<template>
  <div class="industry-card px-3 py-2 rounded-5 h-100 bg-white">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span class="text-gray">{{ company['廠商'] }}</span>
        <span v-if="company['評測']" class="badge rounded-pill bg-info fw-normal ms-1"> new </span>
      </div>
      <div>
        <a :href="company['網址']" target="_blank" class="link-gray d-inline-block"
          ><span class="material-symbols-outlined p-2"> language </span></a
        >
        <div class="d-inline-block">
          <span class="material-symbols-outlined link-gray p-2"> favorite </span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap">
      <template v-for="value in Object.keys(company)" :key="value">
        <div v-if="!tag.includes(value)">
          <span
            class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"
            :class="[
              { 'bg-warning': mutipleTypeArray.includes(value) },
              { 'text-dark': mutipleTypeArray.includes(value) }
            ]"
          >
            {{ value }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.industry-card {
  transition: 0.3s ease;
  &:hover {
    box-shadow: 0 0.225rem 0.225rem #00000013;
  }
}
</style>
