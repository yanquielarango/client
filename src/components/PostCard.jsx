import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

  const PostCard = ({post: { body, username, createdAt, commentCount, id, likeCount, likes}}) => {

    function likePost(){
      console.log(likePost);
    }

    function commentOnPost(){
      console.log(commentOnPost);
    }
  
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='red' basic>
        <Icon name='heart' />
        Like
      </Button>
      <Label basic color='red'  pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentOnPost}>
      <Button color='blue' basic>
        <Icon name='comments' />      
      </Button>
      <Label basic color='blue'  pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
  )
}


export default PostCard;