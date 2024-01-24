import _ from 'lodash'

const a = { b: [1, 2, 3] }
// The `_.property` iteratee shorthand.
// console.log(_.unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x'))
// => [{ 'x': 1 }, { 'x': 2 }]
console.log(a.b.map(c => c*2))
