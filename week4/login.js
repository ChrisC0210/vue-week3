import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
//Base URL: vue3-course-api.hexschool.io/
const site = 'https://vue3-course-api.hexschool.io/v2/';
const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      //確認請求是否發送成功
      const url = `${site}admin/signin`;
      axios.post(url, this.user)
        .then((res) => {
          //解構{}
          const { token, expired } = res.data;
          //add cookie token
          //setting expired time
          document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
          window.location = './products.html';
        })
        .catch((err) =>{
        })
    }
  },
});

app.mount('#app');