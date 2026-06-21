import { useState } from "react";
import { Info } from "lucide-react";

function InfoTooltip({ text }) {

  const [show, setShow] = useState(false);

  return (

    <div className="relative inline-block">

      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Info
          size={18}
          className="text-blue-500"
        />
      </button>

      {
        show && (

          <div
            className="
            absolute
            z-50
            top-8
            left-0
            w-64
            bg-slate-900
            text-white
            p-4
            rounded-3xl
            shadow-xl
            text-sm
            "
          >
            {text}
          </div>

        )
      }

    </div>

  );
}

export default InfoTooltip;