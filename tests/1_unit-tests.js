const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

	test('convertHandler should correctly read a whole number input', function(done) {
		assert.equal(convertHandler.getNum('32L'), 32);
		done();
	});

	test('convertHandler should correctly read a decimal number input', function(done) {
		assert.equal(convertHandler.getNum('3.1mi'), 3.1);
		done();
	});

	test('convertHandler should correctly read a fractional input', function(done) {
		assert.equal(convertHandler.getNum('1/2kg'), 0.5);
		done();
	});

	test('convertHandler should correctly read a fractional input with a decimal', function(done) {
		assert.equal(convertHandler.getNum('4.5/1.5km'), 3);
		done();
	});

	test('convertHandler should correctly return an error on a double-fraction', function(done) {
		assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid number');
		done();
	});

	test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
		assert.equal(convertHandler.getNum('kg'), 1);
		done();
	});

	test('convertHandler should correctly read each valid input unit', function(done) {
		const units = ['gal','l','mi','km','lbs','kg'];
		units.forEach(u => assert.equal(convertHandler.getUnit('10' + u), u));
		done();
	});

	test('convertHandler should correctly return an error for an invalid input unit', function(done) {
		assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
		done();
	});

	test('convertHandler should return the correct return unit for each valid input unit', function(done) {
		assert.equal(convertHandler.getReturnUnit('gal'), 'L');
		assert.equal(convertHandler.getReturnUnit('l'), 'gal');
		assert.equal(convertHandler.getReturnUnit('mi'), 'km');
		assert.equal(convertHandler.getReturnUnit('km'), 'mi');
		assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
		assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
		done();
	});

	test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
		assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
		assert.equal(convertHandler.spellOutUnit('l'), 'liters');
		assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
		assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
		assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
		assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
		done();
	});

	test('convertHandler should correctly convert gal to L', function(done) {
		assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.0001);
		done();
	});

	test('convertHandler should correctly convert L to gal', function(done) {
		assert.approximately(convertHandler.convert(1, 'l'), 0.26417, 0.0001);
		done();
	});

	test('convertHandler should correctly convert mi to km', function(done) {
		assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.0001);
		done();
	});

	test('convertHandler should correctly convert km to mi', function(done) {
		assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.0001);
		done();
	});

	test('convertHandler should correctly convert lbs to kg', function(done) {
		assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.0001);
		done();
	});

	test('convertHandler should correctly convert kg to lbs', function(done) {
		assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.0001);
		done();
	});

});