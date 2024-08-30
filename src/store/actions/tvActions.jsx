import axios from "../../utils/axios"
import { loadtv } from "../reducers/tvSlice"
export { removetv } from "../reducers/tvSlice"


export const asyncloadtv = (id) => async (dispatch, getState) => {
    try{
        const detail = await axios.get(`/tv/${id}`)
        const externalid = await axios.get(`/tv/${id}/external_ids`)
        const recommendations= await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const watchproviders = await axios.get(`tv/${id}/watch/providers`)
        const videos = await axios.get(`/tv/${id}/videos`)
        // const credits = await axios.get(`/tv/1022789/credits`)
        const translations = await axios.get(`/tv/${id}/translations`)
        
        let theall = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t => t.english_name),
            watchproviders: watchproviders.data.results.IN,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            // credits: credits.data.cast,
        }

        dispatch(loadtv(theall))

        // console.log(theall);
        
        
    }
    catch(error){
        console.log(error)
    }
}