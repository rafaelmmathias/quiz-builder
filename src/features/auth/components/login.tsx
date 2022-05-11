import { useAuthStore } from "../stores/auth";

export const Login = () => {
  const { login } = useAuthStore();

  return (
    <div>
      <button onClick={login}>login</button>
    </div>
  );
};
