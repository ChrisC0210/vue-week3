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
    // login() {
    //   axios.post(`${url}/admin/signin`, this.user).then((response) => {
    //     const { token, expired } = response.data;
    //     //add cookie token
    //     //setting expired time
    //     document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
    //     //add header
    //     axios.defaults.headers.common['Authorization'] = token;
    //     window.location = 'products.html';
    //     //console.log(res.data);
    //   }).catch((err) => {
    //     alert(err.response.data.message);
    //   });
    // },
    login() {
      //確認請求是否發送成功
      console.log(this.user);
      const url = `${site}admin/signin`;
      axios.post(url, this.user)
        .then((res) => {
          //解構{}
          const { token, expired } = res.data;
          //console.log(token, expired);
          //add cookie token
          //setting expired time
          document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/`;
          window.location = '/week3/products.html';
        })
        .catch((err) =>{
          console.log(err);
        })
    }
  },

  //一開始確保程式碼可以運作才加的
  mounted() {
    console.log('mounted');
    console.log(`${site}admin/signin`);
  },
});

app.mount('#app');