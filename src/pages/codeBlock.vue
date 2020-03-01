<template>
  <div>
    <div class="row block">
      <editor id="editor" v-model="content" ref="editor" @init="editorInit" width="1000" height="600"></editor>
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
        content: '',
        question: {
          title: '最短单词距离',
          description: '给定一个单词列表和两个单词 word1 和 word2，返回列表中这两个单词之间的最短距离。\n',
          example: '示例 words = [\"practice\", \"makes\", \"perfect\", \"coding\", \"makes\"]\n' +
            '输入: word1 = \"coding\", word2 = \"practice\" \n输出: 3'
        }
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

      /**
       * editor content changed
       * @param delta, delta.start, delta.end, delta.lines, delta.action
       */
      updateContent(delta) {
        let editor = this.$refs.editor.editor
        let lines = delta.lines
        let range = {start: delta.start, end: delta.end}

        if (delta.action === 'insert') {
          let text = lines.join('\n')
          editor.session.replace(range, text)
        } else if(delta.action === 'remove') {
          editor.session.replace(range, '')
        }
      }
    },

    methods: {
      sendText: function() {
        let editor = this.$refs.editor.editor
        let range = {start: {}, end: {}}
        range.start.row = 0
        range.start.column = 0
        range.end.row = Number.MAX_VALUE
        range.end.column = Number.MAX_VALUE
        editor.session.replace(range, "x" + editor.session.getLine(range.start.row) + "x")
      },
      editorInit: function () {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/theme/dawn')


        let editor = this.$refs.editor.editor
        editor.setOptions({theme: "ace/theme/monokai",
          mode: "ace/mode/html",
          wrap: true,
          autoScrollEditorIntoView: true,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true
        })
        // editor.session.setMode("ace/mode/javascript");
        // editor.setTheme("ace/theme/tomorrow");
        let text = this.question.title + '\n' + this.question.description
          + '\n' + this.question.example
        editor.setValue(text)
        // editor.setHighlightActiveLine(true)
        let outThis = this
        editor.on('change', function(delta) {
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
    margin-left: 10%;
    bottom: 10%;
    font-size: 16px;
  }

  #question{
    text-align: left;
    /*margin-left: 10%;*/
  }

  .block{
    margin-left: 2%;
  }

  .code {
    box-sizing: border-box;
    color: #263238;
    line-height: 1.6;
    background: azure;
  }

</style>

