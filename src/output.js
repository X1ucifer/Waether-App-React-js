import React from 'react'
import "./output.css"
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';


function Output({ temp, icon, name, description, setTemp, loader }) {
    return (
        <div className='output_main'>

            {loader ?

                <Skeleton style={{ width: "40%", height: "50vh", borderRadius: "20px" }} variant="rect" />

                :

                <div className='output_container'>

                    <h1>{name}</h1>
                    <p>Temperature : {temp}</p>
                    <img src={icon}></img>
                    <h4>{description}</h4>
                    <Button variant="contained" style={{ marginTop: "10px", marginBottom: "20px" }} onClick={() => setTemp(null)}>
                        Back
                    </Button>
                </div>

            }
        </div>
    )
}

export default Output