<script setup>
defineProps({
  company: Object,
  mutipleTypeArray: Array,
  tag: Array
})
defineEmits(['goCompany'])
</script>
<template>
  <a href="#" class="text-decoration-none" @click.prevent="$emit('goCompany', company['編號'])">
    <div class="industry-card px-3 py-2 rounded-5 h-100 bg-white">
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <span class="text-gray">{{ company['廠商'] }}</span>

          <span v-if="company['評測']" class="badge rounded-pill bg-info fw-normal ms-1">
            new
          </span>
        </div>
        <div class="d-flex align-items-center">
          <!-- <a @click.stop :href="company['網址']" target="_blank" class="link-gray d-inline-block"
            ><span class="material-symbols-outlined p-2"> language </span></a
          > -->
          <a
            @click.stop
            :href="company['網址']"
            target="_blank"
            class="link link-primary d-inline-block text-decoration-none py-2"
            ><span class="link-primary">
              Go
              <span class="material-symbols-outlined d-inline-block align-middle fs-5">
                open_in_new
              </span>
            </span></a
          >
          <div>
            <span class="material-symbols-outlined link-gray p-2"> favorite </span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap py-2">
        <template v-for="value in Object.keys(company)" :key="value">
          <div v-if="!tag.includes(value)">
            <span
              class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"
              :class="[{ 'bg-warning': mutipleTypeArray.includes(value) }]"
            >
              {{ value }}
            </span>
          </div>
        </template>
      </div>
    </div></a
  >
</template>

<style>
.industry-card {
  transition: 0.3s ease;
  &:hover {
    box-shadow: 0 0.225rem 0.225rem #00000013;
  }
}
.link {
  display: inline-block;
  padding: 5px;
  text-align: center;
  transition: 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
}
</style>
