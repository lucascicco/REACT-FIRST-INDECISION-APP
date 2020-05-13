class Counter extends React.Component{
    constructor(props){
        super(props)
        this.HandleAddOne = this.HandleAddOne.bind(this)
        this.HandleMinusOne = this.HandleMinusOne.bind(this)
        this.HandleReset = this.HandleReset.bind(this)
        this.state = {
            count: 0
        }
    }
    componentDidMount(){
        try{
            const StingCount = localStorage.getItem('count')
            const count = JSON.parse(StingCount, 10)

            if(!isNaN(count)){
                this.setState(() => ({count: count}))
            }

        }catch(e){
            // Do nothing at all
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.count !== this.state.count){
            const json = JSON.stringify(this.state.count)
            localStorage.setItem('count', json);
        }
    }
    HandleAddOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });
    }
    HandleMinusOne(){
        this.setState((prevState) => {
            if(prevState.count === 0){
                return {
                    count: 0
                }
            }else{ 
                return {
                      count: prevState.count - 1
                }
            } 
        })
    }
    HandleReset(){
        this.setState(() => {
            return{
                count: 0
            }
        })
    }
    render(){
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.HandleAddOne}>+1</button>
                <button onClick={this.HandleMinusOne}>-1</button>
                <button onClick={this.HandleReset}>reset</button>
            </div>
        )
    }
}


ReactDOM.render(<Counter />, document.getElementById('app'))