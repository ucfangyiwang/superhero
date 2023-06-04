import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="justify-center content-center flex-wrap w-screen h-1/5 bg-[#a1e0e9]">
      <div className="pb-8 grid grid-cols-1 flex justify-center content-center w-screen font-sans text-3xl text-center font-bold text-yellow-400">
        Superhero
      </div>
      <div className="flex justify-center grid grid-cols-3 gap-8">
        <div className="pb-8 flex content-center justify-center">
          <button className="btn btn-warning w-24 md:w-36">
            <Link to="/">Home</Link>
          </button>
        </div>
        <div className="pb-8 flex content-center justify-center">
          <button className="btn btn-warning w-24 md:w-36">
            <Link to="/save">SaveHero</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
