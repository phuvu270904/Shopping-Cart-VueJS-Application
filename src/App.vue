<template>
  <div>
    <div id="nav">
      <nav>
        <router-link class="notification" :class="{active: $router.name === 'HomeView'}" to="/">Home</router-link>
        <div>
          <router-link :class="{active: $router.name === 'CheckOutView'}" to="/checkout">History</router-link> |
          <div class="notification">
            <router-link class="cart" :class="{active: $router.name === 'CartView'}" to="/cart">Cart</router-link>
            <span class="badge"> {{ $store.state.count }} </span>
          </div>
        </div> 
        
      </nav>
    </div>
    <router-view/>
  </div>
  
</template>

<script>


export default {
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  background-color: rgb(245, 245, 245);
}

nav {
  display: flex;
  justify-content: space-between;
  margin : 0px 70px;
}

#nav {
  padding: 10px;
  width: 100%;
  height: 50px;
  background-color: whitesmoke;
  line-height: 30px;

  a{
    font-weight: bold;
    color: rgb(210, 201, 201);
    text-decoration: none; 
    margin: 0 5px 0 5px;
    font-size: 1.5rem;

    &.active {
      color: #2c3e50;
    }
  }
}

.text-center {
  text-align: center;
}

.notification {
  background-color: #555;
  color: white;
  text-decoration: none;
  padding: 15px 26px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
}

.notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
}



</style>
