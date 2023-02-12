import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'chris0000',
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      isNew: false,
    }
  },
  mounted() {
    //get Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
      .then(() =>{
        this.getData();
      })
      .catch((err) => {
        alert(err.response.data.message)
        window.location = '/week4/login.html';
      })
    },
    
  }


}).mount('#app');