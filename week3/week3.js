import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
//Base URL: vue3-course-api.hexschool.io/
const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path ='chris0000'
const app = createApp({
  data() {
    return {
      products: [],
    }
  },
  methods: {
    checkLogin() {
      console.log(`${site}api/user/check`);
      const url = `${site}api/user/check`;
      axios.post(url, this.user)
      .then((res) => {
        console.log(res);
      })
      .catch(() =>{
        window.location = '/week3/login.html';
      })
    },
    getProduct() {
      console.log(`${site}api/${api_path}/admin/products/all`)
      axios.get(url)
      .then(res => {
        console.log(res);
        this.products = res.data.products;
      })
    }
  },

  //一開始確保程式碼可以運作才加的
  mounted() {
    const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];
    console.log(cookieValue);
    //axios header(只在登入頁面確認)
    axios.defaults.headers.common['Authorization'] = cookieValue;
    this.checkLogin();
  },
});

app.mount('#app');