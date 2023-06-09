import { useField } from "../../../hooks/useField";
import { updateEmail, updateProfile } from "firebase/auth";
import auth from "../../../auth/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Toast from "../Toast";
import Verify from "./Verify";
import Upgrade from "./Upgrade";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../features/notificationSlice";
import { RootState } from "../../../store";
interface Props {
  handleName: React.Dispatch<string>;
}

const Account = ({ handleName }: Props) => {
  const dispatch = useDispatch();
  const verified = useSelector((state: RootState) => state.user.verification);

  const [user] = useAuthState(auth);
  const [name, setNameValue] = useField({
    id: "name",
    type: "text",
  });
  const [email, setEmailValue] = useField({
    id: "email",
    type: "email",
  });

  const changeAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    if (name.value) {
      await updateProfile(user, { displayName: name.value });
      handleName(name.value);
      setNameValue("");
      dispatch(setToast("name changed"));
    }
    if (email.value) {
      await updateEmail(user, email.value);
      setEmailValue("");
      dispatch(setToast("email changed"));
    }
    if (email.value && name.value) {
      dispatch(setToast("name and email changed"));
    }
  };

  return (
    <div className="flex w-fit flex-col items-center gap-4">
      <div className="w-full">
        <h2>Make changes to your account here.</h2>
      </div>
      <Toast />
      <form className="flex w-full flex-col gap-6 p-0" onSubmit={changeAccount}>
        <div className="flex flex-col">
          <label htmlFor="name">first name</label>
          <input
            {...name}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">email</label>
          <input
            {...email}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <button
          className="btn self-end border-0 bg-green-200 text-lg normal-case text-green-900"
          type="submit"
        >
          Save Changes
        </button>
      </form>
      {user?.isAnonymous && <Upgrade />}
      {((!user?.emailVerified && !user?.isAnonymous) || verified) && <Verify />}
    </div>
  );
};

export default Account;
