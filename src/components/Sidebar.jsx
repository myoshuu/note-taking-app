import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

const Sidebar = () => {
  return (
    <aside className="border p-5 w-64 hidden xl:block fixed h-full bg-white pt-20 ">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
