from pydantic import BaseModel
from refract import register_function


class SumResult(BaseModel):
    result: int


class GreetResult(BaseModel):
    message: str


@register_function(http_methods=["GET", "POST"])
def add(a: int, b: int) -> SumResult:
    """Add two numbers.

    Args:
        a: First number
        b: Second number
    """
    return SumResult(result=a + b)


@register_function(http_methods=["GET", "POST"])
def greet(name: str = "World") -> GreetResult:
    """Greet someone.

    Args:
        name: The name to greet
    """
    return GreetResult(message=f"Hello, {name}!")
