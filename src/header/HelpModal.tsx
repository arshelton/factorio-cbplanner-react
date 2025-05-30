function HelpModal() {
  return (
    <dialog id="help-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
        <h3 className="font-bold text-lg pb-4">How to Use</h3>
        <p className="">
          The purpose of this app is to provide an easy UI to plan out a
          grid/cityblock based factory in Factorio, replacing map tacks in the
          base game. Basic controls are as follows:
        </p>
        <ul className="list-disc ml-5">
          <li>Click the + buttons to add more cells.</li>
          <li>
            Click in the center of a cell to designate production in that cell.
          </li>
          <li>
            Click on the sides of a cell to designate side routes running
            through a cell.
          </li>
          <li>
            Hover over a side route to see icons running through that route.
          </li>
          <li>See keybinds window (to the right) for deleting icons/cells.</li>
          <li>
            Grid state is stored in the URL, so bookmark URL to save or share.
          </li>
        </ul>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default HelpModal;
