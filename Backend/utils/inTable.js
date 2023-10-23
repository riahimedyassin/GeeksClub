const inTable = (table,values) =>  {
    let index = 0 ;
    while(!(table.includes(values[index])) && index<table.length) index++;
    return index<table.length
}

module.exports={inTable}