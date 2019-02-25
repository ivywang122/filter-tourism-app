import styled, { css } from 'styled-components'

export const PagesnateWrapper = styled.div`
  margin: 40px 0 20px;
  display: flex;
  justify-content: center;
`;

export const PagesBlock = styled.div`
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.purple};
  margin: 0 2px;
  background-color: ${props => props.theme.white};
  border-radius: 3px;
  width: 40px;
  line-height: 40px;
  box-shadow: 0 0 3px rgba(0,0,0,.25);
  transition: .25s;
  &:hover{
    box-shadow: 0 3px 12px rgba(0,0,0,.25);
  }
  &.dots{
    box-shadow: none;
    background-color: transparent;
    cursor: default;
  }
  ${props => props.active ? 'background-color:' + props.theme.purple + ';color:' + props.theme.white : null}
  ${props => {
    if(props.disabled) {
      return css`
        cursor: default;
        color: ${props.theme.gray};
        background-color: ${props.theme.lily};
        &:hover{
          box-shadow: 0 0 3px rgba(0,0,0,.25);
        }
      `;
    }
  }}

`;