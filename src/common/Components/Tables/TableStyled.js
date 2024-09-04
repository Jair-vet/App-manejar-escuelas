import styled from 'styled-components'

const Tables = styled.div`
  border: ${(props) => props.theme.container.border};
  font-family: ${(props) => props.theme.fonts.texts};
  font-size: ${(props) => props.theme.fonts_sizes.small_texts};
  display: flex;
  border-radius: 10px;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 15em);
  margin-top: 20px;
  box-shadow: ${(props) => props.theme.container.box_shadow};
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #EBEBEB;
    border-radius: 5px;
    padding: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #13c5a4;
  }

  & .container-tables {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 2rem auto;
    /* z-index:-1; */

    & .id {
      width: 10rem;
    }

    & .action {
      width: 10rem;
    }
  }

  & .header-table {
    height: 1;
    color: ${(props) => props.theme.colors.title_color};
  }

  & .items {
    width: 80vw;
    text-align: left;
    border-bottom: 2px solid ${(props) => props.theme.colors.texts_color};
    padding: 0.5rem 1rem;
  }

  & .container-values {
    color: ${(props) => props.theme.colors.texts_color};
    padding-top: 0.5rem;

    & img {
      width: 1.5rem;
      object-fit: cover;
      padding-right: 0.5rem;
    }
  }

  & .value {
    border-bottom: ${(props) => props.theme.container.border};
    text-align: left;
    padding: 0.5rem 1rem;
    width: 90vw;

    &:nth-child(1) {
      width: 10rem;
    }

    &:nth-child(6) {
      width: 30rem;
    }

    &.actions {
      cursor: pointer;
    }
  }

  & .cell-error{
    
  }
`

export default Tables