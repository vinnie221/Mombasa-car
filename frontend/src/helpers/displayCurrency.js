
const displayKESCurrency = (num)=>{
    const formatter = new Intl.NumberFormat('sw-KE',{
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits : 2

    })

    return formatter.format(num)
}



export default displayKESCurrency