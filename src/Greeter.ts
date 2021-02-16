class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: NodeJS.Timeout;

    constructor(el: HTMLElement) {
        this.element = el
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span')
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    start() {
        this.timerToken = setInterval(() => {this.span.innerText = new Date().toUTCString();}, 500);
    }
    stop() {
        clearTimeout(this.timerToken);
    }
}

window.onload = () => {
    const el = document.getElementById("content");
    const greeter = new Greeter(el);
    greeter.start();
}