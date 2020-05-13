const appRoot = document.getElementById('app')

class Visibility extends React.Component{
    constructor(visibility){
        super(visibility)
        this.HandleToggleVisibility = this.HandleToggleVisibility.bind(this)
        this.state = {
            visibility: false
        }
    }
    HandleToggleVisibility(){
        this.setState((prevState) => {
            return{
                visibility: !prevState.visibility
            }
        })
    }
    render(){
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.HandleToggleVisibility}>
                {this.state.visibility ? 'Hide details' : 'Show details'}</button>
                {
                    this.state.visibility && (
                        <div>
                            <p>Hey. These are some details you can now see!</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

ReactDOM.render(<Visibility />, appRoot)