import { Plus } from "@phosphor-icons/react";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border py-2 px-5 rounded-full flex items-center shadow-md gap-x-2 hover:shadow transition-shadow"
    >
      <Plus />
      Create
    </button>
  );
};

export default CreateEventButton;
