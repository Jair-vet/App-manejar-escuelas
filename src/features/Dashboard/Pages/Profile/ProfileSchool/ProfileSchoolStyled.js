import styled from 'styled-components'

const ProfileSchoolStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 95%;
  font-family: ${props => props.theme.fonts.texts};
  box-sizing: border-box;

  & .profileSchool{
    position: relative;
    bottom: 0;
  }

`

// .footer {
//   position: absolute;
//   /* bottom: -1rem; */
//   display: -webkit-box;
//   display: -webkit-flex;
//   display: -ms-flexbox;
//   display: flex;
//   width: 90%;
//   -webkit-align-self: flex-end;
//   -ms-flex-item-align: end;
//   align-self: flex-end;
//   -webkit-flex-direction: row;
//   -ms-flex-direction: row;
//   flex-direction: row;
//   -webkit-box-pack: end;
//   -webkit-justify-content: flex-end;
//   -ms-flex-pack: end;
//   justify-content: flex-end;
// }
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
  align-items: center;
  width: auto;
  cursor: pointer;

  & span{
    font-size: ${props => props.theme.fonts_sizes.medium_texts};
 
  }
  & .container-photo{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    padding-bottom: 3rem;
    padding-left: 1.5rem;
  }

  & .container-icon{
    width: 1.7rem;
    height: 1.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: -3rem;
    top: 2rem;
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
  }

  & .icon-edit{
    color:white;
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
  // padding-right: 5rem;
  gap: 1.5rem;
`

export default ProfileSchoolStyled
