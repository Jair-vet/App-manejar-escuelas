/* eslint-disable import/no-default-export */
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    body{
        margin:0;
        padding:0;
        font-size:16px;
        box-sizing:border-box;
        
    }
    .mt-1{
        margin-top:1px
    }
    .mt-2{
        margin-top:2px
    }
    .mt-3{
        margin-top:3px
    }
    .mt-4{
        margin-top:4px
    }
    .mt-5{
        margin-top:5px
    }
    span{
        display : inline-block
    }
    
    .boxshadow {
        box-shadow:0 4px 7px 4px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
`

export default GlobalStyles
