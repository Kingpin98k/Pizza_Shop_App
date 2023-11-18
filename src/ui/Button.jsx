import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  //This button act both as a link and as a button

  const base =
    "transition-colors-300 text-sm inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";

  const styles = {
    primary: base + " " + "px-4 py-3 md:px-6 md:py-4",
    small: base + " " + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "transition-colors-300 px-4 py-3 text-sm inline-block rounded-full bg-transparent border-2 border-stone-300 py-2.5 md:py-3.5 font-semibold uppercase tracking-wide text-stone-800 duration-300 hover:bg-stone-300 focus:bg-stone-300 hover:text-stone-800 focus:ring-stone-200 focus:text-stone-800 disabled:cursor-not-allowed sm:px-6 sm:py-4 focus:ring-stone-200 focus:ring focus:ring-offset-2",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
