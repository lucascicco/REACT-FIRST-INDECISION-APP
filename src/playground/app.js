//Class dos compenentes semprem precisam ser criadas com letra maiscula na  primeira letra.
//Para criar um componente do react sempre é necessário usar o REACT.COMPONENT como a class PAI, ou seja, extender ela.

class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
        this.HandleDeleteOptions = this.HandleDeleteOptions.bind(this)
        this.HandleAction = this.HandleAction.bind(this)
        this.HandleAddOption = this.HandleAddOption.bind(this)
        this.HandleDeleteOption = this.HandleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options')
            const options = JSON.parse(json);

            if(options){
                this.setState(() => ({options: options}))
            }
        }catch(e){
            // Do nothing at all

        }
        

    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount(){
        console.log('componentDidUnmount!')
    }
    HandleDeleteOptions(){
        this.setState(() =>  ({ options: [] }))
    }
    HandleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option  
            })
        }))
    }
    HandleAction(){
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        alert(option)
    }
    HandleAddOption(option){
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat([option])})
        )
        
    }
    render(){
        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a computer.'
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action 
                hasOptions={this.state.options.length > 0}
                HandleAction = {this.HandleAction}
                />
                <Options 
                options={this.state.options}
                HandleDeleteOption = {this.HandleDeleteOption}
                HandleDeleteOptions = {this.HandleDeleteOptions}
                />
                <AddOption 
                HandleAddOption={this.HandleAddOption}/>
            </div>
        )
    }
}


const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )
}


Header.defaultProps = {
    title: 'Some deafult'
}

const Action = (props) => { 
        return(
            <div>
                <button 
                onClick={props.HandleAction}
                disabled={!props.hasOptions}>
                What should I do?
                </button>
            </div>
        )
}

const Options = (props) =>{
    return(
        <div>
            <button onClick={props.HandleDeleteOptions}>Remove all</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => 
                (<Option 
                key={option} 
                optionText={option}
                HandleDeleteOption={props.HandleDeleteOption}
                />))
                
                
            }
            
        </div>
        
    )
}

const Option = (props) => {
    return(
        <div>
            {props.optionText}
            <button 
            onClick={(e) =>  {
                props.HandleDeleteOption(props.optionText)
            }}
            >          
            Remove
            </button>
        </div>
    )
}


class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.HandleAddOption = this.HandleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    HandleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim()
        const error = this.props.HandleAddOption(option)
        
        this.setState(() => ({error}))
       
        if(!error){
            e.target.elements.option.value = '';
        }
    }
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
               <form onSubmit={this.HandleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
               </form>
            </div>
        )
    }
}

// const User = (props) => {
//     return(
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     )  
// };

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))