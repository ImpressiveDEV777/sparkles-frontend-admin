import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

/**
 * The orders header.
 */
function WhitelabelsHeader() {
  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full space-y-8 sm:space-y-0 items-center justify-between py-32 px-24 md:px-32">
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <Typography className="flex text-24 md:text-32 font-extrabold tracking-tight">
          Whitelabels
        </Typography>
      </motion.span>
    </div>
  )
}

export default WhitelabelsHeader
