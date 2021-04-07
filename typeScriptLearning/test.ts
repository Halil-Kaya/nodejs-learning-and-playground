interface Test{
    name:string;
    getData(num:number):void
}


class A implements Test{

    name:string

    constructor(name:string) {
        this.name = name
    }

    getData(num:number):void{
        console.log("hello")
    }

}

let a:A = new A("asd")