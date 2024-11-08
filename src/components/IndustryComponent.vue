<script setup>
defineProps({
  company: Object,
  mutipleTypeArray: Array,
  tag: Array
})
</script>
<template>
  <div class="px-3 py-2 rounded-5 h-100 shadow-sm bg-white">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <a
          :href="company['網址']"
          target="_blank"
          class="fs-6 d-inline-block py-2 me-1"
          @click.stop
          >{{ company['廠商'] }}</a
        ><span v-if="company['評測']" class="badge rounded-pill bg-info fw-normal"> new </span>
      </div>
      <div>
        <i class="bi bi-heart fs-4 link-gray"></i>
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
