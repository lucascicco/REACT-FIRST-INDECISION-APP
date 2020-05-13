import React from 'react';

//COMPONENTS
import AddOption from './addOption'
import Header from './Header'
import Options from './Options'
import Action from  './Action'
import OptionModal from './OptionModal'

//Class dos compenentes semprem precisam ser criadas com letra maiscula na  primeira letra.
//Para criar um componente do react sempre é necessário usar o REACT.COMPONENT como a class PAI, ou seja, extender ela.

export default class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
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
    HandleDeleteOptions = () =>{
        this.setState(() =>  ({ options: [] }))
    }
    HandleDeleteOption = (optionToRemove) =>{
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option  
            })
        }))
    }
    HandleAction = () =>{
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        this.setState(() =>  ({
            selectedOption: option 
        }))
    }
    HandleAddOption = (option) =>{
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat([option])})
        )
        
    }
    HandleClearSelectedOption = () =>{ //não se esqueça das arrows functions!!! 
        this.setState(() => ({selectedOption: undefined}))
    }
    render(){
        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a computer.'
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <Action 
                    hasOptions={this.state.options.length > 0}
                    HandleAction = {this.HandleAction}
                    />
                    <div className="widget">
                        <Options 
                        options={this.state.options}
                        HandleDeleteOption = {this.HandleDeleteOption}
                        HandleDeleteOptions = {this.HandleDeleteOptions}
                        />
                        <AddOption 
                        HandleAddOption={this.HandleAddOption}/>     
                    </div>
                    
                </div>
                
                <OptionModal
                selectedOption={this.state.selectedOption}
                HandleClearSelectedOption={this.HandleClearSelectedOption}/>  
                </div>
        )
    }
}
