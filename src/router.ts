import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('src/views/Home.vue'),
    },
    {
      path: '/hotel/:id?',
      name: 'Hotel',
      component: () => import('src/views/Hotel.vue'),
      props: true,
    },
    {
      path: '/reservation/:bookingData?',
      name: 'Reservation',
      component: () => import('src/views/Reservation.vue'),
      props: (route) => {
        if (!route.params.bookingData) {
          return {};
        }

        return {
          bookingData: JSON.parse(route.params.bookingData as string),
        };
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Home' },
    },
  ],
});

export default router;
