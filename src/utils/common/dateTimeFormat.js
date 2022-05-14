const timeStampToTimeString = (timeStamp) => {
    const date = timeStamp.toDate();
    const hour = '0' + date.getHours();
    const minute = '0' + date.getMinutes();
    return hour.substring(hour.length - 2) + ':' + minute.substring(minute.length - 2);
}

const timeStampToDate = (timeStamp) => {
    return timeStamp.toDate().toISOString().slice(0, 10);
}

const currentDate = () => {
    const curDate = new Date();
    return curDate.toISOString().slice(0, 10);
}

const stringToTimeStamp = (strDate) => {
    // const dt = Date.parse(strDate);  
    // return {seconds: dt / 1000, nanoseconds: 0};
    const date = new Date(new Date(strDate).toUTCString());
    return date.getTime() / 1000;
}

export { timeStampToDate, timeStampToTimeString, currentDate, stringToTimeStamp };