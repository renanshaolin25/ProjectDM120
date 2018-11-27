export class Content {

    private temperatura: string = "0";
    private luminosidade: string = "0";
    private touch: string = "0";
    private status: string = "0";
    

    constructor(temperatura: string, luminosidade: string, touch: string, status: string) {
        this.temperatura = temperatura;
        this.luminosidade = luminosidade;
        this.touch = touch;
        this.status = status;
    }

    public getTemperatura(): string {
        return this.temperatura;
    }

    public setTemperatura(temperatura: string) {
        this.temperatura = temperatura;
    }

    public getLuminosidade(): string {
        return this.luminosidade;
    }

    public setLuminosidade(luminosidade: string) {
        this.luminosidade = luminosidade;
    }

    public getTouch(): string {
        return this.touch;
    }

    public setTouch(touch: string) {
        this.touch = touch;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string) {
        this.status = status;
    }


    












}