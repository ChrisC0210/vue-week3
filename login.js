import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
//Base URL: vue3-course-api.hexschool.io/
const url = 'https://vue3-course-api.hexschool.io/v2';
createApp({
  data(){
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      axios.post(`${url}/admin/signin`, this.user).then((response) => {
        const { token, expired } = response.data;
        //add cookie token
        //setting expired time
        document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
        //add header
        axios.defaults.headers.common['Authorization'] = token;
        window.location = 'products.html';
        //console.log(res.data);
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
  },
}).mount('#app');