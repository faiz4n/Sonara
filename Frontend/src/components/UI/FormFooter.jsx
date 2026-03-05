import { Link } from "react-router-dom";

function FormFooter({ type = "register" }) {
  const isRegister = type === "register";
  return (
    <p className="text-xs text-zinc-300 text-center mt-5">
      {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
      <Link to={isRegister ? "/login" : "/register"} className="text-blue-500">
        {isRegister ? "Sign in" : "Sign up"}
      </Link>
    </p>
  );
}

export default FormFooter;
