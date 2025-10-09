import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import useMediaQuery from "../hooks/useMediaQuery";
import SortingControlsPanel from "../components/sorting/sortingControlsPanel";
import SortingVisualizePanel from "../components/sorting/sortingVisualizePanel";

export default function Sorting() {
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className='page'>
      <PanelGroup direction={isMediumScreen ? "vertical" : "horizontal"}>
        {/* Change the order/size of the panels based on the screen size */}
        {isMediumScreen ? (
          <SortingVisualizePanel
            order={1}
            defaultSize={50}
            id='sorting-visualize-panel'
          />
        ) : (
          <SortingControlsPanel
            order={1}
            defaultSize={20}
            id='sorting-controls-panel'
          />
        )}
        <PanelResizeHandle className='resize-handle' />
        {isMediumScreen ? (
          <SortingControlsPanel
            order={2}
            defaultSize={50}
            id='sorting-controls-panel'
          />
        ) : (
          <SortingVisualizePanel
            order={2}
            defaultSize={80}
            id='sorting-visualize-panel'
          />
        )}
      </PanelGroup>
    </div>
  );
}
