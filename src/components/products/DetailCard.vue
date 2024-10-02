<template>
    <div>
        <div class="drawer-background" :class="{show: active}" @click="$emit('close-product-drawer')" />
        <div class="drawer" :class="{show: active}">
            <div class="drawer-close" @click="$emit('close-product-drawer')">
                X
            </div>

            <div v-if="product" class="product-details">
                <img class="image" :src="product.image">
                <h3 class="text-center">{{ product.name }}</h3>
                <p class="description">{{ product.description }}</p>
                <h3 class="text-center">{{ product.price }}$</h3>

                <div class="cart-total" >
                    <h3>In Cart</h3>
                    <h4>{{ product_total }}</h4>
                </div>

                <div class="button-container">
                    <button class="remove" @click="removeFromCart" :disabled="isButtonRemoveDisabled">Remove</button>
                    <button class="add" @click="addToCart" :disabled="isButtonAddDisabled"  >Add</button>
                </div>
            </div> 

        </div>
    </div>
    
</template>

<script>
import axios from 'axios'

export default {
    props: ['product', 'active'],
    data() {
        return {
            isButtonAddDisabled: false,
            isButtonRemoveDisabled: false
        }
    },
    methods: {
        addToCart() {
            if (this.isButtonAddDisabled) {
                return;
            }
            this.isButtonAddDisabled = true;

            // setTimeout(() => {
            //     this.isButtonAddDisabled = false;
            // }, 600)

            this.$store.commit('addToCart', this.product)
            
            // tao bien item thoi
            // in axios, xu ly bang cach lay cai items var ra roi items.push them item nho vo
            const data = {
                createdAt: this.product.createdAt,
                name: this.product.name,
                description: this.product.description,
                image: this.product.image,
                price: this.product.price,
                id: this.product.id,
                qty: this.$store.getters.productQuantity(this.product)
            }

            const myApi = `https://652d0ef5f9afa8ef4b26b676.mockapi.io/cart/2`

            axios.get(myApi)
                .then(res => {
                    const { items } = res.data;
                    const existingItemIndex = items.findIndex(item => item.id === data.id);
                    
                    if (existingItemIndex !== -1) {
                        items[existingItemIndex] = { ...data, qty: data.qty };
                    } else {
                        items.push(data);
                    }
                    
                    const subTotal = items.reduce((total, item) => {
                        return total + parseFloat(item.price) * item.qty;
                    }, 0)

                    res.data.subTotal = subTotal;

                    axios.put(myApi, res.data)
                        .then(res => {
                            console.log('Dữ liệu đã được cập nhật thành công', res.data)
                        })
                        .catch(err => {
                            console.error('Lỗi khi cập nhật dữ liệu', err)
                        })

                })
                .catch(err => console.log(err))
                .finally(() => {
                    this.isButtonAddDisabled = false;
                })
        },
        removeFromCart() {
            if (this.isButtonRemoveDisabled) {
                return;
            }
            this.isButtonRemoveDisabled = true;

            this.$store.commit('removeFromCart', this.product)

            const data = {
                createdAt: this.product.createdAt,
                name: this.product.name,
                description: this.product.description,
                image: this.product.image,
                price: this.product.price,
                id: this.product.id,
                qty: this.$store.getters.productQuantity(this.product)
            }

            const myApi = 'https://652d0ef5f9afa8ef4b26b676.mockapi.io/cart/2'

            axios.get(myApi)
                .then(res => {
                    const { items } = res.data;
                    const existingItemIndex = items.findIndex(item => item.id === data.id);
                    
                    if (existingItemIndex !== -1) {
                        items[existingItemIndex].qty -= 1;

                        if (items[existingItemIndex].qty <= 0 ){
                            items.splice(existingItemIndex, 1);
                        }

                        const subTotal = items.reduce((total, item) => {
                            return total + parseFloat(item.price) * item.qty;
                        }, 0)

                        res.data.subTotal = subTotal;

                        axios.put(myApi, res.data)
                            .then(res => {
                                console.log('Dữ liệu đã được cập nhật thành công', res.data)
                            })
                            .catch(err => {
                                console.error('Lỗi khi cập nhật dữ liệu', err)
                            });
                    } else {
                        console.error('Không tìm thấy sản phẩm trong giỏ hàng!');
                    }    
                })
                .catch(err => console.log(err))
                .finally(() => {
                    this.isButtonRemoveDisabled = false;
                })
        }
    }
    ,
    computed: {
        product_total() {
            return this.$store.getters.productQuantity(this.product)
        }
    }
}
</script>

<style lang="scss" >
.drawer-background{
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(124, 124, 124, 0.55);
    z-index: 100;
    display: none;
    transition: display .5s;

    &.show {
        display: block;
    }
}

.drawer {
    width: 95vw;
    height: 100vh;
    background-color: white;
    position: fixed;
    top: 0;
    left: -105vw;
    padding: 15px;
    transition: left .5s;
    z-index: 101;
    border-right: whitesmoke solid 5px;

    &.show {
        left: 0;
    }
}

.drawer-close {
    font-size: 1.5rem;
    padding: 0;
    border-radius: 5px;
    right: 10px;
    border: 2px solid gray;
    color: gray;
    width: 40px;
    float: right;
    cursor: pointer;

    &:hover {
        background-color: lightgray;
    }
}

.product-details {
    display: flex;
    justify-content: center;
    flex-direction: column;

    img.image {
        padding: 0 40px;
        width: 80%;
        margin: 0 auto;
    }

    p.description {
        padding: 20px;
        line-height: 1.5rem;
    }

    .button-container {
        button{
            width: 150px;
            border: none;
            padding: 10px;
            border-radius: 5px;
            margin: 0 5px 50px 5px;
            cursor: pointer;
        }

    }
}

@media (min-width: 500px) {
    .drawer {
        width: 450px;
    }
}
</style>