import { Helmet } from "react-helmet-async";
import { Button } from "antd";
import Images from "../../../components/images";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
    const onFinish = () => {
        navigate("/leadership/login");
    };
    return (
        <div className="flex flex-col items-center w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Leadership: Password Reset Success</title>
            </Helmet>
            <div className="flex justify-center m-auto mb-1">
                <img src={Images.success} alt="Success" className="h-100" />
            </div>
            <div className="text-center ">
                <h2 className="text-2xl font-bold! text-[#475467] mb-3!">Success</h2>
                <p className="text-md font-medium text-[#667085]"> Thank you for taking time to complete this application, <br/> it means a lot. </p>
            </div>
            <Button
                type="primary"
                htmlType="submit"
                onClick={onFinish}
                className="w-[70%]! h-[46px]! mt-3! mb-0!  rounded-lg bg-[#FF6C2D] text-[#FF6C2D] font-medium text-lg hover:bg-gray-300 transition border-0"
            >
                Login
            </Button>
        </div>
    )
}

export default Success; 