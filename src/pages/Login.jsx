import React from 'react';
import { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {  gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from './util/hooks';



const Login = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      username: '',
      password: ''
    });
    
    

    
  
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
      update(_, { data: { login: userData}}){  
        console.log(userData);  
        context.login(userData)    
        props.history.push('/');
      },
      onError(err){     
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: values
    });

    function loginUserCallback(){
      loginUser();
    }

  

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className="page-title">Login</h1>
        <Form.Input
        label="Username"
        placholder="Username..."
        name="username"
        type="text"
        value={values.username}
        error={errors.username ? true : false}
        onChange={onChange}
        />
        
        <Form.Input
        label="Password"
        placholder="Password..."
        name="password"
        type="password"
        value={values.password}
        error={errors.password ? true : false}
        onChange={onChange}
        />
      
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
        <ul className="list">
          {Object.values(errors).map(value => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
      )}
    </div>
  )
};

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
    
  ){
    login(      
        username: $username        
        password: $password       
    ){
      id
      email
      username
      username
      createdAt
      token
    }
  }
`

export default Login;