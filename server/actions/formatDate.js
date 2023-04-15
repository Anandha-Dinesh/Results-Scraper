const formatDate = async (date) => {
    const dob_date = new Date(date.setHours(date.getHours() + 24, 0, 0, 0));
    const yyyy = dob_date.getFullYear();
    let mm = dob_date.getMonth() + 1;
    let dd = dob_date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;  
    const dob_final = dd + '/' + mm + '/' + yyyy;
    const dob =dob_final.toString();
    return dob;
}

module.exports = formatDate;