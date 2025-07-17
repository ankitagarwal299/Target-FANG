function commafy(value) {
    let output = '';
    let decimal = '';
  
    if (value.includes('.')) {
      output = value.substring(0, value.indexOf('.'));
      decimal = value.substring(value.indexOf('.') );
    } else {
      output = value;
    }
  
    return parseFloat(output).toLocaleString() + decimal;
  }
  
  export default commafy;
  