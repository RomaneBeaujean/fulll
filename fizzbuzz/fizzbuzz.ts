
type FizzbuzzRule = { divisor: number, display: string };

const defaultRules: FizzbuzzRule[] = [
    { divisor: 3, display: "Fizz" },
    { divisor: 5, display: "Buzz" },
]

export function getFizzBuzz(n: number, rules: FizzbuzzRule[] = defaultRules): string[] {
  const results: string[] = [];
  for (let i = 1; i <= n; i++) {
    let result = "";
    for (const rule of rules) {
        const isDivisible = i % rule.divisor === 0;
        if(isDivisible) result += rule.display;
    }
    results.push(result || `${i}`)
  }
  return results;
}

export function displayFizzBuzz(n: number, rules: FizzbuzzRule[] = defaultRules): void {
  getFizzBuzz(n, rules).forEach(result => console.log(result));
}
