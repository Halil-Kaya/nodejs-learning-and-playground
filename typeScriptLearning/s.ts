namespace DDInerfaces{
    export interface Draggable{
        dragStartHandler(event:DragEvent):void;
    }

    export interface DragTarget{
        dragOverHandler(event:DragEvent):void;
        dropHandler(event:DragEvent):void;
        dragLeaveHandler(event:DragEvent):void;
    }


}