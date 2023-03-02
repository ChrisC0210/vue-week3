import productModal from './productModal.js';

const { defineRule, From, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidate;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path ='chris0000';

Vue.createApp({
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      products: [],
      product: {},
      form: {
        user:{
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
    };
  },
  components: {
    VForm: Form,
    Vfield: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      const url = `${site}/api/${apiPath}/products`;
      axios.get(url).then((res) =>{
        this.products = res.data.products;
      }).catch((err) =>{
        alert(err.res.data.message);
      });
    },
    getProduct(id) {
      const url =  `${site}/api/${apiPath}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      axios.get(url).then((res)=>{
        this.loadingStatus.loadingItem = '';
        this.product = res.data.product;
        this.$refs.ProductModal.openModal();
      }).catch((err) => {
        alert(err.res.data.message);
      });
    },
    addToCart(id, qty = 1) {
      const url = `${site}/api/${apiPath}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$refs.ProductModal.hideModal();
      axios.post(url, { data: cart }).then((res) => {
        alert(res.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.res.data.message);
      });
    },
    updateCart(data) {
      this.loadingStatus.loadingItem = data.id;
      const url = `${site}/api/${apiPath}/cart/${data.id}`;
      const cart = {
        product_id:data.product_id,
        qty: data.qty,
      };
      axios.put(url, { data:cart }).then((res) => {
        alert(res.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.res.data.message);
        this.loadingStatus.loadingItem = '';
      });
    },
    deleteAllCarts() {
      const url = `${site}/api/${apiPath}/carts`;
      axios.delete(url).then((res) =>{
        alert(res.data.message);
        this.getCart();
      }).catch((err) =>{
        alert(err.response.data.message);
      });
    },
    getCart() {
      const url = `${site}/api/${apiPath}/cart`;
      axios.get(url).then((res) => {
        this.cart = res.data.data;
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
    removeCartItem(id) {
      const url = `${site}/api/${apiPath}/cart/${id}`;
      this.loadingStatus.loadingItem = id;
      axios.delete(url).then((res) =>{
        alert(res.data.message);
        this.loadingStatus.loadingItem = '';
        this.getCart();
      }).catch((err) => {
        alert(err.res.data.message);
      });
    },
    createOrder() {
      const url = `${site}/api/${apiPath}/order`;
      const order = this.form;
      axios.post(url, { data:order }).then((res) => {
        alert(res.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.res.data.message);
      });
    },
  },
  mounted() {
    this.getProducts(),
    this.getCart();
  },
})
.component('productModal' , productModal)
.mout('#app');

