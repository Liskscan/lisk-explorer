import { FC } from "react"
import handleViewport from "react-in-viewport"

const LM: FC<{ inViewport: boolean; forwardedRef: any }> = ({
  forwardedRef,
}) => (
  <div className="viewport-block" ref={forwardedRef}>
    Load more..
  </div>
)

const ViewportBlock = handleViewport(LM, {})

export const LoadMore: FC<{ onEnter(): void }> = ({ onEnter, children }) => (
  <div onClick={onEnter}>
    <ViewportBlock onEnterViewport={onEnter} />
  </div>
)
