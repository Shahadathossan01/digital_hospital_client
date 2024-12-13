
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const {register,handleSubmit}=useForm()
    const {loginUser}=useStoreActions(action=>action.user)
    const navigate=useNavigate()
    const onSubmit=(data)=>{
        loginUser({data,navigate})
    }
    return (
        <>
            <div style={{display:'flex',gap:'20px'}}>
                <div>
                    <h1>image</h1>
                </div>
                <div>
                    <h1>Login Now</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email">Email:</label><br />
                            <input required {...register("email")} type="email" name="email" id="email" />
                        </div><br />
                        <div>
                            <label htmlFor="password">Password:</label><br />
                            <input required {...register("password")} type="password" name="password" id="password" />
                        </div><br />
                        <button type="submit">Log in</button>
                    </form>
                    <h4>or continue with</h4>
                    <div style={{display:'flex',gap:'10px'}}>
                        <button>Google</button>
                        <button>Facebook</button>
                        <button>Github</button>
                    </div>
                    <p>Don't have an account? <Link style={{textDecoration:'none'}} to="/register">Create account</Link></p>
                </div>
            </div>
        </>
    );
};

export default Login;