import styles from './stylesheets/Signup.module.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
    let navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password, email };
        console.log(user)
        setIsPending(true);

        fetch('/api/postUser', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((response) =>{
            return response.json(); 
        }).then((data) => {
            setIsPending(false);
            if (data.user != null) {
                localStorage.setItem('username', data.user)
            }
            navigate(data.redirectURL)
        })
    }
    
    return (
        <>
            <Navbar />
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <div className={styles.formCard}>
                    <h1>Welcome!</h1>
                    <label>Email:</label>
                    <input
                        type="email"
                        required
                        maxLength={64}
                        value={email}
                        placeholder="name@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Username:</label>
                    <input
                        type="text"
                        required
                        minLength={6}
                        maxLength={20}
                        pattern="[a-zA-Z0-9-]+"
                        value={username}
                        placeholder="6-20 letters long"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        maxLength={20}
                        pattern="[a-zA-Z0-9-]+"
                        placeholder='6-20 letters long'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isPending && <button>Sign Up</button>}
                    {isPending && <button disabled>Creating..</button>}
                </div>
            </form>
        </>
    )
}

export default Signup;