import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

const Sidebar = () => {
  return (
    <aside className="border p-5 w-64 sm:hidden xl:block">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
