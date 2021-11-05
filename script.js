const app = Vue.createApp({
    data(){
        return {
            start: false,
            text: '',
            input: '',
            clear: false,
            counter: 0,
            textList: [],
            barStyle: {
                width: 0,
            },
            inputStyle: {
                backgroundColor: 'white'
            },
            getData: []

        }
    },
    created() {
        getJson('https://jsonplaceholder.typicode.com/users').then(data=>{
            console.log(data)
            this.getData = data;
        }).catch(err =>{
            console.log(err)
        })
    },
    methods: {
        correct(){
            this.counter += 1;
            if(this.counter >= this.textList.length){
                this.clear = true;
                this.barStyle = {
                    width: 100 + '%',
                    backgroundColor: 'lightblue',
                }
            }else{
                this.text = this.textList[this.counter].username;
                this.barStyle = {
                    width: 100/ this.textList.length * this.counter + '%'
                }
            }


        },
        startBtn(){
            this.start = true;
            this.$nextTick(function(){
                document.getElementById('inputForm').focus();
            })
            this.textList = this.getData;
            this.text = this.textList[this.counter].username;
        },
        resetBtn(){
            this.start = false;
            this.clear = false;
            this.counter = 0;
            this.barStyle = {
                width: 0
            }
            this.text = this.textList[this.counter].username
        }
    },
    watch: {
        input(){
            console.log(this.input)
            if(this.input.slice(-1) != this.text[this.input.length - 1] && this.input.length - 1 >= 0){
                this.input = this.input.slice(0, -1);
                this.$nextTick(function (){
                    this.inputStyle = {
                        backgroundColor: 'red',
                    }
                })
            }else{
                this.inputStyle = {
                    backgroundColor: 'white',
                }
            }
            if(this.text == this.input){
                this.correct();
                this.input = '';
            }

        }
    }

}).mount('#app')

async function getJson(url){
    const res = await fetch(url)
    const data = res.json();
    return data
}

