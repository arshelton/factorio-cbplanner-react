function RoadMapModal() {
  return (
    <dialog id="roadmap-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto">
        <h3 className="font-bold text-lg">Upcoming Features</h3>
        <h1 className="font-semibold underline text-md pt-4">Priority</h1>
        <ul className="list-disc ml-5">
          <li>Better way to render material routes</li>
          <li>
            Ability to add cells between cells (add column, add row, etc.)
          </li>
          <li>Click-and-drag routing for planning material routes</li>
          <li>Drag-and-drop to swap cell positions</li>
        </ul>
        <h1 className="font-semibold underline text-md pt-4">Potential</h1>
        <ul className="list-disc ml-5">
          <li>Ability to merge cells into bigger cells</li>
          <li>Sub-planning for individual cells</li>
          <li>
            Blueprint system integration
            <ul className="list-disc ml-5">
              <li>Total grid cost calculation</li>
            </ul>
          </li>
          <li>Window-responsive UI</li>
        </ul>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default RoadMapModal;
