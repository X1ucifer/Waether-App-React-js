import React, { useState } from 'react'
import Glogo from "./glogo.png"
import "./input.css"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios"
import Output from "./output"
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Inputer() {

    const classes = useStyles();

    const [input, setInput] = useState();
    const [temp, setTemp] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [icon, setIcon] = useState();
    const [loader, setLoader] = useState(true);

    const handleChange = (e) => {
        console.log(e.target.value)
        setInput(e.target.value)
    }

    const findWeather = async () => {
        setLoader(true)
        const apikey = "dc4a03d665fd7672f6bcc73cea15bb65"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apikey}`

        const data = await axios.get(url)
        console.log(data)
        const image = `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`
        setTemp(data.data.main.temp)
        setDescription(data.data.weather[0].description)
        setIcon(image)
        setName(data.data.name)
        setInput("")
        setTimeout(
            () => setLoader(false), 
            3000
          );
       

    }

    const handleClick = (e) => {

        e.preventDefault();
        findWeather();
    }

    return (
        <>
            {temp == null ?
                <div className='main'>

                    <div className='container'>
                        <h1>Google Weather App</h1>
                        <p>Powered By</p>
                        <img className='img' src={Glogo}></img>

                        <form className={classes.root} autoComplete="off">
                            <TextField id="standard-basic" label="Enter the Location" onChange={handleChange} />
                            <br />
                            <Button variant="contained" color="primary" style={{ marginTop: "10px", marginBottom: "20px" }} type="submit" onClick={handleClick}>
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
                :
                <>


                    <Output temp={temp} name={name} icon={icon} description={description} setTemp={setTemp} loader={loader}/>


                </>
            }
        </>
    )
}

export default Inputer