<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData">请求数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    getData() {
      // this.$http
      //   .get('http://localhost:3000?name=lisi&age=23')
      //   .then((response) => {
      //     console.log(response.data)
      //   })

      // this.$http
      //   .post('http://localhost:3000', {
      //     name: 'lisi',
      //     age: 23
      //   })
      //   .then((response) => {
      //     console.log(response.data)
      //   })

      this.axios({
        method: 'post',
        url: 'http://localhost:3000',
        data: {
          name: 'lisi',
          age: 23
        }/* ,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        } */
      }).then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
