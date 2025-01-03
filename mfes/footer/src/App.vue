<template>
  <div>
    Footer:
    <button @click="handleInc">Inner: {{ count }}</button>
    <button @click="handleGlobalInc">Global: {{ globalCount }}</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { EventBus } from "./EventBus";

const count = ref(0);
const globalCount = ref(0);

const handleInc = () => {
  count.value++;
};

const handleGlobalInc = () => {
  EventBus.emit("globalIncrement");
};

const handleGlobalIncrement = () => {
  globalCount.value++;
};

onMounted(() => {
  EventBus.on("globalIncrement", handleGlobalIncrement);
});
</script>

<style>
</style>