const addZero = (num) => {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else if (num < 0) {
        return '00';
    }else {
        return num;
    }
};

export default addZero;
