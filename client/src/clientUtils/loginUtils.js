import axios from 'axios'

export const getAllPostOfUser = (userId) => {
    axios({
        method: 'get',
        url: `${apiHeader}post?where={"userId":${userId}}`
    }).then(function(res) {
        console.log(res)
        return res})
    .catch(function (err) {
        console.log(err)
        return 0
    })
}