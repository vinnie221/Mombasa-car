const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProductAuto = async(category)=>{
    const response = await fetch(SummaryApi.categoryWiseProductAuto.url,{
        method : SummaryApi.categoryWiseProductAuto.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProductAuto