# =====================================================================
# EXERCISE 1: Spot the SRP Violation (Single Responsibility Principle)
# =====================================================================
# class Report:
#     def __init__(self, title, data):
#         self.title = title
#         self.data = data

#     def generate(self):
#         return f"Report: {self.title}\nData: {self.data}"


# class ReportSaver:
#     def save(self, report, filename):
#         with open(filename, "w") as file:
#             file.write(report.generate())

#         print(f"Report saved to {filename}")

# class ReportEmailer:
#     def send(self, report, email_address):
#         print(f"Sending report '{report.title}' to {email_address}")

# report = Report("Sales Report", "Sales increased by 20%.")

# saver = ReportSaver()
# emailer = ReportEmailer()

# saver.save(report, "sales.txt")
# emailer.send(report, "manager@example.com")

# =====================================================================
# EXERCISE 2: OCP  (Open for extension, closed for modification.)
# =====================================================================
# import math
# class Shape:
#     def area(self):
#         pass

# class Circle(Shape):
#     def __init__(self, radius):
#         self.radius = radius

#     def area(self):
#         return math.pi * self.radius ** 2

# class Square(Shape):
#     def __init__(self, side):
#         self.side = side

#     def area(self):
#         return self.side ** 2

# def print_area(shape):
#     print(f"Area: {shape.area()}")

# circle = Circle(5)
# square = Square(4)

# print_area(circle)
# print_area(square)

# =====================================================================
# EXERCISE 3: Singleton Version
# =====================================================================
# class AppSettings:
#     _instance = None

#     def __new__(cls):
#         if cls._instance is None:
#             cls._instance = super().__new__(cls)
#             cls._instance.currency = "ETB"
#         return cls._instance

# settings1 = AppSettings()
# settings2 = AppSettings()

# print(settings1.currency)
# print(settings2.currency)

# print(settings1 is settings2)

# =====================================================================
# EXERCISE 4: Factory Design Pattern
# =====================================================================
class Circle:
    def draw(self):
        print("Drawing a Circle")


class Square:
    def draw(self):
        print("Drawing a Square")


class Triangle:
    def draw(self):
        print("Drawing a Triangle")

class ShapeFactory:

    @staticmethod
    def create(kind):
        if kind == "circle":
            return Circle()
        elif kind == "square":
            return Square()
        elif kind == "triangle":
            return Triangle()
        else:
            raise ValueError("Unknown shape")

shape1 = ShapeFactory.create("circle")
shape2 = ShapeFactory.create("square")
shape3 = ShapeFactory.create("triangle")

shape1.draw()
shape2.draw()
shape3.draw()

#=============================
# Exersice 5

class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)
class EmailSubscriber:
    def update(self, news):
        print(f"Email Subscriber received: {news}")

class MobileSubscriber:
    def update(self, news):
        print(f"Mobile Subscriber received: {news}")

agency = NewsAgency()

email = EmailSubscriber()
mobile = MobileSubscriber()

agency.subscribe(email)
agency.subscribe(mobile)

agency.notify("The New Version Realsed!")
