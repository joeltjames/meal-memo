import { v4 as uuidv4 } from 'uuid';

export class ToastMessage {
    public visible = true;
    public readonly uuid: string;
    constructor(
        public message: string,
        public header = '',
        public autoHide = true
    ) {
        this.uuid = uuidv4();
    }

    onClose = () => {};

    close() {
        this.visible = false;
        this.onClose();
    }
}
