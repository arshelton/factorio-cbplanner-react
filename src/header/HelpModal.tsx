function HelpModal() {
  return (
    <dialog id="help-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
        <h3 className="font-bold text-lg">How to Use</h3>
        <h1 className="font-semibold underline text-md pt-4">Priority</h1>
        <ul className="list-disc ml-5">
          <li>Implement better way to render material routes</li>
          <li>
            Add ability to add cells between cells (add column, add row, etc.)
          </li>
          <li>Add click-and-drag routing for planning material routes</li>
          <li>Add drag-and-drop to swap cell positions</li>
        </ul>
        <h1 className="font-semibold underline text-md pt-4">Potential</h1>
        <ul className="list-disc ml-5">
          <li>Add ability to merge cells into bigger cells</li>
          <li>Add sub-planning for individual cells</li>
          <li>
            Integrate blueprint system
            <ul className="list-disc ml-5">
              <li>Add total grid cost calculation</li>
            </ul>
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
