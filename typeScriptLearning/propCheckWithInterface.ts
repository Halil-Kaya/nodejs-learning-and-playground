interface Lengthy {
    length: number;
}

function countAndDescribe < T extends Lengthy > (element: T) {
    let descriptionText = "Got no value.";

    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    } else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }

    return [element, descriptionText];
}

let arr: any[] = [];

arr.push("hello");
arr.push(4);

console.log(countAndDescribe(arr));
console.log(countAndDescribe("Hello"));