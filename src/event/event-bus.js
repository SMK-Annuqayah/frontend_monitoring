// event-bus.js
import { createApp } from 'vue';
const app = createApp({});
export const EventBus = app.config.globalProperties.$bus = app;
