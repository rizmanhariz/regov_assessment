class HashT:
  def __init__(self):
    self.hashMap = {}

  def __str__(self):
    return f"{self.hashMap}"
  
  def insert(self, key, value):
    self.hashMap[key] = value

  def get(self, key):
    if key not in self.hashMap:
      return None
    else:
      return self.hashMap[key]

  def delete(self, key):
    del self.hashMap[key]
