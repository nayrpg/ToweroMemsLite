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
    var el = document.getElementById("content");
    var greeter = new Greeter(el);
    greeter.start();
}