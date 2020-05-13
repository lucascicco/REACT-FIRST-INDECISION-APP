import React from 'react';

export default class AddOption extends React.Component{
    state = {
        error: undefined
    };  
    HandleAddOption = (e) => {
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
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
               <form className="add-option" onSubmit={this.HandleAddOption}>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add Option</button>
               </form>
            </div>
        )
    }
}



