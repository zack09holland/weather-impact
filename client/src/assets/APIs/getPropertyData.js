import axios from 'axios'
/**
 * @summary Accesses the server and returns the property data stored there
 * 
 * @function getPropertyData
 * @returns The response data as an array
 * 
 */

const getPropertyData = async () =>{
    try {
        const res = await axios.get("/api/property-data");

        return res.data;
        
    } catch (error) {
        console.log(error)
    } 
}
export default getPropertyData;

