const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const word = $('.word')
const meaning = $('.meaning')
const submitBtn = $('.submit-button')

const STORAGE_WORD_LIST = JSON.parse(localStorage.getItem('words')) ?? []
var vocabularyList = STORAGE_WORD_LIST

const app = {
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
            console.log(typeof(wordValue));
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

    // Render word list
    render: function() {
        const htmls = vocabularyList.map((voc) => {
            return `<tr class="table-row">
            <td class="word-value">${voc[0]}</td>
            <td class="meaning-value">${voc[1]}</td>
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