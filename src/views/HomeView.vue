<template>
  <div>
    <div class="header">
      <h1>Product List</h1>
      <div class="btn">
        <button @click="add">ADD</button>
        <button @click="massDelete">MASS DELETE</button>
      </div>
    </div>
    <div class="card-container" v-if="products.length > 0">
      <div class="card" v-for="item in products" :key="item.id">
        <input 
          type="checkbox" 
          class="delete-checkbox" 
          :value="item.id" 
          v-model="selectedProducts" 
        />
        <p>{{ item.sku }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.price }}$</p>
        <p>{{ item.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      selectedProducts: [], 
    };
  },
  methods: {
    add() {
      this.$router.push('/addproduct');
    },
    async getProduct() {
   try {
      const response = await axios.get("https://c09e-80-77-61-57.ngrok-free.app/display", {
         headers: { 'Accept': 'application/json' } // Force JSON response
      });
      this.products = response.data; // Only assign JSON data
      console.log(this.products); // Verify the structure of the returned data
   } catch (error) {
      console.log(error);
   }
},


    decodeDetails(details) {
      try {
        const parsedDetails = JSON.parse(details);
        return Object.entries(parsedDetails)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      } catch (error) {
        console.error('Error decoding details:', error);
        return 'Invalid details';
      }
    },
    async massDelete() {
      const response = await axios.post('https://c09e-80-77-61-57.ngrok-free.app/massdelete', { idarray: this.selectedProducts });
      console.log(response);
      this.getProduct();
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 10px;
}

.btn {
  display: flex;
  gap: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap; 
}

.card {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 20px;
  border: solid black 1px;
  width: 20%;
  justify-content: center;
  align-items: center;
}

.delete-checkbox {
  margin-top: 5%;
  margin-right: 80%;
}

button {
  cursor: pointer;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
