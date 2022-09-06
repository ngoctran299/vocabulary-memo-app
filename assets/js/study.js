const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const word = $('.word')
const meaning = $('.meaning')
const submitBtn = $('.submit-button')

const APP_STORAGE_KEY = 'VOCABULARY_APP'

const STORAGE_WORD_LIST = JSON.parse(localStorage.getItem('words')) ?? []
var vocabularyList = STORAGE_WORD_LIST

const app = {
    isHighlight: false,
    config: JSON.parse(localStorage.getItem(APP_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(this.config))
    },
    handleEvents: function() {
        const _this = this
        let wordValue
        let meaningValue

        // Get value
        word.onchange = function(e) {
            wordValue = e.target.value
            return wordValue
        }
        meaning.onchange = function(e) {
            meaningValue = e.target.value
            return meaningValue
        }
        
        // Handle submit button
        submitBtn.onclick = function() {
            const vocabulary = [wordValue, meaningValue]
            if (wordValue.trim() && meaningValue.trim()) {
                vocabularyList.push(vocabulary)
                const wordList = JSON.stringify(vocabularyList)
                localStorage.setItem('words', wordList)
                _this.render()
            } else {
                alert('Vui lòng nhập từ...')
            }
        }
    },

    handleHighlightWord: function(id) {
        this.isHighlight = !this.isHighlight
        let wordItem = $('.table-row-' + id)
        this.setConfig('isHighlight', this.isHighlight)
        wordItem.classList.toggle('highlight', this.isHighlight)
    },

    // Delete word
    handleDeleteWord: function(id) {
        let wordItem = $('.table-row-' + id)
        
        if (wordItem) {
            vocabularyList.splice(id, 1)
            const newWordList = JSON.stringify(vocabularyList)
            localStorage.setItem('words', newWordList)
            wordItem.remove()
        }
    },

    // Render word list
    render: function() {
        const htmls = vocabularyList.map((voc, id) => {
            return `<tr class="table-row-${id}">
            <td class="word-value">${voc[0]}</td>
            <td class="meaning-value">${voc[1]}</td>
            <td class="action-btn">
                <button class="highlight-btn" onclick="app.handleHighlightWord(${id})"><i class="ti-brush-alt"></i></button>
                <button class="delete-btn" onclick="app.handleDeleteWord(${id})"><i class="ti-close"></i></button>
            </td>
        </tr>`
        }
        )
        $('.table-body').innerHTML = htmls.join('')
    },

    start: function () {
        this.handleEvents()
        this.render()
    }
}

app.start()