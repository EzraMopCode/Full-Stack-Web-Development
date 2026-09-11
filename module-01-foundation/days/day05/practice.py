  #================
  # Exersice
from abc import ABC, abstractmethod

class Vechile(ABC):
    def __init__(self, make, model, number_wheel):
        self.make = make
        self.model = model
        self.number_wheel = number_wheel
    @abstractmethod
    def wheel(self):
        pass
    def describe(self):
        return f"{self.make} {self.model}"

class Car(Vechile):
    def __init__(self, make, model, number_wheel):
        super().__init__(make, model, number_wheel)
    def wheel(self):
        return self.number_wheel

class Truck(Vechile):
    def __init__(self, make, model, capacity, number_wheel):
        super().__init__(make, model, number_wheel)
        self.capacity = capacity

    def describe(self):
        base = super().describe()
        return f"{base} It has a Capacity of {self.capacity}"
    def wheel(self):
        return self.number_wheel

Vechiles = [ Car("Toyota", "Camry", 4),
      Truck("Ford", "F-150", "13,000 lbs", 10),
      Car("Honda", "Civic", 4),
      Truck("Tesla", "Cybertruck", "11,000 lbs", 6)]

for Vechile in Vechiles:
    print(f"{Vechile.describe()} It have Wheel of {Vechile.wheel()}")
