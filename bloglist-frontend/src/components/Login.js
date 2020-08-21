import React, {useState} from "react"

const Login = ({login}) => {
    const [username, setUsername] = useState('some1')
    const [password, setPassword] = useState('1234')

    const handleLogin = async (event) => {
        event.preventDefault()
        await login({username, password})
    }


    return (
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
}

export default Login
