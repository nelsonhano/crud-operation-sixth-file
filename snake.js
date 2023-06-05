let snakeCase = 'sur_name';
let searchSnakeCase = snakeCase.search('_');
let index = searchSnakeCase+1;
let wordAftUnderscore = snakeCase.slice(index)
let wordB4Underscore = snakeCase.slice(0,searchSnakeCase)
let firstletter_ = wordAftUnderscore[0].toUpperCase()
let rest = firstletter_+wordAftUnderscore.slice(1);
let together = wordB4Underscore.concat(rest);
console.log(together);
