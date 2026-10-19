class book:

    def __init__(self, title, author, page):
        self.title=title
        self.author=author
        self.page=page
    def descibe(self):
        print(f"{self.title} {self.author} {self.page}")

b1=book("harry potter", "kelly", 50)
b2=book("poor dad", "Robert", 256)
b1.descibe()
b2.descibe()

class product:
    def __init__(self, name, price, quantity):
        self.name=name
        self.price=price
        self.quantity=quantity
    def restock(self,n):
        self.quantity += n
        print(f"quantity {self.quantity}")
    def sell(self,n):
        self.quantity -= n
        print(f"quantity {self.quantity}")
p1=product("amoxilin",300, 4)
p1.restock(10)
p1.sell(5)

class product:

    def __init__(self, name, price, quantity):
        self.name=name
        self.price=price
        self.__quantity=quantity

    @property
    def quantity(self):
        return self.__quantity
    @quantity.setter
    def quantity(self, n):
        if n < 0:
            raise ValueError("No negative quantity")
        self.__quantity = n
    def restock(self,n):
        self.quantity += n
        print(f"quantity {self.quantity}")
    def sell(self,n):
        self.quantity -= n
        print(f"quantity {self.quantity}")
    def display(self):
        print(self.name)
        print(self.price)
        print(self.__quantity)


p1=product("kit", 200, 20)
p1.name = "Kit"
p1.price = 320

p1.quantity
p1.quantity = 7

p1.display()

p1.restock(10)
p1.sell(5)

p2=product("car",200, 6)
p2.display()
p3=product("phone",30, 50)
p3.display()
