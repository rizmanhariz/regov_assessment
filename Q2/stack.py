class Stack:
  def __init__(self):
    self.stack = []

  def __str__(self):
    return f"{self.stack}"
  
  def pop(self):
    return self.stack.pop(-1)

  def push(self, inputValue):
    self.stack.append(inputValue)

  def peek(self):
    if len(self.stack) == 0:
      return None
    else: 
      return self.stack[-1]
  
  def is_empty(self):
    return len(self.stack) == 0

