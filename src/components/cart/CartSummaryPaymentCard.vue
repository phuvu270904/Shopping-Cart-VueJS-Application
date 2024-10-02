<template>
    <div class="cart-item-card">
        <h3>Cart Total: ${{ cart_total }}</h3>
        <button class="view-product-button" @click="checkout">Pay by Credit Card</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['products'],
    methods: {
        checkout() {        
            this.$store.state.count = 0;
            
            const myApi1 = 'https://652d0ef5f9afa8ef4b26b676.mockapi.io/cart/1'
            const myApi2 = 'https://652d0ef5f9afa8ef4b26b676.mockapi.io/cart/2'

            axios.get(myApi1)
                .then(resId1 => {
                    const itemsId1 = resId1.data.items;

                    axios.get(myApi2)
                        .then(resId2 => {
                            const itemsId2 = resId2.data.items;

                            itemsId1.push(...itemsId2);

                            const subTotal = itemsId1.reduce((total, item) => {
                                return total + parseFloat(item.price) * item.qty;
                            }, 0);

                            resId1.data.subTotal = subTotal;

                            axios.put(myApi1, { items: itemsId1 })
                                .then(res => {
                                    console.log('Dữ liệu đã được cập nhật thành công:', res.data)
                                })
                                .catch(error => {
                                    console.error('Lỗi khi cập nhật dữ liệu:', error);
                                });

                            axios.put(myApi2, { items: [] })
                                .then(res => {
                                    console.log('Dữ liệu của ID 2 đã được xóa thành công.', res.data);
                                })
                                .catch(error => {
                                    console.error('Lỗi khi xóa dữ liệu của ID 2:', error);
                                });
                        })
                        .catch(error => {
                            console.error('Lỗi khi lấy dữ liệu của ID 2:', error);
                        });
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu của ID 1:', error);
                });
            this.$store.state.cart = [];
        }
    }
    ,
    computed: {
        cart_total() {
            return this.$store.getters.cartTotal
        }
    }
}
</script>

<style lang="scss">
.view-product-button {
    padding: 10px;
    background-color: rgb(79, 160, 187);
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.15rem;
    border-radius: 5px;
    cursor: pointer;
}
</style>