import React, {useState, useEffect} from "react"
import BlogForm from './BlogForm.js'
import service from '../services/blogs'

const Login = () => {
    const [username, setUsername] = useState('some1')
    const [password, setPassword] = useState('1234')
    const [user, setUser] = useState(null)

    const loadUser = () => {
        const user = window.localStorage.getItem('user')	
        if (user) setUser(JSON.parse(user))
    }
    useEffect(loadUser, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = await service.login({username, password})
        window.localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    const handeLogout = () => {
        window.localStorage.removeItem('user')
        setUser(null)
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
            <button onClick={handeLogout}> logout </button>
            <BlogForm token= {user.token}/>
        </div>

    )

    console.log(user)

    return user === null ?  renderForm()
            : renderLoggedIn()

}

export default Login
