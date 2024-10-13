import LoginForm from "../components/LoginForm";
import LeftView from "../components/LeftView";

const Login = () => {
  return (
    <div className="flex h-screen overflow-y-auto">
      <LeftView />
      <div className="flex flex-col w-[45%] justify-center items-center overflow-y-auto ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
