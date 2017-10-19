/**
 * the inquirer package var inquirer = requirer (' inquirer')
 * current word ( var current word = something )
 * for the questions we use the inquirer.prompt to submit t
*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
var inquirer = require('inquirer');
 
class Word {
    constructor(word, game) {
        this.letters = word.split('')
        this.displayword = Array(word.length).fill('_')
        this.tries = 10
        this.usedLetters = []
        this.wrongLetters = []
    }
    takeGuess(userguess) {
        if (this.usedLetters.includes(userguess)) {
            return
        }
        else {
            this.usedLetters.push(userguess)
            if (this.letters.includes(userguess)) {
                this.addCorrectLetter(userguess)
            } else {
                this.addIncorrectLetter(userguess)
            }
        }
    }
    addCorrectLetter(letter) {
        this.findIndexesOfLetter(this.letters, letter).forEach(function(i) {
            this.displayword[i] = letter
        }.bind(this))
    }
    findIndexesOfLetter(letters, letter) {
        return letters.reduce(function(a, x, i) {
            if (x == letter) {
                a.push(i)
            }
            return a
        }, [])
    }
    addIncorrectLetter(letter) {
        this.tries--
        this.wrongLetters.push(letter)
    }
}

class Game {
    constructor(words) {
        this.words = words
        this.wordIndex = 0
        this.currentWord = {}
        this.wins = 0
        this.losses = 0
    }
    nextWord() {
        if (this.wordIndex > this.words.length - 1) {
            this.endGame()
        } else {
            this.currentWord = new Word(this.words[this.wordIndex])            
            this.wordIndex++        
            this.prompt()
        }
    }
    prompt() {
        inquirer.prompt({
            name: 'letter',
            type: 'input',
            message: 'take a guess!'
        }).then(function(answers) {
            this.currentWord.takeGuess(answers.letter[0])           
            this.checkWord()
        }.bind(this))
    }
    logProgress() {
        console.log(`
            your progress: ${this.currentWord.displayword.join(' ')}
            tries left: ${this.currentWord.tries}
            wrong tries: ${this.currentWord.wrongLetters.join(',')}
        `) 
    }
    checkWord() {
        if (this.currentWord.tries <= 0) {
            this.loseWord()
        }
        else if (this.currentWord.letters.join('') == this.currentWord.displayword.join('')) {
            this.winWord()
        }
        else {
            this.logProgress()
            this.prompt()
        }
    }
    logWinOrLose(bool) {
        if (bool) {
            console.log(`
                !!! Correct !!!
                wins: ${this.wins}
                losses: ${this.losses}
            `)
        }
        else {
            console.log(`
                ): SAD! :(
                wins: ${this.wins}
                losses: ${this.losses}
            `)
        }
    }
    winWord() {
        this.wins++
        this.logWinOrLose(true)        
        this.nextWord()
    }
    loseWord() {
        this.losses++
        this.logWinOrLose(false)        
        this.nextWord()
    }
    endGame() {
        console.log(`
            !!! ${this.wins >= this.losses ? 'WINNER' : 'GAME OVER'} !!!
            wins: ${this.wins}
            losses: ${this.losses}
        `)
    }
}

new Game(['after', 'sinan', 'learns', 'everything', 'takes', 'over', 'planet']).nextWord()





