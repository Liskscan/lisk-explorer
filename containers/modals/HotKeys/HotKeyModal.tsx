import { Paper } from "components/ui"
import { HotKey } from "./HotKey"
import { Group } from "./Group"
import { hotKeysCombos } from "./constants"

export const HotKeyModal = () => (
  <div className="flex flex-col space-y-4">
    <Paper surface={1} className="px-4 flex flex-col space-y-2 py-4">
      <div className="flex flex-row space-x-2 items-center">
        <h2 className={"text-onSurfaceHigh text-lg md:text-4xl font-bold"}>
          Master The Hot Keys!{" "}
        </h2>{" "}
        <HotKey hotKey={"ctrl"} />
        <span className="text-center font-medium text-onSurfaceMedium">+</span>
        <HotKey hotKey={"/"} />
      </div>

      <span>
        Learn how to navigate the Lisk blockchain with your keys only.
      </span>
    </Paper>
    <Paper
      surface={1}
      className="inline-block align-bottom rounded text-left overflow-hidden transform transition-all sm:align-middle sm:max-w-app sm:w-full"
    >
      <div className="  flex flex-col space-y-8 pb-4 sm:p-6 sm:pb-4">
        <div className="flex flex-row justify-between">
          {hotKeysCombos.map(({ category, keys }) => (
            <Group key={category} title={category} keys={keys} />
          ))}
        </div>
      </div>
    </Paper>
  </div>
)
