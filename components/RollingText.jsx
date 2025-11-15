import { motion } from "framer-motion";
import '../css/RollingText.css'

const RollingText = ({ text, continuous=true, duration = 0.5, delayStep = 0.1 }) => {

  const textChars = Array.from(text);
  const totalDelay = (delayStep * text.length) + 1

  return (
    <div className='rollingTextDiv' aria-label={text}>

      { textChars.map((char, i) => {
        // Define config
        const transitConfig = continuous ? {
                                      repeat: Infinity,         // loop forever
                                      repeatType: "loop",
                                      repeatDelay: totalDelay,  // delay before animate starts again
                                      duration,                 // time for each char to animate
                                      delay: i * delayStep,     // stagger start per character
                                      ease: "easeInOut"         // smooth constant speed  
                                    }:{ 
                                      duration,                 // time for each char to animate
                                      delay: i * delayStep,     // stagger start per character
                                      ease: "easeInOut"         // smooth constant speed
                                    }
                              
        return (
          <motion.span
            className='rollingTextMotion' 
            key={`${char}-${i}`}
            initial={{ rotateX: -90, opacity: 0, y: -6 }} // invisible and rotated -90
            animate={{rotateX: 0, opacity: 1, y: 0}}      // visible
            exit={{ rotateX: 90, opacity: 0, y: 6 }}      // invisible and rotated 90
            transition={transitConfig}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default RollingText;