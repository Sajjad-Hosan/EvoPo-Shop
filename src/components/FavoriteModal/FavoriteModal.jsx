import { HiMiniXMark } from "react-icons/hi2";

const FavoriteModal = () => {
  return (
    <>
      <dialog id="favorite" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex items-center">
            <h3 className="font-semibold text-lg">Favorite</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-ghost btn-circle">
                <HiMiniXMark className="text-lg" />
              </button>
            </form>
          </div>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </>
  );
};

export default FavoriteModal;
