function HotkeysModal() {
  return (
    <dialog id="hotkeys-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
        <h3 className="font-bold text-lg pb-4">Keybinds</h3>
        <p>
          <kbd className="kbd">shift</kbd>
          <span className="text-md font-bold">+ Left Mouse:</span>
          <span className="pl-2">
            Removes icons from a given cell or side route
          </span>
        </p>
        <p>
          <kbd className="kbd">ctrl</kbd>
          <span className="text-md font-bold">+ Left Mouse:</span>
          <span className="pl-2">Deletes a cell</span>
        </p>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default HotkeysModal;
