<template>
  <div>

  <div class="col-sm-11">
    <h2>编辑</h2>
    <hr>
    <!--<button class="btn btn-primary btn-xs disabled">测试</button><button class="btn btn-danger btn-xs">x</button>-->
    <div class="col-sm-6">
      <label for="title">文章标题:</label>
      <el-input placeholder="文章标题" v-model="articleTitle"></el-input>
    </div>
    <div class="col-sm-6">
      <label for="title">文章分类:</label>
      <el-input placeholder="文章分类" v-model="category"></el-input>
    </div>
    <div class="col-sm-6">
      <label for="tag">增加标签:</label>
      <!--@keyup.enter.native not @keyup.enter!!!-->
      <el-input placeholder="按回车增加标签" v-model="articleTag" @keyup.enter.native="createTag"></el-input>
    </div>
    <div class="col-sm-6">
      <p>&nbsp;</p>
      <p v-if="tagList.length===0">当前没有标签</p>
      <template v-for="tag in tagList"><button class="btn btn-primary btn-xs">{{ tag.tagName }}</button><button class="btn btn-danger btn-xs" @click="deleteCurrentTag(tag._id)">x</button>&nbsp;</template>
    </div>
    <p>&nbsp;</p>
    <textarea id="editor"></textarea>
    <div class="buttons">
    <button @click="saveArticle" class="btn btn-primary">保存</button>
    <button class="btn btn-danger" @click="deleteArticle">删除</button>
  </div>
  </div>
  <div class="col-sm-1"></div>
  

  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import marked from 'marked'
import articleApi from '../api/article.js'
import css from 'simplemde/dist/simplemde.min.css'
import{
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

let simplemde;
export default{
  name: 'editor',
  data(){
    return{
      articleId: -1,
      articleTag: '',
      tagList: [],//only belong to current article
      articleTitle: '',
      articleContent: '',
      currentArticle: {},
      category: '',
    }
  },
  created(){
    //this.fetchData();
  },
  mounted: function () {
    //解决了在mounted执行时data异步没取到的问题
    this.fetchData().then(()=>{
      simplemde = new SimpleMDE({
      autoDownloadFontAwesome: false,
      element: document.getElementById("editor"),
      spellChecker: false,
      tabSize: 4,
      previewRender: function(plainText) {
        return marked(plainText); // Returns HTML from a custom parser
      },
      });
      simplemde.value(this.articleContent)
      simplemde.codemirror.on("change", () => {
        let value = simplemde.value();
        if(this.articleContent === value){
          return;
        }
        this.articleContent = value;
      })
    });
    
  },
  methods: {
    fetchData(){
      //return a promise, used in mounted
      return articleApi.getArticle(this.$route.params.id).then(res => {
        if(res.data.success){
          if(res.data.article == null){
            this.articleTitle = '404 Not found';
          } else{
            this.articleTitle = res.data.article.title;
          }
          this.currentArticle = res.data.article;
          this.articleId = res.data.article._id;
          this.articleContent = res.data.article.content;
          this.tagList = res.data.article.tagList;
          this.category = res.data.article.category;
          //currentTagList should be modified!
          this.$store.state.currentTagList = this.tagList;
        }
        return new Promise((resolve, reject) => {
          resolve(res);
        });
      })
    },
    saveArticle(){
      if(this.category){
        this.$store.dispatch('createCategory', this.category).then(res => this.saveArticleComp());
      }
    },
    saveArticleComp(){
      let abstract_end_pos = this.articleContent.indexOf('<!--more-->');
      if(abstract_end_pos === -1){
        this.$alert('不能没有摘要');
        return;
      }
      let abstract = this.articleContent.slice(0, abstract_end_pos);
      const info = {
        title: this.articleTitle,
        content: this.articleContent,
        tagList: this.tagList,
        category: this.category,
        abstract: abstract,
        lastModified: new Date().toLocaleString()
      }
      const obj = {
        id: this.articleId,
        article: info
      }
      this.$store.dispatch('modifyArticle', obj).then(res => {
        if(res.data.success){
          this.$router.push('/')
        }
      }).catch(err => {
        this.$alert(err.response.data.err);
      })
    },
    deleteArticle(){
      this.$store.dispatch('deleteArticle', this.articleId).then(res => {
        if(res.data.success){
          this.$router.push('/')
        }
      })
    },
    test(){
      this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定'});
    },
    createTag(){
      if(this.tagList.find(p => p.tagName === this.articleTag)){
        this.$alert('标签已经存在', '错误', {
          confirmButtonText: '确定'});
      }else if(this.tagList.length >= 5){
         this.$alert('标签数过多', '错误', {
          confirmButtonText: '确定'});
      }else{
        this.$store.dispatch('createTag', this.articleTag).then(res =>{
          this.tagList = this.$store.state.currentTagList;
        })
      }
    },
    deleteCurrentTag(id){
      this.$store.dispatch('deleteCurrentTag', id).catch(err => {
        this.$alert('删除异常', '错误', {
          confirmButtonText: '确定'});
      })
    }
  },
  watch:{
    currentArticle(val, oldVal){
      this.articleContent = val.content;
    }
  }
}
</script>
<style lang="stylus">
@import '../stylus/_settings.styl'
.editor-box 
    position relative
    padding 15px
    input
      padding 7px
      width 350px
    &__title
      font-size 25px
      padding 10px
    &__input-box
      font-size 17px
      margin 15px 0   
</style>