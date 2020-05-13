// JSX - JavaScript XML


const appObject = {
    title: 'This is Change from app.js!',
    subtitle: '',
    options: []
}


const onFormSubmit = (e) =>{
    e.preventDefault()

    const option = e.target.elements.option.value;

    if(option){
        appObject.options.push(option)
        e.target.elements.option.value = '';
        render()
    }
}

const removeAll = () => {
    appObject.options = []
    render()
}

const appRoot = document.getElementById('app')

const onMakeDecision = () =>{
    const randomNum = Math.floor(Math.random() * appObject.options.length)
    const option = appObject.options[randomNum];
    console.log(randomNum)
    alert(option)
};

const render = ()  => {
    const template = (
    <div>
        <h1>{appObject.title}</h1> 
        {appObject.subtitle && <p>{appObject.subtitle}</p>}
        <p>{appObject.options.length > 0 ? 'Here are your options' : 'No options' }</p>
        <button disabled={appObject.options.length === 0} onClick={onMakeDecision}>What I should I do?</button>
        <button onClick={removeAll}>Remove All</button>
        <ol>
           {
               appObject.options.map((option) => {
                    return <li key={option}>{option}</li>
               })
           }

        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="option"/>
            <button>Add Option</button>
        </form>
    </div>
    );
    ReactDOM.render(template, appRoot)
}


render()


/*babel src/playground/RenderREDONE.js --out-file=public/scripts/app.js --presets=env,react --watch*/
/*babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch*/
/*live-server public*/