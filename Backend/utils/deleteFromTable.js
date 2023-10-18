const deleteFromTable=(table,value)=> {
    const index = table.indexOf(value)
    return index!=-1 ?  [...table.splice(0,index),...table.splice(index+1,)] : table
}

module.exports={deleteFromTable}