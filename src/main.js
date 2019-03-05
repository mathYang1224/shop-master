import Vue from 'vue'
import App from './App'
import router from './router'

import { Button, Row, Col ,Search , Swipe , SwipeItem , Lazyload, List,Field,NavBar,Tab,Tabs,PullRefresh,Stepper,Tabbar,TabbarItem,Icon,Toast,CellGroup,Cell,Card,Sku,GoodsActionMiniBtn,GoodsActionBigBtn,GoodsAction,SwipeCell} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(Icon).use(Toast).use(Cell).use(CellGroup).use(Card).use(Sku).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(SwipeCell)

//切换页面时自动到顶部
router.afterEach(() => {
  window.scrollTo(0,0);
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
