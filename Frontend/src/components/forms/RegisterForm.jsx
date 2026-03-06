import FormHeading from "../UI/FormHeading";
import TextInput from "../UI/TextInput";
import Button from "../UI/Button";
import RoleSelector from "../UI/RoleSelector";
import FormFooter from "../UI/FormFooter";
import { registerUser } from "../../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/validate";
import { useAuth } from "../../context/authContext";

function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  //States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("listener");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  //Heading
  const headers = {
    heading: "Create your account",
    caption: "Join the community and start streaming",
  };

  //Functions
  async function handleRegisterUser(e) {
    e.preventDefault();
    setApiError("");
    const newErrors = validate({ username, email, password });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await registerUser({ username, email, password, role });
      if (res) {
        setUser(res.user);
        navigate("/");
      }
    } catch (err) {
      setApiError(err.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleRegisterUser}
      className="flex flex-col mx-2 text-white bg-green-800/20 gap-2 py-5 px-5 border-2 max-w-90 w-full  border-zinc-200/20 rounded-lg"
    >
      <FormHeading heading={headers.heading} caption={headers.caption} />
      {apiError && (
        <p className="text-red-400 text-xs text-center bg-red-500/10 p-2 rounded">
          {apiError}
        </p>
      )}
      <div className="w-full">
        <TextInput
          label={"Full Name"}
          placeholder={"Enter Your Full Name"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
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
        <RoleSelector role={role} setRole={setRole} />
        <input type="hidden" name="role" value={role} />
        <Button label={"Register"} onClick={handleRegisterUser} type="submit" />
        <FormFooter type="register" />
      </div>
    </form>
  );
}

export default RegisterForm;
