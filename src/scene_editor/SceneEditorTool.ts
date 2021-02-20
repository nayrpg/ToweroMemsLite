import { MysticPlugin } from './MysticPlugin';

export enum SceneEditorToolTypes {
    Rectangle
};
export class SceneEditorTool {
    type: SceneEditorToolTypes;
    initDone: boolean;
    public constructor () {
        this.initDone = false;
    }
    public init(editPlug: MysticPlugin) {
        this.initDone = true;
    }
    public update(editPlug: MysticPlugin){
        return;
    }
}