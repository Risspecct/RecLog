function Navbar({
  title,
  subtitle
}) {

  return (

    <div className="bg-white rounded-3xl p-10 shadow-sm">

      <h1 className="text-5xl font-bold">

        {title}

      </h1>

      <p className="text-slate-500 text-lg mt-2">

        {subtitle}

      </p>

    </div>

  );

}

export default Navbar;