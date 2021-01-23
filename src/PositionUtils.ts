export enum OriginPosition {
    TopLeft,
    TopCenter,
    TopRight,
    MidLeft,
    MidCenter,
    MidRight,
    BottomLeft,
    BottomCenter,
    BottomRight
};
export class PositionUtils {
    constructor(){};
    static positionOfTopLeft(position: [number, number], width: number, height: number, reference: OriginPosition) : [number, number] {
        switch (reference) {
            case OriginPosition.MidCenter:
                let [x, y] = position;
                return [x - width / 2, y - height/2];
        
            default:
                break;
        }
    }
}