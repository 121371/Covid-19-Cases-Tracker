// eslint-disable-next-line no-extend-native
export const toDateShortFormat = String.prototype.toDateShortFormat = function() {
    var month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  const dateItems = this.split("-");
    return "" + dateItems[2] + "-" + month_names[parseInt(dateItems[1]) - 1];
  };


  export const getTodayDate = function() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getYesterdayDate = function() {
    let today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
     let month = '' + (yesterday.getMonth() + 1);
     let day = '' + yesterday.getDate();
     const year = yesterday.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}