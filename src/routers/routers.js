export const routes = [
    {
      path:'/',
      name: 'Landing',
      component: () => import('../components/LandingPage.vue')
    },
    {
        path:'/operator',
        name: 'Operator',
        component: () => import('../components/OperatorPage.vue')
    },
    {
      path:'/admindetail',
      name: 'AdminDetail',
      component: () => import('../components/AdminDetailPage.vue'),
      beforeEnter(to,from,next){
        if(window.adminLogged){
            next();
        }else{
            next({name: 'Landing'});
        }
      }
    },
    {
        path:'/operatorDetail',
        name: 'OperatorDetailView',
        component: () => import('../components/OperatorDetailPage.vue'),
        beforeEnter(to,from,next){
          console.log(to,from,next)
          if(window.operatorId){
            let userFromLocalStorage = JSON.parse(localStorage.getItem(window.operatorId));
            if(userFromLocalStorage){
              next();
            }else{
              next({name: 'Landing'});
            }
          }
        }
    },
    {
      path:'/adminvehicleentrypage',
      name: 'AdminVehicleEntryPage',
      component: () => import('../components/AdminVehicleEntryListingPage.vue'),
      beforeEnter(to,from,next){
        if(window.adminLogged){
            next();
        }else{
            next({name: 'Landing'});
        }
      }
    }
  ];