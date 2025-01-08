<template>
  <div>
    Footer:
    <button @click="handleInc">Inner: {{ count }}</button>
    <button @click="sendGlobalInc">Global: {{ globalCount }}</button>
    <button @click="sendGlobalData">EventData: {{ data }}</button>
    <button @click="sendBroadcastData">
      BroadcastData: {{ broadcastData }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { EventBus } from "../shared/utils/EventBus";
import { BroadcastEventBus } from "../shared/utils/BroadcastEventBus";

const count = ref(0);
const handleInc = () => {
  count.value++;
};

const globalCount = ref(0);
const sendGlobalInc = () => {
  EventBus.emit("globalIncrement", {
    detail: { value: globalCount.value + 1 },
  });
};

const handleGlobalIncrement = (event: CustomEvent) => {
  globalCount.value = event.detail.value;
};

const data = ref("");
const sendGlobalData = () => {
  EventBus.emit("eventData", {
    detail: {
      value: `From vue footer and his inner count ${count.value}`,
    },
  });
};

const handleGlobalData = (event: any) => {
  data.value = event.detail.value;
};

const broadcastData = ref("");
const sendBroadcastData = () => {
  BroadcastEventBus.emit(
    "broadcastData",
    `From vue footer and his inner count ${count.value}`
  );
};

const handleBroadcastData = (dataFromBroadcast: string) => {
  broadcastData.value = dataFromBroadcast;
};

onMounted(() => {
  EventBus.on("globalIncrement", handleGlobalIncrement);
  EventBus.on("eventData", handleGlobalData);
  BroadcastEventBus.on("broadcastData", handleBroadcastData);
});

onUnmounted(() => {
  EventBus.off("globalIncrement", handleGlobalIncrement);
  EventBus.off("eventData", handleGlobalData);
  BroadcastEventBus.off("broadcastData", handleBroadcastData);
});
</script>

<style>
</style>