<template>
  <div>
    Footer:
    <button @click="handleInc">{{ count }}</button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    handleInc() {
      this.count++;
    },
  },
};
</script>

<style>
</style>