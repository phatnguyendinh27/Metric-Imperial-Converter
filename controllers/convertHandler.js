function ConvertHandler() {
  const unitMap = {
    gal: 'L',
    l: 'gal',
    mi: 'km',
    km: 'mi',
    lbs: 'kg',
    kg: 'lbs'
  };

  const spellOut = {
    gal: 'gallons',
    l: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms'
  };

  const conv = {
    gal: 3.78541,
    L: 1/3.78541,
    mi: 1.60934,
    km: 1/1.60934,
    lbs: 0.453592,
    kg: 1/0.453592
  };

  this.getNum = function(input) {
    const result = input.match(/^[\d.\/]+/);
    if (!result) return 1; // default to 1 when no number
    const numStr = result[0];

    // more than one slash => invalid number
    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

    if (numStr.indexOf('/') !== -1) {
      const parts = numStr.split('/');
      if (parts.length !== 2) return 'invalid number';
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator)) return 'invalid number';
      return numerator / denominator;
    } else {
      const val = parseFloat(numStr);
      if (isNaN(val)) return 'invalid number';
      return val;
    }
  };

  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';
    const unit = result[0];
    const lower = unit.toLowerCase();
    if (['gal','l','mi','km','lbs','kg'].indexOf(lower) === -1) return 'invalid unit';
    return lower;
  };

  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return null;
    const lower = initUnit.toLowerCase();
    const ret = unitMap[lower];
    if (!ret) return null;
    return ret === 'L' ? 'L' : ret;
  };

  this.spellOutUnit = function(unit) {
    if (!unit) return null;
    return spellOut[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    if (initNum === 'invalid number' || initUnit === 'invalid unit') return null;
    const unitKey = initUnit.toLowerCase();
    let result;
    switch (unitKey) {
      case 'gal':
        result = initNum * conv.gal;
        break;
      case 'l':
        result = initNum * conv.L;
        break;
      case 'mi':
        result = initNum * conv.mi;
        break;
      case 'km':
        result = initNum * conv.km;
        break;
      case 'lbs':
        result = initNum * conv.lbs;
        break;
      case 'kg':
        result = initNum * conv.kg;
        break;
      default:
        return null;
    }
    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spelledInit = this.spellOutUnit(initUnit);
    const spelledReturn = this.spellOutUnit(returnUnit);
    return `${initNum} ${spelledInit} converts to ${returnNum} ${spelledReturn}`;
  };
  
}

module.exports = ConvertHandler;
