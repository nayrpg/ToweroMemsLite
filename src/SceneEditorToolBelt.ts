import { RectangleTool } from "./RectangleTool";
import { SceneEditorPlugin } from "./SceneEditorPlugin";
import { SceneEditorTool, SceneEditorToolTypes } from "./SceneEditorTool";

export class SceneEditorToolBelt {
    public static tools:  Array<SceneEditorTool> = Array(Object.keys(SceneEditorToolTypes).length);
    /** * getTool */
    public static getTool(toolType: SceneEditorToolTypes) : SceneEditorTool{
        if (!this.tools[toolType]) {
            switch (toolType) {
                case SceneEditorToolTypes.Rectangle:
                    this.tools[toolType] = new RectangleTool();
                    break;
            
                default:
                    return null;
            }
        }
        return SceneEditorToolBelt.tools[toolType];
    }
    public static switchTool(editPlug: SceneEditorPlugin, newTool: SceneEditorToolTypes) {
        editPlug.tool = SceneEditorToolBelt.getTool(newTool);
        editPlug.tool.initDone = false;
    }
    /**
     * handleToolUpdate
     */
    public static handleToolUpdate(editPlug: SceneEditorPlugin) {
        let tool = editPlug.tool
        if (tool) {
            if (!tool.initDone) {
                tool.init(editPlug);
            }
            tool.update(editPlug);
        }
    }
}