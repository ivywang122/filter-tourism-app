import styled from 'styled-components'

export const ResultContainer = styled.div`
  box-sizing:border-box;
  padding: 20px 0;
  min-height: calc(100vh - 86px);
`;

export const ResultText = styled.div`
  font-size: 24px;
  font-weight: 700;
  span{
    color: ${props => props.theme.purple};
  }
`;

export const TagsList = styled.div`
  margin: 20px 0 30px;
`;

export const Tag = styled.div`
  font-size: 16px;
  display: inline-block;
  color: ${props => props.theme.purple};
  padding: 8px 20px;
  margin: 10px 10px 0 0;
  border: 1px solid ${props => props.theme.purple};
  border-radius: 100px;
  transition: .25s;
  span{
    vertical-align: middle; 
  }
  .fa-icon{
    margin-left: 5px;
    font-size: 20px;
    cursor: pointer;
    &:hover{
      color: ${props => props.theme.lightPurple};
    }
  }
`;

export const Block = styled.div`
  cursor: pointer;
  background-color: ${props => props.theme.white};
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(70, 70, 70, .3);
  transition: .25s;
  &:hover{
    box-shadow: 0 8px 38px 3px rgba(70, 70, 70, .3);
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: .5em 0 .8em;
  color: ${props => props.theme.purple};
`;

export const InfoText = styled.p`
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ImageBlock = styled.div`
  /* background-color: lightBlue; */
  background: ${props => props.imgUrl ? 'url(' + props.imgUrl + ') no-repeat 50% 50% / cover' : 'gray'};
  height: 100%;
`;

export const InfoBlock = styled.div`
  padding: 15px;
`;

export const TagsBlock = styled.div`
  font-size: 15px;
  .block{
    margin-top: 8px;
  }
  .open-info, .ticket-info{
    color: ${props => props.theme.silver};
  }
  .location-info, .open-info, .ticket-info{
    margin-right: 20px;
    display: inline-block;
    .fa-icon{
      margin-right: 5px;
    }
    span{
      vertical-align: middle;
    }
  }
  .tags-info{
    display: inline-block;
    .tag-wrapper{
      font-size: 14px;
      display: inline-block;
      padding: 3px 12px;
      background-color: ${props => props.theme.purple};
      color: ${props => props.theme.white};
      border-radius: 100px;
    }
  }
`;