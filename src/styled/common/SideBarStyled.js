import styled from 'styled-components'

export const SideContainer = styled.aside`
  min-height: calc(100vh - 86px);
  padding: 20px 0;
`;

export const SideBarWrapper = styled.div`
  background-color: ${props => props.theme.lightGray};
`;

export const ContentBlock = styled.div`
  padding: 20px 30px 30px;
  border-bottom: 1px solid ${props => props.theme.gray};
  &:last-child{
    border: none;
  }
  .select-styled{
    .css-2o5izw{
      border: 1px solid ${props => props.theme.purple};
      box-shadow: 0 0 5px ${props => props.theme.purple};
    }
    .css-1rtrksz{
      padding: 5px;
    }
  }

  .checkbox-style{
    .rc-checkbox-inner{  
      width: 18px;
      height: 18px;
      &:after{
        left: 6px;
        top: 3px;
      }
    }
    &.rc-checkbox-checked {
      .rc-checkbox-inner{
        border-color: ${props => props.theme.purple};
        background-color: ${props => props.theme.purple};
      }
      
    }
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const CheckboxWrapper = styled.div`
  display: inline-block;
  margin-right: 20px;
  .label-text{
    cursor: pointer;
    margin-left: 5px;
  }
`;