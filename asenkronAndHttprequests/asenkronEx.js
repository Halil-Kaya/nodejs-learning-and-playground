console.log('start')


setTimeout(() => console.log('A'), 2)
setTimeout(() => console.log('B'), 0)

console.log('end')


//OUTPUT

// start
// end
// B
// A