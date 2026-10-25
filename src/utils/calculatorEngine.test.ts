import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseInputString,
  calculate,
  formatDimensional,
  formatValueDisplay,
  conversionFactors,
  areaFactors,
  volFactors,
  cleanFloat,
  displayFloat,
  calculateSqrt,
  calculateSquare,
  calculateReciprocal,
  calculatePercent,
  evaluateMathExpression,
  roundDenominators,
} from './calculatorEngine.ts';

test('1. Scalar and Numeric Input Parsing', () => {
  assert.deepEqual(parseInputString('0'), { value: 0, type: 'scalar', isDimensional: false });
  assert.deepEqual(parseInputString('42'), { value: 42, type: 'scalar', isDimensional: false });
  assert.deepEqual(parseInputString('42.5'), { value: 42.5, type: 'scalar', isDimensional: false });
  assert.deepEqual(parseInputString('-10.25'), { value: -10.25, type: 'scalar', isDimensional: false });
  assert.deepEqual(parseInputString('1,234.56'), { value: 1234.56, type: 'scalar', isDimensional: false });
});

test('2. Architectural Dimensional Input Parsing', () => {
  // Feet only
  const ftOnly = parseInputString('5 ft');
  assert.equal(ftOnly.value, 60);
  assert.equal(ftOnly.type, 'linear');
  assert.equal(ftOnly.isDimensional, true);

  // Inches only
  const inOnly = parseInputString('9 in');
  assert.equal(inOnly.value, 9);
  assert.equal(inOnly.type, 'linear');

  // Feet and inches
  const ftIn = parseInputString('5 ft 6 in');
  assert.equal(ftIn.value, 66);
  assert.equal(ftIn.type, 'linear');

  // Fractions
  const frac12 = parseInputString('5 ft 6 1/2 in');
  assert.equal(frac12.value, 66.5);

  const frac38 = parseInputString('5 ft 6 3/8 in');
  assert.equal(frac38.value, 66.375);

  const frac16 = parseInputString('7/16 in');
  assert.equal(frac16.value, 0.4375);

  // Decimal Feet & Decimal Inches
  const decFt = parseInputString('12.5 ft');
  assert.equal(decFt.value, 150);

  const decIn = parseInputString('14.25 in');
  assert.equal(decIn.value, 14.25);

  // Negative dimensional
  const negFtIn = parseInputString('-2 ft 4 in');
  assert.equal(negFtIn.value, -28);
  assert.equal(negFtIn.type, 'linear');

  // Architectural shorthand tick marks: 5' 6" and 5' 6-3/8"
  const tick1 = parseInputString("5' 6\"");
  assert.equal(tick1.value, 66);
  assert.equal(tick1.type, 'linear');

  const tick2 = parseInputString("5' 6-3/8\"");
  assert.equal(tick2.value, 66.375);

  const tickFt = parseInputString("10'");
  assert.equal(tickFt.value, 120);

  const tickIn = parseInputString('8"');
  assert.equal(tickIn.value, 8);
});

test('3. Dimensional Arithmetic: Addition & Subtraction', () => {
  // 5 ft (60 in) + 2 ft 6 in (30 in) = 7 ft 6 in (90 in)
  const add1 = calculate(60, 'linear', 30, 'linear', 'add');
  assert.equal(add1.value, 90);
  assert.equal(add1.type, 'linear');
  assert.equal(add1.error, undefined);

  // 10 ft (120 in) - 3 ft 4 in (40 in) = 6 ft 8 in (80 in)
  const sub1 = calculate(120, 'linear', 40, 'linear', 'subtract');
  assert.equal(sub1.value, 80);
  assert.equal(sub1.type, 'linear');

  // Negative result: 2 ft - 5 ft = -3 ft (-36 in)
  const subNeg = calculate(24, 'linear', 60, 'linear', 'subtract');
  assert.equal(subNeg.value, -36);
  assert.equal(subNeg.type, 'linear');

  // Area addition: 100 sq ft + 50 sq ft = 150 sq ft
  const addArea = calculate(100 * 144, 'area', 50 * 144, 'area', 'add');
  assert.equal(addArea.value, 150 * 144);
  assert.equal(addArea.type, 'area');

  // Volume subtraction: 500 cu ft - 200 cu ft = 300 cu ft
  const subVol = calculate(500 * 1728, 'volume', 200 * 1728, 'volume', 'subtract');
  assert.equal(subVol.value, 300 * 1728);
  assert.equal(subVol.type, 'volume');

  // Unit mismatch errors
  const errAdd = calculate(100, 'area', 20, 'linear', 'add');
  assert.equal(errAdd.error, 'Unit Mismatch');

  const errSub = calculate(100, 'volume', 20, 'area', 'subtract');
  assert.equal(errSub.error, 'Unit Mismatch');
});

