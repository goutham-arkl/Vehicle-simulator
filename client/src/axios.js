import axios from 'axios'

const instance=axios.create({
    baseURL:'https://simulation-server.onrender.com',
})

export default instance