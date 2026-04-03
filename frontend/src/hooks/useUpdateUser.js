import { useDispatch, useSelector } from "react-redux";
import { patchUserProfile } from "../service/api";
import { setUserProfile } from "../store/userSlice";

export function useUpdateUser() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return async function updateUser({ firstName, lastName }) {
    const updatedProfile = await patchUserProfile(token, firstName, lastName);

    dispatch(
      setUserProfile({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
      }),
    );

    return updatedProfile;
  };
}
