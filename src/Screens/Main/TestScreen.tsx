import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function TestScreen() {
  const [users, setUsers] = useState([]);

  // Create a new user
  const createUser = async () => {
    await firestore()
      .collection('users')
      .add({
        name: 'John Doe',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  // Read all users
  const readUsers = async () => {
    const querySnapshot = await firestore().collection('users').get();
    const usersData = querySnapshot.docs.map(documentSnapshot => ({
      id: documentSnapshot.id,
      ...documentSnapshot.data(),
    }));
    setUsers(usersData);
  };

  // Update a user
  const updateUser = async userId => {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        age: 45,
      })
      .then(() => {
        console.log('User updated!');
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  // Delete a user
  const deleteUser = async userId => {
    await firestore()
      .collection('users')
      .doc(userId)
      .delete()
      .then(() => {
        console.log('User deleted!');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <View>
      <Text style={{color: 'red'}}>TestScreen</Text>
      <Button title="Create User" onPress={createUser} />
      <Button title="Read Users" onPress={readUsers} />
      <Button title="Update User" onPress={() => updateUser(users[0].id)} />
      <Button title="Delete User" onPress={() => deleteUser(users[0].id)} />
      <Text style={{color: 'red'}}>{JSON.stringify(users)}</Text>
    </View>
  );
}
