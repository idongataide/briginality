import React from "react";
import { Helmet } from "react-helmet-async";
import Images from "../../../components/images";
import OtpInput from 'react-otp-input';
import { useLeadershipStore } from '@/global/leadershipStore';
import { useNavigate } from 'react-router-dom';

const EnterOtp = () => {
    const [otp, setOtp] = React.useState('');
    const navigate = useNavigate();
    const { otpRequestId, email, setNavPath, setOtpValue } = useLeadershipStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            // Show error
            return;
        }
        if (!otpRequestId) {
            // Show error
            return;
        }
        setOtpValue(otp);
        navigate('/leadership/login/forgot-password');
        setNavPath("enter-password");
    };

    return (
        <div className="flex flex-col items-start w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Leadership: Enter OTP</title>
            </Helmet> 
            <div className="flex justify-center m-auto mb-6">
                <img src={Images.logo} alt="Logo" className="h-10" />
            </div>
            <div className="mb-8 text-start ">
                <h2 className="text-2xl font-bold! text-[#475467] mb-1!">Enter OTP</h2>
                <p className="text-sm font-medium text-[#667085]">An OTP was sent to your email {email} address to verify your account. Kindly enter the six digit code to proceed</p>
            </div>
            <p className="text-[#475467] font-medium mb-4">Input the six digits your OTP code here </p>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6 flex justify-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        shouldAutoFocus
                        renderInput={(inputProps) => (
                            <input {...inputProps} />
                        )}
                        inputStyle={{
                            width: '48px',
                            height: '48px',
                            margin: '0 4px',
                            fontSize: '20px',
                            borderRadius: '8px',
                            border: '1px solid #D0D5DD',
                            color: '#1C2023',
                        }}
                        containerStyle={{
                            justifyContent: 'center',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={otp.length !== 6}
                    className={`w-full h-[46px] mt-5 rounded-lg font-medium text-lg transition border-0 ${
                        otp.length === 6 
                        ? 'bg-[#FF6C2D] text-white hover:bg-[#E55B1F] cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Proceed
                </button>
            </form>
        </div>
    )
}

export default EnterOtp; 