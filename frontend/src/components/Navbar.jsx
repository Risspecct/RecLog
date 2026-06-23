function Navbar({
  title,
  subtitle
}) {

  return (

    <div className="bg-white rounded-3xl p-10 shadow-sm">

      <h1 className="text-4xl lg:text-5xl font-bold leading-tight">

        {title}

      </h1>

      <p className="text-slate-500 text-base lg:text-lg mt-3">

        {subtitle}

      </p>

    </div>

  );

}

export default Navbar;