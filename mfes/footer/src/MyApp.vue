<template>
  <div>
    Footer:
    <button @click="handleInc">Inner: {{ count }}</button>
    <button @click="sendGlobalInc">Global: {{ globalCount }}</button>
    <button @click="sendGlobalData">Data: {{ data }}</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { EventBus } from "./EventBus";

const count = ref(0);
const handleInc = () => {
  count.value++;
};

const globalCount = ref(0);
const sendGlobalInc = () => {
  EventBus.emit("globalIncrement");
};

const handleGlobalIncrement = () => {
  globalCount.value++;
};

const data = ref("");
const sendGlobalData = () => {
  EventBus.emit("data", { detail: { value: "From vue footer" } });
};

const handleGlobalData = (event: any) => {
  data.value = event.detail.value;
};

onMounted(() => {
  EventBus.on("globalIncrement", handleGlobalIncrement);
  EventBus.on("data", handleGlobalData);
});

onUnmounted(() => {
  EventBus.off("globalIncrement", handleGlobalIncrement);
  EventBus.off("data", handleGlobalData);
});
</script>

<style>
</style>