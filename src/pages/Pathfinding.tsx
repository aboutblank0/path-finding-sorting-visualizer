import useMediaQuery from "../hooks/useMediaQuery";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PathfindingControlsPanel from "../components/pathfinding/pathfindingControlsPanel";
import PathfindingVisualizePanel from "../components/pathfinding/pathfindingVisualizePanel";

export default function Pathfinding() {
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className='page'>
      <PanelGroup direction={isMediumScreen ? "vertical" : "horizontal"}>
        {/* Change the order/size of the panels based on the screen size */}
        {isMediumScreen ? (
          <PathfindingVisualizePanel
            order={1}
            defaultSize={50}
            id='pathfinding-visualize-panel'
          />
        ) : (
          <PathfindingControlsPanel
            order={1}
            defaultSize={20}
            id='pathfinding-controls-panel'
          />
        )}
        <PanelResizeHandle className='resize-handle' />
        {isMediumScreen ? (
          <PathfindingControlsPanel
            order={2}
            defaultSize={50}
            id='pathfinding-controls-panel'
          />
        ) : (
          <PathfindingVisualizePanel
            order={2}
            defaultSize={80}
            id='pathfinding-visualize-panel'
          />
        )}
      </PanelGroup>
    </div>
  );
}
