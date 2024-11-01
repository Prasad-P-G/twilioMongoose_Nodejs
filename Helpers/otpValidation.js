const otpVerification = (otpTime) => {
  try {
    console.log("miliseconds is : ", otpTime);

    const cDateTime = new Date();
    var differenceValue = (otpTime - cDateTime.getTime()) / 1000;
    differenceValue /= 60;

    console.log("Expired minutes : - " + Math.abs(differenceValue));

    if (Math.abs(differenceValue) > 2) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = otpVerification;
