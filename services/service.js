export const fetchMonths = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let createdDate = new Date("1/1/2022");
    let currentDate = new Date();
    let dateAndYearList = [
      {
        label: monthNames[createdDate.getMonth()],
        value: createdDate.getMonth(),
      },
    ];
  
    while (createdDate.setMonth(createdDate.getMonth() + 1) < currentDate) {
      dateAndYearList.unshift({
        label: monthNames[createdDate.getMonth()],
        value: createdDate.getMonth(),
      });
    }
    return dateAndYearList;
  };