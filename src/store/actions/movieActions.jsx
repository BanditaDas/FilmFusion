import axios from "../../utils/axios"
import { loadmovie } from "../reducers/movieSlice"
export { removemovie } from "../reducers/movieSlice"


export const asyncloadmovie = (id) => async (dispatch, getState) => {
    try{
        const detail = await axios.get(`/movie/${id}`)
        const externalid = await axios.get(`/movie/${id}/external_ids`)
        const recommendations= await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const watchproviders = await axios.get(`movie/${id}/watch/providers`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const credits = await axios.get(`/movie/${id}/credits`)
        const translations = await axios.get(`/movie/${id}/translations`)
        
        let theall = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t => t.english_name),
            watchproviders: watchproviders.data.results.IN,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            credits: credits.data.cast.filter((c) => c.profile_path !== null),
        }

        dispatch(loadmovie(theall))

        // console.log(theall);
        
        
    }
    catch(error){
        console.log(error)
    }
}