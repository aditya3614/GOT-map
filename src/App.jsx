import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import "./App.css";
import "./styles.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FoldablePage />
    </>
  );
}
const FoldablePage = () => {
  let xDrag = useMotionValue(0);
  let [isFolded, setIsFolded] = useState(true);
  let xLeftSection = useTransform(xDrag, [0, 300], ["100%", "0%"]);
  let xRightSection = useTransform(xDrag, [0, 300], ["-100%", "0%"]);
  let centerScale = useTransform(xDrag, [150, 300], [0, 1]);
  let centerBrightness = useTransform(
    xDrag,
    [150, 300],
    ["brightness(0.2)", "brightness(1)"]
  );

  useMotionValueEvent(xDrag, "change", (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  return (
    <div className="oveflow-x-clip  ">
      <span className=" md:opacity-0 flex  justify-center mt-5 text-neutral-300 mx-auto pr-5  font-bold  text-lg">
        open the map!
      </span>
      <motion.div
        animate={isFolded ? "folded" : "open"}
        variants={{ open: { scale: 1 }, folded: { scale: 0.8 } }}
        initial="folded"
        className="h-screen w-screen flex flex-col items-center pr-5"
      >
        <motion.div
          variants={{ open: { rotate: 0 }, hovering: { rotate: 0 } }}
          whileHover="hovering"
          initial={{ rotate: 3 }}
          className="grid aspect-video max-h-[80vh]  w-full min-w-[200px] md:min-w-[600px] "
        >
          <div className="mx-auto grid aspect-video max-h-[80vh] p-8">
            <div className="aspect-video grid grid-cols-3 h-full w-full [grid-area:1/1]">
              <motion.div
                style={{ x: xLeftSection, skewY: "-1deg" }}
                className="map-image -skew-y-1 origin-bottom-right border-r border-[rgba(255,255,255,0.1)] shadow-2xl"
              />
              <motion.div
                style={{ scaleX: centerScale, filter: centerBrightness }}
                className="map-image "
              />
              <motion.div
                style={{ x: xRightSection, skewY: "1deg" }}
                className="map-image  skew-y-1 origin-bottom-left border-[rgba(255,255,255,0.1)] shadow-2xl"
              />
            </div>
            <motion.div
              drag="x"
              className="[grid-area:1/1]  relative z-10"
              _dragX={xDrag}
              dragConstraints={{ left: 0, right: 300 }}
              dragTransition={{
                modifyTarget: (target) => {
                  return target > 150 ? 300 : 0;
                },
                timeConstant: 45,
              }}
              dragMomentum={false}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={{
            folded: {
              opacity: 0,
              scale: 0.9,
              y: 30,
            },
            open: {
              opacity: 1,
              scale: 1,
              y: 0,
            },
          }}
          className="flex w-full justify-center"
        >
          <img src="./GOT_text.avif" className="w-1/3 object-cover h-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
};
export default App;
