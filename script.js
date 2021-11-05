const app = Vue.createApp({
    data(){
        return {
            start: false,
            text: '',
            input: '',
            clear: false,
            counter: 0,
            textList: [
                'apple',
                'banana',
                'orange',
            ],
            barStyle: {
                width: 0,
            }
            
        }
    },
    created() {
        this.text = this.textList[this.counter];
    },
    methods: {
        correct(){
            this.counter += 1;
            this.text = this.textList[this.counter];
            this.barStyle = {
                width: 100/ this.textList.length * this.counter + '%'
            }
            if(this.counter >= this.textList.length){
                this.clear = true;
                this.barStyle = {
                    width: 100 + '%',
                    backgroundColor: 'lightblue', 
                }
            }
            
        }
    },
    watch: {
        input(){
            if(this.text == this.input){
                this.correct();
                this.input = '';
            }
        }
    }

}).mount('#app')