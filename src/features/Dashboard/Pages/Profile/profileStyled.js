import styled from 'styled-components'

const Profile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${props => props.theme.fonts.texts};
  box-sizing: border-box;

  & .container-restore{
    font-size: 12px;
  }

  & .restore-see-password{
    padding-top: 1rem;
    padding-right: 1rem;
  }

`
export const ContainerMain = styled.div`
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: center;
`

export const ContainerProfile = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.container.box_shadow};
  width: 97%;
  height: auto;
  padding:  0.5rem 1rem;
`

export const ContainerUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 19rem;
  cursor: pointer;
  border: .5px dashed ${props => props.theme.colors.texts_color};

  & span{
    font-size: ${props => props.theme.fonts_sizes.medium_texts};
 
  }
  & .container-photo{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    // padding-bottom: 3rem;
    padding-left: 2rem;
  }

  & .container-icon{
    width: 1.7rem;
    height: 1.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: -3rem;
    top: 4.5rem;
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
  }

  & .icon-edit{
    color:white;
    position
  }
  
  & img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

`
export const ContainerHeader = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;

  & .icon-edit-configuration{
    color: ${props => props.theme.colors.primary};
    margin-right: 1rem;
    cursor: pointer;

   & .icon-edit-configuration:hover{
  border-bottom: 1px solid ${props => props.theme.colors.primary} ;
   }
   }
`

export const DataUser = styled.div`
  width: 70%;

  & span{
    font-weight: bold;
    font-size: ${props => props.theme.fonts_sizes.large_text};
    color: ${props => props.theme.colors.title_color};
  }
  
  & p {
    padding: 0px;
  }
  & .container-main-data{
    display: flex;
  }

  & .container-data{
    font-weight: bold;
    width: auto;
    padding: 0.8rem 0;
    width: 100%;
    gap: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    color: ${props => props.theme.colors.title_color};
    font-size: ${props => props.theme.fonts_sizes.extra_small_text};
  }

  & .container-input{
    display: flex;
    gap: 2rem;
    width: 100%;

    & p{
      text-align: left;
    }

    & .item-title{
      width: 13rem;
    }
  }
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`

export const ContainerRestorePassword = styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: start;
justify-content: start;
padding-top: 2rem;
& .row{
  display: flex;
  flex-direction: row;
  justify-content:end;
  margin-left: 20px;
}

& .position{
  position: relative;
  width:100%;
}
& .see-password-recovery{
    position: absolute;
    right:1px;
    top:15px;
    bottom:0px;
    cursor: pointer;
    /* background-color:red; */
}
`
export default Profile
