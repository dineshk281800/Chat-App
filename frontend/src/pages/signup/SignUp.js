import { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await signup(inputs);
    }
    return (
        <div className='text-gray-100 flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0'>
                <h1 className="text-3xl font-semibold text-center text-gray-300 ">
                    SignUp
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="label p-2">
                            <span className="text-base-300 label-text">Fullname</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Dinesh K'
                            className='w-full input input-bordered h-10'
                            value={inputs.fullname}
                            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="label p-2">
                            <span className="text-base-300 label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder='dineshk'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="label p-2">
                            <span className="text-base-300 label-text">Password</span>
                        </label>
                        <input
                            type="text"
                            placeholder='enter the password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="label p-2">
                            <span className="text-base-300 label-text">Confirm Password</span>
                        </label>
                        <input
                            type="text"
                            placeholder='enter the password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>
                    {/* Gender Checkbox goes here */}
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                    {/* <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                            {"Don't"} have an account?
                        </Link> */}
                    <a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </a>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 border-slate-700'
                        // disabled={loading}
                        >
                            {/* {loading ? <span className='loading loading-spinner'></span> :  */}
                            "SignUp"
                            {/* } */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp