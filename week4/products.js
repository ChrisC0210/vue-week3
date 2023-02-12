import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
let productModal = null;
let delProductModal = null;
const app = createApp({
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
    getData(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page={page}`;
      axios.get(url)
      .then((res) => {
        const { products, pagination } = res.data;
        this.products = products;
        this.pagination = pagination;
      }).catch((err) => {
        alert(err.res.data.message);
        window.location = '/week4/login.html';
      })
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show()
      }
    },
  }
});

//分頁元件
app.component('pagination' , {
  template: '#pagination',
  props: ['pages'],
  methods: {
    emitPages(item) {
      this.$emit('emit-pages' , item);
    },
  },
});

//產品新增、編輯元件
app.component('productModal' , {
  template: '#productModal',
  props: [ 'product', 'isNew'],
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'chris0000',
    };
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'),{
      keyboard: false,
      backdrop: 'static'
    });
  },
  methods: {
    updateProduct() {
      //new product
      let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let httpMethod = 'post';
      //不是新增商品>>編輯商品API
      if (!this.isNew) {
        api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;
        httpMethod = 'put';
      }

      axios[httpMethod] (api, { data: this.product }).then((res) =>{
        alert(res.data.message);
        this.hideModal();
        this.$emit('update');
      }).catch((err) => {
        alert(err.res.data.message);
      });
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    },
    openModal() {
      productModal.show();
    },
    hideModal() {
      productModal.hide();
    },
  },
})
//產品刪除元件
app.component('delProductModal', {
  template: '#delProductModal',
  props: ['item'],
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'chris0000',
    }
  },
  mounted() {
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'),{
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    delProduct() {
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`)
      .then((res) => {
        this.hideModal();
        this.$emit('update');
      }).catch((err) =>{
        alert(err.response.data.message);
      });
    },
    openModal() {
      delProductModal.show();
    },
    hideModal() {
      delProductModal.hide();
    },
  },
});

app.mount('#app');