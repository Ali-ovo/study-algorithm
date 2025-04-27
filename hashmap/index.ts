export class HashTable<T = any> {
  storage: [string, T][][] = []

  private length: number = 7

  private count: number = 0

  private hashFunc(key: string, max: number) {
    let hashCode = 0
    for (let i = 0; i < key.length; i++) {
      hashCode = 31 * hashCode + key.charCodeAt(i)
    }
    return hashCode % max
  }

  private isPrime(num: number) {
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

  private getNextPrime(num: number) {
    let newPrime = num
    while (!this.isPrime(newPrime)) {
      newPrime++
    }
    return newPrime
  }

  private resize(newLength: number) {
    let newPrime = this.getNextPrime(newLength)
    if (newPrime < 7) {
      newPrime = 7
    }
    this.length = newPrime
    const oldStorage = this.storage
    this.storage = []
    this.count = 0

    for (const bucket of oldStorage) {
      if (bucket) {
        for (const [key, value] of bucket) {
          this.put(key, value)
        }
      }
    }
  }

  put(key: string, value: T) {
    const index = this.hashFunc(key, this.length)

    let bucket = this.storage[index]

    if (!bucket) {
      bucket = []
      this.storage[index] = bucket
    }

    for (let i = 0; i < bucket.length; i++) {
      const [k] = bucket[i]
      if (k === key) {
        bucket[i][1] = value
        return
      }
    }

    bucket.push([key, value])
    this.count++
    if (this.count / this.length > 0.75) {
      this.resize(this.length * 2)
    }
  }

  get(key: string) {
    const index = this.hashFunc(key, this.length)

    const bucket = this.storage[index]
    if (!bucket) {
      return undefined
    }

    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i]
      if (k === key) {
        return v
      }
    }
    return undefined
  }

  delete(key: string) {
    const index = this.hashFunc(key, this.length)

    const bucket = this.storage[index]
    if (!bucket) {
      return
    }

    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i]
      if (k === key) {
        bucket.splice(i, 1)
        this.count--

        if (this.count / this.length < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2))
        }

        return v
      }
    }

    return undefined
  }
}

