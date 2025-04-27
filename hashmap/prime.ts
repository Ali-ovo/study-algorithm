export const isPrime = (num: number) => {
  if (num <= 3) {
    return num > 1
  }

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}

