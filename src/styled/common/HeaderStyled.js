import styled from 'styled-components'
import { media } from '../mediaQuery'

export const HeaderColor = styled.header`
  background-color: ${props => props.theme.purple};
  box-sizing: border-box;
  position: fixed;
  z-index: 2000;
  width: 100%;
`;

export const Logo = styled.div`
  font-family: 'Acme', sans-serif;
  font-size: 36px;

  /* mediaQuery: pad */
  ${media.pad`
    padding-left: 0;
    text-align: center;
  `}

  a{
    display: inline-block;
    color: ${props => props.theme.white};
    line-height: 86px;
    &:hover{
      color: ${props => props.theme.white};
    }
    .fa-icon{
      margin-right: 10px;
      font-size: 32px;
      height: 86px;
      vertical-align: bottom;
    }
  }
`;

export const SearchbarContainer = styled.div`
  width: 100%;
  height: 86px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  /* mediaQuery: pad */
  ${media.pad`
    justify-content: center;
    background-color: ${props => props.theme.lily};
    box-shadow: 0 3px 20px -3px ${props => props.theme.gray};
  `}
`;

export const SearchBar = styled.div`
  border-bottom: 1px solid ${props => props.focus? props.theme.white : props.theme.gray};
  color: ${props => props.focus ? props.theme.white : props.theme.gray};
  font-size: 0;
  padding: 5px;
  .fa-icon{
    width: 20px;
    height: 30px;
  }

  input {
    vertical-align: middle;
    font-size: 20px;
    margin-left: 10px;
    width: 300px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    color: ${props => props.theme.white};

    &::-webkit-input-placeholder {
      font-style: italic;
      color: ${props => props.theme.gray};
    }

    &::-moz-placeholder {
      color: ${props => props.theme.gray};
    }

    &:-ms-input-placeholder {
      color: ${props => props.theme.gray};
    }

    &:-moz-placeholder {
        color: ${props => props.theme.gray};
    }
  }

  ${media.desktop`
    border-bottom: 1px solid ${props => props.focus ? props.theme.deepBlack : props.theme.silver};
    color: ${props => props.focus ? props.theme.deepBlack : props.theme.silver};
    input {
      color: ${props => props.theme.deepBlack};
    }
  `}
`