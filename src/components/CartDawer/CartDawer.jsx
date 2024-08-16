const CartDawer = () => {
  return (
    <>
      <div className="drawer w-14">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </label>
        </div>
        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="p-5 h-full w-96 bg-base-100 card">
            <h2 className="text-4xl">Your Items</h2>
            <div className="grid grid-cols-2 gap-2 mt-7">
                <div className="card border relative">
                    <img src="https://i.ibb.co/r3Hd2W3/Mountain-Bike.png" alt="" className="w-full object-contain" />
                </div>
                <div className="card border">
                    <img src="https://i.ibb.co/r3Hd2W3/Mountain-Bike.png" alt="" className="w-full object-contain" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDawer;
