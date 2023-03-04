import { DragEvent } from 'react';

const preventDragHandler = (e: DragEvent<HTMLImageElement>) => {
  e.preventDefault();
}

export default (props: any) => <img draggable={false} onDragStart={preventDragHandler} {...props} />;
