import React from 'react';
import preloader from '../../../assets/images/preloader.png';

let Preloader=(props)=>{
    return <div style={{weihgt: '100px', backgrounColor : 'white'}}>
            <img src={preloader}/>
        </div>         
   }


export default Preloader