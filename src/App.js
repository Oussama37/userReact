import React, { Component } from 'react';
import axios from 'axios'
import {Table,Button,Label,Input,FormGroup,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';

class  App extends Component {
  state = {
    valid:false,
    users:[] ,
    NewUserData:{
      FirstName :'',
      LastName:'',
      Email:'',
      Password:'' 
    },
   
    EditUserData:{
      id:'',
      FirstName :'',
      LastName:'',
      Email:'',
      Password:'' 
    },
    NewUserModal:false,
    EditUserData:false,
    
  }
  componentWillMount(){
   this._refreshUsers(); 

  } 
  toggleNewUserModal(){
    this.setState({
      NewUserModal:! this.state.NewUserModal
    })
  }
  
  toggleEditUserModal(){
    this.setState({
      EditUserModal:! this.state.EditUserModal
    })
  }
 addUser(){
    axios.post('http://localhost:1937/users',this.state.NewUserData).then(res =>{
      let{users}=this.state;
      users.push(res.data);

      this.setState({users , NewUserModal:false,NewUserData:{
        FirstName :'',
        LastName:'',
        Email:'',
        Password:''  
      },
    });
      
      
    })
    

  }
  updateUser(){
    let {FirstName,LastName,Email,Password} = this.state.EditUserData;

    axios.put('http://localhost:1937/users/' + this.state.EditUserData._id,{
      FirstName,LastName,Email,Password
    }).then((res) =>{
        this._refreshUsers();  
        
        this.setState({
          EditUserModal : false,EditUserData:{FirstName :'',
          LastName:'',
          Email:'',
          Password:''}
        })
      });
  }
  
  EditUserData(_id,FirstName,LastName,Email,Password){
    this.setState({
      EditUserData:{_id,FirstName,LastName,Email,Password },EditUserModal:! this.state.EditUserModal
    });
      console.log(FirstName,LastName,Email,Password)
  }

  DeleteUser(_id){
    if(window.confirm('Tap OK  if You want to Delete it ! ')){
      axios.delete('http://localhost:1937/users/'+_id)
      .then((res)=>{
        this._refreshUsers();
      });
    }
    
  }
  _refreshUsers(){
    axios.get('http://localhost:1937/users').then((res)=>{
       
       this.setState({
         users:res.data
       }) 
     });
  }
  render(){
    
    let users = this.state.users.map((user)=>{
      return(
        <tr key={user._id}>
            <td>{user.FirstName}</td>
            <td>{user.LastName}</td>
            <td>{user.Email}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.EditUserData.bind(this,user._id,user.FirstName,user.LastName,user.Email,user.Password)}>Edit</Button>
              <Button color="danger" size="sm" onClick ={this.DeleteUser.bind(this,user._id)} >Delete</Button>
            </td>
        </tr>
      )
    });
    return (
    <div className="App comtainer">
      <h1>Users Manage</h1>
      <Button  className="my-4" color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add a New User</Button>
      <Modal isOpen={this.state.NewUserModal} toggle={this.toggleNewUserModal.bind(this)} >
        <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add a User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="FirstName">FirstName</Label>
            <Input type="text" name="FirstName" id="FirstName" placeholder="User's FirstName" value={this.state.NewUserData.FirstName} onChange={(e)=>{
              let {NewUserData}=this.state;
              NewUserData.FirstName=e.target.value;
              this.setState({NewUserData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="LastName" style={{color:"red"}}>LastName</Label>
            <Input type="text" name="LastName" id="LastName" placeholder="User's LastName" value={this.state.NewUserData.LastName} onChange={(e)=>{
              let {NewUserData}=this.state;
              NewUserData.LastName=e.target.value;
              this.setState({NewUserData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="text" name="Email" id="Email" placeholder="User's Email" value={this.state.NewUserData.Email} onChange={(e)=>{
              let {NewUserData}=this.state;
              NewUserData.Email=e.target.value;
              this.setState({NewUserData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="password" name="Password" id="Password" placeholder="User's Password" value={this.state.NewUserData.Password} onChange={(e)=>{
              let {NewUserData}=this.state;
              NewUserData.Password=e.target.value;
              this.setState({NewUserData})
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addUser.bind(this)}>Add</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
            
      <Modal isOpen={this.state.EditUserModal} toggle={this.toggleEditUserModal.bind(this)} >
        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="FirstName">FirstName</Label>
            <Input type="text" name="FirstName" id="FirstName" placeholder="User's FirstName" value={this.state.EditUserData.FirstName} onChange={(e)=>{
              let {EditUserData}=this.state;
              EditUserData.FirstName=e.target.value;
              this.setState({EditUserData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="LastName">LastName</Label>
            <Input type="LastName" name="LastName" id="LastName" placeholder="User's LastName" value={this.state.EditUserData.LastName} onChange={(e)=>{
              let {EditUserData}=this.state;
              EditUserData.LastName=e.target.value;
              this.setState({EditUserData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="text" name="Email" id="Email" placeholder="User's Email" value={this.state.EditUserData.Email} onChange={(e)=>{
              let {EditUserData}=this.state;
              EditUserData.Email=e.target.value;
              this.setState({EditUserData})
            }} />
          </FormGroup>

          <FormGroup>
            <Label for="Password">Password</Label>
            <Input type="text" name="Password" id="Password" placeholder="User's Password" value={this.state.EditUserData.Password} onChange={(e)=>{
              let {EditUserData}=this.state;
              EditUserData.Password=e.target.value;
              this.setState({EditUserData})
            }}/>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateUser.bind(this)}>Add</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>FirstName </th>
            <th>LastName</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>      
          {users}
        </tbody>
      </Table>
    </div>
    
  );
  
}}

export default App;
