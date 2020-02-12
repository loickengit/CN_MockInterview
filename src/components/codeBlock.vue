<template>
  <div>
    <h1>Socket.io is Here</h1>
    <editor id="editor" v-model="content" ref="editor" @init="editorInit" lang="html"
            theme="chrome" width="700" height="100"></editor>
  </div>
</template>

<script>
  export default {
    name: 'coding',
    components: {
      editor: require('vue2-ace-editor'),
    },
    methods: {
      editorInit: function () {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/python')    //language
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/snippets/python') //snippet

      },
    },
    mounted () {
      let editor = this.$refs.editor.editor

      // editor.setValue("the new text here");
      editor.session.setValue("the new text here");
    }
  }

</script>

<style scoped>
  #editor {
    position: relative;
    top: 10%;
    right: 10%;
    bottom: 0;
    left: 0;
  }

</style>
