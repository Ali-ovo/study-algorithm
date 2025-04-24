import { ArrayStack } from "./stack"


const decimalToBinary = (decimal: number): string => {
  const stack = new ArrayStack<number>()


  while(decimal>0){
    const remainder = decimal % 2
    stack.push(remainder)
    decimal >>= 1
  }

  let binaryString = ''
  while(!stack.isEmpty()){
    binaryString += stack.pop()
  }
  return binaryString
}


console.log(decimalToBinary(10)) // 1010
