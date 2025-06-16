import { describe, it, expect } from 'vitest';
import { getFizzBuzz } from './fizzbuzz';

describe('getFizzBuzz', () => {
  it('should return "FizzBuzz" for multiples of 3 and 5', () => {
    const result = getFizzBuzz(15);
    expect(result[14]).toBe("FizzBuzz");
  });

  it('should return "Fizz" for multiples of 3', () => {
    const result = getFizzBuzz(15);
    expect(result[2]).toBe("Fizz");
  });

  it('should return "Buzz" for multiples of 5', () => {
    const result = getFizzBuzz(15);
    expect(result[4]).toBe("Buzz");
  });

  it('should return correct FizzBuzz values for numbers 1 to 5', () => {
    const result = getFizzBuzz(5);
    expect(result).toEqual([
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz"
    ]);
  });

  it('should return the number as string if not divisible by any rule', () => {
    const result = getFizzBuzz(2);
    expect(result[0]).toBe("1");
  });

  it('should return an empty array for 0 number', () => {
    const result = getFizzBuzz(0);
    expect(result).toEqual([]);
  });

  it('should return an empty array for negative number', () => {
    const result = getFizzBuzz(-5);
    expect(result).toEqual([]);
  });

  it('should work with custom rules', () => {
  const customRules = [
    { divisor: 2, display: "Ro" },
    { divisor: 7, display: "Mane" }
  ];

  const result = getFizzBuzz(14, customRules);
    expect(result[1]).toBe("Ro");
    expect(result[6]).toBe("Mane");
    expect(result[13]).toBe("RoMane");
  });
});
