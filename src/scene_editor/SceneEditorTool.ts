import { SceneEditorPlugin } from './SceneEditorPlugin';

export enum SceneEditorToolTypes {
    Rectangle
};
export class SceneEditorTool {
    type: SceneEditorToolTypes;
    initDone: boolean;
    public constructor () {
        this.initDone = false;
    }
    public init(editPlug: SceneEditorPlugin) {
        this.initDone = true;
    }
    public update(editPlug: SceneEditorPlugin){
        return;
    }
}