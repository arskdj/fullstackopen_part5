import React, {useState, useEffect} from "react"
import service from '../services/blogs'

const Login = () => {
    const [username, setUsername] = useState('some1')
    const [password, setPassword] = useState('1234')
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = await service.login({username, password})
        setUser(user)
    }

    const renderForm = () => (
        <div>
            <form onSubmit={handleLogin}>
                <div> username 
                    <input name="username" value={username} onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div> password 
                    <input name="password" type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit"> login </button>
            </form>
        </div>
    )
        

    const renderLoggedIn = () => (
        <div> 
            Welcome {user.name} !
        </div>

    )

    console.log(user)

    return user === null ?  renderForm()
            : renderLoggedIn()

}

export default Login
