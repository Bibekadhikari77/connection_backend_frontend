import { useEffect, useState } from "react"

function App() {

  const[users,setUsers] = useState([])

  const getAllUsers = async () =>{
    
    try {
      const res = await fetch('http://localhost:3000/api/users', {
      method: 'GET'
    });

    const data =await res.json();
    setUsers(data)

    }
    catch (error) {
      console.error("Error fetching users:", error)

  }
  };
  
  useEffect(() =>{
    getAllUsers()
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {
        users.map((user) =>(
          <div key={user.id}>
            <h1>id:{user.id}</h1>
            <h1>firstname:{user.first_name}</h1>
            <h1>lastname:{user.last_name}</h1>
            <h1>email:{user.email}</h1>
          </div>
        ))
      }
    </div>
  )
}

export default App
