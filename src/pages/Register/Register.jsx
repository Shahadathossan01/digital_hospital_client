import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const {register,handleSubmit,watch,formState:{errors}}=useForm()
    const {registerUser}=useStoreActions(action=>action.user)
    const {registerError}=useStoreState(state=>state.user)
    const navigate=useNavigate()
    const onSubmit=(data)=>{
        const {username,email,confirmPassword}=data
       registerUser({username,email,password:confirmPassword,navigate})
    }
    const password=watch("password")
    return (
        <>
            <div style={{display:'flex',gap:'40px'}}>
                <div>
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{display:'flex',gap:'20px',marginBottom:'30px'}}>
                            <div>
                                <label htmlFor="username">Username:</label><br />
                                <input required {...register("username")} type="text" name="username" id="username" />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label><br />
                                <input required {...register("email")} type="email" name="email" id="email" />
                                {
                                    registerError&& (
                                        <p style={{ color: 'red' }}>{registerError}</p>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{display:'flex',gap:'20px',marginBottom:'20px'}}>
                            <div>
                                <label htmlFor="password">Password</label><br />
                                <input required {...register("password")} type="password" name="password" id="password" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm password</label><br />
                                <input required {...register("confirmPassword",{
                                    validate:value=>value===password || "Password not match!"
                                })} type="password" name="confirmPassword" id="confirmPassword" />
                                {errors.confirmPassword && (
                                    <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                        <button type="submit">Register</button>
                        <p>Already have an account? Please <Link style={{textDecoration:'none'}} to="/login">Login</Link></p>
                </form>
                </div>
            <div>
                <h1>image</h1>
            </div>
            </div>
        </>
    );
};

export default Register;