function HelpModal() {
  return (
    <dialog id="help-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
        <h3 className="font-bold text-lg pb-4">How to Use</h3>
        <p className="">
          The purpose of this app is to provide an easy UI to plan out a
          grid/cityblock based factory in Factorio. I wanted something a little
          more structured than just placing map tacks in the base game, so I
          built this. Basic controls are as follows:
        </p>
        <ul className="list-disc ml-5">
          <li>Click the + buttons to add more cells.</li>
          <li>
            Click in the center of a cell to designate production in that cell.
          </li>
          <li>
            Click and drag from the center of a cell to draw routes for items.
          </li>
          <li>Hover over a route to see its item.</li>
          <li>See keybinds window (to the right) for deleting icons/cells.</li>
          <li>State is stored in the URL, so bookmark URL to save or share.</li>
        </ul>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default HelpModal;
