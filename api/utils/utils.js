

function array_contain(master, sub){
    let result
    if (sub.length === 0) { result = []}
    else {
        result = sub.every(function(val){
            return master.indexOf(val) >= 0
        });
    }
    return result
}

module.exports = { array_contain }