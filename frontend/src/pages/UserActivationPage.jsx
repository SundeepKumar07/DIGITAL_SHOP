import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../server.js';
import { toast } from 'react-toastify';

const UserActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${server}/user/activation`, {
                        activation_token,
                    });

                    if (!res) {
                        setError(true)
                    }
                    console.log(res.data.message);
                    toast.success("Your account activated successfully");
                } catch (error) {
                    setError(true)
                    console.log(error.response.data.message);
                }
            }
            activationEmail();
        }
    }, [activation_token]);
    return (
        <div>
            {
                error ?
                    <div>
                        Your token is expired
                    </div>
                    : <div>
                        Your account is activated
                    </div>
            }
        </div>
    )
}

export default UserActivationPage