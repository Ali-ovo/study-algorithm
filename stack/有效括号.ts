import { ArrayStack } from './stack'

const isValidTs = (s: string) => {
  if (s.length % 2 !== 0) return false
  const stack = new ArrayStack<string>()

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    if (char === '(' || char === '{' || char === '[') {
      stack.push(char)
    } else {
      if (stack.isEmpty()) return false
      const top = stack.pop()
      if (char === ')' && top !== '(') return false
      if (char === '}' && top !== '{') return false
      if (char === ']' && top !== '[') return false
    }
  }

  return stack.isEmpty()
}

console.log(isValidTs('({})'))
