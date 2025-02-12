export class PostError {
    constructor(message: string = 'Post Error') {
        this.message = message;
    }
    message: string;
}

export class PostSuccess {
    constructor(message: string = 'Post Success') {
        this.message = message;
    }
    message: string;
}