test('4. Dimensional Arithmetic: Multiplication', () => {
  // Linear * Linear = Area (sq in)
  // 10 ft (120 in) * 12 ft (144 in) = 17,280 sq in = 120 sq ft
  const mulLinear = calculate(120, 'linear', 144, 'linear', 'multiply');
  assert.equal(mulLinear.value, 17280);
  assert.equal(mulLinear.type, 'area');

  // Area * Linear = Volume (cu in)
  // 120 sq ft (17,280 sq in) * 8 ft (96 in) = 1,658,880 cu in = 960 cu ft
  const mulVol1 = calculate(17280, 'area', 96, 'linear', 'multiply');
  assert.equal(mulVol1.value, 1658880);
  assert.equal(mulVol1.type, 'volume');

  // Linear * Area = Volume (commutative)
  const mulVol2 = calculate(96, 'linear', 17280, 'area', 'multiply');
  assert.equal(mulVol2.value, 1658880);
  assert.equal(mulVol2.type, 'volume');

  // Linear * Scalar = Linear
  // 5 ft (60 in) * 3 = 15 ft (180 in)
  const mulScalar1 = calculate(60, 'linear', 3, 'scalar', 'multiply');
  assert.equal(mulScalar1.value, 180);
  assert.equal(mulScalar1.type, 'linear');

  // Scalar * Linear = Linear
  const mulScalar2 = calculate(3, 'scalar', 60, 'linear', 'multiply');
  assert.equal(mulScalar2.value, 180);
  assert.equal(mulScalar2.type, 'linear');

  // Area * Scalar = Area
  const mulAreaScalar = calculate(144, 'area', 5, 'scalar', 'multiply');
  assert.equal(mulAreaScalar.value, 720);
  assert.equal(mulAreaScalar.type, 'area');

  // Volume * Scalar = Volume
  const mulVolScalar = calculate(1728, 'volume', 2, 'scalar', 'multiply');
  assert.equal(mulVolScalar.value, 3456);
  assert.equal(mulVolScalar.type, 'volume');

  // Invalid multiplications (e.g. Area * Area)
  const invalidMul = calculate(144, 'area', 144, 'area', 'multiply');
  assert.equal(invalidMul.error, 'Invalid Multiplication');
});

test('5. Dimensional Arithmetic: Division', () => {
  // Area / Linear = Linear
  // 120 sq ft (17,280 sq in) / 10 ft (120 in) = 12 ft (144 in)
  const divArea = calculate(17280, 'area', 120, 'linear', 'divide');
  assert.equal(divArea.value, 144);
  assert.equal(divArea.type, 'linear');

  // Volume / Area = Linear
  // 960 cu ft (1,658,880 cu in) / 120 sq ft (17,280 sq in) = 8 ft (96 in)
  const divVolArea = calculate(1658880, 'volume', 17280, 'area', 'divide');
  assert.equal(divVolArea.value, 96);
  assert.equal(divVolArea.type, 'linear');

  // Volume / Linear = Area
  // 960 cu ft (1,658,880 cu in) / 8 ft (96 in) = 120 sq ft (17,280 sq in)
  const divVolLinear = calculate(1658880, 'volume', 96, 'linear', 'divide');
  assert.equal(divVolLinear.value, 17280);
  assert.equal(divVolLinear.type, 'area');

  // Linear / Linear = Scalar
  // 12 ft (144 in) / 3 ft (36 in) = 4 (scalar)
  const divScalar = calculate(144, 'linear', 36, 'linear', 'divide');
  assert.equal(divScalar.value, 4);
  assert.equal(divScalar.type, 'scalar');

  // Linear / Scalar = Linear
  const divLinScalar = calculate(120, 'linear', 2, 'scalar', 'divide');
  assert.equal(divLinScalar.value, 60);
  assert.equal(divLinScalar.type, 'linear');

  // Division by zero
  const divZero = calculate(100, 'linear', 0, 'linear', 'divide');
  assert.equal(divZero.error, 'Div by Zero');

  // Scalar / Dimension = Invalid Division
  const scalarByDim = calculate(10, 'scalar', 24, 'linear', 'divide');
  assert.equal(scalarByDim.error, 'Invalid Division');
});

