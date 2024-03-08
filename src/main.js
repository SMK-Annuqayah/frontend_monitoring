import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { EventBus } from './event/event-bus';


const app = createApp(App);

app.config.globalProperties.$bus = EventBus;

app.config.productionTip = false;


app.use(VueSweetalert2);
app.use(router);

// app.use(store);

app.mount('#app');
