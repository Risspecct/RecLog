import { motion } from "framer-motion";
import InfoTooltip from "./InfoTooltip";

function SummaryCard({
  title,
  value,
  description
}) {

  return (

    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl shadow-md p-8"
    >

      <div className="flex items-center gap-2">

        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <InfoTooltip text={description}/>

      </div>

      <h1 className="text-4xl font-bold mt-5 text-slate-800">
        {value}
      </h1>

    </motion.div>

  );
}

export default SummaryCard;