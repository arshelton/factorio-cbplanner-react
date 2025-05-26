import { CircleHelpIcon, CommandIcon, WaypointsIcon } from "lucide-react";

function Header() {
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost btn-lg" href="/">
          Factorio Planner
        </a>
      </div>
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost"
          onClick={() =>
            (
              document.getElementById("help-modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          <CircleHelpIcon />
        </button>
        <button
          className="btn btn-square btn-ghost"
          onClick={() =>
            (
              document.getElementById("hotkeys-modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          <CommandIcon />
        </button>
        <button
          className="btn btn-square btn-ghost"
          onClick={() =>
            (
              document.getElementById("roadmap-modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          <WaypointsIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
