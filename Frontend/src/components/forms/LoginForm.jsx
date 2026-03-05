import FormHeading from "../UI/FormHeading";
import TextInput from "../UI/TextInput";
import Button from "../UI/Button";
import FormFooter from "../UI/FormFooter";
import { loginUser } from "../../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validate from "../../utils/validate";
import { useAuth } from "../../context/authContext";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  //Heading
  const headers = {
    heading: "Login",
    caption: "Enter your details to access your music",
  };

  //Functions
  async function handleLoginUser(e) {
    e.preventDefault();
    setApiError("");
    const newErrors = validate({ email, password });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await loginUser({ email, password });
      if (res) {
        setUser(res.user);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setApiError(err.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleLoginUser}
      className="flex flex-col text-white bg-green-800/20 gap-2 py-5 px-5 border-2 max-w-90 w-full  border-zinc-200/20 rounded-lg"
    >
      <FormHeading heading={headers.heading} caption={headers.caption} />
      {apiError && (
        <p className="text-red-400 text-xs text-center bg-red-500/30 p-2 rounded">
          {apiError}
        </p>
      )}
      <div className="w-full">
        <TextInput
          label={"Email"}
          type={"email"}
          placeholder={"Enter Your Email Address"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <TextInput
          label={"Password"}
          type={"password"}
          placeholder={"Enter Your Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <Button label={"Login"} onClick={handleLoginUser} type="submit" />
        <FormFooter type="login" />
      </div>
    </form>
  );
}

export default LoginForm;
