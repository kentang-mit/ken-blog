<template>
  <div>
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">标签</h3>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="tag in tagList">{{ tag.tagName }}</li>
      </ul>
    </div>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">目录</h3>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="category in categories">{{ category.categoryName }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import tagApi from '../api/tag.js'
import categoryApi from '../api/category.js'
  export default{
    data(){
      return{
        tagList: [],
        categories: []
      }
    },

    created(){
      this.fetchData();
    },

    methods:{
      fetchData(){
        tagApi.getAllTags().then(res => {
          console.log(res)
          if(res.data.success){
            this.tagList = res.data.tagList;
          }
        })
        categoryApi.getAllCategories().then(res => {
          if(res.data.success){
            this.categories = res.data.categoryList;
          }
        })
      },
    }
  }
  </script>