test('6. Architectural Formatting & Fractional Rounding', () => {
  assert.equal(formatDimensional(0), '0 in');
  assert.equal(formatDimensional(6), '6 in');
  assert.equal(formatDimensional(72), '6 ft');
  assert.equal(formatDimensional(66), '5 ft 6 in');
  assert.equal(formatDimensional(66.5), '5 ft 6 1/2 in');
  assert.equal(formatDimensional(66.375), '5 ft 6 3/8 in');
  assert.equal(formatDimensional(66.4375), '5 ft 6 7/16 in');
  assert.equal(formatDimensional(0.5), '1/2 in');
  assert.equal(formatDimensional(0.375), '3/8 in');
  assert.equal(formatDimensional(-28), '-2 ft 4 in');

  // Fraction limit rounding (e.g. to 1/16, 1/8, 1/4, whole inch)
  // 66.375 is exactly 3/8:
  // Nearest 1/4 is 1/2
  assert.equal(formatDimensional(66.375, 4), '5 ft 6 1/2 in');
  // Nearest whole inch (denomLimit 1) is 6 in
  assert.equal(formatDimensional(66.375, 1), '5 ft 6 in');
  // 71.999 in rounded to 1/16 rolls over to 6 ft
  assert.equal(formatDimensional(71.999, 16), '6 ft');
});

test('7. Area, Volume, and Metric Conversions', () => {
  // Area in sq ft (17,280 sq in = 120 sq ft)
  assert.equal(formatValueDisplay(17280, 'area'), '120 sq ft');
  assert.equal(formatValueDisplay(17280, 'area', 'yd'), '13.33333 sq yd');

  // Volume in cu ft (1,728 cu in = 1 cu ft)
  assert.equal(formatValueDisplay(1728, 'volume'), '1 cu ft');
  assert.equal(formatValueDisplay(46656, 'volume', 'yd'), '1 cu yd');

  // Metric conversion: 1 meter in inches
  const meterInInches = conversionFactors['m'];
  assert.equal(formatValueDisplay(meterInInches, 'linear', 'm'), '1 m');

  // Centimeters and millimeters
  assert.equal(formatValueDisplay(10 * conversionFactors['cm'], 'linear', 'cm'), '10 cm');
  assert.equal(formatValueDisplay(25.4 * conversionFactors['mm'], 'linear', 'mm'), '25.4 mm');

  // Decimal feet and inches
  assert.equal(formatValueDisplay(66, 'linear', 'dec-ft'), '5.5 ft');
  assert.equal(formatValueDisplay(66, 'linear', 'dec-in'), '66 in');
});

test('8. Regular Calculator Helper Functions', () => {
  // Square Root
  assert.equal(calculateSqrt(144).value, 12);
  assert.equal(calculateSqrt(2).value, cleanFloat(Math.SQRT2));
  assert.equal(calculateSqrt(-9).error, 'Invalid Input');

  // Square
  assert.equal(calculateSquare(12).value, 144);
  assert.equal(calculateSquare(-5).value, 25);
  assert.equal(calculateSquare(2.5).value, 6.25);

  // Reciprocal
  assert.equal(calculateReciprocal(4).value, 0.25);
  assert.equal(calculateReciprocal(0).error, 'Div by Zero');

  // Percent
  assert.equal(calculatePercent(25), 0.25);
  assert.equal(calculatePercent(15, 200, 'add'), 30); // 15% of 200 is 30
  assert.equal(calculatePercent(10, 50, 'subtract'), 5);

  // Power
  const powRes = calculate(2, 'scalar', 8, 'scalar', 'power');
  assert.equal(powRes.value, 256);
});

test('9. Mathematical Expression Evaluator (Regular Mode & Parentheses)', () => {
  // Basic math
  assert.equal(evaluateMathExpression('2 + 3').value, 5);
  assert.equal(evaluateMathExpression('10 - 4').value, 6);
  assert.equal(evaluateMathExpression('3 * 7').value, 21);
  assert.equal(evaluateMathExpression('15 / 3').value, 5);

  // Operator precedence (BODMAS / PEMDAS)
  assert.equal(evaluateMathExpression('2 + 3 * 4').value, 14);
  assert.equal(evaluateMathExpression('10 - 6 / 2').value, 7);
  assert.equal(evaluateMathExpression('2 ^ 3 + 1').value, 9);

  // Parentheses evaluation
  assert.equal(evaluateMathExpression('(2 + 3) * 4').value, 20);
  assert.equal(evaluateMathExpression('2 * (3 + (4 * 2))').value, 22);
  assert.equal(evaluateMathExpression('(10 + 20) / (2 + 3)').value, 6);

  // Negative numbers
  assert.equal(evaluateMathExpression('-5 + 3').value, -2);
  assert.equal(evaluateMathExpression('-(2 + 3)').value, -5);
  assert.equal(evaluateMathExpression('4 * -2').value, -8);

  // Percentages in expressions
  assert.equal(evaluateMathExpression('200 * 15%').value, 30);

  // Power with parentheses
  assert.equal(evaluateMathExpression('2 ^ (1 + 2)').value, 8);

  // Division by zero in expression
  assert.equal(evaluateMathExpression('10 / (5 - 5)').error, 'Div by Zero');

  // Decimals
  assert.equal(evaluateMathExpression('1.25 * 4').value, 5);
});
