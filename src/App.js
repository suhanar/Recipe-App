import React,{useState} from 'react'
import './App.css'
import Axios from 'axios'
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';
import Alert from './components/Alert';




const App = () => {
    const[query,setQuery] = useState('');
    const[recipes,setRecipes] = useState([])
    const[alert,setAlert] = useState('')
    const APP_ID="APP_ID";
    const APP_KEY="APP_KEY";


    const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

    const getUrl = async()=>{
        if(query!==''){
            const res = await Axios.get(url);
            if(!res.data.more){
                setAlert('No such food')
            }
            else{
                setAlert('')
            }
            setRecipes(res.data.hits)

            console.log(res)
            setQuery('')

        }
        else{
            setAlert('Please Fill the Form')
        }

    }
    const onSubmit = (e)=>{
        e.preventDefault()
        getUrl()
    }
    const onChange = (e) => {
        //console.log(e.target.value);
        setQuery(e.target.value)
    }
    return (
        <div className='App'>


            <h1>Welcome to Food app</h1>






            <form className="search-form" onSubmit={onSubmit}>
              {alert !== '' && <Alert alert={alert} />}
              <input type="text" placeholder="search" autoComplete="off" onChange={onChange}/>

              <input type="submit" value="search" />


            </form>
            <div className="recipes">
                {recipes !== [] && recipes.map(recipe=>
                    <Recipe key={uuidv4()} recipe = {recipe}/>
                )}

            </div>
        </div>
    )
}

export default App
