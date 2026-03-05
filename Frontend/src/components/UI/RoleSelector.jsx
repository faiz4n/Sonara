import { Headphones, Mic } from "lucide-react";
import RoleButton from "./RoleButton";

function RoleSelector({ role, setRole }) {
  return (
    <div>
      <p className="text-[12px] my-1 text-zinc-200">I am a...</p>
      <div className="flex gap-1 bg-green-200/20 border border-green-200/20 p-1 rounded-md text-center justify-center">
        <RoleButton
          label={"Listener"}
          icon={Headphones}
          value={"listener"}
          selectedRole={role}
          setRole={setRole}
        />
        <RoleButton
          label={"Artist"}
          icon={Mic}
          value={"artist"}
          selectedRole={role}
          setRole={setRole}
        />
      </div>
    </div>
  );
}

export default RoleSelector;
