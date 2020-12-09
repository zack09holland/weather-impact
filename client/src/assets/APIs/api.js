import axios from 'axios'
const getPropertyData = async () =>{
    try {
        const res = await axios.get("/api/property-data");
        // console.log(
        // 	"Data has been received: ",
        // 	JSON.stringify(res, null, 4)
        // );
        // console.log(res)
        return res.data;
    } catch (error) {
        console.log(error)
    } 
}
export default getPropertyData;