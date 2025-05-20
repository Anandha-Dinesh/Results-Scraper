const writedata = (data, category, regno, dob, ullasId) => {
  if (category === "1") {
    if (data[0] == "Please check your Registration Number and DOB") {
      var sslc_mark = [regno, dob, ullasId, data[0]];
    } else {
      var sslc_mark = [
        regno,
        dob,
        ullasId,
        parseInt(data[4]),
        parseInt(data[6]),
        parseInt(data[8]),
        parseInt(data[10].slice(-3)),
        parseInt(data[12]),
        parseInt(data[14]),
      ];
    }
    return sslc_mark;
  } else if (category === "2" || "3") {
    if (data[29] == "COMPUTER SCIENCE") {
      let cs_mark = [
        regno,
        dob,
        data[10],
        data[15],
        "",
        data[32],
        data[21],
        data[27],
        data[38],
        "",
        "",
        "",
        "",
      ];
      return cs_mark;
    }

    if (data[29] == "BIOLOGY") {
      let bio_mark = [
        regno,
        dob,
        data[10],
        data[15],
        data[21],
        data[27],
        data[32],
        data[38],
      ];
      return bio_mark;
    }

    if (data[29] == "ACCOUNTANCY") {
      let com_mark = [
        regno,
        dob,
        data[10],
        data[15],
        "",
        "",
        "",
        "",
        "",
        data[21],
        data[27],
        data[33],
        data[39],
        data[42],
      ];
      return com_mark;
    }

    if (data == "noData") {
      let fillNull = [
        regno,
        dob,
        ullasId,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ];
      return fillNull;
    }
  }
};
module.exports = writedata;
