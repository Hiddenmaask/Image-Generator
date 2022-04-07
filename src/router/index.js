import { createWebHistory, createRouter } from "vue-router"
import HomeView from "@/views/HomeView";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router