<script setup>
defineProps({
  selectedindustry: String,
  industry: String
})
</script>

<template>
  <li>
    <button
      type="button"
      class="btn btn-custom border-0"
      :class="{ active: selectedindustry === industry }"
      @click="$emit('change-industry', industry)"
    >
      {{ industry }}
    </button>
  </li>
</template>
