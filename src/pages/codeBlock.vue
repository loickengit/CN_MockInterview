<template>
  <div>
    <h1>Interview you partner</h1>
    <div class="jumbotron text-center">
      <editor id="editor" v-model="content" ref="editor" @init="editorInit" lang="html"
              theme="chrome" width="700" height="600"></editor>
    </div>
  </div>
</template>

<script>
import codingApi from '@/API/CodingAPI'
  export default {
    name: 'coding',
    components: {
      editor: require('vue2-ace-editor'),
    },

    data() {
      return {
        isConnected: false,
        content: ''
      }
    },
    sockets: {
      connect() {
        // Fired when the socket connects.
        this.isConnected = true;
      },

      disconnect() {
        this.isConnected = false;
      },

      // Fired when the server sends something on the "messageChannel" channel.
      messageChannel(data) {
        this.socketMessage = data
      },

      /**
       * editor content changed
       * @param delta, delta.start, delta.end, delta.lines, delta.action
       */
      contentChange(delta) {
        console.log('hei')
      }
    },

    methods: {
      editorInit: function () {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/less')
        require('brace/theme/chrome')

        let editor = this.$refs.editor.editor
        editor.session.setMode("ace/mode/javascript");
        editor.setValue("the new text here")
        editor.setHighlightActiveLine(true)
        let outThis = this
        editor.on('change', function(delta) {
          // delta.start, delta.end, delta.lines, delta.action
          outThis.$socket.emit('contentChange', delta)
        })
      },
    },
    mounted () {

    }
  }

</script>

<style scoped>
  #editor {
    position: relative;
    top: 10%;
    right: 10%;
    bottom: 10%;
    left: 0;
    font-size: 16px
  ;
  }

</style>
