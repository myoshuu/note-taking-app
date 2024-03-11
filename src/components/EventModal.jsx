import { X, Check, Trash } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { RichTextEditor } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";

const labelClass = [
  "bg-violet-500",
  "bg-gray-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-purple-500",
];

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [content, setContent] = useState(
    selectedEvent ? selectedEvent.content : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClass.find((lbl) => lbl === selectedEvent.label)
      : labelClass[0]
  );

  const handleSave = (e) => {
    e.preventDefault();
    const calendarEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      content,
      label: selectedLabel,
      day: daySelected.valueOf(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    content,
  });

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center rounded-lg z-[999]">
      <form
        action=""
        className="bg-white rounded-lg shadow-2xl sm:w-10/12 md:w-1/3"
      >
        <header className="bg-gray-100 px-8 py-2 flex justify-between items-center">
          <div></div>
          <div className="flex gap-x-2 items-center">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                <Trash weight="fill" />
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <X />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-lg font-medium pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-sm text-slate-600 my-5">
              {daySelected.format("dddd, MMMM DD")}
            </p>
            <RichTextEditor
              className="sm:max-h-[300px] md:max-h-[400px] overflow-auto"
              editor={editor}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={0}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
            <div className="flex gap-x-2 mt-4">
              {labelClass.map((label, i) => (
                <span
                  onClick={() => setSelectedLabel(label)}
                  key={i}
                  className={`${label} w-6 h-6 rounded-full flex items-center justify-center border cursor-pointer`}
                >
                  {selectedLabel === label && (
                    <Check className="text-white text-sm" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end w-100 p-3 mt-5">
          <button
            type="submit"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
