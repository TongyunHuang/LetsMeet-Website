
/**
 * Make sure master array contains sub array, remove item not in master
 * @param {[String]} master should contain sub
 * @param {[String]} sub should be contained by mater
 * @returns {[String]} valid sub array
 */
function array_contain(master, sub){
    let result
    if (sub) {
        result = sub.every(function(val){
            return master.indexOf(val) >= 0
        });
    }
    else {
        result = []
    }
    return result
}




module.exports = { array_contain }