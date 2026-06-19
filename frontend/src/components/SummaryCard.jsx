import { motion } from "framer-motion";

function SummaryCard({title,value}){

    return(

        <motion.div
        whileHover={{y:-5}}
        className="bg-white rounded-3xl shadow-md p-8">

            <p className="text-slate-500 text-sm">

                {title}

            </p>

            <h1 className="text-4xl font-bold mt-5 text-slate-800">

                {value}

            </h1>

        </motion.div>

    )

}

export default SummaryCard