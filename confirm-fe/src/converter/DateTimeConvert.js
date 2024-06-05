
export const convertDateTime = (dateTimeString, addDayOfWeek = false) => {
    if(dateTimeString === undefined || dateTimeString === null) {
        return ''
    }

    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const daysOfWeek = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    if(addDayOfWeek) {
        return `${year}-${month}-${day}` + dayOfWeek + ` ${hours}:${minutes}`;
    } else {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
}

export const convertMonthTime = (dateTimeString) => {
    if(dateTimeString === undefined || dateTimeString === null) {
        return ''
    }

    const date = new Date(dateTimeString);
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export const convertDate = (dateString, addDayOfWeek = false) => {
    if(dateString === undefined || dateString === null) {
        return ''
    }
    
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const daysOfWeek = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    if (addDayOfWeek){ 
        return `${year}-${month}-${day}` + dayOfWeek; 
    } else {
        return `${year}-${month}-${day}`;
    }
}

export const arrayToDate = (array = []) => {
    if(array.length <= 0 || array === null) {
        return ''
    }


    
    const year = String(array[0]).padStart(4, '0');
    const month = String(array[1]).padStart(2, '0');
    const day = String(array[2]).padStart(2, '0');

    const StringDate = year + '-' + month + '-' + day
    const date = new Date(StringDate);

    const daysOfWeek = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return StringDate + dayOfWeek
}